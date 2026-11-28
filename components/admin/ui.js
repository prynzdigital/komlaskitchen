"use client";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";

export const money = (n) => `$${Number(n || 0).toFixed(2)}`;
export const when = (iso) =>
  iso
    ? new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: "America/Chicago" })
    : "—";
export const initials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase() || "?";

/* ── Run a server action with a toast and a refresh ── */
export function useAction() {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [toast, setToast] = useState(null);
  const timer = useRef();

  const show = useCallback((msg, err = false) => {
    clearTimeout(timer.current);
    setToast({ msg, err });
    timer.current = setTimeout(() => setToast(null), err ? 6000 : 2600);
  }, []);

  const run = useCallback(
    (fn, success = "Saved", { refresh = true, onOk } = {}) =>
      new Promise((resolve) => {
        startTransition(async () => {
          let res;
          try {
            res = await fn();
          } catch (e) {
            res = { error: e?.message || "Something went wrong." };
          }
          if (res?.error) show(res.error, true);
          else {
            if (success) show(success);
            onOk?.(res);
            if (refresh) router.refresh();
          }
          resolve(res);
        });
      }),
    [router, show]
  );

  const node = toast ? (
    <div className={`adm-toast${toast.err ? " err" : ""}`} role="status">
      <i className={toast.err ? "fas fa-exclamation-circle" : "fas fa-check-circle"} />
      {toast.msg}
    </div>
  ) : null;

  return { run, pending, toast: node, show };
}

/* ── Edit a copy of server data, track "unsaved changes" ── */
export function useDraft(initial) {
  const [draft, setDraft] = useState(initial);
  const [base, setBase] = useState(() => JSON.stringify(initial));
  const dirty = JSON.stringify(draft) !== base;
  const set = (path, value) =>
    setDraft((d) => {
      const next = structuredClone(d);
      const keys = path.split(".");
      let o = next;
      keys.slice(0, -1).forEach((k) => (o = o[k] ??= {}));
      o[keys.at(-1)] = value;
      return next;
    });
  const markSaved = () => setBase(JSON.stringify(draft));
  const reset = () => setDraft(JSON.parse(base));

  // Warn before leaving with unsaved edits.
  useEffect(() => {
    if (!dirty) return;
    const h = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", h);
    return () => window.removeEventListener("beforeunload", h);
  }, [dirty]);

  return { draft, setDraft, set, dirty, markSaved, reset };
}

/* ── Fields ── */
export const Field = ({ label, hint, wide, children }) => (
  <div className={`adm-field${wide ? " adm-wide" : ""}`}>
    {label && <label>{label}</label>}
    {children}
    {hint && <div className="adm-hint">{hint}</div>}
  </div>
);

export const Text = ({ label, hint, wide, value, onChange, ...rest }) => (
  <Field label={label} hint={hint} wide={wide}>
    <input value={value ?? ""} onChange={(e) => onChange(e.target.value)} {...rest} />
  </Field>
);

export const Area = ({ label, hint, wide, value, onChange, rows = 4, ...rest }) => (
  <Field label={label} hint={hint} wide={wide}>
    <textarea value={value ?? ""} rows={rows} onChange={(e) => onChange(e.target.value)} {...rest} />
  </Field>
);

export const Select = ({ label, hint, wide, value, onChange, options }) => (
  <Field label={label} hint={hint} wide={wide}>
    <select value={value ?? ""} onChange={(e) => onChange(e.target.value)}>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </Field>
);

export const Toggle = ({ checked, onChange, label, disabled }) => (
  <label className="adm-toggle">
    <input type="checkbox" checked={Boolean(checked)} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
    <span className="adm-switch" aria-hidden="true" />
    {label}
  </label>
);

export const Pill = ({ tone = "muted", children }) => <span className={`adm-pill ${tone}`}>{children}</span>;

export const Card = ({ title, sub, actions, pad = true, children, className = "" }) => (
  <section className={`adm-card ${className}`}>
    {(title || actions) && (
      <div className="adm-card-head">
        <div>
          {title && <h2>{title}</h2>}
          {sub && <p>{sub}</p>}
        </div>
        {actions && <div className="adm-row">{actions}</div>}
      </div>
    )}
    {pad ? <div className="adm-card-pad">{children}</div> : children}
  </section>
);

export const Empty = ({ icon = "fas fa-inbox", children }) => (
  <div className="adm-empty">
    <i className={icon} aria-hidden="true" />
    {children}
  </div>
);

/* ── Confirm before destructive actions ── */
export const ConfirmButton = ({ onConfirm, children, confirm = "Are you sure?", className = "adm-btn adm-btn-danger adm-btn-sm", disabled }) => (
  <button type="button" className={className} disabled={disabled} onClick={() => window.confirm(confirm) && onConfirm()}>
    {children}
  </button>
);

/* ── Repeatable rows with add / remove / reorder ── */
export function ListEditor({ items = [], onChange, render, make, addLabel = "Add", max = 20, empty }) {
  const move = (i, d) => {
    const next = [...items];
    const j = i + d;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const update = (i, value) => onChange(items.map((it, k) => (k === i ? value : it)));
  return (
    <div className="adm-list">
      {items.length === 0 && empty && <p className="adm-muted">{empty}</p>}
      {items.map((item, i) => (
        <div className="adm-list-row" key={i}>
          <div className="adm-list-body">{render(item, (v) => update(i, v), i)}</div>
          <div className="adm-list-tools">
            <button type="button" className="adm-btn adm-btn-ghost adm-icon-btn" aria-label="Move up" onClick={() => move(i, -1)} disabled={i === 0}>
              <i className="fas fa-arrow-up" />
            </button>
            <button type="button" className="adm-btn adm-btn-ghost adm-icon-btn" aria-label="Move down" onClick={() => move(i, 1)} disabled={i === items.length - 1}>
              <i className="fas fa-arrow-down" />
            </button>
            <button type="button" className="adm-btn adm-btn-danger adm-icon-btn" aria-label="Remove" onClick={() => onChange(items.filter((_, k) => k !== i))}>
              <i className="fas fa-trash-alt" />
            </button>
          </div>
        </div>
      ))}
      {items.length < max && (
        <div>
          <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={() => onChange([...items, make()])}>
            <i className="fas fa-plus" /> {addLabel}
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Sticky "Save changes" bar ── */
export const SaveBar = ({ dirty, pending, onSave, onReset, note }) => (
  <div className={`adm-savebar${dirty ? "" : " clean"}`}>
    <span>
      {dirty ? (
        <>
          <i className="fas fa-pen" /> You have unsaved changes
        </>
      ) : (
        note || "All changes saved — the website is up to date."
      )}
    </span>
    <div className="adm-row">
      {dirty && onReset && (
        <button type="button" className="adm-btn adm-btn-ghost adm-btn-sm" onClick={onReset} disabled={pending}>
          Undo
        </button>
      )}
      <button type="button" className="adm-btn adm-btn-gold" onClick={onSave} disabled={!dirty || pending}>
        {pending ? "Saving…" : "Save & publish"}
      </button>
    </div>
  </div>
);
