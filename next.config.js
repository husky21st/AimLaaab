/** @type {import('next').NextConfig} */
module.exports = {
  assetPrefix: process.env.NODE_ENV !== 'development'? '/AimLaaab': undefined,
  distDir: 'build',
  reactStrictMode: true,
  poweredByHeader: false,
  optimizeFonts: true,
}
