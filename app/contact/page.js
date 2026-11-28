import PageBanner from "@/components/PageBanner";
import OfferBanner from "@/components/OfferBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import { getSchedule, getSettings } from "@/lib/siteData";
import { telHref } from "@/lib/siteDefaults";
import ContactForm from "./ContactForm";

export async function generateMetadata() {
  const settings = await getSettings();
  const phones = [settings.phonePrimary, settings.phoneSecondary].filter(Boolean).join(" or ");
  return {
    title: "Contact Us | Komla's Kitchen - Chicago African Food",
    description: `Contact ${settings.name} for authentic Ghanaian food delivery in Chicago. Call ${phones}, or visit us at ${settings.address}.`,
  };
}

const SHORT = { Monday: "Mon", Tuesday: "Tue", Wednesday: "Wed", Thursday: "Thu", Friday: "Fri", Saturday: "Sat", Sunday: "Sun" };

const ContactPage = async () => {
  const [settings, schedule] = await Promise.all([getSettings(), getSchedule()]);
  const ADDRESS = [settings.address, settings.postalCode].filter(Boolean).join(" ");
  const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;
  const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;
  const phones = [settings.phonePrimary, settings.phoneSecondary].filter(Boolean);
  const socials = [
    { href: settings.instagram, icon: "fab fa-instagram", label: "Instagram" },
    { href: settings.tiktok, icon: "fab fa-tiktok", label: "TikTok" },
    { href: settings.facebook, icon: "fab fa-facebook-f", label: "Facebook" },
  ].filter((x) => x.href);
  const deliveryLines = (schedule.blocks || []).map((b) => ({
    days: b.days.map((d) => SHORT[d] || d).join(" · "),
    times: b.delivery.map((d) => d.time).join(" & "),
  }));
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
                  <div className="cx-card cx-featured lx-glass lx-lift">
                    <span className="lx-icon">
                      <i className="fas fa-phone" />
                    </span>
                    <div>
                      <h3>Call to Order</h3>
                      <p>
                        {phones.map((p) => (
                          <a key={p} className="cx-phone" href={telHref(p)}>
                            {p}
                          </a>
                        ))}
                        The quickest way to order or ask a question.
                      </p>
                    </div>
                  </div>

                  <a href={DIRECTIONS} target="_blank" rel="noopener noreferrer" className="cx-card lx-glass lx-lift">
                    <span className="lx-icon">
                      <i className="fas fa-map-marker-alt" />
                    </span>
                    <div>
                      <h3>Visit Us</h3>
                      <p>{settings.address}</p>
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
                        Every day
                        <br />
                        <b>{settings.hours}</b>
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
                  {socials.map((x) => (
                    <a key={x.label} href={x.href} target="_blank" rel="noopener noreferrer" aria-label={x.label}>
                      <i className={x.icon} />
                    </a>
                  ))}
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
                title={`Map of ${settings.name} at ${settings.address}`}
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
