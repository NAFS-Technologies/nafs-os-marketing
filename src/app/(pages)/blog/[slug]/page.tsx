import type { Metadata } from 'next'

import Link from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

import { PageReveal } from '@/components/landing/cinematic-motion'
import MDXContent from '@/components/mdx-content'
import { getPostBySlug, getPosts } from '@/lib/posts'

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.nafs.tech'

type PageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) return {}

  return {
    title: post.metadata.title ?? slug,
    description: post.metadata.description,
    keywords: post.metadata.keywords,
    alternates: { canonical: `/blog/${slug}` }
  }
}

export const dynamicParams = false

export default async function BlogDetailsPage({ params }: PageProps) {
  const { slug } = await params
  const posts = await getPosts()
  const post = await getPostBySlug(slug)

  if (!post) notFound()

  const { metadata, content } = post
  const current = posts.findIndex(item => item.slug === slug)
  const previous = current > 0 ? posts[current - 1] : null
  const next = current >= 0 && current < posts.length - 1 ? posts[current + 1] : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: metadata.title ?? slug,
    description: metadata.description,
    datePublished: metadata.publishedAt,
    url: `${appUrl}/blog/${slug}`,
    author: { '@type': 'Person', name: metadata.author?.name ?? 'NAFS Technologies' },
    publisher: { '@type': 'Organization', name: 'NAFS Technologies' }
  }

  return (
    <>
      <section className='bg-[#fafaf8] pb-14 pt-32 sm:pb-20 sm:pt-40'>
        <div className='mx-auto max-w-[920px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <Link href='/blog' className='site-arrow-link inline-flex items-center gap-2 text-sm font-semibold text-[#777773] hover:text-[#111]'>
              <ArrowLeftIcon className='size-4' />
              Journal
            </Link>
            <div className='mt-8 sm:mt-9'>
              <span className='rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-800'>{metadata.category ?? 'NAFS Journal'}</span>
              <h1 className='mt-5 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] min-[390px]:text-5xl sm:text-6xl lg:text-[68px] lg:leading-[1.01]'>{metadata.title ?? slug}</h1>
              {metadata.description ? <p className='mt-6 max-w-3xl text-lg leading-8 text-[#6f6f6a]'>{metadata.description}</p> : null}
              <div className='mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#8a8a85]'>
                <span>{metadata.author?.name ?? 'NAFS Technologies'}</span>
                {metadata.publishedAt ? <span>{new Date(metadata.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span> : null}
                {metadata.readTime ? <span>{metadata.readTime} read</span> : null}
              </div>
            </div>
          </PageReveal>
        </div>
      </section>

      {metadata.image ? (
        <section className='bg-[#fafaf8]'>
          <div className='mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8'>
            <PageReveal>
              <img src={metadata.image} alt={metadata.title ?? ''} className='w-full rounded-[22px] border border-[#e2e2de] object-cover sm:rounded-[24px]' />
            </PageReveal>
          </div>
        </section>
      ) : null}

      <section className='bg-[#fafaf8] py-14 sm:py-24'>
        <div className='mx-auto max-w-[800px] px-4 sm:px-6 lg:px-8'>
          <article className='prose prose-lg prose-slate max-w-none prose-headings:tracking-[-0.035em] prose-headings:text-[#171717] prose-p:text-[#555551] prose-p:leading-8 prose-a:text-violet-700 prose-strong:text-[#171717] prose-code:text-[13px]'>
            <MDXContent source={content} />
          </article>

          <div className='mt-14 grid gap-4 sm:mt-16 sm:grid-cols-2'>
            <div>
              {previous ? (
                <Link href={`/blog/${previous.slug}`} className='group site-card block rounded-2xl border border-[#e4e4e0] bg-white p-5'>
                  <p className='text-xs font-semibold uppercase tracking-[.1em] text-[#aaa]'>Previous article</p>
                  <p className='mt-3 text-base font-semibold text-[#333] group-hover:text-[#111]'>{previous.title ?? previous.slug}</p>
                </Link>
              ) : null}
            </div>
            <div>
              {next ? (
                <Link href={`/blog/${next.slug}`} className='group site-card block rounded-2xl border border-[#e4e4e0] bg-white p-5 sm:text-right'>
                  <p className='text-xs font-semibold uppercase tracking-[.1em] text-[#aaa]'>Next article</p>
                  <p className='mt-3 inline-flex items-center gap-2 text-base font-semibold text-[#333] group-hover:text-[#111]'>
                    {next.title ?? next.slug}
                    <ArrowRightIcon className='size-4' />
                  </p>
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </section>

      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    </>
  )
}
