
import { revalidatePath, revalidateTag } from "next/cache";

const invalidateTag = revalidateTag as unknown as (...args: unknown[]) => void;

export async function POST(request: Request) {
  const expected = process.env.STUDIO_REVALIDATION_SECRET;
  const provided = request.headers.get("x-studio-revalidation-secret");

  if (!expected || provided !== expected) return Response.json({ error: "Unauthorized" }, { status: 401 });
  const payload = (await request.json()) as { site: string; surface?: string; paths?: string[] };

  invalidateTag(`studio:${payload.site}`, "max");
  if (payload.surface) invalidateTag(`studio:${payload.site}:${payload.surface}`, "max");
  for (const path of payload.paths ?? []) revalidatePath(path);

  return Response.json({ ok: true });
}
