import Link from "next/link";

const OfferBanner = ({ className = "" }) => (
  <div className={`kw-offer ${className}`}>
    <div className="kw-offer-photo" aria-hidden="true">
      <img src="/pictures/opt/jollof_main_dish.webp" alt="" loading="lazy" />
    </div>
    <i className="fas fa-leaf kw-offer-deco" style={{ left: "44%", top: "14%", fontSize: "1.4rem", rotate: "-30deg" }} aria-hidden="true" />
    <i className="fas fa-pepper-hot kw-offer-deco" style={{ left: "38%", bottom: "16%", fontSize: "1.1rem", rotate: "20deg" }} aria-hidden="true" />
    <i className="fas fa-leaf kw-offer-deco" style={{ left: "6%", bottom: "-6px", fontSize: "2.2rem", rotate: "40deg", opacity: 0.25 }} aria-hidden="true" />

    <div className="kw-offer-copy">
      <img src="/pictures/logo.png" alt="" className="kw-offer-logo" />
      <span className="kw-offer-kicker">Special Offer</span>
      <h2>
        <span>Free</span> Delivery
      </h2>
      <p className="kw-offer-sub">On Orders Over $50</p>
      <p className="kw-offer-note">Across Chicago · deliveries every afternoon</p>
      <Link href="/food-menu" className="kw-offer-btn">
        Order Now <i className="fas fa-arrow-right" />
      </Link>
    </div>
  </div>
);

export default OfferBanner;
