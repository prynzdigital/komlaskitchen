"use server";
import { revalidatePath } from "next/cache";
import { can, logActivity, requireActionUser } from "@/lib/auth";
import { blobToken, deleteDoc, getDoc, listDocs, putDoc, storeReady } from "@/lib/store";
import { ensurePostsSeeded, loadContent, loadMenu } from "@/lib/adminData";
import { bool, image, line, link, list, lines, num, slugify, str } from "@/lib/sanitize";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Rebuild every public page so the change shows immediately.
const publish = () => revalidatePath("/", "layout");

const guard = async (area = "content") => {
  const user = await requireActionUser(area);
  if (!storeReady) throw new Error("No database is connected yet.");
  return user;
};

const wrap = async (fn) => {
  try {
    return await fn();
  } catch (err) {
    return { error: err.message || "Something went wrong." };
  }
};

/* ── Site settings ─────────────────────────────────────── */
export const saveSettingsAction = async (input) =>
  wrap(async () => {
    const user = await guard("settings");
    const prev = await loadContent("settings");
    const data = {
      name: line(input.name, 80) || prev.name,
      tagline: line(input.tagline, 200),
      phonePrimary: line(input.phonePrimary, 40),
      phoneSecondary: line(input.phoneSecondary, 40),
      email: line(input.email, 120),
      address: line(input.address, 160),
      postalCode: line(input.postalCode, 20),
      hours: line(input.hours, 80),
      instagram: link(input.instagram),
      tiktok: link(input.tiktok),
      facebook: link(input.facebook),
      ticker: lines(input.ticker, 12, 120),
      zelleName: line(input.zelleName, 80),
      zelleQr: image(input.zelleQr) || prev.zelleQr,
      orderingOpen: bool(input.orderingOpen),
      closedMessage: line(input.closedMessage, 200),
      // Only the owner may change where order emails go.
      notifyEmails: can(user, "team") ? line(input.notifyEmails, 400) : prev.notifyEmails,
    };
    await putDoc("content", "settings", data);
    publish();
    await logActivity(user, data.orderingOpen === prev.orderingOpen ? "updated site settings" : data.orderingOpen ? "re-opened online ordering" : "paused online ordering");
    return { ok: true };
  });

/* ── Homepage ──────────────────────────────────────────── */
export const saveHomeAction = async (input) =>
  wrap(async () => {
    const user = await guard();
    const data = {
      hero: {
        pill: line(input.hero?.pill, 80),
        line1: line(input.hero?.line1, 60),
        highlight: line(input.hero?.highlight, 40),
        line2: line(input.hero?.line2, 60),
        lead: line(input.hero?.lead, 300),
      },
      slides: list(input.slides, (s) => ({ image: image(s.image), caption: line(s.caption, 80), alt: line(s.alt, 160) }), 8).filter((s) => s.image),
      offer: {
        kicker: line(input.offer?.kicker, 40),
        highlight: line(input.offer?.highlight, 30),
        title: line(input.offer?.title, 40),
        sub: line(input.offer?.sub, 80),
        note: line(input.offer?.note, 120),
        image: image(input.offer?.image),
        button: line(input.offer?.button, 30),
      },
      cravings: list(input.cravings, (c) => ({ label: line(c.label, 30), image: image(c.image) }), 16).filter((c) => c.label && c.image),
      mostOrdered: list(input.mostOrdered, (d) => ({ id: Number(d.id), badge: line(d.badge, 24), image: image(d.image) }), 8).filter((d) => d.id),
    };
    await putDoc("content", "home", data);
    publish();
    await logActivity(user, "updated the homepage");
    return { ok: true };
  });

/* ── About page ────────────────────────────────────────── */
export const saveAboutAction = async (input) =>
  wrap(async () => {
    const user = await guard();
    await putDoc("content", "about", {
      quote: line(input.quote, 140),
      story: lines(input.story, 6, 1200),
      mission: line(input.mission, 500),
    });
    publish();
    await logActivity(user, "updated the About page");
    return { ok: true };
  });

/* ── Weekly schedule ───────────────────────────────────── */
export const saveScheduleAction = async (input) =>
  wrap(async () => {
    const user = await guard();
    const blocks = list(input.blocks, (b, i) => ({
      id: slugify(b.title) || `block-${i + 1}`,
      title: line(b.title, 40),
      days: (Array.isArray(b.days) ? b.days : []).filter((d) => DAYS.includes(d)).sort((a, z) => DAYS.indexOf(a) - DAYS.indexOf(z)),
      dishes: lines(b.dishes, 20, 120),
      delivery: list(b.delivery, (d) => ({ label: line(d.label, 40), time: line(d.time, 40) }), 4).filter((d) => d.label || d.time),
    }), 4).filter((b) => b.title);
    await putDoc("content", "schedule", { blocks });
    publish();
    await logActivity(user, "updated the weekly schedule");
    return { ok: true };
  });

/* ── Reviews ───────────────────────────────────────────── */
const SOURCES = ["google", "facebook", "instagram", "whatsapp", "text"];
export const saveReviewsAction = async (input) =>
  wrap(async () => {
    const user = await guard();
    await putDoc("content", "reviews", {
      rating: num(input.rating, { min: 0, max: 5, decimals: 1 }),
      count: num(input.count, { min: 0, max: 100000, decimals: 0 }),
      mapsUrl: link(input.mapsUrl),
      reviewUrl: link(input.reviewUrl),
      reviews: list(input.reviews, (r) => ({
        author: line(r.author, 80),
        rating: num(r.rating, { min: 1, max: 5, decimals: 0 }),
        source: SOURCES.includes(r.source) ? r.source : "google",
        when: line(r.when, 60),
        text: str(r.text, 1500),
        hidden: bool(r.hidden),
      }), 40).filter((r) => r.author && r.text),
    });
    publish();
    await logActivity(user, "updated reviews");
    return { ok: true };
  });

/* ── Menu ──────────────────────────────────────────────── */
const cleanItem = (raw, categories) => {
  const sizes = list(raw.sizes, (s) => ({ label: line(s.label, 40), price: num(s.price, { max: 5000 }) }), 8).filter((s) => s.label);
  const item = {
    id: Number(raw.id),
    category: categories.some((c) => c.id === raw.category) ? raw.category : categories[0]?.id,
    name: line(raw.name, 80),
    description: str(raw.description, 500),
    image: image(raw.image) || null,
    alt: line(raw.alt, 160) || line(raw.name, 80),
    popular: bool(raw.popular),
    badge: line(raw.badge, 30),
    available: raw.available === undefined ? true : bool(raw.available),
    hidden: bool(raw.hidden),
    callOnly: bool(raw.callOnly),
    sortOrder: num(raw.sortOrder, { max: 10000, decimals: 0 }),
  };
  if (!item.callOnly) {
    if (sizes.length) item.sizes = sizes;
    else item.price = `$${num(raw.flatPrice ?? String(raw.price || "").replace(/[^0-9.]/g, ""), { max: 5000 }).toFixed(2)}`;
  }
  const bases = lines(raw.baseOptions, 6, 40);
  if (bases.length) item.baseOptions = bases;
  if (raw.proteinMode === "choice") {
    const opts = lines(raw.proteinOptions, 8, 40);
    if (opts.length) item.proteinOptions = opts;
  } else if (raw.proteinMode === "addons" && sizes.length) {
    const addOns = list(raw.proteinAddOns, (p) => ({
      name: line(p.name, 40),
      prices: Object.fromEntries(sizes.map((s) => [s.label, num(p.prices?.[s.label], { max: 2000 })])),
    }), 8).filter((p) => p.name);
    if (addOns.length) item.proteinAddOns = addOns;
  } else if (raw.proteinMode === "included") {
    const inc = lines(raw.includedProteins, 8, 40);
    if (inc.length) item.includedProteins = inc;
  }
  if (!item.badge) delete item.badge;
  return item;
};

export const saveMenuItemAction = async (raw) =>
  wrap(async () => {
    const user = await guard();
    const menu = await loadMenu();
    const isNew = !raw.id;
    const id = isNew ? Math.max(0, ...menu.items.map((m) => Number(m.id) || 0)) + 1 : Number(raw.id);
    const prev = menu.items.find((m) => m.id === id);
    const item = cleanItem({ ...raw, id, sortOrder: prev?.sortOrder ?? menu.items.length }, menu.categories);
    if (!item.name) return { error: "Give the dish a name." };
    if (!item.callOnly && !item.sizes && item.price === "$0.00") return { error: "Add a price (or mark the dish as “call to order”)." };
    const items = isNew ? [...menu.items, item] : menu.items.map((m) => (m.id === id ? item : m));
    await putDoc("content", "menu", { categories: menu.categories, items });
    publish();
    await logActivity(user, `${isNew ? "added" : "updated"} menu item “${item.name}”`);
    return { ok: true, id };
  });

export const toggleMenuItemAction = async (id, field) =>
  wrap(async () => {
    const user = await guard("crm"); // staff can mark dishes sold out
    if (!["available", "popular", "hidden"].includes(field)) return { error: "Unknown setting." };
    if (field !== "available" && !can(user, "content")) return { error: "Your account can only change availability." };
    const menu = await loadMenu();
    let name = "";
    const items = menu.items.map((m) => {
      if (m.id !== Number(id)) return m;
      name = m.name;
      const current = field === "available" ? m.available !== false : Boolean(m[field]);
      return { ...m, [field]: !current };
    });
    await putDoc("content", "menu", { categories: menu.categories, items });
    publish();
    const now = items.find((m) => m.id === Number(id));
    await logActivity(user, field === "available" ? `marked “${name}” ${now.available === false ? "sold out" : "available"}` : `changed “${name}” (${field})`);
    return { ok: true };
  });

export const deleteMenuItemAction = async (id) =>
  wrap(async () => {
    const user = await guard();
    const menu = await loadMenu();
    const item = menu.items.find((m) => m.id === Number(id));
    if (!item) return { error: "That dish no longer exists." };
    const home = await loadContent("home");
    await putDoc("content", "menu", { categories: menu.categories, items: menu.items.filter((m) => m.id !== Number(id)) });
    if (home.mostOrdered?.some((d) => Number(d.id) === Number(id))) {
      await putDoc("content", "home", { ...home, mostOrdered: home.mostOrdered.filter((d) => Number(d.id) !== Number(id)) });
    }
    publish();
    await logActivity(user, `deleted menu item “${item.name}”`);
    return { ok: true };
  });

export const reorderMenuAction = async (ids) =>
  wrap(async () => {
    await guard();
    const menu = await loadMenu();
    const order = new Map((Array.isArray(ids) ? ids : []).map((id, i) => [Number(id), i]));
    const items = menu.items.map((m) => ({ ...m, sortOrder: order.has(m.id) ? order.get(m.id) : m.sortOrder ?? 999 }));
    await putDoc("content", "menu", { categories: menu.categories, items });
    publish();
    return { ok: true };
  });

export const saveCategoriesAction = async (rawCategories) =>
  wrap(async () => {
    const user = await guard();
    const menu = await loadMenu();
    const seen = new Set();
    const categories = list(rawCategories, (c) => {
      const label = line(c.label, 40);
      let id = c.id ? slugify(c.id) : slugify(label);
      while (seen.has(id)) id += "-2";
      seen.add(id);
      return { id, label };
    }, 20).filter((c) => c.id && c.label);
    if (!categories.length) return { error: "Keep at least one category." };
    const orphan = menu.items.find((m) => !categories.some((c) => c.id === m.category));
    if (orphan) return { error: `“${orphan.name}” is still in a category you removed — move it first.` };
    await putDoc("content", "menu", { categories, items: menu.items });
    publish();
    await logActivity(user, "updated menu categories");
    return { ok: true };
  });

/* ── Blog ──────────────────────────────────────────────── */
export const savePostAction = async (raw) =>
  wrap(async () => {
    const user = await guard();
    await ensurePostsSeeded();
    const posts = await listDocs("posts");
    const slug = slugify(raw.slug || raw.title);
    if (!line(raw.title, 140)) return { error: "Give the post a title." };
    if (!slug) return { error: "The post needs a web address (slug)." };
    if (posts.some((p) => p.slug === slug && p.id !== raw.id)) return { error: "Another post already uses that web address." };
    const data = {
      slug,
      title: line(raw.title, 140),
      excerpt: line(raw.excerpt, 300),
      category: line(raw.category, 40) || "News",
      date: /^\d{4}-\d{2}-\d{2}$/.test(raw.date) ? raw.date : new Date().toISOString().slice(0, 10),
      readTime: line(raw.readTime, 20),
      image: image(raw.image) || "/pictures/opt/jollof_main_dish.webp",
      imageAlt: line(raw.imageAlt, 160),
      ctaLabel: line(raw.ctaLabel, 40) || "Order Now",
      ctaHref: link(raw.ctaHref) || "/food-menu",
      content: str(raw.content, 20000),
      published: bool(raw.published),
    };
    const saved = await putDoc("posts", raw.id || null, data);
    publish();
    await logActivity(user, `${raw.id ? "updated" : "created"} blog post “${data.title}”`);
    return { ok: true, id: saved.id };
  });

export const deletePostAction = async (id) =>
  wrap(async () => {
    const user = await guard();
    const post = await getDoc("posts", id);
    if (!post) return { error: "That post no longer exists." };
    await deleteDoc("posts", id);
    publish();
    await logActivity(user, `deleted blog post “${post.title}”`);
    return { ok: true };
  });

/* ── Images ────────────────────────────────────────────── */
const MAX_UPLOAD = 4 * 1024 * 1024;
const TYPES = { "image/webp": "webp", "image/jpeg": "jpg", "image/png": "png" };

export const uploadImageAction = async (formData) =>
  wrap(async () => {
    const user = await guard("content");
    const file = formData.get("file");
    if (!file || typeof file === "string") return { error: "Choose an image to upload." };
    const ext = TYPES[file.type];
    if (!ext) return { error: "Use a JPG, PNG or WebP image." };
    if (file.size > MAX_UPLOAD) return { error: "That image is over 4 MB — try a smaller one." };
    const base = slugify(String(formData.get("name") || "image").replace(/\.[a-z0-9]+$/i, "")) || "image";
    const filename = `${base}-${Date.now().toString(36)}.${ext}`;

    let url;
    const token = blobToken();
    if (token) {
      const { put } = await import("@vercel/blob");
      const blob = await put(`cms/${filename}`, file, { access: "public", contentType: file.type, token });
      url = blob.url;
    } else if (process.env.NODE_ENV !== "production") {
      const fs = await import("node:fs/promises");
      const path = await import("node:path");
      const dir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(dir, { recursive: true });
      await fs.writeFile(path.join(dir, filename), Buffer.from(await file.arrayBuffer()));
      url = `/uploads/${filename}`;
    } else {
      return { error: "Image uploads need Vercel Blob — in Vercel open Storage → Create → Blob, then redeploy." };
    }

    const media = (await getDoc("content", "media")) || { items: [] };
    await putDoc("content", "media", { items: [{ url, name: base, at: new Date().toISOString() }, ...(media.items || [])].slice(0, 300) });
    await logActivity(user, "uploaded an image");
    return { ok: true, url };
  });
