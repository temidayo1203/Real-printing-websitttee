import { whatsappLink } from "../whatsapp";

export default function Statement() {
  return (
    <section className="statement" id="about">
      <div className="eyebrow">
        <span className="sq" />
        <span>ENDLESS POSSIBILITIES</span>
      </div>
      <p className="big">
        <span className="indent" />
        <span className="lime">Not just Ink on Fabric.</span>
        <span className="dim">
          We bring your custom shirts and merch to life with vibrant, durable prints, premium
          textiles, and flawless finishes that command attention.
        </span>
      </p>
      <a className="btn-white" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
        Meet your printer
      </a>
    </section>
  );
}
