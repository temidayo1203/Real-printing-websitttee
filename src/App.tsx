import Header from "./components/Header";
import Hero from "./components/Hero";
import ProductGrid from "./components/ProductGrid";
import Steps from "./components/Steps";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProductGrid />
        <section className="stats">
          <div className="container">
            <div className="stat">
              <strong>240+</strong>
              <span>printable products</span>
            </div>
            <div className="stat">
              <strong>48h</strong>
              <span>average print turnaround</span>
            </div>
            <div className="stat">
              <strong>40+</strong>
              <span>countries shipped to</span>
            </div>
            <div className="stat">
              <strong>1.2M+</strong>
              <span>orders delivered</span>
            </div>
          </div>
        </section>
        <Steps />
      </main>
      <Footer />
    </>
  );
}
