// Vercel serverless function — handles waitlist signups via Resend.
// Env vars needed in Vercel project settings:
//   RESEND_API_KEY     — from resend.com
//   NOTIFY_EMAIL       — printingreal18@gmail.com
//   FROM_EMAIL         — e.g. "Temidayo <hello@realprints.com.ng>" (requires verified domain in Resend)

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || "printingreal18@gmail.com";
const FROM_EMAIL = process.env.FROM_EMAIL || "Real Printing <onboarding@resend.dev>";

async function send(to: string, subject: string, html: string, replyTo?: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
      ...(replyTo ? { reply_to: replyTo } : {}),
    }),
  });
  if (!res.ok) throw new Error(await res.text());
}

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const email = String(req.body?.email || "").trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return res.status(400).json({ error: "Valid email required" });

  try {
    // 1) Notify the owner
    await send(
      NOTIFY_EMAIL,
      "New waitlist signup — Real Printing",
      `<p><b>${email}</b> just joined the designer-tool waitlist.</p>`,
      email
    );
    // 2) Auto-reply to the subscriber
    await send(
      email,
      "You're on the list — Real Printing.ng",
      `<div style="font-family:sans-serif;max-width:480px">
        <p>Hi!</p>
        <p><b>Temidayo here from Real Printing.ng</b> — thanks for joining the waitlist.
        You're on the early list, so you'll be the first to know when our online designer goes live.</p>
        <p>Need something printed in the meantime? Reply to this email or WhatsApp us at
        <a href="https://wa.me/2348108385033">+234 810 838 5033</a>.</p>
        <p>— Temidayo, Real Printing.ng</p>
      </div>`,
      NOTIFY_EMAIL
    );
    return res.status(200).json({ ok: true });
  } catch (err: any) {
    return res.status(500).json({ error: err?.message || "Failed to send" });
  }
}
