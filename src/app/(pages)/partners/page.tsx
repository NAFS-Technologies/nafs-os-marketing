import type { Metadata } from 'next'

import Link from 'next/link'
import { ArrowRightIcon, BadgeDollarSignIcon, BriefcaseBusinessIcon, MegaphoneIcon, NetworkIcon } from 'lucide-react'

import { PageReveal } from '@/components/landing/cinematic-motion'
import { PartnerGrowthScene, TechnologyRails } from '@/components/landing/platform-visuals'

export const metadata: Metadata = {
  title: 'Partners',
  description: 'Refer clients, deliver NAFS services, build integrations or resell the platform through a clear partner program.',
  alternates: { canonical: '/partners' }
}

const tracks = [
  { icon: MegaphoneIcon, title: 'Creators and industry voices', detail: 'Introduce NAFS to businesses that fit the platform through trackable referral links and campaigns.' },
  { icon: BriefcaseBusinessIcon, title: 'Consultants and agencies', detail: 'Bring NAFS into client projects and earn from setup, migration, training and ongoing services.' },
  { icon: NetworkIcon, title: 'Technology partners', detail: 'Build integrations and specialist solutions that help NAFS customers get more from the platform.' },
  { icon: BadgeDollarSignIcon, title: 'Resellers and B2B partners', detail: 'Package NAFS for your market, onboard client businesses and build recurring software revenue.' }
] as const

const partnerProduct = [
  ['Referral links', 'Create and share trackable links for each campaign.'],
  ['Performance', 'See clicks, leads, customers and attributed revenue.'],
  ['Partner programs', 'Organize different offers, rules and partner groups.'],
  ['Commissions', 'See when qualified revenue creates a commission.'],
  ['Partner dashboard', 'Give partners one place to follow their activity and earnings.'],
  ['Simple onboarding', 'Invite partners without giving them access to customer operations.']
] as const

export default function PartnersPage() {
  return (
    <>
      <section className='bg-[#fafaf8] pb-16 pt-32 sm:pb-24 sm:pt-40'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-4xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>PARTNERSHIPS</p>
              <h1 className='mt-5 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] min-[390px]:text-5xl sm:text-7xl lg:text-[76px] lg:leading-[.98]'>Grow with NAFS—and earn from the value you help create.</h1>
              <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6f6f6a]'>Refer a business, lead an implementation, build an integration or resell NAFS to your own clients. We keep the journey from introduction to commission clear.</p>
              <div className='mt-8 flex flex-col items-stretch justify-center gap-3 min-[420px]:items-center sm:flex-row'>
                <Link href='/#contact' className='site-action site-arrow-link inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#111] px-6 text-[15px] font-semibold text-white'>Talk to partnerships <ArrowRightIcon className='size-4' /></Link>
                <Link href='/b2b' className='site-text-link inline-flex h-12 items-center justify-center text-[15px] font-semibold text-[#555551]'>Want to launch under your brand?</Link>
              </div>
            </div>
          </PageReveal>
          <div className='mt-10 sm:mt-14'><PartnerGrowthScene /></div>
        </div>
      </section>

      <section className='border-y border-[#e7e7e4] bg-white py-20 sm:py-28'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-3xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>CHOOSE YOUR PARTNER PATH</p>
              <h2 className='mt-4 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-6xl'>Work with NAFS in the way that matches what you already do.</h2>
              <p className='mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#71716c]'>A creator, agency, integration specialist and reseller create value in different ways. The program can reflect that.</p>
            </div>
          </PageReveal>
          <div className='mt-10 grid gap-4 md:grid-cols-2 sm:mt-12'>
            {tracks.map(({ icon: Icon, title, detail }) => (
              <div key={title} className='site-card rounded-2xl border border-[#e7e7e3] bg-[#fafaf8] p-6'>
                <span className='grid size-11 place-items-center rounded-xl bg-white text-violet-700 shadow-sm ring-1 ring-black/5'><Icon className='size-5' /></span>
                <h3 className='mt-6 text-xl font-semibold tracking-[-0.02em] text-[#222]'>{title}</h3>
                <p className='mt-3 text-base leading-7 text-[#71716c]'>{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-[#fafaf8] py-20 sm:py-28'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='grid gap-9 lg:grid-cols-[.78fr_1.22fr] lg:gap-10'>
              <div>
                <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>NAFS PARTNERS</p>
                <h2 className='mt-4 text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-5xl'>Everything partners need, in one workspace.</h2>
                <p className='mt-5 max-w-lg text-base leading-7 text-[#71716c]'>Follow referrals, leads, customers and commissions without needing access to a client’s orders, stock or daily operation.</p>
              </div>
              <div className='grid gap-4 sm:grid-cols-2'>
                {partnerProduct.map(([title, detail]) => (
                  <div key={title} className='site-card rounded-2xl border border-[#e6e6e2] bg-white p-5'>
                    <p className='text-lg font-semibold text-[#222]'>{title}</p>
                    <p className='mt-2 text-base leading-7 text-[#74746f]'>{detail}</p>
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
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-300'>CLEAR FROM REFERRAL TO COMMISSION</p>
              <h2 className='mt-4 text-balance text-4xl font-medium tracking-[-0.05em] sm:text-6xl'>When your introduction becomes revenue, you can still see the connection.</h2>
              <p className='mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/68'>NAFS can follow the referral, new customer, paid invoice and any later refund or cancellation so commission decisions stay understandable.</p>
            </div>
          </PageReveal>
          <div className='mt-10 sm:mt-12'><TechnologyRails /></div>
          <p className='mx-auto mt-6 max-w-3xl text-center text-sm leading-6 text-white/58'>Rates, eligibility and payment timing vary by program. We confirm the terms before you join, and we do not guarantee earnings.</p>
        </div>
      </section>
    </>
  )
}
