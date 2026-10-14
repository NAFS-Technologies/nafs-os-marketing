import { ProductShowcase } from '@/components/marketing/product-showcase'
import { ActionLink, ClosingCTA, FeatureGrid, PageHero, Readiness, Section, SectionHeading } from '@/components/marketing/primitives'
import type { Product } from '@/content/product-catalog'

export function ProductDetail({ product }: { product: Product }) {
  const inDevelopment = product.status === 'In development'

  return (
    <>
      <PageHero label={product.name} title={product.headline} description={product.description} breadcrumb={{ label: 'Products', href: '/products' }}>
        <div style={{ marginTop: 24 }}><Readiness status={product.status} /></div>
        <div className='m-actions'><ActionLink href='/#contact' name={`product_${product.slug}`}>{inDevelopment ? 'Discuss the roadmap' : 'Book a walkthrough'}</ActionLink><ActionLink href='/products' secondary>Explore all products</ActionLink></div>
      </PageHero>
      <div className='m-container'><aside className='m-note' aria-label='Product availability'><strong>{inDevelopment ? 'In development—not a live product promise' : 'Confirm your rollout'}</strong>{product.availability}</aside></div>
      {product.preview && <Section><ProductShowcase key={product.slug} initialKind={product.preview} mode={product.slug === 'os' ? 'explorer' : 'focused'} /></Section>}
      <Section tone='white'><SectionHeading label={inDevelopment ? 'Product direction' : 'What it helps you do'} title={inDevelopment ? 'A focused job. A clear development boundary.' : 'Useful context, from the first action to the last.'} description={inDevelopment ? 'These are the intended workflows. We confirm delivery scope and readiness separately.' : 'The product should make the next decision understandable, not simply add another dashboard.'} /><FeatureGrid items={product.outcomes} /></Section>
      <Section><div className='m-split'><div><SectionHeading label='Scope' title={inDevelopment ? 'Explore the planned capabilities.' : 'Connect the parts your team needs.'} /><ul className='m-chips'>{product.capabilities.map(capability => <li key={capability}>{capability}</li>)}</ul></div><div><h2 className='m-heading' style={{ fontSize: 30 }}>What happens before rollout?</h2><ol className='m-steps'><li>Confirm the workflow, people and data involved.</li><li>Verify the required configuration and provider connections.</li><li>Agree acceptance checks, commercial terms and a phased rollout.</li></ol></div></div></Section>
      <ClosingCTA title={inDevelopment ? `Let’s discuss your need for ${product.name}.` : `See ${product.name} around your own workflow.`} />
    </>
  )
}
