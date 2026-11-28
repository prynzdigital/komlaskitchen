import Link from "next/link";
import InstallAppButton from "@/components/InstallAppButton";

const IG_URL = "https://www.instagram.com/komlaskitchen?utm_source=qr&igsh=MXg0ZGU5OWpwcWNz";
const TIKTOK_URL = "https://www.tiktok.com/@chalekomlacooks0?_r=1&_t=ZS-97Faf2TUkMe";

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
      { href: "tel:+17736902745", label: "Catering" },
    ],
  },
];

const Footer = () => {
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
            <p>Authentic Ghanaian flavours, cooked fresh daily and delivered across Chicago.</p>
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
                <i className="fas fa-map-marker-alt" /> 3718 S Indiana Ave, Chicago, IL
              </li>
              <li>
                <i className="fas fa-phone" /> <a href="tel:+17736902745">+1 (773) 690-2745</a>
              </li>
              <li>
                <i className="fas fa-clock" /> Mon–Sun, 11 AM – 9 PM
              </li>
            </ul>
          </div>

          <div>
            <h4>Follow Us</h4>
            <div className="kf-social">
              <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="kh-icon" aria-label="Instagram">
                <i className="fab fa-instagram" />
              </a>
              <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" className="kh-icon" aria-label="TikTok">
                <i className="fab fa-tiktok" />
              </a>
            </div>
            <h4 style={{ marginTop: 26 }}>Get the App</h4>
            <InstallAppButton className="kw-btn kw-btn-glass kf-install" label="Install App" />
          </div>
        </div>
      </div>

      <div className="kf-bottom">
        <div className="container">
          <p>© 2026 Komla&apos;s Kitchen. All rights reserved.</p>
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
