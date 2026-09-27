import type { Metadata } from 'next'

import Link from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

import { PageReveal } from '@/components/landing/cinematic-motion'
import { EventTicker } from '@/components/landing/event-ticker'
import { useCases } from '@/content/nafs-landing'

const runtime: Record<string, { headline: string; events: readonly { name: string; meta: string; status: string }[]; pressure: readonly [string, string][] }> = {
  'multi-brand-retail': {
    headline: 'Keep a large catalog from turning into daily confusion.',
    events: [
      { name: 'stock.updated', meta: '3 units sold and 2 units reserved for a foundation shade at Dhaka Central', status: 'Stock updated' },
      { name: 'supplier.delivery', meta: '144 units received against Purchase Order #882', status: 'Products received' },
      { name: 'exchange.opened', meta: 'A shade exchange was linked to the original order and product', status: 'Review needed' }
    ],
    pressure: [['Catalog', 'Thousands of products and variants need one consistent identity.'], ['Inventory', 'Stock moves frequently across teams and locations.'], ['Suppliers', 'Many suppliers create different buying terms and lead times.'], ['After the sale', 'Returns and exchanges must stay connected to the original purchase.']]
  },
  'd2c-commerce': {
    headline: 'Grow order volume without growing admin work at the same rate.',
    events: [
      { name: 'campaign.spike', meta: '184 orders arrived in 15 minutes after a campaign launch', status: 'Higher volume detected' },
      { name: 'warehouse.updated', meta: 'The Dhaka queue expanded and 17 orders need faster attention', status: 'Team updated' },
      { name: 'attention.list', meta: 'Returns, payments and stock issues were grouped for review', status: 'Priorities visible' }
    ],
    pressure: [['Volume', 'Campaigns create sudden order spikes.'], ['Fulfillment', 'Warehouse queues need to absorb more work quickly.'], ['Customers', 'Returns and follow-up rise with order volume.'], ['Management', 'The business picture must stay current during rapid growth.']]
  },
  'social-plus-website': {
    headline: 'Turn several sales sources into one operation.',
    events: [
      { name: 'order.added', meta: 'A Facebook-assisted order was added with its original reference', status: 'Order received' },
      { name: 'customer.matched', meta: 'The phone number matched an existing customer instead of creating a duplicate', status: 'Customer linked' },
      { name: 'stock.reserved', meta: 'Website stock was reserved from the same Dhaka inventory', status: 'Stock protected' }
    ],
    pressure: [['Orders', 'Different sources arrive with different information.'], ['Customers', 'The same buyer may appear more than once across channels.'], ['Stock', 'Every channel is selling from the same inventory.'], ['Fulfillment', 'The warehouse still needs one consistent way to process the work.']]
  },
  'cod-heavy-business': {
    headline: 'Keep control after the parcel is delivered.',
    events: [
      { name: 'delivery.completed', meta: 'Pathao marked the ৳4,820 cash-on-delivery parcel as delivered', status: 'Delivered' },
      { name: 'payment.expected', meta: 'NAFS opened the expected courier payment for Order #10482', status: 'Waiting for payment' },
      { name: 'payment.matched', meta: 'The courier amount matched the expected ৳4,820 with no difference', status: 'COD closed' }
    ],
    pressure: [['Courier', 'Delivery updates affect finance and customer follow-up.'], ['COD', 'A collected payment is not finished until the business receives and matches it.'], ['Returns', 'Failed delivery changes both stock and money.'], ['Reports', 'Cash visibility needs to connect back to the original order.']]
  },
  'multi-location': {
    headline: 'Know where stock is before deciding what can be sold or shipped.',
    events: [
      { name: 'location.checked', meta: '27 units in Dhaka · 8 in Gulshan · 4 already promised to orders', status: 'Availability current' },
      { name: 'transfer.created', meta: '6 units scheduled to move from Gulshan to Dhaka', status: 'Transfer moving' },
      { name: 'count.difference', meta: 'The Dhaka team counted 26 units where NAFS expected 27', status: 'Review needed' }
    ],
    pressure: [['Availability', 'Stock must be clear for each location.'], ['Transfers', 'Moving products between locations changes what can be sold.'], ['Counts', 'Physical stock needs to match the system.'], ['Allocation', 'Every order needs a clear location responsible for fulfillment.']]
  }
}

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return useCases.map(item => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const item = useCases.find(useCase => useCase.slug === slug)

  if (!item) return {}

  return { title: item.title, description: item.lead, alternates: { canonical: `/use-cases/${slug}` } }
}

export default async function UseCasePage({ params }: PageProps) {
  const { slug } = await params
  const item = useCases.find(useCase => useCase.slug === slug)
  const model = runtime[slug]

  if (!item || !model) notFound()

  return (
    <>
      <section className='bg-[#fafaf8] pb-16 pt-32 sm:pb-24 sm:pt-40'>
        <div className='mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <Link href='/use-cases' className='site-arrow-link inline-flex items-center gap-2 text-sm font-semibold text-[#777773] hover:text-[#111]'><ArrowLeftIcon className='size-4' />Use cases</Link>
            <div className='mx-auto mt-8 max-w-4xl text-center sm:mt-9'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>{item.title}</p>
              <h1 className='mt-5 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] min-[390px]:text-5xl sm:text-7xl lg:text-[72px] lg:leading-[.99]'>{model.headline}</h1>
              <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6f6f6a]'>{item.lead}</p>
              <p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-[#4f4f4b]'>{item.solution}</p>
            </div>
          </PageReveal>
        </div>
      </section>

      <section className='bg-[#fafaf8] pb-20 sm:pb-24'>
        <div className='mx-auto max-w-[1080px] px-4 sm:px-6 lg:px-8'>
          <PageReveal><EventTicker events={model.events} /></PageReveal>
        </div>
      </section>

      <section className='border-y border-[#e7e7e4] bg-white py-20 sm:py-24'>
        <div className='mx-auto max-w-[1080px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='mx-auto max-w-3xl text-center'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>WHERE WORK GETS HARD</p>
              <h2 className='mt-4 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-5xl'>Each business feels complexity in a different place.</h2>
            </div>
          </PageReveal>
          <div className='mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {model.pressure.map(([label, detail], index) => (
              <PageReveal key={label} delay={index * .04}>
                <div className='site-card h-full rounded-2xl border border-[#e5e5e1] bg-[#fafaf8] p-5'>
                  <p className='text-sm font-semibold text-violet-700'>{label}</p>
                  <p className='mt-3 text-base leading-7 text-[#62625d]'>{detail}</p>
                </div>
              </PageReveal>
            ))}
          </div>
        </div>
      </section>

      <section className='bg-[#fafaf8] py-20 sm:py-24'>
        <div className='mx-auto max-w-[1080px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='grid gap-9 lg:grid-cols-[.75fr_1.25fr] lg:gap-10'>
              <div>
                <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>WHAT NAFS BRINGS TOGETHER</p>
                <h2 className='mt-4 text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-5xl'>One platform, configured for the way your business runs.</h2>
                <p className='mt-5 text-base leading-7 text-[#71716c]'>These parts work together because this business model depends on all of them sharing the same information.</p>
              </div>
              <div className='grid gap-3 sm:grid-cols-2'>{item.modules.map(module => <div key={module} className='rounded-2xl border border-[#e5e5e1] bg-white p-5 text-base font-semibold text-[#44443f]'>{module}</div>)}</div>
            </div>
          </PageReveal>
          <div className='mt-10 flex sm:mt-12 sm:justify-end'><Link href='/#contact' className='site-action site-arrow-link inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#111] px-6 text-[15px] font-semibold text-white sm:w-auto'>Show me how NAFS would fit <ArrowRightIcon className='size-4' /></Link></div>
        </div>
      </section>
    </>
  )
}
