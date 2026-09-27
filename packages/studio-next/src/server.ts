
import "server-only";
import type { StudioCommerceAdapter, StudioDeliveryAdapter, StudioDocument } from "./types";
import { assertStudioDocument } from "./validate";

export interface CreateStudioClientOptions {
  origin: string;
  pathPrefix?: string;
  fetchImpl?: typeof fetch;
  headers?: () => Promise<HeadersInit> | HeadersInit;
  commerce?: StudioCommerceAdapter;
}

const emptyCommerce: StudioCommerceAdapter = {
  async products() { return []; },
  async product() { return null; },
  async cart() { return null; },
};

export function createStudioClient(options: CreateStudioClientOptions): StudioDeliveryAdapter {
  const fetchImpl = options.fetchImpl ?? fetch;
  const getHeaders = options.headers ?? (() => ({}));
  const prefix = (options.pathPrefix ?? "/api/studio/v1").replace(/\/$/, "");
  return {
    async getPublishedDocument({ site, surface, previewToken }): Promise<StudioDocument | null> {
      const url = new URL(`${prefix}/delivery/sites/${encodeURIComponent(site)}/surfaces/${encodeURIComponent(surface)}`, options.origin);
      if (previewToken) url.searchParams.set("preview", previewToken);
      const requestInit: RequestInit & { next?: { tags: string[] } } = {
        headers: await getHeaders(),
        cache: previewToken ? "no-store" : "force-cache",
      };
      if (!previewToken) requestInit.next = { tags: [`studio:${site}`, `studio:${site}:${surface}`] };
      const response = await fetchImpl(url, requestInit);
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`Studio delivery failed with ${response.status}`);
      return assertStudioDocument((await response.json()) as StudioDocument);
    },
    async getPublishedContent<T = Record<string, unknown>>({ site, kind, slug }: { site: string; kind: string; slug?: string }): Promise<T | T[] | null> {
      const suffix = slug ? `/${encodeURIComponent(slug)}` : "";
      const url = new URL(`${prefix}/delivery/sites/${encodeURIComponent(site)}/content/${encodeURIComponent(kind)}${suffix}`, options.origin);
      const response = await fetchImpl(url, { headers: await getHeaders(), cache: "force-cache", next: { tags: [`studio:${site}`, `studio:${site}:content:${kind}`] } } as RequestInit);
      if (response.status === 404) return null;
      if (!response.ok) throw new Error(`Studio content delivery failed with ${response.status}`);
      const payload = await response.json() as T | { items: T[] };
      return typeof payload === "object" && payload !== null && "items" in payload ? (payload as { items: T[] }).items : payload as T;
    },
    commerce: options.commerce ?? emptyCommerce,
  };
}
