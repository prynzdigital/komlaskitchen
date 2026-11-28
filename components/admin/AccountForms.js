"use client";
import { useState } from "react";
import { changePasswordAction, signOutEverywhereAction, updateProfileAction } from "@/app/admin/_actions/auth";
import { Card, Text, useAction } from "@/components/admin/ui";

export default function AccountForms({ user }) {
  const { run, pending, toast } = useAction();
  const [name, setName] = useState(user.name);
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });

  const change = () => {
    if (pw.next !== pw.confirm) return run(async () => ({ error: "The new passwords don't match." }));
    return run(() => changePasswordAction({ current: pw.current, next: pw.next }), "Password changed — other devices were signed out", {
      onOk: () => setPw({ current: "", next: "", confirm: "" }),
    });
  };

  return (
    <div className="adm-grid-2" style={{ alignItems: "start" }}>
      {toast}
      <Card title="Profile">
        <div className="adm-stack" style={{ gap: 14 }}>
          <Text label="Your name" value={name} onChange={setName} />
          <Text label="Email (used to sign in)" value={user.email} onChange={() => {}} disabled />
          <button type="button" className="adm-btn adm-btn-primary" disabled={pending || !name.trim() || name === user.name} onClick={() => run(() => updateProfileAction({ name }), "Name updated")}>
            Save name
          </button>
        </div>
      </Card>

      <Card title="Change password">
        <div className="adm-stack" style={{ gap: 14 }}>
          <Text label="Current password" type="password" autoComplete="current-password" value={pw.current} onChange={(v) => setPw({ ...pw, current: v })} />
          <Text label="New password" hint="At least 10 characters" type="password" autoComplete="new-password" value={pw.next} onChange={(v) => setPw({ ...pw, next: v })} />
          <Text label="Confirm new password" type="password" autoComplete="new-password" value={pw.confirm} onChange={(v) => setPw({ ...pw, confirm: v })} />
          <button type="button" className="adm-btn adm-btn-primary" disabled={pending || !pw.current || !pw.next} onClick={change}>
            Change password
          </button>
        </div>
      </Card>

      <Card title="Security">
        <div className="adm-stack" style={{ gap: 12 }}>
          <p>Lost a phone or signed in on a shared computer? Sign out of the admin on every device at once.</p>
          <form action={signOutEverywhereAction}>
            <button type="submit" className="adm-btn adm-btn-danger">
              <i className="fas fa-sign-out-alt" /> Sign out everywhere
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
}
