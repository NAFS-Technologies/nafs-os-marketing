import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProductDetail } from '@/components/marketing/product-detail'
import { getProduct, products } from '@/content/product-catalog'
import { absoluteUrl } from '@/lib/site-config'

type PageProps = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export function generateStaticParams() {
  return products.map(product => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) return {}

  return { title: product.name, description: product.description, alternates: { canonical: `/products/${slug}` }, openGraph: { url: absoluteUrl(`/products/${slug}`) } }
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params
  const product = getProduct(slug)

  if (!product) notFound()

  return <ProductDetail product={product} />
}
