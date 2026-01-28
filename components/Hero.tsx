import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProductTheme } from "../ProductThemeContext";

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLHeadingElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const splashRef = useRef<HTMLImageElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const { activeColor } = useProductTheme();

  // Helper function to determine if text should be light or dark based on background
  const getContrastColor = (bgColor: string) => {
    const hex = bgColor.replace("#", "");
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);

    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // For red themes, use black text
    // For black theme, use white text
    return brightness < 100 ? "#ffffff" : "#000000";
  };

  const textColor = getContrastColor(activeColor);

  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      // 1. Initial Load Animations
      const tl = gsap.timeline();

      tl.fromTo(
        bgTextRef.current,
        { scale: 0.85, opacity: 0 },
        { scale: 1, opacity: 1, duration: 2, ease: "power4.out" },
      )
        .fromTo(
          productRef.current,
          { y: isMobile ? 300 : 500, opacity: 0, rotate: -5 },
          { y: 0, opacity: 1, rotate: 0, duration: 1.8, ease: "expo.out" },
          "-=1.5",
        )
        .fromTo(
          splashRef.current,
          { opacity: 0, scale: 0.5 },
          { opacity: 0.9, scale: 1, duration: 1.5, ease: "back.out(1.7)" },
          "-=1.2",
        )
        .fromTo(
          taglineRef.current,
          { x: isMobile ? 0 : 50, y: isMobile ? 30 : 0, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 1, ease: "power3.out" },
          "-=0.8",
        );

      // 2. Parallax Animations on Scroll (gentler on mobile)
      gsap.to(bgTextRef.current, {
        y: isMobile ? 80 : 150,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(productRef.current, {
        y: isMobile ? -60 : -120,
        rotate: isMobile ? 4 : 8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      gsap.to(splashRef.current, {
        y: isMobile ? -40 : -60,
        scale: isMobile ? 1.05 : 1.1,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "center top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Animate color change when activeColor changes
  useLayoutEffect(() => {
    if (bgTextRef.current) {
      gsap.to(bgTextRef.current, {
        color: activeColor,
        duration: 0.6,
        ease: "power2.inOut",
      });
    }
  }, [activeColor]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden z-10"
    >
      {/* Background Title Text - Responsive sizing with dynamic color */}
      <h1
        ref={bgTextRef}
        className="font-bebas text-[18vw] sm:text-[20vw] md:text-[24vw] leading-none text-center select-none z-0 opacity-0 pointer-events-none px-4"
        style={{
          color: activeColor,
          WebkitTextStroke: "transparent",
          textStroke: "transparent",
        }}
      >
        Coca-Cola
      </h1>

      {/* Splash Effect - Responsive sizing and positioning */}
      <img
        ref={splashRef}
        src="https://i.imgur.com/d8tBDxe.png"
        alt="Cola Splash"
        className="absolute w-auto h-[100vh] sm:h-[110vh] md:h-[125vh] object-contain pointer-events-none opacity-0 blur-[0px]"
        style={{ zIndex: 5 }}
      />

      {/* Product Image Container - Better mobile constraints */}
      <div
        ref={productRef}
        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none opacity-0"
      >
        <div className="relative w-[200px] sm:w-[240px] md:w-[380px] aspect-[1/2] flex items-center justify-center">
          {/* Main Product Image */}
          <img
            src="https://i.imgur.com/QqQ442U.png"
            alt="Royal Beverage Cola Can"
            className="w-full h-full object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.3)] md:drop-shadow-[0_45px_50px_rgba(0,0,0,0.35)]"
          />

          {/* Realistic Dynamic Shadow */}
          <div className="absolute -bottom-6 md:-bottom-10 left-1/2 -translate-x-1/2 w-[70%] md:w-[80%] h-8 md:h-12 bg-black/10 blur-2xl md:blur-3xl rounded-full scale-y-50"></div>
        </div>
      </div>

      {/* Floating Tagline - Mobile repositioned to bottom */}
      <div
        ref={taglineRef}
        className="absolute right-6 bottom-32 sm:bottom-auto sm:right-8 md:right-16 sm:top-1/2 sm:-translate-y-1/2 w-40 sm:w-48 md:w-64 text-right z-20 opacity-0"
      >
        <span
          className="block w-8 sm:w-10 md:w-12 h-0.5 ml-auto mb-3 sm:mb-4 md:mb-6 transition-colors duration-600"
          style={{ backgroundColor: activeColor }}
        ></span>
        <p
          className="text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] leading-relaxed transition-colors duration-600"
          style={{
            color:
              activeColor === "#1a1a1a"
                ? "rgba(255, 255, 255, 0.9)"
                : "rgba(0, 0, 0, 0.8)",
          }}
        >
          Experience true freshness and quality, where taste meets innovation
        </p>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-4 z-20">
        <span
          className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase transition-colors duration-600"
          style={{
            color:
              activeColor === "#1a1a1a"
                ? "rgba(255, 255, 255, 0.4)"
                : "rgba(0, 0, 0, 0.4)",
          }}
        >
          Scroll
        </span>
        <div
          className="w-[1px] h-8 sm:h-12 rounded-full transition-colors duration-600"
          style={{
            background:
              activeColor === "#1a1a1a"
                ? "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)"
                : "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
          }}
        ></div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 sm:gap-4 z-20">
        <span
          className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase transition-colors duration-600"
          style={{
            color:
              textColor === "#ffffff"
                ? "rgba(255,255,255,0.4)"
                : "rgba(0,0,0,0.4)",
          }}
        >
          Scroll
        </span>
        <div
          className="w-[1px] h-8 sm:h-12 rounded-full transition-colors duration-600"
          style={{
            background:
              textColor === "#ffffff"
                ? "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)"
                : "linear-gradient(to bottom, rgba(0,0,0,0.5), transparent)",
          }}
        ></div>
      </div>
    </section>
  );
};

export default Hero;
