/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  compiler: {
    styledComponents: true,
    displayName: process.env.NEXT_PUBLIC_MODE !== 'production',
    removeConsole: process.env.NEXT_PUBLIC_MODE === 'production',
  },
};

module.exports = nextConfig;
