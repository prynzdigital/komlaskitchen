"use client";
import Link from "next/link";
import InstallAppButton from "@/components/InstallAppButton";
import { useSite } from "@/components/SiteDataProvider";
import { telHref } from "@/lib/siteDefaults";

const COLUMNS = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/food-menu", label: "Menu" },
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Blog" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Order",
    links: [
      { href: "/food-menu", label: "Family Trays" },
      { href: "/cart", label: "Your Cart" },
      { href: "/checkout", label: "Checkout" },
      { href: "/contact", label: "Catering" },
    ],
  },
];

const Footer = () => {
  const { settings } = useSite();
  const phones = [settings.phonePrimary, settings.phoneSecondary].filter(Boolean);
  const socials = [
    { href: settings.instagram, icon: "fab fa-instagram", label: "Instagram" },
    { href: settings.tiktok, icon: "fab fa-tiktok", label: "TikTok" },
    { href: settings.facebook, icon: "fab fa-facebook-f", label: "Facebook" },
  ].filter((s) => s.href);
  return (
    <footer className="kf">
      <div className="container">
        <div className="kf-grid">
          <div className="kf-brand">
            <Link href="/" className="kh-logo">
              <img src="/pictures/logo.png" alt="Komla's Kitchen logo" />
              <span className="kh-word">
                <b>Komla&apos;s</b>
                <small>Kitchen</small>
              </span>
            </Link>
            <p>{settings.tagline}</p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4>Visit Us</h4>
            <ul className="kf-contact">
              <li>
                <i className="fas fa-map-marker-alt" /> {settings.address}
              </li>
              {phones.map((p) => (
                <li key={p}>
                  <i className="fas fa-phone" /> <a href={telHref(p)}>{p}</a>
                </li>
              ))}
              {settings.email && (
                <li>
                  <i className="fas fa-envelope" /> <a href={`mailto:${settings.email}`}>{settings.email}</a>
                </li>
              )}
              <li>
                <i className="fas fa-clock" /> {settings.hours}
              </li>
            </ul>
          </div>

          <div>
            <h4>Follow Us</h4>
            <div className="kf-social">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="kh-icon" aria-label={s.label}>
                  <i className={s.icon} />
                </a>
              ))}
            </div>
            <h4 style={{ marginTop: 26 }}>Get the App</h4>
            <InstallAppButton className="kw-btn kw-btn-glass kf-install" label="Install App" />
          </div>
        </div>
      </div>

      <div className="kf-bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} {settings.name}. All rights reserved.</p>
          <p>
            Digital Excellence, Powered by{" "}
            <a href="https://www.gostatenext.com" target="_blank" rel="noopener noreferrer">
              StateNext Labs
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
