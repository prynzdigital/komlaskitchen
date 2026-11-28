"use client";
import { useEffect, useState } from "react";

const SLIDES = [
  { src: "/pictures/opt/hero_trays.webp", alt: "Trays of jollof rice, fried tilapia with peppers, grilled chicken and banku", caption: "Jollof, tilapia, chicken & banku" },
  { src: "/pictures/opt/tilapia.webp", alt: "Grilled whole tilapia, golden and charred", caption: "Grilled tilapia, fresh from the fire" },
  { src: "/pictures/opt/hero_jollof_chicken.webp", alt: "A tray of jollof rice beside roasted chicken drumsticks", caption: "Party jollof with roasted chicken" },
  { src: "/pictures/opt/hero_party_spread.webp", alt: "Fresh pepper and onion salad in front of party trays of jollof and chicken", caption: "Party trays, packed fresh" },
];
const INTERVAL = 6000;

// Full-bleed hero: cross-fading food photos behind the hero copy.
// `children` is the headline block; `footer` sits along the bottom (feature bar).
const HeroSlider = ({ children, footer }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearTimeout(id);
  }, [active, paused]);

  return (
    <>
      <div className="kw-hero-media">
        {SLIDES.map((s, i) => (
          <figure key={s.src} className={`kw-slide${i === active ? " on" : ""}`} aria-hidden={i !== active}>
            <img src={s.src} alt={s.alt} fetchPriority={i === 0 ? "high" : "low"} loading={i === 0 ? "eager" : "lazy"} />
          </figure>
        ))}
      </div>

      <div className="container kw-hero-inner">
        <div className="kw-hero-copy">{children}</div>

        <div
          className="kw-hero-ctrl kk-fade"
          style={{ "--d": "0.7s" }}
          role="group"
          aria-roledescription="carousel"
          aria-label="Dishes from Komla's Kitchen"
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <span className="kw-hero-cap">
            {SLIDES[active].caption}
          </span>
          <div className="kw-dots">
            {SLIDES.map((s, i) => (
              <button
                key={s.src}
                type="button"
                className={i === active ? "on" : ""}
                aria-label={`Show photo ${i + 1}: ${s.caption}`}
                aria-current={i === active}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>

        {footer}
      </div>
    </>
  );
};

export default HeroSlider;
