import { useEffect, useRef } from "react";
import { openQuoteDrawer } from "./QuoteDrawer";

const TEXT =
  "We bring your custom shirts and merch to life with vibrant, durable prints, premium textiles, and flawless finishes that command attention.";

export default function Statement() {
  const ref = useRef<HTMLDivElement>(null);
  const words = TEXT.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
      const lit = Math.round(progress * words.length);
      el.querySelectorAll<HTMLElement>(".w").forEach((w, i) => {
        w.classList.toggle("on", i < lit);
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="statement-wrap" ref={ref}>
    <section className="statement" id="about">
      <div className="eyebrow">
        <span className="sq" />
        <span>ENDLESS POSSIBILITIES</span>
      </div>
      <p className="big">
        <span className="indent" />
        <span className="lime">Not just Ink on Fabric.</span>
        <span className="dim">
          {words.map((w, i) => (
            <span className="w" key={i}>{w} </span>
          ))}
        </span>
      </p>
      <a className="btn-white" href="#quote" onClick={(e) => { e.preventDefault(); openQuoteDrawer(); }} target="_blank" rel="noopener noreferrer">
        Meet your printer
      </a>
    </section>
    </div>
  );
}
