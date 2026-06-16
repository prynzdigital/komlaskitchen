"use client";

import PageBanner from "@/components/PageBanner";
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
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              Explore Our <span>Full Menu</span>
            </h2>
            <p
              className="wow fadeInUp"
              data-wow-delay=".5s"
              style={{ maxWidth: 550, margin: "1rem auto 0", color: "#666" }}
            >
              Every dish is prepared fresh using traditional recipes and quality
              ingredients. Call us at{" "}
              <a href="tel:3122878155" style={{ color: "#e8272a", fontWeight: 600 }}>
                312-287-8155
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
                border: "2px solid #e8272a",
                color: activeCategory === "all" ? "#fff" : "#e8272a",
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
                  border: "2px solid #e8272a",
                  color: activeCategory === cat.id ? "#fff" : "#e8272a",
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
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 12,
                    overflow: "hidden",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.14)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
                  }}
                >
                  <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
                    <img
                      src={item.image}
                      alt={item.alt}
                      loading="lazy"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    {item.popular && (
                      <span
                        style={{
                          position: "absolute",
                          top: 10,
                          left: 10,
                          background: "#e8272a",
                          color: "#fff",
                          padding: "3px 10px",
                          borderRadius: 20,
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          textTransform: "uppercase",
                          letterSpacing: 0.5,
                        }}
                      >
                        Popular
                      </span>
                    )}
                    <span
                      style={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        background: "rgba(0,0,0,0.65)",
                        color: "#f5a623",
                        padding: "3px 12px",
                        borderRadius: 20,
                        fontWeight: 700,
                        fontSize: "0.9rem",
                      }}
                    >
                      {item.price}
                    </span>
                  </div>
                  <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
                    <h4 style={{ fontWeight: 700, marginBottom: "0.5rem" }}>{item.name}</h4>
                    <p style={{ color: "#666", fontSize: "0.88rem", lineHeight: 1.6, flex: 1 }}>
                      {item.description}
                    </p>
                    <a
                      href="tel:3122878155"
                      className="theme-btn mt-3"
                      style={{ textAlign: "center", display: "block" }}
                    >
                      <span className="button-content-wrapper d-flex align-items-center justify-content-center">
                        <span className="button-icon">
                          <i className="fas fa-phone" />
                        </span>
                        <span className="button-text">Call to Order</span>
                      </span>
                    </a>
                  </div>
                </div>
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
            "linear-gradient(rgba(0,0,0,0.72), rgba(0,0,0,0.72)), url('/pictures/kontomire_stew.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row justify-content-between align-items-center g-4">
            <div className="col-lg-7">
              <div className="booking-content">
                <div className="section-title">
                  <span className="wow fadeInUp" style={{ color: "#f5a623" }}>
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
                    <h5 style={{ color: "#f5a623" }}>Call to Order</h5>
                    <h3>
                      <a href="tel:3122878155" style={{ color: "#fff" }}>
                        312-287-8155
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
                    <span style={{ color: "#f5a623", fontWeight: 600 }}>Open</span>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Hours</span>
                    <span style={{ fontWeight: 600 }}>11:00 AM – 9:00 PM</span>
                  </div>
                  <hr style={{ borderColor: "rgba(255,255,255,0.2)" }} />
                  <div className="d-flex align-items-start gap-2 mt-3" style={{ fontSize: "0.9rem" }}>
                    <i className="fas fa-map-marker-alt mt-1" style={{ color: "#f5a623" }} />
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
