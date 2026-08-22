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
      {/* Responsive Background Image */}
      <div className="absolute inset-0">
        {/* Desktop / Tablet Banner */}
        <img
          src="/Herebanner.png"
          alt="SIYAAS Candle Banner"
          className="
            hidden
            sm:block
            w-full
            h-full
            object-cover
            object-center
          "
        />

        {/* Mobile Banner */}
        <img
          src="/mobile-view-herebanner.png"
          alt="SIYAAS Candle Mobile Banner"
          className="
            block
            sm:hidden
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

    /* MOBILE ONLY */
    px-5
    pt-0
    pb-24

    /* DESKTOP - ORIGINAL */
    sm:px-10
    md:px-16
    lg:px-20
    xl:px-28
  "
      >
        <div
          className="
      w-full
      max-w-[680px]

      /* =========================
         MOBILE LUXURY POSITION
         ========================= */
      text-center
      mr-0
      mb-0
      mt-[-27vh]
      lg:mt-36
      /* =========================
         DESKTOP - DO NOT CHANGE
         ========================= */
      lg:text-left
      lg:mr-[2%]
      xl:mr-[-12%]
      lg:mb-0
      lg:mt-0
    "
        >
          {/* Festive Season */}
          <p
            className="
        font-serif
        uppercase
        text-[#8b6034]
        font-medium

        /* MOBILE */
        text-[10px]
        tracking-[0.28em]
        mb-3

        /* DESKTOP - ORIGINAL */
        sm:text-2xl
        md:text-xl
        lg:text-[26px]
        lg:font-semibold
        lg:tracking-wide
        lg:mb-6
      "
          >
            THIS FESTIVE SEASON
          </p>

          {/* Main Heading */}
          <h1
            className="
        font-serif
        text-[#3a2a22]
        font-medium
        tracking-[-0.025em]

        /* MOBILE */
        text-[37px]
        leading-[0.98]
        mb-4

        /* DESKTOP - ORIGINAL */
        sm:text-6xl
        md:text-7xl
        lg:text-[76px]
        xl:text-[82px]
        lg:font-semibold
        lg:leading-[0.95]
        lg:mb-7
      "
          >
            Little Luxuries,
            <br />
            Handmade
          </h1>

          {/* Description */}
          <p
            className="
       hidden
    sm:block

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
        uppercase
        font-light
        transition-all
        duration-500
        hover:bg-[#29221d]
        hover:border-[#29221d]
        hover:scale-105
        shadow-md
        cursor-pointer

        /* MOBILE */
        px-7
        py-3
        text-[9px]
        tracking-[0.24em]

        /* DESKTOP - ORIGINAL */
        sm:px-10
        md:px-12
        sm:py-4
        sm:text-xs
        sm:tracking-[0.22em]
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
