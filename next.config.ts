import type { NextConfig } from 'next'

const isProduction = process.env.NODE_ENV === 'production'

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  `connect-src 'self'${isProduction ? '' : ' ws: wss:'}`,
  "font-src 'self' data:",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' blob: data: https:",
  "manifest-src 'self'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isProduction ? '' : " 'unsafe-eval'"}`,
  "style-src 'self' 'unsafe-inline'",
  "worker-src 'self' blob:",
  ...(isProduction ? ['upgrade-insecure-requests'] : [])
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'Permissions-Policy', value: 'camera=(), geolocation=(), microphone=()' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' }
]

const nextConfig: NextConfig = {
  assetPrefix: '/landing-assets',
  basePath: process.env.BASEPATH ?? '',
  distDir: process.env.NAFS_DIST_DIR ?? '.next',
  output: 'standalone',
  outputFileTracingRoot: process.cwd(),
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }]
  },
  async rewrites() {
    return [{ source: '/landing-assets/_next/:path*', destination: '/_next/:path*' }]
  }
}

export default nextConfig
