import type { Metadata } from 'next'

import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import { PageReveal } from '@/components/landing/cinematic-motion'
import { getPosts } from '@/lib/posts'

export const metadata: Metadata = {
  title: 'Journal',
  description: 'Practical ideas for running orders, inventory, fulfillment, COD, automation and commerce growth with less friction.',
  alternates: { canonical: '/blog' }
}

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.nafs.tech'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'NAFS Journal',
  description: 'Practical ideas for running commerce with less friction.',
  url: `${appUrl}/blog`,
  publisher: { '@type': 'Organization', name: 'NAFS Technologies' }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <>
      <section className='bg-[#fafaf8] pb-16 pt-32 sm:pb-24 sm:pt-40'>
        <div className='mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-4xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>NAFS JOURNAL</p>
              <h1 className='mt-5 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] min-[390px]:text-5xl sm:text-7xl lg:text-[72px] lg:leading-[.99]'>Ideas for running commerce with less friction.</h1>
              <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6f6f6a]'>Practical lessons on orders, inventory, fulfillment, COD, automation and building a business with NAFS.</p>
            </div>
          </PageReveal>
        </div>
      </section>

      <section className='bg-[#fafaf8] pb-20 sm:pb-28'>
        <div className='mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8'>
          {posts.length ? (
            <div className='grid gap-4 md:grid-cols-2'>
              {posts.map((post, index) => (
                <PageReveal key={post.slug} delay={Math.min(index * .035, .12)}>
                  <Link href={`/blog/${post.slug}`} className='group site-card flex h-full flex-col rounded-[22px] border border-[#e4e4e0] bg-white p-5 sm:rounded-[24px] sm:p-6'>
                    <div className='flex flex-wrap items-center justify-between gap-3'>
                      <span className='rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-800'>{post.category ?? 'Journal'}</span>
                      <span className='text-sm text-[#999994]'>{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : 'NAFS'}</span>
                    </div>
                    <h2 className='mt-6 text-2xl font-semibold tracking-[-0.035em] text-[#171717] sm:text-3xl'>{post.title ?? post.slug}</h2>
                    <p className='mt-4 flex-1 text-base leading-7 text-[#71716c]'>{post.description ?? 'Practical ideas for running commerce with NAFS.'}</p>
                    <span className='mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#111]'>Read article <ArrowRightIcon className='size-4 transition group-hover:translate-x-1' /></span>
                  </Link>
                </PageReveal>
              ))}
            </div>
          ) : (
            <p className='rounded-2xl border border-[#e4e4e0] bg-white p-8 text-base text-[#777773]'>New articles are on the way.</p>
          )}
        </div>
      </section>

      <script type='application/ld+json' dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
    </>
  )
}
