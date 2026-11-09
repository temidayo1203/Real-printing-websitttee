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

export default function HeroNew() {
  const [request, setRequest] = useState("");
  const [menu, setMenu] = useState(false);
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
        <img src="/photos/figma/hero-pink.png" alt="Custom printed white t-shirt" />
      </div>
      <img className="tile tile-cap" src="/photos/figma/hero-cap.png" alt="Embroidered black cap" />
      <div className="tile tile-blue">
        <img src="/photos/figma/hero-camera.png" alt="Person holding a camera wearing a printed cap" />
      </div>
      <div className="tile tile-grad" />
      <img className="tile tile-bottles" src="/photos/figma/hero-bottles.png" alt="Printed water bottles" />
      <img className="tile tile-tote" src="/photos/figma/hero-tote.png" alt="Printed tote bag" />
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
        <nav className={`mobile-nav${menu ? " open" : ""}`} aria-label="Mobile">
          {nav.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setMenu(false)}>{label}</a>
          ))}
        </nav>
        <div className="hm-body">
          <h1>
            You dream it, we print it.
            <br />
            then package &amp; deliver.
          </h1>
          <div className="hm-tiles" aria-hidden="true">
            <div className="hm-tile pink"><img src="/photos/figma/hero-pink.png" alt="" /></div>
            <div className="hm-tile blue"><img src="/photos/figma/hero-camera.png" alt="" /></div>
            <div className="hm-tile"><img src="/photos/figma/hero-bottles.png" alt="" /></div>
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
