"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Trending = () => {
  const router = useRouter();

  const collections = [
    {
      id: 1,
      image: "/tranding-2.png",
      title: "TRY & BUY",
      description: "Bestsellers now in minis",
      link: "/products",
    },
    {
      id: 2,
      image: "/tranding-2.png",
      title: "Candles",
      description: "Vanilla scented candles",
      link: "/collections/bridgerton",
    },
  ];

  return (
   <div className="text-center">
       <h1
        className="
            text-3xl
            sm:text-5xl
            font-serif
            font-extralight
            tracking-[0.1em]
            text-[#1A1A1A]
            uppercase
            "
      >
        MOST TRENDING
      </h1>
     <section className="w-full bg-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-10 sm:py-12 md:py-16 lg:py-10">
   
      <div
        className="
          max-w-[1500px]
          mx-auto

          grid
          grid-cols-1
          md:grid-cols-2

          gap-10
          sm:gap-12
          md:gap-8
          lg:gap-10
          xl:gap-12
        "
      >
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="
              w-full
              flex
              flex-col
              items-center
              text-center
            "
          >
            {/* --------------------------------------------------
                IMAGE
            -------------------------------------------------- */}
            <div
              className="
                relative
                w-full
                aspect-[4/3]
                overflow-hidden
                cursor-pointer
                group
              "
              onClick={() => router.push(collection.link)}
            >
              <Image
                src={collection.image}
                alt={collection.title}
                fill
                priority={collection.id === 1}
                sizes="
                  (max-width: 768px) 100vw,
                  50vw
                "
                className="
                  object-cover
                  object-center

                  transition-transform
                  duration-700
                  ease-out

                  group-hover:scale-[1.02]
                "
              />
            </div>

            {/* --------------------------------------------------
                TITLE
            -------------------------------------------------- */}
            <h2
              className="
                mt-6
                sm:mt-7
                md:mt-7
                lg:mt-5

                font-light

                text-[16px]
                sm:text-[17px]
                md:text-[18px]
                lg:text-[19px]

                tracking-[0.18em]
                sm:tracking-[0.2em]

                text-[#111]

                uppercase
              "
            >
              {collection.title}
            </h2>

            {/* --------------------------------------------------
                DESCRIPTION
            -------------------------------------------------- */}
            <p
              className="
                mt-2
                sm:mt-1

                text-[13px]
                sm:text-[14px]
                md:text-[15px]

                tracking-wide

                font-light

                text-[#222]
              "
            >
              {collection.description}
            </p>

            {/* --------------------------------------------------
                BUTTON
            -------------------------------------------------- */}
            <button
              onClick={() => router.push(collection.link)}
              className="
                mt-7
                sm:mt-3

                px-7
                sm:px-8
                md:px-9

                py-3
                sm:py-3.5

                bg-[#191919]
                text-white

                text-[10px]
                sm:text-[11px]
                md:text-xs

                tracking-[0.2em]
                sm:tracking-[0.22em]

                font-light

                uppercase

                transition-all
                duration-300

                hover:bg-[#C5A880]
                hover:text-[#111]

                active:scale-[0.98]
              "
            >
              Discover Now
            </button>
          </div>
        ))}
      </div>
    </section>
   </div>
  );
};

export default Trending;
