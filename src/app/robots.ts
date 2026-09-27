import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.nafs.tech'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/private/']
      }
    ],
    sitemap: `${appUrl}/sitemap.xml`,
    host: appUrl
  }
}
