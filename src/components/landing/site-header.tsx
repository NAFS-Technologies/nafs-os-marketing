'use client'

import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRightIcon, MenuIcon, XIcon } from 'lucide-react'

import { navigation } from '@/content/product-catalog'
import { siteConfig } from '@/lib/site-config'

function containModalTab(event: KeyboardEvent<HTMLDialogElement>) {
  if (event.key !== 'Tab') return

  const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])')).filter(element => element.getClientRects().length > 0 && !element.hidden)
  const first = controls[0]
  const last = controls.at(-1)

  if (!first || !last) {
    event.preventDefault()

    return
  }

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first.focus()
  }
}

export function SiteHeader() {
  const pathname = usePathname()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const homeLinkRef = useRef<HTMLAnchorElement>(null)
  const pendingAnchorRef = useRef<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  const close = () => dialogRef.current?.close()

  const open = () => {
    pendingAnchorRef.current = null
    dialogRef.current?.showModal()
    setIsOpen(true)
  }

  const navigate = (href: string) => {
    const destination = new URL(href, window.location.href)

    pendingAnchorRef.current = destination.origin === window.location.origin && destination.pathname === window.location.pathname && destination.hash ? destination.hash.slice(1) : null
    close()
  }

  const afterClose = () => {
    const anchor = pendingAnchorRef.current
    const target = anchor ? document.getElementById(anchor) : null

    pendingAnchorRef.current = null
    setIsOpen(false)

    if (target) {
      target.focus({ preventScroll: true })
      target.scrollIntoView({ block: 'start' })
    } else if (window.matchMedia('(min-width: 1100px)').matches) homeLinkRef.current?.focus({ preventScroll: true })
    else menuButtonRef.current?.focus({ preventScroll: true })
  }

  useEffect(() => {
    dialogRef.current?.close()
  }, [pathname])

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1100px)')

    const onDesktopChange = () => {
      if (desktop.matches) dialogRef.current?.close()
    }

    const onHistoryChange = () => dialogRef.current?.close()

    desktop.addEventListener('change', onDesktopChange)
    window.addEventListener('popstate', onHistoryChange)

    return () => {
      desktop.removeEventListener('change', onDesktopChange)
      window.removeEventListener('popstate', onHistoryChange)
    }
  }, [])

  return (
    <header className='m-header'>
      <div className='m-container m-header-inner'>
        <Link href='/' ref={homeLinkRef} className='m-brand' aria-label='NAFS homepage'><span className='m-wordmark'>NAFS</span><span className='m-brand-label'>COMMERCE<br />OPERATING SYSTEM</span></Link>
        <nav className='m-desktop-nav' aria-label='Primary navigation'>{navigation.map(item => <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}</Link>)}</nav>
        <div className='m-header-actions'>
          <Link href={siteConfig.signInUrl} className='m-text-link m-header-signin'>Sign in</Link>
          <Link href={siteConfig.trialEnabled ? siteConfig.signUpUrl : siteConfig.contactHref} className='m-button' data-marketing-event='cta_click' data-cta-name='header'>{siteConfig.trialEnabled ? 'Start free trial' : 'Book a walkthrough'}</Link>
          <button ref={menuButtonRef} type='button' className='m-menu-button' aria-label='Open navigation' aria-expanded={isOpen} aria-controls='mobile-navigation' onClick={open}><MenuIcon size={20} aria-hidden='true' /></button>
        </div>
      </div>
      <dialog ref={dialogRef} id='mobile-navigation' className='m-mobile-dialog' aria-label='Mobile navigation' aria-modal='true' onClose={afterClose} onKeyDown={containModalTab}>
        <div className='m-mobile-top'><span className='m-wordmark'>NAFS</span><button type='button' className='m-close-button' aria-label='Close navigation' onClick={close} autoFocus><XIcon size={22} aria-hidden='true' /></button></div>
        <nav className='m-mobile-links' aria-label='Mobile navigation links'>{navigation.map(item => <Link key={item.href} href={item.href} onClick={() => navigate(item.href)} aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}<ArrowRightIcon size={20} aria-hidden='true' /></Link>)}</nav>
        <div className='m-actions'><Link href={siteConfig.contactHref} className='m-button' onClick={() => navigate(siteConfig.contactHref)}>Book a walkthrough</Link><Link href={siteConfig.signInUrl} className='m-button m-button-secondary' onClick={() => navigate(siteConfig.signInUrl)}>Sign in</Link><Link href={siteConfig.signUpUrl} className='m-text-link' onClick={() => navigate(siteConfig.signUpUrl)}>{siteConfig.trialEnabled ? 'Start free trial' : 'Create an account'}</Link></div>
      </dialog>
      <noscript><nav className='m-header-noscript' aria-label='Navigation without JavaScript'>{navigation.map(item => <a href={item.href} key={item.href}>{item.label}</a>)}</nav></noscript>
    </header>
  )
}
