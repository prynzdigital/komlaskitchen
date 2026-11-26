import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us | Komla's Kitchen - Chicago African Food",
  description:
    "Contact Komla's Kitchen for authentic African food delivery in Chicago. Call 312-287-8155 or visit us at 3718 S Indiana Ave, Chicago, IL.",
};

const ADDRESS = "3718 S Indiana Ave, Chicago, IL 60653";
const MAP_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS)}&output=embed`;
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;

const contactInfo = [
  { icon: "fas fa-map-marker-alt", title: "Visit Us", lines: ["3718 S Indiana Ave", "Chicago, IL"], href: DIRECTIONS, external: true },
  { icon: "fas fa-phone", title: "Call to Order", lines: ["312-287-8155"], href: "tel:3122878155", featured: true },
  { icon: "fas fa-clock", title: "Opening Hours", lines: ["Monday – Sunday", "11:00 AM – 9:00 PM"] },
];

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
        subtitle="Planning a celebration, placing a large order or simply craving home? We'd love to hear from you."
        images={["/pictures/opt/kontomire_stew2.webp", "/pictures/opt/kelewele.webp", "/pictures/opt/sobolo.webp"]}
        chip={{ icon: "fas fa-phone", title: "312-287-8155", sub: "Open daily, 11 AM – 9 PM" }}
      >
        <a href="tel:3122878155" className="kw-btn kw-btn-fill">
          <i className="fas fa-phone" /> Call Now
        </a>
        <a href="#message" className="kw-btn kw-btn-glass">
          Send a Message
        </a>
      </PageBanner>

      <section className="lx-sec">
        <div className="container">
          <div className="lx-info">
            {contactInfo.map((item) => {
              const body = (
                <>
                  <span className="lx-icon">
                    <i className={item.icon} />
                  </span>
                  <h3>{item.title}</h3>
                  {item.lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </>
              );
              const cls = `lx-info-card lx-glass lx-lift${item.featured ? " lx-featured" : ""}`;
              return item.href ? (
                <a
                  key={item.title}
                  href={item.href}
                  className={cls}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {body}
                </a>
              ) : (
                <div key={item.title} className={cls}>
                  {body}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="message" className="lx-sec" style={{ scrollMarginTop: 90 }}>
        <div className="container">
          <div className="lx-contact">
            <div className="lx-map lx-glass">
              <iframe
                title="Map of Komla's Kitchen at 3718 S Indiana Ave, Chicago"
                src={MAP_EMBED}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="lx-map-foot">
                <span>
                  <i className="fas fa-map-marker-alt" style={{ color: "var(--gilt-400)", marginRight: 8 }} />
                  {ADDRESS}
                </span>
                <a href={DIRECTIONS} target="_blank" rel="noopener noreferrer">
                  Get directions <i className="fas fa-arrow-right" />
                </a>
              </div>
            </div>

            <div className="lx-form lx-glass contact-form-items">
              <span className="lx-eyebrow">Write to Us</span>
              <h3>Send us a message</h3>
              <p>Questions, large orders or catering — tell us what you need and we&apos;ll get back to you.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </FoodKingLayout>
  );
};

export default ContactPage;
