import { useState } from "react";
import { Dog, Star, SendIcon } from "./illustrations";
import { whatsappLink } from "../whatsapp";

export default function Hero() {
  const [request, setRequest] = useState("");

  const sendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = request.trim() || "Hi Real Printing! I'd like a custom print quote.";
    window.open(whatsappLink(`Hi Real Printing! I'd like to print: ${msg}`), "_blank", "noopener");
  };

  return (
    <section className="hero2" id="top">
      <div className="container">
        <div className="hero2-stage">
          <h1 className="h2-left">
            You dream it,
            <span className="ph" aria-hidden="true">
              <img src="/photos/screen-print.jpg" alt="" />
            </span>
            <br />
            we design it,
          </h1>

          <div className="h2-right">
            <span className="dog-tag">Inky</span>
            <Dog className="dog" />
            <h1>
              then print
              <br />
              &amp; ship it.
            </h1>
          </div>

          <div className="h2-center">
            <p className="h2-tag">
              The <mark>unusually easy</mark> print partner — no design skills needed.
            </p>
            <a className="btn btn-dark" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              Meet your printer
            </a>
            <form className="h2-ask" onSubmit={sendRequest}>
              <label htmlFor="ask">Tell us what to print</label>
              <div className="h2-ask-box">
                <input
                  id="ask"
                  type="text"
                  placeholder="e.g. 300 tote bags for our launch event"
                  value={request}
                  onChange={(e) => setRequest(e.target.value)}
                />
                <button type="submit" aria-label="Send request on WhatsApp">
                  <SendIcon />
                </button>
              </div>
            </form>
          </div>

          <div className="h2-rating">
            <span className="stars" aria-hidden="true">
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </span>
            <span>
              <strong>4.8 / 5</strong> from 2,300+ happy customers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
