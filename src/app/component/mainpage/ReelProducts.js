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
      name: "Luxury Collection",
      price: 1499,
      video: {
        url: "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
      },
    },
    {
      _id: "demo7",
      name: "Luxury Collection",
      price: 1499,
      video: {
        url: "https://v1.pinimg.com/videos/mc/720p/c0/e5/03/c0e5039f7f97c6669f58fa7eddfa43c9.mp4",
      },
    },
    {
      _id: "demo8",
      name: "Luxury Collection",
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
        if (video) {
          video.pause();
        }
      });
    };
  }, []);

  return (
    <>
      <section className="w-[100%] py-20 webprimarycolor flex justify-center items-center">
        <div className="w-[90%] px-4 md:px-6">
          {/* Heading */}
          {/* <div className="mb-12">
            <p className="text-xs tracking-[0.4em] uppercase newcoo mb-3">
              Editorial Journal
            </p>

            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-[0.08em] uppercase text-black">
              Siyaas In Motion
            </h2>

            <p className="mt-4 text-sm italic text-gray-500">
              Experience the sensory warmth of our handcrafted collection.
            </p>
          </div> */}

          {/* Slider Wrapper */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute -left-5 md:-left-8 top-1/2 -translate-y-1/2 z-20
                         w-12 h-12 rounded-full bg-[#FAF7F2]/90 text-black
                         shadow-md border border-[#C5A880]/20 hover:border-[#C5A880] hover:bg-[#C5A880] hover:text-black
                         transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Swiper */}
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);

                videoRefs.current.forEach((video, i) => {
                  if (!video) return;

                  if (i === swiper.activeIndex) {
                    video.currentTime = 0;
                    video.play().catch(() => {});
                  } else {
                    video.pause();
                    video.currentTime = 0;
                  }
                });
              }}
              spaceBetween={20}
              slidesPerView={1.2}
              centeredSlides={false}
              speed={600}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 6,
                },
              }}
            >
              {products.map((item, index) => (
                <SwiperSlide key={item._id}>
                  <div className="bg-border border-[#C5A880]/15 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-[#C5A880]/40 hover:shadow-[0_20px_45px_rgba(197,168,128,0.06)] hover:-translate-y-2">
                    {/* Video */}
                    <div className="relative overflow-hidden aspect-[3/4] rounded-xl">
                      <video
                        ref={(el) => {
                          videoRefs.current[index] = el;
                        }}
                        src={item.video.url}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover cursor-pointer transition-transform duration-700 hover:scale-105"
                        onClick={() =>
                          setActiveVideo({
                            url: item.video.url,
                          })
                        }
                      />
                      <div className="absolute top-4 right-4 bg-[#121212]/60 backdrop-blur-md px-3 py-1 text-[9px] uppercase tracking-[0.2em] newcoo">
                        Play Reel
                      </div>
                    </div>

                    {/* Product Content */}
                    <div className="p-5 border-t border-[#C5A880]/10">
                      <h3 className="text-[15px] font-serif tracking-[0.15em] uppercase text-black font-medium truncate">
                        {item.name}
                      </h3>

                      <p className="mt-2 newcoo text-[15px] font-light font-sans tracking-wide">
                        Rs. {item.price}
                      </p>

                      <button
                        onClick={() => router.push(`/products/${item._id}`)}
                        className="mt-5 w-full py-3 border border-[#C5A880]/50
                                   newcoo text-[10px] uppercase tracking-[0.2em] font-medium
                                   hover:bg-[#C5A880] hover:text-[#121212]
                                   transition-all duration-500 rounded-none cursor-pointer"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Right Arrow */}
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="absolute -right-6 md:-right-8 top-1/2 -translate-y-1/2 z-20
                         w-12 h-12 rounded-full bg-[#FAF7F2]/90 text-black
                         shadow-md border border-[#C5A880]/20 hover:border-[#C5A880] hover:bg-[#C5A880] hover:text-black
                         transition-all duration-300 flex items-center justify-center cursor-pointer"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-[90%] max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 text-white text-3xl"
            >
              ×
            </button>

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
