"use client";
import Link from "next/link";
import { useSite } from "@/components/SiteDataProvider";

const OfferBanner = ({ className = "" }) => {
  const { offer } = useSite().home;
  return (
  <div className={`kw-offer ${className}`}>
    <div className="kw-offer-photo" aria-hidden="true">
      <img src={offer.image} alt="" loading="lazy" />
    </div>
    <i className="fas fa-leaf kw-offer-deco" style={{ left: "44%", top: "14%", fontSize: "1.4rem", rotate: "-30deg" }} aria-hidden="true" />
    <i className="fas fa-pepper-hot kw-offer-deco" style={{ left: "38%", bottom: "16%", fontSize: "1.1rem", rotate: "20deg" }} aria-hidden="true" />
    <i className="fas fa-leaf kw-offer-deco" style={{ left: "6%", bottom: "-6px", fontSize: "2.2rem", rotate: "40deg", opacity: 0.25 }} aria-hidden="true" />

    <div className="kw-offer-copy">
      <img src="/pictures/logo.png" alt="" className="kw-offer-logo" />
      <span className="kw-offer-kicker">{offer.kicker}</span>
      <h2>
        {offer.highlight && <span>{offer.highlight}</span>} {offer.title}
      </h2>
      {offer.sub && <p className="kw-offer-sub">{offer.sub}</p>}
      {offer.note && <p className="kw-offer-note">{offer.note}</p>}
      <Link href="/food-menu" className="kw-offer-btn">
        {offer.button || "Order Now"} <i className="fas fa-arrow-right" />
      </Link>
    </div>
  </div>
  );
};

export default OfferBanner;
