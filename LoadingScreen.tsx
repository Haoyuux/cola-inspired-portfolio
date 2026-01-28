// LoadingScreen.tsx
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";

interface LoadingScreenProps {
  onLoadComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("LOADING");

  useEffect(() => {
    // Animate loading text
    const texts = ["LOADING", "LOADING.", "LOADING..", "LOADING..."];
    let textIndex = 0;
    const textInterval = setInterval(() => {
      setLoadingText(texts[textIndex % texts.length]);
      textIndex++;
    }, 400);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);

          // Animate out
          gsap.to(".loading-screen", {
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: onLoadComplete,
          });

          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    // Animate in loading elements
    gsap.from(".loading-logo", {
      scale: 0,
      duration: 1,
      ease: "back.out(1.7)",
    });

    gsap.from(".loading-bar-container", {
      scaleX: 0,
      opacity: 0,
      duration: 0.8,
      delay: 0.3,
      ease: "power3.out",
    });

    gsap.from(".loading-text", {
      y: 30,
      duration: 0.6,
      delay: 0.5,
      ease: "power2.out",
    });

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [onLoadComplete]);

  return (
    <div className="loading-screen fixed inset-0 z-[9999] bg-gradient-to-br from-[#1a1a1a] via-[#2a1a1a] to-[#1a1a1a] flex flex-col items-center justify-center overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border-2 border-white/10"
            style={{
              width: `${(i + 1) * 200}px`,
              height: `${(i + 1) * 200}px`,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              animation: `pulse ${3 + i * 0.5}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* Logo/Brand */}
      {/* <div className="loading-logo mb-12 relative">
        <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center shadow-2xl">
          <span className="font-bebas text-6xl md:text-7xl text-[#1a1a1a] tracking-wider">
            Coca-cola
          </span>
        </div>
      
        <div
          className="absolute inset-0 border-4 border-transparent border-t-white/50 rounded-full"
          style={{ animation: "spin 2s linear infinite" }}
        />
      </div> */}

      {/* Loading text */}
      <div className="loading-text mb-8">
        <h2 className="font-bebas text-3xl md:text-5xl text-white tracking-[0.3em] text-center">
          {loadingText}
        </h2>
      </div>

      {/* Progress bar */}
      {/* <div className="loading-bar-container w-64 md:w-96 h-2 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
        <div
          className="h-full bg-gradient-to-r from-red-500 via-white to-red-500 rounded-full transition-all duration-300 ease-out shadow-lg"
          style={{
            width: `${Math.min(progress, 100)}%`,
            boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
          }}
        />
      </div> */}

      {/* Percentage */}
      <div className="mt-4 font-bebas text-xl md:text-2xl text-white/60 tracking-wider">
        {Math.floor(Math.min(progress, 100))}%
      </div>

      {/* Grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

      <style jsx>{`
        @keyframes pulse {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.1;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.2;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
