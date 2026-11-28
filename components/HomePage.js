"use client";
import "@/app/home.css";
import ReviewsSection from "@/components/ReviewsSection";
import HeroSlider from "@/components/HeroSlider";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import InstallPrompt from "@/components/InstallPrompt";
import { useCart } from "@/context/CartContext";
import WeeklySchedule from "@/components/WeeklySchedule";
import OfferBanner from "@/components/OfferBanner";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSite } from "@/components/SiteDataProvider";
import { computeUnitPrice, describeCartItemSelections, formatCurrency } from "@/lib/pricing";


const CategoryStrip = () => {
  const CRAVINGS = useSite().home.cravings || [];
  const track = useRef(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const sync = () => {
    const el = track.current;
    if (!el) return;
    setEdge({ start: el.scrollLeft < 12, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 12 });
  };

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  const nudge = (dir) => track.current?.scrollBy({ left: dir * track.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div className="kw-strip reveal">
      <button type="button" className="kw-arrow kw-arrow-l" aria-label="Scroll categories left" onClick={() => nudge(-1)} disabled={edge.start}>
        <i className="fas fa-chevron-left" />
      </button>
      <div className="kw-strip-track" ref={track} onScroll={sync}>
        {CRAVINGS.map((c) => (
          <Link key={c.label} href="/food-menu" className="kw-circ">
            <span className="kw-circ-img">
              <img src={c.image} alt="" loading="lazy" />
            </span>
            <span className="kw-circ-label">{c.label}</span>
          </Link>
        ))}
      </div>
      <button type="button" className="kw-arrow kw-arrow-r" aria-label="Scroll categories right" onClick={() => nudge(1)} disabled={edge.end}>
        <i className="fas fa-chevron-right" />
      </button>
    </div>
  );
};

// Same starting choices the menu card uses, so "+" adds exactly what the menu would.
const defaultCartItem = (item) => {
  const selectedSize = item.sizes?.[0]?.label ?? null;
  const selectedProtein = item.proteinAddOns?.[0]?.name ?? item.proteinOptions?.[0] ?? null;
  return {
    menuItemId: item.id,
    name: item.name,
    image: item.image,
    unitPrice: computeUnitPrice(item, { size: selectedSize, protein: selectedProtein }),
    quantity: 1,
    selectedSize,
    selectedBase: item.baseOptions?.[0] ?? null,
    selectedProtein,
    selectedProteins: item.includedProteins ? [...item.includedProteins] : undefined,
  };
};

const DishCard = ({ dish, delay }) => {
  const { menu } = useSite();
  const categoryLabel = (id) => menu.categories.find((c) => c.id === id)?.label ?? "";
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const cartItem = defaultCartItem(dish);
  const sizes = dish.sizes?.length ?? 0;

  const add = () => {
    addItem(cartItem);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <article className="kw-mo-card reveal" style={{ "--d": delay }}>
      <div className="kw-mo-img">
        <img src={dish.image} alt={dish.alt || dish.name} loading="lazy" />
        <span className="kw-mo-badge">{dish.badge}</span>
      </div>
      <div className="kw-mo-body">
        <h3>{dish.name}</h3>
        <p className="kw-mo-meta">
          {categoryLabel(dish.category)}
          {sizes > 1 ? ` · ${sizes} sizes` : ""}
        </p>
        <p className="kw-mo-adds" aria-live="polite">
          {added ? (
            <>
              <i className="fas fa-check" /> Added to cart
            </>
          ) : (
            describeCartItemSelections(cartItem)
          )}
        </p>
        <div className="kw-mo-foot">
          <strong>{formatCurrency(cartItem.unitPrice)}</strong>
          <button
            type="button"
            className={`kw-mo-add${added ? " done" : ""}`}
            onClick={add}
            aria-label={`Add ${dish.name} (${describeCartItemSelections(cartItem, ", ")}) to cart`}
          >
            <i className={added ? "fas fa-check" : "fas fa-plus"} />
          </button>
        </div>
      </div>
    </article>
  );
};

const SIDE_ICONS = { 104: "fas fa-mortar-pestle", 105: "fas fa-fish", 106: "fas fa-egg", 107: "fas fa-leaf" };
const SIDE_THUMBS = { 13: "/pictures/opt/kelewele.webp" };

const SideRow = ({ item }) => {
  const { addItem } = useCart();
  const [size, setSize] = useState(item.sizes?.[0]?.label ?? null);
  const [added, setAdded] = useState(false);
  const unitPrice = computeUnitPrice(item, { size });
  const multi = (item.sizes?.length ?? 0) > 1;

  const add = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      image: item.image,
      unitPrice,
      quantity: 1,
      selectedSize: size,
      selectedBase: null,
      selectedProtein: null,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="kw-side">
      <span className="kw-side-thumb">
        {item.image ? <img src={SIDE_THUMBS[item.id] || item.image} alt={item.alt || item.name} loading="lazy" /> : <i className={SIDE_ICONS[item.id] || "fas fa-utensils"} aria-hidden="true" />}
      </span>
      <div className="kw-side-body">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        {multi ? (
          <div className="kw-side-sizes" role="group" aria-label={`${item.name} size`}>
            {item.sizes.map((sz) => (
              <button key={sz.label} type="button" className={sz.label === size ? "on" : ""} aria-pressed={sz.label === size} onClick={() => setSize(sz.label)}>
                {sz.label}
              </button>
            ))}
          </div>
        ) : (
          size && <span className="kw-side-one">{size}</span>
        )}
      </div>
      <div className="kw-side-buy">
        <strong>{formatCurrency(unitPrice)}</strong>
        <button
          type="button"
          className={`kw-mo-add${added ? " done" : ""}`}
          onClick={add}
          aria-label={`Add ${size ? `${size} ` : ""}${item.name} to cart`}
        >
          <i className={added ? "fas fa-check" : "fas fa-plus"} />
        </button>
      </div>
    </div>
  );
};

const HomePage = ({ google = null }) => {
  const { menu, home } = useSite();
  const { hero } = home;
  const isOn = (m) => m && !m.hidden && m.available !== false && !m.callOnly;
  const MOST_ORDERED = (home.mostOrdered || [])
    .map((d) => {
      const item = menu.items.find((m) => String(m.id) === String(d.id));
      return isOn(item) ? { ...item, badge: d.badge, image: d.image || item.image } : null;
    })
    .filter(Boolean);
  const SIDES = menu.items.filter((m) => m.category === "sides" && isOn(m));
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
          <HeroSlider
            footer={
              <div className="kw-features kk-fade" style={{ "--d": "0.8s" }}>
                {[
                  { icon: "fas fa-seedling", t: "Authentic Recipes", d: "Traditional Ghanaian cooking" },
                  { icon: "fas fa-shipping-fast", t: "Daily Delivery", d: "Afternoon slots across Chicago" },
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
            }
          >
            <span className="kw-pill kk-fade" style={{ "--d": "0.1s" }}>
              <b>
                <i className="fas fa-utensils" />
              </b>
              {hero.pill}
            </span>
            <h1 className="kk-fade" style={{ "--d": "0.2s" }}>
              {hero.line1}
              <br />
              {hero.highlight && <span>{hero.highlight}</span>} {hero.line2}
            </h1>
            <p className="kw-hero-lead kk-fade" style={{ "--d": "0.35s" }}>
              {hero.lead}
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
                  ["EK", "#c99a32"],
                  ["EJ", "#2f7a4d"],
                  ["+3", "#1d5638"],
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
          </HeroSlider>
        </section>

        {/* ══ African pattern separator ══ */}
        <div className="kw-band" aria-hidden="true" />

        {/* ══ Category carousel ══ */}
        <section className="kw-sec">
          <div className="container">
            <div className="kw-head reveal">
              <div>
                <span className="kw-kicker">Explore</span>
                <h2>What are you craving?</h2>
                <p>Tap a dish to start your order.</p>
              </div>
              <Link href="/food-menu" className="kw-more">
                View Full Menu <i className="fas fa-arrow-right" />
              </Link>
            </div>
            <CategoryStrip />
          </div>
        </section>

        {/* ══ Most ordered dishes ══ */}
        <section className="kw-sec">
          <div className="container">
            <div className="kw-head reveal">
              <div>
                <span className="kw-kicker">Popular</span>
                <h2>Most Ordered Dishes</h2>
              </div>
              <Link href="/food-menu" className="kw-more">
                View All <i className="fas fa-arrow-right" />
              </Link>
            </div>
            <div className="kw-mo">
              {MOST_ORDERED.map((d, i) => (
                <DishCard key={d.id} dish={d} delay={`${i * 0.08}s`} />
              ))}
            </div>
          </div>
        </section>

        {/* ══ Weekly schedule ══ */}
        <section className="kw-sec">
          <div className="container">
            <WeeklySchedule className="reveal" />
          </div>
        </section>

        {/* ══ Special offer ══ */}
        <section className="kw-sec">
          <div className="container">
            <OfferBanner className="reveal" />
          </div>
        </section>

        {/* ══ Sides ══ */}
        <section className="kw-sec">
          <div className="container">
            <div className="kw-sides">
              <div className="kw-sides-feature reveal">
                <img src="/pictures/opt/kelewele.webp" alt="" aria-hidden="true" />
                <div className="kw-sides-copy">
                  <span className="kw-offer-kicker">Sides & Extras</span>
                  <h2>
                    Perfect pairings for <span>every plate.</span>
                  </h2>
                  <p>Golden kelewele, sweet plantain, banku made for soup and more — add a side to complete your meal.</p>
                  <Link href="/food-menu" className="kw-offer-btn">
                    See the Full Menu <i className="fas fa-arrow-right" />
                  </Link>
                </div>
              </div>
              <div className="kw-sides-list reveal" style={{ "--d": "0.1s" }}>
                {SIDES.map((item) => (
                  <SideRow key={item.id} item={item} />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══ Reviews (live from Google when configured) ══ */}
        <ReviewsSection google={google} />
      </div>
      <InstallPrompt />
    </FoodKingLayout>
  );
};

export default HomePage;
