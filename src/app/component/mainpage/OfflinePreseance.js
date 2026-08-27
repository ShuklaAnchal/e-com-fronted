"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const moments = [
  {
    category: "Events",
    title: "A Candle That Made My Home Special",
    person: "Bhopal",
    video:
      "https://res.cloudinary.com/mdbmovuw/video/upload/v1786957322/AQMl428t7WoSuzCTcp_Zd_FOChyHyt1xTyqaDjASHJ7sKZzcHKYeTZxUquFsVJxWzsLPs7AUJWr_uyTh3UollSKxjahwW-lhAiWfLLU.mp4",
  },
  {
    category: "Events",
    title: "Siyaas Festive Collection Launch",
    person: "Bhopal",
    video:
      "https://res.cloudinary.com/mdbmovuw/video/upload/v1786957341/VID_20260816204415607.mp4",
  },
  {
    category: "Event",
    title: "Hack Nd Make Startup India",
    person: "Bhopal",
    video:
      "https://res.cloudinary.com/mdbmovuw/video/upload/v1786957448/AQNR_KECKSki6nv7UoUgSkCmKv-x38AD6H4sgwHRujqt43sca9OURZSlG6ZVOEPOqheHYvMZO-Ivq_GjbwCj52gcjqiiJhZqs0cHWLc.mp4",
  },
  {
    category: "Events",
    title: "Jamming By The Koun Active Hai",
    person: "Bhopal",
    video:
      "https://res.cloudinary.com/mdbmovuw/video/upload/v1786957715/AirBrushVideo1786879064978.mp4",
  },
  {
    category: "Customer Love",
    title: "A Candle That Made My Home Special",
    person: "Bhopal",
    video:
      "https://res.cloudinary.com/mdbmovuw/video/upload/v1787074648/promationvideo.mp4",
  },
  // {
  //   category: "Events",
  //   title: "Siyaas Festive Collection Launch",
  //   person: "Bhopal",
  //   video:
  //     "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  // },
  // {
  //   category: "Customer Love",
  //   title: "Perfect Gift For Every Occasion",
  //   person: "Priya",
  //   video:
  //     "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  // },
  // {
  //   category: "Events",
  //   title: "Luxury Exhibition 2025",
  //   person: "Delhi",
  //   video:
  //     "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  // },
];

export default function MomentsWithSiyaas() {
  return (
    <section className="webprimarycolor overflow-visible w-full flex items-center justify-center">
      <div className="w-[90%] px-6">

        {/* ================= HEADER ================= */}

        <div className="text-center mb-10">
          <p className="text-xs tracking-[0.5em] uppercase text-[#C5A880] mb-3 font-light">
            Siyaas Community
          </p>

          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1A1A1A] leading-tight uppercase tracking-wider">
            Offline Presence
          </h2>

          <div className="w-24 h-px bg-[#C5A880] mx-auto my-4" />

          <p className="max-w-2xl mx-auto text-[#6C6C6C] text-sm leading-6 font-light tracking-wide font-sans">
            Discover how our handcrafted fragrances become part of daily
            rituals, transforming ordinary spaces into warm and memorable
            experiences.
          </p>
        </div>

        {/* ================= VIDEO SLIDER ================= */}

        <div className="relative">
          <Swiper
            modules={[Pagination]}
            spaceBetween={24}
            slidesPerView={1.2}
            pagination={{
              clickable: true,
              el: ".siyaas-pagination",
            }}
            onBeforeInit={(swiper) => {
              swiper.params.pagination.el =
                ".siyaas-pagination";
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
                    group
                    relative
                    overflow-hidden
                    rounded-xl
                    bg-[#FAF7F2]
                    border
                    border-[#C5A880]/20
                  "
                >

                  {/* ================= VIDEO ================= */}

                  <video
                    src={item.video}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="
                      block
                      w-full
                      h-[430px]
                      object-cover
                      transition-transform
                      duration-[1200ms]
                      group-hover:scale-105
                    "
                  />

                  {/* ================= GRADIENT ================= */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/80
                      via-black/20
                      to-transparent
                    "
                  />

                  {/* ================= TEXT ================= */}

                  <div
                    className="
                      pointer-events-none
                      absolute
                      bottom-8
                      left-7
                      right-5
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

          {/* ================= PAGINATION ================= */}

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

        {/* ================= QUOTE ================= */}

        <div className="max-w-5xl mx-auto text-center mt-10">
          <p
            className="
              font-serif
              italic
              text-xl
              md:text-3xl
              font-extralight
              text-[#1A1A1A]
              leading-[35px]
              max-w-4xl
              mx-auto
            "
          >
            “Luxury is not simply what you see,
            <br />
            but what you feel long after the moment has passed.”
          </p>
        </div>
      </div>
    </section>
  );
}