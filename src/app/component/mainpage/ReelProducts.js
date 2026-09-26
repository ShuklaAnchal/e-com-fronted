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
      name: "Lavender Collection",
      // price: 799,
      video: {
        url: "https://res.cloudinary.com/jx2mazj5/video/upload/v1790437200/InShot_20260117_171128341_l9tu5d.mp4",
      },
    },
    {
      _id: "demo2",
      name: "Scented candles",
      // price: 999,
      video: {
        url: "https://res.cloudinary.com/jx2mazj5/video/upload/v1790437170/VID_20260926002314702_rgejgb.mp4",
      },
    },
    {
      _id: "demo3",
      name: "Luxury Amber Candle",
      // price: 1299,
      video: {
        url: "https://res.cloudinary.com/jx2mazj5/video/upload/v1790437148/WhatsApp_Video_2026-09-26_at_7.38.33_PM_1_ukurqq.mp4",
      },
    },
    {
      _id: "demo4",
      name: "Jasmin big jar",
      // price: 899,
      video: {
        url: "https://res.cloudinary.com/jx2mazj5/video/upload/v1790437062/IMG_6149_srmboq.mov",
      },
    },
    {
      _id: "demo5",
      name: "Luxury Collection",
      // price: 1499,
      video: {
        url: "https://res.cloudinary.com/jx2mazj5/video/upload/v1790437053/IMG_6399_qfjmd3.mov",
      },
    },
    {
      _id: "demo6",
      name: "Lavender mid jar",
      // price: 1499,
      video: {
        url: "https://res.cloudinary.com/jx2mazj5/video/upload/v1790437045/WhatsApp_Video_2026-09-26_at_8.11.18_PM_j3tota.mp4",
      },
    },

  ];

  useEffect(() => {
    const playVideos = () => {
      videoRefs.current.forEach((video) => {
        if (!video) return;

        video.muted = true;

        video.play().catch((error) => {
          console.log("Video autoplay blocked:", error);
        });
      });
    };

    // Give Swiper/browser time to render videos
    const timer = setTimeout(playVideos, 500);

    return () => {
      clearTimeout(timer);

      videoRefs.current.forEach((video) => {
        if (video) {
          video.pause();
        }
      });
    };
  }, []);

 const handleSlideChange = (swiper) => {
  setActiveIndex(swiper.activeIndex);

  // Wait until Swiper has finished moving the slides
  setTimeout(() => {
    videoRefs.current.forEach((video) => {
      if (!video) return;

      video.muted = true;

      video.play().catch((error) => {
        console.log("Could not autoplay video:", error);
      });
    });
  }, 100);
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
                        autoPlay
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
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

                      {/* <p className="-1 text-[12px] sm:text-[14px] font-light">
                        Rs. {item.price}
                      </p> */}

                      <button
                        onClick={() => router.push(`/products`)}
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
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center"
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="relative w-[90%] max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              aria-label="Close reel"
              className="
          absolute
          top-7
          -right-0
          z-50
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          bg-white/20
          text-2xl
          text-black
          backdrop-blur-md
          border
          border-white/20
          
          transition-all
          duration-300
          hover:bg-white
          hover:text-black
        "
            >
              ×
            </button>
            ```
            {/* Reel Video */}
            <video
              key={activeVideo.url}
              src={activeVideo.url}
              controls
              autoPlay
              playsInline
              className="w-full rounded-lg"
            />
          </div>
          ```
        </div>
      )}
    </>
  );
};

export default ReelProducts;
