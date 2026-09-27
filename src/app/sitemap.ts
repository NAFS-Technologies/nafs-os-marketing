import type { MetadataRoute } from 'next'

import { productEcosystem, solutionCards, useCases } from '@/content/nafs-landing'
import { getPosts } from '@/lib/posts'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.nafs.tech'
  const posts = await getPosts()
  const now = new Date()

  const marketingRoutes = [
    { path: '', priority: 1 },
    { path: '/products', priority: 0.95 },
    { path: '/integrations', priority: 0.94 },
    { path: '/b2b', priority: 0.93 },
    { path: '/partners', priority: 0.92 },
    { path: '/solutions', priority: 0.9 },
    { path: '/use-cases', priority: 0.9 },
    { path: '/pricing', priority: 0.9 },
    { path: '/blog', priority: 0.7 },
    ...productEcosystem.map(product => ({ path: `/products/${product.slug}`, priority: 0.82 })),
    ...solutionCards.map(solution => ({ path: `/solutions/${solution.id}`, priority: 0.8 })),
    ...useCases.map(useCase => ({ path: `/use-cases/${useCase.slug}`, priority: 0.78 }))
  ]

  return [
    ...marketingRoutes.map(route => ({
      url: `${appUrl}${route.path}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: route.priority
    })),
    ...posts.map(post => ({
      url: `${appUrl}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }))
  ]
}
