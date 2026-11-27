import { Resend } from "resend";

const FROM_ADDRESS = "Komla's Kitchen <jacob@komlaskitchen.com>";
const LIMITS = { name: 120, email: 200, phone: 40, message: 4000 };

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

const clean = (value, max) => String(value ?? "").trim().slice(0, max);

export async function POST(request) {
  try {
    const body = (await request.json()) || {};

    // Hidden field real visitors never fill — bots that do get a silent "ok".
    if (clean(body.website, 200)) {
      return Response.json({ ok: true });
    }

    const name = clean(body.name, LIMITS.name);
    const email = clean(body.email, LIMITS.email);
    const phone = clean(body.phone, LIMITS.phone);
    const message = clean(body.message, LIMITS.message);

    if (!name || !email || !message) {
      return Response.json({ error: "Please fill in your name, email and message." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const notifyEmail = process.env.CONTACT_NOTIFICATION_EMAIL || process.env.ORDER_NOTIFICATION_EMAIL;
    if (!apiKey || !notifyEmail) {
      return Response.json({ error: "Messages are not configured yet." }, { status: 500 });
    }

    const html = `
      <h2>New website message</h2>
      <p><strong>${escapeHtml(name)}</strong><br/>
      ${escapeHtml(email)}${phone ? ` · ${escapeHtml(phone)}` : ""}</p>
      <div style="margin-top:12px;padding:14px 16px;background:#f7f2ea;border-radius:8px;white-space:pre-wrap;">${escapeHtml(message)}</div>
      <p style="color:#777;font-size:12px;margin-top:16px;">Reply to this email to answer ${escapeHtml(name)} directly.</p>
    `;

    const result = await new Resend(apiKey).emails.send({
      from: FROM_ADDRESS,
      to: notifyEmail,
      replyTo: email,
      subject: `Website message from ${name}`,
      html,
    });

    // The Resend SDK returns { data, error } rather than throwing.
    if (result.error) {
      console.error("Contact email error:", result.error);
      return Response.json({ error: "We couldn't send your message." }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return Response.json({ error: "We couldn't send your message." }, { status: 500 });
  }
}
