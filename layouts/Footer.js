import Link from "next/link";

const linkStyle = { color: "rgba(255,255,255,0.78)", textDecoration: "none" };
const headStyle = { color: "#fff", fontFamily: "var(--font-display)", fontSize: "1rem", letterSpacing: 2, textTransform: "uppercase" };
const iconStyle = { color: "#c9a24d", minWidth: 14 };

const Footer = () => {
  return (
    <footer className="footer-section fix" style={{ background: "#1c1712", borderTop: "3px solid #c9a24d" }}>
      <div className="container">
        <div className="footer-widgets-wrapper">
          <div className="row g-4">
            <div className="col-xl-4 col-lg-4 col-md-6">
              <div className="single-footer-widget">
                <div className="widget-head mb-3">
                  <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
                    <img src="/pictures/logo.png" alt="Komla's Kitchen logo" style={{ height: 56, width: "auto", objectFit: "contain" }} />
                    <div style={{ lineHeight: 1.1 }}>
                      <div style={{ fontFamily: "var(--font-display)", color: "#fff", fontSize: "1.2rem", letterSpacing: 2 }}>KOMLA&apos;S</div>
                      <div style={{ color: "#c9a24d", fontSize: "0.62rem", letterSpacing: 4, textTransform: "uppercase" }}>Ghanaian Kitchen</div>
                    </div>
                  </Link>
                </div>
                <div className="footer-content">
                  <p style={{ color: "rgba(255,255,255,0.78)" }}>
                    Authentic Ghanaian flavours, crafted with heritage and served with elegance across Chicago.
                  </p>
                  <div className="social-icon d-flex align-items-center mt-3">
                    <a href="https://www.instagram.com/komlaskitchen?utm_source=qr&igsh=MXg0ZGU5OWpwcWNz" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram" /></a>
                    <a href="https://www.tiktok.com/@chalekomlacooks0?_r=1&_t=ZS-97Faf2TUkMe" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><i className="fab fa-tiktok" /></a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-xl-2 col-lg-2 col-sm-6 col-md-3">
              <div className="single-footer-widget">
                <div className="widget-head"><h4 style={headStyle}>Explore</h4></div>
                <ul className="list-items">
                  <li><Link href="/" style={linkStyle}>Home</Link></li>
                  <li><Link href="/food-menu" style={linkStyle}>Menu</Link></li>
                  <li><Link href="/about" style={linkStyle}>Experience</Link></li>
                  <li><Link href="/contact" style={linkStyle}>Contact</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-sm-6 col-md-3">
              <div className="single-footer-widget">
                <div className="widget-head"><h4 style={headStyle}>Signatures</h4></div>
                <ul className="list-items">
                  <li><Link href="/food-menu" style={linkStyle}>Jollof or Fried Rice Tray</Link></li>
                  <li><Link href="/food-menu" style={linkStyle}>Kontomire Stew</Link></li>
                  <li><Link href="/food-menu" style={linkStyle}>Okro Soup</Link></li>
                  <li><Link href="/food-menu" style={linkStyle}>Beans &amp; Plantain Tray</Link></li>
                  <li><Link href="/food-menu" style={linkStyle}>Kelewele</Link></li>
                </ul>
              </div>
            </div>

            <div className="col-xl-3 col-lg-3 col-md-6">
              <div className="single-footer-widget">
                <div className="widget-head"><h4 style={headStyle}>Visit &amp; Order</h4></div>
                <div className="footer-address-text">
                  <div className="d-flex align-items-start gap-2 mb-2">
                    <i className="fas fa-map-marker-alt mt-1" style={iconStyle} />
                    <span style={linkStyle}>3718 S Indiana Ave, Chicago, IL</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <i className="fas fa-phone" style={iconStyle} />
                    <a href="tel:3122878155" style={linkStyle}>312-287-8155</a>
                  </div>
                  <div className="d-flex align-items-start gap-2 mb-3">
                    <i className="fas fa-clock mt-1" style={iconStyle} />
                    <span style={linkStyle}>Mon–Sun: 11:00 AM – 9:00 PM</span>
                  </div>
                  <Link href="/food-menu" className="btn-gold" style={{ padding: "10px 24px", fontSize: "0.72rem" }}>Order Now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{ background: "#14100c", borderTop: "1px solid rgba(201,162,77,0.25)" }}>
        <div className="container">
          <div className="footer-bottom-wrapper d-flex align-items-center justify-content-between flex-wrap gap-2">
            <p style={{ color: "rgba(255,255,255,0.8)", margin: 0 }}>
              © 2026{" "}
              <Link href="/" style={{ color: "#c9a24d", fontWeight: 600 }}>Komla&apos;s Kitchen</Link>
              . All Rights Reserved.
            </p>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", margin: 0 }}>
              Digital Excellence, Powered by{" "}
              <a href="https://www.gostatenext.com" target="_blank" rel="noopener noreferrer" style={{ color: "#c9a24d", fontWeight: 600, textDecoration: "none" }}>
                StateNext Labs
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
