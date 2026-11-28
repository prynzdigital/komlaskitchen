"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { logoutAction } from "@/app/admin/_actions/auth";
import { AdminProvider } from "@/components/admin/AdminContext";
import { initials } from "@/components/admin/ui";

const NAV = [
  { group: "Overview", items: [{ href: "/admin", label: "Dashboard", icon: "fas fa-chart-pie", area: "crm", exact: true }] },
  {
    group: "Customers & Orders",
    items: [
      { href: "/admin/orders", label: "Orders", icon: "fas fa-receipt", area: "crm", count: "orders" },
      { href: "/admin/customers", label: "Customers", icon: "fas fa-users", area: "crm" },
      { href: "/admin/messages", label: "Messages", icon: "fas fa-envelope-open-text", area: "crm", count: "messages" },
    ],
  },
  {
    group: "Website",
    items: [
      { href: "/admin/menu", label: "Menu", icon: "fas fa-utensils", area: "crm" },
      { href: "/admin/homepage", label: "Homepage", icon: "fas fa-home", area: "content" },
      { href: "/admin/schedule", label: "Weekly Schedule", icon: "fas fa-calendar-week", area: "content" },
      { href: "/admin/about", label: "About Page", icon: "fas fa-feather-alt", area: "content" },
      { href: "/admin/blog", label: "Blog", icon: "fas fa-book-open", area: "content" },
      { href: "/admin/reviews", label: "Reviews", icon: "fas fa-star", area: "content" },
    ],
  },
  {
    group: "Business",
    items: [
      { href: "/admin/settings", label: "Settings", icon: "fas fa-sliders-h", area: "settings" },
      { href: "/admin/team", label: "Team & Logins", icon: "fas fa-user-shield", area: "team" },
    ],
  },
];

const ROLE_LABEL = { owner: "Owner", manager: "Manager", staff: "Staff" };

export default function AdminShell({ user, perms, counts, library, children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  const isOn = (item) => (item.exact ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`));
  const current = NAV.flatMap((g) => g.items).find(isOn);
  const title = pathname.startsWith("/admin/account") ? "Your Account" : current?.label || "Dashboard";

  return (
    <AdminProvider value={{ user, perms, library }}>
      <div className={`adm-shell${open ? " open" : ""}`}>
        <aside className="adm-side" aria-label="Admin navigation">
          <Link href="/admin" className="adm-brand">
            <img src="/pictures/logo.png" alt="" />
            <span>
              <b>Komla&apos;s Kitchen</b>
              <small>Admin</small>
            </span>
          </Link>

          <nav className="adm-nav">
            {NAV.map((g) => {
              const items = g.items.filter((i) => perms[i.area]);
              if (!items.length) return null;
              return (
                <div key={g.group}>
                  <div className="adm-nav-label">{g.group}</div>
                  {items.map((i) => (
                    <Link key={i.href} href={i.href} className={isOn(i) ? "on" : ""}>
                      <i className={i.icon} aria-hidden="true" />
                      {i.label}
                      {i.count && counts[i.count] > 0 && <span className="adm-count">{counts[i.count]}</span>}
                    </Link>
                  ))}
                </div>
              );
            })}
          </nav>

          <div className="adm-side-foot">
            <Link href="/admin/account" className="adm-me">
              <span className="adm-avatar">{initials(user.name)}</span>
              <span>
                <b>{user.name}</b>
                <small>{ROLE_LABEL[user.role]}</small>
              </span>
            </Link>
            <div className="adm-side-links">
              <a href="/" target="_blank" rel="noopener noreferrer">
                <i className="fas fa-external-link-alt" /> Website
              </a>
              <form action={logoutAction} style={{ flex: 1, display: "flex" }}>
                <button type="submit">
                  <i className="fas fa-sign-out-alt" /> Sign out
                </button>
              </form>
            </div>
          </div>
        </aside>

        <div className="adm-main">
          <header className="adm-top">
            <button type="button" className="adm-btn adm-btn-ghost adm-icon-btn adm-burger" aria-label="Open menu" onClick={() => setOpen(true)}>
              <i className="fas fa-bars" />
            </button>
            <div className="adm-top-title">
              <h1>{title}</h1>
            </div>
            <div className="adm-top-actions">
              {counts.orders > 0 && (
                <Link href="/admin/orders?status=new" className="adm-btn adm-btn-ghost adm-btn-sm">
                  <i className="fas fa-bell" style={{ color: "var(--red)" }} /> {counts.orders} new order{counts.orders === 1 ? "" : "s"}
                </Link>
              )}
            </div>
          </header>
          <main className="adm-content">{children}</main>
        </div>
        {open && <button type="button" aria-label="Close menu" onClick={() => setOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 55, background: "transparent", border: 0 }} />}
      </div>
    </AdminProvider>
  );
}
