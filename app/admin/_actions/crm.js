"use server";
import { can, logActivity, requireActionUser } from "@/lib/auth";
import { deleteDoc, getDoc, putDoc, storeReady } from "@/lib/store";
import { customerIdFor, MESSAGE_STATUSES, ORDER_STATUSES, PAYMENT_STATES, recalcCustomer } from "@/lib/crm";
import { line, lines, str } from "@/lib/sanitize";
import { EMAIL_RE } from "@/lib/requestGuard";

const run = async (area, fn) => {
  try {
    const user = await requireActionUser(area);
    if (!storeReady) throw new Error("No database is connected yet.");
    return await fn(user);
  } catch (err) {
    return { error: err.message || "Something went wrong." };
  }
};

const label = (arr, id) => arr.find((x) => x.id === id)?.label || id;

/* ── Orders ────────────────────────────────────────────── */
export const updateOrderAction = async (ref, { status, payment, note }) =>
  run("crm", async (user) => {
    const order = await getDoc("orders", ref);
    if (!order) return { error: "That order no longer exists." };
    const now = new Date().toISOString();
    const history = [...(order.history || [])];
    const next = { ...order };

    if (status && status !== order.status) {
      if (!ORDER_STATUSES.some((s) => s.id === status)) return { error: "Unknown status." };
      next.status = status;
      history.push({ at: now, by: user.name, text: `Status → ${label(ORDER_STATUSES, status)}` });
    }
    if (payment && payment !== order.payment) {
      if (!PAYMENT_STATES.some((p) => p.id === payment)) return { error: "Unknown payment state." };
      next.payment = payment;
      history.push({ at: now, by: user.name, text: `Payment → ${label(PAYMENT_STATES, payment)}` });
    }
    const cleanNote = str(note, 1000);
    if (cleanNote) history.push({ at: now, by: user.name, text: cleanNote, note: true });

    next.history = history.slice(-100);
    await putDoc("orders", ref, next);
    if ((status === "cancelled") !== (order.status === "cancelled")) await recalcCustomer(order.customerId);
    await logActivity(user, `updated order ${ref}${status && status !== order.status ? ` (${label(ORDER_STATUSES, status)})` : ""}`);
    return { ok: true };
  });

export const deleteOrderAction = async (ref) =>
  run("team", async (user) => {
    const order = await getDoc("orders", ref);
    if (!order) return { error: "That order no longer exists." };
    await deleteDoc("orders", ref);
    await recalcCustomer(order.customerId);
    await logActivity(user, `deleted order ${ref}`);
    return { ok: true };
  });

/* ── Customers ─────────────────────────────────────────── */
const cleanCustomer = (raw) => ({
  name: line(raw.name, 120),
  email: line(raw.email, 200).toLowerCase(),
  phone: line(raw.phone, 40),
  tags: lines(String(raw.tags || "").split(","), 12, 30),
  notes: str(raw.notes, 4000),
  addresses: lines(raw.addresses, 5, 300),
});

export const saveCustomerAction = async (id, raw) =>
  run("crm", async (user) => {
    const data = cleanCustomer(raw);
    if (!data.name) return { error: "Enter the customer's name." };
    if (data.email && !EMAIL_RE.test(data.email)) return { error: "That email address doesn't look right." };
    if (!data.email && !data.phone) return { error: "Add an email or a phone number." };

    if (id) {
      const prev = await getDoc("customers", id);
      if (!prev) return { error: "That customer no longer exists." };
      await putDoc("customers", id, { ...prev, ...data });
      await logActivity(user, `updated customer ${data.name}`);
      return { ok: true, id };
    }
    const newId = customerIdFor(data);
    if (await getDoc("customers", newId)) return { error: "A customer with that email/phone already exists." };
    await putDoc("customers", newId, { ...data, orderCount: 0, totalSpent: 0, source: "added in admin" });
    await logActivity(user, `added customer ${data.name}`);
    return { ok: true, id: newId };
  });

export const deleteCustomerAction = async (id) =>
  run("team", async (user) => {
    const c = await getDoc("customers", id);
    if (!c) return { error: "That customer no longer exists." };
    await deleteDoc("customers", id);
    await logActivity(user, `deleted customer ${c.name}`);
    return { ok: true };
  });

/* ── Messages ──────────────────────────────────────────── */
export const setMessageStatusAction = async (id, status) =>
  run("crm", async (user) => {
    if (!MESSAGE_STATUSES.includes(status)) return { error: "Unknown status." };
    const m = await getDoc("messages", id);
    if (!m) return { error: "That message no longer exists." };
    await putDoc("messages", id, { ...m, status, handledBy: user.name });
    return { ok: true };
  });

export const deleteMessageAction = async (id) =>
  run("crm", async (user) => {
    if (!can(user, "content")) return { error: "Only managers and the owner can delete messages." };
    await deleteDoc("messages", id);
    await logActivity(user, "deleted a message");
    return { ok: true };
  });
