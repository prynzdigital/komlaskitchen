import "server-only";
import { cache } from "react";
import { listDocs, safeGetDoc, storeReady } from "@/lib/store";
import {
  DEFAULT_ABOUT,
  DEFAULT_HOME,
  DEFAULT_MENU,
  DEFAULT_POSTS,
  DEFAULT_REVIEWS,
  DEFAULT_SCHEDULE,
  DEFAULT_SETTINGS,
  textToBlocks,
} from "@/lib/siteDefaults";

// Each editable area is one document in the "content" collection.
// Saved values are merged over the built-in defaults, so a missing field never breaks a page.
const read = async (id, fallback) => {
  const saved = await safeGetDoc("content", id);
  if (!saved) return fallback;
  const { id: _i, createdAt: _c, updatedAt: _u, ...data } = saved;
  return { ...fallback, ...data };
};

export const getSettings = cache(() => read("settings", DEFAULT_SETTINGS));
export const getHome = cache(() => read("home", DEFAULT_HOME));
export const getAbout = cache(() => read("about", DEFAULT_ABOUT));
export const getSchedule = cache(() => read("schedule", DEFAULT_SCHEDULE));
export const getReviews = cache(() => read("reviews", DEFAULT_REVIEWS));
export const getMenu = cache(async () => {
  const menu = await read("menu", DEFAULT_MENU);
  return { ...menu, items: [...menu.items].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)) };
});

// Everything the shared client components need, handed down once from the root layout.
export const getPublicSiteData = cache(async () => {
  const [settings, schedule, menu, home, reviews, about] = await Promise.all([
    getSettings(),
    getSchedule(),
    getMenu(),
    getHome(),
    getReviews(),
    getAbout(),
  ]);
  return { settings, schedule, menu, home, reviews, about };
});

/* ── Blog ── */
const withBlocks = (p) => ({ ...p, body: textToBlocks(p.content) });

// Stored posts once the CMS has saved any; otherwise the built-in starter posts.
export const getAllPosts = cache(async () => {
  let posts = DEFAULT_POSTS;
  if (storeReady) {
    try {
      const saved = await listDocs("posts");
      if (saved.length) posts = saved;
    } catch (err) {
      console.error("store: could not list posts:", err.message);
    }
  }
  return posts.map(withBlocks).sort((a, b) => (a.date < b.date ? 1 : -1));
});

export const getPublishedPosts = cache(async () => (await getAllPosts()).filter((p) => p.published !== false));

export const getPostBySlug = cache(async (slug) => (await getPublishedPosts()).find((p) => p.slug === slug) || null);
