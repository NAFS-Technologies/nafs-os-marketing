import type { ReactNode } from 'react'

import { SiteFooter } from '@/components/landing/site-footer'
import { SiteHeader } from '@/components/landing/site-header'

const PagesLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <div className='site-shell flex min-h-screen w-full min-w-0 flex-col bg-[#fafaf8]'>
    <a href='#main-content' className='site-skip-link fixed left-4 top-3 z-[100] -translate-y-24 rounded-full bg-[#111] px-5 py-3 text-sm font-semibold text-white shadow-xl transition-transform duration-200 focus:translate-y-0 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2'>
      Skip to content
    </a>
    <SiteHeader />
    <main id='main-content' tabIndex={-1} className='flex flex-1 flex-col outline-none *:scroll-mt-24'>
      {children}
    </main>
    <SiteFooter />
  </div>
)

export default PagesLayout
