import type { NextRequest } from "next/server";

const MAX_BYTES = 1024 * 1024;
const TIMEOUT_MS = 8000;

function isPrivateHost(host: string) {
  const h = host.toLowerCase();
  if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".local") || h.endsWith(".internal")) return true;
  if (h === "::1" || h.startsWith("[")) return true;
  const m = h.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  if (m) {
    const [a, b] = [Number(m[1]), Number(m[2])];
    return (
      a === 0 || a === 10 || a === 127 || (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168)
    );
  }
  return false;
}

function decodeEntities(s: string) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .trim();
}

function parseAttrs(tag: string) {
  const attrs: Record<string, string> = {};
  for (const m of tag.matchAll(/([a-zA-Z:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    attrs[m[1].toLowerCase()] = decodeEntities(m[2] ?? m[3] ?? "");
  }
  return attrs;
}

async function readLimited(res: Response) {
  const reader = res.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = [];
  let total = 0;
  while (total < MAX_BYTES) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    total += value.length;
  }
  await reader.cancel().catch(() => {});
  const buf = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    buf.set(c, offset);
    offset += c.length;
  }
  return new TextDecoder("utf-8").decode(buf);
}

export async function GET(request: NextRequest) {
  const raw = request.nextUrl.searchParams.get("url");
  if (!raw) return Response.json({ error: "url 파라미터가 필요합니다." }, { status: 400 });

  let target: URL;
  try {
    target = new URL(raw);
  } catch {
    return Response.json({ error: "올바른 URL이 아닙니다." }, { status: 400 });
  }
  if (!["http:", "https:"].includes(target.protocol) || isPrivateHost(target.hostname)) {
    return Response.json({ error: "허용되지 않는 URL입니다." }, { status: 400 });
  }

  let html: string;
  try {
    const res = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OnebiteLinkBot/1.0)",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!res.ok) {
      return Response.json({ error: `페이지를 가져오지 못했습니다. (${res.status})` }, { status: 502 });
    }
    html = await readLimited(res);
  } catch {
    return Response.json({ error: "페이지를 가져오지 못했습니다." }, { status: 502 });
  }

  const meta: Record<string, string> = {};
  for (const m of html.matchAll(/<meta\s[^>]*>/gi)) {
    const a = parseAttrs(m[0]);
    const key = (a.property ?? a.name)?.toLowerCase();
    if (key && a.content && !(key in meta)) meta[key] = a.content;
  }
  const titleTag = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];

  const title = meta["og:title"] || meta["twitter:title"] || (titleTag ? decodeEntities(titleTag) : "") || target.hostname;
  const description = meta["og:description"] || meta["twitter:description"] || meta["description"] || "";
  let image = meta["og:image"] || meta["twitter:image"] || "";
  if (image) {
    try {
      image = new URL(image, target).href;
    } catch {
      image = "";
    }
  }

  return Response.json({ title, description, image, url: target.href });
}
