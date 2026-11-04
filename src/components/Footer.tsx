const cols = [
  {
    title: "Products",
    items: ["T-shirts", "Hoodies", "Mugs", "Business cards", "Posters", "Stickers"],
  },
  {
    title: "Use cases",
    items: ["Merch for creators", "Team uniforms", "Event swag", "Retail brands", "Gift printing"],
  },
  {
    title: "Company",
    items: ["About us", "Careers", "Blog", "Sustainability", "Press"],
  },
  {
    title: "Support",
    items: ["Track order", "Help center", "File prep guide", "Templates", "Contact us"],
  },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="brand" href="#top" style={{ color: "#fff" }}>
              <span className="brand-mark">RP</span>
              Real Printing
            </a>
            <p>
              The print partner behind your brand. Designed by you, printed and shipped
              by us — on demand, worldwide.
            </p>
          </div>
          {cols.map((c) => (
            <div className="footer-col" key={c.title}>
              <h4>{c.title}</h4>
              <ul>
                {c.items.map((i) => (
                  <li key={i}>
                    <a href="#top">{i}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Real Printing. All rights reserved.</span>
          <div className="links">
            <a href="#top">Privacy</a>
            <a href="#top">Terms</a>
            <a href="#top">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
