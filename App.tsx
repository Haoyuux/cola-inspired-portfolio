import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductThemeProvider } from "./ProductThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CompanySection from "./components/CompanySection";
import ProductsSection from "./components/ProductsSection";

gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <ProductThemeProvider>
      <div
        ref={containerRef}
        className="relative w-full min-h-screen bg-[#fdfcf8] font-montserrat overflow-x-hidden"
      >
        <div className="fixed-0 bg-noise opacity-[0.15] z-[-50] pointer-events-none" />
        <Navbar />
        <main>
          <Hero />
          <CompanySection />
          <ProductsSection />
        </main>
      </div>
    </ProductThemeProvider>
  );
};

export default App;
