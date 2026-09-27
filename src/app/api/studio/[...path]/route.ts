
import type { NextRequest } from "next/server";

const forbidden = new Set(["x-tenant-id", "x-tenant", "tenant-id", "tenant_id"]);

async function proxy(request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const base = process.env.STUDIO_API_URL;

  if (!base) return Response.json({ error: "Studio API is not configured" }, { status: 503 });
  const { path } = await context.params;
  const tail = path[0] === "v1" ? path.slice(1) : path;
  const target = new URL(`/v1/studio/${tail.map(encodeURIComponent).join("/")}`, base);

  target.search = request.nextUrl.search;
  const headers = new Headers();

  for (const [name, value] of request.headers) if (!forbidden.has(name.toLowerCase()) && ["authorization", "cookie", "accept", "content-type", "if-match"].includes(name.toLowerCase())) headers.set(name, value);
  const response = await fetch(target, { method: request.method, headers, body: ["GET", "HEAD"].includes(request.method) ? undefined : await request.arrayBuffer(), cache: "no-store", redirect: "manual" });

  return new Response(response.body, { status: response.status, headers: { "content-type": response.headers.get("content-type") ?? "application/json", etag: response.headers.get("etag") ?? "" } });
}

export const GET = proxy; export const POST = proxy; export const PUT = proxy; export const PATCH = proxy; export const DELETE = proxy;
