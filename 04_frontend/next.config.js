/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Uncomment the line below if your repo is at https://github.com/username/repo-name
  // basePath: '/prish-global',
  // assetPrefix: '/prish-global/',
};

module.exports = nextConfig;
