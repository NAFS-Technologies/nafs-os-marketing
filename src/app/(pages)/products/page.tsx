import type { Metadata } from 'next'

import Link from 'next/link'
import { ArrowRightIcon, BlocksIcon, PlugZapIcon, StoreIcon, TrendingUpIcon } from 'lucide-react'

import { PageReveal } from '@/components/landing/cinematic-motion'
import { ProductMapScene, TechnologyRails } from '@/components/landing/platform-visuals'
import { productEcosystem } from '@/content/nafs-landing'

export const metadata: Metadata = {
  title: 'Platform',
  description: 'Explore the NAFS products for commerce operations, integrations, automation, mobile work, B2B and partner growth.',
  alternates: { canonical: '/products' }
}

const layers = [
  { icon: BlocksIcon, label: 'Run', name: 'NAFS OS', detail: 'Manage products, orders, stock, fulfillment, purchasing, payments and reporting.' },
  { icon: PlugZapIcon, label: 'Connect', name: 'Channels and automation', detail: 'Add Storefront, Shopping, Mobile, Flow, Courier and integrations around the core operation.' },
  { icon: StoreIcon, label: 'Launch', name: 'B2B Platform', detail: 'Use your brand, create plans, onboard client businesses and connect custom domains.' },
  { icon: TrendingUpIcon, label: 'Grow', name: 'NAFS Partners', detail: 'Run referrals, partner programs, attribution and commissions from one workspace.' }
] as const

export default function ProductsPage() {
  return (
    <>
      <section className='bg-[#fafaf8] pb-16 pt-32 sm:pb-24 sm:pt-40'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-4xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>THE NAFS PLATFORM</p>
              <h1 className='mt-5 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] min-[390px]:text-5xl sm:text-7xl lg:text-[76px] lg:leading-[.98]'>One platform for every part of commerce.</h1>
              <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6f6f6a]'>Run daily operations, connect existing tools, launch under your brand and grow through partners—with one shared foundation behind it all.</p>
            </div>
          </PageReveal>
          <div className='mt-10 sm:mt-14'><ProductMapScene /></div>
        </div>
      </section>

      <section className='border-y border-[#e7e7e4] bg-white py-16 sm:py-20'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
            {layers.map(({ icon: Icon, label, name, detail }) => (
              <div key={label} className='site-card rounded-2xl border border-[#e7e7e3] bg-[#fafaf8] p-5'>
                <span className='grid size-11 place-items-center rounded-xl bg-white text-violet-700 shadow-sm ring-1 ring-black/5'><Icon className='size-5' /></span>
                <p className='mt-6 text-sm font-semibold uppercase tracking-[.1em] text-violet-700'>{label}</p>
                <h2 className='mt-2 text-xl font-semibold tracking-[-0.02em] text-[#222]'>{name}</h2>
                <p className='mt-3 text-base leading-7 text-[#74746f]'>{detail}</p>
              </div>
            ))}
          </div>
          <div className='mt-6'><TechnologyRails /></div>
        </div>
      </section>

      <section className='bg-[#fafaf8] py-20 sm:py-28'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-3xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>PRODUCTS</p>
              <h2 className='mt-4 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-6xl'>Choose what you need today. Add more as you grow.</h2>
              <p className='mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#71716c]'>Each product solves a clear job. Start with the areas creating the most value for your business instead of taking everything at once.</p>
            </div>
          </PageReveal>

          <div className='mt-10 grid gap-4 md:grid-cols-2 sm:mt-12'>
            {productEcosystem.map((product, index) => (
              <PageReveal key={product.slug} delay={Math.min(index * .025, .12)}>
                <Link href={`/products/${product.slug}`} className='group site-card flex h-full flex-col rounded-2xl border border-[#e4e4e0] bg-white p-5 sm:p-6'>
                  <div className='flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between'>
                    <div>
                      <p className='text-sm font-semibold text-violet-700'>{product.role}</p>
                      <h3 className='mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#171717]'>{product.name}</h3>
                    </div>
                    <span className='w-fit rounded-full bg-[#f2f2ef] px-3 py-1.5 text-xs font-semibold text-[#757570]'>{product.status}</span>
                  </div>
                  <p className='mt-4 flex-1 text-base leading-7 text-[#71716c]'>{product.description}</p>
                  <div className='mt-6 flex flex-wrap gap-2'>
                    {product.capabilities.slice(0, 4).map(capability => <span key={capability} className='rounded-full border border-[#e5e5e1] px-3 py-1.5 text-xs font-medium text-[#696965]'>{capability}</span>)}
                  </div>
                  <span className='mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#111]'>Explore {product.name} <ArrowRightIcon className='size-4 transition group-hover:translate-x-1' /></span>
                </Link>
              </PageReveal>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-[#0d0e12] py-20 text-white sm:py-28'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-3xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-300'>MORE WAYS TO USE NAFS</p>
              <h2 className='mt-4 text-balance text-4xl font-medium tracking-[-0.05em] sm:text-6xl'>Run NAFS for your business—or build new revenue on top of it.</h2>
            </div>
          </PageReveal>
          <div className='mt-10 grid gap-4 md:grid-cols-3 sm:mt-12'>
            {[
              ['/integrations', 'Integrations', 'Connect the storefronts and business tools you already use.'],
              ['/b2b', 'B2B Platform', 'Launch NAFS for client businesses under your brand.'],
              ['/partners', 'Partnerships', 'Refer clients, deliver services, build integrations or resell.']
            ].map(([href, title, detail]) => (
              <Link key={href} href={href} className='site-card rounded-2xl border border-white/10 bg-white/[0.04] p-6 hover:bg-white/[0.07]'>
                <h3 className='text-xl font-semibold'>{title}</h3>
                <p className='mt-3 text-base leading-7 text-white/64'>{detail}</p>
                <span className='site-arrow-link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white'>Explore <ArrowRightIcon className='size-4' /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
