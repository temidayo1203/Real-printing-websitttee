import { whatsappLink } from "../whatsapp";

const products = [
  { name: "T-shirts", img: "/photos/tshirts.jpg" },
  { name: "Tote bags", img: "/photos/tote.jpg" },
  { name: "Coffee mugs", img: "/photos/mug.jpg" },
  { name: "Hoodies", img: "/photos/hoodie.jpg" },
  { name: "Phone cases", img: "/photos/phonecase.jpg" },
  { name: "Business cards", img: "/photos/cards.jpg" },
  { name: "Stickers", img: "/photos/stickers.jpg" },
  { name: "Posters", img: "/photos/posters.jpg" },
];

export default function ProductGrid() {
  return (
    <section className="products" id="products">
      <div className="container">
        <div className="product-grid">
          <div className="product-cta">
            <h3>Choose from 240+ custom print products</h3>
            <div className="cta-tiles" aria-hidden="true">
              <span className="cta-mini">
                <img src="/photos/tshirts.jpg" alt="" />
              </span>
              <span className="cta-mini">
                <img src="/photos/mug.jpg" alt="" />
              </span>
              <span className="cta-mini">
                <img src="/photos/posters.jpg" alt="" />
              </span>
            </div>
            <div>
              <a className="btn btn-red" href={whatsappLink("Hi Real Printing! I'd like to see your full product catalogue.")} target="_blank" rel="noopener noreferrer">
                See all products →
              </a>
            </div>
          </div>
          {products.map(({ name, img }) => (
            <div className="product-card" key={name} role="button" tabIndex={0}>
              <div className="art">
                <img src={img} alt={name} loading="lazy" />
              </div>
              <div className="name">{name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
