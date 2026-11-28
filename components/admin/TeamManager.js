"use client";
import { useState } from "react";
import { createUserAction, resetUserPasswordAction, updateUserAction } from "@/app/admin/_actions/team";
import { Card, initials, Pill, Select, Text, useAction, when } from "@/components/admin/ui";

const ROLE_OPTIONS = [
  { value: "staff", label: "Staff — orders, customers, messages, sold-out switches" },
  { value: "manager", label: "Manager — everything except team logins & alert emails" },
  { value: "owner", label: "Owner — full access" },
];
const ROLE_LABEL = { owner: "Owner", manager: "Manager", staff: "Staff" };

// A readable temporary password (no look-alike characters).
const tempPassword = () => {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  const buf = crypto.getRandomValues(new Uint32Array(12));
  return Array.from(buf, (n) => chars[n % chars.length]).join("");
};

export default function TeamManager({ users, meId }) {
  const { run, pending, toast } = useAction();
  const [form, setForm] = useState({ name: "", email: "", role: "staff", password: tempPassword() });
  const [shared, setShared] = useState(null);

  const add = () =>
    run(() => createUserAction(form), `${form.name} can now sign in`, {
      onOk: () => {
        setShared({ email: form.email, password: form.password });
        setForm({ name: "", email: "", role: "staff", password: tempPassword() });
      },
    });

  const resetPw = (u) => {
    const pw = tempPassword();
    run(() => resetUserPasswordAction(u.id, pw), `New password set for ${u.name}`, { onOk: () => setShared({ email: u.email, password: pw }) });
  };

  return (
    <div className="adm-stack">
      {toast}
      {shared && (
        <div className="adm-notice green">
          <i className="fas fa-key" />
          <span>
            Share these sign-in details privately (in person or by text), then ask them to change the password under <b>Your account</b>:
            <br />
            <b>
              {shared.email} · {shared.password}
            </b>
            <br />
            <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" style={{ marginTop: 8 }} onClick={() => setShared(null)}>
              Done — hide it
            </button>
          </span>
        </div>
      )}

      <div className="adm-split">
        <section className="adm-card">
          <div className="adm-card-head">
            <div>
              <h2>Logins</h2>
              <p>Each person signs in with their own email</p>
            </div>
          </div>
          {users.map((u) => (
            <div key={u.id} className="adm-dish" style={{ gridTemplateColumns: "44px minmax(0,1fr) auto auto", opacity: u.active ? 1 : 0.6 }}>
              <span className="adm-avatar" style={{ width: 40, height: 40 }}>
                {initials(u.name)}
              </span>
              <div style={{ minWidth: 0 }}>
                <b>
                  {u.name} {u.id === meId && <span className="adm-muted">(you)</span>}
                </b>
                <small>
                  {u.email} · last sign-in {u.lastLoginAt ? when(u.lastLoginAt) : "never"}
                </small>
              </div>
              <div className="adm-row">
                <Pill tone={u.role === "owner" ? "gold" : u.role === "manager" ? "green" : "muted"}>{ROLE_LABEL[u.role]}</Pill>
                {!u.active && <Pill tone="red">Deactivated</Pill>}
              </div>
              <div className="adm-row" style={{ justifyContent: "flex-end" }}>
                <select
                  className="adm-input"
                  style={{ width: "auto", minHeight: 32, padding: "4px 8px", fontSize: "0.8rem" }}
                  value={u.role}
                  disabled={pending}
                  aria-label={`Role for ${u.name}`}
                  onChange={(e) => run(() => updateUserAction(u.id, { role: e.target.value }), "Role updated")}
                >
                  <option value="staff">Staff</option>
                  <option value="manager">Manager</option>
                  <option value="owner">Owner</option>
                </select>
                <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" disabled={pending} onClick={() => resetPw(u)}>
                  Reset password
                </button>
                {u.id !== meId && (
                  <button
                    type="button"
                    className={`adm-btn adm-btn-sm ${u.active ? "adm-btn-danger" : "adm-btn-ghost"}`}
                    disabled={pending}
                    onClick={() => run(() => updateUserAction(u.id, { active: !u.active }), u.active ? `${u.name} can no longer sign in` : `${u.name} re-activated`)}
                  >
                    {u.active ? "Deactivate" : "Re-activate"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </section>

        <Card title="Add a team member" sub="They'll be signed out of any old sessions if you change their access later">
          <div className="adm-stack" style={{ gap: 14 }}>
            <Text label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
            <Text label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <Select label="Access" value={form.role} onChange={(v) => setForm({ ...form, role: v })} options={ROLE_OPTIONS} />
            <Text
              label="Temporary password"
              value={form.password}
              onChange={(v) => setForm({ ...form, password: v })}
              hint="Generated for you — you'll see it again after adding so you can share it."
            />
            <button type="button" className="adm-btn adm-btn-primary" disabled={pending || !form.name || !form.email} onClick={add}>
              <i className="fas fa-user-plus" /> Add team member
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
