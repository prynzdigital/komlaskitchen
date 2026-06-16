"use client";

import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required.";
    if (!formData.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      e.email = "Please enter a valid email.";
    }
    if (!formData.message.trim()) e.message = "Message is required.";
    return e;
  };

  const handleChange = (ev) => {
    setFormData({ ...formData, [ev.target.name]: ev.target.value });
    if (errors[ev.target.name]) setErrors({ ...errors, [ev.target.name]: "" });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  if (submitted) {
    return (
      <div style={{ background: "#f0fdf4", border: "1px solid #22c55e", borderRadius: 10, padding: "2rem", textAlign: "center" }}>
        <i className="fas fa-check-circle" style={{ fontSize: "2.5rem", color: "#22c55e", marginBottom: "1rem" }} />
        <h4 style={{ color: "#15803d" }}>Message Sent!</h4>
        <p style={{ color: "#166534" }}>
          Thank you for reaching out. We&apos;ll get back to you shortly. Or call us at{" "}
          <a href="tel:3122878155" style={{ color: "#e8272a" }}>312-287-8155</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row g-4">
        <div className="col-lg-12 wow fadeInUp" data-wow-delay=".3s">
          <div className="form-clt">
            <input type="text" name="name" id="name" placeholder="Your Name *" value={formData.name} onChange={handleChange} aria-label="Your name" aria-required="true" />
            <div className="icon"><i className="fal fa-user" /></div>
            {errors.name && <span style={{ color: "#e8272a", fontSize: "0.8rem" }}>{errors.name}</span>}
          </div>
        </div>
        <div className="col-lg-12 wow fadeInUp" data-wow-delay=".4s">
          <div className="form-clt">
            <input type="email" name="email" id="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} aria-label="Your email address" aria-required="true" />
            <div className="icon"><i className="fal fa-envelope" /></div>
            {errors.email && <span style={{ color: "#e8272a", fontSize: "0.8rem" }}>{errors.email}</span>}
          </div>
        </div>
        <div className="col-lg-12 wow fadeInUp" data-wow-delay=".5s">
          <div className="form-clt">
            <input type="tel" name="phone" id="phone" placeholder="Phone Number (optional)" value={formData.phone} onChange={handleChange} aria-label="Your phone number" />
            <div className="icon"><i className="fal fa-phone" /></div>
          </div>
        </div>
        <div className="col-lg-12 wow fadeInUp" data-wow-delay=".6s">
          <div className="form-clt-big form-clt">
            <textarea name="message" id="message" placeholder="Your Message *" value={formData.message} onChange={handleChange} aria-label="Your message" aria-required="true" />
            <div className="icon"><i className="fal fa-edit" /></div>
            {errors.message && <span style={{ color: "#e8272a", fontSize: "0.8rem" }}>{errors.message}</span>}
          </div>
        </div>
        <div className="col-lg-12 wow fadeInUp" data-wow-delay=".7s">
          <button type="submit" className="theme-btn" style={{ width: "100%" }}>
            <span className="button-content-wrapper d-flex align-items-center justify-content-center">
              <span className="button-icon"><i className="fal fa-paper-plane" /></span>
              <span className="button-text">Send Message</span>
            </span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
