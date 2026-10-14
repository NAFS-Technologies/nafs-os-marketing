import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/landing/site-footer'
import { SiteHeader } from '@/components/landing/site-header'
import { MarketingTelemetry } from '@/components/marketing/telemetry'

import '@/app/marketing.css'
import '@/app/marketing-accessibility.css'

export default function PagesLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <div className='marketing-shell'><a href='#main-content' className='site-skip-link fixed left-4 top-3 z-[100] -translate-y-24 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black shadow-xl focus:translate-y-0'>Skip to content</a><SiteHeader /><main id='main-content' tabIndex={-1}>{children}</main><SiteFooter /><MarketingTelemetry /></div>
}
