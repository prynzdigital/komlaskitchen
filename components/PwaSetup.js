"use client";
import { useEffect } from "react";

// The browser fires `beforeinstallprompt` once, often before install buttons mount,
// so it is captured here and re-broadcast for InstallAppButton.
export const INSTALL_EVENT = "kk-install-available";

export default function PwaSetup() {
  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault();
      window.__kkInstallPrompt = e;
      window.dispatchEvent(new Event(INSTALL_EVENT));
    };
    const onInstalled = () => {
      window.__kkInstallPrompt = null;
      window.dispatchEvent(new Event(INSTALL_EVENT));
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);

    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  return null;
}
