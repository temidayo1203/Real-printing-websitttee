import { whatsappLink } from "../whatsapp";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <a className="brand" href="#top" aria-label="Real Printing home">
          <span className="brand-mark">RP</span>
          Real Printing
        </a>
        <div className="header-actions">
          <a className="btn btn-dark btn-sm" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            Get a quote
          </a>
        </div>
      </div>
    </header>
  );
}
