import type { ReactNode } from 'react'

import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { siteConfig } from '@/lib/site-config'
import { cn } from '@/lib/utils'

import './globals.css'
import './polish.css'
import './ui-guardrails.css'

const geist = Geist({ variable: '--font-sans', subsets: ['latin'], display: 'swap' })
const geistMono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: { template: '%s | NAFS', default: 'NAFS — Everything Behind Modern Commerce' },
  description: 'Run orders, inventory, fulfillment, delivery and payments in one connected commerce operation.',
  applicationName: 'NAFS',
  authors: [{ name: 'NAFS' }],
  creator: 'NAFS',
  publisher: 'NAFS',
  category: 'business software',
  keywords: ['commerce operating system', 'ecommerce operations Bangladesh', 'inventory management', 'COD settlement software', 'NAFS OS', 'B2B commerce platform'],
  manifest: '/manifest.json',
  robots: { index: siteConfig.indexable, follow: siteConfig.indexable },
  openGraph: {
    type: 'website', locale: 'en_BD', url: siteConfig.siteUrl, siteName: 'NAFS',
    title: 'NAFS — Everything Behind Modern Commerce',
    description: 'Connect the work behind every sale.'
  },
  twitter: { card: 'summary_large_image', title: 'NAFS — Everything Behind Modern Commerce', description: 'Connect the work behind every sale.' }
}

export const viewport: Viewport = { width: 'device-width', initialScale: 1, colorScheme: 'light', themeColor: '#fafaf8' }

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang='en' className={cn(geist.variable, geistMono.variable, 'flex min-h-full w-full scroll-smooth')} suppressHydrationWarning>
      <body className='flex min-h-full w-full flex-auto flex-col antialiased selection:bg-violet-500/15 selection:text-foreground'>
        <ThemeProvider attribute='class' forcedTheme='light' enableSystem={false} disableTransitionOnChange>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
