
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import { StudioRenderer, createStudioClient } from "@nafs/studio-next";

export default async function StudioIntegrationFixture({ params, searchParams }: { params: Promise<{ surface: string }>; searchParams: Promise<{ site?: string }> }) {
  if (process.env.STUDIO_INTEGRATION_FIXTURE_ENABLED !== "1") notFound();
  const [{ surface }, query, requestHeaders] = await Promise.all([params, searchParams, headers()]);
  const site = query.site;

  if (!site) notFound();
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost";
  const client = createStudioClient({ origin: `${protocol}://${host}`, headers: () => ({ cookie: requestHeaders.get("cookie") ?? "", authorization: requestHeaders.get("authorization") ?? "" }) });
  const document = await client.getPublishedDocument({ site, surface });

  if (!document) notFound();

  return <StudioRenderer adapter={client} document={document} />;
}
