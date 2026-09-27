'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'
import { ArrowUpRightIcon, MenuIcon, XIcon } from 'lucide-react'

import Logo from '@/components/logo'
import { ModeToggle } from '@/components/layout/mode-toggle'
import { navigationItems, siteConfig } from '@/content/nafs-landing'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <header className='fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4'>
      <div
        className={`mx-auto flex h-16 max-w-7xl items-center justify-between rounded-2xl border px-3 transition-all duration-300 sm:px-4 ${
          isScrolled
            ? 'border-border/80 bg-background/88 shadow-lg shadow-slate-950/5 backdrop-blur-xl dark:shadow-black/20'
            : 'border-border/60 bg-background/72 shadow-sm backdrop-blur-lg'
        }`}
      >
        <Link
          href='/#home'
          className='rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'
          aria-label='NAFS OS home'
          onClick={() => setIsMenuOpen(false)}
        >
          <Logo className='[&_span]:text-xl' />
        </Link>

        <nav className='hidden items-center gap-1 lg:flex' aria-label='Primary navigation'>
          {navigationItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className='rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className='flex items-center gap-2'>
          <ModeToggle />
          <Link
            href={process.env.NEXT_PUBLIC_SIGN_IN_URL ?? `${(process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.nafs.tech').replace(/\/$/, '')}/auth/sign-in`}
            className='hidden rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary sm:inline-flex'
          >
            Sign in
          </Link>
          <Link
            href={siteConfig.demoHref}
            className='group hidden items-center gap-1.5 rounded-xl bg-foreground px-4 py-2.5 text-sm font-semibold text-background shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:inline-flex'
          >
            Book a demo
            <ArrowUpRightIcon className='size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
          </Link>
          <button
            type='button'
            className='grid size-9 place-items-center rounded-full border bg-background/80 transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary lg:hidden'
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls='mobile-navigation'
            onClick={() => setIsMenuOpen(open => !open)}
          >
            {isMenuOpen ? <XIcon className='size-4' /> : <MenuIcon className='size-4' />}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <div
          id='mobile-navigation'
          className='mx-auto mt-2 max-w-7xl rounded-2xl border bg-background/96 p-3 shadow-2xl backdrop-blur-xl lg:hidden'
        >
          <nav className='grid gap-1' aria-label='Mobile navigation'>
            {navigationItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className='rounded-xl px-4 py-3 text-sm font-medium transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className='mt-3 grid grid-cols-2 gap-2 border-t pt-3'>
            <Link
              href={process.env.NEXT_PUBLIC_SIGN_IN_URL ?? `${(process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.nafs.tech').replace(/\/$/, '')}/auth/sign-in`}
              className='rounded-xl border px-4 py-3 text-center text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
              onClick={() => setIsMenuOpen(false)}
            >
              Sign in
            </Link>
            <Link
              href={siteConfig.demoHref}
              className='rounded-xl bg-foreground px-4 py-3 text-center text-sm font-semibold text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
              onClick={() => setIsMenuOpen(false)}
            >
              Book a demo
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  )
}

export default Header
