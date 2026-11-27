import PageBanner from "@/components/PageBanner";
import OfferBanner from "@/components/OfferBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import { PHONE_DISPLAY, PHONE_TEL, weeklySchedule } from "@/data/schedule";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us | Komla's Kitchen - Chicago African Food",
  description:
    "Contact Komla's Kitchen for authentic Ghanaian food delivery in Chicago. Call +1 (773) 690-2745 or visit us at 3718 S Indiana Ave, Chicago, IL.",
};

const ADDRESS = "3718 S Indiana Ave, Chicago, IL 60653";
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;
const IG_URL = "https://www.instagram.com/komlaskitchen?utm_source=qr&igsh=MXg0ZGU5OWpwcWNz";
const TIKTOK_URL = "https://www.tiktok.com/@chalekomlacooks0?_r=1&_t=ZS-97Faf2TUkMe";

const SHORT = { Monday: "Mon", Tuesday: "Tue", Wednesday: "Wed", Thursday: "Thu", Friday: "Fri", Saturday: "Sat", Sunday: "Sun" };
const deliveryLines = weeklySchedule.map((b) => ({
  days: b.days.map((d) => SHORT[d]).join(" · "),
  times: b.delivery.map((d) => d.time).join(" & "),
}));

const ContactPage = () => {
  return (
    <FoodKingLayout>
      <PageBanner
        pageName="Contact"
        title={
          <>
            Let&apos;s talk <em>food.</em>
          </>
        }
        subtitle="Catering, large orders or simply craving home — we'd love to hear from you."
        images={["/pictures/opt/kontomire_stew2.webp"]}
      />

      <div className="lx-light">
        <section className="lx-sec">
          <div className="container">
            <div className="cx-grid">
              <div>
                <span className="lx-eyebrow">Get in Touch</span>
                <h2 className="lx-h2">
                  We&apos;re here to <em>help.</em>
                </h2>
                <p className="lx-lead">Call for the fastest answer, or send a message and we&apos;ll get back to you.</p>

                <div className="cx-cards">
                  <a href={PHONE_TEL} className="cx-card cx-featured lx-glass lx-lift">
                    <span className="lx-icon">
                      <i className="fas fa-phone" />
                    </span>
                    <div>
                      <h3>Call to Order</h3>
                      <p>
                        <strong>{PHONE_DISPLAY}</strong>
                        The quickest way to order or ask a question.
                      </p>
                    </div>
                  </a>

                  <a href={DIRECTIONS} target="_blank" rel="noopener noreferrer" className="cx-card lx-glass lx-lift">
                    <span className="lx-icon">
                      <i className="fas fa-map-marker-alt" />
                    </span>
                    <div>
                      <h3>Visit Us</h3>
                      <p>3718 S Indiana Ave, Chicago, IL</p>
                      <span className="cx-link">
                        Get directions <i className="fas fa-arrow-right" />
                      </span>
                    </div>
                  </a>

                  <div className="cx-card lx-glass">
                    <span className="lx-icon">
                      <i className="fas fa-clock" />
                    </span>
                    <div>
                      <h3>Opening Hours</h3>
                      <p>
                        Monday – Sunday
                        <br />
                        <b>11:00 AM – 9:00 PM</b>
                      </p>
                    </div>
                  </div>

                  <div className="cx-card lx-glass">
                    <span className="lx-icon">
                      <i className="fas fa-shipping-fast" />
                    </span>
                    <div>
                      <h3>Delivery Times</h3>
                      {deliveryLines.map((d) => (
                        <p key={d.days}>
                          {d.days}
                          <br />
                          <b>{d.times}</b>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="cx-social">
                  <span>Follow us</span>
                  <a href={IG_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="fab fa-instagram" />
                  </a>
                  <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                    <i className="fab fa-tiktok" />
                  </a>
                </div>
              </div>

              <div id="message" className="cx-form lx-glass contact-form-items">
                <span className="lx-eyebrow">Write to Us</span>
                <h3>Send us a message</h3>
                <p>Questions, large orders or catering — tell us what you need.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        <section className="lx-sec">
          <div className="container">
            <div className="cx-map lx-glass">
              <iframe
                title="Map of Komla's Kitchen at 3718 S Indiana Ave, Chicago"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="cx-map-foot">
                <span>
                  <i className="fas fa-map-marker-alt" />
                  {ADDRESS}
                </span>
                <a href={DIRECTIONS} target="_blank" rel="noopener noreferrer">
                  Get directions <i className="fas fa-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="lx-sec">
          <div className="container">
            <OfferBanner />
          </div>
        </section>
      </div>
    </FoodKingLayout>
  );
};

export default ContactPage;
