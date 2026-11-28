import Link from "next/link";
import { notFound } from "next/navigation";
import { can, requirePageUser } from "@/lib/auth";
import { getDoc } from "@/lib/store";
import { ORDER_STATUSES, PAYMENT_STATES } from "@/lib/crm";
import { describeCartItemSelections } from "@/lib/pricing";
import { telHref } from "@/lib/siteDefaults";
import OrderControls from "@/components/admin/OrderControls";

export const metadata = { title: "Order" };

const money = (n) => `$${Number(n || 0).toFixed(2)}`;
const when = (iso) =>
  new Date(iso).toLocaleString("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/Chicago" });

export default async function OrderPage({ params }) {
  const user = await requirePageUser("crm");
  const { ref } = await params;
  const order = await getDoc("orders", decodeURIComponent(ref));
  if (!order) notFound();
  const customer = order.customerId ? await getDoc("customers", order.customerId) : null;
  const c = order.customer || {};

  return (
    <div className="adm-stack">
      <div className="adm-row" style={{ justifyContent: "space-between" }}>
        <div>
          <Link href="/admin/orders" className="adm-muted">
            ← All orders
          </Link>
          <h2 style={{ fontSize: "1.5rem", marginTop: 4 }}>Order {order.ref}</h2>
          <p>Placed {when(order.placedAt || order.createdAt)}</p>
        </div>
        <div className="adm-row">
          {c.phone && (
            <a href={telHref(c.phone)} className="adm-btn adm-btn-ghost">
              <i className="fas fa-phone" /> Call
            </a>
          )}
          {c.phone && (
            <a href={`sms:${c.phone.replace(/[^\d+]/g, "")}`} className="adm-btn adm-btn-ghost">
              <i className="fas fa-sms" /> Text
            </a>
          )}
          {c.email && (
            <a href={`mailto:${c.email}?subject=${encodeURIComponent(`Your Komla's Kitchen order ${order.ref}`)}`} className="adm-btn adm-btn-ghost">
              <i className="fas fa-envelope" /> Email
            </a>
          )}
        </div>
      </div>

      {order.totalMismatch && (
        <div className="adm-notice red">
          <i className="fas fa-exclamation-triangle" />
          <span>
            The customer&apos;s screen showed {order.clientSubtotal != null ? money(order.clientSubtotal) : "a different total"}, but menu prices
            add up to <b>{money(order.subtotal)}</b>. Their cart may have been out of date — confirm the amount before preparing.
          </span>
        </div>
      )}

      <div className="adm-split">
        <div className="adm-stack">
          <section className="adm-card">
            <div className="adm-card-head">
              <h2>Items</h2>
              <span className="adm-muted">{c.fulfillment === "delivery" ? "Delivery" : "Pickup"}</span>
            </div>
            {(order.lines || []).map((l, i) => (
              <div key={i} className="adm-line">
                <div>
                  <b>
                    {l.quantity}× {l.name}
                  </b>
                  <small>{describeCartItemSelections(l, " · ") || "Standard"}</small>
                </div>
                <b>{money(l.lineTotal)}</b>
              </div>
            ))}
            <div className="adm-total">
              <span>Total (menu prices)</span>
              <span>{money(order.subtotal)}</span>
            </div>
          </section>

          <section className="adm-card">
            <div className="adm-card-head">
              <h2>Timeline &amp; notes</h2>
            </div>
            <ul className="adm-feed">
              {[...(order.history || [])].reverse().map((h, i) => (
                <li key={i}>
                  <span className={`dot${h.note ? " note" : ""}`} />
                  <div>
                    {h.note ? <span style={{ whiteSpace: "pre-wrap" }}>“{h.text}”</span> : h.text}
                    <time>
                      {h.by} · {when(h.at)}
                    </time>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="adm-stack">
          <OrderControls
            key={`${order.status}-${order.payment}-${(order.history || []).length}`}
            orderRef={order.ref}
            status={order.status}
            payment={order.payment}
            statuses={ORDER_STATUSES}
            payments={PAYMENT_STATES}
            canDelete={can(user, "team")}
          />

          <section className="adm-card">
            <div className="adm-card-head">
              <h2>Customer</h2>
              {customer && (
                <Link href={`/admin/customers/${encodeURIComponent(customer.id)}`} className="adm-btn adm-btn-ghost adm-btn-sm">
                  Profile
                </Link>
              )}
            </div>
            <div className="adm-card-pad">
              <dl className="adm-dl">
                <dt>Name</dt>
                <dd>{c.name}</dd>
                <dt>Phone</dt>
                <dd>{c.phone || "—"}</dd>
                <dt>Email</dt>
                <dd>{c.email || "—"}</dd>
                <dt>{c.fulfillment === "delivery" ? "Deliver to" : "Pickup"}</dt>
                <dd>{c.fulfillment === "delivery" ? c.address : "At the kitchen"}</dd>
                {customer && (
                  <>
                    <dt>History</dt>
                    <dd>
                      {customer.orderCount} order{customer.orderCount === 1 ? "" : "s"} · {money(customer.totalSpent)}
                    </dd>
                  </>
                )}
              </dl>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
