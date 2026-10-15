"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PRODUCTS = [
  {
    _id: "demo1",
    name: "Lavender Collection",
    video: {
      url: "https://res.cloudinary.com/jx2mazj5/video/upload/v1790437200/InShot_20260117_171128341_l9tu5d.mp4",
    },
  },
  {
    _id: "demo2",
    name: "Scented candles",
    video: {
      url: "https://res.cloudinary.com/jx2mazj5/video/upload/v1790437170/VID_20260926002314702_rgejgb.mp4",
    },
  },
  {
    _id: "demo3",
    name: "Luxury Amber Candle",
    video: {
      url: "https://res.cloudinary.com/jx2mazj5/video/upload/v1790437148/WhatsApp_Video_2026-09-26_at_7.38.33_PM_1_ukurqq.mp4",
    },
  },
  {
    _id: "demo4",
    name: "Jasmin big jar",
    video: {
      url: "https://res.cloudinary.com/jx2mazj5/video/upload/v1790437062/IMG_6149_srmboq.mov",
    },
  },
  {
    _id: "demo5",
    name: "Luxury Collection",
    video: {
      url: "https://res.cloudinary.com/jx2mazj5/video/upload/v1790437053/IMG_6399_qfjmd3.mov",
    },
  },
  {
    _id: "demo6",
    name: "Lavender mid jar",
    video: {
      url: "https://res.cloudinary.com/jx2mazj5/video/upload/v1790437045/WhatsApp_Video_2026-09-26_at_8.11.18_PM_j3tota.mp4",
    },
  },
];

const ReelProducts = () => {
  const router = useRouter();

  const swiperRef = useRef(null);
  const videoRefs = useRef([]);

  const [activeVideo, setActiveVideo] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Play only the videos currently visible in the carousel.
  const updateVisibleVideos = useCallback(() => {
    const swiper = swiperRef.current;

    if (!swiper || swiper.destroyed) return;

    const pageIsVisible = document.visibilityState === "visible";
    const modalIsOpen = Boolean(activeVideo);

    swiper.slides.forEach((slide) => {
      const video = slide.querySelector("video");

      if (!video) return;

      const isVisibleSlide =
        slide.classList.contains("swiper-slide-visible");

      if (
        !pageIsVisible ||
        modalIsOpen ||
        !isVisibleSlide
      ) {
        if (!video.paused) {
          video.pause();
        }

        return;
      }

      // Muted inline playback is more likely to be permitted by browsers.
      video.muted = true;
      video.playsInline = true;

      // Avoid issuing duplicate playback requests.
      if (!video.paused) return;

      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          // These interruptions are expected during slide changes
          // and browser power-saving. Do not report them as app errors.
          if (
            error.name === "AbortError" ||
            error.name === "NotAllowedError"
          ) {
            return;
          }

          console.warn("Unable to play reel:", error.name);
        });
      }
    });
  }, [activeVideo]);

  // Synchronize videos when the carousel changes or the popup opens.
  useEffect(() => {
    const timer = setTimeout(updateVisibleVideos, 150);

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        videoRefs.current.forEach((video) => {
          if (video && !video.paused) {
            video.pause();
          }
        });
      } else {
        updateVisibleVideos();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      clearTimeout(timer);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );

      videoRefs.current.forEach((video) => {
        if (video && !video.paused) {
          video.pause();
        }
      });
    };
  }, [updateVisibleVideos]);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);

    // Let Swiper finish updating visible-slide classes first.
    requestAnimationFrame(() => {
      updateVisibleVideos();
    });
  };

  const openReel = (item) => {
    setActiveVideo({
      url: item.video.url,
      name: item.name,
    });
  };

  const closeReel = () => {
    setActiveVideo(null);
  };

  // Allow Escape to close the fullscreen reel.
  useEffect(() => {
    if (!activeVideo) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeReel();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeVideo]);

  return (
    <>
      <section className="w-full webprimarycolor flex justify-center">
        <div className="w-[94%] md:w-[90%] px-2 md:px-6">
          <div className="relative bg-white py-5">
            {/* LEFT ARROW */}
            <button
              type="button"
              aria-label="Previous reels"
              onClick={() => swiperRef.current?.slidePrev()}
              className="
                hidden md:flex absolute -left-8 top-1/2
                -translate-y-1/2 z-20 w-12 h-12 rounded-full
                bg-[#FAF7F2] items-center justify-center
                shadow-md border border-[#C5A880]/20
                hover:bg-[#C5A880] transition
              "
            >
              ‹
            </button>

            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;

                requestAnimationFrame(() => {
                  updateVisibleVideos();
                });
              }}
              onSlideChange={handleSlideChange}
              onTransitionEnd={updateVisibleVideos}
              watchSlidesProgress
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
              {PRODUCTS.map((item, index) => (
                <SwiperSlide key={item._id} className="py-2">
                  <div className="bg-white overflow-hidden border-b-2 border-white shadow-md rounded-2xl transition-transform duration-700">
                    <div className="relative overflow-hidden h-[220px] sm:h-[250px] lg:h-[240px]">
                      <video
                        ref={(element) => {
                          videoRefs.current[index] = element;
                        }}
                        src={item.video.url}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={`${item.name} reel`}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 cursor-pointer"
                        onClick={() => openReel(item)}
                        onCanPlay={updateVisibleVideos}
                      />

                      <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 text-[8px] uppercase tracking-[0.2em] text-white pointer-events-none">
                        Reel
                      </div>

                      <button
                        type="button"
                        aria-label={`Watch ${item.name} reel`}
                        onClick={() => openReel(item)}
                        className="absolute inset-0 cursor-pointer"
                      />
                    </div>

                    <div className="p-2 sm:p-3 border-t border-[#C5A880]/10">
                      <h3 className="text-[11px] sm:text-[14px] font-serif uppercase tracking-[0.12em] truncate">
                        {item.name}
                      </h3>

                      <button
                        type="button"
                        onClick={() => router.push("/products")}
                        className="
                          mt-2 sm:mt-3 rounded-xl w-full py-2
                          border border-[#C5A880]/50
                          text-[9px] sm:text-[10px] uppercase
                          tracking-[0.2em]
                          hover:bg-[#C5A880] transition-all
                        "
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
              type="button"
              aria-label="Next reels"
              onClick={() => swiperRef.current?.slideNext()}
              className="
                hidden md:flex absolute -right-8 top-1/2
                -translate-y-1/2 z-20 w-12 h-12 rounded-full
                bg-[#FAF7F2] items-center justify-center
                shadow-md border border-[#C5A880]/20
                hover:bg-[#C5A880] transition
              "
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* FULLSCREEN REEL */}
      {activeVideo && (
        <div
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center p-4"
          onClick={closeReel}
        >
          <div
            className="relative w-full max-w-md"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeReel}
              aria-label="Close reel"
              className="
                absolute top-3 right-3 z-50
                flex h-10 w-10 items-center justify-center
                rounded-full bg-black/50 text-2xl text-white
                backdrop-blur-md border border-white/20
                transition hover:bg-white hover:text-black
              "
            >
              ×
            </button>

            <video
              key={activeVideo.url}
              src={activeVideo.url}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="w-full max-h-[85vh] rounded-lg bg-black"
            />

            <p className="mt-3 text-center text-sm uppercase tracking-widest text-white">
              {activeVideo.name}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ReelProducts;