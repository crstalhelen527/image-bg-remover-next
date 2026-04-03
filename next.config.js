/** @type {import('next').NextConfig} */
const nextConfig = {
  // 对于Cloudflare Pages，使用默认输出
  output: 'standalone',
  images: {
    domains: [],
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;