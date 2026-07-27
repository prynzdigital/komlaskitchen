"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { computeUnitPrice, formatCurrency } from "@/lib/pricing";

const pillStyle = (active) => ({
  padding: "6px 14px",
  borderRadius: 50,
  fontSize: "0.8rem",
  fontWeight: 600,
  border: `1.5px solid ${active ? "var(--red-500)" : "#ddd"}`,
  background: active ? "var(--red-500)" : "#fff",
  color: active ? "#fff" : "#3a3a3a",
  cursor: "pointer",
  transition: "all 0.15s ease-out",
});

const MenuItemCard = ({ item }) => {
  const { addItem } = useCart();
  const isTiered = Array.isArray(item.sizes) && item.sizes.length > 0;
  const hasSizeChoice = isTiered && item.sizes.length > 1;

  const [selectedBase, setSelectedBase] = useState(item.baseOptions?.[0] ?? null);
  const [selectedSize, setSelectedSize] = useState(item.sizes?.[0]?.label ?? null);
  const [selectedProtein, setSelectedProtein] = useState(
    item.proteinAddOns?.[0]?.name ?? item.proteinOptions?.[0] ?? null
  );
  const [includedProteins, setIncludedProteins] = useState(item.includedProteins ?? []);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const unitPrice = useMemo(
    () => (isTiered ? computeUnitPrice(item, { size: selectedSize, protein: selectedProtein }) : computeUnitPrice(item)),
    [item, isTiered, selectedSize, selectedProtein]
  );

  const toggleIncludedProtein = (protein) => {
    setIncludedProteins((prev) =>
      prev.includes(protein) ? prev.filter((p) => p !== protein) : [...prev, protein]
    );
  };

  const handleAddToCart = () => {
    addItem({
      menuItemId: item.id,
      name: item.name,
      image: item.image,
      unitPrice,
      quantity,
      selectedSize,
      selectedBase,
      selectedProtein,
      selectedProteins: item.includedProteins ? includedProteins : undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  if (item.callOnly) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          overflow: "hidden",
          boxShadow:
            "0 0 0 1px oklch(0 0 0 / 0.06), 0 1px 2px -1px oklch(0 0 0 / 0.06), 0 8px 24px oklch(0 0 0 / 0.35)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ position: "relative", height: 200, overflow: "hidden", flexShrink: 0 }}>
          {item.image ? (
            <img src={item.image} alt={item.alt} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                background: "linear-gradient(135deg, var(--ink-900) 0%, var(--ink-800) 100%)",
                color: "var(--gold-400)",
              }}
              <i className="fas fa-utensils" aria-hidden="true" style={{ fontSize: "1.8rem" }} />
              <span style={{ color: "var(--paper-faint)", fontSize: "0.78rem", fontWeight: 600 }}>Photo coming soon</span>
            </div>
          )}
          {item.popular && (
            <span
              style={{
                position: "absolute",
                top: 10,
                left: 10,
                background: "var(--red-500)",
                color: "#fff",
                padding: "3px 10px",
                borderRadius: 20,
                fontSize: "0.72rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 0.5,
              }}
            >
              Popular
            </span>
          )}
          <span
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              background: "rgba(0,0,0,0.65)",
              color: "var(--gold-400)",
              padding: "3px 12px",
              borderRadius: 20,
              fontWeight: 700,
              fontSize: "0.82rem",
            }}
          >
            Custom Pricing
          </span>
        </div>
        <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
          <h4 style={{ fontWeight: 700, marginBottom: "0.5rem", color: "#1c1c1c" }}>{item.name}</h4>
          <p style={{ color: "#57534e", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: 14, flex: 1 }}>
            {item.description}
          </p>
          <a
            href="tel:3122878155"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "var(--red-500)",
              color: "#fff",
              borderRadius: 10,
              padding: "12px 14px",
              fontWeight: 700,
              fontSize: "0.9rem",
              textDecoration: "none",
            }}
          >
            <i className="fas fa-phone" /> Call to Order
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow:
          "0 0 0 1px oklch(0 0 0 / 0.06), 0 1px 2px -1px oklch(0 0 0 / 0.06), 0 8px 24px oklch(0 0 0 / 0.35)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={{ position: "relative", height: 200, overflow: "hidden", flexShrink: 0 }}>
        {item.image ? (
          <img
            src={item.image}
            alt={item.alt}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              background: "linear-gradient(135deg, var(--ink-900) 0%, var(--ink-800) 100%)",
              color: "var(--gold-400)",
            }}
          >
            <i className="fas fa-utensils" style={{ fontSize: "1.8rem" }} />
            <span style={{ color: "var(--paper-faint)", fontSize: "0.78rem", fontWeight: 600 }}>
              Photo coming soon
            </span>
          </div>
        )}
        {item.popular && (
          <span
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: "var(--red-500)",
              color: "#fff",
              padding: "3px 10px",
              borderRadius: 20,
              fontSize: "0.72rem",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 0.5,
            }}
          >
            Popular
          </span>
        )}
        <span
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "rgba(0,0,0,0.65)",
            color: "var(--gold-400)",
            padding: "3px 12px",
            borderRadius: 20,
            fontWeight: 700,
            fontSize: "0.9rem",
          }}
        >
          {isTiered ? formatCurrency(unitPrice) : item.price}
        </span>
      </div>

      <div style={{ padding: "1.25rem", flex: 1, display: "flex", flexDirection: "column" }}>
        {item.badge && (
          <span
            style={{
              alignSelf: "flex-start",
              background: "var(--green-100)",
              color: "var(--green-600)",
              fontSize: "0.7rem",
              fontWeight: 700,
              padding: "3px 10px",
              borderRadius: 20,
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: 0.3,
            }}
          >
            {item.badge}
          </span>
        )}

        <h4 style={{ fontWeight: 700, marginBottom: "0.5rem", color: "#1c1c1c" }}>{item.name}</h4>
        <p style={{ color: "#57534e", fontSize: "0.88rem", lineHeight: 1.6, marginBottom: 14 }}>
          {item.description}
        </p>

        {item.baseOptions && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#3a3a3a", marginBottom: 6 }}>
              Choose base
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {item.baseOptions.map((base) => (
                <button
                  key={base}
                  type="button"
                  style={pillStyle(selectedBase === base)}
                  onClick={() => setSelectedBase(base)}
                >
                  {base}
                </button>
              ))}
            </div>
          </div>
        )}

        {hasSizeChoice && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#3a3a3a", marginBottom: 6 }}>
              Choose size
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {item.sizes.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  style={pillStyle(selectedSize === s.label)}
                  onClick={() => setSelectedSize(s.label)}
                >
                  {s.label} — {formatCurrency(s.price)}
                </button>
              ))}
            </div>
          </div>
        )}

        {isTiered && !hasSizeChoice && (
          <div style={{ fontSize: "0.85rem", color: "#3a3a3a", fontWeight: 600, marginBottom: 12 }}>
            {item.sizes[0].label} — {formatCurrency(item.sizes[0].price)}
          </div>
        )}

        {item.proteinAddOns && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#3a3a3a", marginBottom: 6 }}>
              Choose protein
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {item.proteinAddOns.map((addOn) => {
                const extra = addOn.prices[selectedSize] || 0;
                return (
                  <button
                    key={addOn.name}
                    type="button"
                    style={pillStyle(selectedProtein === addOn.name)}
                    onClick={() => setSelectedProtein(addOn.name)}
                  >
                    {addOn.name}
                    {extra > 0 ? ` (+${formatCurrency(extra)})` : ""}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {item.proteinOptions && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#3a3a3a", marginBottom: 6 }}>
              Choose protein
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {item.proteinOptions.map((protein) => (
                <button
                  key={protein}
                  type="button"
                  style={pillStyle(selectedProtein === protein)}
                  onClick={() => setSelectedProtein(protein)}
                >
                  {protein}
                </button>
              ))}
            </div>
          </div>
        )}

        {item.includedProteins && (
          <div style={{ marginBottom: 12 }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "#3a3a3a", marginBottom: 6 }}>
              Included proteins (click to remove — price stays the same)
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {item.includedProteins.map((protein) => {
                const active = includedProteins.includes(protein);
                return (
                  <button
                    key={protein}
                    type="button"
                    style={pillStyle(active)}
                    onClick={() => toggleIncludedProtein(protein)}
                  >
                    {active ? <><i className="fas fa-check" /> {protein}</> : protein}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ marginTop: "auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1.5px solid #ddd",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                style={{ width: 36, height: 36, background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: "#1c1c1c" }}
              >
                –
              </button>
              <span style={{ width: 32, textAlign: "center", fontWeight: 700, fontSize: "0.9rem", color: "#1c1c1c" }}>
                {quantity}
              </span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
                style={{ width: 36, height: 36, background: "none", border: "none", cursor: "pointer", fontSize: "1rem", color: "#1c1c1c" }}
              >
                +
              </button>
            </div>
            <div style={{ fontWeight: 800, color: "var(--red-500)", fontSize: "1rem" }}>
              {formatCurrency(unitPrice * quantity)}
            </div>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              type="button"
              onClick={handleAddToCart}
              style={{
                flex: 1,
                background: added ? "var(--green-500)" : "var(--red-500)",
                color: "#fff",
                border: "none",
                borderRadius: 10,
                padding: "10px 14px",
                fontWeight: 700,
                fontSize: "0.88rem",
                cursor: "pointer",
                transition: "background 0.2s, transform 0.15s ease-out",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.96)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {added ? <><i className="fas fa-check" /> Added</> : <><i className="fas fa-cart-plus" /> Add to Cart</>}
            </button>
            <a
              href="tel:3122878155"
              aria-label="Call to order"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 44,
                height: 40,
                background: "#f4f4f4",
                color: "var(--red-500)",
                borderRadius: 10,
                textDecoration: "none",
              }}
            >
              <i className="fas fa-phone" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
