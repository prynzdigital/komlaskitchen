"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { deleteMenuItemAction, saveMenuItemAction } from "@/app/admin/_actions/content";
import ImageField from "@/components/admin/ImageField";
import { Area, Card, ConfirmButton, Field, ListEditor, SaveBar, Select, Text, Toggle, useAction, useDraft } from "@/components/admin/ui";

// Turns a stored menu item into the editor's flat form shape.
const toForm = (item, categories) => {
  const pricing = item?.callOnly ? "call" : item?.sizes?.length ? "sizes" : "flat";
  const proteinMode = item?.proteinAddOns?.length ? "addons" : item?.proteinOptions?.length ? "choice" : item?.includedProteins?.length ? "included" : "none";
  return {
    id: item?.id || null,
    name: item?.name || "",
    category: item?.category || categories[0]?.id || "",
    description: item?.description || "",
    image: item?.image || "",
    alt: item?.alt || "",
    badge: item?.badge || "",
    popular: Boolean(item?.popular),
    available: item ? item.available !== false : true,
    hidden: Boolean(item?.hidden),
    pricing,
    sizes: item?.sizes?.length ? item.sizes.map((s) => ({ label: s.label, price: String(s.price) })) : [{ label: "Regular", price: "" }],
    flatPrice: item?.price ? String(item.price).replace(/[^0-9.]/g, "") : "",
    baseOptions: (item?.baseOptions || []).join("\n"),
    proteinMode,
    proteinOptions: (item?.proteinOptions || []).join("\n"),
    includedProteins: (item?.includedProteins || []).join("\n"),
    proteinAddOns: (item?.proteinAddOns || []).map((p) => ({ name: p.name, prices: Object.fromEntries(Object.entries(p.prices || {}).map(([k, v]) => [k, String(v)])) })),
  };
};

// …and back into what the save action expects.
const toPayload = (f) => ({
  id: f.id,
  name: f.name,
  category: f.category,
  description: f.description,
  image: f.image,
  alt: f.alt,
  badge: f.badge,
  popular: f.popular,
  available: f.available,
  hidden: f.hidden,
  callOnly: f.pricing === "call",
  sizes: f.pricing === "sizes" ? f.sizes : [],
  flatPrice: f.pricing === "flat" ? f.flatPrice : undefined,
  baseOptions: f.baseOptions,
  proteinMode: f.proteinMode,
  proteinOptions: f.proteinOptions,
  includedProteins: f.includedProteins,
  proteinAddOns: f.proteinAddOns,
});

export default function MenuItemEditor({ item, categories }) {
  const router = useRouter();
  const { run, pending, toast } = useAction();
  const { draft: f, set, dirty, markSaved, reset } = useDraft(toForm(item, categories));
  const sizeLabels = f.sizes.map((s) => s.label).filter(Boolean);

  const save = () =>
    run(() => saveMenuItemAction(toPayload(f)), item ? "Dish saved — live on the menu" : "Dish added to the menu", {
      onOk: (res) => {
        markSaved();
        if (!item && res?.id) router.replace(`/admin/menu/${res.id}`);
      },
    });

  return (
    <div className="adm-stack">
      {toast}
      <div className="adm-row" style={{ justifyContent: "space-between" }}>
        <Link href="/admin/menu" className="adm-muted">
          ← Back to menu
        </Link>
        {item && (
          <ConfirmButton
            confirm={`Remove “${item.name}” from the menu? Tip: use “Sold out” or “Hidden” if it's only temporary.`}
            onConfirm={() => run(() => deleteMenuItemAction(item.id), "Dish deleted", { refresh: false, onOk: () => router.push("/admin/menu") })}
          >
            <i className="fas fa-trash-alt" /> Delete dish
          </ConfirmButton>
        )}
      </div>

      <div className="adm-split">
        <div className="adm-stack">
          <Card title="Dish details">
            <div className="adm-form-grid">
              <Text label="Name" value={f.name} onChange={(v) => set("name", v)} placeholder="e.g. Jollof Rice with Chicken" />
              <Select label="Category" value={f.category} onChange={(v) => set("category", v)} options={categories.map((c) => ({ value: c.id, label: c.label }))} />
              <Area label="Description" value={f.description} onChange={(v) => set("description", v)} rows={3} wide />
              <Text label="Badge (optional)" hint="Small label on the card, e.g. “Wednesday Special”" value={f.badge} onChange={(v) => set("badge", v)} />
              <Text label="Photo description" hint="Read aloud by screen readers" value={f.alt} onChange={(v) => set("alt", v)} />
            </div>
          </Card>

          <Card title="Price">
            <div className="adm-stack" style={{ gap: 14 }}>
              <div className="adm-tabs">
                {[
                  ["sizes", "Sizes"],
                  ["flat", "Single price"],
                  ["call", "Call to order"],
                ].map(([id, label]) => (
                  <button key={id} type="button" className={f.pricing === id ? "on" : ""} onClick={() => set("pricing", id)}>
                    {label}
                  </button>
                ))}
              </div>

              {f.pricing === "sizes" && (
                <ListEditor
                  items={f.sizes}
                  onChange={(v) => set("sizes", v)}
                  addLabel="Add size"
                  max={8}
                  make={() => ({ label: "", price: "" })}
                  render={(s, upd) => (
                    <div className="adm-form-grid">
                      <Text label="Size name" value={s.label} onChange={(v) => upd({ ...s, label: v })} placeholder="e.g. Small (2 drumsticks)" />
                      <Text label="Price ($)" value={s.price} onChange={(v) => upd({ ...s, price: v })} inputMode="decimal" placeholder="25.00" />
                    </div>
                  )}
                />
              )}
              {f.pricing === "flat" && <Text label="Price ($)" value={f.flatPrice} onChange={(v) => set("flatPrice", v)} inputMode="decimal" placeholder="3.99" />}
              {f.pricing === "call" && <p className="adm-muted">Shows a “Call to Order” button instead of “Add to Cart”.</p>}
            </div>
          </Card>

          {f.pricing !== "call" && (
            <Card title="Choices" sub="Optional — what customers pick when adding this dish">
              <div className="adm-stack" style={{ gap: 16 }}>
                <Area
                  label="Base options"
                  hint="One per line, e.g. Jollof Rice / Fried Rice. Leave empty if there's no choice."
                  value={f.baseOptions}
                  onChange={(v) => set("baseOptions", v)}
                  rows={2}
                />
                <Select
                  label="Protein"
                  value={f.proteinMode}
                  onChange={(v) => set("proteinMode", v)}
                  options={[
                    { value: "none", label: "No protein choice" },
                    { value: "choice", label: "Pick one (no extra charge)" },
                    { value: "addons", label: "Add-on with extra price per size" },
                    { value: "included", label: "Included — customer can remove any" },
                  ]}
                />
                {f.proteinMode === "choice" && (
                  <Area label="Protein options" hint="One per line" value={f.proteinOptions} onChange={(v) => set("proteinOptions", v)} rows={3} />
                )}
                {f.proteinMode === "included" && (
                  <Area label="Included proteins" hint="One per line — the price stays the same if removed" value={f.includedProteins} onChange={(v) => set("includedProteins", v)} rows={3} />
                )}
                {f.proteinMode === "addons" &&
                  (f.pricing !== "sizes" ? (
                    <p className="adm-muted">Add-on prices need sizes — switch the price to “Sizes”.</p>
                  ) : (
                    <ListEditor
                      items={f.proteinAddOns}
                      onChange={(v) => set("proteinAddOns", v)}
                      addLabel="Add protein"
                      max={8}
                      make={() => ({ name: "", prices: {} })}
                      render={(p, upd) => (
                        <div className="adm-stack" style={{ gap: 10 }}>
                          <Text label="Protein" value={p.name} onChange={(v) => upd({ ...p, name: v })} placeholder="e.g. Chicken" />
                          <div className="adm-form-grid">
                            {sizeLabels.map((label) => (
                              <Text
                                key={label}
                                label={`Extra for ${label} ($)`}
                                inputMode="decimal"
                                value={p.prices?.[label] ?? ""}
                                onChange={(v) => upd({ ...p, prices: { ...p.prices, [label]: v } })}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    />
                  ))}
              </div>
            </Card>
          )}
        </div>

        <div className="adm-stack">
          <Card title="Photo">
            <ImageField label="" value={f.image} onChange={(v) => set("image", v)} large hint="Square or landscape photos look best." />
          </Card>
          <Card title="Visibility">
            <div className="adm-stack" style={{ gap: 14 }}>
              <Toggle checked={f.available} onChange={(v) => set("available", v)} label={f.available ? "Available to order" : "Sold out today"} />
              <Toggle checked={f.popular} onChange={(v) => set("popular", v)} label="Show “Popular” tag" />
              <Toggle checked={f.hidden} onChange={(v) => set("hidden", v)} label="Hide from the website" />
              <Field hint="Sold out keeps the dish visible with a “Sold out today” label. Hidden removes it from the website completely." />
            </div>
          </Card>
          <Card title="Preview">
            <div className="adm-dish" style={{ padding: 0, border: 0, gridTemplateColumns: "52px 1fr" }}>
              <div className="adm-thumb">{f.image ? <img src={f.image} alt="" /> : <i className="fas fa-utensils" />}</div>
              <div>
                <b>{f.name || "Dish name"}</b>
                <small>
                  {f.pricing === "call"
                    ? "Call to order"
                    : f.pricing === "flat"
                      ? `$${Number(f.flatPrice || 0).toFixed(2)}`
                      : f.sizes.map((s) => `${s.label || "?"} $${Number(s.price || 0).toFixed(2)}`).join(" · ")}
                </small>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <SaveBar dirty={dirty || !item} pending={pending} onSave={save} onReset={item ? reset : undefined} />
    </div>
  );
}
