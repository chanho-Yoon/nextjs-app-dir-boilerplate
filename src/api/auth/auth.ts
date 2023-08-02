import apiClient from '@/api/apiClient';
import { ApiResponseNotMetadata } from 'types/api-response';
import { LoginResType } from 'types/api-response/auth';

const refreshToken = async ({ refreshToken }: {refreshToken: string}) => {
  const { data } = await apiClient.post<ApiResponseNotMetadata<LoginResType>>('/v1.0/login/token-refresh', {
    refreshToken,
  });

  return data;
};

const authApi = {
  refreshToken,
};

export default authApi;
