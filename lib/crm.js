import "server-only";
import { getDoc, listDocs, putDoc, storeReady } from "@/lib/store";

// Orders, customers and messages for the admin CRM.

export const ORDER_STATUSES = [
  { id: "new", label: "New", tone: "red" },
  { id: "confirmed", label: "Confirmed", tone: "gold" },
  { id: "preparing", label: "Preparing", tone: "gold" },
  { id: "ready", label: "Ready / Out for delivery", tone: "green" },
  { id: "completed", label: "Completed", tone: "muted" },
  { id: "cancelled", label: "Cancelled", tone: "muted" },
];
export const PAYMENT_STATES = [
  { id: "reported", label: "Customer says paid" },
  { id: "verified", label: "Payment verified" },
  { id: "not_received", label: "Not received" },
  { id: "refunded", label: "Refunded" },
];
export const MESSAGE_STATUSES = ["new", "read", "replied", "archived"];

export const customerIdFor = ({ email, phone }) => {
  const e = String(email || "").trim().toLowerCase();
  if (e) return `e:${e}`;
  const digits = String(phone || "").replace(/\D/g, "");
  return digits ? `p:${digits}` : null;
};

const round2 = (n) => Math.round(n * 100) / 100;

// Creates or refreshes the customer record from a new order.
async function touchCustomer(order) {
  const id = customerIdFor(order.customer);
  if (!id) return null;
  const prev = (await getDoc("customers", id)) || {};
  const addresses = new Set(prev.addresses || []);
  if (order.customer.address) addresses.add(order.customer.address);
  await putDoc("customers", id, {
    name: order.customer.name || prev.name,
    email: order.customer.email || prev.email || "",
    phone: order.customer.phone || prev.phone || "",
    addresses: [...addresses].slice(-5),
    orderCount: (prev.orderCount || 0) + 1,
    totalSpent: round2((prev.totalSpent || 0) + order.subtotal),
    firstOrderAt: prev.firstOrderAt || order.placedAt,
    lastOrderAt: order.placedAt,
    lastOrderRef: order.ref,
    tags: prev.tags || [],
    notes: prev.notes || "",
    source: prev.source || "website",
  });
  return id;
}

// Saves a priced website order. Returns the saved order, or null when no database is connected.
export async function recordOrder({ ref, customer, lines, subtotal, clientSubtotal, totalMismatch }) {
  if (!storeReady) return null;
  const placedAt = new Date().toISOString();
  const order = {
    ref,
    placedAt,
    status: "new",
    payment: "reported",
    customer,
    lines,
    subtotal,
    clientSubtotal: Number.isFinite(clientSubtotal) ? clientSubtotal : null,
    totalMismatch: Boolean(totalMismatch),
    notes: "",
    history: [{ at: placedAt, by: "Website", text: "Order placed · customer reported Zelle payment" }],
  };
  order.customerId = await touchCustomer(order);
  return putDoc("orders", ref, order);
}

export async function recordMessage({ name, email, phone, message }) {
  if (!storeReady) return null;
  return putDoc("messages", null, {
    name,
    email,
    phone,
    message,
    status: "new",
    receivedAt: new Date().toISOString(),
    customerId: customerIdFor({ email, phone }),
  });
}

// Recomputes a customer's totals from their (non-cancelled) orders.
export async function recalcCustomer(customerId) {
  if (!customerId) return;
  const prev = await getDoc("customers", customerId);
  if (!prev) return;
  const orders = (await listDocs("orders")).filter((o) => o.customerId === customerId && o.status !== "cancelled");
  await putDoc("customers", customerId, {
    ...prev,
    orderCount: orders.length,
    totalSpent: round2(orders.reduce((s, o) => s + (o.subtotal || 0), 0)),
  });
}
