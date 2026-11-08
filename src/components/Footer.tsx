const sections = [
  ["Services", "#services"],
  ["Portfolio", "#portfolio"],
  ["How it works", "#how-it-works"],
  ["Project estimator", "#project-estimator"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

const productLinks = ["T-shirts", "Hoodies", "Mugs", "Business cards", "Posters", "Stickers"];
const useCases = ["Merch for creators", "Team uniforms", "Event swag", "Retail brands", "Gift printing"];

const socials = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/real_printing.factory/",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/Real.Printing.ng",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M14 8.5V7c0-.8.2-1.2 1.3-1.2H17V3h-2.6C11.7 3 11 4.7 11 7v1.5H9V12h2v9h3v-9h2.3l.4-3.5H14z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@real_printing.ng",
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M16.6 3c.4 2.2 1.8 3.7 4.1 3.9v3.1c-1.5 0-2.9-.5-4.1-1.3v6.2c0 3.6-2.6 6.1-6.1 6.1C7.3 21 5 18.7 5 15.8s2.3-5.6 5.4-5.6c.4 0 .8 0 1.2.1v3.3c-.4-.1-.8-.2-1.2-.2-1.5 0-2.4 1-2.4 2.4s.9 2.3 2.3 2.3c1.5 0 2.4-1 2.4-2.8V3h3.9z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="brand" href="#top" style={{ color: "#fff" }}>
              <span className="brand-mark">RP</span>
              Real Printing
            </a>
            <p>
              The print partner behind your brand. Designed by you, printed and shipped
              by us — on demand, nationwide.
            </p>
            <div className="socials">
              {socials.map((s) => (
                <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} title={s.name}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h4>Products</h4>
            <ul>
              {productLinks.map((i) => (
                <li key={i}>
                  <a href="#services">{i}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Use cases</h4>
            <ul>
              {useCases.map((i) => (
                <li key={i}>
                  <a href="#portfolio">{i}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              {sections.map(([label, href]) => (
                <li key={label}>
                  <a href={href}>{label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Real Printing. All rights reserved.</span>
          <div className="links">
            <a href="#/legal" target="_blank" rel="noopener noreferrer">Privacy</a>
            <a href="#/legal" target="_blank" rel="noopener noreferrer">Terms</a>
            <a href="#top">Back to top</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
