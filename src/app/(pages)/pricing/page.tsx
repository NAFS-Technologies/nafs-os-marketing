import type { Metadata } from 'next'

import Link from 'next/link'
import { ArrowRightIcon, Building2Icon, HandshakeIcon, StoreIcon } from 'lucide-react'

import { PageReveal } from '@/components/landing/cinematic-motion'
import { pricingPlans } from '@/content/nafs-landing'

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Use NAFS for your own business, launch a branded platform for clients or join a NAFS partner program.',
  alternates: { canonical: '/pricing' }
}

const commercialPaths = [
  { icon: StoreIcon, label: 'For your business', title: 'Run your operation on NAFS', detail: 'Choose the workflows, data, locations and connections your own team needs.', href: '/#contact', action: 'Plan my rollout' },
  { icon: Building2Icon, label: 'For B2B providers', title: 'Launch a platform for clients', detail: 'Use your brand, create plans, onboard client businesses and build recurring software and service revenue.', href: '/b2b', action: 'Explore B2B' },
  { icon: HandshakeIcon, label: 'For partners', title: 'Refer, implement or resell NAFS', detail: 'Work with NAFS as a creator, agency, consultant, technology partner or reseller.', href: '/partners', action: 'Explore partnerships' }
] as const

export default function PricingPage() {
  return (
    <>
      <section className='bg-[#fafaf8] pb-16 pt-32 sm:pb-24 sm:pt-40'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-4xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>PRICING</p>
              <h1 className='mt-5 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] min-[390px]:text-5xl sm:text-7xl lg:text-[76px] lg:leading-[.98]'>Choose how you want to work with NAFS.</h1>
              <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6f6f6a]'>Use NAFS for your business, build a branded platform for clients or grow with us through a partner program. Each path is priced around a different goal.</p>
            </div>
          </PageReveal>

          <div className='mt-10 grid gap-4 lg:grid-cols-3 sm:mt-12'>
            {commercialPaths.map(({ icon: Icon, label, title, detail, href, action }) => (
              <div key={label} className='site-card flex flex-col rounded-[22px] border border-[#e4e4e0] bg-white p-6 sm:rounded-[24px]'>
                <span className='grid size-12 place-items-center rounded-2xl bg-[#fafaf8] text-violet-700 ring-1 ring-black/5'><Icon className='size-5' /></span>
                <p className='mt-6 text-sm font-semibold uppercase tracking-[.1em] text-violet-700'>{label}</p>
                <h2 className='mt-2 text-2xl font-semibold tracking-[-0.035em] text-[#171717]'>{title}</h2>
                <p className='mt-4 flex-1 text-base leading-7 text-[#71716c]'>{detail}</p>
                <Link href={href} className='site-arrow-link mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#111]'>{action} <ArrowRightIcon className='size-4' /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='border-y border-[#e7e7e4] bg-white py-20 sm:py-28'>
        <div className='mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-3xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>ROLL OUT NAFS FOR YOUR BUSINESS</p>
              <h2 className='mt-4 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-6xl'>Start with what costs the most time. Expand when the value is clear.</h2>
              <p className='mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#71716c]'>Pricing depends on what you need to connect, move and run. We agree the scope first so the proposal matches the real work.</p>
            </div>
          </PageReveal>

          <div className='mt-10 space-y-4 sm:mt-12'>
            {pricingPlans.map((plan, index) => (
              <PageReveal key={plan.name} delay={index * .05}>
                <div className={plan.highlighted ? 'rounded-[22px] border border-violet-300 bg-violet-50/40 p-5 sm:rounded-[24px] sm:p-7' : 'rounded-[22px] border border-[#e4e4e0] bg-[#fafaf8] p-5 sm:rounded-[24px] sm:p-7'}>
                  <div className='grid gap-6 lg:grid-cols-[60px_1fr_250px] lg:items-start'>
                    <span className='font-mono text-sm font-semibold text-violet-700'>0{index + 1}</span>
                    <div>
                      <div className='flex flex-wrap items-center gap-3'>
                        <h3 className='text-2xl font-semibold tracking-[-0.035em] text-[#171717]'>{plan.name}</h3>
                        {plan.highlighted ? <span className='rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-800'>Most common starting point</span> : null}
                      </div>
                      <p className='mt-3 max-w-2xl text-base leading-7 text-[#71716c]'>{plan.description}</p>
                      <div className='mt-5 grid gap-2 sm:grid-cols-2'>{plan.features.map(feature => <span key={feature} className='text-sm leading-6 text-[#7b7b76]'>— {feature}</span>)}</div>
                    </div>
                    <div className='border-t border-[#e2e2de] pt-5 lg:border-t-0 lg:pt-0 lg:text-right'>
                      <p className='text-2xl font-semibold text-[#171717]'>{plan.price}</p>
                      <p className='mt-2 text-sm leading-6 text-[#858580]'>{plan.onboarding}</p>
                      <Link href='/#contact' className='site-arrow-link mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#111]'>Discuss this option <ArrowRightIcon className='size-4' /></Link>
                    </div>
                  </div>
                </div>
              </PageReveal>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-[#0d0e12] py-20 text-white sm:py-28'>
        <div className='mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-3xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-300'>WHAT AFFECTS PRICING?</p>
              <h2 className='mt-4 text-balance text-4xl font-medium tracking-[-0.05em] sm:text-6xl'>The price reflects the work required to make NAFS useful in your business.</h2>
            </div>
          </PageReveal>
          <div className='mt-10 grid gap-4 md:grid-cols-2 sm:mt-12'>
            {[
              ['Teams and workflow', 'How many people, approvals, exceptions and steps are involved in the process.'],
              ['Data migration', 'What products, customers, orders or stock history need to be moved and checked.'],
              ['Locations and channels', 'How many warehouses, stores and sales channels need to work together.'],
              ['Third-party connections', 'Which storefront, courier, payment or business tools need to be connected and configured.']
            ].map(([title, detail]) => (
              <div key={title} className='rounded-2xl border border-white/10 bg-white/[0.04] p-6'>
                <h3 className='text-xl font-semibold text-white'>{title}</h3>
                <p className='mt-3 text-base leading-7 text-white/64'>{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
