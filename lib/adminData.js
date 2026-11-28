import "server-only";
import { getDoc, listDocs, putDoc, storeReady } from "@/lib/store";
import {
  DEFAULT_ABOUT,
  DEFAULT_HOME,
  DEFAULT_MENU,
  DEFAULT_POSTS,
  DEFAULT_REVIEWS,
  DEFAULT_SCHEDULE,
  DEFAULT_SETTINGS,
} from "@/lib/siteDefaults";

// Strict loaders for the admin: unlike the public-site readers, a database error here
// throws instead of silently falling back — so a save can never overwrite real data
// with the built-in defaults.
const DEFAULTS = {
  settings: DEFAULT_SETTINGS,
  home: DEFAULT_HOME,
  about: DEFAULT_ABOUT,
  schedule: DEFAULT_SCHEDULE,
  reviews: DEFAULT_REVIEWS,
  menu: DEFAULT_MENU,
};

export async function loadContent(id) {
  const saved = await getDoc("content", id);
  if (!saved) return DEFAULTS[id];
  const { id: _i, createdAt: _c, updatedAt: _u, ...data } = saved;
  return { ...DEFAULTS[id], ...data };
}

export async function loadMenu() {
  const menu = await loadContent("menu");
  return { ...menu, items: [...menu.items].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)) };
}

// The first time the blog is managed, copy the built-in posts into the database.
export async function ensurePostsSeeded() {
  if (!storeReady) return;
  if ((await listDocs("posts")).length) return;
  for (const p of DEFAULT_POSTS) await putDoc("posts", null, p);
}

export async function loadPosts() {
  await ensurePostsSeeded();
  return (await listDocs("posts")).sort((a, b) => (a.date < b.date ? 1 : -1));
}
