"use client";

import PageBanner from "@/components/PageBanner";
import MenuItemCard from "@/components/MenuItemCard";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import Link from "next/link";
import { useState } from "react";
import { menuCategories, menuItems } from "@/data/menu";

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredItems =
    activeCategory === "all"
      ? menuItems
      : menuItems.filter((item) => item.category === activeCategory);

  return (
    <FoodKingLayout>
      <PageBanner pageName={"Our Menu"} />

      {/* ── Menu Section ── */}
      <section className="fooder-menu-section fix section-padding">
        <div className="container">
          <div className="section-title text-center">
            <span className="wow fadeInUp">Authentic African Cuisine</span>
            <h2 className="wow fadeInUp" style={{ color: "white" }} data-wow-delay=".3s">
              Explore Our <span>Full Menu</span>
            </h2>
            <p
              className="wow fadeInUp"
              data-wow-delay=".5s"
              style={{ maxWidth: 550, margin: "1rem auto 0", color: "var(--paper-dim)" }}
            >
              Every dish is prepared fresh using traditional recipes and quality
              ingredients. Call us at{" "}
              <a href="tel:7088080303" style={{ color: "var(--red-500)", fontWeight: 600 }}>
                708-808-0303
              </a>{" "}
              to place your order.
            </p>
          </div>

          {/* Category Tabs */}
          <div
            className="d-flex flex-wrap justify-content-center gap-2 mt-5 mb-5 wow fadeInUp"
            data-wow-delay=".4s"
          >
            <button
              onClick={() => setActiveCategory("all")}
              className={`theme-btn ${activeCategory === "all" ? "" : "bg-transparent"}`}
              style={{
                border: "2px solid var(--red-500)",
                color: activeCategory === "all" ? "#fff" : "var(--red-500)",
                padding: "8px 20px",
                fontSize: "0.9rem",
              }}
            >
              All Items
            </button>
            {menuCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`theme-btn ${activeCategory === cat.id ? "" : "bg-transparent"}`}
                style={{
                  border: "2px solid var(--red-500)",
                  color: activeCategory === cat.id ? "#fff" : "var(--red-500)",
                  padding: "8px 20px",
                  fontSize: "0.9rem",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="row g-4">
            {filteredItems.map((item, i) => (
              <div
                key={item.id}
                className="col-xl-4 col-lg-6 col-md-6 wow fadeInUp"
                data-wow-delay={`${0.2 + (i % 3) * 0.15}s`}
              >
                <MenuItemCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Order CTA ── */}
      <section
        className="booking-section mt-0 fix section-padding bg-cover"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.72)), url('/pictures/kontomire_stew.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row justify-content-between align-items-center g-4">
            <div className="col-lg-7">
              <div className="booking-content">
                <div className="section-title">
                  <span className="wow fadeInUp" style={{ color: "var(--gold-400)" }}>
                    Ready to Order?
                  </span>
                  <h2 className="text-white wow fadeInUp" data-wow-delay=".3s">
                    Craving Authentic African Food?
                  </h2>
                  <p className="text-white wow fadeInUp" data-wow-delay=".5s" style={{ opacity: 0.85 }}>
                    Call us directly or send us a message. We&apos;re open Monday –
                    Sunday, 11:00 AM – 9:00 PM.
                  </p>
                </div>
                <div
                  className="icon-items d-flex align-items-center wow fadeInUp"
                  data-wow-delay=".5s"
                >
                  <div className="icon">
                    <i className="fas fa-phone" />
                  </div>
                  <div className="content">
                    <h5 style={{ color: "var(--gold-400)" }}>Call to Order</h5>
                    <h3>
                      <a href="tel:7088080303" style={{ color: "#fff" }}>
                        708-808-0303
                      </a>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 wow fadeInUp" data-wow-delay=".4s">
              <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, padding: "2rem" }}>
                <h4 className="text-center text-white mb-4">Business Hours</h4>
                <div style={{ color: "#fff", opacity: 0.9 }}>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Monday – Sunday</span>
                    <span style={{ color: "var(--gold-400)", fontWeight: 600 }}>Open</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Hours</span>
                    <span style={{ fontWeight: 600 }}>11:00 AM – 9:00 PM</span>
                  </div>
                  <hr style={{ borderColor: "rgba(255,255,255,0.2)" }} />
                  <div className="d-flex align-items-start gap-2 mt-3" style={{ fontSize: "0.9rem" }}>
                    <i className="fas fa-map-marker-alt mt-1" style={{ color: "var(--gold-400)" }} />
                    <span>3718 S Indiana Ave, Chicago, IL</span>
                  </div>
                </div>
                <Link href="/contact" className="theme-btn mt-4" style={{ display: "block", textAlign: "center" }}>
                  Get Directions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FoodKingLayout>
  );
};

export default MenuPage;
