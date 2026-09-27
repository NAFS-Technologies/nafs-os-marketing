import type { Metadata } from 'next'

import Link from 'next/link'
import { ArrowRightIcon, BriefcaseBusinessIcon, Building2Icon, Globe2Icon, Layers3Icon } from 'lucide-react'

import { PageReveal } from '@/components/landing/cinematic-motion'
import { B2BPlatformScene, TechnologyRails } from '@/components/landing/platform-visuals'

export const metadata: Metadata = {
  title: 'B2B Commerce Platform',
  description: 'Launch commerce software under your brand with client onboarding, plans, subscriptions, custom domains and NAFS behind the product.',
  alternates: { canonical: '/b2b' }
}

const revenuePaths = [
  { icon: Layers3Icon, title: 'Software subscriptions', detail: 'Create plans around the NAFS products your clients need and set approved pricing for your market.' },
  { icon: BriefcaseBusinessIcon, title: 'Setup and services', detail: 'Earn from migration, configuration, training and ongoing managed services around each client.' },
  { icon: Globe2Icon, title: 'Integrations and add-ons', detail: 'Connect client tools and add automation, mobile, storefront or delivery capabilities as their needs grow.' }
] as const

const lifecycle = [
  ['01', 'Set up your partner account', 'Create your business profile and keep it separate from each client’s workspace.'],
  ['02', 'Add your brand', 'Use your logo, colors, support details and customer-facing identity.'],
  ['03', 'Create your plans', 'Choose the products, limits and approved pricing included in each offer.'],
  ['04', 'Invite client businesses', 'Give every client a secure workspace while you keep the commercial relationship.'],
  ['05', 'Connect branded domains', 'Use your own web addresses and follow each domain from verification to launch.'],
  ['06', 'Manage subscriptions', 'Track plans, invoices and client access from one partner dashboard.']
] as const

export default function B2BPage() {
  return (
    <>
      <section className='bg-[#fafaf8] pb-16 pt-32 sm:pb-24 sm:pt-40'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-4xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>B2B COMMERCE PLATFORM</p>
              <h1 className='mt-5 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] min-[390px]:text-5xl sm:text-7xl lg:text-[76px] lg:leading-[.98]'>Launch commerce software under your brand—without building it from scratch.</h1>
              <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6f6f6a]'>You own the brand, client relationship and services. NAFS provides the commerce software, client workspaces, plans, domains, integrations and billing tools behind it.</p>
              <div className='mt-8 flex flex-col items-stretch justify-center gap-3 min-[420px]:items-center sm:flex-row'>
                <Link href='/#contact' className='site-action site-arrow-link inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#111] px-6 text-[15px] font-semibold text-white'>Discuss a B2B business <ArrowRightIcon className='size-4' /></Link>
                <Link href='/partners' className='site-text-link inline-flex h-12 items-center justify-center text-[15px] font-semibold text-[#555551]'>Only looking to refer clients?</Link>
              </div>
            </div>
          </PageReveal>
          <div className='mt-10 sm:mt-14'><B2BPlatformScene /></div>
        </div>
      </section>

      <section className='border-y border-[#e7e7e4] bg-white py-20 sm:py-28'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-3xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>BUILD RECURRING REVENUE</p>
              <h2 className='mt-4 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-6xl'>Turn NAFS into a software and services business.</h2>
              <p className='mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#71716c]'>Package the platform for your market, then add the setup, integrations and ongoing support your clients value.</p>
            </div>
          </PageReveal>
          <div className='mt-10 grid gap-4 md:grid-cols-3 sm:mt-12'>
            {revenuePaths.map(({ icon: Icon, title, detail }) => (
              <div key={title} className='site-card rounded-2xl border border-[#e7e7e3] bg-[#fafaf8] p-6'>
                <span className='grid size-11 place-items-center rounded-xl bg-white text-violet-700 shadow-sm ring-1 ring-black/5'><Icon className='size-5' /></span>
                <h3 className='mt-6 text-xl font-semibold tracking-[-0.025em] text-[#222]'>{title}</h3>
                <p className='mt-3 text-base leading-7 text-[#71716c]'>{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-[#fafaf8] py-20 sm:py-28'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='grid gap-9 lg:grid-cols-[.8fr_1.2fr] lg:gap-10'>
              <div>
                <span className='grid size-12 place-items-center rounded-2xl bg-[#111] text-white'><Building2Icon className='size-6' /></span>
                <h2 className='mt-6 text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-5xl'>From your brand to your first client.</h2>
                <p className='mt-5 max-w-lg text-base leading-7 text-[#71716c]'>A clear path takes you from setting up the offer to onboarding and billing real client businesses.</p>
              </div>
              <div className='overflow-hidden rounded-2xl border border-[#e2e2de] bg-white'>
                {lifecycle.map(([number, title, detail]) => (
                  <div key={number} className='grid gap-2 border-b border-[#ecece8] p-5 last:border-b-0 sm:grid-cols-[48px_190px_1fr] sm:items-start sm:gap-3'>
                    <span className='font-mono text-xs font-semibold text-violet-700'>{number}</span>
                    <p className='text-base font-semibold text-[#222]'>{title}</p>
                    <p className='text-base leading-7 text-[#74746f]'>{detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </PageReveal>
        </div>
      </section>

      <section className='bg-[#0d0e12] py-20 text-white sm:py-28'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-3xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-300'>YOUR BRAND LEADS</p>
              <h2 className='mt-4 text-balance text-4xl font-medium tracking-[-0.05em] sm:text-6xl'>Clients see your name, plans and domains. NAFS works behind them.</h2>
              <p className='mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/68'>Every client keeps separate accounts, access and billing, while you manage the relationship from one partner workspace.</p>
            </div>
          </PageReveal>
          <div className='mt-10 sm:mt-12'><TechnologyRails /></div>
        </div>
      </section>
    </>
  )
}
