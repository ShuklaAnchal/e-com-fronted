"use client";

import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const categories = [
  {
    _id: "1",
    name: "Candles",
    description: "Pure soy wax & crackling wood wicks",
    video:
      "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  },

  {
    _id: "2",
    name: "Diffusers",
    description: "Delicate botanicals & continuous throw",
    video:
      "https://v1.pinimg.com/videos/mc/720p/fa/24/0d/fa240df0d8ded9098812e770dc99f587.mp4",
  },

  {
    _id: "3",
    name: "Wooden Crafts",
    description: "Meticulously carved heritage mandalas",
    video:
      "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  },

  {
    _id: "4",
    name: "Gift Hampers",
    description: "Luxury gifting experiences crafted with elegance",
    video:
      "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  },
];

const Collection = () => {
  const router = useRouter();

  return (
    <section
      className="
      w-full
      py-14
      md:py-24
      webprimarycolor
      border-b
      border-[#C5A880]/10
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

        <div className="text-center mb-12 md:mb-16">
          <p
            className="
            text-[10px]
            md:text-xs
            tracking-[0.4em]
            text-[#C5A880]
            uppercase
            mb-3
            "
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
            mt-4
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

        <div className="relative">
          {/* LEFT ARROW */}

          <button
            className="
            collection-prev
            hidden
            md:flex
            absolute
            -left-7
            top-1/2
            -translate-y-1/2
            z-20
            w-12
            h-12
            rounded-full
            bg-[#FAF7F2]
            border
            border-[#C5A880]/20
            items-center
            justify-center
            shadow-md
            hover:bg-[#C5A880]
            transition
            "
          >
            ‹
          </button>

          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".collection-prev",
              nextEl: ".collection-next",
            }}
            spaceBetween={14}
            slidesPerView={2}
            breakpoints={{
              320: {
                slidesPerView: 2,
                spaceBetween: 12,
              },

              480: {
                slidesPerView: 2,
                spaceBetween: 16,
              },

              640: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },

              768: {
                slidesPerView: 3,
                spaceBetween: 24,
              },

              1024: {
                slidesPerView: 4,
                spaceBetween: 28,
              },
            }}
            speed={700}
          >
            {categories.map((item) => (
              <SwiperSlide key={item._id}>
                <div
                  onClick={() => router.push(`/category/${item.name}`)}
                  className="
                group rounded-xl
                cursor-pointer
                overflow-hidden
                border
                border-[#C5A880]/15
                webprimarycolor
                transition-all
                duration-700
                hover:border-[#C5A880]/40
                hover:-translate-y-2
                hover:shadow-[0_20px_50px_rgba(197,168,128,0.08)]
                "
                >
                  {/* VIDEO */}

                  <div
                    className="
                  relative
                  aspect-[3/4]
                  overflow-hidden
                  "
                  >
                    <video
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
                    h-full rounded-xl
                    object-cover
                    transition-transform
                    duration-[1500ms]
                    group-hover:scale-105
                    "
                    />

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

                    <div
                      className="
                    absolute
                    bottom-5
                    left-5
                    md:left-8
                    md:bottom-8
                    text-white
                    "
                    >
                      <p
                        className="
                      text-[9px]
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
                      text-xl
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
                  p-4
                  md:p-8
                  "
                  >
                    <p
                      className="
                    text-xs
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
                    mt-5
                    md:mt-7
                    "
                    >
                      <span
                        className="
                      text-[9px]
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
              </SwiperSlide>
            ))}
          </Swiper>

          {/* RIGHT ARROW */}

          <button
            className="
          collection-next
          hidden
          md:flex
          absolute
          -right-7
          top-1/2
          -translate-y-1/2
          z-20
          w-12
          h-12
          rounded-full
          bg-[#FAF7F2]
          border
          border-[#C5A880]/20
          items-center
          justify-center
          shadow-md
          hover:bg-[#C5A880]
          transition
          "
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default Collection;
