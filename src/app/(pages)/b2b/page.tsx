import type { Metadata } from 'next'

import { ActionLink, ClosingCTA, FeatureGrid, PageHero, Readiness, Section, SectionHeading } from '@/components/marketing/primitives'
import { getProduct } from '@/content/product-catalog'
import { absoluteUrl } from '@/lib/site-config'

import '@/app/marketing-resources.css'

export const metadata: Metadata = { title: 'B2B platform', description: 'Explore a NAFS-based commerce offering for agencies, software resellers and their client businesses.', alternates: { canonical: '/b2b' }, openGraph: { url: absoluteUrl('/b2b') } }

export default function B2BPage() {
  const product = getProduct('platform')!

  return <><PageHero label='B2B platform' title='Your client offering. A connected commerce foundation.' description='For agencies and software resellers building a commerce offering for client businesses—not a wholesale ordering portal.'><div style={{ marginTop: 24 }}><Readiness status={product.status} /></div><div className='m-actions'><ActionLink href='/#contact' name='b2b'>Discuss a B2B rollout</ActionLink></div></PageHero><div className='m-container'><aside className='m-note'><strong>Separate product and commercial readiness</strong>{product.availability}</aside></div><Section><SectionHeading label='The model' title='Build the offer around the work your clients need.' /><div className='m-business-flow'><article><span>01 / YOUR OFFER</span><h3>Brand and services</h3><p>Define the identity, software scope and implementation services you intend to offer.</p></article><article><span>02 / YOUR CLIENTS</span><h3>Distinct businesses</h3><p>Plan onboarding and responsibilities while keeping each client’s business information separate.</p></article><article><span>03 / THE OPERATION</span><h3>Connected commerce</h3><p>Review the NAFS workflows, domains and subscription configuration required for the agreed rollout.</p></article></div></Section><Section tone='white'><SectionHeading label='Discuss the scope' title='More than putting a logo on software.' /><FeatureGrid items={[
    ['Client onboarding', 'Agree how client businesses are introduced, configured and accepted.'],
    ['Brand and domains', 'Confirm the permitted branding, custom-hostname setup and operator identity boundaries.'],
    ['Plans and subscriptions', 'Define approved offers, usage and billing responsibilities without inventing a price list.'],
    ['Implementation and service', 'Clarify migration, training, support and escalation ownership before launch.']
  ]} /></Section><ClosingCTA title='Bring a client use case. Let’s discuss the model.' description='We will review the product boundary, implementation needs and commercial agreement before making a launch commitment.' /></>
}
