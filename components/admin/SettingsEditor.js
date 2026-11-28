"use client";
import { saveSettingsAction } from "@/app/admin/_actions/content";
import ImageField from "@/components/admin/ImageField";
import { Area, Card, SaveBar, Text, Toggle, useAction, useDraft } from "@/components/admin/ui";

export default function SettingsEditor({ settings, isOwner, envNotify, emailReady }) {
  const { run, pending, toast } = useAction();
  const { draft: d, set, dirty, markSaved, reset } = useDraft({ ...settings, ticker: (settings.ticker || []).join("\n") });

  const save = () => run(() => saveSettingsAction(d), "Settings saved — website updated", { onOk: markSaved });

  return (
    <div className="adm-stack">
      {toast}

      <Card title="Online ordering" sub="Pause checkout for holidays, sell-outs or busy days">
        <div className="adm-stack" style={{ gap: 14 }}>
          <Toggle
            checked={d.orderingOpen}
            onChange={(v) => set("orderingOpen", v)}
            label={d.orderingOpen ? "Open — customers can check out online" : "Paused — checkout shows your message instead"}
          />
          <Text label="Message while paused" value={d.closedMessage} onChange={(v) => set("closedMessage", v)} />
        </div>
      </Card>

      <div className="adm-grid-2">
        <Card title="Contact details" sub="Used in the header, footer, Contact page and Google listing data">
          <div className="adm-form-grid">
            <Text label="Business name" value={d.name} onChange={(v) => set("name", v)} wide />
            <Text label="Main phone" value={d.phonePrimary} onChange={(v) => set("phonePrimary", v)} type="tel" />
            <Text label="Second phone" value={d.phoneSecondary} onChange={(v) => set("phoneSecondary", v)} type="tel" />
            <Text label="Public email (optional)" value={d.email} onChange={(v) => set("email", v)} type="email" wide />
            <Text label="Street address" value={d.address} onChange={(v) => set("address", v)} />
            <Text label="ZIP code" value={d.postalCode} onChange={(v) => set("postalCode", v)} />
            <Text label="Opening hours" value={d.hours} onChange={(v) => set("hours", v)} wide placeholder="Mon–Sun, 11 AM – 9 PM" />
          </div>
        </Card>

        <Card title="Footer & social" sub="Leave a link empty to hide that icon">
          <div className="adm-form-grid">
            <Area label="Footer tagline" value={d.tagline} onChange={(v) => set("tagline", v)} rows={2} wide />
            <Text label="Instagram link" value={d.instagram} onChange={(v) => set("instagram", v)} wide />
            <Text label="TikTok link" value={d.tiktok} onChange={(v) => set("tiktok", v)} wide />
            <Text label="Facebook link" value={d.facebook} onChange={(v) => set("facebook", v)} wide />
          </div>
        </Card>
      </div>

      <Card title="Announcement bar" sub="The scrolling strip at the very top of every page — one message per line">
        <Area value={d.ticker} onChange={(v) => set("ticker", v)} rows={8} />
      </Card>

      <div className="adm-grid-2">
        <Card title="Zelle payment" sub="Shown on the checkout payment step">
          <div className="adm-stack" style={{ gap: 14 }}>
            <Text label="Name customers will see in Zelle" value={d.zelleName} onChange={(v) => set("zelleName", v)} />
            <ImageField label="Zelle QR code" value={d.zelleQr} onChange={(v) => set("zelleQr", v)} large hint="Download it from your bank's Zelle screen and upload it here." />
          </div>
        </Card>

        <Card title="Order & message alerts" sub="Who gets an email for each new order and contact message">
          {isOwner ? (
            <div className="adm-stack" style={{ gap: 12 }}>
              <Area
                label="Email addresses"
                hint="Separate several addresses with commas."
                value={d.notifyEmails}
                onChange={(v) => set("notifyEmails", v)}
                rows={2}
                placeholder="you@example.com, kitchen@example.com"
              />
              {!d.notifyEmails && envNotify && <p className="adm-hint">Empty — using the address set in Vercel (ORDER_NOTIFICATION_EMAIL).</p>}
              {!emailReady && (
                <div className="adm-notice red">
                  <i className="fas fa-exclamation-triangle" />
                  <span>Email sending isn&apos;t set up (RESEND_API_KEY). Orders are still saved here in the admin.</span>
                </div>
              )}
            </div>
          ) : (
            <p className="adm-muted">Only the owner can change where alerts are sent.</p>
          )}
        </Card>
      </div>

      <SaveBar dirty={dirty} pending={pending} onSave={save} onReset={reset} />
    </div>
  );
}
