"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const moments = [
  {
    category: "Customer Love",
    title: "A Candle That Made My Home Special",
    person: "Ananya",
    video:
      "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  },
  {
    category: "Events",
    title: "Siyaas Festive Collection Launch",
    person: "Mumbai Pop-Up",
    video:
      "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  },
  {
    category: "Customer Love",
    title: "Perfect Gift For Every Occasion",
    person: "Priya",
    video:
      "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  },
  {
    category: "Events",
    title: "Luxury Exhibition 2025",
    person: "Delhi",
    video:
      "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  },
  {
    category: "Customer Love",
    title: "A Candle That Made My Home Special",
    person: "Ananya",
    video:
      "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  },
  {
    category: "Events",
    title: "Siyaas Festive Collection Launch",
    person: "Mumbai Pop-Up",
    video:
      "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  },
  {
    category: "Customer Love",
    title: "Perfect Gift For Every Occasion",
    person: "Priya",
    video:
      "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  },
  {
    category: "Events",
    title: "Luxury Exhibition 2025",
    person: "Delhi",
    video:
      "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  },
  {
    category: "Events",
    title: "Luxury Exhibition 2025",
    person: "Delhi",
    video:
      "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  },
  {
    category: "Events",
    title: "Luxury Exhibition 2025",
    person: "Delhi",
    video:
      "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  },
];

export default function MomentsWithSiyaas() {
  return (
    <section className="py-10 webprimarycolor overflow-visible w-full flex items-center justify-center">
      <div className="w-[90%] px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.5em] uppercase text-[#C5A880] mb-5 font-light">
            Siyaas Community
          </p>

          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1A1A1A] leading-tight uppercase tracking-wider">
            Moments With Siyaas
          </h2>

          <div className="w-24 h-px bg-[#C5A880] mx-auto my-8" />

          <p className="max-w-2xl mx-auto text-[#6C6C6C] text-sm leading-8 font-light tracking-wide font-sans">
            Discover how our handcrafted fragrances become part of daily
            rituals, transforming ordinary spaces into warm and memorable
            experiences.
          </p>
        </div>

        {/* Video Layout */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1.2}
            // navigation
            pagination={{
              clickable: true,
              el: ".siyaas-pagination",
            }}
            onBeforeInit={(swiper) => {
              swiper.params.pagination.el = ".siyaas-pagination";
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 5,
              },
            }}
          >
            {moments.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  className="
          group rounded-xl
          relative
          overflow-hidden
          bg-[#FAF7F2]
          border
          border-[#C5A880]/20
          "
                >
                  <video
                    src={item.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="
            w-full
            h-[430px]
            object-cover
            transition-transform
            duration-[1200ms]
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
            inset-0
            flex
            items-center
            justify-center
            "
                  >
                    <div
                      className="
              w-16
              h-16
              rounded-full
              border
              border-white/50
              backdrop-blur-md
              flex
              items-center
              justify-center
              text-white
              text-xl
              "
                    >
                      ▶
                    </div>
                  </div>

                  <div
                    className="
            absolute
            bottom-8
            left-7
            text-white
            "
                  >
                    <p
                      className="
            uppercase
            tracking-[0.35em]
            text-[10px]
            text-[#C5A880]
            "
                    >
                      {item.category}
                    </p>

                    <h3
                      className="
            mt-3
            font-serif
            text-xl
            leading-tight
            "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
            mt-2
            text-sm
            text-white/70
            "
                    >
                      {item.person}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Pagination */}
          <div
            className="
    siyaas-pagination
    mt-10
    flex
    justify-center
    gap-3
  "
          />
        </div>

        {/* Brand Quote */}
        <div className="max-w-5xl mx-auto text-center mt-10">
          <p className="font-serif italic text-xl md:text-3xl font-extralight text-[#1A1A1A] leading-relaxed max-w-4xl mx-auto">
            “Luxury is not simply what you see,
            <br />
            but what you feel long after the moment has passed.”
          </p>
          </div>

        {/* Brand Values */}
        {/* <div className="grid md:grid-cols-3 gap-10 mt-32">
          <div className="text-center border-t border-[#C5A880]/20 pt-8 px-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-[#C5A880]/50 hover:-translate-y-1">
            <span className="block text-[#C5A880] text-xs uppercase tracking-[0.3em] font-light mb-3">
              01 / Process
            </span>
            <h3 className="font-serif text-lg text-[#1A1A1A] mb-4 uppercase tracking-[0.1em]">
              Handcrafted
            </h3>

            <p className="text-[#6C6C6C] text-xs leading-7 font-light font-sans tracking-wide">
              Every creation is carefully poured and finished by hand to ensure
              exceptional quality and attention to detail.
            </p>
          </div>

          <div className="text-center border-t border-[#C5A880]/20 pt-8 px-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-[#C5A880]/50 hover:-translate-y-1">
            <span className="block text-[#C5A880] text-xs uppercase tracking-[0.3em] font-light mb-3">
              02 / Quality
            </span>
            <h3 className="font-serif text-lg text-[#1A1A1A] mb-4 uppercase tracking-[0.1em]">
              Premium Fragrance
            </h3>

            <p className="text-[#6C6C6C] text-xs leading-7 font-light font-sans tracking-wide">
              Thoughtfully curated fragrance compositions designed to elevate
              the atmosphere of every space.
            </p>
          </div>

          <div className="text-center border-t border-[#C5A880]/20 pt-8 px-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-[#C5A880]/50 hover:-translate-y-1">
            <span className="block text-[#C5A880] text-xs uppercase tracking-[0.3em] font-light mb-3">
              03 / Design
            </span>
            <h3 className="font-serif text-lg text-[#1A1A1A] mb-4 uppercase tracking-[0.1em]">
              Timeless Design
            </h3>

            <p className="text-[#6C6C6C] text-xs leading-7 font-light font-sans tracking-wide">
              Elegant forms and refined aesthetics created to complement modern
              interiors and meaningful rituals.
            </p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
