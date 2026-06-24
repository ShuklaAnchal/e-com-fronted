"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

const ReelProducts = () => {
  const router = useRouter();
  const swiperRef = useRef(null);

  const [activeVideo, setActiveVideo] = useState(null);

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

  return (
    <>
      <section className="w-full py-20 bg-[#faf7f2]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Heading */}
          <div className="mb-12">
            <p className="text-xs tracking-[0.4em] uppercase text-[#c5a880] mb-3">
              Editorial Journal
            </p>

            <h2 className="text-3xl md:text-5xl font-serif font-light tracking-[0.08em] uppercase text-black">
              Siyaas In Motion
            </h2>

            <p className="mt-4 text-sm italic text-gray-500">
              Experience the sensory warmth of our handcrafted collection.
            </p>
          </div>

          {/* Slider Wrapper */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="absolute -left-6 md:-left-6 top-1/2 -translate-y-1/2 z-20
                         w-12 h-12 rounded-full bg-white text-black
                         shadow-lg border border-gray-200
                         flex items-center justify-center"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
              spaceBetween={24}
              slidesPerView={1.2}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
              }}
            >
              {products.map((item) => (
                <SwiperSlide key={item._id}>
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    {/* Video */}
                    <video
                      src={item.video.url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-[420px] object-cover cursor-pointer"
                      onClick={() =>
                        setActiveVideo({
                          url: item.video.url,
                        })
                      }
                    />

                    {/* Product Content */}
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-black">
                        {item.name}
                      </h3>

                      <p className="mt-2 text-[#a67c52] font-semibold">
                        ₹{item.price}
                      </p>

                      <button
                        onClick={() =>
                          router.push(`/products/${item._id}`)
                        }
                        className="mt-4 w-full py-3 border border-[#c5a880]
                                   text-[#c5a880]
                                   hover:bg-[#c5a880]
                                   hover:text-black
                                   transition-all duration-300 rounded-md"
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
              className="absolute right-0 md:-right-6 top-1/2 -translate-y-1/2 z-20
                         w-12 h-12 rounded-full bg-white text-black
                         shadow-lg border border-gray-200
                         flex items-center justify-center"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
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
              src={activeVideo.url}
              controls
              autoPlay
              className="w-full rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ReelProducts;