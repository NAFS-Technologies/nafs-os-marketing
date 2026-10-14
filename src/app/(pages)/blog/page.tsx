import type { Metadata } from 'next'

import { ClosingCTA, PageHero, Section } from '@/components/marketing/primitives'
import { ResourceLibrary } from '@/components/marketing/resource-library'
import { getPosts } from '@/lib/posts'
import { absoluteUrl } from '@/lib/site-config'

export const metadata: Metadata = { title: 'Resources', description: 'Practical guides and articles about connected commerce operations, rollout planning and NAFS.', alternates: { canonical: '/blog' }, openGraph: { url: absoluteUrl('/blog') } }

export default async function BlogPage() {
  const posts = await getPosts()

  return <><PageHero label='NAFS Journal · Resources' title='Better context for the work behind commerce.' description='Guides, product thinking and practical notes on orders, stock, fulfillment, payments and rollout.' /><Section tone='white'><ResourceLibrary posts={posts} /></Section><ClosingCTA /></>
}
