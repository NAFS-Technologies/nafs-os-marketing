# Marketing rebuild

## Scope and ownership

Six reviewable phases: (1) content/configuration/SEO, (2) design system and shell,
(3) homepage and product demonstration, (4) product/solution/use-case templates,
(5) integrations/pricing/partners/resources, (6) lead delivery/editorial/acceptance.
Marketing stays independent. No ERP, database, authentication, DNS, reverse-proxy,
production deployment or commercial terms are changed by this work.

`src/content/product-catalog.ts` is the new buyer-facing inventory. Legacy routes
are migrated onto it in phases 3–5; it is not evidence that a deployment is live.
Evidence reviewed on 2026-10-14: NAFS OS current-product-contract.md (blob
b206b678df4ac2e35ff36729fdcf67fd4baeb36a), ERP module registry and the marketing
README's publishable-claims boundary. Confirm release and business-specific
configuration before changing Guided rollout to general availability.

## Claims

- Core ERP and independently deployed Storefront: guided rollout, not automatic readiness.
- Pathao: implemented provider, still requires business-specific acceptance.
- WooCommerce/Shopify: configure and verify business mappings, not instant setup.
- Daraz, RedX, Steadfast: not marketed as live.
- Flow, Mobile, Shopping, Platform, Partners: development status stays visible.
- Nango's API catalog is not a count of NAFS integrations. No integration-count headline.
- AI suggestions are recommendations, not authority to move money or stock.
- No fabricated customer counts, testimonials, savings, performance or commissions.

## Origins and conversion

`NEXT_PUBLIC_SITE_URL` owns canonicals, Open Graph and the sitemap.
`NEXT_PUBLIC_ERP_URL` owns signup and default signin. `NEXT_PUBLIC_SIGN_IN_URL`
can override signin. `NEXT_PUBLIC_APP_URL` remains a legacy marketing-origin
fallback so existing deployment configuration is not silently redirected.
Set the approved marketing origin explicitly at cutover. Public variables are
build-time inputs in Next.js and are passed through Docker/Compose.
Use NEXT_PUBLIC_INDEXABLE=0 for preview builds. A free-trial CTA is permitted only
with NEXT_PUBLIC_TRIAL_ENABLED=1 after commercial/onboarding approval.

## Product proof

Never publish production customer records or authentication screenshots.
Interactive demonstrations must say Demo data. They are not live ERP screenshots.
A verified screenshot needs source route, source revision, capture viewport,
synthetic seed, capture date, redaction review and approval. Until those assets
exist, use a labeled operational demonstration rather than imply visual parity.

## Acceptance

Preserve existing paths and the /white-label -> /b2b redirect. Test mobile menu
focus, Escape, route changes, responsive containment, demo controls, form errors
and recovery. Check widths 360, 390, 412, 768, 1024, 1440 and 1920, keyboard access,
reduced motion and 200% text. Behavioral and rendered evidence supplement source
contracts; passing source-string assertions is not browser acceptance.

No launch until the production lead destination, site origin, contact identity,
commercial copy and product asset approvals have been verified. Keep the current
site serving until a separately authorized cutover, and retain the prior image
for rollback.
