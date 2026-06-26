"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
    const router = useRouter();

  return (
    <section
      id="home"
      className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-luxury-dark"
    >
      {/* Background video */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2">
          <iframe
            className="w-full h-full opacity-65 scale-105"
            src="https://www.youtube.com/embed/3i3Iv0ULVs0?autoplay=1&loop=1&mute=1&controls=0&playlist=3i3Iv0ULVs0&showinfo=0&rel=0&enablejsapi=1"
            frameBorder="0"
            allow="autoplay; loop; fullscreen"
            allowFullScreen
            title="Hero Background Video" 
          />
        </div>
      </div>

      {/* Overlay - Luxury Vignette Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-luxury-dark/85 via-black/40 to-luxury-cream/15 z-2" />
      <div className="absolute inset-0 bg-black/40 z-2" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16 md:mt-24">
        <p className="tracking-[0.45em] text-xs sm:text-sm font-light mb-5 uppercase text-luxury-gold animate-fade-in opacity-0 [animation-fill-mode:forwards]">
          THIS FESTIVE SEASON
        </p>

        <h1 className="font-serif font-extralight text-4xl sm:text-6xl md:text-8xl mb-6 text-luxury-cream tracking-wide leading-tight drop-shadow-md animate-fade-up opacity-0 [animation-fill-mode:forwards] [animation-delay:200ms]">
          Handcrafted Soy Candles
        </h1>

        <p className="font-serif italic text-lg sm:text-xl md:text-2xl mb-12 text-luxury-cream/80 max-w-2xl mx-auto font-light animate-fade-up opacity-0 [animation-fill-mode:forwards] [animation-delay:400ms]">
          Luxury scents designed to elevate your mood & space
        </p>

        <button 
         onClick={() => router.push("/products")}
         className="draw-border border border-luxury-gold/40 text-luxury-cream px-12 py-4 rounded-none text-xs uppercase tracking-[0.25em] font-light transition-all duration-700 ease-out bg-transparent hover:bg-luxury-gold hover:text-luxury-dark shadow-2xl cursor-pointer hover:scale-105 animate-fade-up opacity-0 [animation-fill-mode:forwards] [animation-delay:600ms]"
        >
          Explore Collection
        </button>
      </div>
    </section>
  );
};

export default Hero;