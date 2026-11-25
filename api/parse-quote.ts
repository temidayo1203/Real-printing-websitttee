// Vercel serverless function — parses free-text print requests into
// structured quote fields using Gemini. Falls back handled client-side.
// Env var needed in Vercel project settings:
//   GEMINI_API_KEY — from aistudio.google.com

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const MODEL = "gemini-3.1-flash-lite";

const PROMPT = `You are the friendly AI assistant of Real Printing, a Nigerian custom-printing business (t-shirts, hoodies, caps, tote bags, mugs, banners and merch — DTF, screen print, embroidery, sublimation). Classify the customer's message and reply with ONLY a JSON object, no prose, no markdown.

Schema:
{
  "intent": "quote" ONLY if the message describes a job the customer wants done — it states or strongly implies an order, usually with a quantity or clear request (e.g. "24 hoodies with our logo", "I need 50 shirts printed", "quote me for 100 mugs"). Questions, vague asks, price enquiries without specs, and anything asking "how much", "do you", "can you", "what is" are ALWAYS "chat",
  "product": one of "T-shirt" | "Hoodie" | "Cap" | "Tote bag" | "Mug" | null,
  "qty": integer number of pieces, or null,
  "locations": integer 1-4 count of print positions (front, back, sleeves, pocket...), or null,
  "colours": integer 1-8 ink colours per design ("full colour" = 4), or null,
  "method": one of "DTF transfer" | "Screen print" | "Embroidery" | "Sublimation" | null,
  "city": one of "Lagos" | "Abuja" | "Port Harcourt" | "Ibadan" | "Benin City" | "Enugu" | "Kano" | "Kaduna" | "Ilorin" | "Jos" | "Abeokuta" | "Warri" | "Onitsha" | "Uyo" | "Calabar" | null,
  "assumed": array of strings naming every field you guessed because the message did not state it (e.g. "Colours: 1"),
  "reply": a short friendly message (1-2 sentences + one follow-up question, max ~50 words) written to the customer, warm and helpful. For "quote" intent: confirm what you understood in plain words and end by asking about any detail they didn't specify (e.g. quantity or print method). For "chat" intent: answer their question using ONLY the facts below — never invent numbers or policies — then end with a relevant follow-up question that moves them toward ordering. For anything off-topic or not covered by the facts, say you'd love to help with printing and ask what they'd like printed. No emojis.

Facts about Real Printing:
- In-house design team can create print-ready artwork — customers do not need their own design.
- Products: t-shirts, hoodies, caps, tote bags, mugs, water bottles, business cards, stickers, posters, uniforms and more.
- Bulk orders get volume discounts.
- Delivery: nationwide across Nigeria, tracked, 3-5 business days after production.
- Production: 48-72 hours standard turnaround once artwork is approved; rush available.
- Printing methods: DTF transfer, screen print, embroidery, sublimation, vinyl (HTV) — we recommend the best method for the fabric and budget.
- Customers may supply their own garments for print-only pricing.
- Contact: WhatsApp +234 810 838 5033, email printingreal18@gmail.com.
- Starting garment prices: t-shirts from ₦4,500, hoodies ₦9,500, caps ₦3,800, tote bags ₦4,200, mugs ₦3,500 — print cost is extra and depends on method and coverage, so exact prices need a quote.
}

Rules: use null for any quote field not stated. "t-shirts"/"tees"/"polos" = T-shirt; "hoodies"/"sweatshirts" = Hoodie; "caps"/"hats"/"snapbacks" = Cap; "totes"/"bags" = Tote bag; "mugs"/"cups"/"tumblers" = Mug. Embroidery keyword implies method Embroidery. Nearby Nigeria city names map to the closest list entry. For "chat" intent all quote fields are null.

You may be given the conversation history and the customer's current quote. When the latest message modifies an earlier request (e.g. "make it 50", "change to hoodies", "deliver to Ibadan instead", "use embroidery"), return intent "quote" with ONLY the fields that changed or are newly stated — everything else null. The current quote values are provided so you can resolve references like "that", "it", "the same but".`;


export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!GEMINI_API_KEY) return res.status(503).json({ error: "AI not configured" });
  const text = String(req.body?.text || "").slice(0, 800).trim();
  if (!text) return res.status(400).json({ error: "No text" });

  const history = Array.isArray(req.body?.history)
    ? req.body.history.slice(-8).map((m: any) => `${m.role === "user" ? "Customer" : "You"}: ${String(m.text || "").slice(0, 300)}`).join("\n")
    : "";
  const prev = req.body?.prev && typeof req.body.prev === "object"
    ? `Current quote: ${JSON.stringify(req.body.prev).slice(0, 300)}`
    : "";
  const context = [history && `Conversation so far:\n${history}`, prev].filter(Boolean).join("\n\n");

  const callGemini = () =>
    fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${PROMPT}\n\n${context ? context + "\n\n" : ""}Latest customer message: """${text}"""` }] }],
          generationConfig: { temperature: 0, responseMimeType: "application/json" },
        }),
      }
    );

  try {
    let r = await callGemini();
    if (!r.ok && r.status >= 500 || r.status === 429) {
      await new Promise((done) => setTimeout(done, 1500));
      r = await callGemini();
    }
    if (!r.ok) return res.status(502).json({ error: "Gemini request failed" });
    const data = await r.json();
    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    const parsed = JSON.parse(raw);
    return res.status(200).json({
      product: parsed.product ?? null,
      qty: typeof parsed.qty === "number" ? Math.min(5000, Math.max(1, Math.round(parsed.qty))) : null,
      locations: typeof parsed.locations === "number" ? Math.min(4, Math.max(1, Math.round(parsed.locations))) : null,
      colours: typeof parsed.colours === "number" ? Math.min(8, Math.max(1, Math.round(parsed.colours))) : null,
      method: parsed.method ?? null,
      city: parsed.city ?? null,
      assumed: Array.isArray(parsed.assumed) ? parsed.assumed.slice(0, 6).map(String) : [],
      reply: typeof parsed.reply === "string" ? parsed.reply.slice(0, 300) : null,
      intent: parsed.intent === "chat" ? "chat" : "quote",
    });
  } catch {
    return res.status(502).json({ error: "Parse failed" });
  }
}
