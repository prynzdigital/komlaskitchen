"use client";

import PageBanner from "@/components/PageBanner";
import MenuItemCard from "@/components/MenuItemCard";
import WeeklySchedule from "@/components/WeeklySchedule";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import Link from "next/link";
import { useState } from "react";
import { menuCategories, menuItems } from "@/data/menu";

const CATEGORIES = menuCategories.filter((c) => menuItems.some((m) => m.category === c.id));

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems =
    activeCategory === "all" ? menuItems : menuItems.filter((item) => item.category === activeCategory);

  return (
    <FoodKingLayout>
      <PageBanner
        pageName="Our Menu"
        title={
          <>
            A Feast of <em>Ghanaian</em> Flavours
          </>
        }
        subtitle="Family trays, slow-simmered soups and golden sides — cooked fresh every day and delivered across Chicago."
        images={["/pictures/opt/jollof2.webp", "/pictures/opt/okro_soup_sq.webp", "/pictures/opt/kelewele.webp"]}
        chip={{ icon: "fas fa-fire", title: "Cooked fresh daily", sub: "Deliveries every afternoon" }}
      >
        <a href="#menu" className="kw-btn kw-btn-fill">
          Start Your Order <i className="fas fa-arrow-down" />
        </a>
        <a href="tel:+17736902745" className="kw-btn kw-btn-glass">
          <i className="fas fa-phone" /> +1 (773) 690-2745
        </a>
      </PageBanner>

      <section className="lx-sec" style={{ paddingBottom: 0 }}>
        <div className="container">
          <WeeklySchedule />
        </div>
      </section>

      <section id="menu" className="lx-sec" style={{ scrollMarginTop: 90 }}>
        <div className="container">
          <div className="lx-center lx-head">
            <span className="lx-eyebrow">Order Online</span>
            <h2 className="lx-h2">
              Choose your <em>favourites</em>
            </h2>
            <p className="lx-lead">
              Pick a size, choose your protein and add to cart — or call{" "}
              <a href="tel:+17736902745" style={{ color: "var(--gilt-300)", fontWeight: 600, whiteSpace: "nowrap" }}>
                +1 (773) 690-2745
              </a>{" "}
              and we&apos;ll take care of everything.
            </p>
          </div>

          <div className="lx-filter">
            <div className="lx-pills lx-glass" role="tablist" aria-label="Menu categories">
              {[{ id: "all", label: "All Dishes" }, ...CATEGORIES].map((cat) => (
                <button
                  key={cat.id}
                  role="tab"
                  aria-selected={activeCategory === cat.id}
                  className={`lx-pill${activeCategory === cat.id ? " on" : ""}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="row g-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="col-xl-4 col-md-6">
                <MenuItemCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="lx-sec">
        <div className="container">
          <div className="lx-glass lx-cta">
            <div className="lx-cta-photo">
              <img src="/pictures/opt/chicken_bg.webp" alt="" loading="lazy" />
            </div>
            <div>
              <span className="lx-eyebrow">Catering & Celebrations</span>
              <h2 className="lx-h2">
                Hosting something <em>special?</em>
              </h2>
              <p className="lx-lead" style={{ marginBottom: 28 }}>
                Naming ceremonies, birthdays, office lunches — our family trays and custom party platters are made to
                be shared. Tell us your guest count and we&apos;ll plan the perfect spread.
              </p>
              <div className="lx-actions">
                <a href="tel:+17736902745" className="kw-btn kw-btn-fill">
                  <i className="fas fa-phone" /> Plan Your Order
                </a>
                <Link href="/contact" className="kw-btn kw-btn-glass">
                  Send a Message
                </Link>
              </div>
            </div>
            <div className="lx-glass lx-hours">
              <h4>Opening Hours</h4>
              <div className="lx-hours-row">
                <span>Monday – Sunday</span>
                <b className="open">Open daily</b>
              </div>
              <div className="lx-hours-row">
                <span>Kitchen hours</span>
                <b>11:00 AM – 9:00 PM</b>
              </div>
              <div className="lx-hours-row">
                <span>Wed · Sat · Sun delivery</span>
                <b>1 PM &amp; 5 PM</b>
              </div>
              <div className="lx-hours-row">
                <span>Mon · Tue · Thu · Fri delivery</span>
                <b>12 – 5 PM</b>
              </div>
              <div className="lx-hours-row" style={{ borderBottom: 0 }}>
                <span>
                  <i className="fas fa-map-marker-alt" style={{ color: "var(--gilt-400)", marginRight: 8 }} />
                  3718 S Indiana Ave, Chicago
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FoodKingLayout>
  );
};

export default MenuPage;
