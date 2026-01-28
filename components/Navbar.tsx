
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Navbar: React.FC = () => {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  return (
    <header 
      ref={navRef}
      className="fixed top-0 left-0 w-full z-[100] px-6 py-8 md:px-12 flex items-center justify-between pointer-events-none"
    >
      {/* Left: Red Circular Hamburger */}
      <button className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-[#b52232] rounded-full shadow-lg group hover:scale-110 transition-transform">
        <div className="flex flex-col gap-1">
          <span className="w-5 h-[2px] bg-white"></span>
          <span className="w-5 h-[2px] bg-white"></span>
          <span className="w-3 h-[2px] bg-white"></span>
        </div>
      </button>

      {/* Right: Language Selector */}
      <div className="pointer-events-auto flex items-center gap-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
        <button className="text-[10px] font-bold uppercase tracking-widest hover:text-[#e31e24] transition-colors">
          EN
        </button>
        <div className="w-[1px] h-3 bg-gray-400"></div>
        <button className="text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-[#e31e24] transition-colors">
          FR
        </button>
      </div>
    </header>
  );
};

export default Navbar;
