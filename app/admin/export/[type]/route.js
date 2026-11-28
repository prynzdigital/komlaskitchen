import { can, getSessionUser } from "@/lib/auth";
import { listDocs } from "@/lib/store";

export const dynamic = "force-dynamic";

// Spreadsheet-safe CSV cell (also blocks formula injection like "=HYPERLINK(...)").
const cell = (v) => {
  let s = String(v ?? "");
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const csv = (rows) => rows.map((r) => r.map(cell).join(",")).join("\r\n");
const day = (iso) => (iso ? new Date(iso).toISOString().slice(0, 10) : "");

export async function GET(_request, { params }) {
  const user = await getSessionUser();
  if (!user || !can(user, "crm")) return new Response("Not allowed", { status: 403 });
  const { type } = await params;

  let rows;
  if (type === "customers") {
    const list = await listDocs("customers");
    rows = [
      ["Name", "Email", "Phone", "Orders", "Total spent", "First order", "Last order", "Tags", "Notes"],
      ...list.map((c) => [c.name, c.email, c.phone, c.orderCount || 0, (c.totalSpent || 0).toFixed(2), day(c.firstOrderAt), day(c.lastOrderAt), (c.tags || []).join("; "), c.notes]),
    ];
  } else if (type === "orders") {
    const list = await listDocs("orders");
    rows = [
      ["Order", "Placed", "Status", "Payment", "Customer", "Phone", "Email", "Fulfilment", "Address", "Items", "Total"],
      ...list.map((o) => [
        o.ref,
        o.placedAt || o.createdAt,
        o.status,
        o.payment,
        o.customer?.name,
        o.customer?.phone,
        o.customer?.email,
        o.customer?.fulfillment,
        o.customer?.address,
        (o.lines || []).map((l) => `${l.quantity}x ${l.name}${l.selectedSize ? ` (${l.selectedSize})` : ""}`).join("; "),
        (o.subtotal || 0).toFixed(2),
      ]),
    ];
  } else {
    return new Response("Unknown export", { status: 404 });
  }

  return new Response(`﻿${csv(rows)}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="komlas-kitchen-${type}-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
