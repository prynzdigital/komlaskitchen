"use client";
import { saveScheduleAction } from "@/app/admin/_actions/content";
import { Area, Card, Field, ListEditor, SaveBar, Text, useAction, useDraft } from "@/components/admin/ui";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ScheduleEditor({ schedule }) {
  const { run, pending, toast } = useAction();
  const { draft, set, dirty, markSaved, reset } = useDraft({
    blocks: (schedule.blocks || []).map((b) => ({ ...b, dishes: (b.dishes || []).join("\n") })),
  });
  const taken = (day, self) => draft.blocks.some((b) => b !== self && b.days.includes(day));

  const save = () =>
    run(() => saveScheduleAction({ blocks: draft.blocks.map((b) => ({ ...b, dishes: b.dishes.split("\n") })) }), "Schedule published", { onOk: markSaved });

  return (
    <div className="adm-stack">
      {toast}
      <div className="adm-notice">
        <i className="fas fa-calendar-alt" />
        <span>
          This is the “What&apos;s cooking this week” box on the Home, Menu and Contact pages. Today&apos;s group is highlighted automatically for
          visitors (Chicago time).
        </span>
      </div>

      <Card title="Day groups" sub="e.g. Major Days and Minor Days — each day should belong to one group">
        <ListEditor
          items={draft.blocks}
          onChange={(v) => set("blocks", v)}
          addLabel="Add day group"
          max={4}
          make={() => ({ title: "", days: [], dishes: "", delivery: [{ label: "Delivery window", time: "" }] })}
          render={(b, upd) => (
            <div className="adm-stack" style={{ gap: 14 }}>
              <Text label="Group name" value={b.title} onChange={(v) => upd({ ...b, title: v })} placeholder="Major Days" />
              <Field label="Days">
                <div className="adm-tabs">
                  {DAYS.map((day) => {
                    const on = b.days.includes(day);
                    const clash = !on && taken(day, b);
                    return (
                      <button
                        key={day}
                        type="button"
                        className={on ? "on" : ""}
                        title={clash ? "Already in another group" : day}
                        style={clash ? { opacity: 0.45 } : undefined}
                        onClick={() => upd({ ...b, days: on ? b.days.filter((x) => x !== day) : [...b.days, day] })}
                      >
                        {day.slice(0, 3)}
                      </button>
                    );
                  })}
                </div>
              </Field>
              <Area label="Dishes cooked on these days" hint="One per line" value={b.dishes} onChange={(v) => upd({ ...b, dishes: v })} rows={5} />
              <Field label="Delivery times">
                <ListEditor
                  items={b.delivery}
                  onChange={(v) => upd({ ...b, delivery: v })}
                  addLabel="Add delivery time"
                  max={4}
                  make={() => ({ label: "", time: "" })}
                  render={(t, updT) => (
                    <div className="adm-form-grid">
                      <Text label="Label" value={t.label} onChange={(v) => updT({ ...t, label: v })} placeholder="Early delivery" />
                      <Text label="Time" value={t.time} onChange={(v) => updT({ ...t, time: v })} placeholder="1:00 PM" />
                    </div>
                  )}
                />
              </Field>
            </div>
          )}
        />
      </Card>

      <SaveBar dirty={dirty} pending={pending} onSave={save} onReset={reset} />
    </div>
  );
}
