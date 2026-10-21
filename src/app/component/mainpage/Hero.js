"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  const handleBannerClick = () => {
    router.push("/products");
  };

  return (
    <section
      id="home"
      onClick={handleBannerClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleBannerClick();
        }
      }}
      role="link"
      tabIndex={0}
      aria-label="Explore Siyaas candle collection"
      className="
        relative
        w-full
        min-h-screen
        overflow-hidden
        bg-luxury-dark
        cursor-pointer
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-[-4px]
        focus-visible:outline-[#C5A880]
      "
    >
      {/* Desktop / Tablet Banner */}
      <img
        src="/here-banner-desktop.png"
        alt="Explore Siyaas Dussehra candle collection"
        draggable={false}
        className="
          hidden
          sm:block
          absolute
          inset-0
          w-full
          h-full
          min-h-screen
          object-cover
          object-center
          select-none
        "
      />

      {/* Mobile Banner */}
      <img
        src="/hero-banner-mobile.png"
        alt="Explore Siyaas festive candle collection"
        draggable={false}
        className="
          block
          sm:hidden
          absolute
          inset-0
          w-full
          h-full
          min-h-screen
          object-cover
          object-center
          select-none
        "
      />
    </section>
  );
};

export default Hero;