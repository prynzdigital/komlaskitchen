"use client";
import { useEffect, useState } from "react";
import { INSTALL_EVENT } from "./PwaSetup";

export default function InstallAppButton({ className = "kw-btn kw-btn-fill", label = "Install the App" }) {
  const [installed, setInstalled] = useState(false);
  const [hint, setHint] = useState("");

  useEffect(() => {
    const sync = () => {
      setInstalled(window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true);
    };
    sync();
    window.addEventListener(INSTALL_EVENT, sync);
    return () => window.removeEventListener(INSTALL_EVENT, sync);
  }, []);

  if (installed) {
    return (
      <span className={className} aria-disabled="true" style={{ cursor: "default" }}>
        <i className="fas fa-check" /> App installed
      </span>
    );
  }

  const onClick = async () => {
    const prompt = window.__kkInstallPrompt;
    if (prompt) {
      window.__kkInstallPrompt = null;
      prompt.prompt();
      await prompt.userChoice;
      return;
    }
    const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setHint(
      isIOS
        ? "On iPhone: tap the Share button, then “Add to Home Screen”."
        : "Open your browser menu and choose “Install app” or “Add to Home screen”."
    );
  };

  return (
    <span style={{ display: "inline-flex", flexDirection: "column", gap: 8 }}>
      <button type="button" className={className} onClick={onClick} style={{ border: 0, cursor: "pointer" }}>
        <i className="fas fa-mobile-alt" /> {label}
      </button>
      {hint && (
        <small role="status" style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.78rem", maxWidth: 260 }}>
          {hint}
        </small>
      )}
    </span>
  );
}
