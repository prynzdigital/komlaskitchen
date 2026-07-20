"use client";

import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import FoodKingLayout from "@/layouts/FoodKingLayout";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/pricing";

const describeSelections = (item) =>
  [item.selectedBase, item.selectedSize, item.selectedProtein].filter(Boolean).join(" · ");

const CartPage = () => {
  const { items, removeItem, updateQuantity, subtotal, hydrated } = useCart();

  return (
    <FoodKingLayout>
      <PageBanner pageName="Your Cart" />
      <section style={{ background: "var(--ink-950)", padding: "64px 0" }}>
        <div className="container">
          {!hydrated ? null : items.length === 0 ? (
            <div style={{ textAlign: "center", padding: "64px 0" }}>
              <i className="fas fa-shopping-cart" style={{ fontSize: "3rem", color: "var(--paper-faint)", marginBottom: 20 }} />
              <h3 style={{ color: "var(--paper)", marginBottom: 12 }}>Your cart is empty</h3>
              <p style={{ color: "var(--paper-dim)", marginBottom: 24 }}>
                Browse the menu and add a few dishes to get started.
              </p>
              <Link
                href="/food-menu"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "var(--red-500)",
                  color: "#fff",
                  padding: "13px 30px",
                  borderRadius: 12,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                <i className="fas fa-utensils" /> Browse Menu
              </Link>
            </div>
          ) : (
            <div className="row g-4">
              <div className="col-lg-8">
                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    style={{
                      display: "flex",
                      gap: 16,
                      background: "var(--ink-800)",
                      boxShadow: "var(--shadow-border)",
                      borderRadius: 14,
                      padding: 16,
                      marginBottom: 16,
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 10,
                        overflow: "hidden",
                        flexShrink: 0,
                        background: "var(--ink-900)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {item.image ? (
                        <img src={item.image} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <i className="fas fa-utensils" style={{ color: "var(--gold-400)", fontSize: "1.3rem" }} />
                      )}
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ color: "var(--paper)", fontWeight: 700, marginBottom: 2 }}>{item.name}</div>
                      {describeSelections(item) && (
                        <div style={{ color: "var(--paper-faint)", fontSize: "0.8rem" }}>
                          {describeSelections(item)}
                        </div>
                      )}
                      <div style={{ color: "var(--gold-400)", fontWeight: 700, fontSize: "0.9rem", marginTop: 4 }}>
                        {formatCurrency(item.unitPrice)} each
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid var(--ink-line)",
                        borderRadius: 8,
                        flexShrink: 0,
                      }}
                    >
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        style={{ width: 34, height: 34, background: "none", border: "none", color: "var(--paper)", cursor: "pointer" }}
                      >
                        –
                      </button>
                      <span style={{ width: 28, textAlign: "center", color: "var(--paper)", fontWeight: 700 }}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        style={{ width: 34, height: 34, background: "none", border: "none", color: "var(--paper)", cursor: "pointer" }}
                      >
                        +
                      </button>
                    </div>

                    <div style={{ width: 80, textAlign: "right", color: "var(--paper)", fontWeight: 800, flexShrink: 0 }}>
                      {formatCurrency(item.unitPrice * item.quantity)}
                    </div>

                    <button
                      type="button"
                      aria-label={`Remove ${item.name}`}
                      onClick={() => removeItem(item.cartItemId)}
                      style={{
                        width: 40,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "none",
                        border: "none",
                        color: "var(--red-400)",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                    >
                      <i className="fas fa-trash-alt" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="col-lg-4">
                <div
                  style={{
                    background: "var(--ink-800)",
                    boxShadow: "var(--shadow-border)",
                    borderRadius: 14,
                    padding: 24,
                    position: "sticky",
                    top: 120,
                  }}
                >
                  <h4 style={{ color: "var(--paper)", marginBottom: 16 }}>Order Summary</h4>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--paper-dim)", marginBottom: 8 }}>
                    <span>Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <p style={{ color: "var(--paper-faint)", fontSize: "0.8rem", marginBottom: 20 }}>
                    Delivery fee, if any, is arranged directly with the restaurant at checkout.
                  </p>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "var(--paper)", fontWeight: 800, fontSize: "1.1rem", marginBottom: 20 }}>
                    <span>Total</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    style={{
                      display: "block",
                      textAlign: "center",
                      background: "var(--red-500)",
                      color: "#fff",
                      padding: "13px 20px",
                      borderRadius: 10,
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/food-menu"
                    style={{
                      display: "block",
                      textAlign: "center",
                      color: "var(--paper-dim)",
                      marginTop: 12,
                      fontSize: "0.85rem",
                      textDecoration: "none",
                    }}
                  >
                    ← Continue browsing
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </FoodKingLayout>
  );
};

export default CartPage;
