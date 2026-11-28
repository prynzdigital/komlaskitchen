import { Resend } from "resend";
import { EMAIL_RE, cleanLine, cleanText, crossSite, escapeHtml, rateLimited, readJson, recipientList } from "@/lib/requestGuard";

const FROM_ADDRESS = "Komla's Kitchen <jacob@komlaskitchen.com>";

const fail = (error, status = 400) => Response.json({ error }, { status });

export async function POST(request) {
  try {
    if (crossSite(request)) return fail("Forbidden.", 403);
    if (rateLimited(request, "contact", { limit: 5, windowMs: 10 * 60 * 1000 })) {
      return fail("Too many messages from this device — please wait a few minutes or call us.", 429);
    }

    const parsed = await readJson(request);
    if (parsed.error) return fail(parsed.error, parsed.status);
    const body = parsed.body;

    // Hidden field real visitors never fill — bots that do get a silent "ok".
    if (cleanLine(body.website, 200)) return Response.json({ ok: true });

    const name = cleanLine(body.name, 120);
    const email = cleanLine(body.email, 200);
    const phone = cleanLine(body.phone, 40);
    const message = cleanText(body.message, 4000);

    if (!name || !email || !message) return fail("Please fill in your name, email and message.");
    if (!EMAIL_RE.test(email)) return fail("Please enter a valid email address.");

    const apiKey = process.env.RESEND_API_KEY;
    const notifyEmails = recipientList(process.env.CONTACT_NOTIFICATION_EMAIL || process.env.ORDER_NOTIFICATION_EMAIL);
    if (!apiKey || notifyEmails.length === 0) return fail("Messages are not configured yet.", 500);

    const html = `
      <h2>New website message</h2>
      <p><strong>${escapeHtml(name)}</strong><br/>
      ${escapeHtml(email)}${phone ? ` · ${escapeHtml(phone)}` : ""}</p>
      <div style="margin-top:12px;padding:14px 16px;background:#f7f2ea;border-radius:8px;white-space:pre-wrap;">${escapeHtml(message)}</div>
      <p style="color:#777;font-size:12px;margin-top:16px;">Reply to this email to answer ${escapeHtml(name)} directly.</p>
    `;

    const result = await new Resend(apiKey).emails.send({
      from: FROM_ADDRESS,
      to: notifyEmails,
      replyTo: email,
      subject: `Website message from ${name.slice(0, 80)}`,
      html,
    });

    // The Resend SDK returns { data, error } rather than throwing.
    if (result.error) {
      console.error("Contact email error:", result.error);
      return fail("We couldn't send your message.", 500);
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return fail("We couldn't send your message.", 500);
  }
}
