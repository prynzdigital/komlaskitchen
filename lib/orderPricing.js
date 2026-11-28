import { computeUnitPrice } from "@/lib/pricing";
import { cleanLine } from "@/lib/requestGuard";

const MAX_LINES = 30;
const MAX_QTY = 50;

// Rebuilds the order from the current CMS menu so prices never come from the browser.
// Returns { lines, subtotal } or { error }.
export function priceOrder(rawItems, menuItems) {
  if (!Array.isArray(rawItems) || rawItems.length === 0) return { error: "Your cart is empty." };
  if (rawItems.length > MAX_LINES) return { error: "Too many items in one order — please call us." };

  const lines = [];
  for (const raw of rawItems) {
    const item = menuItems.find((m) => m.id === Number(raw?.menuItemId));
    if (!item) return { error: "An item in your cart is no longer on the menu. Please refresh your cart." };
    if (item.callOnly) return { error: `${item.name} is priced by phone — please call us to order it.` };
    if (item.hidden || item.available === false) {
      return { error: `Sorry, ${item.name} is sold out today. Please remove it from your cart.` };
    }

    const quantity = Number(raw.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_QTY) {
      return { error: `Please choose a quantity between 1 and ${MAX_QTY} for ${item.name}.` };
    }

    const sizes = item.sizes || [];
    const size = sizes.length ? cleanLine(raw.selectedSize, 60) : null;
    if (sizes.length && !sizes.some((s) => s.label === size)) {
      return { error: `Please choose a valid size for ${item.name}.` };
    }

    const base = item.baseOptions ? cleanLine(raw.selectedBase, 60) : null;
    if (item.baseOptions && !item.baseOptions.includes(base)) {
      return { error: `Please choose a valid base for ${item.name}.` };
    }

    const proteinChoices = item.proteinAddOns?.map((p) => p.name) || item.proteinOptions || null;
    const protein = proteinChoices ? cleanLine(raw.selectedProtein, 60) : null;
    if (proteinChoices && !proteinChoices.includes(protein)) {
      return { error: `Please choose a valid protein for ${item.name}.` };
    }

    let included;
    if (item.includedProteins) {
      const picked = Array.isArray(raw.selectedProteins) ? raw.selectedProteins.map((p) => cleanLine(p, 60)) : [];
      included = item.includedProteins.filter((p) => picked.includes(p));
    }

    const unitPrice = computeUnitPrice(item, { size, protein });
    lines.push({
      menuItemId: item.id,
      name: item.name,
      quantity,
      unitPrice,
      lineTotal: unitPrice * quantity,
      selectedSize: size,
      selectedBase: base,
      selectedProtein: protein,
      selectedProteins: included,
    });
  }

  const subtotal = Math.round(lines.reduce((sum, l) => sum + l.lineTotal, 0) * 100) / 100;
  return { lines, subtotal };
}
