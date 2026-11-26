"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/food-menu", label: "Menu" },
  { href: "/about", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

const TICKER_ITEMS = [
  "Authentic Ghanaian cuisine, made fresh daily",
  "Free delivery on orders over $50",
  "Order by 3 PM for same-day delivery",
  "Try our legendary Party Jollof Rice",
  "Call us: 312-287-8155",
  "Kontomire · Okro Soup · Red Red · Sobolo · Kelewele",
  "Open Mon–Sun, 11 AM – 9 PM · Chicago, IL",
];

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  return (
    <Fragment>
      {/* ── Ticker ── */}
      <div style={{ background: "#1c1712", overflow: "hidden", padding: "8px 0", borderBottom: "1px solid rgba(201,162,77,0.25)" }}>
        <div style={{ display: "flex", gap: 36, width: "max-content", animation: "ticker 34s linear infinite", whiteSpace: "nowrap" }}>
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 36, color: "rgba(255,255,255,0.85)", fontSize: "0.76rem", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "var(--font-body)" }}>
              {item}
              <span style={{ color: "#c9a24d" }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Floating glass header ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 999, padding: "14px 0", pointerEvents: "none" }}>
        <div className="container">
          <div
            style={{
              pointerEvents: "auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 16,
              padding: "10px 14px 10px 18px",
              borderRadius: 16,
              background: "rgba(28,23,18,0.78)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.14)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
            }}
          >
            <Link href="/" aria-label="Komla's Kitchen – Home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
              <img src="/pictures/logo.png" alt="Komla's Kitchen logo" style={{ height: 44, width: "auto", objectFit: "contain" }} />
              <div style={{ lineHeight: 1.1 }}>
                <div style={{ fontFamily: "var(--font-display)", color: "#fff", fontSize: "1.15rem", fontWeight: 600, letterSpacing: 2 }}>KOMLA&apos;S</div>
                <div style={{ fontFamily: "var(--font-body)", color: "#c9a24d", fontSize: "0.62rem", letterSpacing: 4, textTransform: "uppercase" }}>Ghanaian Kitchen</div>
              </div>
            </Link>

            <nav className="d-none d-lg-flex" style={{ gap: 30 }} aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={`lux-nav-link${pathname === link.href ? " active" : ""}`}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="d-flex align-items-center gap-3">
              <a href="https://www.instagram.com/komlaskitchen?utm_source=qr&igsh=MXg0ZGU5OWpwcWNz" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="d-none d-md-inline" style={{ color: "rgba(255,255,255,0.8)" }}>
                <i className="fab fa-instagram" />
              </a>
              <a href="https://www.tiktok.com/@chalekomlacooks0?_r=1&_t=ZS-97Faf2TUkMe" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="d-none d-md-inline" style={{ color: "rgba(255,255,255,0.8)" }}>
                <i className="fab fa-tiktok" />
              </a>
              <Link
                href="/cart"
                aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}
                style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, color: "#fff", fontSize: "1.05rem", textDecoration: "none" }}
              >
                <i className="fas fa-shopping-bag" />
                {itemCount > 0 && (
                  <span style={{ position: "absolute", top: 0, right: 0, minWidth: 18, height: 18, padding: "0 4px", borderRadius: 9, background: "#c9a24d", color: "#1c1712", fontSize: "0.65rem", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {itemCount}
                  </span>
                )}
              </Link>
              <Link href="/food-menu" className="btn-gold d-none d-md-inline-flex" style={{ padding: "10px 22px", fontSize: "0.72rem" }}>
                Order Now
              </Link>
              <button
                className="d-lg-none"
                onClick={() => setToggle(true)}
                aria-label="Open menu"
                style={{ background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex", flexDirection: "column", gap: 5 }}
              >
                <span style={{ display: "block", width: 24, height: 2, background: "#fff", borderRadius: 2 }} />
                <span style={{ display: "block", width: 24, height: 2, background: "#fff", borderRadius: 2 }} />
                <span style={{ display: "block", width: 24, height: 2, background: "#fff", borderRadius: 2 }} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Offcanvas */}
      <div className="fix-area">
        <div className={`offcanvas__info ${toggle ? "info-open" : ""}`}>
          <div className="offcanvas__wrapper">
            <div className="offcanvas__content">
              <div className="offcanvas__top mb-5 d-flex justify-content-between align-items-center">
                <div className="offcanvas__logo">
                  <Link href="/" onClick={() => setToggle(false)}>
                    <img src="/pictures/logo.png" alt="Komla's Kitchen logo" style={{ height: 48, width: "auto", objectFit: "contain" }} />
                  </Link>
                </div>
                <div className="offcanvas__close">
                  <button onClick={() => setToggle(false)} aria-label="Close menu">
                    <i className="fas fa-times" />
                  </button>
                </div>
              </div>

              <div className="mobile-menu fix mb-3 mean-container d-block d-lg-none">
                <nav className="mean-nav" aria-label="Mobile navigation">
                  <ul>
                    {navLinks.map((link) => (
                      <li key={link.href} className="mean-last">
                        <Link href={link.href} onClick={() => setToggle(false)}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>

              <div className="offcanvas__contact">
                <h4>Contact Info</h4>
                <ul>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon">
                      <i className="fal fa-map-marker-alt" />
                    </div>
                    <div className="offcanvas__contact-text">3718 S Indiana Ave, Chicago, IL</div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="fal fa-clock" />
                    </div>
                    <div className="offcanvas__contact-text">Mon–Sun: 11:00 AM – 9:00 PM</div>
                  </li>
                  <li className="d-flex align-items-center">
                    <div className="offcanvas__contact-icon mr-15">
                      <i className="far fa-phone" />
                    </div>
                    <div className="offcanvas__contact-text">
                      <a href="tel:3122878155">312-287-8155</a>
                    </div>
                  </li>
                </ul>
                <div className="mt-4">
                  <Link href="/food-menu" className="btn-gold" onClick={() => setToggle(false)} style={{ display: "flex", justifyContent: "center" }}>
                    Order Now
                  </Link>
                </div>
                <div className="social-icon d-flex align-items-center mt-3">
                  <a href="https://www.instagram.com/komlaskitchen?utm_source=qr&igsh=MXg0ZGU5OWpwcWNz" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram" />
                  </a>
                  <a href="https://www.tiktok.com/@chalekomlacooks0?_r=1&_t=ZS-97Faf2TUkMe" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <i className="fab fa-tiktok" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`offcanvas__overlay ${toggle ? "overlay-open" : ""}`} onClick={() => setToggle(false)} />
    </Fragment>
  );
};

export default Header;
