/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/prish-global',
  assetPrefix: '/prish-global/',
};

module.exports = nextConfig;
