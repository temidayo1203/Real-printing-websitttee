import { whatsappLink } from "../whatsapp";

const steps = [
  {
    cls: "hl-orange",
    title: "upload",
    copy: "Send us your artwork — PDF, PNG or pick a template. Our free preflight check catches resolution and bleed issues before anything goes to press.",
  },
  {
    cls: "hl-pink",
    title: "print",
    copy: "Your order is printed on demand at the facility closest to you, so nothing sits in a warehouse and nothing goes to waste.",
  },
  {
    cls: "hl-green",
    title: "deliver",
    copy: "Quality-checked, packed and shipped with tracking. Most orders arrive within 3–5 business days, anywhere in the country.",
  },
];

export default function Steps() {
  return (
    <section className="steps" id="how-it-works">
      <div className="steps-inner">
        <div className="steps-left">
          <span className="eyebrow-chip">How Real Printing works</span>
          <h2>From upload to doorstep in 3, 2, 1…</h2>
          <p>
            No minimums, no inventory, no print jargon. Send a file today and hold the
            finished product in your hands this week.
          </p>
          <div className="row">
            <a className="btn-yellow" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              Get a quote
            </a>
            <a className="text-link" href="#services">
              See our products →
            </a>
          </div>
        </div>
        <div className="steps-right">
          {steps.map((s, i) => (
            <div className="step-item" key={s.title}>
              <span className="step-num">0{i + 1}</span>
              <div>
                <h3 className={s.cls}>
                  <span>{s.title}</span>
                </h3>
                <p>{s.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
