"use client";
import PageBanner from "@/components/PageBanner";
import TestimonialSlider from "@/components/TestimonialSlider";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import Link from "next/link";

const AboutPage = () => {
  return (
    <FoodKingLayout>
      <PageBanner pageName={"About Us"} />

      {/* ── Our Story ── */}
      <section className="about-section fix section-padding section-bg">
        <div className="container">
          <div className="about-wrapper">
            <div className="row align-items-center g-5">
              <div className="col-xl-6 col-lg-6 wow fadeInUp" data-wow-delay=".3s">
                <div className="about-image" style={{ borderRadius: 16, overflow: "hidden", boxShadow: "0 12px 40px rgba(0,0,0,0.15)" }}>
                  <img
                    src="/pictures/jollof_main_dish.jpeg"
                    alt="Komla's Kitchen signature dishes made with love"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="about-content">
                  <div className="section-title">
                    <span className="wow fadeInUp">Our Story</span>
                    <h2 className="wow fadeInUp" data-wow-delay=".3s">
                      From Our Kitchen to <span>Your Table.</span>
                    </h2>
                  </div>
                  <p className="wow fadeInUp" data-wow-delay=".5s">
                    Komla&apos;s Kitchen was founded from a passion for sharing
                    authentic African cuisine with families throughout Chicago.
                    Every meal is prepared with care using traditional recipes
                    passed down through generations.
                  </p>
                  <p className="wow fadeInUp" data-wow-delay=".6s">
                    What started as a labor of love in our home kitchen grew into
                    a full-service delivery kitchen because people kept asking for
                    more. We believe great food has the power to bring people
                    together — and that&apos;s exactly what we set out to do every
                    single day.
                  </p>
                  <div className="icon-area mt-4">
                    <div className="icon-items d-flex wow fadeInUp" data-wow-delay=".3s">
                      <div className="icon">
                        <i className="fas fa-star" />
                      </div>
                      <div className="content">
                        <h4>Traditional Recipes</h4>
                        <p>
                          Every dish honors the authentic flavors and techniques
                          of West African cooking.
                        </p>
                      </div>
                    </div>
                    <div className="icon-items d-flex wow fadeInUp" data-wow-delay=".5s">
                      <div className="icon">
                        <i className="fas fa-award" />
                      </div>
                      <div className="content">
                        <h4>Community-Loved</h4>
                        <p>
                          Trusted by Chicago families for fresh, flavorful, and
                          consistently excellent African meals.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="info-area d-flex align-items-center mt-4">
                    <Link
                      href="/food-menu"
                      className="theme-btn wow fadeInUp"
                      data-wow-delay=".3s"
                    >
                      <span className="button-content-wrapper d-flex align-items-center">
                        <span className="button-icon"><i className="fas fa-motorcycle" /></span>
                        <span className="button-text">Order Now</span>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Mission ── */}
      <section
        className="main-cta-banner-2 section-padding bg-cover"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #e8272a 100%)",
        }}
      >
        <div className="container">
          <div className="row align-items-center justify-content-between g-4">
            <div className="col-lg-7">
              <div className="section-title mb-0">
                <span className="wow fadeInUp" style={{ color: "#f5a623" }}>Our Mission</span>
                <h2 className="text-white wow fadeInUp" data-wow-delay=".3s">
                  Bringing People Together Through <span style={{ color: "#f5a623" }}>Food.</span>
                </h2>
                <p className="text-white wow fadeInUp" data-wow-delay=".5s" style={{ opacity: 0.9, marginTop: "1rem", lineHeight: 1.8 }}>
                  To bring people together through flavorful meals that celebrate
                  African culture, hospitality, and community. We believe every
                  plate is an opportunity to share a piece of our heritage and
                  create a moment of joy.
                </p>
              </div>
            </div>
            <div className="col-lg-4 text-lg-end wow fadeInUp" data-wow-delay=".6s">
              <div className="delivery-man">
                <img src="assets/img/delivery-man-2.png" alt="Fast delivery from Komla's Kitchen" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="food-processing-section section-padding fix section-bg">
        <div className="container">
          <div className="section-title text-center">
            <span className="wow fadeInUp">What We Stand For</span>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              Our <span>Values</span>
            </h2>
          </div>
          <div className="food-processing-wrapper">
            <div className="row g-4">
              {[
                {
                  step: "01",
                  title: "Authenticity",
                  desc: "We never cut corners. Every recipe stays true to its African roots, using traditional methods and genuine ingredients.",
                  active: false,
                  delay: ".3s",
                },
                {
                  step: "02",
                  title: "Quality",
                  desc: "Only the freshest ingredients make it into our kitchen. We hold every dish to the highest standard before it reaches you.",
                  active: true,
                  delay: ".5s",
                },
                {
                  step: "03",
                  title: "Community",
                  desc: "We are part of Chicago's fabric. We support local communities and celebrate the diversity that makes this city great.",
                  active: false,
                  delay: ".7s",
                },
                {
                  step: "04",
                  title: "Excellence",
                  desc: "From preparation to delivery, we pursue excellence in every detail so you enjoy a truly exceptional experience.",
                  active: false,
                  delay: ".9s",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="col-xl-3 col-md-6 wow fadeInUp"
                  data-wow-delay={item.delay}
                >
                  <div className={`food-processing-items style-2 center ${item.active ? "active" : ""}`}>
                    <div className="food-processing-image">
                      <div className="number">
                        <span>{item.step}</span>
                      </div>
                    </div>
                    <div className="food-processing-content">
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Photo Gallery Strip ── */}
      <section className="fix section-padding pt-0 section-bg">
        <div className="container">
          <div className="section-title text-center">
            <span className="wow fadeInUp">A Taste of Africa</span>
            <h2 className="wow fadeInUp" data-wow-delay=".3s">
              Fresh from Our <span>Kitchen</span>
            </h2>
          </div>
          <div className="row g-3 mt-3">
            {[
              { src: "/pictures/kontomire_stew.jpeg", alt: "Traditional Ghanaian kontomire stew" },
              { src: "/pictures/okro_soup.jpeg", alt: "West African okra soup" },
              { src: "/pictures/beans_and_plantain.jpeg", alt: "Beans and fried plantain" },
              { src: "/pictures/vegetable_rice.jpeg", alt: "African vegetable fried rice" },
              { src: "/pictures/jollof.jpeg", alt: "Jollof rice with chicken" },
              { src: "/pictures/dishes.jpeg", alt: "Assorted African dishes from Komla's Kitchen" },
            ].map((img, i) => (
              <div key={i} className="col-xl-4 col-md-6 wow fadeInUp" data-wow-delay={`${0.2 + i * 0.1}s`}>
                <div style={{ borderRadius: 10, overflow: "hidden", height: 200 }}>
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <TestimonialSlider sectionBg={false} />

      {/* ── Final CTA ── */}
      <section
        className="booking-section mt-0 fix section-padding bg-cover"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/pictures/jollof2.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <div className="section-title">
                <span className="wow fadeInUp" style={{ color: "#f5a623" }}>
                  Ready to Taste Africa?
                </span>
                <h2 className="text-white wow fadeInUp" data-wow-delay=".3s">
                  Let&apos;s Feed Your Soul.
                </h2>
              </div>
              <div className="d-flex justify-content-center flex-wrap gap-3 mt-4 wow fadeInUp" data-wow-delay=".5s">
                <Link href="/food-menu" className="theme-btn">
                  <span className="button-content-wrapper d-flex align-items-center">
                    <span className="button-icon"><i className="fas fa-motorcycle" /></span>
                    <span className="button-text">Order Now</span>
                  </span>
                </Link>
                <a href="tel:3122878155" className="theme-btn" style={{ background: "#fff", color: "#e8272a" }}>
                  <span className="button-content-wrapper d-flex align-items-center">
                    <span className="button-icon"><i className="fas fa-phone" style={{ color: "#e8272a" }} /></span>
                    <span className="button-text">Call Us</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FoodKingLayout>
  );
};

export default AboutPage;
