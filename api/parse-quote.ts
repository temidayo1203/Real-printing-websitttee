// Vercel serverless function — parses free-text print requests into
// structured quote fields using Gemini. Falls back handled client-side.
// Env var needed in Vercel project settings:
//   GEMINI_API_KEY — from aistudio.google.com

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const MODEL = "gemini-3.1-flash-lite";

const PROMPT = `You are the friendly AI assistant of Real Printing, a Nigerian custom-printing business (t-shirts, hoodies, caps, tote bags, mugs, banners and merch — DTF, screen print, embroidery, sublimation). Classify the customer's message and reply with ONLY a JSON object, no prose, no markdown.

Schema:
{
  "intent": "quote" if the message asks for, describes, or implies a print order or pricing — otherwise "chat",
  "product": one of "T-shirt" | "Hoodie" | "Cap" | "Tote bag" | "Mug" | null,
  "qty": integer number of pieces, or null,
  "locations": integer 1-4 count of print positions (front, back, sleeves, pocket...), or null,
  "colours": integer 1-8 ink colours per design ("full colour" = 4), or null,
  "method": one of "DTF transfer" | "Screen print" | "Embroidery" | "Sublimation" | null,
  "city": one of "Lagos" | "Abuja" | "Port Harcourt" | "Ibadan" | "Benin City" | "Enugu" | "Kano" | "Kaduna" | "Ilorin" | "Jos" | "Abeokuta" | "Warri" | "Onitsha" | "Uyo" | "Calabar" | null,
  "assumed": array of strings naming every field you guessed because the message did not state it (e.g. "Colours: 1"),
  "reply": a short friendly message (1-2 sentences, max ~40 words) written to the customer, warm and helpful. For "quote" intent: confirm what you understood in plain words and invite them to adjust anything on the left. For "chat" intent: answer their question naturally — you can talk about printing, products, pricing basics, delivery (we deliver across Nigeria) or timelines; for anything off-topic, answer briefly and steer back to how you can help with their printing needs. No emojis.
}

Rules: use null for any quote field not stated. "t-shirts"/"tees"/"polos" = T-shirt; "hoodies"/"sweatshirts" = Hoodie; "caps"/"hats"/"snapbacks" = Cap; "totes"/"bags" = Tote bag; "mugs"/"cups"/"tumblers" = Mug. Embroidery keyword implies method Embroidery. Nearby Nigeria city names map to the closest list entry. For "chat" intent all quote fields are null.`;

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!GEMINI_API_KEY) return res.status(503).json({ error: "AI not configured" });
  const text = String(req.body?.text || "").slice(0, 800).trim();
  if (!text) return res.status(400).json({ error: "No text" });

  try {
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `${PROMPT}\n\nCustomer message: """${text}"""` }] }],
          generationConfig: { temperature: 0, responseMimeType: "application/json" },
        }),
      }
    );
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
