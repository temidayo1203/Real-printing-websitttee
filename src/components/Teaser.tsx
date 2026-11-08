import { whatsappLink } from "../whatsapp";

export default function Teaser() {
  return (
    <section className="teaser">
      <div className="teaser-copy">
        <div>
          <h2>Something Big is Coming</h2>
          <p>
            Meet the future of printing in Nigeria. From custom apparel to business materials,
            we're building a faster, smarter way to place and manage print orders.
          </p>
        </div>
        <a className="btn-black" href={whatsappLink("Hi Real Printing! Add me to the waitlist.")} target="_blank" rel="noopener noreferrer">
          Join the waitlist
        </a>
      </div>
      <img className="teaser-img" src="/photos/figma/designer.png" alt="Preview of the upcoming Real Printing online designer" />
    </section>
  );
}
