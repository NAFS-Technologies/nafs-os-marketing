import type { Metadata } from 'next'

import Link from 'next/link'
import { ArrowRightIcon, BoxesIcon, Building2Icon, CircleDollarSignIcon, HeadphonesIcon, PlugZapIcon, WorkflowIcon } from 'lucide-react'

import { PageReveal } from '@/components/landing/cinematic-motion'
import { IntegrationLogoCloud, MigrationBoard, TechnologyRails } from '@/components/landing/platform-visuals'

export const metadata: Metadata = {
  title: 'Integrations',
  description: 'Connect WooCommerce, Shopify and the business tools around your commerce operation without replacing everything at once.',
  alternates: { canonical: '/integrations' }
}

const categories = [
  { icon: BoxesIcon, title: 'Commerce', detail: 'Connect storefronts, payments and the tools that bring orders into your business.' },
  { icon: Building2Icon, title: 'CRM and sales', detail: 'Keep customer and sales teams connected through tools such as HubSpot and Salesforce.' },
  { icon: CircleDollarSignIcon, title: 'Finance', detail: 'Connect accounting and finance tools such as QuickBooks, Xero and NetSuite.' },
  { icon: HeadphonesIcon, title: 'Support and teamwork', detail: 'Bring Slack, Teams, Jira, Intercom and Zendesk into the workflows around each customer.' },
  { icon: WorkflowIcon, title: 'Files and knowledge', detail: 'Use Google Drive, Notion, SharePoint and related tools where your teams already work.' },
  { icon: PlugZapIcon, title: 'Business systems', detail: 'Reach SAP, ServiceNow and hundreds of other supported apps and APIs through Nango.' }
] as const

const channelStatus = [
  ['WooCommerce', 'Guided connection available', 'Authorize your store without copying API keys. We confirm the final setup for your store before launch.'],
  ['Shopify', 'Connection path available', 'We review and configure each Shopify connection before it starts moving live business data.'],
  ['Daraz', 'Planned, not yet available', 'We will not sell Daraz as live until the complete order, return and recovery flow has been verified.']
] as const

export default function IntegrationsPage() {
  return (
    <>
      <section className='bg-[#fafaf8] pb-16 pt-32 sm:pb-24 sm:pt-40'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-4xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>INTEGRATIONS</p>
              <h1 className='mt-5 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] min-[390px]:text-5xl sm:text-7xl lg:text-[76px] lg:leading-[.98]'>Connect the tools you already use. Run the work in one place.</h1>
              <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6f6f6a]'>Keep your current storefront and business apps. NAFS connects the information you need, then brings orders, stock, fulfillment, payments and reporting into one operation.</p>
              <div className='mt-8 flex flex-col items-stretch justify-center gap-3 min-[420px]:items-center sm:flex-row'>
                <Link href='/#contact' className='site-action site-arrow-link inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#111] px-6 text-[15px] font-semibold text-white'>Plan a connection <ArrowRightIcon className='size-4' /></Link>
                <span className='inline-flex h-12 items-center justify-center text-[15px] font-semibold text-[#777773]'>900+ apps and APIs supported through Nango</span>
              </div>
            </div>
          </PageReveal>
          <div className='mt-10 sm:mt-14'><IntegrationLogoCloud /></div>
        </div>
      </section>

      <section className='border-y border-[#e7e7e4] bg-white py-20 sm:py-28'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto mb-10 max-w-3xl text-center sm:mb-12'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>MOVE WITHOUT STOPPING SALES</p>
              <h2 className='mt-4 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-6xl'>Improve the operation without rebuilding the storefront first.</h2>
              <p className='mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#71716c]'>Connect the store, choose what to bring across and move the work in phases while customers keep shopping.</p>
            </div>
          </PageReveal>
          <MigrationBoard />
        </div>
      </section>

      <section className='bg-[#fafaf8] py-20 sm:py-28'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-3xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>MORE THAN STOREFRONTS</p>
              <h2 className='mt-4 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-6xl'>Connect the systems around sales, finance, support and teamwork.</h2>
              <p className='mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#71716c]'>Use the same secure connection layer to bring the right information and actions into the workflows your teams already follow.</p>
            </div>
          </PageReveal>
          <div className='mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3 sm:mt-12'>
            {categories.map(({ icon: Icon, title, detail }) => (
              <div key={title} className='site-card rounded-2xl border border-[#e7e7e3] bg-white p-6'>
                <span className='grid size-11 place-items-center rounded-xl bg-[#fafaf8] text-violet-700 ring-1 ring-black/5'><Icon className='size-5' /></span>
                <h3 className='mt-6 text-xl font-semibold text-[#222]'>{title}</h3>
                <p className='mt-3 text-base leading-7 text-[#71716c]'>{detail}</p>
              </div>
            ))}
          </div>

          <PageReveal>
            <div className='mt-10 rounded-[22px] border border-[#e4e4e0] bg-white p-5 sm:mt-12 sm:rounded-[24px] sm:p-7'>
              <div className='grid gap-8 lg:grid-cols-[.68fr_1.32fr] lg:items-start'>
                <div>
                  <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>CURRENT STORE CONNECTIONS</p>
                  <h3 className='mt-4 text-3xl font-medium tracking-[-0.045em] text-[#111] sm:text-4xl'>Know what is ready before you connect.</h3>
                  <p className='mt-4 text-base leading-7 text-[#71716c]'>We confirm the exact data, actions and launch requirements for every store instead of treating a logo as proof that everything is complete.</p>
                </div>
                <div className='grid gap-3'>
                  {channelStatus.map(([name, status, detail]) => (
                    <div key={name} className='rounded-2xl bg-[#fafaf8] p-5'>
                      <div className='flex flex-col justify-between gap-2 sm:flex-row sm:items-center'>
                        <p className='text-lg font-semibold text-[#222]'>{name}</p>
                        <span className='text-sm font-semibold text-violet-700'>{status}</span>
                      </div>
                      <p className='mt-2 text-base leading-7 text-[#71716c]'>{detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PageReveal>
        </div>
      </section>

      <section className='bg-[#0d0e12] py-20 text-white sm:py-28'>
        <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-3xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-300'>SECURE BY DESIGN</p>
              <h2 className='mt-4 text-balance text-4xl font-medium tracking-[-0.05em] sm:text-6xl'>Connect safely. Keep your operation in control.</h2>
              <p className='mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/68'>Nango secures access to external tools. NAFS uses only the information and actions agreed for your rollout, and every important automation remains visible.</p>
            </div>
          </PageReveal>
          <div className='mt-10 sm:mt-12'><TechnologyRails /></div>
        </div>
      </section>
    </>
  )
}
