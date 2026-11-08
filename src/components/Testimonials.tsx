const small = [
  {
    co: "Kaks Construction",
    quote:
      "Real Printing delivered exactly what we envisioned. The quality, attention to detail, and turnaround time were impressive.",
    name: "Oladipupo Arikawe",
    role: "CEO",
    avatar: "/photos/figma/avatar1.png",
  },
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
  return (
    <section className="tst">
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
            <img className="t-hero-bg" src="/photos/figma/testimonial-photo.png" alt="" />
            <div className="t-hero-overlay" />
            <p className="t-hero-quote">
              The team at Real Printing brought our ideas to life beautifully. They were easy to
              communicate with, provided great recommendations, and delivered products that looked
              even better than we imagined.
            </p>
            <p className="t-hero-name">Nnennya | Business owner</p>
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
