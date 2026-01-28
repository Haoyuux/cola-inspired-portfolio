// LoadingScreen-Premium.tsx - Alternative with can animation
import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreenPremium: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate can
    gsap.to('.loading-can', {
      y: -20,
      rotation: 360,
      duration: 2,
      repeat: -1,
      ease: 'power1.inOut',
      yoyo: true,
    });

    // Animate bubbles
    gsap.to('.bubble', {
      y: -100,
      opacity: 0,
      duration: 2,
      stagger: 0.2,
      repeat: -1,
      ease: 'power1.out',
    });

    // Animate liquid fill
    gsap.to('.liquid-fill', {
      height: '100%',
      duration: 3,
      ease: 'power1.inOut',
    });

    // Simulate loading
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          
          // Animate out
          gsap.to('.loading-screen', {
            opacity: 0,
            scale: 1.1,
            duration: 0.8,
            ease: 'power2.inOut',
            onComplete: onLoadComplete,
          });
          
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 120);

    // Initial animations
    gsap.from('.loading-title', {
      y: -50,
      opacity: 0,
      duration: 1,
      ease: 'back.out(1.7)',
    });

    gsap.from('.loading-can', {
      scale: 0,
      opacity: 0,
      duration: 1.2,
      delay: 0.3,
      ease: 'elastic.out(1, 0.5)',
    });

    return () => clearInterval(progressInterval);
  }, [onLoadComplete]);

  return (
    <div className="loading-screen fixed inset-0 z-[9999] bg-gradient-to-br from-[#b52232] via-[#e31e24] to-[#b52232] flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Brand name */}
      <div className="loading-title mb-8">
        <h1 className="font-bebas text-6xl md:text-8xl text-white tracking-[0.3em] drop-shadow-2xl">
          ROYAL BEVERAGE
        </h1>
      </div>

      {/* Animated can container */}
      <div className="relative mb-12">
        {/* Bubbles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bubble absolute w-4 h-4 bg-white/30 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              bottom: '-20px',
            }}
          />
        ))}

        {/* Can silhouette */}
        <div className="loading-can relative w-32 h-48 md:w-40 md:h-56 bg-white/20 backdrop-blur-sm rounded-[2rem] border-4 border-white/40 shadow-2xl overflow-hidden">
          {/* Liquid fill animation */}
          <div 
            className="liquid-fill absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white/60 to-white/30"
            style={{ height: '0%' }}
          />
          
          {/* Can label */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-bebas text-4xl md:text-5xl text-white drop-shadow-lg tracking-wider">
              RB
            </span>
          </div>
        </div>
      </div>

      {/* Loading bar */}
      <div className="w-72 md:w-96 mb-4">
        <div className="h-3 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-white via-white/80 to-white rounded-full transition-all duration-300 ease-out"
            style={{
              width: `${Math.min(progress, 100)}%`,
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
            }}
          />
        </div>
      </div>

      {/* Percentage and text */}
      <div className="flex flex-col items-center gap-2">
        <span className="font-bebas text-4xl md:text-5xl text-white tracking-wider">
          {Math.floor(Math.min(progress, 100))}%
        </span>
        <span className="font-bebas text-xl md:text-2xl text-white/70 tracking-[0.2em]">
          PREPARING YOUR EXPERIENCE
        </span>
      </div>

      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-30px) scale(1.2);
            opacity: 0.6;
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreenPremium;
