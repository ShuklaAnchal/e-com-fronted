
"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { getMediaUrl } from "@/app/utils/mediaUrl";

export default function ProductGallery({ product, variants = [] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  // =========================================================
  // BUILD MEDIA LIST
  // =========================================================

  const media = useMemo(() => {
    const allMedia = [];

    const addMedia = (items) => {
      if (!Array.isArray(items)) return;

      items.forEach((item) => {
        if (!item) return;

        const mediaUrl =
          typeof item === "string" ? item : item.url;

        if (!mediaUrl) return;

        const url = getMediaUrl(mediaUrl);

        if (!url) return;

        const type =
          typeof item === "object"
            ? item.mediaType || item.type || "image"
            : "image";

        allMedia.push({
          ...(typeof item === "object" ? item : {}),
          type: type.toLowerCase(),
          url,
        });
      });
    };

    // Product-level images and videos
    addMedia(product?.media);

    // Variant-level images
    variants.forEach((variant) => {
      addMedia(variant?.images);
    });

    // Remove duplicate URLs
    return allMedia.filter(
      (item, index, self) =>
        index === self.findIndex(
          (mediaItem) => mediaItem.url === item.url
        )
    );
  }, [product?.media, variants]);

  // =========================================================
  // KEEP ACTIVE INDEX VALID
  // =========================================================

  useEffect(() => {
    setActiveIndex((current) =>
      media.length ? Math.min(current, media.length - 1) : 0
    );
  }, [media.length]);

  // =========================================================
  // NAVIGATION
  // =========================================================

  const selectedMedia = media[activeIndex];

  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      media.length ? (current + 1) % media.length : 0
    );
  }, [media.length]);

  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      media.length
        ? (current - 1 + media.length) % media.length
        : 0
    );
  }, [media.length]);

  // =========================================================
  // KEYBOARD NAVIGATION AND ESCAPE
  // =========================================================

  useEffect(() => {
    if (!isPreviewOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsPreviewOpen(false);
      }

      if (event.key === "ArrowRight") {
        showNext();
      }

      if (event.key === "ArrowLeft") {
        showPrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling while preview is open
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isPreviewOpen, showNext, showPrevious]);

  // =========================================================
  // TOUCH SWIPE SUPPORT
  // =========================================================

  const handleTouchStart = (event) => {
    setTouchStartX(event.touches[0].clientX);
  };

  const handleTouchEnd = (event) => {
    if (touchStartX === null) return;

    const touchEndX = event.changedTouches[0].clientX;
    const difference = touchStartX - touchEndX;

    // Ignore small movements
    if (Math.abs(difference) > 45) {
      if (difference > 0) {
        showNext();
      } else {
        showPrevious();
      }
    }

    setTouchStartX(null);
  };

  // =========================================================
  // NO MEDIA
  // =========================================================

  if (!media.length) {
    return (
      <div className="w-full">
        <div className="flex h-[350px] flex-col items-center justify-center rounded-2xl bg-gray-100 sm:h-[500px] lg:h-[650px]">
          <div className="mb-4 text-6xl">🛍️</div>
          <p className="text-gray-500">
            Product image not available
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // REUSABLE MEDIA RENDERER
  // =========================================================

  const renderMedia = (item, preview = false) => {
    if (item?.type === "video") {
      return (
        <video
          key={item.url}
          src={item.url}
          autoPlay={preview}
          muted={!preview}
          loop
          controls
          playsInline
          preload="metadata"
          className={
            preview
              ? "h-full w-full object-contain"
              : "h-full w-full object-contain"
          }
        />
      );
    }

    return (
      <Image
        src={item.url}
        alt={product?.name || "Product image"}
        fill
        priority={!preview && activeIndex === 0}
        sizes={
          preview
            ? "100vw"
            : "(max-width: 768px) 100vw, 50vw"
        }
        draggable={false}
        className={
          preview
            ? "object-contain"
            : "object-contain"
        }
      />
    );
  };

  // =========================================================
  // GALLERY
  // =========================================================

  return (
    <>
      <div className="w-full space-y-4 lg:sticky lg:top-28">

        {/* MAIN IMAGE / VIDEO */}

        <div
          className="group relative h-[350px] w-full overflow-hidden rounded-xl bg-[#FAF7F2] sm:h-[500px] lg:h-[650px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {selectedMedia?.type === "video" ? (
            renderMedia(selectedMedia)
          ) : (
            <button
              type="button"
              aria-label="Open product image in full screen"
              onClick={() => setIsPreviewOpen(true)}
              className="absolute inset-0 block h-full w-full cursor-zoom-in"
            >
              {renderMedia(selectedMedia)}
            </button>
          )}

          {/* PREVIOUS ARROW */}

          {media.length > 1 && (
            <>
              <button
                type="button"
                onClick={showPrevious}
                aria-label="Previous product image"
                className="absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-black shadow-md transition hover:bg-white sm:left-4 sm:h-12 sm:w-12 sm:opacity-0 sm:group-hover:opacity-100"
              >
                &#8249;
              </button>

              {/* NEXT ARROW */}

              <button
                type="button"
                onClick={showNext}
                aria-label="Next product image"
                className="absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-2xl text-black shadow-md transition hover:bg-white sm:right-4 sm:h-12 sm:w-12 sm:opacity-0 sm:group-hover:opacity-100"
              >
                &#8250;
              </button>

              {/* IMAGE COUNTER */}

              <div className="absolute bottom-3 right-3 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-black shadow-sm">
                {activeIndex + 1} / {media.length}
              </div>
            </>
          )}

          {/* ZOOM HINT */}

          {selectedMedia?.type !== "video" && (
            <div className="pointer-events-none absolute bottom-3 left-3 z-10 rounded-full bg-white/90 px-3 py-1.5 text-xs text-gray-700 shadow-sm">
              Click to enlarge
            </div>
          )}
        </div>

        {/* THUMBNAILS */}

        {media.length > 1 && (
          <div
            className="flex gap-3 overflow-x-auto pb-2"
            role="group"
            aria-label="Product gallery thumbnails"
          >
            {media.map((item, index) => {
              const isSelected = activeIndex === index;

              return (
                <button
                  key={`${item.url}-${index}`}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`View product media ${index + 1}`}
                  aria-pressed={isSelected}
                  className={`relative h-20 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-[#FAF7F2] transition sm:h-24 sm:w-20 ${
                    isSelected
                      ? "border-[#5C4033]"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {item.type === "video" ? (
                    <>
                      <video
                        src={item.url}
                        muted
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover"
                      />

                      <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm text-black shadow">
                          ▶
                        </span>
                      </span>
                    </>
                  ) : (
                    <Image
                      src={item.url}
                      alt={`${product?.name || "Product"} thumbnail ${index + 1}`}
                      fill
                      sizes="80px"
                      draggable={false}
                      className="object-cover"
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* =====================================================
          FULL-SCREEN PREVIEW
      ===================================================== */}

      {isPreviewOpen && selectedMedia && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 p-3 sm:p-8"
          onClick={() => setIsPreviewOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Full-screen product image preview"
        >
          {/* CLOSE BUTTON */}

          <button
            type="button"
            onClick={() => setIsPreviewOpen(false)}
            aria-label="Close image preview"
            className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-3xl text-white transition hover:bg-white/20"
          >
            &times;
          </button>

          {/* IMAGE COUNTER */}

          <div className="absolute left-1/2 top-5 z-30 -translate-x-1/2 rounded-full bg-white/10 px-4 py-2 text-sm text-white">
            {activeIndex + 1} / {media.length}
          </div>

          {/* PREVIOUS */}

          {media.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white hover:bg-white/20 sm:left-5 sm:h-12 sm:w-12"
            >
              &#8249;
            </button>
          )}

          {/* FULL-SCREEN MEDIA */}

          <div
            className="relative h-[80vh] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {renderMedia(selectedMedia, true)}
          </div>

          {/* NEXT */}

          {media.length > 1 && (
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white hover:bg-white/20 sm:right-5 sm:h-12 sm:w-12"
            >
              &#8250;
            </button>
          )}
        </div>
      )}
    </>
  );
}
