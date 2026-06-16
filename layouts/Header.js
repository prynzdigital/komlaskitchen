"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState } from "react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/food-menu", label: "Menu" },
  { href: "/contact", label: "Contact" },
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

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();

  return (
    <Fragment>
      {/* ── Scrolling Ticker — top of page ── */}
      <div style={{ background: "#1a1a1a", overflow: "hidden", padding: "9px 0", position: "sticky", top: 0, zIndex: 1000 }}>
        <div
          style={{
            display: "flex",
            gap: 32,
            width: "max-content",
            animation: "ticker 28s linear infinite",
            whiteSpace: "nowrap",
          }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              style={{
                color: item === "✦" ? "#e8272a" : "#fff",
                fontSize: item === "✦" ? "0.7rem" : "0.82rem",
                fontWeight: item === "✦" ? 900 : 500,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <header
        style={{
          background: "rgba(10,5,2,0.82)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          position: "sticky",
          top: 38,
          zIndex: 999,
        }}
      >
        <div className="container">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 0",
              gap: 16,
            }}
          >
            {/* Logo + Name */}
            <Link
              href="/"
              aria-label="Komla's Kitchen – Home"
              style={{ flexShrink: 0, textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}
            >
              <img
                src="/pictures/logo.png"
                alt="Komla's Kitchen logo"
                style={{ height: 52, width: "auto", objectFit: "contain" }}
              />
              <div style={{ lineHeight: 1.15 }}>
                <div style={{ fontWeight: 900, fontSize: "1.1rem", color: "#fff", letterSpacing: 0.2 }}>
                  Komla&apos;s
                </div>
                <div style={{ fontWeight: 700, fontSize: "0.72rem", color: "#f5a623", letterSpacing: 2.5, textTransform: "uppercase" }}>
                  Kitchen
                </div>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="d-none d-lg-flex" style={{ gap: 32 }} aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: pathname === link.href ? "#f5a623" : "rgba(255,255,255,0.85)",
                    fontWeight: pathname === link.href ? 700 : 500,
                    textDecoration: "none",
                    fontSize: "0.97rem",
                    transition: "color 0.2s",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f5a623")}
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      pathname === link.href ? "#f5a623" : "rgba(255,255,255,0.85)")
                  }
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="d-flex align-items-center gap-3">
              {/* Social icons — desktop */}
              <div className="d-none d-md-flex align-items-center gap-2">
                <a
                  href="https://www.instagram.com/komlaskitchen?utm_source=qr&igsh=MXg0ZGU5OWpwcWNz"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f5a623")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                >
                  <i className="fab fa-instagram" />
                </a>
                <a
                  href="https://www.tiktok.com/@chalekomlacooks0?_r=1&_t=ZS-97Faf2TUkMe"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  style={{ color: "rgba(255,255,255,0.7)", fontSize: "1.1rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f5a623")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
                >
                  <i className="fab fa-tiktok" />
                </a>
              </div>

              {/* Order Now CTA */}
              <a
                href="tel:3122878155"
                className="d-none d-md-inline-flex"
                style={{
                  alignItems: "center",
                  gap: 8,
                  background: "#e8272a",
                  color: "#fff",
                  padding: "10px 22px",
                  borderRadius: 50,
                  fontWeight: 700,
                  textDecoration: "none",
                  fontSize: "0.88rem",
                  whiteSpace: "nowrap",
                }}
              >
                <i className="fas fa-phone" /> Order Now
              </a>

              {/* Hamburger */}
              <button
                className="d-lg-none"
                onClick={() => setToggle(true)}
                aria-label="Open menu"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 4,
                  display: "flex",
                  flexDirection: "column",
                  gap: 5,
                }}
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
                    <img
                      src="/pictures/logo.png"
                      alt="Komla's Kitchen logo"
                      style={{ height: 48, width: "auto", objectFit: "contain" }}
                    />
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
                <div className="header-button mt-4">
                  <a
                    href="tel:3122878155"
                    className="theme-btn"
                    onClick={() => setToggle(false)}
                    style={{ display: "block", textAlign: "center" }}
                  >
                    Order Now
                  </a>
                </div>
                <div className="social-icon d-flex align-items-center mt-3">
                  <a
                    href="https://www.instagram.com/komlaskitchen?utm_source=qr&igsh=MXg0ZGU5OWpwcWNz"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@chalekomlacooks0?_r=1&_t=ZS-97Faf2TUkMe"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok"
                  >
                    <i className="fab fa-tiktok" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`offcanvas__overlay ${toggle ? "overlay-open" : ""}`}
        onClick={() => setToggle(false)}
      />
    </Fragment>
  );
};

export default Header;
