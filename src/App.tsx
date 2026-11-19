import { useEffect, useState } from "react";
import HeroNew from "./components/HeroNew";
import Statement from "./components/Statement";
import ProductsNew from "./components/ProductsNew";
import Testimonials from "./components/Testimonials";
import Estimator from "./components/Estimator";
import Steps from "./components/Steps";
import Faq from "./components/Faq";
import Teaser from "./components/Teaser";
import QuotePage from "./components/QuoteDrawer";
import Legal from "./components/Legal";
import Auth from "./components/Auth";
import Footer from "./components/Footer";

export default function App() {
  const [, tick] = useState(0);
  useEffect(() => {
    const onHash = () => tick((n) => n + 1);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const isLegal = window.location.hash.startsWith("#/legal");

  if (isLegal) {
    return (
      <>
        <Legal />
      <Footer />
      </>
    );
  }

  if (window.location.hash === "#/quote") {
    return <QuotePage />;
  }
  if (window.location.hash === "#/login") return <Auth mode="login" />;
  if (window.location.hash === "#/signup") return <Auth mode="signup" />;

  return (
    <>
      <main>
        <HeroNew />
        <Statement />
        <ProductsNew />
        <Steps />
        <Testimonials />
        <Estimator />
        <Faq />
        <Teaser />
      </main>
      <Footer />
    </>
  );
}
