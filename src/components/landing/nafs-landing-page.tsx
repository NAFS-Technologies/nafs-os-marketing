import Link from 'next/link'
import { ArrowRightIcon } from 'lucide-react'

import { DemoRequestForm } from '@/components/landing/demo-request-form'
import { ProductShowcase } from '@/components/marketing/product-showcase'
import { Actions, CardLink, FAQ, Readiness, Section, SectionHeading } from '@/components/marketing/primitives'
import { integrations, solutions } from '@/content/product-catalog'

import '@/app/marketing-product.css'

const journey = [
  ['Confirm', 'Keep customer, items and payment context together.'],
  ['Pick', 'Record the actual pick and reserve stock.'],
  ['Pack', 'Prepare the parcel with the right items.'],
  ['Dispatch', 'Review details and book the courier.'],
  ['Deliver', 'Follow updates and handle exceptions.'],
  ['Settle', 'Compare collections and close the money loop.']
] as const

const questions = [
  { question: 'Do we need to replace our existing website?', answer: 'Not necessarily. WooCommerce and Shopify connection paths can be configured for a rollout. We review your store, data mappings and live workflow before recommending a migration.' },
  { question: 'Is every NAFS product available today?', answer: 'No. The product catalogue separates guided rollout from products in development. Your walkthrough confirms the exact features, providers and configuration available for your business.' },
  { question: 'Can we start with one part of the operation?', answer: 'Yes. Begin with a defined workflow such as inventory, fulfillment or COD review. Agree its dependencies and acceptance checks before expanding.' },
  { question: 'Will AI make financial or inventory decisions automatically?', answer: 'AI-assisted output should remain a recommendation until the appropriate person and system checks approve consequential use. We do not promise autonomous money or stock changes.' }
]

export function NafsLandingPage() {
  return (
    <>
      <section className='m-home-hero' id='home'><div className='m-container'>
        <div className='m-home-intro'><span className='m-eyebrow'>NAFS · Commerce operating system</span><h1>Run your commerce.<span>From one place.</span></h1><p className='m-lead'>Orders, inventory, fulfillment and payments—connected to the people doing the work. Less chasing context. A clearer next step.</p><Actions /><p className='m-hero-caption'>Start with one workflow. Connect the operation as you grow.</p></div>
        <div className='m-hero-product'><ProductShowcase /></div>
      </div></section>
      <div className='m-container m-operating-strip'><strong>Built around the work after checkout.</strong><span>Orders & inventory</span><span>Warehouse & delivery</span><span>Payments & COD</span><span>Reporting & control</span></div>
      <Section><div className='m-split'><SectionHeading label='Less disconnected work' title='Your business is connected. Your tools should be, too.' description='The hard part is rarely one task. It is keeping the next team informed, the next record accurate and the next decision clear.' /><ul className='m-pain-list'><li><h3>An order shouldn’t need three different tabs.</h3><p>Bring its customer, stock, payment and delivery context into the same operating flow.</p></li><li><h3>A stock number should have an explanation.</h3><p>Keep location, movement and committed quantities visible instead of reconciling another spreadsheet.</p></li><li><h3>A delivered parcel is not settled money.</h3><p>Keep courier collections and reconciliation connected to the original sale.</p></li></ul></div></Section>
      <Section tone='white'><SectionHeading label='Order to outcome' title='One sale. A connected operation.' description='A typical journey through NAFS OS. Payment, stock and courier requirements still govern each step.' /><ol className='m-journey'>{journey.map(([title, detail], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{detail}</p></li>)}</ol></Section>
      <Section><SectionHeading label='The core operation' title='Give every team the context to finish the job.' description='Start where the handoffs cost the most time. Keep the rest of the operation connected.' /><div className='m-grid m-grid-two'>{solutions.slice(0, 4).map(solution => <CardLink key={solution.id} href={`/solutions/${solution.id}`} title={solution.title} description={solution.outcome} label={solution.modules.slice(0, 2).join(' / ')} />)}</div><Link href='/solutions' className='m-text-link' style={{ marginTop: 24 }}>Explore all solutions <ArrowRightIcon className='m-arrow' aria-hidden='true' /></Link></Section>
      <Section tone='dark'><SectionHeading label='Insight, with control' title='Find the signal. Keep people in charge.' description='Reporting and assistance belong beside the operation—not in another disconnected dashboard.' /><div className='m-intelligence-grid'><article><span className='m-eyebrow'>Understand</span><h3>Operational reporting</h3><p>Review sales, delivery, returns and payments with the relevant scope and records behind them.</p></article><article><span className='m-eyebrow'>Connect</span><h3>Campaign-to-product context</h3><p>Explore attributed order lines and product mappings. Attribution is not proof of a particular impression or an incremental sale.</p></article><article><span className='m-eyebrow'>Assist</span><h3>AI-assisted work</h3><p>Review suggestions before consequential actions. Availability and permitted workflows are verified for each rollout.</p></article></div></Section>
      <Section><div className='m-split'><div><SectionHeading label='Keep what works' title='Your storefront can stay. Your operation can improve.' description='Review WooCommerce, Shopify and delivery connections without assuming you have to replace everything at once.' /><Link href='/integrations' className='m-text-link'>Explore connection readiness <ArrowRightIcon className='m-arrow' aria-hidden='true' /></Link></div><div className='m-connection-list'>{integrations.slice(0, 3).map(integration => <article key={integration.name}><h3>{integration.name}</h3><Readiness status={integration.status} /></article>)}</div></div></Section>
      <Section tone='white'><SectionHeading label='Before you start' title='A few useful answers.' centered /><FAQ items={questions} /></Section>
      <section id='contact' tabIndex={-1} aria-labelledby='contact-heading' className='m-section'><div className='m-container m-contact-grid'><div><span className='m-eyebrow'>See NAFS in action</span><h2 id='contact-heading' className='m-heading'>Start with the part that is hardest to run.</h2><p className='m-lead'>Tell us about your business. We’ll review the workflow, show the relevant product and confirm what a sensible rollout needs.</p><ol className='m-steps'><li>Discuss your operation and the tools you already use.</li><li>Walk through the relevant workflows.</li><li>Agree scope, readiness and next steps.</li></ol></div><DemoRequestForm /></div></section>
      <div className='m-container m-partner-rail'><p>Building a commerce offering for clients?</p><div><Link href='/b2b' className='m-text-link'>Explore B2B <ArrowRightIcon className='m-arrow' aria-hidden='true' /></Link><Link href='/partners' className='m-text-link'>Partner with NAFS <ArrowRightIcon className='m-arrow' aria-hidden='true' /></Link></div></div>
    </>
  )
}
