import { whatsappLink } from "../whatsapp";

const items = [
  { name: "T- shirts", img: "/photos/figma/prod-tshirts.jpg", alt: "Custom t-shirt printing Lagos", bg: null },
  { name: "Bags", img: "/photos/figma/prod-bags.png", alt: "Custom printed tote bags Nigeria", bg: null },
  { name: "Water bottles", img: "/photos/figma/prod-bottles.jpg", alt: "Branded water bottles printing", bg: null },
  { name: "Company wears", img: "/photos/figma/prod-company.png", alt: "Corporate wear and uniform printing Nigeria", bg: "#6ebad6" },
  { name: "Kids Clothings", img: "/photos/figma/prod-kids.jpg", alt: "Custom kids clothing printing", bg: "#2679f3" },
  { name: "Sweatshirt", img: "/photos/figma/prod-sweat.jpg", alt: "Custom hoodie and sweatshirt printing Lagos", bg: null },
];

export default function ProductsNew() {
  return (
    <section className="prods" id="services">
      <h2>Choose from our custom print products</h2>
      <div className="prods-grid">
        {items.map((p) => (
          <div className="prods-item" key={p.name}>
            <div className="prods-img" style={p.bg ? { background: p.bg } : undefined}>
              <img src={p.img} alt={p.alt || p.name} loading="lazy" />
            </div>
            <p>{p.name}</p>
          </div>
        ))}
      </div>
      <div className="prods-cta">
        <div>
          <h3>Can't find what you're looking for?</h3>
          <p>
            We handle custom printing every day. Send us your design or tell us what you need, and
            we'll provide a quote within minutes.
          </p>
        </div>
        <a href={whatsappLink("Hi Real Printing! I have a custom print request.")} target="_blank" rel="noopener noreferrer">
          <img src="/photos/figma/corner-arrow.svg" alt="" />
          Request a Custom Print
        </a>
      </div>
    </section>
  );
}
