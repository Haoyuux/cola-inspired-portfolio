// CompanySection.tsx - Complete with dynamic button
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useProductTheme } from "../ProductThemeContext";

gsap.registerPlugin(ScrollTrigger);

const CompanySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cansRef = useRef<HTMLDivElement>(null);
  const { activeColor } = useProductTheme();

  useLayoutEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".reveal-item", {
        y: isMobile ? 30 : 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      }).from(
        ".can-item",
        {
          y: isMobile ? 150 : 300,
          rotate: 15,
          opacity: 0,
          stagger: 0.15,
          duration: 1.5,
          ease: "expo.out",
        },
        "-=1",
      );

      gsap.to(".can-item", {
        y: isMobile ? -60 : -120,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen bg-[#fdfcf8] flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 pt-20 sm:pt-24 md:pt-32 pb-20 sm:pb-24 md:pb-32 overflow-hidden z-20"
    >
      {/* Text Content - Left Side */}
      <div ref={textRef} className="w-full md:w-[45%] lg:w-[40%] z-10">
        <span className="reveal-item font-script text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#0c1c3d] mb-3 sm:mb-4 block lowercase">
          something about me
        </span>
        <h2 className="reveal-item font-bebas text-6xl sm:text-7xl md:text-[8vw] lg:text-[7vw] xl:text-[6vw] leading-[0.85] text-[#0c1c3d] mb-6 sm:mb-8 distressed-navy uppercase">
          Blaise
        </h2>

        <p className="reveal-item max-w-[500px] text-[#0c1c3d]/70 text-xs sm:text-sm md:text-[15px] leading-relaxed mb-8 sm:mb-10 font-montserrat font-normal">
          Hello, I'm Blaise Pascal Mercado, a Full Stack Web Developer
          passionate about creating engaging, user-friendly websites and
          applications. With a strong foundation in both front-end and back-end
          technologies, I build seamless digital experiences that blend
          functionality with design. This portfolio showcases my work, including
          a recent project where I crafted a web page inspired by Coca-cola, a
          leading beverage producer. Through this project, I aimed to
          demonstrate my skills in building responsive and visually appealing
          layouts while incorporating a modern, sleek design.
        </p>

        <a
          href="https://blaisemercado-portfolio.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 text-white font-bebas text-base sm:text-lg md:text-xl lg:text-2xl uppercase tracking-[0.2em] transition-all duration-300 shadow-lg hover:shadow-xl hover:brightness-90"
          style={{ backgroundColor: activeColor }}
        >
          ABOUT
        </a>
      </div>

      {/* Cans Display - Right Side (Hidden on Mobile) */}
      <div
        ref={cansRef}
        className="hidden md:flex w-full md:w-[50%] lg:w-[55%] h-[650px] lg:h-[700px] relative items-end justify-center"
      >
        {/* Left Can - Black/Dark (Coca-Cola Zero) */}
        <div className="can-item absolute left-[8%] sm:left-[10%] md:left-[12%] lg:left-[15%] bottom-0 w-[120px] sm:w-[160px] md:w-[200px] lg:w-[240px] -rotate-12 z-10">
          <img
            src="https://i.imgur.com/o0IUBh6.png"
            alt="Dark Can"
            className="w-full h-auto filter brightness-75 contrast-110 drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
          />
          {/* Shadow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-6 bg-black/15 blur-xl rounded-full"></div>
        </div>

        {/* Center Can - Main Red (Coca-Cola Classic) */}
        <div className="can-item absolute left-1/2 -translate-x-1/2 bottom-0 w-[200px] sm:w-[260px] md:w-[340px] lg:w-[420px] z-30">
          <img
            src="https://i.imgur.com/QqQ442U.png"
            alt="Main Can"
            className="w-full h-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.3)] brightness-105 contrast-110 saturate-125"
          />
          {/* "Since 1905" Label */}
          <div className="absolute bottom-8 sm:bottom-10 md:bottom-14 lg:bottom-16 left-1/2 -translate-x-1/2 w-full text-center">
            <span className="font-bebas text-white/30 text-[9px] sm:text-[10px] md:text-xs tracking-[0.3em] uppercase">
              Since 1905
            </span>
          </div>
          {/* Shadow */}
          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[75%] h-10 bg-black/20 blur-2xl rounded-full"></div>
        </div>

        {/* Right Can - Green (Sprite) */}
        <div className="can-item absolute right-[8%] sm:right-[10%] md:right-[12%] lg:right-[15%] bottom-0 w-[120px] sm:w-[160px] md:w-[200px] lg:w-[240px] rotate-12 z-10">
          <img
            src="https://i.imgur.com/OkFZNI8.png"
            alt="Silver Can"
            className="w-full h-auto filter brightness-95 contrast-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
          />
          {/* Shadow */}
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[70%] h-6 bg-black/15 blur-xl rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default CompanySection;
