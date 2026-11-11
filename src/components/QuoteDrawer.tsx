import { useEffect, useState } from "react";

export const openQuoteDrawer = () =>
  window.dispatchEvent(new CustomEvent("rp:open-quote"));

const PRODUCTS = [
  "T-shirts", "Hoodies / Sweatshirts", "Tote bags", "Caps", "Water bottles",
  "Mugs", "Business cards", "Stickers", "Posters", "Company wears", "Kids clothing", "Something else",
];

type Item = { product: string; qty: number };

const CHANNELS = [
  {
    id: "whatsapp", label: "WhatsApp",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366"><path d="M12 2a10 10 0 0 0-8.5 15.3L2 22l4.9-1.4A10 10 0 1 0 12 2zm5.5 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.2-4.7-4.1-4.9-4.3-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5s.8 1.9.8 2c.1.1.1.3 0 .5-.3.6-.7.8-.5 1.2.7 1.1 1.5 1.9 2.6 2.5.3.2.5.1.7-.1l.9-1c.2-.3.4-.2.7-.1l1.9.9c.3.1.5.2.5.3.1.2.1.6-.1 1.1z"/></svg>,
  },
  {
    id: "phone", label: "Phone call",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.8.7a2 2 0 0 1 1.7 2z"/></svg>,
  },
  {
    id: "email", label: "Email",
    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d61f8c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/></svg>,
  },
];

export default function QuoteDrawer() {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<Item[]>([{ product: "", qty: 50 }]);
  const [neededBy, setNeededBy] = useState("");
  const [details, setDetails] = useState("");
  const [fileName, setFileName] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [channel, setChannel] = useState("whatsapp");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const on = () => setOpen(true);
    window.addEventListener("rp:open-quote", on);
    return () => window.removeEventListener("rp:open-quote", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", esc);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", esc); };
  }, [open]);

  const setItem = (i: number, patch: Partial<Item>) =>
    setItems((arr) => arr.map((it, ix) => (ix === i ? { ...it, ...patch } : it)));

  function validate() {
    const e: Record<string, string> = {};
    if (items.every((it) => !it.product)) e.items = "Please choose at least one product.";
    if (!name.trim()) e.name = "Please tell us your name.";
    const digits = phone.replace(/\D/g, "");
    if (!phone.trim()) e.phone = "We need a WhatsApp number to reply to.";
    else if (digits.length < 7) e.phone = "That number looks too short — check it?";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "That email doesn't look right — check the spelling?";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit() {
    if (!validate()) return;
    const productLines = items
      .filter((it) => it.product)
      .map((it) => `• ${it.qty}× ${it.product}`)
      .join("\n");
    const msg = [
      `Hi Real Printing! I'd like a quote.`,
      productLines,
      details && `Details: ${details}`,
      neededBy && `Needed by: ${neededBy}`,
      `Name: ${name}`,
      `WhatsApp: +234 ${phone}`,
      email && `Email: ${email}`,
      fileName && `(I'll send my file: ${fileName})`,
    ].filter(Boolean).join("\n");

    if (channel === "whatsapp") {
      window.open(`https://wa.me/2348108385033?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
    } else if (channel === "phone") {
      window.location.href = "tel:+2348108385033";
    } else {
      window.location.href = `mailto:printingreal18@gmail.com?subject=${encodeURIComponent("Quote request — " + name)}&body=${encodeURIComponent(msg)}`;
    }
    setSent(true);
    setTimeout(() => { setSent(false); setOpen(false); }, 2200);
  }

  if (!open) return null;
  return (
    <div className="qd" role="dialog" aria-modal="true" aria-label="Get a quote">
      <div className="qd-backdrop" onClick={() => setOpen(false)} />
      <aside className="qd-panel">
        <header className="qd-head">
          <img className="qd-avatar" src="/photos/figma/avatar1.png" alt="Tunde" />
          <div>
            <h3>Hi, I'm Tunde</h3>
            <p>Printer at Realprinting.ng. Tell me what you need and I'll send you a quote</p>
            <span className="qd-live"><i /> I reply within an hour</span>
          </div>
          <button className="qd-x" aria-label="Close" onClick={() => setOpen(false)}>✕</button>
        </header>
        <div className="qd-body">
          <label className="qd-label">What do you want to print?</label>
          {items.map((it, i) => (
            <div className="qd-item-row" key={i}>
              <select
                className={errors.items ? "err" : ""}
                value={it.product}
                onChange={(e) => { setItem(i, { product: e.target.value }); setErrors((x) => ({ ...x, items: "" })); }}
              >
                <option value="">Choose a product</option>
                {PRODUCTS.map((p) => <option key={p}>{p}</option>)}
              </select>
              <div className="qd-step">
                <button type="button" onClick={() => setItem(i, { qty: Math.max(1, it.qty - 10) })}>−</button>
                <span>{it.qty}</span>
                <button type="button" onClick={() => setItem(i, { qty: it.qty + 10 })}>+</button>
              </div>
            </div>
          ))}
          {items.length < 4 && (
            <button type="button" className="qd-add" onClick={() => setItems((a) => [...a, { product: "", qty: 50 }])}>
              + Add another item
            </button>
          )}
          {errors.items && <p className="qd-err">{errors.items}</p>}
          <p className="qd-hint">A rough quantity is fine, we'd confirm sizes later.</p>

          <label className="qd-label">Needed by</label>
          <input type="date" value={neededBy} onChange={(e) => setNeededBy(e.target.value)} />
          <p className="qd-hint">So we can tell you early if the date is tight</p>

          <label className="qd-label">Details</label>
          <input
            type="text" value={details} onChange={(e) => setDetails(e.target.value)}
            placeholder="E.g logo on the left chest, name on the back mixed sizes."
          />

          <label className="qd-label">Add your logo or design <em>(optional)</em></label>
          <label className="qd-upload">
            <input type="file" accept="image/*,.pdf" hidden onChange={(e) => setFileName(e.target.files?.[0]?.name || "")} />
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#666" strokeWidth="1.6" strokeLinecap="round"><path d="M9 12V3M5.5 6.5L9 3l3.5 3.5M3 14.5h12"/></svg>
            {fileName ? fileName : "Upload image"}
          </label>
          <p className="qd-hint">{fileName ? "Got it — " : "Tip: "}you'll send the actual file on WhatsApp or email once we connect.</p>

          <label className="qd-label">Email <em>Optional</em></label>
          <input
            type="email" className={errors.email ? "err" : ""} value={email}
            onChange={(e) => { setEmail(e.target.value); setErrors((x) => ({ ...x, email: "" })); }}
            placeholder="JohnDoe@gmail.com"
          />
          {errors.email && <p className="qd-err">{errors.email}</p>}

          <div className="qd-grid2">
            <div>
              <label className="qd-label">Your name <b>*</b></label>
              <input
                type="text" className={errors.name ? "err" : ""} value={name}
                onChange={(e) => { setName(e.target.value); setErrors((x) => ({ ...x, name: "" })); }}
                placeholder="John Doe"
              />
              {errors.name && <p className="qd-err">{errors.name}</p>}
            </div>
            <div>
              <label className="qd-label">WhatsApp number <b>*</b></label>
              <div className={`qd-phone${errors.phone ? " err" : ""}`}>
                <span>NG +234</span>
                <input
                  type="tel" value={phone} placeholder="810 838 5033"
                  onChange={(e) => { setPhone(e.target.value.replace(/[^\d\s]/g, "")); setErrors((x) => ({ ...x, phone: "" })); }}
                />
              </div>
              {errors.phone && <p className="qd-err">{errors.phone}</p>}
            </div>
          </div>

          <label className="qd-label">Send a message to me by</label>
          <div className="qd-channels">
            {CHANNELS.map((c) => (
              <button
                key={c.id} type="button"
                className={channel === c.id ? "on" : ""}
                onClick={() => setChannel(c.id)}
              ><i className="qd-dot" />{c.icon}{c.label}</button>
            ))}
          </div>
        </div>
        <footer className="qd-foot">
          <button className="qd-send" onClick={submit}>
            {sent ? "Sent — talk soon!" : "Send request"}
          </button>
        </footer>
      </aside>
    </div>
  );
}
