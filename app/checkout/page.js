"use client";

import { useState } from "react";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import { useCart } from "@/context/CartContext";
import { formatCurrency, describeCartItemSelections } from "@/lib/pricing";

const inputStyle = {
  width: "100%",
  outline: "none",
  border: "1px solid var(--ink-line)",
  borderRadius: 10,
  padding: "14px 16px",
  fontSize: "1rem",
  color: "var(--paper)",
  background: "var(--ink-800)",
};

const labelStyle = { display: "block", color: "var(--paper-dim)", fontSize: "0.85rem", fontWeight: 600, marginBottom: 6 };

const CheckoutPage = () => {
  const { items, subtotal, clearCart, hydrated } = useCart();
  const [stage, setStage] = useState("details"); // details -> pay -> done
  const [form, setForm] = useState({ name: "", phone: "", email: "", fulfillment: "pickup", address: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [orderRef, setOrderRef] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateDetails = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.phone.trim()) e.phone = "Phone number is required.";
    if (!form.email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = "Please enter a valid email.";
    }
    if (form.fulfillment === "delivery" && !form.address.trim()) e.address = "Delivery address is required.";
    return e;
  };

  const handleContinue = (ev) => {
    ev.preventDefault();
    const e = validateDetails();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setStage("pay");
  };

  const handleConfirmPayment = async () => {
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: form, items, subtotal }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Something went wrong sending your order.");
      setOrderRef(data.orderRef);
      clearCart();
      setStage("done");
    } catch (err) {
      setSubmitError(err.message || "Something went wrong. Please call us instead: 708-808-0303.");
    } finally {
      setSubmitting(false);
    }
  };

  if (hydrated && items.length === 0 && stage !== "done") {
    return (
      <FoodKingLayout>
        <PageBanner pageName="Checkout" />
        <section style={{ background: "var(--ink-950)", padding: "80px 0", textAlign: "center" }}>
          <div className="container">
            <h3 style={{ color: "var(--paper)", marginBottom: 12 }}>Your cart is empty</h3>
            <p style={{ color: "var(--paper-dim)", marginBottom: 24 }}>Add something from the menu before checking out.</p>
            <Link
              href="/food-menu"
              style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--red-500)", color: "#fff", padding: "13px 30px", borderRadius: 12, fontWeight: 700, textDecoration: "none" }}
            >
              <i className="fas fa-utensils" /> Browse Menu
            </Link>
          </div>
        </section>
      </FoodKingLayout>
    );
  }

  return (
    <FoodKingLayout>
      <PageBanner pageName="Checkout" />
      <section style={{ background: "var(--ink-950)", padding: "64px 0" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              {stage === "details" && (
                <form onSubmit={handleContinue} noValidate>
                  <h4 style={{ color: "var(--paper)", marginBottom: 20 }}>Contact &amp; Fulfillment</h4>

                  <div style={{ marginBottom: 16 }}>
                    <label style={labelStyle} htmlFor="name">Full Name</label>
                    <input id="name" name="name" style={inputStyle} value={form.name} onChange={handleChange} />
                    {errors.name && <span style={{ color: "var(--red-400)", fontSize: "0.8rem" }}>{errors.name}</span>}
                  </div>

                  <div className="row g-3" style={{ marginBottom: 16 }}>
                    <div className="col-md-6">
                      <label style={labelStyle} htmlFor="phone">Phone Number</label>
                      <input id="phone" name="phone" type="tel" style={inputStyle} value={form.phone} onChange={handleChange} />
                      {errors.phone && <span style={{ color: "var(--red-400)", fontSize: "0.8rem" }}>{errors.phone}</span>}
                    </div>
                    <div className="col-md-6">
                      <label style={labelStyle} htmlFor="email">Email</label>
                      <input id="email" name="email" type="email" style={inputStyle} value={form.email} onChange={handleChange} />
                      {errors.email && <span style={{ color: "var(--red-400)", fontSize: "0.8rem" }}>{errors.email}</span>}
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <div style={labelStyle}>Pickup or Delivery?</div>
                    <div style={{ display: "flex", gap: 12 }}>
                      {["pickup", "delivery"].map((option) => (
                        <label
                          key={option}
                          style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            border: `1.5px solid ${form.fulfillment === option ? "var(--red-500)" : "var(--ink-line)"}`,
                            background: form.fulfillment === option ? "oklch(0.56 0.2 25 / 0.12)" : "var(--ink-800)",
                            color: "var(--paper)",
                            borderRadius: 10,
                            padding: "12px 16px",
                            cursor: "pointer",
                            textTransform: "capitalize",
                            fontWeight: 600,
                          }}
                        >
                          <input
                            type="radio"
                            name="fulfillment"
                            value={option}
                            checked={form.fulfillment === option}
                            onChange={handleChange}
                            style={{ accentColor: "var(--red-500)" }}
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  </div>

                  {form.fulfillment === "delivery" && (
                    <div style={{ marginBottom: 16 }}>
                      <label style={labelStyle} htmlFor="address">Delivery Address</label>
                      <textarea
                        id="address"
                        name="address"
                        rows={3}
                        style={{ ...inputStyle, resize: "vertical" }}
                        value={form.address}
                        onChange={handleChange}
                      />
                      {errors.address && <span style={{ color: "var(--red-400)", fontSize: "0.8rem" }}>{errors.address}</span>}
                    </div>
                  )}

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      background: "var(--red-500)",
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      padding: "14px",
                      fontWeight: 700,
                      fontSize: "1rem",
                      cursor: "pointer",
                      marginTop: 8,
                    }}
                  >
                    Continue to Payment
                  </button>
                </form>
              )}

              {stage === "pay" && (
                <div>
                  <h4 style={{ color: "var(--paper)", marginBottom: 20 }}>Order Summary</h4>
                  <div style={{ background: "var(--ink-800)", borderRadius: 12, padding: 20, marginBottom: 24 }}>
                    {items.map((item) => (
                      <div key={item.cartItemId} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, color: "var(--paper-dim)", fontSize: "0.9rem" }}>
                        <span>
                          {item.quantity}× {item.name}
                          {describeCartItemSelections(item, ", ") ? ` (${describeCartItemSelections(item, ", ")})` : ""}
                        </span>
                        <span style={{ color: "var(--paper)", fontWeight: 600 }}>{formatCurrency(item.unitPrice * item.quantity)}</span>
                      </div>
                    ))}
                    <hr style={{ borderColor: "var(--ink-line)", margin: "12px 0" }} />
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--paper)", fontWeight: 800 }}>
                      <span>Total</span>
                      <span>{formatCurrency(subtotal)}</span>
                    </div>
                  </div>

                  <h4 style={{ color: "var(--paper)", marginBottom: 12 }}>Pay with Zelle</h4>
                  <div
                    style={{
                      border: "2px dashed var(--ink-line-hover)",
                      borderRadius: 12,
                      padding: 28,
                      textAlign: "center",
                      marginBottom: 20,
                    }}
                  >
                    <i className="fas fa-qrcode" style={{ fontSize: "3rem", color: "var(--gold-400)", marginBottom: 12 }} />
                    <div style={{ color: "var(--paper)", fontWeight: 700, marginBottom: 4 }}>
                      Zelle QR code coming soon
                    </div>
                    <p style={{ color: "var(--paper-faint)", fontSize: "0.85rem", margin: 0 }}>
                      In the meantime, please Zelle {formatCurrency(subtotal)} to Komla&apos;s Kitchen directly, or
                      call 708-808-0303 for payment details, then click &ldquo;I&apos;ve Paid&rdquo; below.
                    </p>
                  </div>

                  {submitError && (
                    <p style={{ color: "var(--red-400)", marginBottom: 12 }}>{submitError}</p>
                  )}

                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      type="button"
                      onClick={() => setStage("details")}
                      style={{ flex: 1, background: "var(--ink-800)", color: "var(--paper)", border: "1px solid var(--ink-line)", borderRadius: 10, padding: "14px", fontWeight: 600, cursor: "pointer" }}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleConfirmPayment}
                      disabled={submitting}
                      style={{
                        flex: 2,
                        background: "var(--red-500)",
                        color: "#fff",
                        border: "none",
                        borderRadius: 10,
                        padding: "14px",
                        fontWeight: 700,
                        fontSize: "1rem",
                        cursor: submitting ? "default" : "pointer",
                        opacity: submitting ? 0.7 : 1,
                      }}
                    >
                      {submitting ? "Sending…" : "I've Paid"}
                    </button>
                  </div>
                </div>
              )}

              {stage === "done" && (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <i className="fas fa-check-circle" style={{ fontSize: "3rem", color: "var(--green-500)", marginBottom: 16 }} />
                  <h3 style={{ color: "var(--paper)", marginBottom: 8 }}>Thanks — we&apos;ve got your order!</h3>
                  <p style={{ color: "var(--paper-dim)", marginBottom: 4 }}>
                    Order reference: <strong style={{ color: "var(--gold-400)" }}>{orderRef}</strong>
                  </p>
                  <p style={{ color: "var(--paper-dim)", marginBottom: 24 }}>
                    We&apos;ll confirm your payment and get your order started. Call 708-808-0303 with any questions.
                  </p>
                  <Link
                    href="/"
                    style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--red-500)", color: "#fff", padding: "13px 30px", borderRadius: 12, fontWeight: 700, textDecoration: "none" }}
                  >
                    Back to Home
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </FoodKingLayout>
  );
};

export default CheckoutPage;
