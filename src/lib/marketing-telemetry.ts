export type MarketingEvent = 'cta_click' | 'lead_started' | 'lead_submit_success'
export type CampaignContext = Partial<Record<'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_content', string>>

const consentKey = 'nafs-analytics-consent'
const allowedEvents = new Set<MarketingEvent>(['cta_click', 'lead_started', 'lead_submit_success'])

export function hasAnalyticsConsent() {
  if (typeof window === 'undefined') return false

  try {
    return window.localStorage.getItem(consentKey) === 'granted'
  } catch {
    return false
  }
}

export function setAnalyticsConsent(granted: boolean) {
  try {
    window.localStorage.setItem(consentKey, granted ? 'granted' : 'denied')
  } catch {
    return
  }

  window.dispatchEvent(new Event('nafs:consent'))
}

export function subscribeToConsent(listener: () => void) {
  window.addEventListener('nafs:consent', listener)
  window.addEventListener('storage', listener)

  return () => {
    window.removeEventListener('nafs:consent', listener)
    window.removeEventListener('storage', listener)
  }
}

export function emitMarketingEvent(event: MarketingEvent, placement: string) {
  if (!hasAnalyticsConsent() || !allowedEvents.has(event)) return

  const safePlacement = /^[a-z0-9_-]{1,60}$/.test(placement) ? placement : 'website'
  const detail = { event: `nafs_${event}`, placement: safePlacement }
  const target = window as Window & { dataLayer?: Record<string, unknown>[] }

  if (Array.isArray(target.dataLayer)) target.dataLayer.push(detail)
  window.dispatchEvent(new CustomEvent('nafs:marketing-event', { detail }))
}

export function campaignContextFromUrl(href: string): CampaignContext {
  const result: CampaignContext = {}
  const url = new URL(href)

  for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const) {
    const value = url.searchParams.get(key)?.trim()

    if (value && /^[a-zA-Z0-9 _.-]{1,80}$/.test(value)) result[key] = value
  }

  return result
}

export function currentCampaignContext(): CampaignContext {
  return hasAnalyticsConsent() ? campaignContextFromUrl(window.location.href) : {}
}
