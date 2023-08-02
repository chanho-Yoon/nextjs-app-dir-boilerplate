/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, {
  AxiosError,
} from 'axios';
import { Cookies } from 'react-cookie';
import { isArray } from 'lodash';
import mem from 'mem';
import { ApiErrorResponse } from 'types/api-response';
import authApi from '@/api/auth/auth';

const cookies = new Cookies();

const nextPublicMode = process.env.NEXT_PUBLIC_MODE;

export const tokenData = {
  accessToken: '',
};

const getRefreshToken = mem(async (): Promise<string | void> => {
  try {
    const data = await authApi.refreshToken({ refreshToken: cookies.get('accessToken') });

    const { accessToken, refreshToken } = data.result;

    if (nextPublicMode === 'local') {
      cookies.set('accessToken', accessToken, {
        path: '/',
        secure: process.env.NEXT_PUBLIC_MODE === 'production',
      });
    } else {
      tokenData.accessToken = accessToken;
    }

    cookies.set('refreshToken', refreshToken, {
      path: '/',
      secure: process.env.NEXT_PUBLIC_MODE === 'production',
    });

    return accessToken;
  } catch (e) {
    cookies.remove('accessToken');
    cookies.remove('refreshToken');
  }
}, { maxAge: 1000 });

const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_SERVER}`,
  timeout: 60000 * 10,
});

apiClient.defaults.paramsSerializer = (paramObj: { [key: string]: string }) => {
  const params = new URLSearchParams();

  Object.entries(paramObj).forEach(([key, value]) => {
    if (value === null || value === 'null') {
      return;
    }
    if (isArray(value) && value.length === 0) {
      return;
    }
    if (Number(value) === 0) {
      params.append(key, value);
      return;
    }
    if (value) {
      params.append(key, value);
    }
  });

  return params.toString();
};

apiClient.interceptors.request.use(
  (config: any) => {
    const accessToken = nextPublicMode === 'local' ? cookies.get('accessToken') : tokenData.accessToken;

    if (config.url === '/v1.0/login' || config.url === '/v1.0/account/operator/password-change') {
      return config;
    }

    return {
      ...config,
      headers: {
        Authorization: `${accessToken}`,
      },
    };
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const { response, config } = error;

    const refreshToken = cookies.get('refreshToken');

    if (response && response.status === 401 && window.location.pathname !== '/login' && refreshToken) {
      const accessToken = await getRefreshToken();
      if (config) {
        config.headers.Authorization = `${accessToken}`; // 토큰 교체
        return axios(config);
      }
    }

    if (response && ((response.status === 401 && window.location.pathname !== '/login') || response.status === 400)) {
      window.location.assign('/login');
    }

    return Promise.reject(response);
  },
);

export default apiClient;
