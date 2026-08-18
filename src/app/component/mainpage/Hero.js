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
        overflow-hidden
        bg-luxury-dark
      "
    >
      {/* Full Background Image */}
      <div className="absolute inset-0">
        <img
          src="/Herebanner.png"
          alt="SIYAAS Candle Banner"
          className="
            w-full
            h-full
            object-cover
            object-center
          "
        />
      </div>

      {/* Very Light Overlay */}
      <div
        className="
          absolute
          inset-0
          bg-black/5
          z-[1]
        "
      />

      {/* Hero Content */}
      <div
        className="
          relative
          z-10
          min-h-screen
          w-full
          flex
          items-center
          justify-end
          px-6
          sm:px-10
          md:px-16
          lg:px-20
          xl:px-28
          pt-16
          pb-10
        "
      >
        <div
          className="
            w-full
            max-w-[680px]
            text-left
            mr-0
            lg:mr-[2%]
            xl:mr-[-5%]
          "
        >

          {/* Festive Season */}
          <p
            className="
              font-serif
              uppercase
              text-[#9a703b]
              text-base
              sm:text-lg
              md:text-xl
              lg:text-[26px]
              font-semibold
              tracking-wide
              mb-6
            "
          >
            THIS FESTIVE SEASON
          </p>

          {/* Main Heading */}
          <h1
            className="
              font-serif
              text-[#29221d]
              text-5xl
              sm:text-6xl
              md:text-7xl
              font-semibold
              lg:text-[76px]
              xl:text-[82px]
              leading-[0.95]
              tracking-[-0.02em]
              mb-7
            "
          >
            Little Luxuries,
            <br />
            Handmade
          </h1>

          {/* Description */}
          <p
            className="
              font-sans
              font-normal
              text-[#665d55]
              text-base
              sm:text-lg
              md:text-xl
              lg:text-[25px]
              leading-[1.45]
              max-w-[600px]
              mb-9
            "
          >
            Hand-poured 100% natural soy wax
            <br />
            scented candles for every mood
          </p>

          {/* CTA */}
          <button
            onClick={() => router.push("/products")}
            className="
              bg-[#9a703b]
              border
              border-[#9a703b]
              text-white
              px-8
              sm:px-10
              md:px-12
              py-3.5
              sm:py-4
              text-[10px]
              sm:text-xs
              uppercase
              tracking-[0.22em]
              font-light
              transition-all
              duration-500
              hover:bg-[#29221d]
              hover:border-[#29221d]
              hover:scale-105
              shadow-lg
              cursor-pointer
            "
          >
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;