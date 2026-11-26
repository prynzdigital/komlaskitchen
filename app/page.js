"use client";
import "./home.css";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import InstallAppButton from "@/components/InstallAppButton";
import Link from "next/link";
import { useEffect } from "react";
import { menuCategories, menuItems } from "@/data/menu";
import { formatCurrency } from "@/lib/pricing";

const TIKTOK_URL = "https://www.tiktok.com/@chalekomlacooks0?_r=1&_t=ZS-97Faf2TUkMe";

const byId = (id) => menuItems.find((m) => m.id === id);

const minPrice = (item) => {
  if (item.callOnly) return "Call to price";
  if (item.sizes?.length) {
    const min = Math.min(...item.sizes.map((s) => s.price));
    return item.sizes.length > 1 ? `from ${formatCurrency(min)}` : formatCurrency(min);
  }
  return item.price;
};

const CATEGORY_LOOK = {
  trays: { icon: "fas fa-users", image: "/pictures/opt/jollof2.webp" },
  soups: { icon: "fas fa-mortar-pestle", image: "/pictures/opt/okro_soup_sq.webp" },
  grilled: { icon: "fas fa-fire", image: "/pictures/opt/chicken_bg.webp" },
  sides: { icon: "fas fa-leaf", image: "/pictures/opt/kelewele.webp" },
  beverages: { icon: "fas fa-glass-whiskey", image: "/pictures/opt/sobolo.webp" },
};

const CATEGORIES = menuCategories
  .map((c) => ({ ...c, ...CATEGORY_LOOK[c.id], count: menuItems.filter((m) => m.category === c.id).length }))
  .filter((c) => c.count > 0 && c.image);

const FAVOURITES = [
  { id: 101, image: "/pictures/opt/jollof_main_dish.webp", badge: "Best Seller" },
  { id: 102, image: "/pictures/opt/okro_soup_sq.webp", badge: "Popular" },
  { id: 13, image: "/pictures/opt/kelewele.webp", badge: "Fan Favourite" },
  { id: 103, image: "/pictures/opt/beans_and_plantain.webp", badge: "Mondays", dark: true },
  { id: 5, image: "/pictures/opt/kontomire_stew2.webp", badge: "Classic" },
  { id: 11, image: "/pictures/opt/sobolo.webp", badge: "Refreshing", dark: true },
]
  .map((f) => ({ ...byId(f.id), ...f }))
  .filter((f) => f.name);

const sizeNote = (item) => {
  const n = item.sizes?.length || 0;
  if (n > 1) return `${n} sizes available`;
  if (n === 1) return item.sizes[0].label;
  return item.callOnly ? "Custom order" : "Single serving";
};

const HomePage = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".kk .reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <FoodKingLayout>
      <div className="kk">
        {/* ══ Hero ══ */}
        <section className="kw-hero">
          <span className="kw-blob kw-blob-1" />
          <span className="kw-blob kw-blob-2" />
          <span className="kw-blob kw-blob-3" />

          <div className="container">
            <div className="kw-hero-grid">
              <div>
                <span className="kw-pill kk-fade" style={{ "--d": "0.1s" }}>
                  <b>
                    <i className="fas fa-utensils" />
                  </b>
                  Authentic Ghanaian Kitchen · Chicago
                </span>
                <h1 className="kk-fade" style={{ "--d": "0.2s" }}>
                  Taste of Ghana,
                  <br />
                  <span>Delivered</span> Fresh.
                </h1>
                <p className="kw-hero-lead kk-fade" style={{ "--d": "0.35s" }}>
                  Party jollof, okro soup, kelewele and more — traditional recipes cooked fresh every day and delivered to
                  your door across Chicago.
                </p>
                <div className="kw-ctas kk-fade" style={{ "--d": "0.5s" }}>
                  <Link href="/food-menu" className="kw-btn kw-btn-fill">
                    Order Now <i className="fas fa-arrow-right" />
                  </Link>
                  <Link href="/food-menu" className="kw-btn kw-btn-glass">
                    Explore Menu
                  </Link>
                </div>
                <div className="kw-proof kk-fade" style={{ "--d": "0.65s" }}>
                  <div className="kw-avatars" aria-hidden="true">
                    {[
                      ["AM", "#c99a3c"],
                      ["KB", "#9b1f45"],
                      ["EA", "#a67c2c"],
                      ["+", "#4e1024"],
                    ].map(([t, c]) => (
                      <span key={t} style={{ background: c }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <div>
                    <div className="kw-proof-stars" aria-label="Five-star reviews">
                      ★★★★★
                    </div>
                    <p>Loved by families across Chicago</p>
                  </div>
                </div>
              </div>

              <div className="kw-art kk-fade" style={{ "--d": "0.3s" }} aria-hidden="true">
                <div className="kw-tile">
                  <span>K</span>
                </div>
                <div className="kw-glass">
                  <img src="/pictures/opt/sobolo.webp" alt="" />
                </div>
                <div className="kw-plate kw-plate-okro">
                  <img src="/pictures/opt/okro_soup_sq.webp" alt="" />
                </div>
                <div className="kw-plate kw-plate-main">
                  <img src="/pictures/opt/jollof_main_dish.webp" alt="" />
                </div>
                <div className="kw-plate kw-plate-kele">
                  <img src="/pictures/opt/kelewele.webp" alt="" />
                </div>
                <div className="kw-chip kw-chip-a">
                  <i className="fas fa-fire" />
                  <div>
                    Cooked fresh today
                    <small>Traditional recipes</small>
                  </div>
                </div>
                <div className="kw-chip kw-chip-b">
                  <i className="fas fa-motorcycle" />
                  <div>
                    Same-day delivery
                    <small>Order by 3 PM</small>
                  </div>
                </div>
                <i className="fas fa-pepper-hot kw-spark" style={{ left: "50%", top: "-1%", fontSize: "1.2rem", animationDelay: "-2s" }} />
                <i className="fas fa-leaf kw-spark" style={{ right: "34%", top: "8%", fontSize: "1rem" }} />
                <i className="fas fa-star kw-spark" style={{ left: "4%", top: "46%", fontSize: "0.7rem", animationDelay: "-3s" }} />
              </div>
            </div>

            <div className="kw-features kk-fade" style={{ "--d": "0.8s" }}>
              {[
                { icon: "fas fa-seedling", t: "Authentic Recipes", d: "Traditional Ghanaian cooking" },
                { icon: "fas fa-shipping-fast", t: "Same-Day Delivery", d: "Order by 3 PM, across Chicago" },
                { icon: "fas fa-shield-alt", t: "Easy Payment", d: "Simple, secure checkout" },
                { icon: "fas fa-fire-alt", t: "Cooked Fresh", d: "Prepared daily, packed hot" },
              ].map((f) => (
                <div key={f.t} className="kw-feature">
                  <i className={f.icon} />
                  <div>
                    <h3>{f.t}</h3>
                    <p>{f.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ Shop by category ══ */}
        <section className="kw-sec">
          <div className="container">
            <div className="kw-head reveal">
              <div>
                <h2>Shop by Category</h2>
                <p>Family trays, rich soups, sides and drinks — all made fresh.</p>
              </div>
              <Link href="/food-menu" className="kw-more">
                View Full Menu <i className="fas fa-arrow-right" />
              </Link>
            </div>
            <div className="kw-cats">
              {CATEGORIES.map((c, i) => (
                <Link key={c.id} href="/food-menu" className="kw-cat reveal" style={{ "--d": `${i * 0.06}s` }}>
                  <span className="kw-cat-icon">
                    <i className={c.icon} />
                  </span>
                  <div className="kw-cat-img">
                    <img src={c.image} alt={c.label} loading="lazy" />
                  </div>
                  <b>{c.label}</b>
                  <div className="kw-cat-foot">
                    <span>
                      {c.count} {c.count === 1 ? "item" : "items"}
                    </span>
                    <i className="fas fa-arrow-right" />
                  </div>
                </Link>
              ))}
              <a href="tel:3122878155" className="kw-cat reveal" style={{ "--d": `${CATEGORIES.length * 0.06}s` }}>
                <span className="kw-cat-icon">
                  <i className="fas fa-concierge-bell" />
                </span>
                <div className="kw-cat-img">
                  <img src="/pictures/opt/jollof_main.webp" alt="Catering" loading="lazy" />
                </div>
                <b>Catering</b>
                <div className="kw-cat-foot">
                  <span>Call to plan</span>
                  <i className="fas fa-arrow-right" />
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* ══ Kitchen promo band ══ */}
        <section className="kw-sec">
          <div className="container">
            <div className="kw-band reveal">
              <div>
                <span className="kw-eyebrow">From Our Kitchen</span>
                <h2>
                  From Our Kitchen
                  <br />
                  To Your Table.
                </h2>
                <p>
                  Every pot is slow-cooked from traditional Ghanaian recipes, seasoned by hand and packed hot — so it
                  arrives the way it left our kitchen.
                </p>
                <Link href="/about" className="kw-btn kw-btn-fill">
                  Learn More <i className="fas fa-arrow-right" />
                </Link>
              </div>

              <div className="kw-stats">
                {[
                  { icon: "fas fa-home", b: "Family", s: "Heritage recipes" },
                  { icon: "fas fa-fire-alt", b: "Daily", s: "Cooked fresh" },
                  { icon: "fas fa-map-marker-alt", b: "Chicago", s: "Same-day delivery" },
                ].map((st) => (
                  <div key={st.b} className="kw-stat">
                    <i className={st.icon} />
                    <div>
                      <b>{st.b}</b>
                      <span>{st.s}</span>
                    </div>
                  </div>
                ))}
              </div>

              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="kw-video" aria-label="Watch us cook on TikTok">
                <img src="/pictures/opt/chicken_bg.webp" alt="" loading="lazy" />
                <span className="kw-play">
                  <i className="fas fa-play" />
                </span>
                <small>
                  <i className="fab fa-tiktok" /> Watch us cook on TikTok
                </small>
              </a>
            </div>
          </div>
        </section>

        {/* ══ Customer favourites ══ */}
        <section className="kw-sec">
          <div className="container">
            <div className="kw-head reveal">
              <div>
                <h2>Customer Favourites</h2>
                <p>The dishes Chicago orders again and again.</p>
              </div>
              <Link href="/food-menu" className="kw-more">
                View All Dishes <i className="fas fa-arrow-right" />
              </Link>
            </div>
            <div className="kw-prods">
              {FAVOURITES.map((p, i) => (
                <div key={p.id} className="kw-prod reveal" style={{ "--d": `${i * 0.06}s` }}>
                  <span className={`kw-badge${p.dark ? " alt" : ""}`}>{p.badge}</span>
                  <div className="kw-prod-img">
                    <img src={p.image} alt={p.alt || p.name} loading="lazy" />
                  </div>
                  <b>{p.name}</b>
                  <small>{sizeNote(p)}</small>
                  <div className="kw-prod-foot">
                    <strong>{minPrice(p)}</strong>
                    <Link href="/food-menu" aria-label={`Order ${p.name}`}>
                      <i className="fas fa-shopping-cart" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ Install the app ══ */}
        <section className="kw-sec">
          <div className="container">
            <div className="kw-app reveal">
              <span className="kw-app-icon">
                <i className="fas fa-mobile-alt" />
              </span>
              <div>
                <h2>Get the Komla&apos;s Kitchen app</h2>
                <p>Add us to your home screen for one-tap ordering — no app store needed.</p>
              </div>
              <InstallAppButton />
              <span className="kw-app-tile" aria-hidden="true">
                K
              </span>
            </div>
          </div>
        </section>
      </div>
    </FoodKingLayout>
  );
};

export default HomePage;
