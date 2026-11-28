"use client";
import { saveReviewsAction } from "@/app/admin/_actions/content";
import { Area, Card, ListEditor, SaveBar, Select, Text, Toggle, useAction, useDraft } from "@/components/admin/ui";

const SOURCES = [
  { value: "google", label: "Google" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "text", label: "Text / message" },
];

export default function ReviewsEditor({ reviews, liveFeed }) {
  const { run, pending, toast } = useAction();
  const { draft: d, set, dirty, markSaved, reset } = useDraft({
    ...reviews,
    rating: String(reviews.rating ?? ""),
    count: String(reviews.count ?? ""),
    reviews: (reviews.reviews || []).map((r) => ({ source: "google", hidden: false, ...r, rating: String(r.rating || 5) })),
  });

  const save = () => run(() => saveReviewsAction(d), "Reviews published", { onOk: markSaved });

  return (
    <div className="adm-stack">
      {toast}
      <div className="adm-notice">
        <i className="fas fa-shield-alt" />
        <span>
          Only add real reviews, in the customer&apos;s own words, and only with their OK to show their name. When fewer than four are showing,
          the website fills the row with your Google rating and a “write a review” card.
          {liveFeed && " The live Google feed is on, so Google reviews come straight from Google — the ones below from other places are still shown."}
        </span>
      </div>

      <Card title="Google rating" sub="Shown as the badge above the reviews">
        <div className="adm-form-grid">
          <Text label="Rating (out of 5)" value={d.rating} onChange={(v) => set("rating", v)} inputMode="decimal" />
          <Text label="Number of Google reviews" value={d.count} onChange={(v) => set("count", v)} inputMode="numeric" />
          <Text label="Link to your Google reviews" value={d.mapsUrl} onChange={(v) => set("mapsUrl", v)} wide />
          <Text label="“Write a review” link" value={d.reviewUrl} onChange={(v) => set("reviewUrl", v)} wide />
        </div>
      </Card>

      <Card title="Reviews" sub="Shown in the “Loved across Chicago” carousel on the Home and About pages">
        <ListEditor
          items={d.reviews}
          onChange={(v) => set("reviews", v)}
          addLabel="Add review"
          max={40}
          make={() => ({ author: "", rating: "5", source: "google", when: "", text: "", hidden: false })}
          render={(r, upd) => (
            <div className="adm-form-grid">
              <Text label="Customer name" value={r.author} onChange={(v) => upd({ ...r, author: v })} />
              <Select label="Where it was posted" value={r.source} onChange={(v) => upd({ ...r, source: v })} options={SOURCES} />
              <Select label="Stars" value={String(r.rating)} onChange={(v) => upd({ ...r, rating: v })} options={[5, 4, 3, 2, 1].map((n) => ({ value: String(n), label: "★".repeat(n) }))} />
              <Text label="Small line under the name" value={r.when} onChange={(v) => upd({ ...r, when: v })} placeholder="e.g. Local Guide on Google" />
              <Area label="Review" value={r.text} onChange={(v) => upd({ ...r, text: v })} rows={3} wide />
              <div className="adm-wide">
                <Toggle checked={!r.hidden} onChange={(v) => upd({ ...r, hidden: !v })} label={r.hidden ? "Hidden from the website" : "Showing on the website"} />
              </div>
            </div>
          )}
        />
      </Card>

      <SaveBar dirty={dirty} pending={pending} onSave={save} onReset={reset} />
    </div>
  );
}
