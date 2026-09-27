# NAFS Public Site

Public commercial Next.js site. Marketing follows current code and
[the NAFS OS product contract](https://github.com/NAFS-Technologies/nafs-os/blob/main/docs/current-product-contract.md).

## Content contract

[Page routes](src/app/%28pages%29/) and [sitemap](src/app/sitemap.ts) own the
published route inventory; [landing content](src/content/nafs-landing.ts) owns
product, solution and use-case copy.

The homepage uses a compact story sequence: platform category → technology
proof → one order's operating pulse → ecosystem map → migration/integrations
→ B2B business → partnerships → visibility/control. Keep visual proof and
buyer language ahead of text walls. Do not restore the 420vh homepage tour.

Ordinary desktop headlines normally use 56–76px, navigation 15–16px, body
16–18px and technical labels 11–12px. Motion explains state or commercial flow.
Use real technology logos/workflow scenes; logs and traces must explain
operational dependability. Check layout at 360, 390, 412, 768, 1024, 1440 and 1920px; preserve
accessibility, touch targets and reduced motion. No document overflow at 360px.

## Publishable claims

- ERP/Postgres is the commerce authority; Payload has separate content
  persistence. External channels/providers connect to NAFS.
- Redis/Valkey is not a baseline NAFS OS dependency; specialized runtimes such
  as Partners use it. Partners also targets MySQL, ClickHouse and BullMQ.
- Nango owns external authorization/credentials/connections. Its 900+ API
  catalog is not 900 implemented NAFS business mappings; reverify the catalog
  figure before changing that claim.
- Flexprice owns control-plane billing/usage/entitlements; Cloudflare for SaaS
  owns custom-hostname TLS; NAFS owns partner/client/brand/domain relationships
  and provider-neutral commission events.
- WooCommerce has a managed approval path without API-key copying. Actual
  WooCommerce/Shopify tenant operation needs configuration/evidence. Do not
  promise an exact connection time without measurements.
- Pathao is the implemented Courier provider. Reverify before claiming a
  complete Daraz connector.
- Operator pricing is contact-sales. Exact prices, limits, fees, integrations,
  B2B terms, referral commissions, reseller margins and support commitments
  require commercial approval. No invented logos/testimonials, guaranteed
  earnings, universal affiliate rate or unmeasured performance claim.
- Approved plan names/price overrides, implementation/migration/services,
  integrations/add-ons, client onboarding, brand/domain controls and recurring
  subscriptions may explain B2B economics; keep maturity truthful.

## Development

From the repository root:

```bash
bun install --frozen-lockfile
bun run dev
bun run test
bun run typecheck
bun run lint
bun run build
```

Configure public URLs/contact data from [the environment example](.env.example)
and [landing defaults](src/content/nafs-landing.ts); verify them before
publishing. The [lead webhook](src/app/api/demo-request/route.ts) stays server-only.

## Repository boundary

Extracted from `NAFS-Technologies/nafs-os` at `c575e87dc`, originally `apps/site`.
Routes, assets, lead delivery and optional Studio integration are preserved.
`packages/studio-next` is a vendored snapshot from that revision so installs and
builds do not require a NAFS OS checkout or a private package registry. Update it
explicitly when adopting upstream SDK changes.

## Independent deployment

The root Dockerfile builds the Next.js standalone server. `compose.yml` owns only
the marketing service and binds it to `127.0.0.1:3119` by default; set
`MARKETING_PORT` to choose another host port. Public URLs are build arguments; the
lead webhook and Studio settings stay server-only. Keep local secrets in `.env`,
using [.env.example](.env.example) as the template.

```bash
docker compose build marketing
docker compose up -d --no-build marketing
```

Build and health-check this service before changing the public reverse proxy.
The existing NAFS OS native site release stays running until an explicit cutover;
NAFS OS no longer builds or deploys marketing. No DNS, host routing or services
are changed by extracting this repository.
