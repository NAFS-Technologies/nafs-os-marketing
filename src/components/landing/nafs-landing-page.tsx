import Link from 'next/link'

import { ArrowRightIcon } from 'lucide-react'

import { PageReveal } from '@/components/landing/cinematic-motion'
import { DemoRequestForm } from '@/components/landing/demo-request-form'
import {
  B2BPlatformScene,
  CommercePulseScene,
  IntegrationLogoCloud,
  MigrationBoard,
  PartnerGrowthScene,
  ProductMapScene,
  TechnologyRails,
  VisibilityConsole
} from '@/components/landing/platform-visuals'
import { PristineHeroScene } from '@/components/landing/pristine-scenes'

const signUpUrl = `${(process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.nafs.tech').replace(/\/$/, '')}/auth/sign-up`

const platformPillars = [
  ['Run', 'Manage orders, stock, fulfillment, purchasing, payments and reporting from one connected workspace.'],
  ['Connect', 'Keep the storefronts and tools you already use, then connect them to NAFS as your business grows.'],
  ['Launch', 'Offer NAFS to client businesses under your own brand, plans and domains.'],
  ['Grow', 'Create referral, agency and reseller programs with clear tracking from introduction to commission.']
] as const

const rolloutSteps = [
  'Connect the tools and channels you already use.',
  'Fix the handoffs costing your team the most time.',
  'Add more NAFS products as the value becomes clear.'
] as const

export const NafsLandingPage = () => (
  <>
    <section id='home' className='relative overflow-hidden bg-[#fafaf8] pt-24 sm:pt-28'>
      <div className='pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(15,15,15,.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,15,15,.025)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:linear-gradient(to_bottom,black,transparent_86%)]' aria-hidden='true' />
      <div className='relative mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8'>
        <div className='mx-auto max-w-6xl pt-12 text-center sm:pt-20'>
          <PageReveal>
            <p className='font-mono text-xs font-medium uppercase tracking-[0.16em] text-[#8e8e89]'>NAFS / COMMERCE OPERATING SYSTEM</p>
            <h1 className='mt-6 text-balance text-[48px] font-medium leading-[0.96] tracking-[-0.062em] text-[#0b0b0b] min-[390px]:text-[54px] sm:text-[80px] sm:tracking-[-0.072em] lg:text-[112px]'>Everything behind modern commerce.</h1>
            <p className='mx-auto mt-7 max-w-3xl text-pretty text-lg leading-8 text-[#676762] sm:mt-8 sm:text-xl'>
              Run orders, inventory, fulfillment, delivery, payments and automation from one place—while keeping the storefronts and tools your business already depends on.
            </p>
            <div className='mt-8 flex flex-col items-stretch justify-center gap-3 min-[420px]:items-center sm:mt-9 sm:flex-row'>
              <Link href={signUpUrl} className='site-action site-arrow-link inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#111] px-6 text-[15px] font-semibold text-white shadow-[0_10px_28px_rgba(0,0,0,.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/55 focus-visible:ring-offset-2'>Start free trial <ArrowRightIcon className='size-4' /></Link>
              <Link href='#contact' className='site-action inline-flex h-12 items-center justify-center rounded-full border border-[#dcdcd8] bg-white px-6 text-[15px] font-semibold text-[#171717] transition hover:border-[#bdbdb7] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/55 focus-visible:ring-offset-2'>Plan a walkthrough</Link>
            </div>
            <Link href='/integrations' className='site-text-link mt-3 inline-flex min-h-11 items-center justify-center rounded-sm text-sm font-medium text-[#676762] underline underline-offset-4 transition hover:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/55 focus-visible:ring-offset-2'>Connect your existing tools</Link>
          </PageReveal>
        </div>
        <PageReveal delay={0.12}><PristineHeroScene /></PageReveal>
      </div>
    </section>

    <section className='bg-white py-12 sm:py-16'>
      <div className='mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-8'>
        <PageReveal>
          <div className='grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4'>
            {[
              ['900+', 'apps and APIs available through Nango'],
              ['1', 'connected place to run commerce'],
              ['B2B', 'launch NAFS under your brand'],
              ['Partners', 'track referrals and commissions']
            ].map(([value, label]) => (
              <div key={label} className='site-card min-h-28 rounded-2xl border border-[#e7e7e3] bg-[#fafaf8] p-4 sm:min-h-32 sm:p-5'>
                <p className='site-tabular text-2xl font-semibold tracking-[-0.04em] text-[#111] sm:text-3xl'>{value}</p>
                <p className='mt-2 text-sm leading-6 text-[#74746f]'>{label}</p>
              </div>
            ))}
          </div>
        </PageReveal>
        <div className='mt-5'><TechnologyRails /></div>
      </div>
    </section>

    <section className='bg-[#fafaf8] py-20 sm:py-28'>
      <div className='mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8'>
        <PageReveal>
          <div className='mx-auto mb-10 max-w-4xl text-center sm:mb-12'>
            <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>FROM ORDER TO OUTCOME</p>
            <h2 className='mt-4 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-6xl'>One sale. The entire business keeps moving.</h2>
            <p className='mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#72726d]'>When an order arrives, NAFS keeps stock, warehouse work, delivery and follow-up moving together.</p>
          </div>
        </PageReveal>
        <CommercePulseScene />
      </div>
    </section>

    <section className='border-y border-[#e7e7e4] bg-white py-20 sm:py-28'>
      <div className='mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8'>
        <PageReveal>
          <div className='grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>THE PLATFORM</p>
              <h2 className='mt-4 text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-6xl'>One platform. Focused products for every part of commerce.</h2>
            </div>
            <p className='max-w-xl text-lg leading-8 text-[#71716c] lg:justify-self-end'>NAFS OS runs the core business. Storefront, Flow, Mobile, Courier, B2B and Partners add the customer, automation, delivery and growth tools you need around it.</p>
          </div>
        </PageReveal>
        <div className='mt-10 sm:mt-12'><ProductMapScene /></div>
        <div className='mt-6 grid gap-3 sm:mt-8 md:grid-cols-2 lg:grid-cols-4'>
          {platformPillars.map(([title, detail]) => (
            <div key={title} className='site-card rounded-2xl border border-[#e8e8e4] bg-[#fafaf8] p-5'>
              <p className='text-lg font-semibold text-[#222]'>{title}</p>
              <p className='mt-3 text-base leading-7 text-[#74746f]'>{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className='bg-[#fafaf8] py-20 sm:py-28'>
      <div className='mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8'>
        <PageReveal>
          <div className='grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>MIGRATION & INTEGRATIONS</p>
              <h2 className='mt-4 text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-6xl'>Keep your storefront. Improve everything behind it.</h2>
            </div>
            <div className='max-w-xl lg:justify-self-end'>
              <p className='text-lg leading-8 text-[#71716c]'>Connect WooCommerce or Shopify, bring across the information you need and move daily operations into NAFS without rebuilding the customer experience first.</p>
              <Link href='/integrations' className='site-arrow-link mt-5 inline-flex items-center gap-2 text-base font-semibold text-[#111] focus-visible:outline-none'>Explore integrations <ArrowRightIcon className='size-4' /></Link>
            </div>
          </div>
        </PageReveal>
        <div className='mt-10 sm:mt-12'><MigrationBoard /></div>
        <div className='mt-6'><IntegrationLogoCloud /></div>
      </div>
    </section>

    <section className='border-y border-[#e7e7e4] bg-white py-20 sm:py-28'>
      <div className='mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8'>
        <PageReveal>
          <div className='grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>B2B PLATFORM</p>
              <h2 className='mt-4 text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-6xl'>Launch commerce software under your own brand.</h2>
            </div>
            <div className='max-w-xl lg:justify-self-end'>
              <p className='text-lg leading-8 text-[#71716c]'>Create your offer, onboard client businesses, use custom domains and build recurring software and service revenue without developing the platform from zero.</p>
              <Link href='/b2b' className='site-arrow-link mt-5 inline-flex items-center gap-2 text-base font-semibold text-[#111] focus-visible:outline-none'>Explore the B2B platform <ArrowRightIcon className='size-4' /></Link>
            </div>
          </div>
        </PageReveal>
        <div className='mt-10 sm:mt-12'><B2BPlatformScene /></div>
      </div>
    </section>

    <section className='bg-[#fafaf8] py-20 sm:py-28'>
      <div className='mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8'>
        <PageReveal>
          <div className='grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>PARTNERS & REFERRALS</p>
              <h2 className='mt-4 text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-6xl'>Grow with NAFS—and earn from the value you create.</h2>
            </div>
            <div className='max-w-xl lg:justify-self-end'>
              <p className='text-lg leading-8 text-[#71716c]'>Refer the right business, deliver an implementation, build an integration or resell the platform. NAFS keeps the journey from introduction to commission clear.</p>
              <Link href='/partners' className='site-arrow-link mt-5 inline-flex items-center gap-2 text-base font-semibold text-[#111] focus-visible:outline-none'>Explore partnerships <ArrowRightIcon className='size-4' /></Link>
            </div>
          </div>
        </PageReveal>
        <div className='mt-10 sm:mt-12'><PartnerGrowthScene /></div>
      </div>
    </section>

    <section className='bg-[#0d0e12] py-20 text-white sm:py-28'>
      <div className='mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-8'>
        <PageReveal>
          <div className='grid gap-8 lg:grid-cols-[.72fr_1.28fr] lg:items-end'>
            <div>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-300'>VISIBILITY & CONTROL</p>
              <h2 className='mt-4 text-balance text-4xl font-medium tracking-[-0.05em] text-white sm:text-6xl'>Know what happened, what is running and what needs attention.</h2>
            </div>
            <p className='max-w-xl text-lg leading-8 text-white/68 lg:justify-self-end'>Important actions leave a clear history—from the order and stock update to delivery, payment and automation—so your team can find problems and recover faster.</p>
          </div>
        </PageReveal>
        <div className='mt-10 sm:mt-12'><VisibilityConsole /></div>
      </div>
    </section>

    <section id='contact' tabIndex={-1} aria-labelledby='contact-heading' className='scroll-mt-24 bg-[#fafaf8] py-20 outline-none sm:py-28'>
      <div className='mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8'>
        <div className='grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:gap-14'>
          <PageReveal>
            <div className='lg:sticky lg:top-28'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>START WITH YOUR BIGGEST BOTTLENECK</p>
              <h2 id='contact-heading' className='mt-4 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-5xl'>Show us the part of your operation that is hardest to run today.</h2>
              <p className='mt-6 max-w-md text-base leading-7 text-[#71716c]'>We will map the people, tools and steps involved, then recommend the smallest NAFS rollout that can make a measurable difference.</p>
              <div className='mt-8 space-y-3'>
                {rolloutSteps.map((step, index) => (
                  <div key={step} className='flex items-center gap-3 rounded-2xl border border-[#e5e5e1] bg-white px-4 py-3'>
                    <span className='grid size-8 shrink-0 place-items-center rounded-full bg-[#f2efff] font-mono text-[11px] font-semibold text-violet-700'>0{index + 1}</span>
                    <p className='text-sm font-medium leading-6 text-[#666661]'>{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </PageReveal>
          <PageReveal delay={0.08}><DemoRequestForm /></PageReveal>
        </div>
      </div>
    </section>
  </>
)
