import "server-only";
import { createHash, createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { dbUrl, getDoc, listDocs, putDoc, storeMode } from "@/lib/store";

const scrypt = promisify(scryptCb);
const IS_PROD = process.env.NODE_ENV === "production";
const COOKIE = IS_PROD ? "__Host-kk_admin" : "kk_admin";
const SESSION_DAYS = 7;
const MAX_FAILED = 5;
const LOCK_MINUTES = 15;

/* ── Roles ───────────────────────────────────────────── */
// owner   → everything, including team logins and notification emails
// manager → website content + CRM
// staff   → CRM only (dashboard, orders, customers, messages)
export const ROLES = {
  owner: { label: "Owner", rank: 3 },
  manager: { label: "Manager", rank: 2 },
  staff: { label: "Staff", rank: 1 },
};
export const can = (user, area) => {
  const rank = ROLES[user?.role]?.rank || 0;
  if (area === "team") return rank >= 3;
  if (area === "content" || area === "settings") return rank >= 2;
  return rank >= 1; // crm
};

/* ── Passwords (scrypt) ──────────────────────────────── */
export async function hashPassword(password) {
  const salt = randomBytes(16).toString("base64url");
  const key = await scrypt(password, salt, 64, { N: 16384, r: 8, p: 1 });
  return `scrypt$${salt}$${key.toString("base64url")}`;
}
export async function verifyPassword(password, stored) {
  const [scheme, salt, hash] = String(stored || "").split("$");
  if (scheme !== "scrypt" || !salt || !hash) return false;
  const key = await scrypt(String(password), salt, 64, { N: 16384, r: 8, p: 1 });
  const expected = Buffer.from(hash, "base64url");
  return expected.length === key.length && timingSafeEqual(expected, key);
}
export const passwordProblem = (pw) =>
  String(pw || "").length < 10 ? "Use at least 10 characters for the password." : null;

/* ── Signed session cookie ───────────────────────────── */
function secret() {
  if (process.env.ADMIN_SESSION_SECRET) return process.env.ADMIN_SESSION_SECRET;
  // Fallback: derive from the (already secret) database URL so no extra setup is required.
  const db = dbUrl();
  if (db) return createHash("sha256").update(`kk-admin-session:${db}`).digest("base64url");
  if (!IS_PROD) return "kk-local-development-only-secret";
  throw new Error("ADMIN_SESSION_SECRET is not set.");
}
const sign = (payload) => createHmac("sha256", secret()).update(payload).digest("base64url");

function makeToken(user) {
  const payload = Buffer.from(
    JSON.stringify({ u: user.id, v: user.sessionVersion || 1, e: Date.now() + SESSION_DAYS * 864e5 })
  ).toString("base64url");
  return `${payload}.${sign(payload)}`;
}
function readToken(token) {
  const [payload, sig] = String(token || "").split(".");
  if (!payload || !sig) return null;
  const expected = Buffer.from(sign(payload));
  const given = Buffer.from(sig);
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString());
    return data.e > Date.now() ? data : null;
  } catch {
    return null;
  }
}

export async function startSession(user) {
  (await cookies()).set(COOKIE, makeToken(user), {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
}
export async function endSession() {
  (await cookies()).delete(COOKIE);
}

/* ── Users ───────────────────────────────────────────── */
export const publicUser = (u) =>
  u && { id: u.id, name: u.name, email: u.email, role: u.role, active: u.active !== false, lastLoginAt: u.lastLoginAt || null, createdAt: u.createdAt };

export const normEmail = (e) => String(e || "").trim().toLowerCase();

export async function findUserByEmail(email) {
  const e = normEmail(email);
  return (await listDocs("users")).find((u) => u.email === e) || null;
}
export async function hasAnyUser() {
  if (storeMode === "none") return false;
  return (await listDocs("users")).length > 0;
}

// The signed-in admin user, or null.
export async function getSessionUser() {
  if (storeMode === "none") return null;
  const data = readToken((await cookies()).get(COOKIE)?.value);
  if (!data) return null;
  const user = await getDoc("users", data.u);
  if (!user || user.active === false || (user.sessionVersion || 1) !== data.v) return null;
  return user;
}

// For admin pages: sends visitors without access to the login page.
export async function requirePageUser(area = "crm") {
  const user = await getSessionUser();
  if (!user) redirect("/admin/login");
  if (!can(user, area)) redirect("/admin?denied=1");
  return user;
}

// For server actions: throws instead of redirecting.
export async function requireActionUser(area = "crm") {
  const user = await getSessionUser();
  if (!user) throw new Error("Your session has expired — please sign in again.");
  if (!can(user, area)) throw new Error("Your account doesn't have access to this.");
  return user;
}

/* ── Login with lockout ──────────────────────────────── */
const ipHits = new Map();
const ipLimited = (ip) => {
  const now = Date.now();
  const hits = (ipHits.get(ip) || []).filter((t) => now - t < LOCK_MINUTES * 60e3);
  hits.push(now);
  ipHits.set(ip, hits);
  return hits.length > 20;
};

export async function attemptLogin(email, password, ip = "unknown") {
  const generic = "That email and password don't match.";
  if (ipLimited(ip)) return { error: "Too many attempts. Please wait 15 minutes and try again." };
  const user = await findUserByEmail(email);
  if (!user || user.active === false) {
    await verifyPassword(password, "scrypt$c2FsdA$AAAA"); // keep timing similar for unknown emails
    return { error: generic };
  }
  if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
    return { error: `This account is locked for a few minutes after too many attempts.` };
  }
  if (!(await verifyPassword(password, user.passwordHash))) {
    const failed = (user.failedLogins || 0) + 1;
    await putDoc("users", user.id, {
      ...user,
      failedLogins: failed >= MAX_FAILED ? 0 : failed,
      lockedUntil: failed >= MAX_FAILED ? new Date(Date.now() + LOCK_MINUTES * 60e3).toISOString() : null,
    });
    return { error: generic };
  }
  const saved = await putDoc("users", user.id, {
    ...user,
    failedLogins: 0,
    lockedUntil: null,
    lastLoginAt: new Date().toISOString(),
  });
  await startSession(saved);
  return { user: saved };
}

/* ── Activity log ────────────────────────────────────── */
export async function logActivity(user, text) {
  try {
    await putDoc("activity", null, { by: user?.name || "System", byId: user?.id || null, text, at: new Date().toISOString() });
  } catch (err) {
    console.error("activity log:", err.message);
  }
}
