import type { Metadata } from 'next'

import Link from 'next/link'
import { ArrowRightIcon, BanknoteIcon, MegaphoneIcon, MessagesSquareIcon, ShoppingBagIcon, WarehouseIcon } from 'lucide-react'

import { PageReveal } from '@/components/landing/cinematic-motion'
import { useCases } from '@/content/nafs-landing'

export const metadata: Metadata = {
  title: 'Use cases',
  description: 'See how NAFS fits multi-brand retail, D2C, website and social sales, COD-heavy commerce and multi-location inventory.',
  alternates: { canonical: '/use-cases' }
}

const icons = [ShoppingBagIcon, MegaphoneIcon, MessagesSquareIcon, BanknoteIcon, WarehouseIcon] as const

const pressure = [
  ['Large catalog', 'Stock accuracy', 'Supplier coordination'],
  ['Campaign spikes', 'Faster fulfillment', 'Customer follow-up'],
  ['Several sales sources', 'Duplicate customers', 'Manual stock checks'],
  ['Courier updates', 'COD matching', 'Failed delivery'],
  ['Stock by location', 'Transfers', 'Order allocation']
] as const

export default function UseCasesPage() {
  return (
    <>
      <section className='bg-[#fafaf8] pb-16 pt-32 sm:pb-24 sm:pt-40'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-4xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>USE CASES</p>
              <h1 className='mt-5 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] min-[390px]:text-5xl sm:text-7xl lg:text-[76px] lg:leading-[.98]'>Built for growing commerce businesses with real operational complexity.</h1>
              <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6f6f6a]'>Choose the business model closest to yours and see how NAFS keeps teams, stock, delivery and money connected.</p>
            </div>
          </PageReveal>
        </div>
      </section>

      <section className='bg-[#fafaf8] pb-20 sm:pb-28'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <div className='grid gap-4 lg:grid-cols-2'>
            {useCases.map((item, index) => {
              const Icon = icons[index] ?? ShoppingBagIcon

              return (
                <PageReveal key={item.slug} delay={Math.min(index * .04, .12)}>
                  <Link href={`/use-cases/${item.slug}`} className='group site-card flex h-full flex-col rounded-[22px] border border-[#e4e4e0] bg-white p-5 sm:rounded-[24px] sm:p-6'>
                    <div className='flex items-start justify-between gap-4'>
                      <span className='grid size-12 place-items-center rounded-2xl bg-[#fafaf8] text-violet-700 ring-1 ring-black/5'><Icon className='size-5' /></span>
                      <span className='font-mono text-xs font-semibold text-[#aaa]'>0{index + 1}</span>
                    </div>
                    <h2 className='mt-7 text-2xl font-semibold tracking-[-0.04em] text-[#171717] sm:text-3xl'>{item.title}</h2>
                    <p className='mt-3 text-base font-medium leading-7 text-[#4f4f4b]'>{item.lead}</p>
                    <div className='mt-6 flex flex-wrap gap-2'>
                      {(pressure[index] ?? []).map(tag => <span key={tag} className='rounded-full border border-[#e5e5e1] bg-[#fafaf8] px-3 py-1.5 text-xs font-medium text-[#6f6f6a]'>{tag}</span>)}
                    </div>
                    <p className='mt-6 flex-1 text-base leading-7 text-[#71716c]'>{item.solution}</p>
                    <span className='mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#111]'>See how NAFS fits <ArrowRightIcon className='size-4 transition group-hover:translate-x-1' /></span>
                  </Link>
                </PageReveal>
              )
            })}
          </div>
        </div>
      </section>

      <section className='bg-[#0d0e12] py-20 text-white sm:py-28'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-3xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-300'>DIFFERENT BUSINESSES, DIFFERENT BOTTLENECKS</p>
              <h2 className='mt-4 text-balance text-4xl font-medium tracking-[-0.05em] sm:text-6xl'>Different businesses break in different places.</h2>
              <p className='mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/68'>Multi-brand retail needs stronger catalog and supplier control. Campaign-led brands need faster fulfillment. COD businesses need delivery and settlement clarity. Multi-location teams need trustworthy availability and transfers.</p>
            </div>
          </PageReveal>
        </div>
      </section>
    </>
  )
}
