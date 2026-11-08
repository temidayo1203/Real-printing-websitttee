import { useState } from "react";

const faqs = [
  {
    q: "Do I need to have my own design?",
    a: "No — our in-house team can design for you. Share your idea, logo or reference and we'll prepare print-ready artwork for approval before production.",
  },
  {
    q: "What products do you print?",
    a: "T-shirts, hoodies, caps, tote bags, mugs, water bottles, business cards, stickers, posters, company uniforms and more. If it can carry ink, we can print it.",
  },
  {
    q: "Can I order in bulk?",
    a: "Absolutely. Bulk orders get volume discounts — the estimator above shows savings automatically, or message us on WhatsApp for a custom quote.",
  },
  {
    q: "Do you deliver outside Lagos?",
    a: "Yes, we ship nationwide across Nigeria with tracked delivery. Most orders arrive within 3–5 business days after production.",
  },
  {
    q: "How long does production take?",
    a: "Standard turnaround is 48–72 hours once artwork is approved. Rush production is available on request.",
  },
  {
    q: "How long does production take?",
    a: "Standard turnaround is 48–72 hours once artwork is approved. Rush production is available on request.",
  },
  {
    q: "How long does production take?",
    a: "Standard turnaround is 48–72 hours once artwork is approved. Rush production is available on request.",
  },
];

const art = [1, 2, 3, 4, 5, 6, 7];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="faq" id="about">
      <div className="faq-stage">
      <div className="faq-art" aria-hidden="true">
        {art.map((i) => (
          <img key={i} src={`/photos/figma/faq${i}.svg`} alt="" className={`fa${i}`} />
        ))}
      </div>
      <h2 className="faq-title">Frequently asked questions</h2>
      <div className="faq-list">
        {faqs.map((f, i) => (
          <div className={`faq-item${open === i ? " open" : ""}`} key={i}>
            <button onClick={() => setOpen(open === i ? null : i)}>
              <span>{f.q}</span>
              <img src="/photos/figma/chevron.svg" alt="" />
            </button>
            {open === i && <p className="faq-a">{f.a}</p>}
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
