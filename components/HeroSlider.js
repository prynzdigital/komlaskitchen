"use client";
import { useEffect, useState } from "react";
import { useSite } from "@/components/SiteDataProvider";

const INTERVAL = 6000;

// Full-bleed hero: cross-fading food photos behind the hero copy.
// `children` is the headline block; `footer` sits along the bottom (feature bar).
const HeroSlider = ({ children, footer }) => {
  const SLIDES = (useSite().home.slides || []).filter((s) => s.image);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % Math.max(1, SLIDES.length)), INTERVAL);
    return () => clearTimeout(id);
  }, [active, paused]);

  return (
    <>
      <div className="kw-hero-media">
        {SLIDES.map((s, i) => (
          <figure key={`${s.image}-${i}`} className={`kw-slide${i === active ? " on" : ""}`} aria-hidden={i !== active}>
            <img src={s.image} alt={s.alt || s.caption || ""} fetchPriority={i === 0 ? "high" : "low"} loading={i === 0 ? "eager" : "lazy"} />
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
            {SLIDES[active]?.caption}
          </span>
          <div className="kw-dots">
            {SLIDES.map((s, i) => (
              <button
                key={`${s.image}-${i}`}
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
