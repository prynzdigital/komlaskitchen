import { GOOGLE_REVIEW_URL } from "@/data/schedule";
import { googleReviewsSnapshot } from "@/data/googleReviews";

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

// `google` is the live result of getGoogleReviews() (fetched by the page on the server).
// When it's null, the saved snapshot of real Google reviews is shown instead.
const ReviewsSection = ({ google, limit = 3 }) => {
  const data = google?.reviews?.length ? google : googleReviewsSnapshot;
  const cards = data.reviews.slice(0, limit);

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

        <div className={`lx-reviews${cards.length < 3 ? " rv-few" : ""}`}>
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
                <i className="fab fa-google rv-g" aria-label="Posted on Google" />
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="rv-actions">
          <a className="kw-btn rv-write" href={GOOGLE_REVIEW_URL} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-pen" /> Write a Google Review
          </a>
          <a className="rv-all" href={data.mapsUrl} target="_blank" rel="noopener noreferrer">
            Read all reviews on Google <i className="fas fa-arrow-right" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
