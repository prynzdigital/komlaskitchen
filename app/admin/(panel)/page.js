import Link from "next/link";
import { requirePageUser } from "@/lib/auth";
import { listDocs } from "@/lib/store";
import { ORDER_STATUSES } from "@/lib/crm";
import { getSettings } from "@/lib/siteData";

export const metadata = { title: "Dashboard" };

const TZ = "America/Chicago";
const day = (iso) => new Date(iso).toLocaleDateString("en-CA", { timeZone: TZ });
const money = (n) => `$${Number(n || 0).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const ago = (iso) => {
  const m = Math.round((Date.now() - new Date(iso)) / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hr ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: TZ });
};
const statusOf = (id) => ORDER_STATUSES.find((s) => s.id === id) || ORDER_STATUSES[0];

export default async function Dashboard({ searchParams }) {
  const user = await requirePageUser("crm");
  const { denied } = await searchParams;
  const [orders, customers, messages, activity, settings] = await Promise.all([
    listDocs("orders"),
    listDocs("customers"),
    listDocs("messages"),
    listDocs("activity"),
    getSettings(),
  ]);

  const live = orders.filter((o) => o.status !== "cancelled");
  const today = day(new Date().toISOString());
  const since = (days) => Date.now() - days * 864e5;
  const inRange = (o, from, to = Date.now()) => {
    const t = new Date(o.placedAt || o.createdAt).getTime();
    return t >= from && t < to;
  };
  const sum = (list) => list.reduce((s, o) => s + (o.subtotal || 0), 0);

  const todayOrders = live.filter((o) => day(o.placedAt || o.createdAt) === today);
  const week = sum(live.filter((o) => inRange(o, since(7))));
  const lastWeek = sum(live.filter((o) => inRange(o, since(14), since(7))));
  const change = lastWeek ? Math.round(((week - lastWeek) / lastWeek) * 100) : null;
  const toVerify = live.filter((o) => o.payment === "reported").length;
  const fresh = orders.filter((o) => o.status === "new").length;
  const repeat = customers.filter((c) => (c.orderCount || 0) > 1).length;

  const dishes = new Map();
  live
    .filter((o) => inRange(o, since(30)))
    .forEach((o) => (o.lines || []).forEach((l) => dishes.set(l.name, (dishes.get(l.name) || 0) + l.quantity)));
  const top = [...dishes.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6);
  const topMax = top[0]?.[1] || 1;

  const newMessages = messages.filter((m) => m.status === "new");

  return (
    <div className="adm-stack">
      {denied && (
        <div className="adm-notice red">
          <i className="fas fa-lock" />
          <span>Your account doesn&apos;t have access to that page. Ask the owner if you need it.</span>
        </div>
      )}

      <div className="adm-row" style={{ justifyContent: "space-between" }}>
        <div>
          <h2 style={{ fontSize: "1.45rem" }}>Good to see you, {user.name.split(" ")[0]} 👋</h2>
          <p>Here&apos;s how {settings.name} is doing.</p>
        </div>
        <Link href="/admin/settings" className={`adm-pill ${settings.orderingOpen === false ? "red" : "green"}`} style={{ padding: "8px 14px", fontSize: "0.85rem" }}>
          {settings.orderingOpen === false ? "Online ordering paused" : "Online ordering open"}
        </Link>
      </div>

      <div className="adm-kpis">
        <div className="adm-card adm-kpi green">
          <small>
            <i className="fas fa-sun" /> Today
          </small>
          <strong>{todayOrders.length}</strong>
          <span>
            order{todayOrders.length === 1 ? "" : "s"} · {money(sum(todayOrders))}
          </span>
        </div>
        <div className="adm-card adm-kpi">
          <small>
            <i className="fas fa-dollar-sign" /> Last 7 days
          </small>
          <strong>{money(week)}</strong>
          <span>{change === null ? "No sales the week before" : `${change >= 0 ? "▲" : "▼"} ${Math.abs(change)}% vs previous week`}</span>
        </div>
        <Link href="/admin/orders?payment=reported" className={`adm-card adm-kpi${toVerify ? " is-alert" : ""}`}>
          <small>
            <i className="fas fa-hand-holding-usd" /> Check Zelle
          </small>
          <strong>{toVerify}</strong>
          <span>payment{toVerify === 1 ? "" : "s"} to verify</span>
        </Link>
        <Link href="/admin/customers" className="adm-card adm-kpi">
          <small>
            <i className="fas fa-users" /> Customers
          </small>
          <strong>{customers.length}</strong>
          <span>{customers.length ? `${Math.round((repeat / customers.length) * 100)}% came back for more` : "Builds automatically from orders"}</span>
        </Link>
      </div>

      <div className="adm-split">
        <section className="adm-card">
          <div className="adm-card-head">
            <div>
              <h2>Recent orders</h2>
              <p>{fresh ? `${fresh} new — waiting for you` : "All caught up"}</p>
            </div>
            <Link href="/admin/orders" className="adm-btn adm-btn-ghost adm-btn-sm">
              All orders
            </Link>
          </div>
          {orders.length ? (
            <div className="adm-table-wrap">
              <table className="adm-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th className="adm-num">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 8).map((o) => {
                    const st = statusOf(o.status);
                    return (
                      <tr key={o.id}>
                        <td>
                          <Link href={`/admin/orders/${o.id}`} className="adm-strong">
                            {o.ref}
                          </Link>
                          <div className="adm-muted">{ago(o.placedAt || o.createdAt)}</div>
                        </td>
                        <td>
                          {o.customer?.name}
                          <div className="adm-muted">{o.customer?.fulfillment === "delivery" ? "Delivery" : "Pickup"}</div>
                        </td>
                        <td>
                          <span className={`adm-pill ${st.tone}`}>{st.label}</span>
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
              Orders placed on the website will appear here.
            </div>
          )}
        </section>

        <div className="adm-stack">
          <section className="adm-card">
            <div className="adm-card-head">
              <div>
                <h2>Top dishes</h2>
                <p>Last 30 days, by portions sold</p>
              </div>
            </div>
            {top.length ? (
              <div className="adm-bars">
                {top.map(([name, qty]) => (
                  <div key={name} className="adm-bar-row">
                    <div>
                      <span>{name}</span>
                      <span>{qty}</span>
                    </div>
                    <div className="adm-bar">
                      <i style={{ width: `${(qty / topMax) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="adm-empty">Best sellers show up once orders come in.</div>
            )}
          </section>

          <section className="adm-card">
            <div className="adm-card-head">
              <div>
                <h2>Messages</h2>
                <p>{newMessages.length ? `${newMessages.length} unread` : "No unread messages"}</p>
              </div>
              <Link href="/admin/messages" className="adm-btn adm-btn-ghost adm-btn-sm">
                Inbox
              </Link>
            </div>
            <ul className="adm-feed">
              {(newMessages.length ? newMessages : messages).slice(0, 3).map((m) => (
                <li key={m.id}>
                  <span className="dot" style={m.status === "new" ? { background: "var(--red)" } : undefined} />
                  <div style={{ minWidth: 0 }}>
                    <b>{m.name}</b> <span className="adm-muted">· {ago(m.receivedAt || m.createdAt)}</span>
                    <p style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{m.message}</p>
                  </div>
                </li>
              ))}
              {!messages.length && <li className="adm-muted">Contact-form messages land here.</li>}
            </ul>
          </section>
        </div>
      </div>

      <section className="adm-card">
        <div className="adm-card-head">
          <div>
            <h2>Team activity</h2>
            <p>Who changed what, most recent first</p>
          </div>
        </div>
        <ul className="adm-feed">
          {activity.slice(0, 10).map((a) => (
            <li key={a.id}>
              <span className="dot" />
              <div>
                <b>{a.by}</b> {a.text}
                <time>{ago(a.at || a.createdAt)}</time>
              </div>
            </li>
          ))}
          {!activity.length && <li className="adm-muted">Changes made in the admin will be listed here.</li>}
        </ul>
      </section>
    </div>
  );
}
