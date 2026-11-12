import { useEffect, useRef } from "react";
import { openQuoteDrawer } from "./QuoteDrawer";

const TEXT =
  "We bring your custom shirts and merch to life with vibrant, durable prints, premium textiles, and flawless finishes that command attention.";

export default function Statement() {
  const ref = useRef<HTMLElement>(null);
  const words = TEXT.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when section top hits bottom of viewport, 1 when its middle reaches ~40% height
      const progress = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.7 + r.height * 0.4)));
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
    <section className="statement" id="about" ref={ref}>
      <div className="eyebrow">
        <span className="sq" />
        <span>ENDLESS POSSIBILITIES</span>
      </div>
      <p className="big">
        <span className="indent" />
        <span className="lime">Not just Ink on Fabric.</span>
        <span className="dim">
          {words.map((w, i) => (
            <span className="w" key={i}>{w}&nbsp;</span>
          ))}
        </span>
      </p>
      <a className="btn-white" href="#quote" onClick={(e) => { e.preventDefault(); openQuoteDrawer(); }} target="_blank" rel="noopener noreferrer">
        Meet your printer
      </a>
    </section>
  );
}
