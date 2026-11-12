import { openQuoteDrawer } from "./QuoteDrawer";

type Area = {
  slug: string;
  name: string;
  intro: string;
  who: string;
};

const AREAS: Record<string, Area> = {
  "printing-in-yaba": {
    slug: "printing-in-yaba",
    name: "Yaba",
    intro:
      "Looking for fast, quality printing in Yaba? Real Printing handles custom t-shirts, hoodies, tote bags, mugs, and corporate merch — designed, printed and delivered right in Yaba, Lagos.",
    who: "From UNILAG and YabaTech student merch to Tejuosho market traders and startups around Herbert Macaulay — we've printed for them all.",
  },
  "printing-in-lagos": {
    slug: "printing-in-lagos",
    name: "Lagos",
    intro:
      "Real Printing is a Lagos print shop for custom apparel and branded merchandise — t-shirts, hoodies, tote bags, mugs and corporate gifts. Design help, honest quotes, and delivery anywhere in Lagos.",
    who: "Businesses, creators, schools, churches and events across Lagos — from the Island to the Mainland — trust us with their merch.",
  },
  "printing-in-surulere": {
    slug: "printing-in-surulere",
    name: "Surulere",
    intro:
      "Quality custom printing in Surulere, Lagos — branded t-shirts, hoodies, mugs and promotional items for your business or event, with quick turnaround and doorstep delivery.",
    who: "From Adelabu to Aguda, National Stadium vendors to Surulere startups — we print and deliver across the whole area.",
  },
};

const services = [
  "Custom t-shirt printing",
  "Hoodies & sweatshirts",
  "Tote bags",
  "Mugs & water bottles",
  "Company & staff wears",
  "Event & wedding souvenirs",
];

const points = [
  ["Fast turnaround", "Standard production is 48–72 hours after you approve the artwork — and we'll tell you early if your date is tight."],
  ["Design help included", "No ready design? Our team cleans up your logo or creates artwork for you before we print."],
  ["Honest instant quotes", "Tell us what you need and get a clear price on WhatsApp — no hidden charges, no back-and-forth."],
  ["Doorstep delivery", "We package and deliver to your address — bulk orders move by dispatch, single pieces by courier."],
];

export default function LocationPage({ slug }: { slug: string }) {
  const area = AREAS[slug] || AREAS["printing-in-lagos"];

  return (
    <div className="loc-page">
      <header className="legal-top">
        <a className="wordmark" href="/">
          <img src="/photos/figma/logo-mark.svg" alt="" className="rmark" />
          <span>eal Printing.ng</span>
        </a>
        <div className="legal-top-actions">
          <a className="back-link" href="/">← Back to site</a>
          <a className="btn-black" href="#quote" onClick={(e) => { e.preventDefault(); openQuoteDrawer(); }}>
            Get a quote
          </a>
        </div>
      </header>

      <section className="loc-hero">
        <p className="loc-eyebrow">Print shop · {area.name}, Lagos</p>
        <h1>Custom T-shirt &amp; Apparel Printing in {area.name}</h1>
        <p className="loc-intro">{area.intro}</p>
        <div className="loc-cta-row">
          <a className="btn-black" href="#quote" onClick={(e) => { e.preventDefault(); openQuoteDrawer(); }}>
            Get a quote
          </a>
          <a className="loc-est" href="/#project-estimator">Try the print estimator →</a>
        </div>
      </section>

      <section className="loc-services">
        <h2>What we print in {area.name}</h2>
        <div className="loc-service-grid">
          {services.map((s) => <span key={s} className="loc-chip">{s}</span>)}
        </div>
        <p className="loc-who">{area.who}</p>
      </section>

      <section className="loc-points">
        {points.map(([t, d]) => (
          <div className="loc-point" key={t}>
            <h3>{t}</h3>
            <p>{d}</p>
          </div>
        ))}
      </section>

      <section className="loc-cta">
        <h2>Ready to print in {area.name}?</h2>
        <p>Tell Tunde what you need — you'll get a quote within the hour.</p>
        <a className="btn-black" href="#quote" onClick={(e) => { e.preventDefault(); openQuoteDrawer(); }}>
          Get a quote
        </a>
      </section>
    </div>
  );
}
