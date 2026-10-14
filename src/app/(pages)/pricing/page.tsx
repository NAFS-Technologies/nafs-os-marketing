import type { Metadata } from 'next'

import { ActionLink, ClosingCTA, FAQ, FeatureGrid, PageHero, Section, SectionHeading } from '@/components/marketing/primitives'
import { absoluteUrl } from '@/lib/site-config'

import '@/app/marketing-resources.css'

export const metadata: Metadata = { title: 'Pricing', description: 'Plan a scoped NAFS rollout based on your workflows, data, locations and required connections.', alternates: { canonical: '/pricing' }, openGraph: { url: absoluteUrl('/pricing') } }

const approaches = [
  { title: 'One workflow', detail: 'Start with the part of the operation creating the most friction.', items: ['A defined operational problem', 'The relevant people and data', 'Clear acceptance before expansion'] },
  { title: 'Core operation', detail: 'Connect the main handoffs behind your orders.', items: ['Orders, stock and warehouse work', 'Payments and settlement context', 'Reporting, roles and permissions'] },
  { title: 'Broader rollout', detail: 'Plan across locations, channels or client businesses.', items: ['Migration and integration review', 'Location and team dependencies', 'Phased implementation and support'] }
]

export default function PricingPage() {
  return <><PageHero label='Pricing' title='A price that starts with your operation.' description='The right scope depends on your workflows, data and setup—not an invented one-size-fits-all plan.' /><Section tone='white'><div className='m-grid'>{approaches.map((approach, index) => <article key={approach.title} className='m-card m-price-card' data-featured={index === 1}><span className='m-card-number'>Rollout approach {String(index + 1).padStart(2, '0')}</span><h3>{approach.title}</h3><p>{approach.detail}</p><p className='m-price-label'>Scoped quote</p><ul>{approach.items.map(item => <li key={item}>{item}</li>)}</ul><ActionLink href='/#contact' name={`pricing_${index + 1}`}>Discuss this rollout</ActionLink></article>)}</div><p className='m-commercial-note'>These are rollout approaches, not fixed subscription tiers. Prices, limits, onboarding, third-party charges and support commitments are confirmed in a written scope. B2B and partner terms are agreed separately.</p></Section><Section><SectionHeading label='What affects the quote' title='Make the work visible before you commit.' /><FeatureGrid items={[
    ['Workflows and teams', 'The operational steps, roles, approvals and exceptions involved.'],
    ['Data and migration', 'The products, customers, stock and history that need to be imported and checked.'],
    ['Locations and channels', 'The warehouses, stores and verified connections that need to work together.'],
    ['Implementation and support', 'The configuration, training, acceptance and ongoing responsibilities in the agreed scope.']
  ]} /></Section><Section tone='white'><SectionHeading label='Pricing questions' title='Clear scope first.' centered /><FAQ items={[
    { question: 'Are the displayed approaches subscription plans?', answer: 'No. They describe ways to phase a rollout. We confirm software access, implementation and other charges in your written scope.' },
    { question: 'Can we begin with one workflow?', answer: 'Yes, provided its data and system dependencies are included. The walkthrough identifies what is needed to make that first workflow useful.' },
    { question: 'Is there a free trial?', answer: 'We start with a product walkthrough. Any trial arrangement and its terms are confirmed separately unless an approved self-service offer is explicitly shown.' },
    { question: 'How are B2B or partner opportunities priced?', answer: 'Branding, client onboarding, subscriptions, services and partner arrangements require a separate commercial agreement. No universal reseller margin or commission is assumed.' }
  ]} /></Section><ClosingCTA title='Let’s define a rollout worth paying for.' /></>
}
