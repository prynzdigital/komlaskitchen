"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { href: "/", label: "Home", icon: "fas fa-home" },
  { href: "/food-menu", label: "Menu", icon: "fas fa-utensils" },
  { href: "/about", label: "About Us", icon: "fas fa-heart" },
  { href: "/blog", label: "Blog", icon: "fas fa-book-open" },
  { href: "/contact", label: "Contact", icon: "fas fa-envelope" },
];

// "/blog/some-post" keeps "Blog" highlighted.
const isActive = (pathname, href) => pathname === href || (href !== "/" && pathname?.startsWith(`${href}/`));

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
  const closeRef = useRef(null);

  useEffect(() => setToggle(false), [pathname]);

  useEffect(() => {
    if (!toggle) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && setToggle(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [toggle]);

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
            <span className="kh-word">
              <b>Komla&apos;s</b>
              <small>Kitchen</small>
            </span>
          </Link>

          <nav className="kh-nav d-none d-lg-flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={isActive(pathname, link.href) ? "on" : ""}>
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
            <button className="kh-icon d-lg-none" onClick={() => setToggle(true)} aria-label="Open menu" aria-expanded={toggle} aria-controls="kh-drawer">
              <i className="fas fa-bars" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div className={`kh-scrim${toggle ? " on" : ""}`} onClick={() => setToggle(false)} aria-hidden="true" />
      <aside
        id="kh-drawer"
        className={`kh-drawer${toggle ? " on" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!toggle}
        inert={!toggle}
      >
        <div className="kh-drawer-top">
          <Link href="/" className="kh-logo" aria-label="Komla's Kitchen – Home">
            <img src="/pictures/logo.png" alt="" />
            <span className="kh-word">
              <b>Komla&apos;s</b>
              <small>Kitchen</small>
            </span>
          </Link>
          <button ref={closeRef} type="button" className="kh-icon" onClick={() => setToggle(false)} aria-label="Close menu">
            <i className="fas fa-times" />
          </button>
        </div>

        <nav className="kh-drawer-nav" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={isActive(pathname, link.href) ? "on" : ""} onClick={() => setToggle(false)}>
              <i className={link.icon} aria-hidden="true" />
              <span>{link.label}</span>
              <i className="fas fa-chevron-right kh-chev" aria-hidden="true" />
            </Link>
          ))}
          <Link href="/cart" className={pathname === "/cart" ? "on" : ""} onClick={() => setToggle(false)}>
            <i className="fas fa-shopping-cart" aria-hidden="true" />
            <span>Your Cart</span>
            {itemCount > 0 ? <b className="kh-count">{itemCount}</b> : <i className="fas fa-chevron-right kh-chev" aria-hidden="true" />}
          </Link>
        </nav>

        <div className="kh-drawer-ctas">
          <Link href="/food-menu" className="kw-btn kw-btn-fill" onClick={() => setToggle(false)}>
            Order Now <i className="fas fa-arrow-right" />
          </Link>
          <a href="tel:+17736902745" className="kw-btn kw-btn-glass">
            <i className="fas fa-phone" /> Call
          </a>
        </div>

        <ul className="kh-drawer-info">
          <li>
            <i className="fas fa-map-marker-alt" aria-hidden="true" />
            <span>3718 S Indiana Ave, Chicago, IL</span>
          </li>
          <li>
            <i className="fas fa-clock" aria-hidden="true" />
            <span>Open daily, 11:00 AM – 9:00 PM</span>
          </li>
          <li>
            <i className="fas fa-phone" aria-hidden="true" />
            <a href="tel:+17736902745">+1 (773) 690-2745</a>
          </li>
        </ul>

        <div className="kh-drawer-social">
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="kh-icon" aria-label="Instagram">
            <i className="fab fa-instagram" />
          </a>
          <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="kh-icon" aria-label="TikTok">
            <i className="fab fa-tiktok" />
          </a>
        </div>
      </aside>
    </Fragment>
  );
};

export default Header;
