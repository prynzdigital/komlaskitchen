"use client";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import Link from "next/link";
import { useState, useEffect } from "react";
import { featuredDishes } from "@/data/menu";

const CATEGORY_CARDS = [
  {
    title: "Family Trays",
    sub: "Jollof/Fried Rice, Okra Soup, Beans & Plantain — party size",
    image: "/pictures/jollof_main_dish.jpeg",
    count: "3 trays",
  },
  {
    title: "Rice Dishes",
    sub: "Jollof Rice with Chicken & more",
    image: "/pictures/jollof.jpeg",
    count: "2 dishes",
  },
  {
    title: "Sides & Drinks",
    sub: "Banku, Kelewele, Ghana Salad, Sobolo & more",
    image: "/pictures/beans_and_plantain2.jpeg",
    count: "8 items",
  },
];

const CATEGORY_TILES = [
  { label: "Family Trays", count: "3 trays", image: "/pictures/jollof_main_dish.jpeg" },
  { label: "Rice Dishes", count: "2 dishes", image: "/pictures/jollof.jpeg" },
  { label: "Soups & Stews", count: "2 dishes", image: "/pictures/kontomire_stew.jpg" },
  { label: "Grilled Specials", count: "1 dish", image: "/pictures/dishes.jpeg" },
  { label: "Sides", count: "6 dishes", image: "/pictures/beans_and_plantain2.jpeg" },
  { label: "Beverages", count: "2 drinks", image: "/pictures/sobolo.jpg" },
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
  { image: "/pictures/kontomire_stew.jpg",   category: "🌿 Ghanaian Classic",        dish: "Kontomire Stew" },
  { image: "/pictures/okro_soup.webp",        category: "🍲 Traditional Favourite",   dish: "Okro Soup" },
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
  // {
  //   image: "/pictures/jollof.jpeg",
  //   category: "Rice Dishes",
  //   name: "Jollof Rice with Chicken",
  //   price: "$18.99",
  //   tag: "🏆 Best Seller",
  // },
  {
    image: "/pictures/kontomire_stew.jpg",
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

      {/* ── Hero Intro — big, readable "Komla's Kitchen" before any slideshow/section ── */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          background: "var(--ink-950)",
          padding: "clamp(64px, 11vw, 128px) 0 clamp(56px, 8vw, 88px)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url('/pictures/jollof_main_dish.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.16,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, oklch(0.12 0.012 230 / 0) 0%, var(--ink-950) 80%)",
          }}
        />
        <div className="container" style={{ position: "relative" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "var(--ink-800)",
                border: "1px solid var(--ink-line)",
                color: "var(--gold-400)",
                fontWeight: 700,
                fontSize: "0.8rem",
                letterSpacing: 1,
                textTransform: "uppercase",
                padding: "8px 18px",
                borderRadius: 50,
                marginBottom: 22,
              }}
            >
              🇬🇭 Authentic Ghanaian Kitchen · Chicago, IL
            </span>

            <h1
              style={{
                color: "var(--paper)",
                fontSize: "clamp(2.75rem, 9vw, 5.5rem)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                margin: "0 0 20px",
                textWrap: "balance",
              }}
            >
              Komla&apos;s Kitchen
            </h1>

            <div className="tricolor-stripe" style={{ margin: "0 auto 24px" }} />

            <p
              style={{
                color: "var(--paper-dim)",
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                lineHeight: 1.7,
                maxWidth: 560,
                margin: "0 auto 32px",
              }}
            >
              Traditional Ghanaian recipes — Jollof, Kontomire, Okro Soup, Red Red &amp;
              Sobolo — cooked fresh and delivered hot across Chicago.
            </p>

            <div
              className="d-flex justify-content-center flex-wrap"
              style={{ gap: 12, marginBottom: 36 }}
            >
              <a
                href="tel:3122878155"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "var(--red-500)",
                  color: "var(--paper)",
                  padding: "15px 32px",
                  borderRadius: 12,
                  fontWeight: 800,
                  textDecoration: "none",
                  fontSize: "1rem",
                  boxShadow: "0 6px 24px oklch(0.56 0.2 25 / 0.4)",
                  transition: "background 0.2s, transform 0.15s ease-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--red-600)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "var(--red-500)")}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <i className="fas fa-phone" /> Order Now
              </a>
              <Link
                href="/food-menu"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  background: "transparent",
                  color: "var(--paper)",
                  border: "2px solid var(--ink-line-hover)",
                  padding: "13px 30px",
                  borderRadius: 12,
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "0.95rem",
                  transition: "border-color 0.2s, transform 0.15s ease-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--gold-400)")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--ink-line-hover)")}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                <i className="fas fa-utensils" /> View Menu
              </Link>
            </div>

            {/* Trust badges */}
            <div
              className="d-flex justify-content-center flex-wrap"
              style={{ gap: 10 }}
            >
              {[
                { icon: "fas fa-motorcycle", label: "Same-Day Delivery", color: "var(--red-400)" },
                { icon: "fas fa-fire", label: "Cooked Fresh Daily", color: "var(--gold-400)" },
                { icon: "fas fa-leaf", label: "Traditional Recipes", color: "var(--green-400)" },
              ].map((badge) => (
                <span
                  key={badge.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "var(--ink-800)",
                    border: "1px solid var(--ink-line)",
                    color: "var(--paper-dim)",
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    padding: "8px 16px",
                    borderRadius: 50,
                  }}
                >
                  <i className={badge.icon} style={{ color: badge.color }} />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {/* Scroll cue */}
          <div
            className="scroll-cue d-none d-md-flex"
            style={{
              justifyContent: "center",
              marginTop: 56,
              color: "var(--paper-faint)",
            }}
            aria-hidden="true"
          >
            <i className="fas fa-chevron-down" />
          </div>
        </div>
      </section>

      {/* ── 4 Feature Boxes ── */}
      <div style={{ background: "var(--ink-900)", borderBottom: "1px solid var(--ink-line)" }}>
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
                    background:
                      f.icon === "fas fa-leaf" ? "oklch(0.6 0.14 150 / 0.18)" : "oklch(0.56 0.2 25 / 0.18)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <i
                    className={f.icon}
                    style={{ color: f.icon === "fas fa-leaf" ? "var(--green-500)" : "var(--red-500)", fontSize: "1rem" }}
                  />
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
      <section style={{ background: "var(--ink-950)", padding: "24px 0 32px" }}>
        <div className="container">
          <div className="hero-split">

            {/* Left large card (~70%) — fade slideshow */}
            <div
              className="hero-main-card"
              style={{
                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                boxShadow: "var(--shadow-border)",
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
                      background: "var(--gold-400)",
                      color: "var(--ink-950)",
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

                <h2
                  style={{
                    color: "#fff",
                    fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
                    fontWeight: 700,
                    lineHeight: 1.1,
                    marginBottom: 14,
                  }}
                >
                  Authentic Ghanaian Food,{" "}
                  <span style={{ color: "var(--gold-400)" }}>Straight to Your Door.</span>
                </h2>

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
                      color: "var(--ink-950)",
                      padding: "12px 26px",
                      borderRadius: 50,
                      fontWeight: 800,
                      textDecoration: "none",
                      fontSize: "0.9rem",
                    }}
                  >
                    <i className="fas fa-phone" style={{ color: "var(--red-500)" }} />
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

                {/* Dot indicators — 44px hit area around each small visual pill */}
                <div style={{ display: "flex", alignItems: "center" }}>
                  {SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlideIdx(i)}
                      aria-label={`Go to slide ${i + 1}`}
                      style={{
                        width: 32,
                        height: 32,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          width: i === slideIdx ? 28 : 8,
                          height: 8,
                          borderRadius: 4,
                          background: i === slideIdx ? "#fff" : "rgba(255,255,255,0.4)",
                          transition: "all 0.35s ease",
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right card — Meal of the Week slide-left carousel */}
            <div
              className="hero-week-card"
              style={{
                borderRadius: 20,
                overflow: "hidden",
                position: "relative",
                background: "var(--ink-800)",
                boxShadow: "var(--shadow-border)",
              }}
            >
              {/* Header bar — overlaid at top */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  background: "oklch(0.47 0.185 24 / 0.92)",
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
                          background: "var(--gold-400)",
                          color: "var(--ink-950)",
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
                            color: "var(--gold-400)",
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
                          <span style={{ color: "var(--gold-400)", fontWeight: 800, fontSize: "1.1rem" }}>
                            {dish.price}
                          </span>
                          <a
                            href="tel:3122878155"
                            style={{
                              background: "var(--red-500)",
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
                    width: 44,
                    height: 44,
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
                    width: 44,
                    height: 44,
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

                {/* Dot indicators — enlarged hit area around each small visual pill */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 8,
                    left: 0,
                    right: 0,
                    display: "flex",
                    justifyContent: "center",
                    zIndex: 4,
                  }}
                >
                  {WEEKLY_DISHES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setWeekSlide(i)}
                      aria-label={`Go to dish ${i + 1}`}
                      style={{
                        width: 28,
                        height: 28,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          width: i === weekSlide ? 22 : 7,
                          height: 7,
                          borderRadius: 4,
                          background: i === weekSlide ? "#fff" : "rgba(255,255,255,0.4)",
                          transition: "all 0.3s ease",
                        }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Category Showcase ── */}
      <section style={{ background: "var(--ink-950)", padding: "80px 0" }}>
        <div className="container">
          <div
            className="d-flex justify-content-between align-items-end flex-wrap gap-3"
            style={{ marginBottom: 40 }}
          >
            <div>
              <p
                style={{
                  color: "var(--red-500)",
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
                Explore Our <span style={{ color: "var(--gold-400)" }}>Specialties</span>
              </h2>
            </div>
            <Link
              href="/food-menu"
              style={{
                color: "var(--gold-400)",
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
                      boxShadow: "var(--shadow-border)",
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
                        background: "var(--red-500)",
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
      <section style={{ background: "var(--ink-900)", padding: "64px 0" }}>
        <div className="container">
          <div style={{ marginBottom: 36 }}>
            <p
              style={{
                color: "var(--red-500)",
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
              Find Your <span style={{ color: "var(--gold-400)" }}>Favorite</span>
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
                      background: "var(--ink-800)",
                      borderRadius: 16,
                      overflow: "hidden",
                      boxShadow: "var(--shadow-border)",
                      textAlign: "center",
                      transition: "transform 0.2s, box-shadow 0.2s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "var(--shadow-border-hover)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "var(--shadow-border)";
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
      <section style={{ background: "var(--ink-950)", padding: "80px 0" }}>
        <div className="container">
          <div
            className="d-flex justify-content-between align-items-end flex-wrap gap-3"
            style={{ marginBottom: 40 }}
          >
            <div>
              <p
                style={{
                  color: "var(--red-500)",
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
                Popular <span style={{ color: "var(--gold-400)" }}>Dishes</span>
              </h2>
            </div>
            <Link
              href="/food-menu"
              style={{
                color: "var(--gold-400)",
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
                    background: "var(--ink-800)",
                    borderRadius: 16,
                    overflow: "hidden",
                    boxShadow: "var(--shadow-border)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.25s, box-shadow 0.25s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "var(--shadow-border-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "var(--shadow-border)";
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
                        background: "var(--red-500)",
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
                        color: "var(--gold-400)",
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
                        background: "var(--red-500)",
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: 10,
                        fontWeight: 700,
                        textDecoration: "none",
                        fontSize: "0.9rem",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--red-600)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--red-500)")}
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
                border: "2px solid oklch(0.8 0.15 82 / 0.6)",
                color: "var(--gold-400)",
                padding: "13px 36px",
                borderRadius: 12,
                fontWeight: 700,
                textDecoration: "none",
                fontSize: "0.95rem",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--gold-400)";
                e.currentTarget.style.color = "var(--ink-950)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--gold-400)";
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
          background: "linear-gradient(135deg, var(--ink-950) 0%, var(--red-600) 50%, var(--red-500) 100%)",
          padding: "64px 0",
        }}
      >
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-8">
              <p
                style={{
                  color: "var(--gold-400)",
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
                <span style={{ color: "var(--gold-400)" }}>$50</span>
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
                    background: "var(--gold-400)",
                    color: "var(--ink-950)",
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
      <section style={{ background: "var(--ink-900)", padding: "80px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p
              style={{
                color: "var(--red-500)",
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
              How It <span style={{ color: "var(--gold-400)" }}>Works</span>
            </h2>
          </div>
          <div className="row g-4 justify-content-center">
            {STEPS.map((s, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div
                  style={{
                    background: "var(--ink-800)",
                    boxShadow: "var(--shadow-border)",
                    borderRadius: 20,
                    padding: "2.5rem 2rem",
                    textAlign: "center",
                    height: "100%",
                    position: "relative",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: 16 }}>{s.emoji}</div>
                  <div
                    style={{
                      position: "absolute",
                      top: 20,
                      right: 20,
                      background: "oklch(0.8 0.15 82 / 0.15)",
                      color: "var(--gold-400)",
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
      <section style={{ background: "var(--ink-950)", padding: "80px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p
              style={{
                color: "var(--red-500)",
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
              What Our <span style={{ color: "var(--gold-400)" }}>Customers</span> Say
            </h2>
          </div>
          <div className="row g-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="col-lg-4">
                <div
                  style={{
                    background: "var(--ink-800)",
                    borderRadius: 20,
                    padding: "2rem",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "var(--shadow-border)",
                  }}
                >
                  <div style={{ color: "var(--gold-400)", fontSize: "1.1rem", marginBottom: 16 }}>
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
                        background: "var(--red-500)",
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
                color: "var(--gold-400)",
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
              Ready to Taste <span style={{ color: "var(--gold-400)" }}>Home</span>{" "}
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
                  background: "var(--red-500)",
                  color: "#fff",
                  padding: "15px 34px",
                  borderRadius: 12,
                  fontWeight: 800,
                  textDecoration: "none",
                  fontSize: "1.05rem",
                  boxShadow: "0 6px 24px oklch(0.56 0.2 25 / 0.4)",
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
