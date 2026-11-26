"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/food-menu", label: "Menu" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact" },
];

const TICKER_ITEMS = [
  "Authentic Ghanaian cuisine, made fresh daily",
  "Free delivery on orders over $50",
  "Wed · Sat · Sun deliveries at 1 PM & 5 PM",
  "Mon · Tue · Thu · Fri deliveries 12 – 5 PM",
  "Wednesday Special: Beans & Plantain",
  "Try our legendary Party Jollof",
  "Call us: +1 (773) 690-2745",
  "Open Mon–Sun, 11 AM – 9 PM · Chicago, IL",
];

const IG_URL = "https://www.instagram.com/komlaskitchen?utm_source=qr&igsh=MXg0ZGU5OWpwcWNz";
const TIKTOK_URL = "https://www.tiktok.com/@chalekomlacooks0?_r=1&_t=ZS-97Faf2TUkMe";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <Fragment>
      <div className="kh-ticker">
        <div className="kh-ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
      </div>

      <header className={`kh${scrolled ? " kh-scrolled" : ""}`}>
        <div className="container kh-bar">
          <Link href="/" className="kh-logo" aria-label="Komla's Kitchen – Home">
            <img src="/pictures/logo.png" alt="Komla's Kitchen logo" />
            <span>
              KOMLA&apos;S <em>KITCHEN</em>
            </span>
          </Link>

          <nav className="kh-nav d-none d-lg-flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={pathname === link.href ? "on" : ""}>
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="kh-actions">
            <a href="tel:+17736902745" className="kh-icon d-none d-md-grid" aria-label="Call +1 (773) 690-2745">
              <i className="fas fa-phone" />
            </a>
            <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="kh-icon d-none d-md-grid" aria-label="Instagram">
              <i className="fab fa-instagram" />
            </a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="kh-icon d-none d-md-grid" aria-label="TikTok">
              <i className="fab fa-tiktok" />
            </a>
            <Link href="/cart" className="kh-icon" aria-label={`Cart, ${itemCount} item${itemCount === 1 ? "" : "s"}`}>
              <i className="fas fa-shopping-cart" />
              {itemCount > 0 && <b>{itemCount}</b>}
            </Link>
            <button className="kh-icon d-lg-none" onClick={() => setToggle(true)} aria-label="Open menu">
              <i className="fas fa-bars" />
            </button>
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
                      <a href="tel:+17736902745">+1 (773) 690-2745</a>
                    </div>
                  </li>
                </ul>
                <div className="mt-4">
                  <Link href="/food-menu" className="kw-btn kw-btn-fill" onClick={() => setToggle(false)} style={{ width: "100%", justifyContent: "center" }}>
                    Order Now
                  </Link>
                </div>
                <div className="social-icon d-flex align-items-center mt-3">
                  <a href={IG_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram" />
                  </a>
                  <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
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
