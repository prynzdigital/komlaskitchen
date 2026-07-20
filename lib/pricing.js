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
