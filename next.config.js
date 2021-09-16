/** @type {import('next').NextConfig} */
module.exports = {
  assetPrefix: process.env.CI ? '/AimLaaab': undefined,
  distDir: 'build',
  reactStrictMode: true,
  poweredByHeader: false,
  optimizeFonts: true,
}
