import { useMemo, useState } from "react";
import { whatsappLink } from "../whatsapp";

const methods = ["DTF transfer", "Screen print", "Embroidery", "Sublimation", "Vinyl (HTV)"];
const products = [
  { name: "T-shirt", garment: 4500 },
  { name: "Hoodie", garment: 9500 },
  { name: "Cap", garment: 3800 },
  { name: "Tote bag", garment: 4200 },
  { name: "Mug", garment: 3500 },
];
const sizes = ["Standard (A4)", "Large (A3)", "Small (A6)", "Oversized"];
const extras = [
  { name: "Neck label print", price: 12000 },
  { name: "Hang tags", price: 8500 },
  { name: "Folding & bagging", price: 6000 },
  { name: "Rush production", price: 25000 },
];
const methodBase: Record<string, number> = {
  "DTF transfer": 4000,
  "Screen print": 3800,
  Embroidery: 5200,
  Sublimation: 4200,
  "Vinyl (HTV)": 3900,
};
const DELIVERY = 3500;
const fmt = (n: number) => "₦" + Math.round(n).toLocaleString("en-US");

export default function Estimator() {
  const [method, setMethod] = useState(methods[0]);
  const [product, setProduct] = useState(products[0]);
  const [qtyStr, setQtyStr] = useState("24");
  const qty = Math.max(1, parseInt(qtyStr, 10) || 1);
  const [locations, setLocations] = useState(1);
    const [colStr, setColStr] = useState("2");
  const colours = Math.min(8, Math.max(1, parseInt(colStr, 10) || 1));
  const [size, setSize] = useState(sizes[0]);
  const [picked, setPicked] = useState<boolean[]>(extras.map(() => false));

  const calc = useMemo(() => {
    const sizeFactor = size.includes("A3") ? 1.3 : size.includes("A6") ? 0.8 : size === "Oversized" ? 1.6 : 1;
    const printPerPiece = methodBase[method] * locations * sizeFactor + (colours - 2) * 150;
    const garments = qty * product.garment;
    const printing = qty * printPerPiece;
    const discount = qty > 20 ? (garments + printing) * 0.03 : 0;
    const setup = extras.reduce((s, e, i) => s + (picked[i] ? e.price : 0), 0);
    const total = garments + printing - discount + DELIVERY + setup;
    return { printPerPiece, garments, printing, discount, setup, total, perPiece: total / qty };
  }, [method, product, qty, locations, colours, size, picked]);

  const plural = product.name + (qty > 1 ? "s" : "");

  return (
    <section className="est" id="project-estimator">
      <div className="est-hero">
        <h2>Instant print quotes that grow with your order</h2>
        <p className="est-sub">Clear numbers, no surprises. Adjust your job and see the price update.</p>
        <div className="pills">
          {methods.map((m) => (
            <button key={m} className={m === method ? "pill on" : "pill"} onClick={() => setMethod(m)}>
              {m}
            </button>
          ))}
        </div>
      </div>

      <div className="tabs">
        {products.map((p) => (
          <button key={p.name} className={p.name === product.name ? "tab on" : "tab"} onClick={() => setProduct(p)}>
            {p.name}
          </button>
        ))}
      </div>

      <div className="calc">
        <div className="calc-inputs">
          <div className="crow">
            <div className="price-cell">
              <span>Garment price</span>
              <strong>{fmt(product.garment)}</strong>
            </div>
            <div className="ctrl">
              <div className="ctrl-head">
                <span>How many pieces do you need?</span>
                <span className="chip">{qty}</span>
              </div>
              <input type="range" min={1} max={500} value={qtyStr} onChange={(e) => setQtyStr(e.target.value)} />
              <input className="num" type="number" min={1} value={qtyStr} onChange={(e) => setQtyStr(e.target.value)} onBlur={() => setQtyStr(String(qty))} />
            </div>
          </div>

          <div className="crow">
            <div className="price-cell">
              <span>Print price per piece</span>
              <strong>{fmt(calc.printPerPiece)}</strong>
            </div>
            <div className="ctrl">
              <div className="ctrl-head">
                <span>Print locations</span>
                <span className="chip">{locations}</span>
              </div>
              <input type="range" min={1} max={4} value={locations} onChange={(e) => setLocations(+e.target.value)} />
              <div className="ctrl-duo">
                <label>
                  <span>Colours per design</span>
                  <input className="num" type="number" min={1} max={8} value={colStr} onChange={(e) => setColStr(e.target.value)} onBlur={() => setColStr(String(colours))} />
                </label>
                <label>
                  <span>Print size</span>
                  <select className="num" value={size} onChange={(e) => setSize(e.target.value)}>
                    {sizes.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </label>
              </div>
            </div>
          </div>

          <div className="crow last">
            <div className="price-cell">
              <span>One-time setup</span>
              <strong>{fmt(calc.setup)}</strong>
            </div>
            <div className="ctrl">
              <span className="ctrl-label">Extras</span>
              <div className="checks">
                {extras.map((ex, i) => (
                  <label key={ex.name} className="check">
                    <input type="checkbox" checked={picked[i]} onChange={() => setPicked(picked.map((v, j) => (j === i ? !v : v)))} />
                    <span className="box" aria-hidden="true" />
                    {ex.name} <em>+{fmt(ex.price)}</em>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="summary">
          <div className="sline"><span>Quote</span><span>{product.name} · {method}</span></div>
          <div className="sline"><span><b className="chip2">{qty}x</b> {plural}</span><span>{fmt(calc.garments)}</span></div>
          <div className="sline"><span><b className="chip2">{locations}x</b> Printing</span><span>{fmt(calc.printing)}</span></div>
          <div className="sline"><span>Volume discount (3%)</span><span>−{fmt(calc.discount)}</span></div>
          {calc.setup > 0 && <div className="sline"><span>Setup</span><span>{fmt(calc.setup)}</span></div>}
          <div className="sline"><span>Delivery</span><span>{fmt(DELIVERY)}</span></div>
          <div className="stotal">
            <span>Total amount</span>
            <strong>{fmt(calc.total)}</strong>
          </div>
          <p className="spiece">{fmt(calc.perPiece)} per piece</p>
          <a className="pay" href={whatsappLink(`Hi Real Printing! Quote: ${qty}x ${plural}, ${method}, total ${fmt(calc.total)}.`)} target="_blank" rel="noopener noreferrer">
            Continue to payment
          </a>
        </div>
      </div>
    </section>
  );
}
