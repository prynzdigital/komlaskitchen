"use client";
import Link from "next/link";
import { useState } from "react";
import { reorderMenuAction, saveCategoriesAction, toggleMenuItemAction } from "@/app/admin/_actions/content";
import { Card, ListEditor, Text, Toggle, useAction } from "@/components/admin/ui";

export const priceSummary = (item) => {
  if (item.callOnly) return "Call to order";
  if (item.sizes?.length) {
    const prices = item.sizes.map((s) => s.price);
    const lo = Math.min(...prices);
    const hi = Math.max(...prices);
    return lo === hi ? `$${lo.toFixed(2)}` : `$${lo.toFixed(2)} – $${hi.toFixed(2)}`;
  }
  return item.price || "—";
};

export default function MenuManager({ menu, canEdit }) {
  const { run, pending, toast } = useAction();
  const [cats, setCats] = useState(menu.categories);
  const [editCats, setEditCats] = useState(false);
  const [q, setQ] = useState("");

  const needle = q.trim().toLowerCase();
  const soldOut = menu.items.filter((m) => m.available === false).length;

  const move = (category, index, dir) => {
    const inCat = menu.items.filter((m) => m.category === category);
    const j = index + dir;
    if (j < 0 || j >= inCat.length) return;
    [inCat[index], inCat[j]] = [inCat[j], inCat[index]];
    const order = menu.categories.flatMap((c) => (c.id === category ? inCat : menu.items.filter((m) => m.category === c.id))).map((m) => m.id);
    run(() => reorderMenuAction(order), "Order updated");
  };

  return (
    <div className="adm-stack">
      {toast}
      <div className="adm-row" style={{ justifyContent: "space-between" }}>
        <div>
          <p>
            {menu.items.length} dishes in {menu.categories.length} categories
            {soldOut ? ` · ${soldOut} sold out today` : ""}. Changes go live on the website straight away.
          </p>
        </div>
        <div className="adm-row">
          <div className="adm-search">
            <i className="fas fa-search" aria-hidden="true" />
            <input type="search" placeholder="Find a dish" aria-label="Find a dish" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          {canEdit && (
            <>
              <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => setEditCats((v) => !v)}>
                <i className="fas fa-folder-open" /> Categories
              </button>
              <Link href="/admin/menu/new" className="adm-btn adm-btn-primary adm-btn-sm">
                <i className="fas fa-plus" /> Add dish
              </Link>
            </>
          )}
        </div>
      </div>

      {!canEdit && (
        <div className="adm-notice">
          <i className="fas fa-info-circle" />
          <span>You can mark dishes as sold out for today. Ask a manager to change prices or descriptions.</span>
        </div>
      )}

      {editCats && (
        <Card
          title="Menu categories"
          sub="The filter tabs on the Menu page. Move a dish out of a category before removing it."
          actions={
            <button type="button" className="adm-btn adm-btn-gold adm-btn-sm" disabled={pending} onClick={() => run(() => saveCategoriesAction(cats), "Categories saved")}>
              Save categories
            </button>
          }
        >
          <ListEditor
            items={cats}
            onChange={setCats}
            addLabel="Add category"
            make={() => ({ id: "", label: "" })}
            render={(c, set) => <Text label="Name" value={c.label} onChange={(v) => set({ ...c, label: v })} placeholder="e.g. Soups & Stews" />}
          />
        </Card>
      )}

      {menu.categories.map((cat) => {
        const items = menu.items.filter((m) => m.category === cat.id);
        const shown = items.filter((m) => !needle || m.name.toLowerCase().includes(needle));
        if (needle && !shown.length) return null;
        return (
          <section key={cat.id} className="adm-card">
            <div className="adm-card-head">
              <div>
                <h2>{cat.label}</h2>
                <p>
                  {items.length} dish{items.length === 1 ? "" : "es"}
                </p>
              </div>
            </div>
            {shown.length ? (
              shown.map((item) => {
                const idx = items.indexOf(item);
                const on = item.available !== false && !item.hidden;
                return (
                  <div key={item.id} className={`adm-dish${on ? "" : " off"}`}>
                    <div className="adm-thumb">{item.image ? <img src={item.image} alt="" /> : <i className="fas fa-utensils" />}</div>
                    <div style={{ minWidth: 0 }}>
                      <b>
                        {item.name}
                        {item.popular && <span className="adm-tag" style={{ marginLeft: 8 }}>Popular</span>}
                        {item.hidden && <span className="adm-tag" style={{ marginLeft: 8, color: "var(--ink-3)", background: "#f0eee8" }}>Hidden</span>}
                      </b>
                      <small>
                        {priceSummary(item)}
                        {item.sizes?.length > 1 ? ` · ${item.sizes.length} sizes` : ""}
                      </small>
                    </div>
                    <Toggle
                      checked={item.available !== false}
                      label={item.available !== false ? "Available" : "Sold out"}
                      disabled={pending}
                      onChange={() =>
                        run(() => toggleMenuItemAction(item.id, "available"), item.available !== false ? `${item.name} marked sold out` : `${item.name} is available again`)
                      }
                    />
                    <div className="adm-row" style={{ justifyContent: "flex-end" }}>
                      {canEdit && !needle && (
                        <>
                          <button type="button" className="adm-btn adm-btn-ghost adm-icon-btn" aria-label="Move up" disabled={pending || idx === 0} onClick={() => move(cat.id, idx, -1)}>
                            <i className="fas fa-arrow-up" />
                          </button>
                          <button type="button" className="adm-btn adm-btn-ghost adm-icon-btn" aria-label="Move down" disabled={pending || idx === items.length - 1} onClick={() => move(cat.id, idx, 1)}>
                            <i className="fas fa-arrow-down" />
                          </button>
                        </>
                      )}
                      {canEdit && (
                        <Link href={`/admin/menu/${item.id}`} className="adm-btn adm-btn-ghost adm-btn-sm">
                          <i className="fas fa-pen" /> Edit
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="adm-empty">No dishes in this category yet.</div>
            )}
          </section>
        );
      })}
    </div>
  );
}
