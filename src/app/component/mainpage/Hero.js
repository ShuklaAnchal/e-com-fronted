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
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <img
            className="w-full h-full object-cover opacity-65"
            src="/Herebanner.png" // Replace with your actual image path inside the public folder
            alt="Hero Background Banner"
          />
        </div>
      </div>

      {/* Overlay - Luxury Vignette Gradient */}
     <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-luxury-cream/20 z-2" />
      <div className="absolute inset-0 z-2" />
      Content
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
