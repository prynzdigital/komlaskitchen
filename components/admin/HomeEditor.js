"use client";
import { saveHomeAction } from "@/app/admin/_actions/content";
import ImageField from "@/components/admin/ImageField";
import { Area, Card, ListEditor, SaveBar, Select, Text, useAction, useDraft } from "@/components/admin/ui";

export default function HomeEditor({ home, dishes }) {
  const { run, pending, toast } = useAction();
  const { draft: d, set, dirty, markSaved, reset } = useDraft({
    ...home,
    mostOrdered: (home.mostOrdered || []).map((m) => ({ ...m, id: String(m.id) })),
  });

  const save = () => run(() => saveHomeAction(d), "Homepage published", { onOk: markSaved });

  return (
    <div className="adm-stack">
      {toast}
      <Card title="Hero" sub="The big headline at the top of the homepage">
        <div className="adm-form-grid">
          <Text label="Small label above the headline" value={d.hero.pill} onChange={(v) => set("hero.pill", v)} wide />
          <Text label="Headline — first line" value={d.hero.line1} onChange={(v) => set("hero.line1", v)} placeholder="Taste of Ghana," />
          <Text label="Gold word" value={d.hero.highlight} onChange={(v) => set("hero.highlight", v)} placeholder="Delivered" />
          <Text label="Headline — after the gold word" value={d.hero.line2} onChange={(v) => set("hero.line2", v)} placeholder="Fresh." />
          <Area label="Intro text" value={d.hero.lead} onChange={(v) => set("hero.lead", v)} rows={3} wide />
        </div>
        <div className="adm-notice green" style={{ marginTop: 16 }}>
          <i className="fas fa-eye" />
          <span>
            Preview: <b>{d.hero.line1}</b> <b style={{ color: "var(--gold-2)" }}>{d.hero.highlight}</b> <b>{d.hero.line2}</b>
          </span>
        </div>
      </Card>

      <Card title="Hero slideshow" sub="Photos fade behind the headline every 6 seconds. Wide (landscape) photos fit best.">
        <ListEditor
          items={d.slides}
          onChange={(v) => set("slides", v)}
          addLabel="Add slide"
          max={8}
          make={() => ({ image: "", caption: "", alt: "" })}
          render={(s, upd) => (
            <div className="adm-grid-2">
              <ImageField label="Photo" value={s.image} onChange={(v) => upd({ ...s, image: v })} large />
              <div className="adm-stack" style={{ gap: 10 }}>
                <Text label="Caption" value={s.caption} onChange={(v) => upd({ ...s, caption: v })} placeholder="e.g. Grilled tilapia, fresh from the fire" />
                <Text label="Photo description" value={s.alt} onChange={(v) => upd({ ...s, alt: v })} />
              </div>
            </div>
          )}
        />
      </Card>

      <Card title="Special offer banner" sub="Shown on the homepage and the Contact page">
        <div className="adm-grid-2">
          <div className="adm-form-grid">
            <Text label="Small label" value={d.offer.kicker} onChange={(v) => set("offer.kicker", v)} placeholder="Special Offer" />
            <Text label="Button text" value={d.offer.button} onChange={(v) => set("offer.button", v)} placeholder="Order Now" />
            <Text label="Gold word" value={d.offer.highlight} onChange={(v) => set("offer.highlight", v)} placeholder="Free" />
            <Text label="Headline" value={d.offer.title} onChange={(v) => set("offer.title", v)} placeholder="Delivery" />
            <Text label="Subheading" value={d.offer.sub} onChange={(v) => set("offer.sub", v)} placeholder="On Orders Over $50" wide />
            <Text label="Small print" value={d.offer.note} onChange={(v) => set("offer.note", v)} wide />
          </div>
          <ImageField label="Banner photo" value={d.offer.image} onChange={(v) => set("offer.image", v)} large />
        </div>
      </Card>

      <Card title="“What are you craving?” circles" sub="The scrolling row of dish photos under the hero">
        <ListEditor
          items={d.cravings}
          onChange={(v) => set("cravings", v)}
          addLabel="Add circle"
          max={16}
          make={() => ({ label: "", image: "" })}
          render={(c, upd) => (
            <div className="adm-grid-2">
              <Text label="Label" value={c.label} onChange={(v) => upd({ ...c, label: v })} placeholder="e.g. Jollof Rice" />
              <ImageField label="Photo" value={c.image} onChange={(v) => upd({ ...c, image: v })} />
            </div>
          )}
        />
      </Card>

      <Card title="Most Ordered Dishes" sub="Up to 4 dishes with quick “add to cart” buttons. Sold-out dishes hide automatically.">
        <ListEditor
          items={d.mostOrdered}
          onChange={(v) => set("mostOrdered", v)}
          addLabel="Add dish"
          max={8}
          make={() => ({ id: dishes[0]?.value || "", badge: "", image: "" })}
          render={(m, upd) => (
            <div className="adm-grid-3">
              <Select label="Dish" value={m.id} onChange={(v) => upd({ ...m, id: v })} options={dishes} />
              <Text label="Badge" value={m.badge} onChange={(v) => upd({ ...m, badge: v })} placeholder="Best Seller" />
              <ImageField label="Photo (optional)" value={m.image} onChange={(v) => upd({ ...m, image: v })} hint="Uses the menu photo if empty" />
            </div>
          )}
        />
      </Card>

      <SaveBar dirty={dirty} pending={pending} onSave={save} onReset={reset} />
    </div>
  );
}
