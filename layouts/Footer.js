import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer-section fix section-bg" style={{ background: "rgba(5,2,0,0.95)", backdropFilter: "blur(12px)" }}>
      <div className="container">
        <div className="footer-widgets-wrapper">
          <div className="row g-4">
            {/* Brand Column */}
            <div className="col-xl-4 col-lg-4 col-md-6 wow fadeInUp" data-wow-delay=".2s">
              <div className="single-footer-widget">
                <div className="widget-head mb-3">
                  <Link href="/">
                    <img
                      src="/pictures/logo.png"
                      alt="Komla's Kitchen logo"
                      style={{ height: 60, width: "auto", objectFit: "contain" }}
                    />
                  </Link>
                </div>
                <div className="footer-content">
                  <p style={{ color: "rgba(255,255,255,0.8)" }}>
                    Authentic African Flavors, Made with Love. Bringing the rich
                    taste of traditional African cuisine to Chicago families.
                  </p>
                  <div className="social-icon d-flex align-items-center mt-3">
                    <a href="https://www.instagram.com/komlaskitchen?utm_source=qr&igsh=MXg0ZGU5OWpwcWNz" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: "rgba(255,255,255,0.75)" }}><i className="fab fa-instagram" /></a>
                    <a href="https://www.tiktok.com/@chalekomlacooks0?_r=1&_t=ZS-97Faf2TUkMe" target="_blank" rel="noopener noreferrer" aria-label="TikTok" style={{ color: "rgba(255,255,255,0.75)" }}><i className="fab fa-tiktok" /></a>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="col-xl-2 col-lg-2 col-sm-6 col-md-3 wow fadeInUp" data-wow-delay=".4s">
              <div className="single-footer-widget">
                <div className="widget-head">
                  <h4 style={{ color: "#fff" }}>Quick Links</h4>
                </div>
                <ul className="list-items">
                  <li><Link href="/" style={{ color: "rgba(255,255,255,0.75)" }}>Home</Link></li>
                  <li><Link href="/about" style={{ color: "rgba(255,255,255,0.75)" }}>About Us</Link></li>
                  <li><Link href="/food-menu" style={{ color: "rgba(255,255,255,0.75)" }}>Menu</Link></li>
                  <li><Link href="/contact" style={{ color: "rgba(255,255,255,0.75)" }}>Contact</Link></li>
                </ul>
              </div>
            </div>

            {/* Popular Dishes */}
            <div className="col-xl-3 col-lg-3 col-sm-6 col-md-3 wow fadeInUp" data-wow-delay=".6s">
              <div className="single-footer-widget">
                <div className="widget-head">
                  <h4 style={{ color: "#fff" }}>Popular Dishes</h4>
                </div>
                <ul className="list-items">
                  <li><Link href="/food-menu" style={{ color: "rgba(255,255,255,0.75)" }}>Jollof Rice</Link></li>
                  <li><Link href="/food-menu" style={{ color: "rgba(255,255,255,0.75)" }}>Kontomire Stew</Link></li>
                  <li><Link href="/food-menu" style={{ color: "rgba(255,255,255,0.75)" }}>Okro Soup</Link></li>
                  <li><Link href="/food-menu" style={{ color: "rgba(255,255,255,0.75)" }}>Beans &amp; Plantain</Link></li>
                  <li><Link href="/food-menu" style={{ color: "rgba(255,255,255,0.75)" }}>Vegetable Rice</Link></li>
                </ul>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-xl-3 col-lg-3 col-md-6 wow fadeInUp" data-wow-delay=".8s">
              <div className="single-footer-widget">
                <div className="widget-head">
                  <h4 style={{ color: "#fff" }}>Contact Us</h4>
                </div>
                <div className="footer-address-text">
                  <div className="d-flex align-items-start gap-2 mb-2">
                    <i className="fas fa-map-marker-alt mt-1" style={{ color: "#e8272a", minWidth: 14 }} />
                    <span style={{ color: "rgba(255,255,255,0.8)" }}>3718 S Indiana Ave, Chicago, IL</span>
                  </div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <i className="fas fa-phone" style={{ color: "#e8272a", minWidth: 14 }} />
                    <a href="tel:3122878155" style={{ color: "rgba(255,255,255,0.8)" }}>312-287-8155</a>
                  </div>
                  <div className="d-flex align-items-start gap-2 mb-2">
                    <i className="fas fa-clock mt-1" style={{ color: "#e8272a", minWidth: 14 }} />
                    <span style={{ color: "rgba(255,255,255,0.8)" }}>Mon–Sun: 11:00 AM – 9:00 PM</span>
                  </div>
                  <div className="mt-3">
                    <Link href="/food-menu" className="theme-btn" style={{ fontSize: "0.85rem", padding: "8px 16px" }}>
                      Order Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom" style={{ background: "#6b0d0d", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
        <div className="container">
          <div className="footer-bottom-wrapper d-flex align-items-center justify-content-between flex-wrap gap-2">
            <p className="wow fadeInLeft" data-wow-delay=".3s" style={{ color: "rgba(255,255,255,0.85)", margin: 0 }}>
              © 2026{" "}
              <Link href="/" style={{ color: "#f5a623", fontWeight: 600 }}>
                Komla&apos;s Kitchen
              </Link>
              . All Rights Reserved.
            </p>
            <p className="wow fadeInRight" data-wow-delay=".5s" style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.6)", margin: 0 }}>
              Authentic African Flavors, Made with Love.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
