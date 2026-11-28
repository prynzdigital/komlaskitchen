import Link from "next/link";
import { can, requirePageUser } from "@/lib/auth";
import { listDocs } from "@/lib/store";
import MessageActions from "@/components/admin/MessageActions";

export const metadata = { title: "Messages" };

const when = (iso) =>
  new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/Chicago" });

const TABS = [
  ["inbox", "Inbox"],
  ["new", "Unread"],
  ["replied", "Replied"],
  ["archived", "Archived"],
];

export default async function MessagesPage({ searchParams }) {
  const user = await requirePageUser("crm");
  const { view = "inbox" } = await searchParams;
  const messages = await listDocs("messages");
  const shown = messages.filter((m) => (view === "inbox" ? m.status !== "archived" : m.status === view));
  const count = (v) => messages.filter((m) => (v === "inbox" ? m.status !== "archived" : m.status === v)).length;

  return (
    <div className="adm-stack">
      <nav className="adm-tabs" aria-label="Filter messages">
        {TABS.map(([id, label]) => (
          <Link key={id} href={`/admin/messages?view=${id}`} className={view === id ? "on" : ""}>
            {label} <b>{count(id)}</b>
          </Link>
        ))}
      </nav>

      <section className="adm-card">
        {shown.length ? (
          shown.map((m) => (
            <article key={m.id} className={`adm-msg${m.status === "new" ? " new" : ""}`}>
              <div className="adm-msg-head">
                <b>{m.name}</b>
                <span className="adm-muted">
                  {m.email}
                  {m.phone ? ` · ${m.phone}` : ""} · {when(m.receivedAt || m.createdAt)}
                </span>
                {m.status === "new" && <span className="adm-pill red">Unread</span>}
                {m.status === "replied" && <span className="adm-pill green">Replied{m.handledBy ? ` · ${m.handledBy}` : ""}</span>}
                {m.customerId && (
                  <Link href={`/admin/customers/${encodeURIComponent(m.customerId)}`} className="adm-muted" style={{ marginLeft: "auto" }}>
                    Customer profile →
                  </Link>
                )}
              </div>
              <p>{m.message}</p>
              <MessageActions id={m.id} status={m.status} email={m.email} name={m.name} canDelete={can(user, "content")} />
            </article>
          ))
        ) : (
          <div className="adm-empty">
            <i className="fas fa-envelope-open" />
            {messages.length ? "Nothing here." : "Messages sent from the website's Contact page will appear here."}
          </div>
        )}
      </section>
    </div>
  );
}
