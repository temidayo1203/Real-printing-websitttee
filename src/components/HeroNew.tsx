import { useState } from "react";
import { whatsappLink } from "../whatsapp";

const nav = [
  ["Services", "#services"],
  ["Portfolio", "#portfolio"],
  ["How it works", "#how-it-works"],
  ["Project estimator", "#project-estimator"],
  ["About", "#about"],
  ["Contact", "#contact"],
];

const ICON = (d: string) =>
  `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

const SERVICES: [string, string][] = [
  ["Tshirts", ICON('<path d="M6 3l-3.5 3 2 2.3L6 7.2V16h8V7.2l1.5 1.1 2-2.3L14 3h-2.5a1.5 1.5 0 0 1-3 0H6z"/>')],
  ["Bags", ICON('<path d="M4.5 7h11l-1 10h-9l-1-10z"/><path d="M7 7V5.5a3 3 0 0 1 6 0V7"/>')],
  ["Water bottles", ICON('<path d="M8.5 3h3v2h-3z"/><path d="M8 5h4l1 2v9.5a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 7 16.5V7l1-2z"/>')],
  ["Company wears", ICON('<path d="M6 3l-3.5 3 2 2.3L6 7.2V16h8V7.2l1.5 1.1 2-2.3L14 3h-2.5a1.5 1.5 0 0 1-3 0H6z"/><path d="M10 9v5M8.5 10.5h3"/>')],
];

const Arrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16"><path d="M6 3.5l4.5 4.5L6 12.5" fill="none" stroke="#9a9a9a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export default function HeroNew() {
  const [request, setRequest] = useState("");
  const [menu, setMenu] = useState(false);
  const [svc, setSvc] = useState(true);
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = request.trim() || "I'd like a custom print quote.";
    window.open(whatsappLink(`Hi Real Printing! ${msg.startsWith("Hi") ? msg : `I'd like to print: ${msg}`}`), "_blank", "noopener");
  };

  return (
    <section className="hero-n" id="top">
      <div className="hero-stage">
      <header className="topbar">
        <a className="wordmark" href="#top">
          <img src="/photos/figma/logo-mark.svg" alt="" className="rmark" />
          <span>eal Printing.ng</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {nav.map(([label, href]) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </nav>
        <button className="nav-burger" aria-label="Menu" onClick={() => setMenu((v) => !v)}>
          <span /><span /><span />
        </button>
        <a className="btn-black" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
          Get a quote
        </a>
      </header>

      <h1 className="h-left">
        You dream it,
        <br />
        we print it.
      </h1>

      <h1 className="h-right">
        then package
        <br />
        &amp; deliver
      </h1>

      <p className="h-tag">
        Custom apparel, corporate branding and promotional printing for businesses, creators and
        events.
      </p>

      <form className="h-ask" onSubmit={send}>
        <label htmlFor="ask2">Tell us what you want to print</label>
        <div className="h-ask-box">
          <input
            id="ask2"
            type="text"
            placeholder="e.g 300 tote bags for our launch event"
            value={request}
            onChange={(e) => setRequest(e.target.value)}
          />
          <button type="submit" aria-label="Send on WhatsApp">
            <img src="/photos/figma/arrow-up.svg" alt="" />
          </button>
        </div>
      </form>

      <div className="tile tile-pink">
        <img src="/photos/figma/hero-pink.jpg" alt="Custom printed white t-shirt" />
      </div>
      <img className="tile tile-cap" src="/photos/figma/hero-cap.jpg" alt="Embroidered black cap" />
      <div className="tile tile-blue">
        <img src="/photos/figma/hero-camera.jpg" alt="Person holding a camera wearing a printed cap" />
      </div>
      <div className="tile tile-grad" />
      <img className="tile tile-bottles" src="/photos/figma/hero-bottles.jpg" alt="Printed water bottles" />
      <img className="tile tile-tote" src="/photos/figma/hero-tote.jpg" alt="Printed tote bag" />
      </div>

      <div className="hero-mobile">
        <header className="hm-top">
          <a className="wordmark" href="#top">
            <img src="/photos/figma/logo-mark.svg" alt="" className="rmark" />
            <span>eal Printing.ng</span>
          </a>
          <div className="hm-actions">
            <a className="btn-black hm-quote" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              Get a quote
            </a>
            <button className="nav-burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((v) => !v)}>
              <span /><span /><span />
            </button>
          </div>
        </header>
        {menu && (
          <div className="mnav" role="dialog" aria-label="Menu">
            <div className="mnav-head">
              <a className="wordmark" href="#top" onClick={() => setMenu(false)}>
                <img src="/photos/figma/logo-mark.svg" alt="" className="rmark" />
                <span>eal Printing.ng</span>
              </a>
              <button className="mnav-x" aria-label="Close menu" onClick={() => setMenu(false)}>
                <svg width="22" height="22" viewBox="0 0 22 22"><path d="M4 4l14 14M18 4L4 18" stroke="#111" strokeWidth="2" strokeLinecap="round"/></svg>
              </button>
            </div>
            <div className="mnav-links">
              <button className={`mnav-row${svc ? " open" : ""}`} onClick={() => setSvc((v) => !v)} aria-expanded={svc}>
                <span>Services</span>
                <svg className="chev" width="18" height="18" viewBox="0 0 18 18"><path d="M4 6.5l5 5 5-5" fill="none" stroke="#111" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {svc && (
                <div className="mnav-sub">
                  {SERVICES.map(([label, icon]) => (
                    <a key={label} href="#services" className="mnav-item" onClick={() => setMenu(false)}>
                      <span className="mnav-ico" dangerouslySetInnerHTML={{ __html: icon }} />
                      <span>{label}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16"><path d="M6 3.5l4.5 4.5L6 12.5" fill="none" stroke="#9a9a9a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                  ))}
                </div>
              )}
              <a className="mnav-row" href="#about" onClick={() => setMenu(false)}><span>About</span><Arrow/></a>
              <a className="mnav-row" href="#how-it-works" onClick={() => setMenu(false)}><span>How it works</span><Arrow/></a>
              <a className="mnav-row" href="#estimator" onClick={() => setMenu(false)}><span>Project estimator</span><Arrow/></a>
              <a className="mnav-row" href="#contact" onClick={() => setMenu(false)}><span>Contact</span><Arrow/></a>
            </div>
            <a className="mnav-cta" href={whatsappLink()} target="_blank" rel="noopener noreferrer">Get a quote</a>
          </div>
        )}
        <div className="hm-body">
          <h1>
            You dream it, we print it.
            <br />
            then package &amp; deliver.
          </h1>
          <div className="hm-tiles" aria-hidden="true">
            <div className="hm-tile pink"><img src="/photos/figma/hero-pink.jpg" alt="" /></div>
            <div className="hm-tile blue"><img src="/photos/figma/hero-camera.jpg" alt="" /></div>
            <div className="hm-tile"><img src="/photos/figma/hero-bottles.jpg" alt="" /></div>
          </div>
          <p className="hm-tag">
            Custom apparel, corporate branding and promotional printing for businesses, creators and
            events.
          </p>
          <form className="h-ask hm-ask" onSubmit={send}>
            <label htmlFor="ask-m">Tell us what you want to print</label>
            <div className="h-ask-box">
              <input
                id="ask-m"
                type="text"
                placeholder="e.g 300 tote bags for our launch event"
                value={request}
                onChange={(e) => setRequest(e.target.value)}
              />
              <button type="submit" aria-label="Send on WhatsApp">
                <img src="/photos/figma/arrow-up.svg" alt="" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
