import { useEffect, useState } from "react";

const small = [
  {
    co: "Kaks Construction",
    quote:
      "Real Printing delivered exactly what we envisioned. The quality, attention to detail, and turnaround time were impressive.",
    name: "Oladipupo Arikawe",
    role: "CEO",
    avatar: "/photos/figma/ceo-logo.png",
  },
];

const slides = [
  { img: "/photos/figma/testimonial-photo.jpg", alt: "Real Printing customer review", tag: "Signature apparel" },
  { img: "/photos/figma/prod-tshirts.jpg", tag: "T-shirts" },
  { img: "/photos/figma/prod-company.png", alt: "Corporate branded apparel order", tag: "Corporate wear" },
  { img: "/photos/figma/prod-kids.jpg", tag: "Kids clothing" },
  { img: "/photos/figma/prod-sweat.jpg", tag: "Hoodies & sweatshirts" },
  { img: "/photos/figma/prod-bags.png", alt: "Custom printed tote bag order", tag: "Tote bags" },
];

const bottom = [
  {
    co: "THE BRAND",
    quote:
      "They made our brand look professional. From the design process to the final prints, everything was seamless.",
    name: "THE BRAND",
    role: "Managing Director",
    logo: "/photos/figma/logo-brand.png",
  },
  {
    co: "Healthcare Brand",
    quote:
      "Our event branding looked amazing. Real Printing helped us create something people noticed.",
    name: "Mobile Doc",
    role: "Chief Financial Officer",
    logo: "/photos/figma/logo-health.png",
  },
  {
    co: "IJAY CAKES",
    quote:
      "Finding a printing company that combines quality, speed, and excellent customer service can be challenging, but Real Printing delivered beyond our expectations.",
    name: "Mary",
    role: "Founder",
    logo: "/photos/figma/logo-ijay.png",
  },
];

export default function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="tst" id="portfolio">
      <div className="tst-head">
        <h2>
          Trusted by businesses, <span>brands &amp; creators</span>
        </h2>
        <p>
          From startups to established companies, we help people bring their ideas to life with
          quality prints.
        </p>
      </div>
      <div className="tst-grid">
        <div className="tst-row">
          {small.map((t) => (
            <div className="t-card" key={t.co}>
              <p className="t-co">{t.co}</p>
              <p className="t-quote">{t.quote}</p>
              <div className="t-person">
                <img className="t-av" src={t.avatar} alt={t.name} />
                <div>
                  <p className="t-name">{t.name}</p>
                  <p className="t-role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="t-hero">
            {slides.map((s, j) => (
              <img
                key={s.img}
                className={`t-hero-bg${j === i ? " on" : ""}`}
                src={s.img}
                alt={s.tag}
              />
            ))}
            <div className="t-hero-overlay" />
            <span className="t-hero-tag">{slides[i].tag}</span>
            <p className="t-hero-quote">
              The team at Real Printing brought our ideas to life beautifully. They were easy to
              communicate with, provided great recommendations, and delivered products that looked
              even better than we imagined.
            </p>
            <p className="t-hero-name">Nnennya | Business owner</p>
            <div className="t-dots" role="tablist" aria-label="Apparel slides">
              {slides.map((s, j) => (
                <button
                  key={j}
                  role="tab"
                  aria-selected={j === i}
                  aria-label={s.tag}
                  className={j === i ? "dot on" : "dot"}
                  onClick={() => setI(j)}
                />
              ))}
            </div>
            <div className="t-arrows">
              <button aria-label="Previous" onClick={() => setI((i - 1 + slides.length) % slides.length)}>
                ←
              </button>
              <button aria-label="Next" onClick={() => setI((i + 1) % slides.length)}>
                →
              </button>
            </div>
          </div>
        </div>
        <div className="tst-row2">
          {bottom.map((t) => (
            <div className="t-card" key={t.co}>
              <p className="t-co">{t.co}</p>
              <p className="t-quote">{t.quote}</p>
              <div className="t-person">
                <div className="t-logo">
                  <img src={t.logo} alt="" />
                </div>
                <div>
                  <p className="t-name">{t.name}</p>
                  <p className="t-role">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
