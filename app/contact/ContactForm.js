"use client";

import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", website: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

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

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSending(true);
    setSendError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "We couldn't send your message.");
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", message: "", website: "" });
    } catch (err) {
      setSendError(err.message || "We couldn't send your message.");
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <div className="lx-sent" role="status">
        <i className="fas fa-check-circle" />
        <h4>Message Sent!</h4>
        <p>
          Thank you for reaching out. We&apos;ll get back to you shortly. Or call us at{" "}
          <a href="tel:+13125545481">+1 (312) 554-5481</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row g-3">
        <div className="col-lg-12">
          <div className="form-clt">
            <input type="text" name="name" id="name" placeholder="Your Name *" value={formData.name} onChange={handleChange} aria-label="Your name" aria-required="true" />
            <div className="icon"><i className="fal fa-user" /></div>
            {errors.name && <span style={{ color: "var(--red-400)", fontSize: "0.8rem" }}>{errors.name}</span>}
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-clt">
            <input type="email" name="email" id="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} aria-label="Your email address" aria-required="true" />
            <div className="icon"><i className="fal fa-envelope" /></div>
            {errors.email && <span style={{ color: "var(--red-400)", fontSize: "0.8rem" }}>{errors.email}</span>}
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-clt">
            <input type="tel" name="phone" id="phone" placeholder="Phone Number (optional)" value={formData.phone} onChange={handleChange} aria-label="Your phone number" />
            <div className="icon"><i className="fal fa-phone" /></div>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="form-clt-big form-clt">
            <textarea name="message" id="message" placeholder="Your Message *" value={formData.message} onChange={handleChange} aria-label="Your message" aria-required="true" />
            <div className="icon"><i className="fal fa-edit" /></div>
            {errors.message && <span style={{ color: "var(--red-400)", fontSize: "0.8rem" }}>{errors.message}</span>}
          </div>
        </div>
        <div aria-hidden="true" style={{ position: "absolute", left: "-10000px", width: 1, height: 1, overflow: "hidden" }}>
          <label htmlFor="website">Leave this field empty</label>
          <input type="text" name="website" id="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={handleChange} />
        </div>
        {sendError && (
          <div className="col-lg-12">
            <p role="alert" style={{ color: "var(--red-400)", fontSize: "0.88rem", margin: 0 }}>
              {sendError} Please call us at <a href="tel:+13125545481" style={{ color: "var(--gilt-600)", fontWeight: 600 }}>+1 (312) 554-5481</a>.
            </p>
          </div>
        )}
        <div className="col-lg-12">
          <button
            type="submit"
            disabled={sending}
            className="kw-btn kw-btn-fill"
            style={{ width: "100%", justifyContent: "center", border: 0, cursor: sending ? "default" : "pointer", opacity: sending ? 0.7 : 1 }}
          >
            <i className={sending ? "fas fa-spinner fa-spin" : "fas fa-paper-plane"} /> {sending ? "Sending…" : "Send Message"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactForm;
