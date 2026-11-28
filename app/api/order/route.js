import { Resend } from "resend";
import { describeCartItemSelections } from "@/lib/pricing";
import { priceOrder } from "@/lib/orderPricing";
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

    const priced = priceOrder(items);
    if (priced.error) return fail(priced.error);
    const { lines, subtotal } = priced;

    const apiKey = process.env.RESEND_API_KEY;
    // ORDER_NOTIFICATION_EMAIL may list several addresses, separated by commas.
    const notifyEmails = recipientList(process.env.ORDER_NOTIFICATION_EMAIL);
    if (!apiKey || notifyEmails.length === 0) return fail("Email notifications are not configured.", 500);

    const shownTotal = Number(clientSubtotal);
    const totalMismatch = !Number.isFinite(shownTotal) || Math.abs(shownTotal - subtotal) > 0.009;

    const resend = new Resend(apiKey);
    const orderRef = `KK-${Date.now().toString(36).toUpperCase()}`;
    const fulfillmentLine =
      customer.fulfillment === "delivery"
        ? `Delivery to: ${escapeHtml(customer.address)}`
        : "Pickup at 3718 S Indiana Ave, Chicago, IL";

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
      return fail("Failed to send order notification.", 500);
    }

    return Response.json({ ok: true, orderRef, total: subtotal });
  } catch (err) {
    console.error("Order email error:", err);
    return fail("Failed to send order notification.", 500);
  }
}
