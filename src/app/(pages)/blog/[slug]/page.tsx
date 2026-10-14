import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import MDXContent from '@/components/mdx-content'
import { CardLink, PageHero, Section } from '@/components/marketing/primitives'
import { getPostBySlug, getPosts } from '@/lib/posts'
import { absoluteUrl } from '@/lib/site-config'

import '@/app/marketing-resources.css'

type PageProps = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export async function generateStaticParams() {
  return (await getPosts()).map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return {}

  return { title: post.metadata.title ?? slug, description: post.metadata.description, alternates: { canonical: `/blog/${slug}` }, openGraph: { type: 'article', url: absoluteUrl(`/blog/${slug}`) } }
}

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const { metadata, content } = post
  const related = (await getPosts()).filter(item => item.slug !== slug).slice(0, 2)
  const validDate = metadata.publishedAt && Number.isFinite(Date.parse(metadata.publishedAt)) ? metadata.publishedAt : undefined
  const jsonLd = { '@context': 'https://schema.org', '@type': 'BlogPosting', headline: metadata.title ?? slug, description: metadata.description, datePublished: validDate, url: absoluteUrl(`/blog/${slug}`), author: { '@type': 'Organization', name: metadata.author?.name ?? 'NAFS' }, publisher: { '@type': 'Organization', name: 'NAFS' } }

  return <><PageHero label={metadata.category ?? 'NAFS Journal'} title={metadata.title ?? slug} description={metadata.description ?? 'A practical note on connected commerce operations.'} breadcrumb={{ label: 'Resources', href: '/blog' }}><div className='m-resource-meta'><span>{metadata.author?.name ?? 'NAFS'}</span>{validDate && <time dateTime={validDate}>{new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Dhaka' }).format(new Date(validDate))}</time>}{metadata.readTime && <span>{metadata.readTime} read</span>}</div></PageHero><Section tone='white'><article className='m-article'><MDXContent source={content} /></article>{related.length > 0 && <nav className='m-article-related' aria-label='Related articles'><h2 className='m-heading' style={{ fontSize: 30, marginBottom: 24 }}>Keep reading</h2><div className='m-grid m-grid-two'>{related.map(item => <CardLink key={item.slug} href={`/blog/${item.slug}`} title={item.title ?? item.slug} description={item.description ?? 'Read the article.'} label={item.category} />)}</div></nav>}</Section><script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} /></>
}
