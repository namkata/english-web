import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@english-web/ui', '@english-web/types'],
  async rewrites() {
    return [
      {
        source: '/api/v1/auth/:path*',
        destination: 'http://localhost:4001/api/v1/auth/:path*',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.english-web.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000', // MinIO
      },
    ],
  },
  experimental: {
    // typedRoutes: true,
  },
}

export default withNextIntl(nextConfig)
