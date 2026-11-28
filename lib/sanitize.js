// Input cleaning for everything saved from the admin.
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export const str = (v, max = 500) => String(v ?? "").replace(CONTROL, "").trim().slice(0, max);
export const line = (v, max = 200) => str(v, max).replace(/\s*[\r\n]+\s*/g, " ");
export const bool = (v) => v === true || v === "true" || v === "on" || v === 1;
export const num = (v, { min = 0, max = 100000, decimals = 2 } = {}) => {
  const n = Number.parseFloat(v);
  if (!Number.isFinite(n)) return min;
  const f = 10 ** decimals;
  return Math.min(max, Math.max(min, Math.round(n * f) / f));
};
export const list = (v, fn, max = 50) => (Array.isArray(v) ? v : []).slice(0, max).map(fn);
export const lines = (v, max = 50, each = 200) =>
  (Array.isArray(v) ? v : String(v ?? "").split("\n")).map((x) => line(x, each)).filter(Boolean).slice(0, max);

// Links: site-relative paths, http(s), tel: and mailto: only — never javascript: etc.
export const link = (v, max = 600) => {
  const s = line(v, max);
  if (!s) return "";
  if (s.startsWith("/") && !s.startsWith("//")) return s;
  if (/^(https?:\/\/|tel:|mailto:)/i.test(s)) return s;
  return "";
};

// Images: our own files or https URLs (e.g. Vercel Blob).
export const image = (v) => {
  const s = line(v, 600);
  if (!s) return "";
  if (s.startsWith("/") && !s.startsWith("//")) return s;
  if (/^https:\/\//i.test(s)) return s;
  return "";
};

export const slugify = (v) =>
  str(v, 120)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
