"use client";
import { useEffect, useState } from "react";

const SLIDES = [
  { src: "/pictures/opt/hero_trays.webp", alt: "Trays of jollof rice, fried tilapia with peppers, grilled chicken and banku", caption: "Jollof, tilapia, chicken & banku" },
  { src: "/pictures/opt/hero_jollof_chicken.webp", alt: "A tray of jollof rice beside roasted chicken drumsticks", caption: "Party jollof with roasted chicken" },
  { src: "/pictures/opt/hero_party_spread.webp", alt: "Fresh pepper and onion salad in front of party trays of jollof and chicken", caption: "Party trays, packed fresh" },
];
const INTERVAL = 5000;

// Cross-fading photo slideshow for the homepage hero.
const HeroSlider = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % SLIDES.length), INTERVAL);
    return () => clearTimeout(id);
  }, [active, paused]);

  return (
    <div
      className="kw-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="Dishes from Komla's Kitchen"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {SLIDES.map((s, i) => (
        <figure
          key={s.src}
          className={`kw-slide${i === active ? " on" : ""}`}
          aria-hidden={i !== active}
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${SLIDES.length}`}
        >
          <img src={s.src} alt={s.alt} fetchPriority={i === 0 ? "high" : "low"} loading={i === 0 ? "eager" : "lazy"} />
          <figcaption>{s.caption}</figcaption>
        </figure>
      ))}
      <div className="kw-dots">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            className={i === active ? "on" : ""}
            aria-label={`Show slide ${i + 1}: ${s.caption}`}
            aria-current={i === active}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
