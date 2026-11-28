"use server";
import { findUserByEmail, hashPassword, logActivity, normEmail, passwordProblem, requireActionUser, ROLES } from "@/lib/auth";
import { getDoc, listDocs, putDoc, storeReady } from "@/lib/store";
import { line } from "@/lib/sanitize";
import { EMAIL_RE } from "@/lib/requestGuard";

const run = async (fn) => {
  try {
    const user = await requireActionUser("team");
    if (!storeReady) throw new Error("No database is connected yet.");
    return await fn(user);
  } catch (err) {
    return { error: err.message || "Something went wrong." };
  }
};

const activeOwners = async () => (await listDocs("users")).filter((u) => u.role === "owner" && u.active !== false);

export const createUserAction = async ({ name, email, role, password }) =>
  run(async (me) => {
    const cleanName = line(name, 80);
    const cleanEmail = normEmail(email);
    if (!cleanName) return { error: "Enter their name." };
    if (!EMAIL_RE.test(cleanEmail)) return { error: "Enter a valid email address." };
    if (!ROLES[role]) return { error: "Choose a role." };
    const weak = passwordProblem(password);
    if (weak) return { error: weak };
    if (await findUserByEmail(cleanEmail)) return { error: "Someone already uses that email." };
    await putDoc("users", null, {
      name: cleanName,
      email: cleanEmail,
      role,
      passwordHash: await hashPassword(password),
      active: true,
      sessionVersion: 1,
      invitedBy: me.name,
    });
    await logActivity(me, `added ${cleanName} as ${ROLES[role].label}`);
    return { ok: true };
  });

export const updateUserAction = async (id, { role, active }) =>
  run(async (me) => {
    const u = await getDoc("users", id);
    if (!u) return { error: "That login no longer exists." };
    const next = { ...u };
    if (role !== undefined) {
      if (!ROLES[role]) return { error: "Choose a role." };
      next.role = role;
    }
    if (active !== undefined) next.active = Boolean(active);
    const losingOwner = u.role === "owner" && u.active !== false && (next.role !== "owner" || next.active === false);
    if (losingOwner && (await activeOwners()).length <= 1) return { error: "Keep at least one active owner." };
    if (id === me.id && next.active === false) return { error: "You can't deactivate your own login." };
    // Any change to access signs that person out everywhere.
    next.sessionVersion = (u.sessionVersion || 1) + 1;
    await putDoc("users", id, next);
    await logActivity(me, `changed ${u.name}'s access (${ROLES[next.role].label}${next.active === false ? ", deactivated" : ""})`);
    return { ok: true };
  });

export const resetUserPasswordAction = async (id, password) =>
  run(async (me) => {
    const u = await getDoc("users", id);
    if (!u) return { error: "That login no longer exists." };
    const weak = passwordProblem(password);
    if (weak) return { error: weak };
    await putDoc("users", id, {
      ...u,
      passwordHash: await hashPassword(password),
      sessionVersion: (u.sessionVersion || 1) + 1,
      failedLogins: 0,
      lockedUntil: null,
    });
    await logActivity(me, `reset ${u.name}'s password`);
    return { ok: true };
  });
