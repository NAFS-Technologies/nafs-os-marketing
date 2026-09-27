import type { ReactNode } from "react";

import { cookies, headers } from "next/headers";

import { StudioRenderer, createStudioClient } from "@nafs/studio-next";

export async function renderStudioSurface(input: { site: string; surface: string; legacy: () => Promise<ReactNode> }) { if (process.env.STUDIO_RENDERER_ENABLED !== "1") return input.legacy(); const requestHeaders = await headers(); const cookieStore = await cookies(); const client = createStudioClient({ origin: process.env.STUDIO_ORIGIN ?? "http://localhost", headers: () => ({ authorization: requestHeaders.get("authorization") ?? "", cookie: cookieStore.toString() }) }); const document = await client.getPublishedDocument({ site: input.site, surface: input.surface });

 if (!document) return input.legacy();

 return <StudioRenderer adapter={client} document={document} />; }
