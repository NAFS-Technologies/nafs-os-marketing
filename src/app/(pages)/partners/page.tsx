import type { Metadata } from 'next'

import { ActionLink, ClosingCTA, FeatureGrid, PageHero, Readiness, Section, SectionHeading } from '@/components/marketing/primitives'
import { getProduct } from '@/content/product-catalog'
import { absoluteUrl } from '@/lib/site-config'

export const metadata: Metadata = { title: 'Partners', description: 'Explore referral, implementation, technology and reseller relationships with NAFS.', alternates: { canonical: '/partners' }, openGraph: { url: absoluteUrl('/partners') } }

export default function PartnersPage() {
  const product = getProduct('partners')!

  return <><PageHero label='Partner with NAFS' title='Bring the right business. Help make the change.' description='Good partnerships start with a clear operational need and a useful role in solving it.'><div className='m-actions'><ActionLink href='/#contact' name='partners'>Start a partner conversation</ActionLink><ActionLink href='/b2b' secondary>Explore B2B</ActionLink></div></PageHero><Section tone='white'><FeatureGrid items={[
    ['Referral partners', 'Introduce businesses with an operational need that NAFS may fit. Eligibility and referral terms are agreed separately.'],
    ['Implementation partners', 'Discuss migration, configuration, training and rollout services around a defined scope.'],
    ['Technology partners', 'Explore a specific integration and the business mappings, maintenance and support it needs.'],
    ['Agencies and resellers', 'Review a client offering through the B2B platform, including branding, onboarding and commercial responsibilities.']
  ]} /></Section><Section><div className='m-split'><SectionHeading label='The partner product' title='A clear boundary between a partnership and a platform.' description='A commercial conversation is not proof that automated partner tracking or commissions are generally available.' /><div><Readiness status={product.status} /><p className='m-note' style={{ marginTop: 20 }}>{product.availability}</p></div></div></Section><ClosingCTA title='What value would you like to help create?' description='Tell us about the businesses you work with and the role you want to play. We will discuss fit, responsibilities and terms.' /></>
}
