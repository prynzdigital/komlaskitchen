// Shared price math for menu items — legacy flat-price items use a "$14.99"
// string; tiered items use a `sizes` array plus optional protein selection.
export function computeUnitPrice(item, { size, protein } = {}) {
  if (item.sizes && item.sizes.length > 0) {
    const sizeObj = item.sizes.find((s) => s.label === size) || item.sizes[0];
    let total = sizeObj.price;
    if (item.proteinAddOns && protein) {
      const addOn = item.proteinAddOns.find((p) => p.name === protein);
      if (addOn) total += addOn.prices[sizeObj.label] || 0;
    }
    return total;
  }
  return parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;
}

export function formatCurrency(amount) {
  return `$${amount.toFixed(2)}`;
}

// Cart-item selections (base, size, single protein, and/or an
// included-proteins list) rendered as one human-readable string.
export function describeCartItemSelections(item, separator = " · ") {
  const parts = [item.selectedBase, item.selectedSize, item.selectedProtein];
  if (Array.isArray(item.selectedProteins)) {
    parts.push(
      item.selectedProteins.length > 0 ? `with ${item.selectedProteins.join(", ")}` : "no protein"
    );
  }
  return parts.filter(Boolean).join(separator);
}
