import { useMemo, useRef, useState } from "react";
import { whatsappLink } from "../whatsapp";

type Product = { name: string; garment: number; keys: string[] };
const products: Product[] = [
  { name: "T-shirt", garment: 4500, keys: ["t-shirt", "tshirt", "t shirt", "tee", "shirt", "polo"] },
  { name: "Hoodie", garment: 9500, keys: ["hoodie", "sweatshirt", "jumper", "crewneck"] },
  { name: "Cap", garment: 3800, keys: ["cap", "hat", "snapback", "beanie"] },
  { name: "Tote bag", garment: 4200, keys: ["tote", "bag", "bags", "shopper"] },
  { name: "Mug", garment: 3500, keys: ["mug", "cup", "tumbler"] },
];
const methods = ["DTF transfer", "Screen print", "Embroidery", "Sublimation"];
const methodBase: Record<string, number> = {
  "DTF transfer": 4000,
  "Screen print": 4000,
  Embroidery: 5200,
  Sublimation: 4200,
};
const methodWhy: Record<string, string> = {
  "DTF transfer": "DTF handles full colour and small runs well, with no setup fee.",
  "Screen print": "Screen printing gives the lowest per-piece cost on larger runs with few colours.",
  Embroidery: "Embroidery gives a premium, durable finish — ideal for logos on caps and polos.",
  Sublimation: "Sublimation produces edge-to-edge, fade-proof colour on polyester garments.",
};
const cities = ["Lagos", "Abuja", "Port Harcourt", "Ibadan", "Benin City", "Enugu", "Kano", "Kaduna", "Ilorin", "Jos", "Abeokuta", "Warri", "Onitsha", "Uyo", "Calabar"];
const DELIVERY = 6500;
const fmt = (n: number) => "₦" + Math.round(n).toLocaleString("en-US");

const examples = [
  "24 black hoodies with our logo on the front and back, delivered to Abuja by next Friday",
  "100 white t-shirts, 1 colour print on the front, for our church event in Lagos",
  "12 branded caps with embroidery for my team, deliver to Port Harcourt",
];

type Parsed = { product: Product; qty: number; locations: number; colours: number; method: string; city: string; assumed: string[] };

function parseRequest(text: string): Parsed {
  const t = " " + text.toLowerCase().replace(/[-–—]/g, " ") + " ";
  const assumed: string[] = [];

  const qtyMatch = t.match(/\b(\d{1,4})\b/);
  const qty = qtyMatch ? Math.min(5000, Math.max(1, parseInt(qtyMatch[1], 10))) : 24;
  if (!qtyMatch) assumed.push("Quantity: 24");

  const product = products.find((p) => p.keys.some((k) => t.includes(" " + k))) || products[0];
  if (!products.some((p) => p.keys.some((k) => t.includes(" " + k)))) assumed.push("Product: T-shirt");

  const locWords = ["front", "back", "left sleeve", "right sleeve", "sleeve", "pocket", "neck label"];
  const locFound = new Set<string>();
  locWords.forEach((w) => {
    if (!t.includes(w)) return;
    if (w === "sleeve" && (t.includes("left sleeve") || t.includes("right sleeve") || t.includes("both sleeves"))) return;
    locFound.add(w);
  });
  const locations = locFound.size > 0 ? Math.min(4, locFound.size) : 1;
  if (locFound.size === 0) assumed.push("Print locations: 1");

  const colMatch = t.match(/\b(\d)\s*(?:colou?r|colour way)s?\b/) || (/\bfull\s*colou?r\b/.test(t) ? ["", "4"] : null);
  const colours = colMatch ? Math.min(8, Math.max(1, parseInt(colMatch[1], 10))) : 1;
  if (!colMatch) assumed.push("Colours: 1");

  const method = /embroider/.test(t) ? "Embroidery"
    : /screen/.test(t) ? "Screen print"
    : /sublim/.test(t) ? "Sublimation"
    : "DTF transfer";
  if (method === "DTF transfer" && !/dtf|transfer/.test(t)) assumed.push("Print method: DTF transfer");

  const city = cities.find((c) => t.includes(c.toLowerCase())) || "Lagos";
  if (!cities.some((c) => t.includes(c.toLowerCase()))) assumed.push("Deliver to: Lagos");

  return { product, qty, locations, colours, method, city, assumed };
}

const thinkSteps = ["Reading your request", "Choosing the best print method", "Calculating your price"];

export default function Estimator() {
  const [text, setText] = useState("");
  const [phase, setPhase] = useState<"idle" | "thinking" | "result">("idle");
  const [step, setStep] = useState(0);
  const [p, setP] = useState<Parsed | null>(null);
  const timers = useRef<number[]>([]);

  const remoteToParsed = (d: any, local: Parsed): Parsed => ({
    product: products.find((x) => x.name === d.product) || local.product,
    qty: d.qty ?? local.qty,
    locations: d.locations ?? local.locations,
    colours: d.colours ?? local.colours,
    method: methods.includes(d.method) ? d.method : local.method,
    city: cities.includes(d.city) ? d.city : local.city,
    assumed: Array.isArray(d.assumed) && d.assumed.length ? d.assumed : local.assumed,
  });

  const run = (value: string) => {
    if (!value.trim()) return;
    timers.current.forEach(clearTimeout);
    setPhase("thinking");
    setStep(0);
    const local = parseRequest(value);
    let parsed = local;
    const remoteDone = fetch("/api/parse-quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: value }),
    })
      .then(async (r) => { if (r.ok) parsed = remoteToParsed(await r.json(), local); })
      .catch(() => {});
    [700, 1500].forEach((ms, i) => {
      timers.current.push(window.setTimeout(() => setStep(i + 1), ms));
    });
    Promise.all([
      Promise.race([remoteDone, new Promise((r) => setTimeout(r, 5000))]),
      new Promise((r) => setTimeout(r, 2200)),
    ]).then(() => { setP(parsed); setPhase("result"); });
  };

  const update = (patch: Partial<Parsed>) => setP((prev) => (prev ? { ...prev, ...patch } : prev));

  const calc = useMemo(() => {
    if (!p) return null;
    const printPerPiece = methodBase[p.method] * p.locations + (p.colours - 1) * 350;
    const garments = p.qty * p.product.garment;
    const printing = p.qty * printPerPiece;
    const discount = p.qty > 20 ? (garments + printing) * 0.03 : 0;
    const total = garments + printing - discount + DELIVERY;
    return { garments, printing, discount, total, perPiece: total / p.qty };
  }, [p]);

  const Stepper = ({ value, onChange, min = 1, max = 5000 }: { value: number; onChange: (n: number) => void; min?: number; max?: number }) => (
    <div className="aq-stepper">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} aria-label="decrease">−</button>
      <span>{value}</span>
      <button type="button" onClick={() => onChange(Math.min(max, value + 1))} aria-label="increase">+</button>
    </div>
  );

  const box = (
    <div className="aq-box">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); run(text); } }}
        placeholder="e.g. 24 black hoodies with our logo on the front and back, delivered to Abuja by next Friday"
        aria-label="Describe your print job"
      />
      <div className="aq-box-foot">
        <span>Press Enter to send</span>
        <button className="aq-send" onClick={() => run(text)} aria-label="Get quote" disabled={!text.trim()}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>
    </div>
  );

  return (
    <section className="est" id="project-estimator">
      <div className="aq-head">
        <span className="aq-badge">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 0l1.4 4.6L12 6 7.4 7.4 6 12 4.6 7.4 0 6l4.6-1.4L6 0z" fill="#2563eb"/></svg>
          Instant AI quote
        </span>
        <h2>Describe it.<br /><em>Get a quote.</em></h2>
      </div>

      {phase !== "result" && box}

      {phase === "idle" && (
        <div className="aq-chips">
          {examples.map((ex) => (
            <button key={ex} className="aq-chip" onClick={() => { setText(ex); run(ex); }}>{ex}</button>
          ))}
        </div>
      )}

      {phase === "thinking" && (
        <div className="aq-think">
          {thinkSteps.map((s, i) => (
            <div key={s} className={`aq-think-step ${i < step ? "done" : i === step ? "doing" : "wait"}`}>
              {i < step ? (
                <span className="aq-check"><svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 6l2.4 2.4L9 3.6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
              ) : i === step ? (
                <span className="aq-spin" />
              ) : (
                <span className="aq-dot" />
              )}
              {s}
            </div>
          ))}
        </div>
      )}

      {phase === "result" && p && calc && (
        <>
          <div className="aq-card">
            <div className="aq-left">
              <span className="aq-col-title">What we understood</span>
              <div className="aq-row">
                <span>Product</span>
                <select value={p.product.name} onChange={(e) => update({ product: products.find((x) => x.name === e.target.value)! })}>
                  {products.map((x) => <option key={x.name}>{x.name}</option>)}
                </select>
              </div>
              <div className="aq-row">
                <span>Quantity</span>
                <Stepper value={p.qty} onChange={(n) => update({ qty: n })} />
              </div>
              <div className="aq-row">
                <span>Print locations</span>
                <Stepper value={p.locations} onChange={(n) => update({ locations: n })} max={4} />
              </div>
              <div className="aq-row">
                <span>Colours per design</span>
                <Stepper value={p.colours} onChange={(n) => update({ colours: n })} max={8} />
              </div>
              <div className="aq-row">
                <span>Print method</span>
                <select value={p.method} onChange={(e) => update({ method: e.target.value })}>
                  {methods.map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
              <p className="aq-why"><b>Why {p.method}?</b> {methodWhy[p.method]}</p>
              <div className="aq-row">
                <span>Deliver to</span>
                <select value={p.city} onChange={(e) => update({ city: e.target.value })}>
                  {cities.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              {p.assumed.length > 0 && (
                <p className="aq-assumed">We assumed, so please check: {p.assumed.map((a) => <b key={a}>{a}</b>)}</p>
              )}
            </div>

            <div className="aq-right">
              <span className="aq-col-title">Your quote</span>
              <div className="aq-sline"><span>Quote</span><span>{p.product.name} · {p.method}</span></div>
              <div className="aq-sline"><span><b className="aq-n">{p.qty}×</b> Garments</span><span>{fmt(calc.garments)}</span></div>
              <div className="aq-sline"><span><b className="aq-n">{p.locations}×</b> Printing</span><span>{fmt(calc.printing)}</span></div>
              {calc.discount > 0 && <div className="aq-sline"><span>Volume discount (3%)</span><span>−{fmt(calc.discount)}</span></div>}
              <div className="aq-sline"><span>Delivery · {p.city}</span><span>{fmt(DELIVERY)}</span></div>
              <div className="aq-total"><span>Total</span><strong>{fmt(calc.total)}</strong></div>
              <a className="aq-cta" href="#/signup">Start designing →</a>
              <a
                className="aq-wa"
                href={whatsappLink(`Hi Real Printing! Here's my instant quote: ${p.qty}× ${p.product.name}, ${p.locations} print location(s), ${p.colours} colour(s), ${p.method}, deliver to ${p.city} — estimated total ${fmt(calc.total)}.`)}
                target="_blank" rel="noopener noreferrer"
              >
                Send this quote to my WhatsApp
              </a>
            </div>
          </div>

          <p className="aq-note">This is an estimate. Your final price is confirmed with your design proof before we print.</p>
          {box}
        </>
      )}
    </section>
  );
}
