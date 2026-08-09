"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <section
      id="home"
      className="
        relative
        w-full
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
        bg-luxury-dark
      "
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="/Herebanner.png"
          alt="Hero Background Banner"
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            object-center
            opacity-65
          "
        />
      </div>

      {/* Overlay */}
      <div
        className="h-full w-full
          absolute
          inset-0
          bg-black/20
          z-[1]
        "
      />

      {/* Hero Content */}
      <div
        className=" relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 text-end
    flex flex-col items-center justify-end  min-h-screen pb-12 sm:pb-16 md:pb-20"
      >
        <p
          className=" font-serif
      tracking-[0.3em]
      sm:tracking-[0.4em]
      md:tracking-[0.2em]
      text-[10px]
      sm:text-xs
      md:text-[20px]
      font-semibold
      mb-4
      sm:mb-5
      uppercase
      text-[#FBF7F0]
    "
        >
          THIS FESTIVE SEASON
        </p>

        <h1
          className="
      font-serif
      font-extralight
      text-4xl
      sm:text-5xl
      md:text-7xl
      lg:text-8xl
      mb-5
      sm:mb-6
      text-luxury-cream
      tracking-normal
      leading-[0.9]
      text-center
      max-w-4xl
    "
        >
          Little Luxuries, Handmade
        </h1>

        <p
          className="
       font-serif
      text-base
      sm:text-xl
      md:text-2xl
      mb-8
      sm:mb-10
      md:mb-12
      text-luxury-cream/90
      max-w-2xl
      mx-auto
      font-light
      text-center
    "
        >
          Hand-poured 100% natural soy wax scented candles
          <br />
          for every mood
        </p>

        <button
          onClick={() => router.push("/products")}
          className="
      bg-luxury-gold
      border
      border-luxury-gold/40
      text-luxury-cream
      px-7
      sm:px-10
      md:px-12
      py-3.5
      sm:py-4
      text-[10px]
      sm:text-xs
      uppercase
      tracking-[0.18em]
      sm:tracking-[0.25em]
      font-light
      transition-all
      duration-700
      hover:bg-luxury-gold
      hover:text-luxury-dark
      shadow-2xl
      cursor-pointer
      hover:scale-105
    "
        >
          Explore Collection
        </button>
      </div>
    </section>
  );
};

export default Hero;
