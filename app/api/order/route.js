import { Resend } from "resend";
import { describeCartItemSelections } from "@/lib/pricing";
import { priceOrder } from "@/lib/orderPricing";
import { recordOrder } from "@/lib/crm";
import { getMenu, getSettings } from "@/lib/siteData";
import { EMAIL_RE, cleanLine, cleanText, crossSite, escapeHtml, rateLimited, readJson, recipientList } from "@/lib/requestGuard";

const FROM_ADDRESS = "Komla's Kitchen <jacob@komlaskitchen.com>";

const formatMoney = (amount) => `$${Number(amount).toFixed(2)}`;

const describeItem = (line) => {
  const details = escapeHtml(describeCartItemSelections(line, ", "));
  const name = escapeHtml(line.name);
  return details ? `${name} (${details})` : name;
};

const buildItemsHtml = (lines) =>
  lines
    .map(
      (line) =>
        `<tr>
          <td style="padding:6px 0;">${line.quantity}× ${describeItem(line)}</td>
          <td style="padding:6px 0;text-align:right;">${formatMoney(line.lineTotal)}</td>
        </tr>`
    )
    .join("");

const fail = (error, status = 400) => Response.json({ error }, { status });

export async function POST(request) {
  try {
    if (crossSite(request)) return fail("Forbidden.", 403);
    if (rateLimited(request, "order", { limit: 5, windowMs: 10 * 60 * 1000 })) {
      return fail("Too many orders from this device — please wait a few minutes or call us.", 429);
    }

    const parsed = await readJson(request);
    if (parsed.error) return fail(parsed.error, parsed.status);
    const { customer: rawCustomer = {}, items, subtotal: clientSubtotal } = parsed.body;

    const [settings, menu] = await Promise.all([getSettings(), getMenu()]);
    if (settings.orderingOpen === false) return fail(settings.closedMessage || "Online ordering is paused right now.", 409);

    const customer = {
      name: cleanLine(rawCustomer.name, 120),
      phone: cleanLine(rawCustomer.phone, 40),
      email: cleanLine(rawCustomer.email, 200),
      fulfillment: rawCustomer.fulfillment === "delivery" ? "delivery" : "pickup",
      address: cleanText(rawCustomer.address, 400),
    };
    if (!customer.name || !customer.phone || !customer.email) return fail("Missing customer contact details.");
    if (!EMAIL_RE.test(customer.email)) return fail("Please enter a valid email address.");
    if (!/^[0-9+()\-.\s]{7,40}$/.test(customer.phone)) return fail("Please enter a valid phone number.");
    if (customer.fulfillment === "delivery" && !customer.address) return fail("Delivery address is required.");

    const priced = priceOrder(items, menu.items);
    if (priced.error) return fail(priced.error);
    const { lines, subtotal } = priced;

    const shownTotal = Number(clientSubtotal);
    const totalMismatch = !Number.isFinite(shownTotal) || Math.abs(shownTotal - subtotal) > 0.009;
    const orderRef = `KK-${Date.now().toString(36).toUpperCase()}${Math.floor(Math.random() * 36 * 36).toString(36).toUpperCase().padStart(2, "0")}`;

    // 1) Save to the CRM (Admin → Orders). A failure here must not lose the order email.
    let saved = null;
    try {
      saved = await recordOrder({ ref: orderRef, customer, lines, subtotal, clientSubtotal: shownTotal, totalMismatch });
    } catch (err) {
      console.error("Order save error:", err);
    }

    // 2) Email the kitchen. Recipients: Admin → Settings, else ORDER_NOTIFICATION_EMAIL (comma-separated).
    const apiKey = process.env.RESEND_API_KEY;
    const notifyEmails = recipientList(settings.notifyEmails, process.env.ORDER_NOTIFICATION_EMAIL);
    if (!apiKey || notifyEmails.length === 0) {
      if (saved) return Response.json({ ok: true, orderRef, total: subtotal });
      return fail("Email notifications are not configured.", 500);
    }

    const resend = new Resend(apiKey);
    const fulfillmentLine =
      customer.fulfillment === "delivery"
        ? `Delivery to: ${escapeHtml(customer.address)}`
        : `Pickup at ${escapeHtml(settings.address)}`;

    const customerName = escapeHtml(customer.name);
    const mismatchHtml = totalMismatch
      ? `<p style="color:#a00;"><strong>Check the amount:</strong> the customer's screen showed ${
          Number.isFinite(shownTotal) ? escapeHtml(formatMoney(shownTotal)) : "an invalid total"
        }, but menu prices total ${formatMoney(subtotal)}. Their cart may be outdated or edited.</p>`
      : "";

    const orderHtml = `
      <h2>New Order Received — ${orderRef}</h2>
      <p><strong>${customerName}</strong><br/>
      ${escapeHtml(customer.phone)} · ${escapeHtml(customer.email)}</p>
      <p>${fulfillmentLine}</p>
      ${mismatchHtml}
      <table style="width:100%;border-collapse:collapse;margin-top:12px;">
        ${buildItemsHtml(lines)}
        <tr><td style="padding-top:10px;border-top:1px solid #ddd;"><strong>Total (menu prices)</strong></td>
        <td style="padding-top:10px;border-top:1px solid #ddd;text-align:right;"><strong>${formatMoney(subtotal)}</strong></td></tr>
      </table>
    `;

    const paymentHtml = `
      <h2>Zelle Payment Confirmed (Customer-Reported) — ${orderRef}</h2>
      <p>${customerName} reported completing a Zelle payment for order ${orderRef}. The order totals <strong>${formatMoney(subtotal)}</strong> at menu prices.</p>
      <p>${escapeHtml(customer.phone)} · ${escapeHtml(customer.email)}<br/>${fulfillmentLine}</p>
      ${mismatchHtml}
      <p style="color:#a00;">This is not independently verified — please confirm the transfer actually landed in your Zelle account before preparing the order.</p>
    `;

    const [orderResult, paymentResult] = await Promise.all([
      resend.emails.send(
        {
          from: FROM_ADDRESS,
          to: notifyEmails,
          replyTo: customer.email,
          subject: `New order ${orderRef} — ${formatMoney(subtotal)} — ${customer.name.slice(0, 60)}`,
          html: orderHtml,
        },
        { idempotencyKey: `order-received/${orderRef}` }
      ),
      resend.emails.send(
        {
          from: FROM_ADDRESS,
          to: notifyEmails,
          replyTo: customer.email,
          subject: `Zelle payment reported: ${formatMoney(subtotal)} from ${customer.name.slice(0, 60)} — ${orderRef}`,
          html: paymentHtml,
        },
        { idempotencyKey: `payment-confirmed/${orderRef}` }
      ),
    ]);

    // The Resend SDK returns { data, error } rather than throwing.
    if (orderResult.error || paymentResult.error) {
      console.error("Order email error:", { order: orderResult.error, payment: paymentResult.error });
      if (!saved) return fail("Failed to send order notification.", 500);
    }

    return Response.json({ ok: true, orderRef, total: subtotal });
  } catch (err) {
    console.error("Order email error:", err);
    return fail("Failed to send order notification.", 500);
  }
}
