"use client";

import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { AiOutlineEye } from "react-icons/ai";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

/* ============================================================
   REEL DATA — UNCHANGED
============================================================ */

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

/* ============================================================
   RANDOM VIEW COUNTS
   Generates a stable simulated count for each reel.
============================================================ */

const REEL_VIEWS = PRODUCTS.reduce((views, item) => {
  views[item._id] =
    Math.floor(Math.random() * (2_000_000 - 600_000 + 1)) +
    600_000;

  return views;
}, {});

const formatViews = (views) => {
  if (views >= 1_000_000) {
    return `${(views / 1_000_000)
      .toFixed(1)
      .replace(/\.0$/, "")}M`;
  }

  return `${Math.round(views / 1_000)}K`;
};

/* ============================================================
   REEL PRODUCTS
============================================================ */

const ReelProducts = () => {
  const router = useRouter();

  const swiperRef = useRef(null);
  const videoRefs = useRef([]);

  const [activeVideo, setActiveVideo] = useState(null);

  // Play only videos belonging to visible slides.
  const updateVisibleVideos = useCallback(() => {
    const swiper = swiperRef.current;

    if (!swiper || swiper.destroyed) return;

    const pageIsVisible =
      document.visibilityState === "visible";

    const modalIsOpen = Boolean(activeVideo);

    swiper.slides.forEach((slide) => {
      const video = slide.querySelector("video");

      if (!video) return;

      const isVisibleSlide = slide.classList.contains(
        "swiper-slide-visible"
      );

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

      video.muted = true;
      video.playsInline = true;

      if (!video.paused) return;

      video.play().catch((error) => {
        if (
          error.name !== "AbortError" &&
          error.name !== "NotAllowedError"
        ) {
          console.warn(
            "Unable to play reel:",
            error.name
          );
        }
      });
    });
  }, [activeVideo]);

  // Synchronize playback with page visibility and modal state.
  useEffect(() => {
    const timer = setTimeout(
      updateVisibleVideos,
      150
    );

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

  const handleSlideChange = useCallback(() => {
    requestAnimationFrame(() => {
      updateVisibleVideos();
    });
  }, [updateVisibleVideos]);

  const openReel = (item) => {
    setActiveVideo({
      url: item.video.url,
      name: item.name,
    });
  };

  const closeReel = () => {
    setActiveVideo(null);
  };

  // Close fullscreen video using Escape.
  useEffect(() => {
    if (!activeVideo) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeReel();
      }
    };

    document.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [activeVideo]);

  return (
    <>
      <section className="w-full webprimarycolor flex justify-center overflow-hidden">
        <div className="w-[88%] md:w-[94%] lg:w-[92%] px-2 md:px-6">
          <div className="relative bg-white py-5 md:py-8">
            {/* LEFT ARROW */}
            <button
              type="button"
              aria-label="Previous reels"
              onClick={() =>
                swiperRef.current?.slidePrev()
              }
              className="
                hidden md:flex absolute -left-5 lg:-left-7
                top-1/2 -translate-y-1/2 z-20
                w-12 h-12 rounded-full
                bg-[#FAF7F2] items-center justify-center
                shadow-md border border-[#C5A880]/30
                text-2xl text-[#5C4033]
                hover:bg-[#C5A880] transition
              "
            >
              ‹
            </button>

            {/* REEL SLIDER */}
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
              spaceBetween={14}
              slidesPerView={1}
              speed={600}
              breakpoints={{
                320: {
                  slidesPerView: 2,
                  spaceBetween: 14,
                },
                480: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 22,
                },
                1280: {
                  slidesPerView: 5,
                  spaceBetween: 24,
                },
              }}
            >
              {PRODUCTS.map((item, index) => (
                <SwiperSlide
                  key={item._id}
                  className="py-2 h-auto"
                >
                  <article className="overflow-hidden border-b-2 border-white shadow-md rounded-2xl transition-transform duration-700">
                    {/* REEL VIDEO */}
                    <div
                      className="
relative overflow-hidden h-[220px] sm:h-[250px] lg:h-[240px]
                      "
                    >
                      <video
                        ref={(element) => {
                          videoRefs.current[index] =
                            element;
                        }}
                        src={item.video.url}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={`${item.name} reel`}
                        className="
                          block w-full h-full
                          object-cover
                          transition-transform duration-700
                          hover:scale-105 cursor-pointer
                        "
                        onClick={() => openReel(item)}
                        onCanPlay={updateVisibleVideos}
                      />

                      {/* VIDEO GRADIENT */}
                      <div
                        className="
                          absolute inset-0
                          pointer-events-none
                          bg-gradient-to-t
                          from-black/30 via-transparent
                          to-black/10
                        "
                      />

                      {/* RANDOM VIEW COUNT — TOP LEFT */}
                      <div
                        className="
                          absolute top-3 left-3 z-20
                          flex items-center gap-1.5
                          rounded-full
                          bg-black/55
                          backdrop-blur-md
                          px-2.5 py-1.5
                          text-white
                          border border-white/20
                          shadow-sm
                          pointer-events-none
                        "
                      >
                        <AiOutlineEye className="text-base sm:text-lg" />

                        <span className="text-[10px] sm:text-xs font-medium tracking-wide">
                          {formatViews(REEL_VIEWS[item._id])}
                        </span>
                      </div>

                      {/* REEL BADGE */}
                      <div
                        className="
                          absolute top-3 right-3 z-20
                          bg-black/50 backdrop-blur-md
                          px-3 py-1.5
                          rounded-full
                          text-[9px] uppercase
                          tracking-[0.2em] text-white
                          border border-white/20
                          pointer-events-none
                        "
                      >
                        Reel
                      </div>

                      {/* OPEN FULLSCREEN */}
                      <button
                        type="button"
                        aria-label={`Watch ${item.name} reel`}
                        onClick={() => openReel(item)}
                        className="
                          absolute inset-0 z-10
                          flex items-center justify-center
                          cursor-pointer group
                        "
                      >
                        <span
                          className="
                            w-12 h-12 rounded-full
                            border border-white/70
                            bg-black/20 backdrop-blur-sm
                            flex items-center justify-center
                            text-white text-lg
                            opacity-0 group-hover:opacity-100
                            transition-opacity duration-300
                          "
                        >
                          ▶
                        </span>
                      </button>
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div
                      className="
                        p-4 sm:p-5
                        border-t border-[#C5A880]/10
                      "
                    >
                      <h3
                        className="
                          text-sm sm:text-base
                          font-serif uppercase
                          tracking-[0.12em]
                          text-[#1A1A1A]
                          truncate
                        "
                      >
                        {item.name}
                      </h3>

                      <button
                        type="button"
                        onClick={() =>
                          router.push("/products")
                        }
                        className="
                          mt-3 rounded-xl w-full py-2.5
                          border border-[#C5A880]/50
                          text-[10px] sm:text-xs
                          uppercase tracking-[0.2em]
                          text-[#5C4033]
                          hover:bg-[#C5A880]
                          transition-all duration-300
                        "
                      >
                        Buy Now
                      </button>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* RIGHT ARROW */}
            <button
              type="button"
              aria-label="Next reels"
              onClick={() =>
                swiperRef.current?.slideNext()
              }
              className="
                hidden md:flex absolute -right-5 lg:-right-7
                top-1/2 -translate-y-1/2 z-20
                w-12 h-12 rounded-full
                bg-[#FAF7F2] items-center justify-center
                shadow-md border border-[#C5A880]/30
                text-2xl text-[#5C4033]
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
          role="dialog"
          aria-modal="true"
          aria-label={activeVideo.name}
          className="
            fixed inset-0 bg-black/90
            z-[9999] flex items-center
            justify-center p-4
          "
          onClick={closeReel}
        >
          <div
            className="relative w-full max-w-md"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            {/* CLOSE BUTTON */}
            <button
              type="button"
              onClick={closeReel}
              aria-label="Close reel"
              className="
                absolute top-3 right-3 z-50
                flex h-10 w-10 items-center
                justify-center rounded-full
                bg-black/50 text-2xl text-white
                backdrop-blur-md border border-white/20
                transition hover:bg-white hover:text-black
              "
            >
              ×
            </button>

            {/* FULLSCREEN VIDEO */}
            <video
              key={activeVideo.url}
              src={activeVideo.url}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="
                w-full max-h-[85vh]
                rounded-xl bg-black object-contain
              "
            />

            <p
              className="
                mt-4 text-center
                text-sm uppercase tracking-widest
                text-white
              "
            >
              {activeVideo.name}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ReelProducts;