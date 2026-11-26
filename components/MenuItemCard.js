"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/context/CartContext";
import { computeUnitPrice, formatCurrency } from "@/lib/pricing";

const Chip = ({ on, onClick, children }) => (
  <button type="button" className={`mc-chip${on ? " on" : ""}`} aria-pressed={on} onClick={onClick}>
    {children}
  </button>
);

const Group = ({ label, children }) => (
  <div className="mc-group">
    <div className="mc-label">{label}</div>
    <div className="mc-chips">{children}</div>
  </div>
);

const Photo = ({ item, priceLabel }) => (
  <div className="mc-img">
    {item.image ? (
      <img src={item.image} alt={item.alt} loading="lazy" />
    ) : (
      <div className="mc-noimg">
        <i className="fas fa-utensils" aria-hidden="true" />
        <span>Photo coming soon</span>
      </div>
    )}
    {item.popular && <span className="mc-tag">Popular</span>}
    <span className="mc-price">{priceLabel}</span>
  </div>
);

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
      <article className="mc-card lx-glass lx-lift">
        <Photo item={item} priceLabel="Custom pricing" />
        <div className="mc-body">
          <h4>{item.name}</h4>
          <p className="mc-desc" style={{ flex: 1 }}>
            {item.description}
          </p>
          <div className="mc-foot">
            <a href="tel:3122878155" className="kw-btn kw-btn-fill mc-add">
              <i className="fas fa-phone" /> Call to Order
            </a>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="mc-card lx-glass lx-lift">
      <Photo item={item} priceLabel={isTiered ? formatCurrency(unitPrice) : item.price} />

      <div className="mc-body">
        {item.badge && <span className="mc-badge">{item.badge}</span>}
        <h4>{item.name}</h4>
        <p className="mc-desc">{item.description}</p>

        {item.baseOptions && (
          <Group label="Choose base">
            {item.baseOptions.map((base) => (
              <Chip key={base} on={selectedBase === base} onClick={() => setSelectedBase(base)}>
                {base}
              </Chip>
            ))}
          </Group>
        )}

        {hasSizeChoice && (
          <Group label="Choose size">
            {item.sizes.map((s) => (
              <Chip key={s.label} on={selectedSize === s.label} onClick={() => setSelectedSize(s.label)}>
                {s.label} — {formatCurrency(s.price)}
              </Chip>
            ))}
          </Group>
        )}

        {isTiered && !hasSizeChoice && (
          <div className="mc-single">
            {item.sizes[0].label} — {formatCurrency(item.sizes[0].price)}
          </div>
        )}

        {item.proteinAddOns && (
          <Group label="Choose protein">
            {item.proteinAddOns.map((addOn) => {
              const extra = addOn.prices[selectedSize] || 0;
              return (
                <Chip key={addOn.name} on={selectedProtein === addOn.name} onClick={() => setSelectedProtein(addOn.name)}>
                  {addOn.name}
                  {extra > 0 ? ` (+${formatCurrency(extra)})` : ""}
                </Chip>
              );
            })}
          </Group>
        )}

        {item.proteinOptions && (
          <Group label="Choose protein">
            {item.proteinOptions.map((protein) => (
              <Chip key={protein} on={selectedProtein === protein} onClick={() => setSelectedProtein(protein)}>
                {protein}
              </Chip>
            ))}
          </Group>
        )}

        {item.includedProteins && (
          <Group label="Included proteins · tap to remove, price stays the same">
            {item.includedProteins.map((protein) => {
              const active = includedProteins.includes(protein);
              return (
                <Chip key={protein} on={active} onClick={() => toggleIncludedProtein(protein)}>
                  {active && <i className="fas fa-check" />} {protein}
                </Chip>
              );
            })}
          </Group>
        )}

        <div className="mc-foot">
          <div className="mc-row">
            <div className="mc-qty">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                –
              </button>
              <span>{quantity}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQuantity((q) => q + 1)}>
                +
              </button>
            </div>
            <div className="mc-total">{formatCurrency(unitPrice * quantity)}</div>
          </div>
          <div className="mc-actions">
            <button type="button" onClick={handleAddToCart} className={`kw-btn kw-btn-fill mc-add${added ? " added" : ""}`}>
              {added ? (
                <>
                  <i className="fas fa-check" /> Added
                </>
              ) : (
                <>
                  <i className="fas fa-cart-plus" /> Add to Cart
                </>
              )}
            </button>
            <a href="tel:3122878155" aria-label="Call to order" className="mc-call">
              <i className="fas fa-phone" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};

export default MenuItemCard;
