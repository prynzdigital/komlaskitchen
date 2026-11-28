"use client";
import { saveAboutAction } from "@/app/admin/_actions/content";
import { Area, Card, SaveBar, Text, useAction, useDraft } from "@/components/admin/ui";

export default function AboutEditor({ about }) {
  const { run, pending, toast } = useAction();
  const { draft: d, set, dirty, markSaved, reset } = useDraft({ ...about, story: (about.story || []).join("\n\n") });

  const save = () =>
    run(() => saveAboutAction({ ...d, story: d.story.split(/\n\s*\n/) }), "About page published", { onOk: markSaved });

  return (
    <div className="adm-stack">
      {toast}
      <Card title="Our Story" sub="The main text on the About page">
        <div className="adm-stack" style={{ gap: 14 }}>
          <Area label="Story" hint="Leave a blank line between paragraphs." value={d.story} onChange={(v) => set("story", v)} rows={10} />
          <Text label="Quote on the photo" value={d.quote} onChange={(v) => set("quote", v)} placeholder="Every pot tells a story of home." />
        </div>
      </Card>
      <Card title="Our Mission" sub="The large quote in the green panel">
        <Area value={d.mission} onChange={(v) => set("mission", v)} rows={4} />
      </Card>
      <SaveBar dirty={dirty} pending={pending} onSave={save} onReset={reset} />
    </div>
  );
}
