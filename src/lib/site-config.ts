type PublicEnvironment = {
  siteUrl?: string
  legacyUrl?: string
  erpUrl?: string
  signInUrl?: string
  contactEmail?: string
  indexable?: string
  trialEnabled?: string
}

function httpUrl(value: string, name: string, originOnly = false) {
  const url = new URL(value)
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)

  if (url.username || url.password || (url.protocol !== 'https:' && !(local && url.protocol === 'http:'))) {
    throw new Error(`${name} must be HTTPS (HTTP is allowed only on localhost)`)
  }

  if (originOnly && (url.pathname !== '/' || url.search || url.hash)) {
    throw new Error(`${name} must be an origin without a path, query or fragment`)
  }

  return originOnly ? url.origin : url.href
}

export function resolveSiteConfig(environment: PublicEnvironment) {
  const siteUrl = httpUrl(environment.siteUrl?.trim() || environment.legacyUrl?.trim() || 'https://app.nafs.tech', 'NEXT_PUBLIC_SITE_URL', true)
  const erpUrl = httpUrl(environment.erpUrl?.trim() || 'https://app.nafs.tech', 'NEXT_PUBLIC_ERP_URL', true)
  const email = environment.contactEmail?.trim() || 'hello@nafsos.com'

  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
    throw new Error('NEXT_PUBLIC_CONTACT_EMAIL must be an email address')
  }

  return {
    siteUrl,
    erpUrl,
    signInUrl: httpUrl(environment.signInUrl?.trim() || `${erpUrl}/auth/sign-in`, 'NEXT_PUBLIC_SIGN_IN_URL'),
    signUpUrl: `${erpUrl}/auth/sign-up`,
    contactEmail: email,
    contactHref: '/#contact',
    indexable: environment.indexable !== '0',
    trialEnabled: environment.trialEnabled === '1'
  } as const
}

// Explicit accesses are required for Next.js public build-time substitution.
export const siteConfig = resolveSiteConfig({
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  legacyUrl: process.env.NEXT_PUBLIC_APP_URL,
  erpUrl: process.env.NEXT_PUBLIC_ERP_URL,
  signInUrl: process.env.NEXT_PUBLIC_SIGN_IN_URL,
  contactEmail: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  indexable: process.env.NEXT_PUBLIC_INDEXABLE,
  trialEnabled: process.env.NEXT_PUBLIC_TRIAL_ENABLED
})

export const absoluteUrl = (path: string) => new URL(path, `${siteConfig.siteUrl}/`).href
