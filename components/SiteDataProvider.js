"use client";
import { createContext, useContext } from "react";

// CMS content (settings, schedule, menu, homepage, reviews, about) loaded once by the
// root layout on the server and shared with every client component.
const SiteDataContext = createContext(null);

export const SiteDataProvider = ({ value, children }) => (
  <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
);

export const useSite = () => {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error("useSite must be used inside <SiteDataProvider>");
  return ctx;
};
