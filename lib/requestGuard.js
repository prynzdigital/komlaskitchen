// Shared protections for public POST endpoints (order, contact).

const MAX_BODY_BYTES = 16 * 1024;

// Best-effort, per-server-instance limiter. Serverless hosts run several
// instances, so this blunts bursts rather than enforcing a global quota.
const buckets = new Map();

const clientIp = (request) =>
  request.headers.get("x-real-ip") ||
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  "unknown";

export function rateLimited(request, key, { limit, windowMs }) {
  const now = Date.now();
  const id = `${key}:${clientIp(request)}`;
  const recent = (buckets.get(id) || []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    buckets.set(id, recent);
    return true;
  }
  recent.push(now);
  buckets.set(id, recent);
  if (buckets.size > 5000) {
    for (const [k, times] of buckets) if (!times.some((t) => now - t < windowMs)) buckets.delete(k);
  }
  return false;
}

// Blocks cross-site browser submissions (e.g. a text/plain form post from another
// site, which skips CORS preflight) while allowing same-origin fetches.
export function crossSite(request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

// Parses a JSON body with a size cap and content-type check.
// Returns { body } on success or { error, status } to send back.
export async function readJson(request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return { error: "Unsupported content type.", status: 415 };
  }
  const declared = Number(request.headers.get("content-length") || 0);
  if (declared > MAX_BODY_BYTES) return { error: "Request too large.", status: 413 };
  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return { error: "Request too large.", status: 413 };
  try {
    const body = JSON.parse(raw);
    if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error("not an object");
    return { body };
  } catch {
    return { error: "Invalid request.", status: 400 };
  }
}

export const escapeHtml = (str) =>
  String(str ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Trims, strips control characters (incl. CR/LF, so values can't break email headers) and caps length.
export const cleanText = (value, max) =>
  String(value ?? "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .trim()
    .slice(0, max);

export const cleanLine = (value, max) => cleanText(value, max).replace(/[\r\n]+/g, " ");

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Splits comma/semicolon-separated env values into unique, valid addresses.
export const recipientList = (...values) => [
  ...new Set(
    values
      .flatMap((v) => String(v || "").split(/[,;]/))
      .map((v) => v.trim().toLowerCase())
      .filter((v) => EMAIL_RE.test(v))
  ),
];
