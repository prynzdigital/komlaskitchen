"use client";
import { useEffect, useState } from "react";
import { INSTALL_EVENT } from "./PwaSetup";

const DISMISS_KEY = "kk-install-dismissed";
const DISMISS_DAYS = 14;

const isInstalled = () => window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;

const recentlyDismissed = () => {
  try {
    const at = Number(window.localStorage.getItem(DISMISS_KEY));
    return at && Date.now() - at < DISMISS_DAYS * 864e5;
  } catch {
    return false;
  }
};

export default function InstallPrompt() {
  const [visible, setVisible] = useState(false);
  const [hint, setHint] = useState("");

  useEffect(() => {
    if (isInstalled() || recentlyDismissed()) return;
    const timer = setTimeout(() => setVisible(true), 1800);
    const onChange = () => isInstalled() && setVisible(false);
    window.addEventListener(INSTALL_EVENT, onChange);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(INSTALL_EVENT, onChange);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      window.localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      // storage unavailable (private mode) — the prompt will simply show again next visit
    }
  };

  const install = async () => {
    const prompt = window.__kkInstallPrompt;
    if (prompt) {
      window.__kkInstallPrompt = null;
      prompt.prompt();
      const { outcome } = await prompt.userChoice;
      if (outcome === "accepted") setVisible(false);
      else dismiss();
      return;
    }
    setHint(
      /iphone|ipad|ipod/i.test(navigator.userAgent)
        ? "Tap the Share button, then “Add to Home Screen”."
        : "Open your browser menu and choose “Install app” or “Add to Home screen”."
    );
  };

  return (
    <div className={`kp${visible ? " on" : ""}`} role="dialog" aria-label="Install the Komla's Kitchen app" aria-hidden={!visible}>
      <img src="/icons/icon-192.png" alt="" className="kp-icon" />
      <div className="kp-text">
        <b>Get the Komla&apos;s Kitchen app</b>
        <span aria-live="polite">{hint || "Order in one tap from your home screen — no app store needed."}</span>
      </div>
      <button type="button" className="kw-btn kw-btn-fill kp-install" onClick={install} tabIndex={visible ? 0 : -1}>
        Install
      </button>
      <button type="button" className="kp-close" onClick={dismiss} aria-label="Dismiss" tabIndex={visible ? 0 : -1}>
        <i className="fas fa-times" />
      </button>
    </div>
  );
}
