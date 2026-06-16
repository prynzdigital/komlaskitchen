"use client";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { featuredDishes } from "@/data/menu";

const CATEGORY_CARDS = [
  {
    title: "Rice Dishes",
    sub: "Ghanaian Party Jollof, Fried Rice & more",
    image: "/pictures/jollof_main_dish.jpeg",
    count: "4 dishes",
  },
  {
    title: "Soups & Stews",
    sub: "Kontomire, Okro Soup, Light Soup & more",
    image: "/pictures/kontomire_stew.jpeg",
    count: "3 dishes",
  },
  {
    title: "Sides & Drinks",
    sub: "Red Red, Kelewele, Sobolo & more",
    image: "/pictures/beans_and_plantain.jpeg",
    count: "4 items",
  },
];

const CATEGORY_TILES = [
  { label: "Rice Dishes", count: "4 dishes", image: "/pictures/jollof.jpeg" },
  { label: "Soups & Stews", count: "3 dishes", image: "/pictures/okro_soup.jpeg" },
  { label: "Grilled Specials", count: "1 dish", image: "/pictures/dishes.jpeg" },
  { label: "Sides", count: "2 dishes", image: "/pictures/beans_and_plantain.jpeg" },
  { label: "Beverages", count: "2 drinks", image: "/pictures/jollof_main.jpeg" },
];

const STEPS = [
  {
    emoji: "🍛",
    step: "01",
    title: "Browse Our Menu",
    desc: "Explore our Ghanaian menu — Party Jollof, Kontomire, Okro Soup, Red Red, Sobolo and more, all made from traditional recipes.",
  },
  {
    emoji: "📞",
    step: "02",
    title: "Call to Order",
    desc: "Call us at 312-287-8155. We'll confirm your order, delivery address, and estimated time — quick and easy.",
  },
  {
    emoji: "🚚",
    step: "03",
    title: "Delivered Hot & Fresh",
    desc: "Sit back — your freshly cooked Ghanaian meal is packed hot and on its way straight to your door.",
  },
];

const TESTIMONIALS = [
  {
    initials: "A.M.",
    name: "Abena M.",
    location: "Chicago, IL",
    rating: 5,
    text: "The Party Jollof here is smoky, perfectly seasoned and tastes exactly like back home in Ghana. Best Ghanaian food in Chicago, no competition!",
  },
  {
    initials: "K.B.",
    name: "Kwame B.",
    location: "Oak Park, IL",
    rating: 5,
    text: "Kontomire stew that actually tastes authentic — just like my grandma's. Delivery was fast and the food arrived piping hot. My weekly go-to!",
  },
  {
    initials: "E.A.",
    name: "Esi A.",
    location: "Evanston, IL",
    rating: 5,
    text: "The Red Red (beans & plantain) and Sobolo are unmatched. So glad Chicago finally has proper Ghanaian food. Komla's Kitchen is a blessing!",
  },
];

const SLIDES = [
  { image: "/pictures/jollof_main_dish.jpeg", category: "🔥 Ghanaian Party Jollof",   dish: "Jollof Rice" },
  { image: "/pictures/kontomire_stew.jpeg",   category: "🌿 Ghanaian Classic",        dish: "Kontomire Stew" },
  { image: "/pictures/okro_soup.jpeg",        category: "🍲 Traditional Favourite",   dish: "Okro Soup" },
  { image: "/pictures/beans_and_plantain.jpeg", category: "🌱 Red Red — Ghanaian Style", dish: "Beans & Plantain" },
  { image: "/pictures/vegetable_rice.jpeg",   category: "🥗 Cooked Fresh Daily",      dish: "Vegetable Fried Rice" },
  { image: "/pictures/dishes.jpeg",           category: "🎉 Celebration Platter",     dish: "Grilled Feast" },
];

const TICKER_ITEMS = [
  "🇬🇭 Authentic Ghanaian cuisine, made fresh daily",
  "✦",
  "🚚 Free delivery on orders over $50",
  "✦",
  "⏰ Order by 3 PM for same-day delivery",
  "✦",
  "🍛 Try our legendary Party Jollof Rice",
  "✦",
  "📞 Call us: 312-287-8155",
  "✦",
  "🌿 Kontomire · Okro Soup · Red Red · Sobolo",
  "✦",
  "⭐ Open Mon–Sun, 11 AM – 9 PM · Chicago, IL",
  "✦",
];

const FEATURES = [
  {
    icon: "fas fa-motorcycle",
    title: "Same-Day Delivery",
    desc: "Order by 3 PM for same-day delivery across Chicago",
  },
  {
    icon: "fas fa-leaf",
    title: "Ghanaian Recipes",
    desc: "100% traditional recipes — Jollof, Kontomire, Okro & more",
  },
  {
    icon: "fas fa-fire",
    title: "Cooked Fresh Daily",
    desc: "Every dish prepared to order with quality ingredients",
  },
  {
    icon: "fas fa-phone",
    title: "Easy Ordering",
    desc: "Just call 312-287-8155 — we make it simple",
  },
];

const WEEKLY_DISHES = [
  {
    image: "/pictures/jollof_main_dish.jpeg",
    category: "Rice Dishes",
    name: "Jollof Rice",
    price: "$14.99",
    tag: "🏆 Best Seller",
  },
  {
    image: "/pictures/kontomire_stew.jpeg",
    category: "Soups & Stews",
    name: "Kontomire Stew",
    price: "$15.99",
    tag: "👨‍🍳 Chef's Pick",
  },
  {
    image: "/pictures/sobolo.jpg",
    category: "Beverages",
    name: "Sobolo Drink",
    price: "$4.99",
    tag: "❤️ Fan Favorite",
  },
];

const HomePage = () => {
  const [slideIdx, setSlideIdx] = useState(0);
  const [weekSlide, setWeekSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setSlideIdx((i) => (i + 1) % SLIDES.length), 4500);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setWeekSlide((i) => (i + 1) % WEEKLY_DISHES.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <FoodKingLayout>

      {/* ── 4 Feature Boxes ── */}
      <div style={{ background: "rgba(10,5,2,0.78)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div className="container">
          <div className="row g-0">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="col-6 col-md-3"
                style={{
                  borderRight: i < 3 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  padding: "20px 24px",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "rgba(232,39,42,0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i className={f.icon} style={{ color: "#e8272a", fontSize: "1rem" }} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff", marginBottom: 2 }}>
                    {f.title}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)", lineHeight: 1.4 }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Split Hero ── */}
      <section style={{ background: "rgba(8,4,1,0.72)", padding: "24px 0 32px" }}>
        <div className="container">
          <div style={{ display: "flex", gap: 16, height: 480 }}>

            {/* Left large card (~70%) — fade slideshow */}
            <div
              style={{
                flex: "0 0 68%",
                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                boxShadow: "0 0 0 2px rgba(255,255,255,0.65), 0 0 50px rgba(255,255,255,0.22), 0 20px 60px rgba(0,0,0,0.8)",
              }}
            >
              {/* Slide images — fade between them */}
              {SLIDES.map((slide, i) => (
                <img
                  key={slide.image}
                  src={slide.image}
                  alt={slide.dish}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    opacity: i === slideIdx ? 1 : 0,
                    transition: "opacity 1.2s ease",
                    zIndex: i === slideIdx ? 1 : 0,
                  }}
                />
              ))}

              {/* Dark overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 2,
                  background:
                    "linear-gradient(135deg, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.45) 60%, transparent 100%)",
                }}
              />

              {/* Content */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 3,
                  padding: "36px 40px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                }}
              >
                {/* Slide category badge */}
                <div style={{ marginBottom: 14 }}>
                  <span
                    style={{
                      background: "#f5a623",
                      color: "#1a1a1a",
                      fontWeight: 800,
                      fontSize: "0.78rem",
                      padding: "6px 16px",
                      borderRadius: 50,
                      textTransform: "uppercase",
                      letterSpacing: 0.5,
                      transition: "opacity 0.6s",
                    }}
                  >
                    {SLIDES[slideIdx].category}
                  </span>
                </div>

                <h1
                  style={{
                    color: "#fff",
                    fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                    fontWeight: 900,
                    lineHeight: 1.1,
                    marginBottom: 14,
                  }}
                >
                  Authentic Ghanaian Food,{" "}
                  <span style={{ color: "#f5a623" }}>Straight to Your Door.</span>
                </h1>

                <p
                  style={{
                    color: "rgba(255,255,255,0.85)",
                    fontSize: "1rem",
                    lineHeight: 1.6,
                    maxWidth: 440,
                    marginBottom: 24,
                  }}
                >
                  From smoky Party Jollof to rich Kontomire Stew and refreshing
                  Sobolo — traditional Ghanaian recipes cooked fresh and delivered
                  hot across Chicago.
                </p>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 20 }}>
                  <a
                    href="tel:3122878155"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "#fff",
                      color: "#1a1a1a",
                      padding: "12px 26px",
                      borderRadius: 50,
                      fontWeight: 800,
                      textDecoration: "none",
                      fontSize: "0.9rem",
                    }}
                  >
                    <i className="fas fa-phone" style={{ color: "#e8272a" }} />
                    Order Now →
                  </a>
                  <Link
                    href="/food-menu"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                      background: "rgba(255,255,255,0.15)",
                      color: "#fff",
                      border: "2px solid rgba(255,255,255,0.5)",
                      padding: "12px 24px",
                      borderRadius: 50,
                      fontWeight: 700,
                      textDecoration: "none",
                      fontSize: "0.9rem",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    All Dishes
                  </Link>
                </div>

                {/* Dot indicators */}
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIdx(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      style={{
                        width: i === slideIdx ? 28 : 8,
                        height: 8,
                        borderRadius: 4,
                        background: i === slideIdx ? "#fff" : "rgba(255,255,255,0.4)",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        transition: "all 0.35s ease",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right card — Meal of the Week slide-left carousel */}
            <div
              style={{
                flex: "0 0 calc(32% - 16px)",
                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                background: "#111",
                boxShadow: "0 0 0 2px rgba(255,255,255,0.65), 0 0 50px rgba(255,255,255,0.22), 0 20px 60px rgba(0,0,0,0.8)",
              }}
            >
              {/* Header bar — overlaid at top */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  background: "rgba(200,20,22,0.92)",
                  backdropFilter: "blur(4px)",
                  color: "#fff",
                  textAlign: "center",
                  padding: "10px 16px",
                  fontWeight: 800,
                  fontSize: "0.82rem",
                  textTransform: "uppercase",
                  letterSpacing: 1.5,
                  zIndex: 10,
                }}
              >
                🌟 Meal of the Week
              </div>

              {/* Slide track — fills full card */}
              <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
                <div
                  style={{
                    display: "flex",
                    height: "100%",
                    transform: `translateX(-${weekSlide * 100}%)`,
                    transition: "transform 0.55s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {WEEKLY_DISHES.map((dish, i) => (
                    <div
                      key={i}
                      style={{
                        minWidth: "100%",
                        height: "100%",
                        position: "relative",
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      {/* Gradient */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.15) 55%)",
                        }}
                      />
                      {/* Tag */}
                      <div
                        style={{
                          position: "absolute",
                          top: 52,
                          left: 16,
                          background: "#f5a623",
                          color: "#1a1a1a",
                          fontSize: "0.72rem",
                          fontWeight: 800,
                          padding: "4px 12px",
                          borderRadius: 50,
                        }}
                      >
                        {dish.tag}
                      </div>
                      {/* Bottom info */}
                      <div
                        style={{
                          position: "absolute",
                          bottom: 52,
                          left: 20,
                          right: 20,
                        }}
                      >
                        <div
                          style={{
                            color: "#f5a623",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: 1,
                            marginBottom: 4,
                          }}
                        >
                          {dish.category}
                        </div>
                        <div
                          style={{
                            color: "#fff",
                            fontWeight: 800,
                            fontSize: "1.35rem",
                            marginBottom: 6,
                          }}
                        >
                          {dish.name}
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <span style={{ color: "#f5a623", fontWeight: 800, fontSize: "1.1rem" }}>
                            {dish.price}
                          </span>
                          <a
                            href="tel:3122878155"
                            style={{
                              background: "#e8272a",
                              color: "#fff",
                              fontSize: "0.75rem",
                              fontWeight: 700,
                              padding: "6px 14px",
                              borderRadius: 50,
                              textDecoration: "none",
                            }}
                          >
                            Order →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Prev / Next arrows */}
                <button
                  onClick={() => setWeekSlide((i) => (i - 1 + WEEKLY_DISHES.length) % WEEKLY_DISHES.length)}
                  aria-label="Previous dish"
                  style={{
                    position: "absolute",
                    left: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.18)",
                    border: "none",
                    color: "#fff",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 4,
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <i className="fas fa-chevron-left" />
                </button>
                <button
                  onClick={() => setWeekSlide((i) => (i + 1) % WEEKLY_DISHES.length)}
                  aria-label="Next dish"
                  style={{
                    position: "absolute",
                    right: 10,
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(255,255,255,0.18)",
                    border: "none",
                    color: "#fff",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    cursor: "pointer",
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 4,
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <i className="fas fa-chevron-right" />
                </button>

                {/* Dot indicators */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 18,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    gap: 6,
                    zIndex: 4,
                  }}
                >
                  {WEEKLY_DISHES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setWeekSlide(i)}
                      aria-label={`Go to dish ${i + 1}`}
                      style={{
                        width: i === weekSlide ? 22 : 7,
                        height: 7,
                        borderRadius: 4,
                        background: i === weekSlide ? "#fff" : "rgba(255,255,255,0.4)",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        transition: "all 0.3s ease",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Category Showcase ── */}
      <section style={{ background: "rgba(10,5,2,0.82)", padding: "80px 0" }}>
        <div className="container">
          <div
            className="d-flex justify-content-between align-items-end flex-wrap gap-3"
            style={{ marginBottom: 40 }}
          >
            <div>
              <p
                style={{
                  color: "#e8272a",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  fontSize: "0.8rem",
                  marginBottom: 6,
                }}
              >
                🇬🇭 GHANAIAN CUISINE
              </p>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, margin: 0, color: "#fff" }}>
                Explore Our <span style={{ color: "#f5a623" }}>Specialties</span>
              </h2>
            </div>
            <Link
              href="/food-menu"
              style={{
                color: "#f5a623",
                fontWeight: 600,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.95rem",
              }}
            >
              View Full Menu <i className="fas fa-arrow-right" />
            </Link>
          </div>
          <div className="row g-4">
            {CATEGORY_CARDS.map((cat, i) => (
              <div key={i} className="col-lg-4">
                <Link href="/food-menu" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      borderRadius: 20,
                      overflow: "hidden",
                      position: "relative",
                      height: 360,
                      cursor: "pointer",
                      boxShadow: "0 0 0 2px rgba(255,255,255,0.65), 0 0 44px rgba(255,255,255,0.2), 0 16px 48px rgba(0,0,0,0.75)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.querySelector("img").style.transform = "scale(1.06)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.querySelector("img").style.transform = "scale(1)";
                    }}
                  >
                    <img
                      src={cat.image}
                      alt={cat.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.5s ease",
                      }}
                    />
                    {/* Dish count badge */}
                    <span
                      style={{
                        position: "absolute",
                        top: 14,
                        left: 14,
                        background: "#e8272a",
                        color: "#fff",
                        borderRadius: 20,
                        padding: "4px 14px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {cat.count}
                    </span>
                    {/* Solid dark text band at bottom */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "rgba(0,0,0,0.78)",
                        padding: "18px 22px 22px",
                      }}
                    >
                      <h3
                        style={{
                          color: "#fff",
                          fontWeight: 800,
                          fontSize: "1.35rem",
                          margin: "0 0 4px",
                          letterSpacing: 0.3,
                        }}
                      >
                        {cat.title}
                      </h3>
                      <p style={{ color: "rgba(255,255,255,0.82)", margin: 0, fontSize: "0.88rem" }}>
                        {cat.sub}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Browse by Category Grid ── */}
      <section style={{ background: "rgba(15,8,3,0.88)", padding: "64px 0" }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <p
              style={{
                color: "#e8272a",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 2,
                fontSize: "0.8rem",
                marginBottom: 6,
              }}
            >
              BROWSE BY CATEGORY
            </p>
            <h2 style={{ fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 800, marginBottom: 4, color: "#fff" }}>
              Find Your <span style={{ color: "#f5a623" }}>Favorite</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.5)", margin: 0 }}>
              All dishes made fresh daily with traditional African recipes
            </p>
          </div>
          <div className="row g-3">
            {CATEGORY_TILES.map((tile, i) => (
              <div key={i} className="col-6 col-md-4 col-lg">
                <Link href="/food-menu" style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: 16,
                      overflow: "hidden",
                      boxShadow: "0 0 0 2px rgba(255,255,255,0.6), 0 0 36px rgba(255,255,255,0.18), 0 10px 36px rgba(0,0,0,0.65)",
                      border: "1px solid rgba(255,255,255,0.5)",
                      textAlign: "center",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.12)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)";
                    }}
                  >
                    <div style={{ height: 100, overflow: "hidden" }}>
                      <img
                        src={tile.image}
                        alt={tile.label}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    </div>
                    <div style={{ padding: "12px 8px" }}>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#fff" }}>
                        {tile.label}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.76rem", marginTop: 2 }}>
                        {tile.count}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Popular Dishes ── */}
      <section style={{ background: "rgba(10,5,2,0.82)", padding: "80px 0" }}>
        <div className="container">
          <div
            className="d-flex justify-content-between align-items-end flex-wrap gap-3"
            style={{ marginBottom: 40 }}
          >
            <div>
              <p
                style={{
                  color: "#e8272a",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  fontSize: "0.8rem",
                  marginBottom: 6,
                }}
              >
                CUSTOMER FAVORITES
              </p>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, margin: 0, color: "#fff" }}>
                Popular <span style={{ color: "#f5a623" }}>Dishes</span>
              </h2>
            </div>
            <Link
              href="/food-menu"
              style={{
                color: "#f5a623",
                fontWeight: 600,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.95rem",
              }}
            >
              See All Dishes <i className="fas fa-arrow-right" />
            </Link>
          </div>
          <div className="row g-4">
            {featuredDishes.map((dish) => (
              <div key={dish.id} className="col-xl-4 col-lg-6 col-md-6">
                <div
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "0 0 0 2px rgba(255,255,255,0.6), 0 0 36px rgba(255,255,255,0.18), 0 10px 40px rgba(0,0,0,0.7)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid rgba(255,255,255,0.5)",
                    transition: "transform 0.25s, box-shadow 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.13)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.08)";
                  }}
                >
                  <div style={{ position: "relative", height: 220, overflow: "hidden" }}>
                    <img
                      src={dish.image}
                      alt={dish.alt}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: 12,
                        left: 12,
                        background: "#e8272a",
                        color: "#fff",
                        borderRadius: 20,
                        padding: "4px 12px",
                        fontSize: "0.72rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      🔥 Popular
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        background: "rgba(0,0,0,0.65)",
                        backdropFilter: "blur(4px)",
                        color: "#f5a623",
                        borderRadius: 20,
                        padding: "4px 12px",
                        fontWeight: 800,
                        fontSize: "0.95rem",
                      }}
                    >
                      {dish.price}
                    </span>
                  </div>
                  <div
                    style={{
                      padding: "1.25rem",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <h4 style={{ fontWeight: 700, marginBottom: 6, fontSize: "1.05rem", color: "#fff" }}>
                      {dish.name}
                    </h4>
                    <p
                      style={{
                        color: "rgba(255,255,255,0.55)",
                        fontSize: "0.85rem",
                        lineHeight: 1.6,
                        flex: 1,
                        marginBottom: "1rem",
                      }}
                    >
                      {dish.description}
                    </p>
                    <a
                      href="tel:3122878155"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        background: "#e8272a",
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: 10,
                        fontWeight: 700,
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#c01e20")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#e8272a")}
                    >
                      <i className="fas fa-phone" /> Call to Order
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <Link
              href="/food-menu"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                border: "2px solid rgba(245,166,35,0.6)",
                color: "#f5a623",
                padding: "13px 36px",
                borderRadius: 12,
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.95rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#f5a623";
                e.currentTarget.style.color = "#1a0a04";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#f5a623";
              }}
            >
              View Full Menu <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Delivery Promo Banner ── */}
      <section
        style={{
          background: "linear-gradient(135deg, #1a0505 0%, #c01e20 50%, #e8272a 100%)",
          padding: "64px 0",
        }}
      >
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <p
                style={{
                  color: "#f5a623",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  fontSize: "0.8rem",
                  marginBottom: 12,
                }}
              >
                🚚 LIMITED OFFER
              </p>
              <h2
                style={{
                  color: "#fff",
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  fontWeight: 800,
                  marginBottom: 14,
                }}
              >
                Free Delivery on Orders Over{" "}
                <span style={{ color: "#f5a623" }}>$50</span>
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "1rem",
                  lineHeight: 1.8,
                  maxWidth: 560,
                  margin: 0,
                }}
              >
                We deliver across all Chicago zones and surrounding
                neighborhoods. Order by 3 PM for same-day delivery. Call us
                now!
              </p>
            </div>
            <div className="col-lg-4">
              <div className="d-flex flex-column gap-3 align-items-lg-end">
                <a
                  href="tel:3122878155"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    background: "#f5a623",
                    color: "#1a1a1a",
                    padding: "15px 30px",
                    borderRadius: 12,
                    fontWeight: 800,
                    textDecoration: "none",
                    fontSize: "1rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  <i className="fas fa-phone" /> 312-287-8155
                </a>
                <Link
                  href="/food-menu"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "rgba(255,255,255,0.12)",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.3)",
                    padding: "15px 30px",
                    borderRadius: 12,
                    fontWeight: 700,
                    textDecoration: "none",
                    fontSize: "0.95rem",
                    whiteSpace: "nowrap",
                  }}
                >
                  <i className="fas fa-utensils" /> Browse Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section style={{ background: "rgba(10,5,2,0.82)", padding: "80px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p
              style={{
                color: "#e8272a",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 2,
                fontSize: "0.8rem",
                marginBottom: 8,
              }}
            >
              SIMPLE &amp; EASY
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, margin: 0, color: "#fff" }}>
              How It <span style={{ color: "#f5a623" }}>Works</span>
            </h2>
          </div>
          <div className="row g-4 justify-content-center">
            {STEPS.map((s, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.5)",
                    boxShadow: "0 0 0 2px rgba(255,255,255,0.55), 0 0 36px rgba(255,255,255,0.18), 0 10px 36px rgba(0,0,0,0.65)",
                    borderRadius: 20,
                    padding: "2.5rem 2rem",
                    textAlign: "center",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                    height: "100%",
                    position: "relative",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: 16 }}>{s.emoji}</div>
                  <div
                    style={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                      background: "rgba(245,166,35,0.15)",
                      color: "#f5a623",
                      borderRadius: 10,
                      padding: "3px 10px",
                      fontSize: "0.78rem",
                      fontWeight: 800,
                    }}
                  >
                    {s.step}
                  </div>
                  <h4 style={{ fontWeight: 800, marginBottom: 12, color: "#fff" }}>{s.title}</h4>
                  <p style={{ color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ background: "rgba(15,8,3,0.88)", padding: "80px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p
              style={{
                color: "#e8272a",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 2,
                fontSize: "0.8rem",
                marginBottom: 8,
              }}
            >
              CUSTOMER LOVE ❤️
            </p>
            <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, margin: 0, color: "#fff" }}>
              What Our <span style={{ color: "#f5a623" }}>Customers</span> Say
            </h2>
          </div>
          <div className="row g-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="col-lg-4">
                <div
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    borderRadius: 20,
                    padding: "2rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    border: "1px solid rgba(255,255,255,0.5)",
                    boxShadow: "0 0 0 2px rgba(255,255,255,0.55), 0 0 36px rgba(255,255,255,0.18), 0 10px 36px rgba(0,0,0,0.65)",
                  }}
                >
                  <div style={{ color: "#f5a623", fontSize: "1.1rem", marginBottom: 16 }}>
                    {"★".repeat(t.rating)}
                  </div>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      lineHeight: 1.75,
                      flex: 1,
                      fontStyle: "italic",
                      marginBottom: 20,
                    }}
                  >
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <div className="d-flex align-items-center gap-3">
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: "50%",
                        background: "#e8272a",
                        color: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 800,
                        fontSize: "0.82rem",
                        flexShrink: 0,
                      }}
                    >
                      {t.initials}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#fff" }}>{t.name}</div>
                      <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.8rem" }}>{t.location}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.72)), url('/pictures/dishes.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "100px 0",
          textAlign: "center",
        }}
      >
        <div className="container">
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <p
              style={{
                color: "#f5a623",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 2,
                fontSize: "0.8rem",
                marginBottom: 16,
              }}
            >
              READY TO ORDER?
            </p>
            <h2
              style={{
                color: "#fff",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 800,
                marginBottom: 16,
              }}
            >
              Ready to Taste <span style={{ color: "#f5a623" }}>Home</span>{" "}
              Again?
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.82)",
                fontSize: "1.05rem",
                lineHeight: 1.8,
                marginBottom: 40,
              }}
            >
              Authentic African flavors, made with love and delivered fresh —
              right to your doorstep across Chicago.
            </p>
            <div className="d-flex justify-content-center gap-3 flex-wrap">
              <a
                href="tel:3122878155"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "#e8272a",
                  color: "#fff",
                  padding: "15px 34px",
                  borderRadius: 12,
                  fontWeight: 800,
                  textDecoration: "none",
                  fontSize: "1.05rem",
                  boxShadow: "0 6px 24px rgba(232,39,42,0.4)",
                }}
              >
                <i className="fas fa-phone" /> Order Now · 312-287-8155
              </a>
              <Link
                href="/food-menu"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  border: "2px solid rgba(255,255,255,0.4)",
                  padding: "15px 32px",
                  borderRadius: 12,
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "0.95rem",
                }}
              >
                <i className="fas fa-utensils" /> Browse Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

    </FoodKingLayout>
  );
};

export default HomePage;
