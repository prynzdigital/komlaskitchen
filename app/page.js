"use client";
import "./home.css";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { menuItems } from "@/data/menu";
import { formatCurrency } from "@/lib/pricing";

const IG_URL = "https://www.instagram.com/komlaskitchen?utm_source=qr&igsh=MXg0ZGU5OWpwcWNz";

const byId = (id) => menuItems.find((m) => m.id === id);

const priceLabel = (item) => {
  if (!item) return "";
  if (item.callOnly) return "Call to price";
  if (item.sizes?.length) {
    const min = Math.min(...item.sizes.map((s) => s.price));
    return item.sizes.length > 1 ? `from ${formatCurrency(min)}` : formatCurrency(min);
  }
  return item.price;
};

const firstSentence = (text = "") => text.split(/(?<=[.!?])\s/)[0];

const SIGNATURES = [
  { id: 101, image: "/pictures/opt/jollof_main_dish.webp" },
  { id: 102, image: "/pictures/opt/okro_soup_sq.webp" },
  { id: 13, image: "/pictures/opt/kelewele.webp" },
  { id: 103, image: "/pictures/opt/beans_and_plantain.webp" },
]
  .map((s) => ({ ...byId(s.id), image: s.image }))
  .filter((s) => s.id);

const CATEGORIES = [
  { label: "Family Trays", sub: "Party-size", image: "/pictures/opt/jollof2.webp" },
  { label: "Rice", sub: "Jollof & fried", image: "/pictures/opt/jollof_main.webp" },
  { label: "Soups & Stews", sub: "Okro · Kontomire", image: "/pictures/opt/okro_soup_sq.webp" },
  { label: "Grilled", sub: "Chicken · Tilapia", image: "/pictures/opt/chicken_bg.webp" },
  { label: "Sides", sub: "Kelewele · Banku", image: "/pictures/opt/kelewele.webp" },
  { label: "Drinks", sub: "Sobolo", image: "/pictures/opt/sobolo.webp" },
];

const MENU_GROUPS = [
  { title: "Trays & Mains", ids: [101, 102, 103, 5, 6, 105] },
  { title: "Sides & Drinks", ids: [13, 10, 104, 107, 11, 12] },
];

const GALLERY = [
  "/pictures/opt/chicken_bg.webp",
  "/pictures/opt/okro_soup_sq.webp",
  "/pictures/opt/kelewele.webp",
  "/pictures/opt/jollof2.webp",
  "/pictures/opt/sobolo.webp",
  "/pictures/opt/beans_and_plantain.webp",
];

const TESTIMONIALS = [
  { name: "Abena M.", location: "Chicago, IL", text: "The Party Jollof is smoky, perfectly seasoned and tastes exactly like home. The best Ghanaian food in Chicago." },
  { name: "Kwame B.", location: "Oak Park, IL", text: "Kontomire stew that tastes just like my grandmother's. Delivery was quick and everything arrived piping hot." },
  { name: "Esi A.", location: "Evanston, IL", text: "The Red Red, Kelewele and Sobolo are unmatched. Komla's Kitchen is a blessing to this city." },
];

const MARQUEE = ["Party Jollof", "Kontomire", "Okro Soup", "Kelewele", "Red Red", "Banku", "Grilled Tilapia", "Sobolo"];

const Orn = () => (
  <div className="kk-orn" aria-hidden="true">
    <span />✦<span />
  </div>
);

const HomePage = () => {
  const [quote, setQuote] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setQuote((i) => (i + 1) % TESTIMONIALS.length), 7000);
    return () => clearInterval(t);
  }, [quote]);

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
                      ["AM", "#d93a67"],
                      ["KB", "#9b1f45"],
                      ["EA", "#c9873d"],
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

        {/* ══ Marquee ══ */}
        <div className="kk-marquee" aria-hidden="true">
          <div className="kk-marquee-track">
            {[...MARQUEE, ...MARQUEE, ...MARQUEE, ...MARQUEE].map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </div>
        </div>

        {/* ══ Story ══ */}
        <section id="kk-story" className="kk-sec kk-cream">
          <div className="container">
            <div className="kk-story">
              <div className="kk-collage reveal">
                <div className="kk-collage-frame" />
                <div className="kk-collage-main">
                  <img src="/pictures/opt/jollof2.webp" alt="Jollof rice with chicken" />
                </div>
                <div className="kk-collage-sub">
                  <img src="/pictures/opt/sobolo.webp" alt="Chilled sobolo" />
                </div>
                <div className="kk-pill-tag">Made with love</div>
              </div>

              <div>
                <p className="kk-eyebrow reveal">Our Story</p>
                <h2 className="kk-h2 reveal" style={{ "--d": "0.1s" }}>
                  Recipes from Ghana, <em>cooked with care</em> in Chicago.
                </h2>
                <p className="kk-lead reveal" style={{ "--d": "0.2s" }}>
                  Komla&apos;s Kitchen began with a simple wish: to share the food we grew up on. Every pot is slow-cooked
                  from traditional recipes, seasoned by hand, and packed to arrive the way it left our kitchen — hot,
                  generous and full of flavour.
                </p>
                <div className="kk-pillars">
                  {[
                    { icon: "fas fa-seedling", t: "Fresh, honest ingredients", d: "Quality produce and spices, prepared from scratch daily." },
                    { icon: "fas fa-fire-alt", t: "Slow-cooked tradition", d: "Time-honoured techniques for deep, authentic flavour." },
                    { icon: "fas fa-hand-holding-heart", t: "Served personally", d: "Call us and we’ll tailor every order to your table." },
                  ].map((p, i) => (
                    <div key={p.t} className="kk-pillar reveal" style={{ "--d": `${0.25 + i * 0.1}s` }}>
                      <i className={p.icon} />
                      <div>
                        <h4>{p.t}</h4>
                        <p>{p.d}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/about" className="kk-link reveal">
                  Read our story <i className="fas fa-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══ Signature dishes ══ */}
        <section className="kk-sec kk-dark">
          <div className="container">
            <div className="kk-center">
              <p className="kk-eyebrow kk-both reveal">Chef&apos;s Selection</p>
              <h2 className="kk-h2 reveal" style={{ "--d": "0.1s" }}>
                Signature <em>dishes</em>
              </h2>
              <p className="kk-lead reveal" style={{ "--d": "0.2s" }}>
                The plates our guests return for, again and again.
              </p>
            </div>
            <div className="kk-dishes">
              {SIGNATURES.map((d, i) => (
                <Link key={d.id} href="/food-menu" className="kk-dish reveal" style={{ "--d": `${i * 0.12}s` }}>
                  <div className="kk-dish-img">
                    <img src={d.image} alt={d.alt || d.name} loading="lazy" />
                  </div>
                  <span className="kk-dish-num">No. 0{i + 1}</span>
                  <h3>{d.name}</h3>
                  <p>{d.description}</p>
                  <div className="kk-dish-foot">
                    <b>{priceLabel(d)}</b>
                    <span>
                      Order <i className="fas fa-arrow-right" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ══ Categories + menu list ══ */}
        <section className="kk-sec kk-cream-2">
          <div className="container">
            <div className="kk-center">
              <p className="kk-eyebrow kk-both reveal">The Menu</p>
              <h2 className="kk-h2 reveal" style={{ "--d": "0.1s" }}>
                A taste of <em>home</em>
              </h2>
              <Orn />
            </div>

            <div className="kk-cats">
              {CATEGORIES.map((c, i) => (
                <Link key={c.label} href="/food-menu" className="kk-cat reveal" style={{ "--d": `${i * 0.07}s` }}>
                  <div className="kk-cat-ring">
                    <div>
                      <img src={c.image} alt={c.label} loading="lazy" />
                    </div>
                  </div>
                  <h5>{c.label}</h5>
                  <small>{c.sub}</small>
                </Link>
              ))}
            </div>

            <div className="kk-menu-card reveal">
              <div className="kk-menu-cols">
                {MENU_GROUPS.map((g) => (
                  <div key={g.title} className="kk-menu-group">
                    <h4>{g.title}</h4>
                    {g.ids
                      .map(byId)
                      .filter(Boolean)
                      .map((item) => (
                        <div key={item.id} className="kk-menu-item">
                          <div className="kk-menu-row">
                            <b>{item.name}</b>
                            <i />
                            <span>{priceLabel(item)}</span>
                          </div>
                          {item.description && <p>{firstSentence(item.description)}</p>}
                        </div>
                      ))}
                  </div>
                ))}
              </div>
              <div className="kk-center" style={{ marginTop: 34 }}>
                <Link href="/food-menu" className="kk-btn kk-btn-ink">
                  Order from the full menu <i className="fas fa-arrow-right" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══ Catering ══ */}
        <section className="kk-events">
          <div className="kk-events-bg">
            <img src="/pictures/opt/chicken_bg.webp" alt="" loading="lazy" />
          </div>
          <div className="container">
            <div style={{ maxWidth: 620 }}>
              <p className="kk-eyebrow kk-light reveal">Catering & Private Events</p>
              <h2 className="kk-h2 reveal" style={{ color: "#fff", "--d": "0.1s" }}>
                Let us cater your <em style={{ color: "#e9d39b" }}>next celebration.</em>
              </h2>
              <p className="kk-lead reveal" style={{ color: "rgba(255,255,255,0.72)", "--d": "0.2s" }}>
                From intimate family dinners to naming ceremonies, birthdays and office parties — generous trays and
                custom platters, prepared fresh and ready to share.
              </p>
              <div className="kk-events-sizes reveal" style={{ "--d": "0.3s" }}>
                <div>
                  <b>Small</b>
                  <span>Family table</span>
                </div>
                <div>
                  <b>Medium</b>
                  <span>Gatherings</span>
                </div>
                <div>
                  <b>Large</b>
                  <span>Full celebrations</span>
                </div>
              </div>
              <div className="kw-ctas reveal" style={{ "--d": "0.4s" }}>
                <a href="tel:3122878155" className="kk-btn kk-btn-gold">
                  Plan your event <i className="fas fa-arrow-right" />
                </a>
                <Link href="/food-menu" className="kk-btn kk-btn-ghost">
                  View family trays
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ══ Testimonials ══ */}
        <section className="kk-sec kk-cream">
          <div className="container kk-center">
            <p className="kk-eyebrow kk-both reveal">Kind Words</p>
            <div className="kk-quote reveal" style={{ "--d": "0.1s" }}>
              <div className="kk-quote-mark">&ldquo;</div>
              {TESTIMONIALS.map((t, i) => (
                <figure key={t.name} className={i === quote ? "on" : ""} aria-hidden={i !== quote}>
                  <div className="kk-stars">★★★★★</div>
                  <blockquote>{t.text}</blockquote>
                  <figcaption>
                    <b>{t.name}</b> &nbsp;·&nbsp; {t.location}
                  </figcaption>
                </figure>
              ))}
            </div>
            <div className="kk-quote-nav">
              <button
                aria-label="Previous review"
                onClick={() => setQuote((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
              >
                <i className="fas fa-arrow-left" />
              </button>
              <button aria-label="Next review" onClick={() => setQuote((i) => (i + 1) % TESTIMONIALS.length)}>
                <i className="fas fa-arrow-right" />
              </button>
            </div>
          </div>
        </section>

        {/* ══ Instagram ══ */}
        <section className="kk-cream" style={{ paddingTop: 20 }}>
          <div className="container">
            <div className="kk-gallery-head">
              <div>
                <p className="kk-eyebrow reveal">Follow along</p>
                <h2 className="kk-h2 reveal" style={{ margin: 0, "--d": "0.1s" }}>
                  <em>@komlaskitchen</em>
                </h2>
              </div>
              <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="kk-link reveal">
                Follow on Instagram <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
          <div className="kk-gallery">
            {GALLERY.map((src) => (
              <a key={src} href={IG_URL} target="_blank" rel="noopener noreferrer" aria-label="Komla's Kitchen on Instagram">
                <img src={src} alt="" loading="lazy" />
              </a>
            ))}
          </div>
        </section>
      </div>
    </FoodKingLayout>
  );
};

export default HomePage;
