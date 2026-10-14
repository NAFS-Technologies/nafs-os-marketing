# NAFS public site

Standalone Next.js marketing site for NAFS commerce operations. Marketing follows
[the NAFS OS product contract](https://github.com/NAFS-Technologies/nafs-os/blob/main/docs/current-product-contract.md),
not a list of aspirational features.

## Content and design

`src/content/product-catalog.ts` owns active product, solution, use-case,
integration and navigation data. `src/components/marketing` owns shared marketing
compositions. `src/content/demo-workspace.ts` contains synthetic illustrations,
not production records or captured ERP screens. Legacy template components and
content are not public proof and must not be reintroduced into active routes.

Homepage: product introduction → interactive illustration → operating problems
→ order-to-settlement journey → core solutions → reporting/assistance → verified
connection scope → FAQ → walkthrough. B2B and partner journeys have dedicated
pages. Do not turn the homepage into an unqualified portfolio catalogue or a
long scroll-jacked product tour.

Use the [rebuild guide](docs/marketing-rebuild.md), [editorial guide](docs/editorial.md)
and [release checklist](docs/marketing-release.md). They distinguish source
implementation, browser evidence, approved assets and production readiness.

## Development and checks

Use the pinned Bun version in package.json and a supported Node version.

```bash
bun install --frozen-lockfile
bun run dev
bun run test:content
bun run test
bun run typecheck
bun run lint
bun run build
bun run test:browser:ci
```

Browser CI starts the production build and an isolated local webhook fixture.
It does not send real inquiries. The route matrix covers 360, 390, 412, 768,
1024, 1440 and 1920px. Screenshots are review candidates until inspected and
approved; automated capture is not visual-parity acceptance.

## Configuration

Copy `.env.example` to an ignored local environment file. `NEXT_PUBLIC_SITE_URL`
owns marketing metadata and canonicals. `NEXT_PUBLIC_ERP_URL` owns operator signup
and default signin; the explicit signin override stays supported. Legacy
`NEXT_PUBLIC_APP_URL` is only a marketing-origin fallback. Set the real public
origin explicitly at cutover. Public settings are build-time inputs.

`NAFS_LEAD_WEBHOOK_URL` and optional `NAFS_LEAD_WEBHOOK_TOKEN` stay server-only.
No successful inquiry response is returned without receiver acceptance (apart
from deliberately discarded honeypots). The receiver must persist accepted leads
and deduplicate Idempotency-Key; the site does not claim exactly-once delivery.
Configure trusted edge abuse controls without exposing provider secrets.

Optional analytics are off until visitor opt-in. No third-party tracker is
installed by default. Free-trial copy is gated on explicit commercial approval.
Prices, support, integration readiness and partner terms require confirmation.

## Independent deployment

The standalone Docker service binds to `127.0.0.1:3119` by default. Public build
arguments and server-only secrets remain separate.

```bash
docker compose build marketing
docker compose up -d --no-build marketing
```

Build and health-check before a separately approved reverse-proxy cutover. Keep
the prior site/image available for rollback. This repository does not migrate
ERP data, change authentication, deploy the CMS, or alter DNS/routing.

Extracted from `NAFS-Technologies/nafs-os` at `c575e87dc`, originally `apps/site`.
`packages/studio-next` remains a vendored SDK snapshot; update it deliberately
when adopting upstream changes. Studio publishing remains separately owned and
disabled by default, not an implicitly available new page-builder integration.
