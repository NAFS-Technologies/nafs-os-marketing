import type { MetadataRoute } from 'next'

import { products as productEcosystem, solutions as solutionCards, useCases } from '@/content/product-catalog'
import { getPosts } from '@/lib/posts'
import { absoluteUrl, siteConfig } from '@/lib/site-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!siteConfig.indexable) return []

  const posts = await getPosts()
  const paths = [
    '', '/products', '/integrations', '/b2b', '/partners', '/solutions', '/use-cases', '/pricing', '/blog',
    ...productEcosystem.map(product => `/products/${product.slug}`),
    ...solutionCards.map(solution => `/solutions/${solution.id}`),
    ...useCases.map(useCase => `/use-cases/${useCase.slug}`)
  ]

  return [
    ...paths.map(path => ({ url: absoluteUrl(path), changeFrequency: 'monthly' as const, priority: path ? 0.7 : 1 })),
    ...posts.map(post => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      ...(post.publishedAt && Number.isFinite(Date.parse(post.publishedAt)) ? { lastModified: new Date(post.publishedAt) } : {}),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }))
  ]
}
