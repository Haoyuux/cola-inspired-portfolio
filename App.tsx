import React, { useState, useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProductThemeProvider } from "./ProductThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import CompanySection from "./components/CompanySection";
import ProductsSection from "./components/ProductsSection";
import LoadingScreen from "./LoadingScreen";

gsap.registerPlugin(ScrollTrigger);

// All images that need to be preloaded
const IMAGES_TO_PRELOAD = [
  // Product images
  "https://i.imgur.com/ChWEyqs.png", // Zero Sugar
  "https://i.imgur.com/o0IUBh6.png", // Classic Sprite
  "https://i.imgur.com/QqQ442U.png", // Classic Red
  "https://i.imgur.com/d8tBDxe.png", // Splash (used by all products)
  // Add any other images from Hero, Company sections, etc.
  // Example: 'https://your-hero-image.png',
];

const App: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload all images
    const preloadImages = async () => {
      let loadedCount = 0;
      const totalImages = IMAGES_TO_PRELOAD.length;

      const imagePromises = IMAGES_TO_PRELOAD.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new Image();

          img.onload = () => {
            loadedCount++;
            console.log(`Loaded ${loadedCount}/${totalImages}: ${src}`);
            resolve();
          };

          img.onerror = () => {
            loadedCount++;
            console.warn(
              `Failed to load image ${loadedCount}/${totalImages}: ${src}`,
            );
            resolve(); // Resolve anyway to not block loading
          };

          img.src = src;
        });
      });

      try {
        await Promise.all(imagePromises);
        console.log("All images loaded successfully");

        // Wait a bit longer to ensure everything is rendered
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error preloading images:", error);
        // Still hide loading screen even if there's an error
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    preloadImages();
  }, []);

  const handleLoadComplete = () => {
    // This is called by the loading screen animation
    // But we should only hide if images are actually loaded
    // So we do nothing here - let the useEffect handle it
  };

  if (isLoading) {
    return (
      <LoadingScreen
        onLoadComplete={handleLoadComplete}
        isLoading={isLoading}
      />
    );
  }

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
