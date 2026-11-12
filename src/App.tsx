import HeroNew from "./components/HeroNew";
import Statement from "./components/Statement";
import ProductsNew from "./components/ProductsNew";
import Testimonials from "./components/Testimonials";
import Estimator from "./components/Estimator";
import Steps from "./components/Steps";
import Faq from "./components/Faq";
import Teaser from "./components/Teaser";
import QuoteDrawer from "./components/QuoteDrawer";
import Legal from "./components/Legal";
import LocationPage from "./components/LocationPage";
import Footer from "./components/Footer";

export default function App() {
  const isLegal = window.location.hash.startsWith("#/legal");

  if (isLegal) {
    return (
      <>
        <Legal />
        <QuoteDrawer />
      <Footer />
      </>
    );
  }

  const locMatch = window.location.hash.match(/^#\/(printing-in-[a-z-]+)/);
  if (locMatch) {
    return (
      <>
        <LocationPage slug={locMatch[1]} />
        <QuoteDrawer />
        <Footer />
      </>
    );
  }

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
      <QuoteDrawer />
      <Footer />
    </>
  );
}
