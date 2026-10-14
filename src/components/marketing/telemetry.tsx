'use client'

import { useEffect, useSyncExternalStore } from 'react'

import { emitMarketingEvent, hasAnalyticsConsent, setAnalyticsConsent, subscribeToConsent } from '@/lib/marketing-telemetry'

export function MarketingTelemetry() {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const element = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-marketing-event="cta_click"]') : null

      if (element) emitMarketingEvent('cta_click', element.dataset.ctaName ?? 'website')
    }

    document.addEventListener('click', onClick)

    return () => document.removeEventListener('click', onClick)
  }, [])

  return null
}

export function AnalyticsPreferences() {
  const enabled = useSyncExternalStore(subscribeToConsent, hasAnalyticsConsent, () => false)

  return <details className='m-analytics-preferences'><summary>Analytics preferences</summary><p>Optional measurement is off by default. Allow anonymous button and form-completion events, and campaign labels with your inquiry. No form contents are included in analytics events.</p><label><input type='checkbox' checked={enabled} onChange={event => setAnalyticsConsent(event.target.checked)} />Allow optional analytics</label><p>You can turn this off at any time. Sending an inquiry does not require analytics consent.</p></details>
}
