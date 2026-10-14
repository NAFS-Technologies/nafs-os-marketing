import type { MetadataRoute } from 'next'

import { absoluteUrl, siteConfig } from '@/lib/site-config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', ...(siteConfig.indexable ? { allow: '/', disallow: ['/api/', '/private/', '/__studio/'] } : { disallow: '/' }) }],
    ...(siteConfig.indexable ? { sitemap: absoluteUrl('/sitemap.xml') } : {}),
    host: siteConfig.siteUrl
  }
}
