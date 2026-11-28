"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteOrderAction, updateOrderAction } from "@/app/admin/_actions/crm";
import { ConfirmButton, useAction } from "@/components/admin/ui";

// Quick next steps so the team rarely needs the dropdowns.
const NEXT = { new: "confirmed", confirmed: "preparing", preparing: "ready", ready: "completed" };

export default function OrderControls({ orderRef, status, payment, statuses, payments, canDelete }) {
  const router = useRouter();
  const { run, pending, toast } = useAction();
  const [s, setS] = useState(status);
  const [p, setP] = useState(payment);
  const [note, setNote] = useState("");
  const dirty = s !== status || p !== payment || note.trim();
  const next = NEXT[status];
  const label = (id) => statuses.find((x) => x.id === id)?.label;

  const save = (patch) =>
    run(() => updateOrderAction(orderRef, patch), "Order updated", { onOk: () => setNote("") });

  return (
    <section className="adm-card">
      {toast}
      <div className="adm-card-head">
        <h2>Update order</h2>
      </div>
      <div className="adm-card-pad adm-stack" style={{ gap: 14 }}>
        {next && (
          <button type="button" className="adm-btn adm-btn-primary" disabled={pending} onClick={() => save({ status: next })}>
            <i className="fas fa-arrow-right" /> Mark as {label(next)}
          </button>
        )}
        {payment === "reported" && (
          <button type="button" className="adm-btn adm-btn-gold" disabled={pending} onClick={() => save({ payment: "verified" })}>
            <i className="fas fa-check-double" /> Zelle payment received
          </button>
        )}

        <div className="adm-field">
          <label>Status</label>
          <select value={s} onChange={(e) => setS(e.target.value)}>
            {statuses.map((x) => (
              <option key={x.id} value={x.id}>
                {x.label}
              </option>
            ))}
          </select>
        </div>
        <div className="adm-field">
          <label>Payment</label>
          <select value={p} onChange={(e) => setP(e.target.value)}>
            {payments.map((x) => (
              <option key={x.id} value={x.id}>
                {x.label}
              </option>
            ))}
          </select>
        </div>
        <div className="adm-field">
          <label>Add a note</label>
          <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Customer asked for extra pepper. Driver left at 4:40." />
        </div>
        <button type="button" className="adm-btn adm-btn-ghost" disabled={!dirty || pending} onClick={() => save({ status: s, payment: p, note })}>
          {pending ? "Saving…" : "Save changes"}
        </button>
        {canDelete && (
          <ConfirmButton
            confirm={`Delete order ${orderRef}? This can't be undone. (To keep records, mark it Cancelled instead.)`}
            onConfirm={() => run(() => deleteOrderAction(orderRef), "Order deleted", { refresh: false, onOk: () => router.push("/admin/orders") })}
          >
            <i className="fas fa-trash-alt" /> Delete order
          </ConfirmButton>
        )}
      </div>
    </section>
  );
}
