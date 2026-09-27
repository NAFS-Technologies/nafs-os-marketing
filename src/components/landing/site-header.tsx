'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { MenuIcon, XIcon } from 'lucide-react'

import Logo from '@/components/logo'
import { cn } from '@/lib/utils'

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://app.nafs.tech').replace(/\/$/, '')
const signInUrl = process.env.NEXT_PUBLIC_SIGN_IN_URL ?? '/auth/sign-in'
const signUpUrl = `${appUrl}/auth/sign-up`

const siteNavigation = [
  { label: 'Platform', href: '/products' },
  { label: 'Integrations', href: '/integrations' },
  { label: 'B2B', href: '/b2b' },
  { label: 'Partners', href: '/partners' },
  { label: 'Solutions', href: '/solutions' },
  { label: 'Pricing', href: '/pricing' }
] as const

export const SiteHeader = () => {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const homeLinkRef = useRef<HTMLAnchorElement>(null)
  const mobileNavigationRef = useRef<HTMLDivElement>(null)
  const restoreMenuFocusRef = useRef(false)
  const restoreDesktopFocusRef = useRef(false)

  const closeMobileNavigation = useCallback((restoreFocus: boolean) => {
    restoreMenuFocusRef.current = restoreFocus
    setIsOpen(false)
  }, [])

  const handleMobileNavigationClick = (href: string) => {
    let restoreFocus = false

    try {
      const destination = new URL(href, window.location.href)

      restoreFocus = destination.origin === window.location.origin && destination.pathname === window.location.pathname && destination.search === window.location.search && !destination.hash
    } catch {
      restoreFocus = false
    }

    closeMobileNavigation(restoreFocus)
  }

  const navigationIsActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      const focusFrame = window.requestAnimationFrame(() => {
        if (restoreDesktopFocusRef.current) {
          restoreDesktopFocusRef.current = false
          homeLinkRef.current?.focus({ preventScroll: true })

          return
        }

        if (!restoreMenuFocusRef.current) return

        restoreMenuFocusRef.current = false
        menuButtonRef.current?.focus()
      })

      return () => window.cancelAnimationFrame(focusFrame)
    }

    const navigation = mobileNavigationRef.current
    const desktop = window.matchMedia('(min-width: 1280px)')

    const background = Array.from(navigation?.parentElement?.children ?? [])
      .filter((element): element is HTMLElement => element instanceof HTMLElement && element.matches('header, main, footer, .site-skip-link'))
      .map(element => ({ element, inert: element.inert }))

    const focusFrame = window.requestAnimationFrame(() => mobileNavigationRef.current?.querySelector<HTMLElement>('[data-mobile-nav-initial]')?.focus())

    // aria-modal must also prevent keyboard and assistive-technology access to the page behind it.
    for (const { element } of background) element.inert = true

    const onDesktopChange = (event: MediaQueryListEvent) => {
      if (!event.matches) return
      restoreDesktopFocusRef.current = true
      closeMobileNavigation(false)
    }

    const onHistoryChange = () => closeMobileNavigation(false)

    const onKeyDown = (event: KeyboardEvent) => {
      const navigation = mobileNavigationRef.current

      if (!navigation || desktop.matches) return

      if (event.key === 'Escape') {
        event.preventDefault()
        closeMobileNavigation(true)

        return
      }

      if (event.key !== 'Tab') return

      const focusable = Array.from(navigation.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(element => element.getClientRects().length > 0 && !element.hidden && element.getAttribute('aria-hidden') !== 'true')

      if (!focusable.length) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const activeElement = document.activeElement

      if (event.shiftKey && (activeElement === first || !navigation.contains(activeElement))) {
        event.preventDefault()
        last?.focus()
      } else if (!event.shiftKey && (activeElement === last || !navigation.contains(activeElement))) {
        event.preventDefault()
        first?.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', onDesktopChange)
    window.addEventListener('popstate', onHistoryChange)
    window.addEventListener('hashchange', onHistoryChange)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', onDesktopChange)
      window.removeEventListener('popstate', onHistoryChange)
      window.removeEventListener('hashchange', onHistoryChange)
      for (const { element, inert } of background) element.inert = inert
    }
  }, [isOpen, closeMobileNavigation])

  return (
    <>
      <style>{`@media(max-width:1279px){body:has(#mobile-navigation){overflow:hidden}}`}</style>
      <header className={cn('fixed inset-x-0 top-0 z-50 transition-all duration-300', isScrolled ? 'border-b border-[#dfdfdb] bg-[#fafaf8]/96 shadow-[0_8px_32px_rgba(20,20,20,.045)] backdrop-blur-xl' : 'border-b border-transparent bg-[#fafaf8]/86 backdrop-blur-md')}>
        <div className='mx-auto flex h-[72px] max-w-[1380px] items-center justify-between px-4 sm:px-6 lg:px-8'>
          <Link ref={homeLinkRef} href='/' aria-label='NAFS homepage' className='rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fafaf8]' onClick={() => closeMobileNavigation(false)}>
            <Logo className='gap-2.5 [&_svg]:size-8 [&_span]:text-lg' />
          </Link>

          <nav className='hidden h-full items-center gap-7 xl:flex' aria-label='Primary navigation'>
            {siteNavigation.map(item => {
              const isActive = navigationIsActive(item.href)

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'relative flex h-full items-center px-0.5 text-[15px] font-semibold transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-center after:bg-[#111] after:transition-transform after:duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/45 focus-visible:ring-offset-4 focus-visible:ring-offset-[#fafaf8]',
                    isActive ? 'text-[#111] after:scale-x-100' : 'text-[#62625d] after:scale-x-0 hover:text-[#111] hover:after:scale-x-50'
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className='flex items-center gap-3 sm:gap-4'>
            <Link href={signInUrl} className='hidden h-10 items-center rounded-full px-3 text-[15px] font-semibold text-[#62625d] transition-colors hover:text-[#111] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/45 sm:inline-flex'>Sign in</Link>
            <Link href={signUpUrl} className='hidden h-10 items-center rounded-full bg-[#111] px-5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(0,0,0,.12)] transition duration-200 hover:-translate-y-px hover:bg-black/80 hover:shadow-[0_12px_30px_rgba(0,0,0,.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/55 focus-visible:ring-offset-2 sm:inline-flex'>Start free trial</Link>
            <button
              ref={menuButtonRef}
              type='button'
              aria-expanded={isOpen}
              aria-controls='mobile-navigation'
              aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
              onClick={() => {
                if (isOpen) restoreMenuFocusRef.current = true

                setIsOpen(open => !open)
              }}
              className='grid size-11 place-items-center rounded-full border border-[#ddddda] bg-white text-[#171717] shadow-sm transition hover:border-[#c9c9c4] hover:bg-[#f6f6f3] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 xl:hidden'
            >
              {isOpen ? <XIcon aria-hidden='true' className='size-5' /> : <MenuIcon aria-hidden='true' className='size-5' />}
            </button>
          </div>
        </div>
      </header>

      {isOpen ? (
        <div
          ref={mobileNavigationRef}
          id='mobile-navigation'
          role='dialog'
          aria-modal='true'
          aria-label='Mobile navigation'
          tabIndex={-1}
          className='fixed inset-x-0 top-[72px] z-[60] h-[calc(100dvh-72px)] animate-in overflow-y-auto overscroll-contain border-t border-[#e7e7e4] bg-[#fafaf8] px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-5 shadow-[0_24px_70px_rgba(20,20,20,.12)] duration-200 fade-in slide-in-from-top-2 sm:px-5 sm:pt-6 xl:hidden motion-reduce:animate-none'
        >
          <div className='mx-auto max-w-2xl'>
            <button data-mobile-nav-initial type='button' aria-label='Close navigation' onClick={() => closeMobileNavigation(true)} className='ml-auto grid size-11 place-items-center rounded-full border border-[#ddddda] bg-white text-[#171717] shadow-sm transition hover:border-[#c9c9c4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50'>
              <XIcon aria-hidden='true' className='size-5' />
            </button>
            <nav className='mt-4 overflow-hidden rounded-2xl border border-[#dfdfdb] bg-white sm:mt-5' aria-label='Mobile navigation links'>
              {siteNavigation.map(item => {
                const isActive = navigationIsActive(item.href)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => handleMobileNavigationClick(item.href)}
                    className={cn('group flex min-h-16 items-center justify-between border-b border-[#e7e7e4] px-5 text-xl font-semibold tracking-[-0.03em] transition last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500/45', isActive ? 'bg-[#f3f0ff] text-violet-800' : 'text-[#171717] hover:bg-[#f7f7f4]')}
                  >
                    <span className='flex items-center gap-3'>
                      {isActive ? <span className='size-1.5 rounded-full bg-violet-600' /> : null}
                      {item.label}
                    </span>
                    <span aria-hidden='true' className='text-[#aaa] transition-transform group-hover:translate-x-1'>→</span>
                  </Link>
                )
              })}
            </nav>
            <div className='mt-6 grid gap-3 rounded-2xl border border-[#e4e4e0] bg-white p-4 min-[390px]:grid-cols-[auto_1fr] min-[390px]:items-center sm:mt-8'>
              <Link href={signInUrl} onClick={() => handleMobileNavigationClick(signInUrl)} className='inline-flex h-12 items-center justify-center rounded-full px-4 text-base font-semibold text-[#666] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/45'>Sign in</Link>
              <Link href={signUpUrl} onClick={() => handleMobileNavigationClick(signUpUrl)} className='inline-flex h-12 items-center justify-center rounded-full bg-[#111] px-5 text-base font-semibold text-white shadow-sm transition hover:bg-black/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/55'>Start free trial</Link>
            </div>
            <Link href='/#contact' onClick={() => handleMobileNavigationClick('/#contact')} className='mt-3 flex min-h-12 items-center justify-center rounded-xl text-base font-semibold text-violet-700 underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50'>Plan a walkthrough</Link>
          </div>
        </div>
      ) : null}
    </>
  )
}
