import { Resend } from "resend";
import { describeCartItemSelections } from "@/lib/pricing";

const FROM_ADDRESS = "Komla's Kitchen <jacob@komlaskitchen.com>";

const formatMoney = (amount) => `$${Number(amount).toFixed(2)}`;

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

const describeItem = (item) => {
  const details = escapeHtml(describeCartItemSelections(item, ", "));
  const name = escapeHtml(item.name);
  return details ? `${name} (${details})` : name;
};

const buildItemsHtml = (items) =>
  items
    .map(
      (item) =>
        `<tr>
          <td style="padding:6px 0;">${item.quantity}× ${describeItem(item)}</td>
          <td style="padding:6px 0;text-align:right;">${formatMoney(item.unitPrice * item.quantity)}</td>
        </tr>`
    )
    .join("");

export async function POST(request) {
  try {
    const body = await request.json();
    const { customer, items, subtotal } = body || {};

    if (!customer?.name || !customer?.phone || !customer?.email) {
      return Response.json({ error: "Missing customer contact details." }, { status: 400 });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return Response.json({ error: "Cart is empty." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.ORDER_NOTIFICATION_EMAIL;
    if (!apiKey || !notifyEmail) {
      return Response.json({ error: "Email notifications are not configured." }, { status: 500 });
    }

    const resend = new Resend(apiKey);
    const orderRef = `KK-${Date.now().toString(36).toUpperCase()}`;
    const fulfillmentLine =
      customer.fulfillment === "delivery"
        ? `Delivery to: ${escapeHtml(customer.address || "(no address provided)")}`
        : "Pickup at 3718 S Indiana Ave, Chicago, IL";

    const customerName = escapeHtml(customer.name);
    const customerPhone = escapeHtml(customer.phone);
    const customerEmail = escapeHtml(customer.email);

    const orderHtml = `
      <h2>New Order Received — ${orderRef}</h2>
      <p><strong>${customerName}</strong><br/>
      ${customerPhone} · ${customerEmail}</p>
      <p>${fulfillmentLine}</p>
      <table style="width:100%;border-collapse:collapse;margin-top:12px;">
        ${buildItemsHtml(items)}
        <tr><td style="padding-top:10px;border-top:1px solid #ddd;"><strong>Total</strong></td>
        <td style="padding-top:10px;border-top:1px solid #ddd;text-align:right;"><strong>${formatMoney(subtotal)}</strong></td></tr>
      </table>
    `;

    const paymentHtml = `
      <h2>Zelle Payment Confirmed (Customer-Reported) — ${orderRef}</h2>
      <p>${customerName} reported completing a Zelle payment of <strong>${formatMoney(subtotal)}</strong> for order ${orderRef}.</p>
      <p style="color:#a00;">This is not independently verified — please confirm the transfer actually landed in your Zelle account before preparing the order.</p>
    `;

    const [orderResult, paymentResult] = await Promise.all([
      resend.emails.send(
        {
          from: FROM_ADDRESS,
          to: notifyEmail,
          subject: `New Order Received — ${orderRef}`,
          html: orderHtml,
        },
        { idempotencyKey: `order-received/${orderRef}` }
      ),
      resend.emails.send(
        {
          from: FROM_ADDRESS,
          to: notifyEmail,
          subject: `Zelle Payment Confirmed — ${orderRef}`,
          html: paymentHtml,
        },
        { idempotencyKey: `payment-confirmed/${orderRef}` }
      ),
    ]);

    // The Resend SDK returns { data, error } rather than throwing —
    // errors must be checked explicitly or a failed send goes unnoticed.
    if (orderResult.error || paymentResult.error) {
      console.error("Order email error:", { order: orderResult.error, payment: paymentResult.error });
      return Response.json({ error: "Failed to send order notification." }, { status: 500 });
    }

    return Response.json({ ok: true, orderRef });
  } catch (err) {
    console.error("Order email error:", err);
    return Response.json({ error: "Failed to send order notification." }, { status: 500 });
  }
}
