import { GOOGLE_REVIEW_URL } from "@/data/schedule";
import { testimonials } from "@/data/testimonials";

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

const Stars = ({ rating }) => (
  <div className="lx-stars" aria-label={`${rating} out of 5 stars`}>
    {"★".repeat(rating)}
    <span className="rv-star-off">{"★".repeat(5 - rating)}</span>
  </div>
);

// `google` is the result of getGoogleReviews() (fetched by the page on the server),
// or null — then the kitchen's own testimonials are shown instead.
const ReviewsSection = ({ google, limit = 3 }) => {
  const live = Boolean(google?.reviews?.length);
  const cards = live
    ? google.reviews.slice(0, limit)
    : testimonials.slice(0, limit).map((t) => ({ author: t.name, when: t.role, text: t.text, rating: 5 }));

  return (
    <section className="lx-sec rv lx-light">
      <div className="container">
        <div className="lx-center lx-head">
          <span className="lx-eyebrow">Kind Words</span>
          <h2 className="lx-h2">
            Loved across <em>Chicago</em>
          </h2>
          {live && google.rating && (
            <a className="rv-summary" href={google.mapsUrl} target="_blank" rel="noopener noreferrer">
              <i className="fab fa-google" aria-hidden="true" />
              <b>{google.rating.toFixed(1)}</b>
              <span className="rv-summary-stars" aria-hidden="true">
                ★★★★★
              </span>
              <small>
                {google.count} Google review{google.count === 1 ? "" : "s"}
              </small>
            </a>
          )}
        </div>

        <div className="lx-reviews">
          {cards.map((r, i) => (
            <figure key={`${r.author}-${i}`} className="lx-review lx-glass lx-lift" style={{ margin: 0 }}>
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
                {live && <i className="fab fa-google rv-g" aria-label="Posted on Google" />}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="rv-actions">
          <a className="kw-btn rv-write" href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-pen" /> Write a Google Review
          </a>
          {live && (
            <a className="rv-all" href={google.mapsUrl} target="_blank" rel="noopener noreferrer">
              Read all reviews on Google <i className="fas fa-arrow-right" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
