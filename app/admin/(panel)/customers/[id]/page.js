import Link from "next/link";
import { notFound } from "next/navigation";
import { can, requirePageUser } from "@/lib/auth";
import { getDoc, listDocs } from "@/lib/store";
import { ORDER_STATUSES } from "@/lib/crm";
import { telHref } from "@/lib/siteDefaults";
import CustomerForm from "@/components/admin/CustomerForm";

export const metadata = { title: "Customer" };

const money = (n) => `$${Number(n || 0).toFixed(2)}`;
const date = (iso) => (iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/Chicago" }) : "—");

export default async function CustomerPage({ params }) {
  const user = await requirePageUser("crm");
  const id = decodeURIComponent((await params).id);
  const customer = await getDoc("customers", id);
  if (!customer) notFound();
  const [orders, messages] = await Promise.all([listDocs("orders"), listDocs("messages")]);
  const theirOrders = orders.filter((o) => o.customerId === id);
  const theirMessages = messages.filter((m) => m.customerId === id);
  const avg = customer.orderCount ? customer.totalSpent / customer.orderCount : 0;

  return (
    <div className="adm-stack">
      <div className="adm-row" style={{ justifyContent: "space-between" }}>
        <div>
          <Link href="/admin/customers" className="adm-muted">
            ← All customers
          </Link>
          <h2 style={{ fontSize: "1.5rem", marginTop: 4 }}>{customer.name}</h2>
          <p>
            Customer since {date(customer.firstOrderAt || customer.createdAt)} · {customer.source || "website"}
          </p>
        </div>
        <div className="adm-row">
          {customer.phone && (
            <a href={telHref(customer.phone)} className="adm-btn adm-btn-ghost">
              <i className="fas fa-phone" /> Call
            </a>
          )}
          {customer.phone && (
            <a href={`sms:${customer.phone.replace(/[^\d+]/g, "")}`} className="adm-btn adm-btn-ghost">
              <i className="fas fa-sms" /> Text
            </a>
          )}
          {customer.email && (
            <a href={`mailto:${customer.email}`} className="adm-btn adm-btn-ghost">
              <i className="fas fa-envelope" /> Email
            </a>
          )}
        </div>
      </div>

      <div className="adm-kpis">
        <div className="adm-card adm-kpi green">
          <small>
            <i className="fas fa-coins" /> Lifetime spend
          </small>
          <strong>{money(customer.totalSpent)}</strong>
        </div>
        <div className="adm-card adm-kpi">
          <small>
            <i className="fas fa-receipt" /> Orders
          </small>
          <strong>{customer.orderCount || 0}</strong>
        </div>
        <div className="adm-card adm-kpi">
          <small>
            <i className="fas fa-balance-scale" /> Average order
          </small>
          <strong>{money(avg)}</strong>
        </div>
        <div className="adm-card adm-kpi">
          <small>
            <i className="fas fa-clock" /> Last order
          </small>
          <strong style={{ fontSize: "1.2rem" }}>{date(customer.lastOrderAt)}</strong>
        </div>
      </div>

      <div className="adm-split">
        <div className="adm-stack">
          <section className="adm-card">
            <div className="adm-card-head">
              <h2>Order history</h2>
            </div>
            {theirOrders.length ? (
              <div className="adm-table-wrap">
                <table className="adm-table">
                  <tbody>
                    {theirOrders.map((o) => {
                      const st = ORDER_STATUSES.find((s) => s.id === o.status) || ORDER_STATUSES[0];
                      return (
                        <tr key={o.id}>
                          <td>
                            <Link href={`/admin/orders/${o.id}`} className="adm-strong">
                              {o.ref}
                            </Link>
                            <div className="adm-muted">{date(o.placedAt || o.createdAt)}</div>
                          </td>
                          <td className="adm-muted">{(o.lines || []).map((l) => `${l.quantity}× ${l.name}`).join(", ")}</td>
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
              <div className="adm-empty">No website orders yet.</div>
            )}
          </section>

          {theirMessages.length > 0 && (
            <section className="adm-card">
              <div className="adm-card-head">
                <h2>Messages</h2>
              </div>
              {theirMessages.map((m) => (
                <div key={m.id} className="adm-msg">
                  <div className="adm-msg-head">
                    <b>{date(m.receivedAt || m.createdAt)}</b>
                    <span className="adm-pill muted">{m.status}</span>
                  </div>
                  <p>{m.message}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        <section className="adm-card">
          <div className="adm-card-head">
            <h2>Details &amp; notes</h2>
          </div>
          <div className="adm-card-pad">
            <CustomerForm key={customer.updatedAt} id={id} initial={customer} canDelete={can(user, "team")} />
          </div>
        </section>
      </div>
    </div>
  );
}
