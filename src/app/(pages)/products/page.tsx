import type { Metadata } from 'next'

import { Actions, CardLink, ClosingCTA, PageHero, Section, SectionHeading } from '@/components/marketing/primitives'
import { products } from '@/content/product-catalog'
import { absoluteUrl } from '@/lib/site-config'

export const metadata: Metadata = { title: 'Products', description: 'Explore NAFS OS and connected commerce products with clear rollout and development status.', alternates: { canonical: '/products' }, openGraph: { url: absoluteUrl('/products') } }

export default function ProductsPage() {
  return (
    <>
      <PageHero label='NAFS products' title='The operation at the center. Focused products around it.' description='Start with NAFS OS for the work behind every sale. Add the customer, delivery and workflow experiences your business actually needs.'><Actions /></PageHero>
      <Section tone='white'><SectionHeading label='Guided rollout' title='Start with the core operation.' description='These implementations need business-specific data, configuration and acceptance before going live.' /><div className='m-grid'>{products.filter(product => product.status === 'Guided rollout').map(product => <CardLink key={product.slug} href={`/products/${product.slug}`} title={product.name} description={product.description} status={product.status} />)}</div></Section>
      <Section><SectionHeading label='In development' title='Where the product family is going.' description='Explore the direction without confusing a roadmap with general availability. Delivery scope and commercial terms are discussed separately.' /><div className='m-grid'>{products.filter(product => product.status === 'In development').map(product => <CardLink key={product.slug} href={`/products/${product.slug}`} title={product.name} description={product.description} status={product.status} />)}</div></Section>
      <ClosingCTA />
    </>
  )
}
