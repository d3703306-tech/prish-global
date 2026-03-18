/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // basePath: '/prish-global',
  // assetPrefix: '/prish-global/',
  // Uncomment the lines above if deploying to a subfolder like github.com/username/prish-global
};

module.exports = nextConfig;
