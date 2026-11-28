// Built-in content for every CMS-managed part of the site. The public site uses these
// whenever the database has no saved version (first launch, or database unavailable),
// and the admin starts from them the first time a section is opened.
import { menuCategories, menuItems } from "@/data/menu";
import { weeklySchedule } from "@/data/schedule";
import { googleReviewsSnapshot, extraReviews } from "@/data/googleReviews";
import { posts as seedPosts } from "@/data/blog";

export const DEFAULT_SETTINGS = {
  name: "Komla's Kitchen",
  tagline: "Authentic Ghanaian flavours, cooked fresh daily and delivered across Chicago.",
  phonePrimary: "+1 (312) 554-5481",
  phoneSecondary: "+1 (708) 808-0303",
  email: "",
  address: "3718 S Indiana Ave, Chicago, IL",
  postalCode: "60653",
  hours: "Mon–Sun, 11 AM – 9 PM",
  instagram: "https://www.instagram.com/komlaskitchen?utm_source=qr&igsh=MXg0ZGU5OWpwcWNz",
  tiktok: "https://www.tiktok.com/@chalekomlacooks0?_r=1&_t=ZS-97Faf2TUkMe",
  facebook: "",
  ticker: [
    "Authentic Ghanaian cuisine, made fresh daily",
    "Free delivery on orders over $50",
    "Wed · Sat · Sun deliveries at 1 PM & 5 PM",
    "Mon · Tue · Thu · Fri deliveries 12 – 5 PM",
    "Wednesday Special: Beans & Plantain",
    "Try our legendary Party Jollof",
    "Call us: +1 (312) 554-5481 or +1 (708) 808-0303",
    "Open Mon–Sun, 11 AM – 9 PM · Chicago, IL",
  ],
  zelleName: "Jacob Mortty",
  zelleQr: "/pictures/zelle-qr.png",
  orderingOpen: true,
  closedMessage: "Online ordering is paused right now — please call us to order.",
  notifyEmails: "",
};

export const DEFAULT_HOME = {
  hero: {
    pill: "Authentic Ghanaian Kitchen · Chicago",
    line1: "Taste of Ghana,",
    highlight: "Delivered",
    line2: "Fresh.",
    lead: "Party jollof, okra soup, kelewele and more — traditional recipes cooked fresh every day and delivered to your door across Chicago.",
  },
  slides: [
    { image: "/pictures/opt/hero_trays.webp", caption: "Jollof, tilapia, chicken & banku", alt: "Trays of jollof rice, fried tilapia with peppers, grilled chicken and banku" },
    { image: "/pictures/opt/tilapia.webp", caption: "Grilled tilapia, fresh from the fire", alt: "Grilled whole tilapia, golden and charred" },
    { image: "/pictures/opt/hero_jollof_chicken.webp", caption: "Party jollof with roasted chicken", alt: "A tray of jollof rice beside roasted chicken drumsticks" },
    { image: "/pictures/opt/hero_party_spread.webp", caption: "Party trays, packed fresh", alt: "Fresh pepper and onion salad in front of party trays of jollof and chicken" },
  ],
  offer: {
    kicker: "Special Offer",
    highlight: "Free",
    title: "Delivery",
    sub: "On Orders Over $50",
    note: "Across Chicago · deliveries every afternoon",
    image: "/pictures/opt/jollof_main_dish.webp",
    button: "Order Now",
  },
  cravings: [
    { label: "Family Trays", image: "/pictures/opt/jollof2.webp" },
    { label: "Jollof Rice", image: "/pictures/opt/jollof_main_dish.webp" },
    { label: "Okra Soup", image: "/pictures/opt/okro_soup_sq.webp" },
    { label: "Kontomire", image: "/pictures/opt/kontomire_stew2.webp" },
    { label: "Red Red", image: "/pictures/opt/beans_and_plantain.webp" },
    { label: "Kelewele", image: "/pictures/opt/kelewele.webp" },
    { label: "Grilled", image: "/pictures/opt/chicken_bg.webp" },
    { label: "Plantain", image: "/pictures/beans_and_plantain2.jpeg" },
    { label: "Sobolo", image: "/pictures/opt/sobolo.webp" },
  ],
  mostOrdered: [
    { id: 101, badge: "Best Seller", image: "/pictures/opt/jollof_main_dish.webp" },
    { id: 102, badge: "Popular", image: "/pictures/opt/okro_soup_sq.webp" },
    { id: 13, badge: "Fan Favourite", image: "/pictures/opt/kelewele.webp" },
    { id: 5, badge: "Classic", image: "/pictures/opt/kontomire_stew2.webp" },
  ],
};

export const DEFAULT_ABOUT = {
  quote: "Every pot tells a story of home.",
  story: [
    "Komla's Kitchen was founded from a passion for sharing authentic Ghanaian cuisine with families throughout Chicago. Every meal is prepared with care using traditional recipes passed down through generations.",
    "What started as a labour of love in our home kitchen grew into a full-service delivery kitchen because people kept asking for more. We believe great food has the power to bring people together — and that's exactly what we set out to do every single day.",
  ],
  mission:
    "To bring people together through flavourful meals that celebrate Ghanaian culture, hospitality and community — because every plate is a chance to share a piece of our heritage.",
};

export const DEFAULT_SCHEDULE = { blocks: weeklySchedule };

export const DEFAULT_MENU = {
  categories: menuCategories,
  items: menuItems.map((item, i) => ({ available: true, sortOrder: i, ...item })),
};

export const DEFAULT_REVIEWS = {
  rating: googleReviewsSnapshot.rating,
  count: googleReviewsSnapshot.count,
  mapsUrl: googleReviewsSnapshot.mapsUrl,
  reviewUrl: "https://g.page/r/CTAQ88sbRGdaEAI/review",
  reviews: [...googleReviewsSnapshot.reviews.map((r) => ({ source: "google", ...r })), ...extraReviews],
};

/* ── Blog: stored as simple text ("## Heading", "- list item", "> quote", blank line = new paragraph) ── */
export const blocksToText = (blocks = []) =>
  blocks
    .map((b) => {
      if (b.h2) return `## ${b.h2}`;
      if (b.quote) return `> ${b.quote}`;
      if (b.list) return b.list.map((li) => `- ${li}`).join("\n");
      return b.p || "";
    })
    .join("\n\n");

export function textToBlocks(text = "") {
  return String(text)
    .replace(/\r\n/g, "\n")
    .split(/\n\s*\n/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => {
      if (chunk.startsWith("## ")) return { h2: chunk.slice(3).trim() };
      if (chunk.startsWith("> ")) return { quote: chunk.replace(/^>\s?/gm, "").trim() };
      const lines = chunk.split("\n").map((l) => l.trim());
      if (lines.every((l) => /^[-*]\s+/.test(l))) return { list: lines.map((l) => l.replace(/^[-*]\s+/, "")) };
      return { p: lines.join(" ") };
    });
}

export const DEFAULT_POSTS = seedPosts.map((p) => ({
  slug: p.slug,
  title: p.title,
  excerpt: p.excerpt,
  category: p.category,
  date: p.date,
  readTime: p.readTime,
  image: p.image,
  imageAlt: p.imageAlt,
  ctaLabel: p.cta?.label || "Order Now",
  ctaHref: p.cta?.href || "/food-menu",
  content: blocksToText(p.body),
  published: true,
}));

/* ── Small shared helpers (safe on client and server) ── */
export const telHref = (display = "") => {
  const digits = String(display).replace(/[^\d+]/g, "");
  if (!digits) return "";
  return `tel:${digits.startsWith("+") ? digits : `+1${digits.replace(/^1/, "")}`}`;
};

export const formatPostDate = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

// Photos already on the site, offered in the admin's image library.
export const SITE_IMAGES = [
  "hero_trays", "tilapia", "hero_jollof_chicken", "hero_party_spread", "waakye_platter", "jollof_main_dish", "jollof2",
  "jollof_main", "okro_soup_sq", "kontomire_stew2", "kelewele", "beans_and_plantain", "chicken_bg", "sobolo", "banku",
  "boiled_eggs", "ghana_salad",
]
  .map((n) => `/pictures/opt/${n}.webp`)
  .concat(["/pictures/dishes.jpeg", "/pictures/vegetable_rice.jpeg", "/pictures/beans_and_plantain2.jpeg", "/pictures/zelle-qr.png", "/pictures/logo.png"]);
