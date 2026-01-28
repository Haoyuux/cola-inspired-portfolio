// ProductsSection.tsx - Updated with context
import React, { useState, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProductTheme } from "../ProductThemeContext";

gsap.registerPlugin(ScrollTrigger);

interface Product {
  id: number;
  name: string;
  tagline: string;
  image: string;
  splash: string;
  themeColor: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "ZERO SUGAR",
    tagline: "Bold Refreshment",
    image: "https://i.imgur.com/ChWEyqs.png",
    splash: "https://i.imgur.com/d8tBDxe.png",
    themeColor: "#b52232",
  },
  {
    id: 2,
    name: "CLASSIC SPRITE",
    tagline: "Pure Taste",
    image: "https://i.imgur.com/o0IUBh6.png",
    splash: "https://i.imgur.com/d8tBDxe.png",
    themeColor: "#e31e24",
  },
  {
    id: 3,
    name: "CLASSIC RED",
    tagline: "The Original",
    image: "https://i.imgur.com/QqQ442U.png",
    splash: "https://i.imgur.com/d8tBDxe.png",
    themeColor: "#1a1a1a",
  },
];

const ProductsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { setActiveColor } = useProductTheme();
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rippleRef = useRef<HTMLDivElement>(null);

  // Update global theme color whenever activeIndex changes
  useLayoutEffect(() => {
    setActiveColor(PRODUCTS[activeIndex].themeColor);
  }, [activeIndex, setActiveColor]);

  const nextProduct = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % PRODUCTS.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  const prevProduct = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
    setTimeout(() => setIsTransitioning(false), 800);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".ripple-circle", {
        scale: 1.2,
        opacity: 0.25,
        stagger: {
          each: 0.15,
          from: "center",
        },
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: "sine.inOut",
      });

      gsap.to(".products-heading", {
        y: -50,
        opacity: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.from(".products-heading", {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".active-product-img",
      { scale: 0.5, opacity: 0, y: 80, rotation: -15 },
      {
        scale: 1,
        opacity: 1,
        y: 0,
        rotation: 0,
        duration: 1,
        ease: "back.out(1.4)",
      },
    );

    tl.fromTo(
      ".product-tagline",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      "-=0.6",
    );

    tl.fromTo(
      ".product-name",
      { opacity: 0, x: -50, letterSpacing: "0.5em" },
      {
        opacity: 1,
        x: 0,
        letterSpacing: "0.2em",
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4",
    );

    tl.fromTo(
      ".product-button",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5 },
      "-=0.3",
    );

    gsap.to(".spotlight-circle", {
      scale: 1.05,
      opacity: 0.12,
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Animate heading visibility on product change
    gsap.fromTo(
      ".products-heading",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
    );
  }, [activeIndex]);

  const activeProduct = PRODUCTS[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between md:justify-center items-center z-10 pt-40 md:pt-48 pb-16 md:pb-0 transition-colors duration-700"
      style={{ backgroundColor: activeProduct.themeColor }}
    >
      {/* WAVY TOP SECTION */}
      <div className="absolute top-0 left-0 w-full pointer-events-none z-0 -translate-y-1">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-auto block"
          preserveAspectRatio="none"
        >
          <path
            fill="#fdfcf8"
            d="M0,80L40,75C80,70,160,60,240,65C320,70,400,90,480,85C560,80,640,50,720,45C800,40,880,60,960,70C1040,80,1120,80,1200,75C1280,70,1360,60,1400,55L1440,50L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"
          ></path>
        </svg>
      </div>
      {/* ENHANCED BACKGROUND DECORATION */}
      <div
        ref={rippleRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20"
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="ripple-circle absolute rounded-full border-2 border-white/15 "
            style={{
              width: `${(i + 1) * 280}px`,
              height: `${(i + 1) * 280}px`,
            }}
          />
        ))}
      </div>

      {/* GRAIN TEXTURE OVERLAY */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>

      {/* OVERSIZED HEADING */}
      <div className="absolute top-[10%] left-10 md:left-24 z-10 hidden md:block pointer-events-none mt-12">
        <h2
          className="products-heading font-bebas text-[12vw] lg:text-[11vw] leading-none tracking-tighter select-none uppercase transition-all duration-700"
          style={{
            color: "rgba(255, 255, 255, 0.08)",
            WebkitTextStroke: "3px rgba(255,255,255,0.15)",
            textShadow: "0 0 30px rgba(255,255,255,0.1)",
          }}
        >
          OUR PRODUCTS
        </h2>
      </div>

      {/* SLIDE INDICATOR */}
      <div className="absolute mt-24 top-8 md:top-12 right-5 md:right-12 z-40 flex items-baseline gap-2 md:gap-3 text-white/40 font-bebas text-3xl md:text-4xl">
        <span className="text-white text-5xl md:text-7xl font-bold transition-all duration-300">
          {activeIndex + 1}
        </span>
        <span className="text-2xl">/</span>
        <span className="text-2xl">{PRODUCTS.length}</span>
      </div>

      {/* MAIN CONTAINER */}
      <div
        ref={containerRef}
        className="relative w-full max-w-7xl flex-1 flex flex-col md:flex-row items-center justify-center md:justify-between px-5 md:px-10"
      >
        {/* CENTRAL SPOTLIGHT */}
        <div className="relative flex items-center justify-center z-20 w-full md:w-auto flex-shrink-0 mb-8 md:mb-0 md:ml-[25%]">
          <div className="spotlight-circle absolute w-[350px] h-[350px] md:w-[750px] md:h-[750px] bg-gradient-radial from-white/10 to-transparent rounded-full blur-[100px]"></div>
          <div className="absolute w-[300px] h-[300px] md:w-[680px] md:h-[680px] bg-white/5 rounded-full blur-[80px]"></div>

          <div className="relative w-[280px] h-[280px] md:w-[520px] md:h-[520px] bg-gradient-to-br from-[#fdfcf8] to-[#f5f5f0] rounded-full flex items-center justify-center overflow-visible shadow-[0_0_80px_rgba(0,0,0,0.4)] border-4 border-white/10">
            <img
              src={activeProduct.splash}
              className="absolute w-[160%] h-[160%] object-contain pointer-events-none opacity-90 contrast-125 mix-blend-multiply"
              alt="splash"
            />
            <div className="relative h-[115%] w-full flex items-center justify-center active-product-img">
              <img
                src={activeProduct.image}
                alt={activeProduct.name}
                className="h-full object-contain drop-shadow-[0_60px_100px_rgba(0,0,0,0.7)] z-10"
              />
            </div>
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="product-info-text relative md:absolute left-0 md:left-24 top-auto md:top-1/2 md:-translate-y-1/2 z-30 flex flex-col items-start md:items-start text-white w-full md:max-w-lg px-5 md:px-0">
          <div className="relative mb-4 md:mb-6">
            <span className="product-tagline font-script text-3xl md:text-6xl lowercase block text-white/95 drop-shadow-lg">
              {activeProduct.tagline}
            </span>
            <div className="absolute -right-16 md:-right-20 top-2 w-20 md:w-24 h-10 md:h-12 pointer-events-none hidden lg:block">
              <svg
                viewBox="0 0 100 50"
                className="w-full h-full stroke-white/50 fill-none stroke-[3]"
              >
                <path
                  d="M10,40 Q50,10 90,20 M80,10 L90,20 L80,30"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <h3
            className="product-name font-bebas text-5xl md:text-[7.5vw] lg:text-[6.5vw] mb-8 md:mb-14 leading-none uppercase drop-shadow-2xl"
            style={{ letterSpacing: "0.2em" }}
          >
            {activeProduct.name}
          </h3>
          <button className="product-button group w-full md:w-auto px-12 py-4 md:px-16 md:py-6 bg-[#fdfcf8] text-[#1a1a1a] font-bebas text-xl md:text-3xl tracking-[0.3em] hover:tracking-[0.4em] transition-all duration-300 shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_60px_rgba(0,0,0,0.5)] rounded-sm relative overflow-hidden">
            <span className="relative z-10">VIEW PRODUCT</span>
            <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
          </button>
        </div>
      </div>

      {/* ENHANCED NAVIGATION */}
      <div className="relative w-full flex justify-between px-5 md:absolute md:inset-x-0 md:top-1/2 md:-translate-y-1/2 md:px-20 z-40 mb-8 md:mb-0 pointer-events-none">
        <button
          onClick={prevProduct}
          disabled={isTransitioning}
          className="pointer-events-auto group w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-white/30 backdrop-blur-sm flex items-center justify-center text-white text-2xl md:text-3xl hover:bg-white hover:border-white transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)] hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ color: isTransitioning ? "white" : undefined }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = activeProduct.themeColor)
          }
          onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
        >
          <span className="transform group-hover:-translate-x-1 transition-transform duration-300">
            ←
          </span>
        </button>
        <button
          onClick={nextProduct}
          disabled={isTransitioning}
          className="pointer-events-auto group w-14 h-14 md:w-20 md:h-20 rounded-full border-2 border-white/30 backdrop-blur-sm flex items-center justify-center text-white text-2xl md:text-3xl hover:bg-white hover:border-white transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.5)] hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ color: isTransitioning ? "white" : undefined }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = activeProduct.themeColor)
          }
          onMouseLeave={(e) => (e.currentTarget.style.color = "white")}
        >
          <span className="transform group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </button>
      </div>

      {/* PROGRESS DOTS */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-40 flex gap-3">
        {PRODUCTS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              if (!isTransitioning && idx !== activeIndex) {
                setIsTransitioning(true);
                setActiveIndex(idx);
                setTimeout(() => setIsTransitioning(false), 800);
              }
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? "bg-white w-8 shadow-lg"
                : "bg-white/30 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
