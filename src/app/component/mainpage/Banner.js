"use client";

import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="relative w-full mt-3 sm:mt-5 md:mt-8 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      <div
        className="
          w-full
          min-h-[auto]
          lg:min-h-[500px]
          xl:min-h-[560px]
          flex
          flex-col
          lg:flex-row

          items-center
          justify-between

          gap-8
          sm:gap-10
          lg:gap-12
          xl:gap-20

          overflow-hidden
        "
      >
        {/* --------------------------------------------------
            BANNER IMAGE
        -------------------------------------------------- */}
        <div
          className="rounded-[20px]
            relative
            w-full
            sm:w-[90%]
            md:w-[80%]
            lg:w-[48%]

            h-[280px]
            sm:h-[350px]
            md:h-[420px]
            lg:h-[500px]
            xl:h-[560px]

            overflow-hidden
          "
        >
          <Image
            src="/banner-hand.png"
            alt="CUSTOM CANDLES AVAILABLE"
            fill
            priority
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 1024px) 80vw,
              48vw
            "
            className="rounded-[20px]
              object-cover
              object-center
              transition-transform
              duration-700
              hover:scale-[1.02]
            "
          />
        </div>

        {/* --------------------------------------------------
            BANNER CONTENT
        -------------------------------------------------- */}
        <div
          className="
            w-full
            sm:w-[90%]
            md:w-[80%]
            lg:w-[45%]

            flex
            flex-col

            items-center
            lg:items-start

            text-center
            lg:text-left

            gap-3
            sm:gap-4
            md:gap-5

            pb-8
            lg:pb-0

            tracking-wide
          "
        >
          {/* Small Heading */}
          <h4
            className="
              font-medium
              text-[10px]
              sm:text-xs
              md:text-sm
              tracking-[0.18em]
              sm:tracking-[0.2em]
              text-gray-700
            "
          >
           PERSONALISED GIFTING
          </h4>

          {/* Main Heading */}
          <h1
            className="
              font-medium

              text-[22px]
              sm:text-[26px]
              md:text-[30px]
              lg:text-[34px]
              xl:text-[40px]

              leading-tight
              tracking-[0.08em]
              sm:tracking-[0.1em]

              max-w-[500px]
            "
          >
           CUSTOM CANDLES AVAILABLE
          </h1>

          {/* Description */}
          <p
            className="
              max-w-[500px]

              text-[12px]
              sm:text-sm
              md:text-base

              leading-relaxed

              text-gray-600

              font-light
            "
          >
            Make every occasion unforgettable with our personalised hidden-message candles. Whether it’s a sweet 'Happy Rakhi,' a special name, or a secret note, our handcrafted soy wax candles let you express your feelings uniquely. The perfect blend of luxury fragrance and a custom surprise for your loved ones.
          </p>

          {/* Button */}
          <div className="pt-2 sm:pt-3">
            <button
              className="
                px-6
                sm:px-7
                md:px-9

                py-2.5
                sm:py-3
                md:py-3.5

                bg-black
                text-white

                text-[10px]
                sm:text-xs
                md:text-sm

                tracking-[0.15em]
                sm:tracking-[0.18em]

                uppercase

                transition-all
                duration-300

                hover:bg-[#C5A880]
                hover:text-black

                active:scale-95
              "
            >
             CUSTOMISE YOURS
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
