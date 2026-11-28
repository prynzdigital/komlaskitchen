"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { GOOGLE_REVIEW_URL } from "@/data/schedule";
import { extraReviews, googleReviewsSnapshot } from "@/data/googleReviews";

const AUTOPLAY_MS = 5000;

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const SOURCES = {
  google: { icon: "fab fa-google", label: "Google" },
  facebook: { icon: "fab fa-facebook-f", label: "Facebook" },
  instagram: { icon: "fab fa-instagram", label: "Instagram" },
  whatsapp: { icon: "fab fa-whatsapp", label: "WhatsApp" },
  text: { icon: "fas fa-comment-dots", label: "a message" },
};
const MIN_CARDS = 4;

const Stars = ({ rating }) => (
  <div className="lx-stars" aria-label={`${rating} out of 5 stars`}>
    {"★".repeat(rating)}
    <span className="rv-star-off">{"★".repeat(5 - rating)}</span>
  </div>
);

// Carousel of Google reviews: 4 cards per view on desktop, fewer on smaller screens.
// `google` is the live result of getGoogleReviews() (fetched by the page on the server);
// when it's null, the saved snapshot of real Google reviews is shown instead.
const ReviewsSection = ({ google }) => {
  const data = google?.reviews?.length ? google : googleReviewsSnapshot;
  const reviews = [...data.reviews, ...extraReviews];
  // With fewer than 4 real reviews, top the row up with honest cards (never invented reviews).
  const fillers = ["rating", "write"].slice(0, Math.max(0, MIN_CARDS - reviews.length));
  const showWriteCard = fillers.includes("write");
  const cards = [...reviews, ...fillers];

  const trackRef = useRef(null);
  const [perView, setPerView] = useState(4);
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const pages = Math.max(1, Math.ceil(cards.length / perView));

  // Distance from one card to the next, and how many fit at the current width.
  const step = () => {
    const el = trackRef.current;
    const card = el?.firstElementChild;
    if (!card) return 0;
    return card.getBoundingClientRect().width + (parseFloat(getComputedStyle(el).columnGap) || 0);
  };

  const measure = useCallback(() => {
    const el = trackRef.current;
    const s = step();
    if (!el || !s) return;
    const per = Math.max(1, Math.round((el.clientWidth + s - el.firstElementChild.getBoundingClientRect().width) / s));
    setPerView(per);
    setPage(Math.round(el.scrollLeft / (s * per)));
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, cards.length]);

  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const next = (i + pages) % pages;
    el.scrollTo({ left: next * perView * step(), behavior: "smooth" });
    setPage(next);
  };

  // Gentle auto-advance; stops while hovered/focused or when everything fits.
  useEffect(() => {
    if (paused || pages < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setTimeout(() => goTo(page + 1), AUTOPLAY_MS);
    return () => clearTimeout(id);
  });

  const scrollable = pages > 1;

  return (
    <section className="lx-sec rv lx-light">
      <div className="container">
        <div className="lx-center lx-head">
          <span className="lx-eyebrow">Kind Words</span>
          <h2 className="lx-h2">
            Loved across <em>Chicago</em>
          </h2>
          {data.rating && (
            <a className="rv-summary" href={data.mapsUrl} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-google" aria-hidden="true" />
              <b>{data.rating.toFixed(1)}</b>
              <span className="rv-summary-stars" aria-label={`${data.rating.toFixed(1)} out of 5 stars`}>
                {"★".repeat(Math.round(data.rating))}
                <span className="rv-star-off">{"★".repeat(5 - Math.round(data.rating))}</span>
              </span>
              <small>
                {data.count} Google review{data.count === 1 ? "" : "s"}
              </small>
            </a>
          )}
        </div>

        <div
          className={`rv-carousel${scrollable ? " is-scrollable" : ""}`}
          role="region"
          aria-roledescription="carousel"
          aria-label="Customer reviews"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          {scrollable && (
            <button type="button" className="rv-arrow rv-prev" aria-label="Previous reviews" onClick={() => goTo(page - 1)}>
              <i className="fas fa-chevron-left" />
            </button>
          )}

          <div className="rv-track" ref={trackRef} onScroll={measure}>
            {cards.map((r, i) => {
              if (r === "rating")
                return (
                  <a key="rating" className="rv-card rv-card-rating" href={data.mapsUrl} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-google rv-card-g" aria-hidden="true" />
                    <strong>{data.rating.toFixed(1)}</strong>
                    <span className="rv-summary-stars" aria-label={`${data.rating.toFixed(1)} out of 5 stars`}>
                      {"★".repeat(Math.round(data.rating))}
                      <span className="rv-star-off">{"★".repeat(5 - Math.round(data.rating))}</span>
                    </span>
                    <p>
                      Rated by {data.count} customer{data.count === 1 ? "" : "s"} on Google
                    </p>
                    <span className="rv-card-link">
                      Read all reviews <i className="fas fa-arrow-right" />
                    </span>
                  </a>
                );
              if (r === "write")
                return (
                  <div key="write" className="rv-card rv-card-write">
                    <span className="rv-card-icon">
                      <i className="fas fa-pen" aria-hidden="true" />
                    </span>
                    <h3>Loved your meal?</h3>
                    <p>Tell Chicago about it — every review helps a small family kitchen grow.</p>
                    <a className="kw-btn rv-write" href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
                      Write a Google Review
                    </a>
                  </div>
                );
              const src = SOURCES[r.source] || SOURCES.google;
              return (
              <figure key={`${r.author}-${i}`} className="rv-card lx-review lx-glass" style={{ margin: 0 }}>
                <Stars rating={Math.min(5, Math.max(1, r.rating || 5))} />
                <p>&ldquo;{r.text}&rdquo;</p>
                <figcaption className="lx-who">
                  {r.photo ? (
                    <img src={r.photo} alt="" width={42} height={42} loading="lazy" referrerPolicy="no-referrer" />
                  ) : (
                    <span>{initials(r.author)}</span>
                  )}
                  <div>
                    {r.authorUrl ? (
                      <a href={r.authorUrl} target="_blank" rel="noopener noreferrer nofollow">
                        <b>{r.author}</b>
                      </a>
                    ) : (
                      <b>{r.author}</b>
                    )}
                    <small>{r.when}</small>
                  </div>
                  <i className={`${src.icon} rv-g`} aria-label={`Posted on ${src.label}`} />
                </figcaption>
              </figure>
              );
            })}
          </div>

          {scrollable && (
            <button type="button" className="rv-arrow rv-next" aria-label="Next reviews" onClick={() => goTo(page + 1)}>
              <i className="fas fa-chevron-right" />
            </button>
          )}
        </div>

        {scrollable && (
          <div className="rv-dots">
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i}
                type="button"
                className={i === page ? "on" : ""}
                aria-label={`Show review page ${i + 1}`}
                aria-current={i === page}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}

        <div className="rv-actions">
          {!showWriteCard && (
            <a className="kw-btn rv-write" href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
              <i className="fas fa-pen" /> Write a Google Review
            </a>
          )}
          <a className="rv-all" href={data.mapsUrl} target="_blank" rel="noopener noreferrer">
            Read all reviews on Google <i className="fas fa-arrow-right" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
