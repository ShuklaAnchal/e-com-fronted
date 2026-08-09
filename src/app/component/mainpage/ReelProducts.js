"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";



const ReelProducts = () => {
  const router = useRouter();

  const swiperRef = useRef(null);
  const videoRefs = useRef([]);

  const [activeVideo, setActiveVideo] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const products = [
    {
      _id: "demo1",
      name: "Vanilla Soy Candle",
      price: 799,
      video: {
        url: "https://v1.pinimg.com/videos/mc/720p/2a/c1/6e/2ac16ebbdb7cb8b3d65a3d0cf1e44d42.mp4",
      },
    },
    {
      _id: "demo2",
      name: "Lavender Collection",
      price: 999,
      video: {
        url: "https://v1.pinimg.com/videos/mc/720p/c0/e5/03/c0e5039f7f97c6669f58fa7eddfa43c9.mp4",
      },
    },
    {
      _id: "demo3",
      name: "Luxury Amber Candle",
      price: 1299,
      video: {
        url: "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
      },
    },
    {
      _id: "demo4",
      name: "Rose Essence",
      price: 899,
      video: {
        url: "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
      },
    },
    {
      _id: "demo5",
      name: "Luxury Collection",
      price: 1499,
      video: {
        url: "https://v1.pinimg.com/videos/mc/720p/2a/c1/6e/2ac16ebbdb7cb8b3d65a3d0cf1e44d42.mp4",
      },
    },
    {
      _id: "demo6",
      name: "Signature Collection",
      price: 1499,
      video: {
        url: "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
      },
    },
    {
      _id: "demo7",
      name: "Signature Collection",
      price: 1499,
      video: {
        url: "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
      },
    },

    {
      _id: "demo8",
      name: "Signature Collection",
      price: 1499,
      video: {
        url: "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
      },
    },
  ];

  useEffect(() => {
    const firstVideo = videoRefs.current[0];

    if (firstVideo) {
      firstVideo.play().catch(() => {});
    }

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) video.pause();
      });
    };
  }, []);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);

    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === swiper.activeIndex) {
        video.currentTime = 0;
        video.play().catch(() => {});
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  };
 
  return (
    <>
      <section className=" w-full webprimarycolor flex justify-center">
        <div className="w-[94%] md:w-[90%] px-2 md:px-6">
          <div className="py-5 relative bg-[#ffffff]">
            {/* LEFT ARROW */}

            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="
              hidden
              md:flex
              absolute
              -left-8
              top-1/2
              -translate-y-1/2
              z-20
              w-12
              h-12
              rounded-full
              bg-[#FAF7F2]
              items-center
              justify-center
              shadow-md
              border
              border-[#C5A880]/20
              hover:bg-[#C5A880]
              transition
              "
            >
              ‹
            </button>

            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={handleSlideChange}
              spaceBetween={12}
              slidesPerView={2}
              speed={600}
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
                  spaceBetween: 20,
                },

                1024: {
                  slidesPerView: 5,
                  spaceBetween: 24,
                },

                1280: {
                  slidesPerView: 6,
                  spaceBetween: 20,
                },
              }}
            >
              {products.map((item, index) => (
                <SwiperSlide key={item._id} className="py-2">
                  <div className="bg-white overflow-hidden transition-all border-b-2 border-white shadow-md transition-transform rounded-2xl duration-700">
                    <div className="relative overflow-hidden h-[220px] sm:h-[250px] lg:h-[240px] ">
                      <video
                        ref={(el) => {
                          videoRefs.current[index] = el;
                        }}
                        src={item.video.url}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 "
                        onClick={() =>
                          setActiveVideo({
                            url: item.video.url,
                          })
                        }
                      />

                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 text-[8px] uppercase tracking-[0.2em] text-white">
                        Reel
                      </div>
                    </div>

                    <div className=" p-2 m:p-3 border-t border-[#C5A880]/10">
                      <h3 className="text-[11px] sm:text-[14px] font-serif uppercase tracking-[0.12em] truncate">
                        {item.name}
                      </h3>

                      <p className="-1 text-[12px] sm:text-[14px] font-light">
                        Rs. {item.price}
                      </p>

                      <button
                        onClick={() => router.push(`/products/${item._id}`)}
                        className=" mt-2 sm:mt-3 rounded-xl w-full py-2 border border-[#C5A880]/50 text-[9px] sm:text-[10px] uppercase
                        tracking-[0.2em] hover:bg-[#C5A880] transition-all "
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* RIGHT ARROW */}

            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="
              hidden md:flex absolute -right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full
              bg-[#FAF7F2] items-center justify-center shadow-md border border-[#C5A880]/20 hover:bg-[#C5A880] transition "
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/90  z-[9999] flex items-center justify-center "
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="
            w-[90%]
            max-w-md
            "
            onClick={(e) => e.stopPropagation()}
          >
            <video
              key={activeVideo.url}
              src={activeVideo.url}
              controls
              autoPlay
              playsInline
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ReelProducts;
