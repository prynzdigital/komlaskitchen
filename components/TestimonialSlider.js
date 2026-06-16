"use client";

import { sliderProps } from "@/utility/sliderProps";
import { Swiper, SwiperSlide } from "swiper/react";

const testimonials = [
  {
    name: "Abena M.",
    role: "Chicago, IL",
    text: "The jollof rice tastes just like home. I grew up in Ghana and nothing in Chicago comes close — until I found Komla's Kitchen. Absolutely incredible!",
  },
  {
    name: "Marcus T.",
    role: "South Side, Chicago",
    text: "Best African food delivery in Chicago, no contest. The kontomire stew is rich, flavorful, and exactly how my grandmother used to make it.",
  },
  {
    name: "Fatima A.",
    role: "Hyde Park, Chicago",
    text: "Fresh, delicious, and always on time. The beans and plantain are a family favorite. My kids ask for Komla's Kitchen every week!",
  },
  {
    name: "James O.",
    role: "Bronzeville, Chicago",
    text: "I ordered the grilled feast platter for a family gathering and everyone was amazed. The portions are generous and the flavors are authentic.",
  },
  {
    name: "Serena K.",
    role: "Pilsen, Chicago",
    text: "The okra soup reminds me of my mother's cooking back in Nigeria. So comforting and full of flavor. Komla's Kitchen is a gem!",
  },
  {
    name: "David N.",
    role: "Lincoln Park, Chicago",
    text: "Tried African food for the first time through Komla's Kitchen. Totally blown away by the flavors. The vegetable rice is my new favorite dish.",
  },
];

const TestimonialSlider = ({ sectionBg = true }) => {
  return (
    <section
      className={`testimonial-section fix section-padding ${sectionBg ? "section-bg" : ""}`}
    >
      <div className="container">
        <div className="section-title text-center">
          <span className="wow fadeInUp">What Our Customers Say</span>
          <h2 className="wow fadeInUp" data-wow-delay=".3s">
            Loved by <span>Chicagoans</span>
          </h2>
        </div>
        <div className="testimonial-wrapper style-responsive mt-4">
          <div className="testimonial-items text-center">
            <Swiper
              {...sliderProps.testimonialContentSlider}
              className="swiper testimonial-content-slider"
            >
              <div className="swiper-wrapper">
                {testimonials.map((t, i) => (
                  <SwiperSlide key={i} className="swiper-slide">
                    <div className="testimonial-content">
                      <div className="client-info">
                        <h4>{t.name}</h4>
                        <h5>{t.role}</h5>
                      </div>
                      <h3>&ldquo;{t.text}&rdquo;</h3>
                      <div className="star">
                        <span className="fas fa-star" />
                        <span className="fas fa-star" />
                        <span className="fas fa-star" />
                        <span className="fas fa-star" />
                        <span className="fas fa-star" />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;

export const TestimonialSlider2 = () => <TestimonialSlider sectionBg={false} />;
export const TestimonialSlider3 = () => <TestimonialSlider />;

