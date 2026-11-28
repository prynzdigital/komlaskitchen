import Link from "next/link";
import { requirePageUser } from "@/lib/auth";
import { listDocs } from "@/lib/store";
import { ORDER_STATUSES, PAYMENT_STATES } from "@/lib/crm";
import SearchBox from "@/components/admin/SearchBox";

export const metadata = { title: "Orders" };

const money = (n) => `$${Number(n || 0).toFixed(2)}`;
const when = (iso) =>
  new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/Chicago" });

export default async function OrdersPage({ searchParams }) {
  await requirePageUser("crm");
  const { status = "all", payment, q = "" } = await searchParams;
  const orders = await listDocs("orders");

  const needle = q.trim().toLowerCase();
  const shown = orders.filter((o) => {
    if (status === "open" && ["completed", "cancelled"].includes(o.status)) return false;
    if (!["all", "open"].includes(status) && o.status !== status) return false;
    if (payment && o.payment !== payment) return false;
    if (!needle) return true;
    return [o.ref, o.customer?.name, o.customer?.email, o.customer?.phone].some((v) => String(v || "").toLowerCase().includes(needle));
  });

  const count = (id) => orders.filter((o) => o.status === id).length;
  const tabs = [
    { id: "all", label: "All", n: orders.length },
    { id: "open", label: "Open", n: orders.filter((o) => !["completed", "cancelled"].includes(o.status)).length },
    ...ORDER_STATUSES.map((s) => ({ id: s.id, label: s.label.split(" /")[0], n: count(s.id) })),
  ];
  const href = (s) => `/admin/orders?status=${s}${q ? `&q=${encodeURIComponent(q)}` : ""}`;

  return (
    <div className="adm-stack">
      <div className="adm-row" style={{ justifyContent: "space-between" }}>
        <nav className="adm-tabs" aria-label="Filter orders">
          {tabs.map((t) => (
            <Link key={t.id} href={href(t.id)} className={status === t.id && !payment ? "on" : ""}>
              {t.label} <b>{t.n}</b>
            </Link>
          ))}
          {payment && (
            <Link href="/admin/orders" className="on">
              {PAYMENT_STATES.find((p) => p.id === payment)?.label} ✕
            </Link>
          )}
        </nav>
        <div className="adm-row">
          <SearchBox placeholder="Search name, phone, order #" />
          <a href="/admin/export/orders" className="adm-btn adm-btn-ghost adm-btn-sm">
            <i className="fas fa-file-csv" /> Export
          </a>
        </div>
      </div>

      <section className="adm-card">
        {shown.length ? (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Placed</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th className="adm-num">Total</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((o) => {
                  const st = ORDER_STATUSES.find((s) => s.id === o.status) || ORDER_STATUSES[0];
                  const pay = PAYMENT_STATES.find((p) => p.id === o.payment);
                  return (
                    <tr key={o.id}>
                      <td>
                        <Link href={`/admin/orders/${o.id}`} className="adm-strong">
                          {o.ref}
                        </Link>
                        {o.totalMismatch && <div style={{ color: "var(--red)", fontSize: "0.75rem", fontWeight: 800 }}>Check amount</div>}
                      </td>
                      <td className="adm-muted">{when(o.placedAt || o.createdAt)}</td>
                      <td>
                        <b>{o.customer?.name}</b>
                        <div className="adm-muted">{o.customer?.phone}</div>
                      </td>
                      <td className="adm-muted">
                        {(o.lines || []).reduce((s, l) => s + l.quantity, 0)} · {o.customer?.fulfillment === "delivery" ? "Delivery" : "Pickup"}
                      </td>
                      <td>
                        <span className={`adm-pill ${st.tone}`}>{st.label}</span>
                      </td>
                      <td>
                        <span className={`adm-pill ${o.payment === "verified" ? "green" : o.payment === "reported" ? "gold" : "red"}`}>{pay?.label || "—"}</span>
                      </td>
                      <td className="adm-num adm-strong">{money(o.subtotal)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="adm-empty">
            <i className="fas fa-receipt" />
            {orders.length ? "No orders match this filter." : "No orders yet — website orders will show up here the moment they're placed."}
          </div>
        )}
      </section>
    </div>
  );
}
