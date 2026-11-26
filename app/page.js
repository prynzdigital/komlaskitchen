"use client";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { menuItems } from "@/data/menu";
import { formatCurrency } from "@/lib/pricing";

const HERO_SLIDES = [
  "/pictures/jollof_main_dish.jpeg",
  "/pictures/dishes.jpeg",
  "/pictures/kontomire_stew.jpg",
  "/pictures/kelewele.jpg",
];

const SIGNATURE_IDS = [101, 5, 13, 8];
const SIGNATURE_DISHES = SIGNATURE_IDS.map((id) => menuItems.find((m) => m.id === id)).filter(Boolean);

const priceLabel = (item) => {
  if (item.callOnly) return "Call to price";
  if (item.sizes?.length) return `From ${formatCurrency(Math.min(...item.sizes.map((s) => s.price)))}`;
  return item.price;
};

const CATEGORIES = [
  { label: "Family Trays", sub: "Party-size", image: "/pictures/jollof_main_dish.jpeg", icon: "fas fa-users" },
  { label: "Rice Dishes", sub: "Party Jollof", image: "/pictures/jollof.jpeg", icon: "fas fa-utensils" },
  { label: "Soups & Stews", sub: "Kontomire", image: "/pictures/kontomire_stew.jpg", icon: "fas fa-mortar-pestle" },
  { label: "Grilled", sub: "Party Platter", image: "/pictures/dishes.jpeg", icon: "fas fa-fire" },
  { label: "Sides", sub: "Kelewele", image: "/pictures/kelewele.jpg", icon: "fas fa-leaf" },
  { label: "Beverages", sub: "Sobolo", image: "/pictures/sobolo.jpg", icon: "fas fa-glass-whiskey" },
];

const EXPERIENCE_PHOTOS = [
  { src: "/pictures/jollof2.jpeg", alt: "Jollof rice platter" },
  { src: "/pictures/okro_soup.webp", alt: "Okro soup" },
  { src: "/pictures/beans_and_plantain2.jpeg", alt: "Fried plantain" },
  { src: "/pictures/vegetable_rice.jpeg", alt: "Vegetable fried rice" },
];

const WHY_CHOOSE = [
  { icon: "fas fa-user-tie", title: "Heritage Recipes", desc: "Generations-old Ghanaian recipes, cooked with care." },
  { icon: "fas fa-leaf", title: "Fresh Ingredients", desc: "Quality produce and spices, prepared daily." },
  { icon: "fas fa-gem", title: "Premium Presentation", desc: "Packed beautifully and delivered hot." },
  { icon: "fas fa-concierge-bell", title: "Personal Service", desc: "Call us and we tailor every order to you." },
];

const TESTIMONIALS = [
  { initials: "AM", name: "Abena M.", location: "Chicago, IL", text: "The Party Jollof is smoky, perfectly seasoned and tastes exactly like home. Best Ghanaian food in Chicago." },
  { initials: "KB", name: "Kwame B.", location: "Oak Park, IL", text: "Kontomire stew that tastes just like my grandma's. Delivery was fast and the food arrived piping hot." },
  { initials: "EA", name: "Esi A.", location: "Evanston, IL", text: "The Red Red, Kelewele and Sobolo are unmatched. Komla's Kitchen is a blessing to this city." },
];

const HomePage = () => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlide((i) => (i + 1) % HERO_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <FoodKingLayout>
      {/* ── Hero (slides under the floating header) ── */}
      <section style={{ position: "relative", marginTop: -94, minHeight: "92vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
        {HERO_SLIDES.map((src, i) => (
          <img
            key={src}
            src={src}
            alt=""
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: i === slide ? 1 : 0, transform: i === slide ? "scale(1.04)" : "scale(1)", transition: "opacity 1.4s ease, transform 6s ease" }}
          />
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(20,15,10,0.85) 0%, rgba(20,15,10,0.55) 45%, rgba(20,15,10,0.15) 100%)" }} />
        <div className="container" style={{ position: "relative", paddingTop: 140, paddingBottom: 80 }}>
          <div style={{ maxWidth: 620 }}>
            <p className="lux-eyebrow" style={{ color: "#e6cc8a" }}>Authentic Ghanaian Cuisine · Chicago</p>
            <h1 style={{ fontFamily: "var(--font-display)", color: "#fff", fontWeight: 600, fontSize: "clamp(2.2rem, 5vw, 3.9rem)", lineHeight: 1.12, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 20 }}>
              Where Ghanaian Heritage Meets Luxury
            </h1>
            <p style={{ color: "rgba(255,255,255,0.82)", fontSize: "1.08rem", lineHeight: 1.7, maxWidth: 480, marginBottom: 34 }}>
              Experience an unparalleled journey of flavour — smoky Party Jollof, rich Kontomire and spiced Kelewele, crafted fresh and delivered with elegance.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <Link href="/food-menu" className="btn-light-pill">Explore Menu</Link>
              <a href="tel:3122878155" className="btn-gold">Call to Order</a>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 28, left: 0, right: 0 }}>
          <div className="container" style={{ display: "flex", gap: 8 }}>
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Show slide ${i + 1}`}
                style={{ width: i === slide ? 34 : 10, height: 4, borderRadius: 4, border: "none", padding: 0, cursor: "pointer", background: i === slide ? "#c9a24d" : "rgba(255,255,255,0.45)", transition: "all 0.35s" }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Signature Dishes ── */}
      <section style={{ padding: "90px 0 70px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <p className="lux-eyebrow">Chef&apos;s Selection</p>
            <h2 className="lux-title">Signature Dishes</h2>
          </div>
          <div className="row g-4">
            {SIGNATURE_DISHES.map((d) => (
              <div key={d.id} className="col-6 col-lg-3">
                <Link href="/food-menu" style={{ textDecoration: "none" }}>
                  <div className="lux-card" style={{ overflow: "hidden", height: "100%" }}>
                    <div style={{ position: "relative", height: 210, margin: 8, borderRadius: 12, overflow: "hidden" }}>
                      <img src={d.image} alt={d.alt || d.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <span style={{ position: "absolute", top: 10, left: 10, background: "rgba(28,23,18,0.75)", color: "#fff", fontWeight: 600, fontSize: "0.82rem", padding: "4px 12px", borderRadius: 8, backdropFilter: "blur(4px)" }}>{priceLabel(d)}</span>
                    </div>
                    <div style={{ padding: "6px 16px 18px", position: "relative" }}>
                      <span style={{ position: "absolute", right: 14, top: -22, width: 30, height: 30, borderRadius: "50%", background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "#c9a24d", fontSize: "0.7rem" }}>★</span>
                      <div style={{ color: "var(--gold-400)", fontSize: "0.68rem", letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Chef&apos;s Signature</div>
                      <div style={{ color: "var(--paper)", fontWeight: 500, fontSize: "1rem", lineHeight: 1.35 }}>{d.name}</div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Curated Menu Categories ── */}
      <section style={{ padding: "40px 0 90px" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <p className="lux-eyebrow">Explore the Menu</p>
            <h2 className="lux-title">Curated Menu Categories</h2>
          </div>
          <div className="row g-3 g-md-4">
            {CATEGORIES.map((c) => (
              <div key={c.label} className="col-6 col-md-4 col-lg-2">
                <Link href="/food-menu" style={{ textDecoration: "none" }}>
                  <div className="lux-card" style={{ padding: "12px 12px 16px", textAlign: "center", borderRadius: "50% 50% 18px 18px / 30% 30% 18px 18px" }}>
                    <div className="cat-circle">
                      <img src={c.image} alt={c.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                    <div className="cat-badge"><i className={c.icon} /></div>
                    <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "0.78rem", letterSpacing: 1.5, textTransform: "uppercase", color: "var(--paper)" }}>{c.label}</div>
                    <div style={{ color: "var(--paper-dim)", fontSize: "0.78rem" }}>{c.sub}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dining Experience ── */}
      <section style={{ padding: "90px 0", background: "linear-gradient(180deg, var(--ink-900), var(--ink-950))" }}>
        <div className="container">
          <div className="row g-5 align-items-start">
            <div className="col-lg-6">
              <h2 className="lux-title" style={{ textAlign: "center", marginBottom: 28 }}>The Komla&apos;s Experience</h2>
              <div className="exp-grid">
                {EXPERIENCE_PHOTOS.map((p) => (
                  <img key={p.src} src={p.src} alt={p.alt} />
                ))}
              </div>
            </div>

            <div className="col-lg-6">
              <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", minHeight: 240, boxShadow: "0 14px 36px rgba(0,0,0,0.25)" }}>
                <img src="/pictures/jollof_main.jpeg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(20,15,10,0.35), rgba(20,15,10,0.85))" }} />
                <div style={{ position: "relative", padding: "44px 32px", textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", color: "#fff", fontSize: "clamp(1.2rem, 2.2vw, 1.6rem)", letterSpacing: 1.5, textTransform: "uppercase", lineHeight: 1.3, marginBottom: 18, maxWidth: 360 }}>
                    Catering & Private Events Available
                  </h3>
                  <a href="tel:3122878155" className="btn-light-pill" style={{ padding: "10px 24px" }}>Book Your Event</a>
                </div>
              </div>

              <h3 className="lux-title" style={{ fontSize: "1.35rem", textAlign: "center", margin: "44px 0 26px" }}>Why Choose Komla&apos;s</h3>
              <div className="row g-4">
                {WHY_CHOOSE.map((w) => (
                  <div key={w.title} className="col-6 col-md-3" style={{ textAlign: "center" }}>
                    <i className={w.icon} style={{ color: "#c9a24d", fontSize: "1.7rem", marginBottom: 10, display: "block" }} />
                    <div style={{ fontWeight: 600, fontSize: "0.85rem", color: "var(--paper)", marginBottom: 4 }}>{w.title}</div>
                    <div style={{ color: "var(--paper-dim)", fontSize: "0.75rem", lineHeight: 1.5 }}>{w.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 36, borderRadius: 18, padding: "30px 24px", textAlign: "center", background: "linear-gradient(135deg, #f4e6c1, #e6cc8a 50%, #f4e6c1)", border: "1px solid rgba(201,162,77,0.6)", boxShadow: "0 12px 30px rgba(201,162,77,0.3)" }}>
                <h3 style={{ fontFamily: "var(--font-display)", color: "var(--paper)", fontSize: "clamp(1.05rem, 2vw, 1.35rem)", letterSpacing: 1.5, textTransform: "uppercase", lineHeight: 1.35, marginBottom: 16 }}>
                  Order Your Ghanaian Feast Tonight
                </h3>
                <Link href="/food-menu" style={{ display: "inline-block", background: "#1c1712", color: "#fff", padding: "11px 30px", borderRadius: 50, fontWeight: 600, fontSize: "0.8rem", letterSpacing: 1.8, textTransform: "uppercase", textDecoration: "none" }}>
                  Order Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: "90px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <p className="lux-eyebrow">Guest Reviews</p>
            <h2 className="lux-title">Loved Across Chicago</h2>
          </div>
          <div className="row g-4">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="col-lg-4">
                <div className="lux-card" style={{ padding: 30, height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ color: "#c9a24d", letterSpacing: 3, marginBottom: 14 }}>★★★★★</div>
                  <p style={{ color: "#4a3f33", fontStyle: "italic", lineHeight: 1.75, flex: 1 }}>&ldquo;{t.text}&rdquo;</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 18, paddingTop: 16, borderTop: "1px solid rgba(201,162,77,0.2)" }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg, #e6cc8a, #c9a24d)", color: "#1c1712", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.85rem" }}>{t.initials}</div>
                    <div>
                      <div style={{ fontWeight: 600, color: "var(--paper)" }}>{t.name}</div>
                      <div style={{ color: "var(--paper-dim)", fontSize: "0.8rem" }}>{t.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </FoodKingLayout>
  );
};

export default HomePage;
