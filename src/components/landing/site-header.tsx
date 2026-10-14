'use client'

import { useEffect, useRef, useState } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRightIcon, MenuIcon, XIcon } from 'lucide-react'

import { navigation } from '@/content/product-catalog'
import { siteConfig } from '@/lib/site-config'

export function SiteHeader() {
  const pathname = usePathname()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const homeLinkRef = useRef<HTMLAnchorElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`)
  const close = () => dialogRef.current?.close()
  const open = () => {
    dialogRef.current?.showModal()
    setIsOpen(true)
  }
  const afterClose = () => {
    setIsOpen(false)

    if (window.matchMedia('(min-width: 1100px)').matches) homeLinkRef.current?.focus({ preventScroll: true })
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
      <dialog ref={dialogRef} id='mobile-navigation' className='m-mobile-dialog' aria-label='Mobile navigation' aria-modal='true' onClose={afterClose}>
        <div className='m-mobile-top'><span className='m-wordmark'>NAFS</span><button type='button' className='m-close-button' aria-label='Close navigation' onClick={close} autoFocus><XIcon size={22} aria-hidden='true' /></button></div>
        <nav className='m-mobile-links' aria-label='Mobile navigation links'>{navigation.map(item => <Link key={item.href} href={item.href} onClick={close} aria-current={isActive(item.href) ? 'page' : undefined}>{item.label}<ArrowRightIcon size={20} aria-hidden='true' /></Link>)}</nav>
        <div className='m-actions'><Link href={siteConfig.contactHref} className='m-button' onClick={close}>Book a walkthrough</Link><Link href={siteConfig.signInUrl} className='m-button m-button-secondary' onClick={close}>Sign in</Link><Link href={siteConfig.signUpUrl} className='m-text-link' onClick={close}>{siteConfig.trialEnabled ? 'Start free trial' : 'Create an account'}</Link></div>
      </dialog>
      <noscript><nav className='m-header-noscript' aria-label='Navigation without JavaScript'>{navigation.map(item => <a href={item.href} key={item.href}>{item.label}</a>)}</nav></noscript>
    </header>
  )
}
