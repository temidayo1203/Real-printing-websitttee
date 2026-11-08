import { useState } from "react";

const terms = [
  ["Quotes & orders", "All quotes are valid for 7 days. An order is confirmed once payment (or an agreed deposit) is received and artwork is approved."],
  ["Artwork & approval", "You approve the final proof before production. Once approved, Real Printing is not responsible for errors that were visible in the approved proof."],
  ["Turnaround & delivery", "Standard production is 48–72 hours after artwork approval. Delivery timelines are estimates; we'll always notify you of delays."],
  ["Reprints & refunds", "Report any defect within 48 hours of delivery with photos. Verified production defects are reprinted or refunded — we don't refund approved-artwork errors or customer-supplied file issues."],
  ["Your artwork rights", "You confirm you own or are licensed to use all artwork you send us. Real Printing may photograph completed work for our portfolio unless you ask us not to."],
  ["Payment", "Prices are in Nigerian Naira (₦). Production starts after payment confirmation. Bulk and corporate terms can be arranged in writing."],
];

const privacy = [
  ["What we collect", "Your name, phone number, delivery address, order details and the artwork files you share with us — only what's needed to produce and deliver your order."],
  ["How we use it", "To quote, produce and deliver your prints, and to communicate with you (including WhatsApp) about your order. We don't send marketing messages without consent."],
  ["Sharing", "We share delivery details only with our courier partners. We never sell your data or your artwork files to third parties."],
  ["Artwork files", "Files you send are used solely to fulfil your order. We don't reuse your designs for other customers."],
  ["Retention & security", "Order records are kept for accounting purposes; artwork files can be deleted on request. We take reasonable steps to keep your data safe."],
  ["Contact", "Questions about your data? Message us on WhatsApp at +234 810 838 5033 or email us and we'll respond promptly."],
];

export default function Legal() {
  const [tab, setTab] = useState<"terms" | "privacy">("terms");
  const rows = tab === "terms" ? terms : privacy;

  return (
    <section className="legal" id="legal">
      <div className="legal-head">
        <h2>Terms &amp; privacy</h2>
        <div className="pills">
          <button className={tab === "terms" ? "pill on" : "pill"} onClick={() => setTab("terms")}>
            Terms of service
          </button>
          <button className={tab === "privacy" ? "pill on" : "pill"} onClick={() => setTab("privacy")}>
            Privacy policy
          </button>
        </div>
      </div>
      <div className="legal-rows">
        {rows.map(([t, d], i) => (
          <div className="legal-row" key={t}>
            <span className="legal-num">{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
