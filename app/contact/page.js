import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import ContactForm from "./ContactForm";

export const metadata = {
  title: "Contact Us | Komla's Kitchen - Chicago African Food",
  description:
    "Contact Komla's Kitchen for authentic African food delivery in Chicago. Call 312-287-8155 or visit us at 3718 S Indiana Ave, Chicago, IL.",
};

const contactInfo = [
  {
    icon: "fal fa-map-marker-alt",
    title: "Our Address",
    lines: ["3718 S Indiana Ave", "Chicago, IL"],
    delay: ".3s",
    active: false,
  },
  {
    icon: "fal fa-phone",
    title: "Phone Number",
    lines: ["312-287-8155"],
    delay: ".5s",
    active: true,
    link: "tel:3122878155",
  },
  {
    icon: "fal fa-clock",
    title: "Business Hours",
    lines: ["Monday – Sunday", "11:00 AM – 9:00 PM"],
    delay: ".7s",
    active: false,
  },
];

const ContactPage = () => {
  return (
    <FoodKingLayout>
      <PageBanner pageName={"Contact Us"} />

      {/* ── Contact Info Cards ── */}
      <section className="contact-info-section fix section-padding section-bg">
        <div className="container">
          <div className="row g-4">
            {contactInfo.map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={item.delay}>
                <div className={`contact-info-items ${item.active ? "active" : ""} text-center`}>
                  <div className="icon">
                    <i className={item.icon} style={{ fontSize: "1.75rem" }} />
                  </div>
                  <div className="content">
                    <h3>{item.title}</h3>
                    {item.link ? (
                      <p>
                        <a href={item.link} style={{ color: "inherit", fontWeight: 600 }}>
                          {item.lines[0]}
                        </a>
                      </p>
                    ) : (
                      item.lines.map((line, i) => <p key={i}>{line}</p>)
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Map + Form ── */}
      <section className="contact-section section-padding pt-0 section-bg">
        <div className="container">
          <div className="contact-area">
            <div className="row justify-content-between g-5">
              {/* Google Map */}
              <div className="col-xl-6 col-lg-6">
                <div className="map-content-area">
                  <h3 className="wow fadeInUp" data-wow-delay=".3s">
                    Find Us in Chicago
                  </h3>
                  <p className="wow fadeInUp" data-wow-delay=".5s">
                    We&apos;re located at 3718 S Indiana Ave, Chicago, IL. Come
                    visit us or order for delivery straight to your door.
                  </p>
                  <div className="google-map wow fadeInUp" data-wow-delay=".7s">
                    <iframe
                      title="Komla's Kitchen location at 3718 S Indiana Ave, Chicago, IL"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2973.7025791849784!2d-87.62209282400384!3d41.82680617124234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880e2c14a0d0d0d1%3A0x123456789abcdef!2s3718%20S%20Indiana%20Ave%2C%20Chicago%2C%20IL%2060653!5e0!3m2!1sen!2sus!4v1700000000000"
                      style={{ border: 0, width: "100%", height: 400, borderRadius: 10 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Form (Client Component) */}
              <div className="col-xl-5 col-lg-5">
                <div className="contact-form-items">
                  <div className="contact-title">
                    <h3 className="wow fadeInUp" data-wow-delay=".3s">
                      Send Us a Message
                    </h3>
                    <p className="wow fadeInUp" data-wow-delay=".5s">
                      Have a question or want to place a large order? We&apos;d love
                      to hear from you.
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </FoodKingLayout>
  );
};

export default ContactPage;
