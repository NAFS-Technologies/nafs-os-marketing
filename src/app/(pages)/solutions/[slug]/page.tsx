import type { Metadata } from 'next'

import Link from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, XIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

import { PageReveal } from '@/components/landing/cinematic-motion'
import { EventTicker } from '@/components/landing/event-ticker'
import { solutionCards } from '@/content/nafs-landing'

const solutionRuntime: Record<string, { headline: string; events: readonly { name: string; meta: string; status: string }[]; before: readonly string[]; after: readonly string[] }> = {
  orders: {
    headline: 'Move orders without losing responsibility between teams.',
    events: [
      { name: 'order.confirmed', meta: 'Order #10482 arrived from the storefront with the customer and delivery details', status: 'Order ready' },
      { name: 'inventory.reserved', meta: '2 units set aside at Dhaka Central for this order', status: 'Stock reserved' },
      { name: 'fulfillment.assigned', meta: 'The warehouse team received the picking task', status: 'Team assigned' }
    ],
    before: ['Operations checks several places before releasing an order', 'The warehouse has to ask what should happen next', 'Exceptions depend on someone following up manually'],
    after: ['One order carries the customer, product and delivery details', 'The next task appears in the right team’s queue', 'Blocks and exceptions stay visible until they are resolved']
  },
  inventory: {
    headline: 'Make stock explainable again.',
    events: [
      { name: 'stock.changed', meta: '2 units moved from available to reserved for Order #10482', status: 'Movement recorded' },
      { name: 'transfer.created', meta: '12 units scheduled to move from Gulshan to Dhaka Central', status: 'Transfer open' },
      { name: 'count.difference', meta: 'The team counted 27 units where the system expected 28', status: 'Review needed' }
    ],
    before: ['The website, warehouse and spreadsheet show different quantities', 'It is difficult to explain why stock changed', 'Teams mix up physical stock and stock already promised to orders'],
    after: ['Every movement keeps the reason behind the change', 'Availability is clear for each location', 'Counts, adjustments and transfers remain connected']
  },
  purchasing: {
    headline: 'Buy with better information before a stockout.',
    events: [
      { name: 'low.stock.flagged', meta: '16 units remain and the supplier usually takes 18 days', status: 'Review needed' },
      { name: 'supplier.details.ready', meta: 'Minimum order 48 units · usual lead time 18 days', status: 'Buying details ready' },
      { name: 'purchase.draft.created', meta: 'A suggested order for 72 units is ready for the buyer to review', status: 'Draft ready' }
    ],
    before: ['Buying starts only after someone notices a shortage', 'Supplier terms live in another spreadsheet', 'Too much cash can be locked in slow-moving inventory'],
    after: ['Low-stock reviews start from current availability', 'Supplier limits and lead times are visible beside the decision', 'Suggested purchases can be reviewed before money is committed']
  },
  money: {
    headline: 'Close the money after the parcel moves.',
    events: [
      { name: 'payment.opened', meta: 'Order #10482 expects ৳4,820 through cash on delivery', status: 'Payment open' },
      { name: 'delivery.completed', meta: 'Pathao marked the parcel as delivered', status: 'Delivered' },
      { name: 'settlement.review', meta: 'The expected ৳4,820 is ready to be matched with the courier payment', status: 'Ready to match' }
    ],
    before: ['COD follow-up becomes a separate operation', 'Finance chases courier spreadsheets', 'The payment status and order status drift apart'],
    after: ['Payment and settlement stay tied to the original sale', 'Delivery updates feed the money follow-up', 'Open COD work remains visible after fulfillment is complete']
  },
  management: {
    headline: 'Give management a current view of the operation.',
    events: [
      { name: 'business.updated', meta: '1,248 orders today · 56 still waiting in fulfillment', status: 'Current view ready' },
      { name: 'attention.updated', meta: '24 stock issues · 7 delivery issues · 11 payment issues', status: 'Attention list updated' },
      { name: 'change.recorded', meta: 'An inventory adjustment was recorded with the person and time', status: 'History updated' }
    ],
    before: ['Answers arrive after several exports are combined', 'Different teams report different numbers', 'Problems are often discovered after they become urgent'],
    after: ['Reports use the same information as the daily operation', 'Issues are grouped into one attention view', 'Important changes keep the person, reason and time']
  },
  team: {
    headline: 'Make the process work without one person knowing everything.',
    events: [
      { name: 'access.checked', meta: 'The operations manager opened the work allowed for their role', status: 'Access confirmed' },
      { name: 'work.assigned', meta: 'A return review was sent to the returns team', status: 'Owner clear' },
      { name: 'approval.recorded', meta: 'A refund approval was saved with the responsible manager', status: 'Decision recorded' }
    ],
    before: ['Daily work depends on personal memory', 'Permissions and responsibilities become unclear', 'One experienced operator becomes a single point of failure'],
    after: ['Queues make the next owner clear', 'Roles define who can view and change important information', 'The history shows who made important decisions']
  }
}

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return solutionCards.map(solution => ({ slug: solution.id }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const solution = solutionCards.find(item => item.id === slug)

  if (!solution) return {}

  return { title: solution.title, description: solution.outcome, alternates: { canonical: `/solutions/${slug}` } }
}

export default async function SolutionPage({ params }: PageProps) {
  const { slug } = await params
  const solution = solutionCards.find(item => item.id === slug)
  const runtime = solutionRuntime[slug]

  if (!solution || !runtime) notFound()

  return (
    <>
      <section className='bg-[#fafaf8] pb-16 pt-32 sm:pb-24 sm:pt-40'>
        <div className='mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <Link href='/solutions' className='site-arrow-link inline-flex items-center gap-2 text-sm font-semibold text-[#777773] hover:text-[#111]'><ArrowLeftIcon className='size-4' />Solutions</Link>
            <div className='mx-auto mt-8 max-w-4xl text-center sm:mt-9'>
              <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>{solution.title}</p>
              <h1 className='mt-5 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] min-[390px]:text-5xl sm:text-7xl lg:text-[72px] lg:leading-[.99]'>{runtime.headline}</h1>
              <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6f6f6a]'>{solution.problem}</p>
              <p className='mx-auto mt-4 max-w-2xl text-base leading-7 text-[#4f4f4b]'>{solution.outcome}</p>
            </div>
          </PageReveal>
        </div>
      </section>

      <section className='bg-[#fafaf8] pb-20 sm:pb-24'>
        <div className='mx-auto max-w-[1080px] px-4 sm:px-6 lg:px-8'>
          <PageReveal><EventTicker events={runtime.events} /></PageReveal>
        </div>
      </section>

      <section className='border-y border-[#e7e7e4] bg-white py-20 sm:py-24'>
        <div className='mx-auto grid max-w-[1080px] gap-5 px-4 sm:px-6 md:grid-cols-2 lg:px-8'>
          <PageReveal>
            <div className='h-full rounded-[22px] border border-rose-200 bg-rose-50/50 p-5 sm:rounded-[24px] sm:p-6'>
              <div className='flex items-center gap-3'><span className='grid size-10 place-items-center rounded-full bg-white text-rose-600 shadow-sm'><XIcon className='size-5' /></span><h2 className='text-xl font-semibold text-[#222]'>Before</h2></div>
              <div className='mt-6 space-y-3'>{runtime.before.map(item => <div key={item} className='rounded-xl bg-white/80 p-4 text-base leading-7 text-[#6f5f5f]'>{item}</div>)}</div>
            </div>
          </PageReveal>
          <PageReveal delay={.08}>
            <div className='h-full rounded-[22px] border border-emerald-200 bg-emerald-50/50 p-5 sm:rounded-[24px] sm:p-6'>
              <div className='flex items-center gap-3'><span className='grid size-10 place-items-center rounded-full bg-white text-emerald-600 shadow-sm'><CheckIcon className='size-5' /></span><h2 className='text-xl font-semibold text-[#222]'>With NAFS</h2></div>
              <div className='mt-6 space-y-3'>{runtime.after.map(item => <div key={item} className='rounded-xl bg-white/80 p-4 text-base leading-7 text-[#50675e]'>{item}</div>)}</div>
            </div>
          </PageReveal>
        </div>
      </section>

      <section className='bg-[#fafaf8] py-20 sm:py-24'>
        <div className='mx-auto max-w-[1080px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='grid gap-9 lg:grid-cols-[.75fr_1.25fr] lg:gap-10'>
              <div>
                <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>WHAT NAFS BRINGS TOGETHER</p>
                <h2 className='mt-4 text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-5xl'>One workflow, all the right parts.</h2>
                <p className='mt-5 text-base leading-7 text-[#71716c]'>Solving this problem crosses several areas of the business. NAFS keeps them working together instead of making the team join the pieces by hand.</p>
              </div>
              <div className='grid gap-3 sm:grid-cols-2'>
                {solution.modules.map(module => <div key={module} className='rounded-2xl border border-[#e5e5e1] bg-white p-5 text-base font-semibold text-[#44443f]'>{module}</div>)}
              </div>
            </div>
          </PageReveal>
          <div className='mt-10 flex sm:mt-12 sm:justify-end'><Link href='/#contact' className='site-action site-arrow-link inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#111] px-6 text-[15px] font-semibold text-white sm:w-auto'>Show me this workflow <ArrowRightIcon className='size-4' /></Link></div>
        </div>
      </section>
    </>
  )
}
