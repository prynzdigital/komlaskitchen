export default function manifest() {
  return {
    name: "Komla's Kitchen",
    short_name: "Komla's",
    description: "Authentic Ghanaian food, cooked fresh daily and delivered across Chicago.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0b2818",
    theme_color: "#123f27",
    categories: ["food", "shopping"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Menu", url: "/food-menu", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "Cart", url: "/cart", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
