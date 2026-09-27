import { readFileSync } from 'node:fs';

const sitePackage = JSON.parse(
  readFileSync(new URL('../package.json', import.meta.url), 'utf8')
);

const siteEnv = readFileSync(new URL('../.env.example', import.meta.url), 'utf8');

const activeHeader = readFileSync(
  new URL('../src/components/landing/site-header.tsx', import.meta.url),
  'utf8'
);

const nextConfig = readFileSync(new URL('../next.config.ts', import.meta.url), 'utf8');

if (sitePackage.name !== '@nafs/marketing') throw new Error('marketing package name is not @nafs/marketing');

if (!siteEnv.includes('NEXT_PUBLIC_APP_URL=https://app.nafs.tech')) {
  throw new Error('site canonical URL is not configured');
}

if (!siteEnv.includes('NEXT_PUBLIC_SIGN_IN_URL=https://app.nafs.tech/auth/sign-in')) {
  throw new Error('ERP sign-in URL is not configured');
}

if (!activeHeader.includes("const signInUrl = process.env.NEXT_PUBLIC_SIGN_IN_URL ?? '/auth/sign-in'")) {
  throw new Error('active site header does not resolve the configured ERP sign-in URL');
}

if (!activeHeader.includes('href={signInUrl}')) {
  throw new Error('active site header sign-in links do not use the resolved URL');
}

for (const requiredNavigationGuardrail of [
  '{isOpen ? (',
  "role='dialog'",
  "aria-modal='true'",
  "className='fixed inset-x-0 top-[72px] z-[60]",
  'h-[calc(100dvh-72px)]',
  'body:has(#mobile-navigation){overflow:hidden}'
]) {
  if (!activeHeader.includes(requiredNavigationGuardrail)) {
    throw new Error(`open mobile navigation guardrail is missing: ${requiredNavigationGuardrail}`);
  }
}

for (const forbiddenNavigationState of ['inert={!isOpen}', "aria-hidden='false'", 'aria-hidden={!isOpen}']) {
  if (activeHeader.includes(forbiddenNavigationState)) {
    throw new Error(`conditionally mounted mobile navigation must not carry hidden-state semantics: ${forbiddenNavigationState}`);
  }
}

for (const requiredDeliveryGuardrail of [
  'poweredByHeader: false',
  "key: 'Content-Security-Policy'",
  "frame-ancestors 'none'",
  "key: 'Permissions-Policy'",
  "key: 'Referrer-Policy'",
  "key: 'X-Content-Type-Options'",
  "key: 'X-Frame-Options'"
]) {
  if (!nextConfig.includes(requiredDeliveryGuardrail)) {
    throw new Error(`site delivery guardrail is missing: ${requiredDeliveryGuardrail}`);
  }
}

console.log('standalone marketing integration check passed');

const guardrails = readFileSync(new URL('../src/app/ui-guardrails.css', import.meta.url), 'utf8');
const layout = readFileSync(new URL('../src/app/layout.tsx', import.meta.url), 'utf8');

if (!layout.includes('ui-guardrails.css')) throw new Error('marketing layout must load containment guardrails');

for (const required of ["overflow-x: clip", "min-width: 0", "[data-slot='dropdown-menu-content']", "[data-slot='select-trigger']", "max-width: calc(100vw - 2rem)"]) {
  if (!guardrails.includes(required)) throw new Error(`marketing containment guardrail is missing: ${required}`);
}
