"use server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  attemptLogin,
  endSession,
  hasAnyUser,
  hashPassword,
  logActivity,
  normEmail,
  passwordProblem,
  requireActionUser,
  startSession,
  verifyPassword,
} from "@/lib/auth";
import { putDoc, storeReady } from "@/lib/store";
import { line } from "@/lib/sanitize";
import { EMAIL_RE } from "@/lib/requestGuard";

const clientIp = async () => {
  const h = await headers();
  return h.get("x-real-ip") || h.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
};

export async function loginAction(_prev, formData) {
  if (!storeReady) return { error: "The admin needs a database first — see the setup notes." };
  const email = line(formData.get("email"), 200);
  const password = String(formData.get("password") || "");
  if (!email || !password) return { error: "Enter your email and password." };
  const result = await attemptLogin(email, password, await clientIp());
  if (result.error) return { error: result.error, email };
  await logActivity(result.user, "signed in");
  redirect("/admin");
}

// First-run only: creates the owner account. In production it also needs ADMIN_SETUP_CODE.
export async function setupAction(_prev, formData) {
  if (!storeReady) return { error: "Connect a database first (Vercel → Storage → Neon), then redeploy." };
  if (await hasAnyUser()) return { error: "The owner account already exists — please sign in." };

  const expected = process.env.ADMIN_SETUP_CODE;
  if (process.env.NODE_ENV === "production" && !expected) {
    return { error: "Add an ADMIN_SETUP_CODE environment variable in Vercel, redeploy, then use it here." };
  }
  if (expected && String(formData.get("code") || "") !== expected) return { error: "That setup code isn't right." };

  const name = line(formData.get("name"), 80);
  const email = normEmail(formData.get("email"));
  const password = String(formData.get("password") || "");
  if (!name) return { error: "Enter your name." };
  if (!EMAIL_RE.test(email)) return { error: "Enter a valid email address." };
  const weak = passwordProblem(password);
  if (weak) return { error: weak };
  if (password !== String(formData.get("confirm") || "")) return { error: "The two passwords don't match." };

  const user = await putDoc("users", null, {
    name,
    email,
    role: "owner",
    passwordHash: await hashPassword(password),
    active: true,
    sessionVersion: 1,
  });
  await startSession(user);
  await logActivity(user, "created the owner account");
  redirect("/admin");
}

export async function logoutAction() {
  await endSession();
  redirect("/admin/login");
}

export async function updateProfileAction({ name }) {
  const user = await requireActionUser("crm");
  const clean = line(name, 80);
  if (!clean) return { error: "Enter your name." };
  await putDoc("users", user.id, { ...user, name: clean });
  return { ok: true };
}

export async function changePasswordAction({ current, next }) {
  const user = await requireActionUser("crm");
  if (!(await verifyPassword(current, user.passwordHash))) return { error: "Your current password isn't right." };
  const weak = passwordProblem(next);
  if (weak) return { error: weak };
  // Bumping the session version signs out every other device.
  const saved = await putDoc("users", user.id, {
    ...user,
    passwordHash: await hashPassword(next),
    sessionVersion: (user.sessionVersion || 1) + 1,
  });
  await startSession(saved);
  await logActivity(user, "changed their password");
  return { ok: true };
}

export async function signOutEverywhereAction() {
  const user = await requireActionUser("crm");
  await putDoc("users", user.id, { ...user, sessionVersion: (user.sessionVersion || 1) + 1 });
  await endSession();
  redirect("/admin/login");
}
