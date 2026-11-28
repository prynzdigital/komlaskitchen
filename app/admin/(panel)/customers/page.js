import Link from "next/link";
import { requirePageUser } from "@/lib/auth";
import { listDocs } from "@/lib/store";
import SearchBox from "@/components/admin/SearchBox";
import NewCustomerButton from "@/components/admin/NewCustomerButton";

export const metadata = { title: "Customers" };

const money = (n) => `$${Number(n || 0).toFixed(2)}`;
const date = (iso) => (iso ? new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "America/Chicago" }) : "—");

const SORTS = {
  recent: (a, b) => String(b.lastOrderAt || b.createdAt).localeCompare(String(a.lastOrderAt || a.createdAt)),
  spent: (a, b) => (b.totalSpent || 0) - (a.totalSpent || 0),
  orders: (a, b) => (b.orderCount || 0) - (a.orderCount || 0),
  name: (a, b) => String(a.name).localeCompare(String(b.name)),
};

export default async function CustomersPage({ searchParams }) {
  await requirePageUser("crm");
  const { q = "", sort = "recent", tag } = await searchParams;
  const customers = await listDocs("customers");

  const needle = q.trim().toLowerCase();
  const tags = [...new Set(customers.flatMap((c) => c.tags || []))].sort();
  const shown = customers
    .filter((c) => (!tag || (c.tags || []).includes(tag)) && (!needle || [c.name, c.email, c.phone].some((v) => String(v || "").toLowerCase().includes(needle))))
    .sort(SORTS[sort] || SORTS.recent);

  const total = customers.reduce((s, c) => s + (c.totalSpent || 0), 0);
  const repeat = customers.filter((c) => (c.orderCount || 0) > 1).length;
  const link = (patch) => {
    const p = new URLSearchParams({ ...(q && { q }), sort, ...(tag && { tag }), ...patch });
    Object.entries(patch).forEach(([k, v]) => v === null && p.delete(k));
    return `/admin/customers?${p}`;
  };

  return (
    <div className="adm-stack">
      <div className="adm-kpis">
        <div className="adm-card adm-kpi">
          <small>
            <i className="fas fa-users" /> Customers
          </small>
          <strong>{customers.length}</strong>
        </div>
        <div className="adm-card adm-kpi">
          <small>
            <i className="fas fa-redo" /> Repeat
          </small>
          <strong>{repeat}</strong>
          <span>ordered more than once</span>
        </div>
        <div className="adm-card adm-kpi">
          <small>
            <i className="fas fa-coins" /> Lifetime sales
          </small>
          <strong>{money(total)}</strong>
        </div>
        <div className="adm-card adm-kpi">
          <small>
            <i className="fas fa-receipt" /> Avg. per customer
          </small>
          <strong>{money(customers.length ? total / customers.length : 0)}</strong>
        </div>
      </div>

      <div className="adm-row" style={{ justifyContent: "space-between" }}>
        <nav className="adm-tabs" aria-label="Sort customers">
          {[
            ["recent", "Recent"],
            ["spent", "Top spenders"],
            ["orders", "Most orders"],
            ["name", "A–Z"],
          ].map(([id, label]) => (
            <Link key={id} href={link({ sort: id })} className={sort === id ? "on" : ""}>
              {label}
            </Link>
          ))}
          {tags.map((t) => (
            <Link key={t} href={link({ tag: tag === t ? null : t })} className={tag === t ? "on" : ""}>
              #{t}
            </Link>
          ))}
        </nav>
        <div className="adm-row">
          <SearchBox placeholder="Search name, email, phone" />
          <a href="/admin/export/customers" className="adm-btn adm-btn-ghost adm-btn-sm">
            <i className="fas fa-file-csv" /> Export
          </a>
          <NewCustomerButton />
        </div>
      </div>

      <section className="adm-card">
        {shown.length ? (
          <div className="adm-table-wrap">
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact</th>
                  <th className="adm-num">Orders</th>
                  <th className="adm-num">Spent</th>
                  <th>Last order</th>
                  <th>Tags</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <Link href={`/admin/customers/${encodeURIComponent(c.id)}`} className="adm-strong">
                        {c.name}
                      </Link>
                      {(c.orderCount || 0) > 1 && <div className="adm-muted">Regular</div>}
                    </td>
                    <td>
                      <div>{c.phone || "—"}</div>
                      <div className="adm-muted">{c.email}</div>
                    </td>
                    <td className="adm-num">{c.orderCount || 0}</td>
                    <td className="adm-num adm-strong">{money(c.totalSpent)}</td>
                    <td className="adm-muted">{date(c.lastOrderAt)}</td>
                    <td>
                      {(c.tags || []).map((t) => (
                        <span key={t} className="adm-tag">
                          {t}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="adm-empty">
            <i className="fas fa-users" />
            {customers.length ? "No customers match." : "Customers are created automatically from website orders — or add phone-order customers yourself."}
          </div>
        )}
      </section>
    </div>
  );
}
