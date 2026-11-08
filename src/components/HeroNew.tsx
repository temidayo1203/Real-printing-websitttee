import { useState } from "react";
import { whatsappLink } from "../whatsapp";

const nav = ["Services", "Portfolio", "How it works", "Project estimator", "About", "Contact"];

export default function HeroNew() {
  const [request, setRequest] = useState("");
  const send = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = request.trim() || "I'd like a custom print quote.";
    window.open(whatsappLink(`Hi Real Printing! ${msg.startsWith("Hi") ? msg : `I'd like to print: ${msg}`}`), "_blank", "noopener");
  };

  return (
    <section className="hero-n">
      <div className="hero-stage">
      <header className="topbar">
        <a className="wordmark" href="#top">
          <img src="/photos/figma/logo-mark.svg" alt="" className="rmark" />
          <span>eal Printing.ng</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {nav.map((n) => (
            <a key={n} href={`#${n.toLowerCase().replace(/\s+/g, "-")}`}>{n}</a>
          ))}
        </nav>
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
    </section>
  );
}
