import type { ReactNode } from 'react'

import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

import './globals.css'
import './polish.css'
import './ui-guardrails.css'

const geist = Geist({ variable: '--font-sans', subsets: ['latin'], display: 'swap' })
const geistMono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'], display: 'swap' })

const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.nafs.tech'

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: { template: '%s | NAFS', default: 'NAFS — Everything Behind Modern Commerce' },
  description: 'Run orders, inventory, fulfillment, delivery and payments in one place. Connect your existing tools, automate work and build new revenue with NAFS.',
  applicationName: 'NAFS',
  authors: [{ name: 'NAFS Technologies' }],
  creator: 'NAFS Technologies',
  publisher: 'NAFS Technologies',
  category: 'business software',
  keywords: [
    'commerce operating system',
    'ecommerce operations Bangladesh',
    'order management Bangladesh',
    'inventory management Bangladesh',
    'commerce automation',
    'B2B commerce platform',
    'white-label commerce platform',
    'ecommerce integrations',
    'Nango integrations',
    'WooCommerce migration',
    'Shopify integration',
    'partner platform',
    'affiliate platform',
    'COD settlement software Bangladesh',
    'NAFS OS',
    'NAFS Flow',
    'NAFS Platform',
    'NAFS Partners'
  ],
  manifest: '/manifest.json',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } },
  openGraph: {
    type: 'website',
    locale: 'en_BD',
    url: appUrl,
    siteName: 'NAFS',
    title: 'NAFS — Everything Behind Modern Commerce',
    description: 'Run commerce, connect your tools, automate work and grow through B2B and partner programs.'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NAFS — Everything Behind Modern Commerce',
    description: 'Run commerce, connect your tools, automate work and grow through B2B and partner programs.'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
  themeColor: '#fafaf8'
}

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => (
  <html lang='en' className={cn(geist.variable, geistMono.variable, 'flex min-h-full w-full scroll-smooth')} suppressHydrationWarning>
    <body className='flex min-h-full w-full flex-auto flex-col antialiased selection:bg-violet-500/15 selection:text-foreground'>
      <ThemeProvider attribute='class' forcedTheme='light' enableSystem={false} disableTransitionOnChange>
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </body>
  </html>
)

export default RootLayout
