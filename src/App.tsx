import HeroNew from "./components/HeroNew";
import Statement from "./components/Statement";
import ProductsNew from "./components/ProductsNew";
import Testimonials from "./components/Testimonials";
import Estimator from "./components/Estimator";
import Faq from "./components/Faq";
import Teaser from "./components/Teaser";
import Legal from "./components/Legal";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <main>
        <HeroNew />
        <Statement />
        <ProductsNew />
        <Testimonials />
        <Estimator />
        <Faq />
        <Teaser />
        <Legal />
      </main>
      <Footer />
    </>
  );
}
