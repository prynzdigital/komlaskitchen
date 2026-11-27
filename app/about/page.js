"use client";
import PageBanner from "@/components/PageBanner";
import { testimonials } from "@/components/TestimonialSlider";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import Link from "next/link";

const VALUES = [
  {
    n: "01",
    title: "Authenticity",
    desc: "We never cut corners. Every recipe stays true to its Ghanaian roots, with traditional methods and genuine ingredients.",
  },
  {
    n: "02",
    title: "Quality",
    desc: "Only the freshest ingredients reach our pots, and every dish is held to the highest standard before it reaches you.",
  },
  {
    n: "03",
    title: "Community",
    desc: "We are part of Chicago's fabric — proud to feed its families and celebrate the diversity that makes this city great.",
  },
  {
    n: "04",
    title: "Excellence",
    desc: "From preparation to delivery, we pursue excellence in every detail so each meal feels like an occasion.",
  },
];

const MOSAIC = [
  { src: "/pictures/opt/jollof2.webp", cap: "Party Jollof", cls: "tall" },
  { src: "/pictures/opt/okro_soup_sq.webp", cap: "Okra Soup", cls: "" },
  { src: "/pictures/opt/kelewele.webp", cap: "Kelewele", cls: "" },
  { src: "/pictures/opt/sobolo.webp", cap: "Sobolo", cls: "tall" },
  { src: "/pictures/opt/kontomire_stew2.webp", cap: "Kontomire with Rice", cls: "wide" },
  { src: "/pictures/opt/beans_and_plantain.webp", cap: "Red Red", cls: "" },
  { src: "/pictures/opt/chicken_bg.webp", cap: "Party Trays", cls: "wide" },
  { src: "/pictures/opt/jollof_main_dish.webp", cap: "Jollof Rice", cls: "" },
];

const initials = (name) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .replace(/[^A-Z]/g, "")
    .slice(0, 2);

const AboutPage = () => {
  return (
    <FoodKingLayout>
      <PageBanner
        pageName="About Us"
        title={
          <>
            Heritage, <em>plated</em> with love.
          </>
        }
        subtitle="A Chicago kitchen with Ghanaian soul — slow-cooked family recipes, shared one generous plate at a time."
        images={["/pictures/opt/chicken_bg.webp"]}
      />
      <div className="lx-light">
  
        {/* ── Story ── */}
        <section className="lx-sec">
          <div className="container">
            <div className="lx-story">
              <div className="lx-story-art">
                <div className="lx-story-frame" />
                <div className="lx-story-main">
                  <img src="/pictures/opt/jollof2.webp" alt="Party jollof with chicken" loading="lazy" />
                </div>
                <div className="lx-story-side">
                  <img src="/pictures/opt/okro_soup_sq.webp" alt="Okra soup" loading="lazy" />
                </div>
                <div className="lx-quote-card lx-glass">
                  <p>&ldquo;Every pot tells a story of home.&rdquo;</p>
                  <span>— Komla&apos;s Kitchen</span>
                </div>
              </div>
  
              <div>
                <span className="lx-eyebrow">Our Story</span>
                <h2 className="lx-h2">
                  From our kitchen <em>to your table.</em>
                </h2>
                <p className="lx-lead">
                  Komla&apos;s Kitchen was founded from a passion for sharing authentic Ghanaian cuisine with families
                  throughout Chicago. Every meal is prepared with care using traditional recipes passed down through
                  generations.
                </p>
                <p className="lx-lead">
                  What started as a labour of love in our home kitchen grew into a full-service delivery kitchen because
                  people kept asking for more. We believe great food has the power to bring people together — and
                  that&apos;s exactly what we set out to do every single day.
                </p>
                <div className="lx-points">
                  <div className="lx-point lx-glass">
                    <span className="lx-icon">
                      <i className="fas fa-star" />
                    </span>
                    <div>
                      <h4>Traditional Recipes</h4>
                      <p>Every dish honours the authentic flavours and techniques of Ghanaian cooking.</p>
                    </div>
                  </div>
                  <div className="lx-point lx-glass">
                    <span className="lx-icon">
                      <i className="fas fa-award" />
                    </span>
                    <div>
                      <h4>Community-Loved</h4>
                      <p>Trusted by Chicago families for fresh, flavourful and consistently excellent meals.</p>
                    </div>
                  </div>
                </div>
                <Link href="/food-menu" className="kw-btn kw-btn-fill">
                  <i className="fas fa-motorcycle" /> Order Now
                </Link>
              </div>
            </div>
          </div>
        </section>
  
        {/* ── Mission ── */}
        <section className="lx-sec">
          <div className="container">
            <div className="lx-glass lx-mission">
              <div>
                <span className="lx-eyebrow">Our Mission</span>
                <div className="lx-mark" aria-hidden="true">
                  &ldquo;
                </div>
                <blockquote>
                  To bring people together through flavourful meals that celebrate Ghanaian culture, hospitality and
                  community — because every plate is a chance to share a piece of our heritage.
                </blockquote>
                <Link href="/contact" className="kw-btn kw-btn-glass">
                  Say hello <i className="fas fa-arrow-right" />
                </Link>
              </div>
              <div className="lx-mission-img">
                <img src="/pictures/opt/kelewele.webp" alt="Golden kelewele" loading="lazy" />
              </div>
            </div>
          </div>
        </section>
  
        {/* ── Values ── */}
        <section className="lx-sec">
          <div className="container">
            <div className="lx-center lx-head">
              <span className="lx-eyebrow">What We Stand For</span>
              <h2 className="lx-h2">
                Our <em>values</em>
              </h2>
            </div>
            <div className="lx-values">
              {VALUES.map((v) => (
                <div key={v.n} className="lx-value lx-glass lx-lift">
                  <span className="lx-num">{v.n}</span>
                  <h3>{v.title}</h3>
                  <p>{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
  
        {/* ── Gallery ── */}
        <section className="lx-sec">
          <div className="container">
            <div className="lx-center lx-head">
              <span className="lx-eyebrow">A Taste of Ghana</span>
              <h2 className="lx-h2">
                Fresh from our <em>kitchen</em>
              </h2>
            </div>
            <div className="lx-mosaic">
              {MOSAIC.map((m) => (
                <figure key={m.src} className={m.cls}>
                  <img src={m.src} alt={m.cap} loading="lazy" />
                  <figcaption>{m.cap}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
  
        {/* ── Reviews ── */}
        <section className="lx-sec">
          <div className="container">
            <div className="lx-center lx-head">
              <span className="lx-eyebrow">Kind Words</span>
              <h2 className="lx-h2">
                Loved across <em>Chicago</em>
              </h2>
            </div>
            <div className="lx-reviews">
              {testimonials.slice(0, 3).map((t) => (
                <figure key={t.name} className="lx-review lx-glass lx-lift" style={{ margin: 0 }}>
                  <div className="lx-stars" aria-label="Five stars">
                    ★★★★★
                  </div>
                  <p>&ldquo;{t.text}&rdquo;</p>
                  <figcaption className="lx-who">
                    <span>{initials(t.name)}</span>
                    <div>
                      <b>{t.name}</b>
                      <small>{t.role}</small>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
  
        {/* ── Finale ── */}
        <section className="lx-finale">
          <img src="/pictures/opt/jollof_main.webp" alt="" loading="lazy" />
          <div className="container">
            <span className="lx-eyebrow" style={{ justifyContent: "center" }}>
              Ready When You Are
            </span>
            <h2 className="lx-h2" style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.6rem)" }}>
              Let us feed your <em>soul.</em>
            </h2>
            <p className="lx-lead" style={{ margin: "0 auto 34px" }}>
              Order online in minutes, or call and we&apos;ll plan the perfect meal with you.
            </p>
            <div className="lx-actions">
              <Link href="/food-menu" className="kw-btn kw-btn-fill">
                <i className="fas fa-motorcycle" /> Order Now
              </Link>
              <a href="tel:+17736902745" className="kw-btn kw-btn-glass">
                <i className="fas fa-phone" /> Call Us
              </a>
            </div>
          </div>
        </section>
      </div>
    </FoodKingLayout>
  );
};

export default AboutPage;
