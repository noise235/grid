/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // appDir is no longer needed in Next.js 14+
  },
  images: {
    domains: [],
  },
  async redirects() {
    return [];
  },
}

module.exports = nextConfig;
