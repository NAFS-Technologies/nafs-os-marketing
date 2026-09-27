import type { Metadata } from 'next'

import Link from 'next/link'
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { notFound } from 'next/navigation'

import { PageReveal } from '@/components/landing/cinematic-motion'
import { EventTicker } from '@/components/landing/event-ticker'
import { productEcosystem } from '@/content/nafs-landing'

const narratives: Record<string, { headline: string; thesis: string; events: readonly { name: string; meta: string; status: string }[]; proof: readonly [string, string][] }> = {
  os: {
    headline: 'Run the business behind every sale.',
    thesis: 'NAFS OS keeps products, orders, customers, stock, fulfillment, purchasing, payments and reporting connected so teams stop rebuilding context at every handoff.',
    events: [
      { name: 'order.confirmed', meta: 'Order #10482 from the online store · ৳4,820 · Cash on delivery', status: 'Order ready' },
      { name: 'inventory.reserved', meta: '2 units set aside at Dhaka Central for Order #10482', status: 'Stock reserved' },
      { name: 'fulfillment.assigned', meta: 'Picking task sent to the Dhaka Central warehouse team', status: 'Team assigned' }
    ],
    proof: [['One shared record', 'Orders, stock, delivery and money stay connected from start to finish.'], ['The right access', 'Each team sees the work and information relevant to its role.'], ['Reliable processing', 'Important jobs continue in the background when a request takes longer.'], ['Clear history', 'See what changed, who changed it and when it happened.']]
  },
  storefront: {
    headline: 'Give customers a storefront connected to the operation.',
    thesis: 'NAFS Storefront brings catalog, search, cart, checkout and customer accounts together with the same products, prices and stock your team manages in NAFS.',
    events: [
      { name: 'product.viewed', meta: 'A customer viewed Fenty Eaze Drop in the Bangladesh storefront', status: 'Product shown' },
      { name: 'checkout.quoted', meta: 'Dhaka delivery and cash-on-delivery total calculated at ৳4,820', status: 'Checkout ready' },
      { name: 'order.created', meta: 'Order #10482 added to NAFS with the customer and delivery details', status: 'Order received' }
    ],
    proof: [['Connected catalog', 'Products, prices and stock come from the same place your team manages.'], ['Fast shopping', 'Search, product pages, cart and checkout are designed as one customer journey.'], ['Flexible content', 'Campaign and editorial content can be updated without changing commerce data.'], ['Customer accounts', 'Customers can sign in and follow their own shopping activity.']]
  },
  flow: {
    headline: 'Automate routine work without losing control.',
    thesis: 'NAFS Flow turns important business events into repeatable actions, approvals and notifications across NAFS and connected tools.',
    events: [
      { name: 'automation.published', meta: 'Delivered-order follow-up approved and made available to the team', status: 'Ready to run' },
      { name: 'automation.started', meta: 'Delivery of Order #10482 started the approved follow-up steps', status: 'Running' },
      { name: 'approval.requested', meta: 'A manager was asked to review the suggested replenishment order', status: 'Waiting for review' }
    ],
    proof: [['Reusable automations', 'Turn a repeatable process into a workflow the team can use again.'], ['Reliable runs', 'Longer tasks keep running and retain their progress.'], ['Approvals', 'Keep people involved wherever a decision or sign-off is required.'], ['Connected tools', 'Use approved actions across NAFS and the apps your business already uses.']]
  },
  mobile: {
    headline: 'Put the next task in your team’s hands.',
    thesis: 'NAFS Mobile is designed around picking, scanning, receiving, returns, approvals and urgent work—not a smaller copy of the desktop system.',
    events: [
      { name: 'task.assigned', meta: 'Order #10482 added to the warehouse picking queue', status: 'Ready to pick' },
      { name: 'barcode.scanned', meta: '2 of 2 units matched for product FNT-230', status: 'Items matched' },
      { name: 'task.synced', meta: 'The completed pick was saved back to NAFS', status: 'Work saved' }
    ],
    proof: [['Work-first screens', 'Open the app and see the tasks that need attention now.'], ['Safe syncing', 'Completed work is protected from accidental duplicates.'], ['Secure access', 'People sign in to the right business and see only their permitted work.'], ['Core mobile tasks', 'Fulfillment, inventory, receiving, returns and approvals are designed for action.']]
  },
  shopping: {
    headline: 'Launch a shopping app under your brand.',
    thesis: 'NAFS Shopping gives customers a native mobile channel while products, cart, checkout and accounts remain connected to the same commerce operation.',
    events: [
      { name: 'brand.loaded', meta: 'Lavishta colors, logo and Bangladesh shopping settings applied', status: 'App ready' },
      { name: 'cart.updated', meta: '3 products added · subtotal ৳4,360', status: 'Cart saved' },
      { name: 'checkout.created', meta: 'Mobile checkout started with the same prices and delivery rules as the storefront', status: 'Checkout ready' }
    ],
    proof: [['Your branding', 'Apply the identity and customer experience of each business.'], ['Shared commerce', 'Use the same products, prices, cart and checkout rules as the storefront.'], ['Built for Bangladesh', 'Support BDT, COD and local delivery information.'], ['Native experience', 'Give customers a mobile app designed for everyday shopping.']]
  },
  courier: {
    headline: 'Manage delivery without jumping between courier dashboards.',
    thesis: 'NAFS Courier keeps quotes, bookings, shipment updates and delivery follow-up connected to the order your team is already working on.',
    events: [
      { name: 'delivery.quoted', meta: 'Pathao quote received for Dhaka Central to Banani · ৳95', status: 'Quote ready' },
      { name: 'shipment.booked', meta: 'Parcel C-284903 booked for Order #10482', status: 'Booked' },
      { name: 'delivery.updated', meta: 'Pathao confirmed the latest shipment status', status: 'Update trusted' }
    ],
    proof: [['Pathao available', 'Pathao is the currently available courier connection.'], ['Safer booking', 'Repeated clicks or retries are protected from creating duplicate parcels.'], ['Trusted updates', 'Courier updates are checked before they change the order.'], ['Clear recovery', 'Uncertain results can be reviewed instead of being retried blindly.']]
  },
  partners: {
    headline: 'Give partners a clear path from referral to commission.',
    thesis: 'NAFS Partners brings links, referrals, programs, performance and commissions into one partner workspace without exposing client operations.',
    events: [
      { name: 'referral.clicked', meta: 'A visitor arrived through the Beauty Consultants campaign', status: 'Referral tracked' },
      { name: 'customer.started', meta: 'The referred business started a qualifying NAFS plan', status: 'Customer attributed' },
      { name: 'commission.recorded', meta: 'The program rules created a pending commission for the partner', status: 'Commission visible' }
    ],
    proof: [['Partner programs', 'Create different offers for creators, agencies, technology partners and resellers.'], ['Performance', 'Follow clicks, leads, customers and attributed revenue.'], ['Commissions', 'See how qualifying revenue turns into a partner commission.'], ['Separate access', 'Partners can follow their results without entering client operations.']]
  },
  platform: {
    headline: 'Launch NAFS for clients under your own brand.',
    thesis: 'NAFS Platform helps B2B partners create plans, onboard client businesses, apply branding, connect domains and manage subscriptions from one place.',
    events: [
      { name: 'client.started', meta: 'Northstar Retail joined the Growth plan through its NAFS partner', status: 'Client active' },
      { name: 'domain.connected', meta: 'The client’s branded web address passed verification and entered setup', status: 'Domain in progress' },
      { name: 'invoice.paid', meta: 'A paid client invoice was recorded for the partner relationship', status: 'Revenue recorded' }
    ],
    proof: [['Client management', 'Keep every client business separate while managing them from one partner view.'], ['Plans and billing', 'Create offers and follow subscriptions, invoices and access.'], ['Your branding', 'Use your identity and custom domains throughout the client experience.'], ['Protected client data', 'Each client keeps separate accounts, permissions and business information.']]
  }
}

type PageProps = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return productEcosystem.map(product => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = productEcosystem.find(item => item.slug === slug)

  if (!product) return {}

  return { title: product.name, description: product.description, alternates: { canonical: `/products/${slug}` } }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = productEcosystem.find(item => item.slug === slug)
  const narrative = narratives[slug]

  if (!product || !narrative) notFound()

  const nextHref = slug === 'platform' ? '/b2b' : slug === 'partners' ? '/partners' : slug === 'storefront' || slug === 'shopping' ? '/integrations' : '/#contact'
  const nextLabel = slug === 'platform' ? 'Explore the B2B platform' : slug === 'partners' ? 'Explore partnerships' : slug === 'storefront' || slug === 'shopping' ? 'Explore integrations' : 'Plan a walkthrough'

  return (
    <>
      <section className='bg-[#fafaf8] pb-16 pt-32 sm:pb-24 sm:pt-40'>
        <div className='mx-auto max-w-[1180px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <Link href='/products' className='site-arrow-link inline-flex items-center gap-2 text-sm font-semibold text-[#777773] hover:text-[#111]'><ArrowLeftIcon className='size-4' />Platform</Link>
            <div className='mx-auto mt-8 max-w-4xl text-center sm:mt-9'>
              <div className='flex flex-col items-center justify-center gap-2 min-[420px]:flex-row min-[420px]:gap-3'>
                <span className='rounded-full bg-violet-100 px-3 py-1.5 text-xs font-semibold text-violet-800'>{product.status}</span>
                <span className='text-sm font-semibold text-[#777773]'>{product.name} · {product.role}</span>
              </div>
              <h1 className='mt-5 text-balance text-4xl font-medium tracking-[-0.05em] text-[#111] min-[390px]:text-5xl sm:text-7xl lg:text-[72px] lg:leading-[.99]'>{narrative.headline}</h1>
              <p className='mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6f6f6a]'>{narrative.thesis}</p>
            </div>
          </PageReveal>
        </div>
      </section>

      <section className='bg-[#fafaf8] pb-20 sm:pb-24'>
        <div className='mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8'>
          <PageReveal><EventTicker events={narrative.events} /></PageReveal>
          <div className='mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
            {narrative.proof.map(([label, detail], index) => (
              <PageReveal key={label} delay={index * .04}>
                <div className='site-card h-full rounded-2xl border border-[#e4e4e0] bg-white p-5'>
                  <p className='text-sm font-semibold text-violet-700'>{label}</p>
                  <p className='mt-3 text-base leading-7 text-[#62625d]'>{detail}</p>
                </div>
              </PageReveal>
            ))}
          </div>
        </div>
      </section>

      <section className='border-y border-[#e7e7e4] bg-white py-20 sm:py-24'>
        <div className='mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8'>
          <PageReveal>
            <div className='grid gap-9 lg:grid-cols-[.75fr_1.25fr] lg:gap-10'>
              <div>
                <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-700'>WHAT IT HELPS YOU DO</p>
                <h2 className='mt-4 text-4xl font-medium tracking-[-0.05em] text-[#111] sm:text-5xl'>Built for a clear job.</h2>
                <p className='mt-5 text-base leading-7 text-[#71716c]'>Use {product.name} where it improves the customer or team experience, while the rest of the business stays connected through NAFS.</p>
              </div>
              <div className='grid gap-3 sm:grid-cols-2'>
                {product.capabilities.map(capability => (
                  <div key={capability} className='rounded-2xl border border-[#e5e5e1] bg-[#fafaf8] p-5'>
                    <p className='text-base font-semibold text-[#333]'>{capability}</p>
                    <p className='mt-2 text-sm leading-6 text-[#777773]'>Part of the {product.name} experience.</p>
                  </div>
                ))}
              </div>
            </div>
          </PageReveal>
        </div>
      </section>

      <section className='bg-[#0d0e12] py-16 text-white sm:py-20'>
        <div className='mx-auto flex max-w-[1120px] flex-col justify-between gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:px-8'>
          <div>
            <p className='text-sm font-semibold uppercase tracking-[.12em] text-violet-300'>NEXT STEP</p>
            <h2 className='mt-3 max-w-2xl text-3xl font-medium tracking-[-0.045em]'>See how {product.name} could improve the way your team works.</h2>
          </div>
          <Link href={nextHref} className='site-action site-arrow-link inline-flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-full bg-white px-6 text-[15px] font-semibold text-black sm:w-auto'>{nextLabel} <ArrowRightIcon className='size-4' /></Link>
        </div>
      </section>
    </>
  )
}
