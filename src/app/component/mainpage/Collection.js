"use client";

import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useCategories } from "@/app/hooks/catgeoryHook";
import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";

const Collection = () => {
  const router = useRouter();
  const { categories } = useCategories();

  console.log({categories});
  
  return (
    <section
      className="
      w-full
      webprimarycolor
      flex
      justify-center
      "
    > 
      <div
        className="
        w-[94%]
        md:w-[90%]
        px-2
        md:px-6
        "
      >
        {/* HEADER */}

        <div className="text-center mb-10 md:mb-16">
          <p
            className="
            text-[10px]
            md:text-xs
            tracking-[0.4em]
            text-[#C5A880]
            uppercase
            mb-3"
          >
            CURATED EDITIONS
          </p>

          <h2
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
            Our Collection
          </h2>

          <p
            className="
            mt-2
            font-serif
            italic
            text-[#C5A880]/70
            text-sm
            md:text-base
            "
          >
            Slow-crafted aromatics and artisanal design.
          </p>
        </div>

        <div
          className="
  grid
  grid-cols-2
  md:grid-cols-4
  gap-4
  md:gap-8
  "
        >
          {categories.map((item) => (
            <div
              key={item._id}
              onClick={() =>
                router.push(
                  `/category/${encodeURIComponent(item.name)}?categoryId=${item._id}`,
                )
              }
              className="
      group shadow-md 
      rounded-xl
      cursor-pointer
      overflow-hidden
      border
      border-[#C5A880]/15
      webprimarycolor
      transition-all
      duration-700
      hover:-translate-y-2
      "
            >
              {/* VIDEO */}

              <div
                className="
        relative
        aspect-[1/1]
        overflow-hidden
        "
              >
                {/* <video
                  src={item.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="
          absolute
          inset-0
          w-full
          h-full
          rounded-xl
          object-cover
          transition-transform
          duration-[1500ms]
          group-hover:scale-105
          "
                /> */}

                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="
    rounded-xl
    object-cover
    transition-transform
    duration-[1500ms]
    group-hover:scale-105
  "
                />
                {/* Overlay */}

                <div
                  className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/80
          via-black/20
          to-transparent
          "
                />

                {/* Title */}

                <div
                  className="
          absolute
          bottom-4
          left-4
          md:left-8
          md:bottom-8
          text-white
          "
                >
                  <p
                    className="
            text-[8px]
            md:text-[10px]
            tracking-[0.3em]
            uppercase
            text-[#C5A880]
            "
                  >
                    Collection
                  </p>

                  <h3
                    className="
            mt-2
            text-lg
            md:text-3xl
            font-serif
            uppercase
            tracking-[0.12em]
            font-light
            "
                  >
                    {item.name}
                  </h3>
                </div>
              </div>

              {/* CONTENT */}

              <div
                className="
        p-3
        md:p-8
        "
              >
                <p
                  className="
          text-[11px]
          md:text-sm
          text-[#6C6C6C]
          leading-relaxed
          tracking-wide
          line-clamp-2
          "
                >
                  {item.description}
                </p>

                <div
                  className="
          flex
          items-center
          justify-between
          mt-4
          md:mt-7
          "
                >
                  <span
                    className="
            text-[8px]
            md:text-[10px]
            uppercase
            tracking-[0.3em]
            text-[#C5A880]
            "
                  >
                    Explore
                  </span>

                  <span
                    className="
            text-[#C5A880]
            transition-transform
            group-hover:translate-x-2
            "
                  >
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;
