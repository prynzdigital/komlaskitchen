"use client";
import { useActionState } from "react";
import { loginAction, setupAction } from "@/app/admin/_actions/auth";

const Brand = ({ sub }) => (
  <div className="adm-brand">
    <img src="/pictures/logo.png" alt="" />
    <span>
      <b>Komla&apos;s Kitchen</b>
      <small>{sub}</small>
    </span>
  </div>
);

const Error = ({ state }) =>
  state?.error ? (
    <div className="adm-notice red" role="alert">
      <i className="fas fa-exclamation-circle" />
      <span>{state.error}</span>
    </div>
  ) : null;

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null);
  return (
    <div className="adm-auth">
      <div className="adm-auth-card">
        <Brand sub="Admin sign in" />
        <form action={action}>
          <Error state={state} />
          <div className="adm-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="username" required defaultValue={state?.email || ""} />
          </div>
          <div className="adm-field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" autoComplete="current-password" required />
          </div>
          <button className="adm-btn adm-btn-primary" type="submit" disabled={pending}>
            {pending ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="adm-auth-foot">
          Forgot your password? Ask the owner to reset it under Team &amp; Logins.
          <br />
          <a href="/">← Back to the website</a>
        </p>
      </div>
    </div>
  );
}

export function SetupForm({ needsCode }) {
  const [state, action, pending] = useActionState(setupAction, null);
  return (
    <div className="adm-auth">
      <div className="adm-auth-card">
        <Brand sub="Create the owner account" />
        <p style={{ textAlign: "center", fontSize: "0.9rem" }}>This is a one-time step. The owner can add staff logins afterwards.</p>
        <form action={action}>
          <Error state={state} />
          <div className="adm-field">
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" autoComplete="name" required />
          </div>
          <div className="adm-field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="username" required />
          </div>
          <div className="adm-field">
            <label htmlFor="password">Password (10+ characters)</label>
            <input id="password" name="password" type="password" autoComplete="new-password" minLength={10} required />
          </div>
          <div className="adm-field">
            <label htmlFor="confirm">Confirm password</label>
            <input id="confirm" name="confirm" type="password" autoComplete="new-password" minLength={10} required />
          </div>
          {needsCode && (
            <div className="adm-field">
              <label htmlFor="code">Setup code</label>
              <input id="code" name="code" type="password" autoComplete="off" required />
              <div className="adm-hint">The ADMIN_SETUP_CODE value from Vercel.</div>
            </div>
          )}
          <button className="adm-btn adm-btn-primary" type="submit" disabled={pending}>
            {pending ? "Creating…" : "Create owner account"}
          </button>
        </form>
      </div>
    </div>
  );
}
