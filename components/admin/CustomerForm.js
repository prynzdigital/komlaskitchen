"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteCustomerAction, saveCustomerAction } from "@/app/admin/_actions/crm";
import { Area, ConfirmButton, Text, useAction } from "@/components/admin/ui";

const blank = { name: "", email: "", phone: "", tags: "", notes: "", addresses: "" };

// Used both for "Add customer" (no id) and on the profile page (with id).
export default function CustomerForm({ id, initial, canDelete, onDone }) {
  const router = useRouter();
  const { run, pending, toast } = useAction();
  const [f, setF] = useState(() =>
    initial ? { ...blank, ...initial, tags: (initial.tags || []).join(", "), addresses: (initial.addresses || []).join("\n") } : blank
  );
  const set = (k) => (v) => setF((x) => ({ ...x, [k]: v }));

  const save = () =>
    run(() => saveCustomerAction(id || null, f), id ? "Customer saved" : "Customer added", {
      onOk: (res) => {
        if (!id && res?.id) router.push(`/admin/customers/${encodeURIComponent(res.id)}`);
        onDone?.();
      },
    });

  return (
    <div className="adm-stack" style={{ gap: 14 }}>
      {toast}
      <div className="adm-form-grid">
        <Text label="Name" value={f.name} onChange={set("name")} />
        <Text label="Phone" value={f.phone} onChange={set("phone")} type="tel" />
        <Text label="Email" value={f.email} onChange={set("email")} type="email" wide />
        <Text label="Tags" hint="Comma-separated, e.g. vip, catering, office" value={f.tags} onChange={set("tags")} wide />
        <Area label="Addresses" hint="One per line" rows={2} value={f.addresses} onChange={set("addresses")} wide />
        <Area label="Private notes" hint="Only your team sees these — allergies, preferences, birthdays…" rows={4} value={f.notes} onChange={set("notes")} wide />
      </div>
      <div className="adm-row" style={{ justifyContent: "space-between" }}>
        <button type="button" className="adm-btn adm-btn-primary" onClick={save} disabled={pending}>
          {pending ? "Saving…" : id ? "Save customer" : "Add customer"}
        </button>
        {id && canDelete && (
          <ConfirmButton
            confirm="Delete this customer record? Their past orders stay in Orders."
            onConfirm={() => run(() => deleteCustomerAction(id), "Customer deleted", { refresh: false, onOk: () => router.push("/admin/customers") })}
          >
            <i className="fas fa-trash-alt" /> Delete
          </ConfirmButton>
        )}
      </div>
    </div>
  );
}
