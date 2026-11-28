"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { useSite } from "@/components/SiteDataProvider";
import { telHref } from "@/lib/siteDefaults";

const navLinks = [
  { href: "/", label: "Home", icon: "fas fa-home" },
  { href: "/food-menu", label: "Our Menu", icon: "fas fa-utensils" },
  { href: "/about", label: "About Us", icon: "fas fa-heart" },
  { href: "/blog", label: "Blog", icon: "fas fa-book-open" },
  { href: "/contact", label: "Contact", icon: "fas fa-envelope" },
];

// "/blog/some-post" keeps "Blog" highlighted.
const isActive = (pathname, href) => pathname === href || (href !== "/" && pathname?.startsWith(`${href}/`));

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { settings } = useSite();
  const TICKER_ITEMS = settings.ticker?.length ? settings.ticker : [settings.tagline];
  const phones = [settings.phonePrimary, settings.phoneSecondary].filter(Boolean);
  const socials = [
    { href: settings.instagram, icon: "fab fa-instagram", label: "Instagram" },
    { href: settings.tiktok, icon: "fab fa-tiktok", label: "TikTok" },
    { href: settings.facebook, icon: "fab fa-facebook-f", label: "Facebook" },
  ].filter((s) => s.href);
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
            <a href={telHref(settings.phonePrimary)} className="kh-icon d-none d-md-grid" aria-label={`Call ${settings.phonePrimary}`}>
              <i className="fas fa-phone" />
            </a>
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="kh-icon d-none d-md-grid" aria-label={s.label}>
                <i className={s.icon} />
              </a>
            ))}
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
          <a href={telHref(settings.phonePrimary)} className="kw-btn kw-btn-glass">
            <i className="fas fa-phone" /> Call
          </a>
        </div>

        <ul className="kh-drawer-info">
          <li>
            <i className="fas fa-map-marker-alt" aria-hidden="true" />
            <span>{settings.address}</span>
          </li>
          <li>
            <i className="fas fa-clock" aria-hidden="true" />
            <span>{settings.hours}</span>
          </li>
          {phones.map((p) => (
            <li key={p}>
              <i className="fas fa-phone" aria-hidden="true" />
              <a href={telHref(p)}>{p}</a>
            </li>
          ))}
        </ul>

        <div className="kh-drawer-social">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="kh-icon" aria-label={s.label}>
              <i className={s.icon} />
            </a>
          ))}
        </div>
      </aside>
    </Fragment>
  );
};

export default Header;
