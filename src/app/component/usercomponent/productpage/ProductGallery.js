"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { getMediaUrl } from "@/app/utils/mediaUrl";

export default function ProductGallery({
  product,
  variants = [],
}) {
  // =========================================================
  // BUILD MEDIA LIST
  // =========================================================

  const media = useMemo(() => {
    const allMedia = [];

    // =======================================================
    // PRODUCT LEVEL MEDIA
    // =======================================================

    if (product?.media?.length) {
      product.media.forEach((item) => {
        if (!item) return;

        // -----------------------------------------------
        // If media is just a string
        // -----------------------------------------------

        if (typeof item === "string") {
          const url = getMediaUrl(item);

          if (url) {
            allMedia.push({
              type: "image",
              url,
            });
          }

          return;
        }

        // -----------------------------------------------
        // Media object
        // -----------------------------------------------

        if (item?.url) {
          const url = getMediaUrl(item.url);

          if (url) {
            allMedia.push({
              ...item,
              type:
                item.mediaType ||
                item.type ||
                "image",
              url,
            });
          }
        }
      });
    }

    // =======================================================
    // VARIANT MEDIA
    // =======================================================

    variants.forEach((variant) => {
      if (!variant?.images?.length) return;

      variant.images.forEach((item) => {
        if (!item) return;

        // -----------------------------------------------
        // Image is string
        // -----------------------------------------------

        if (typeof item === "string") {
          const url = getMediaUrl(item);

          if (url) {
            allMedia.push({
              type: "image",
              url,
            });
          }

          return;
        }

        // -----------------------------------------------
        // Image object
        // -----------------------------------------------

        if (item?.url) {
          const url = getMediaUrl(item.url);

          if (url) {
            allMedia.push({
              ...item,
              type:
                item.mediaType ||
                item.type ||
                "image",
              url,
            });
          }
        }
      });
    });

    // =======================================================
    // REMOVE DUPLICATES
    // =======================================================

    const uniqueMedia = allMedia.filter(
      (item, index, self) =>
        index ===
        self.findIndex(
          (mediaItem) =>
            mediaItem.url === item.url,
        ),
    );

    return uniqueMedia;
  }, [product?.media, variants]);

  // =========================================================
  // ACTIVE MEDIA
  // =========================================================

  const [activeMedia, setActiveMedia] = useState(null);

  const selectedMedia =
    activeMedia || media[0];

  // =========================================================
  // NO MEDIA
  // =========================================================

  if (media.length === 0) {
    return (
      <div className="w-full">
        <div
          className="
            w-full
            h-[500px]
            md:h-[650px]
            rounded-2xl
            bg-gray-100
            flex
            flex-col
            items-center
            justify-center
          "
        >
          <div className="text-6xl mb-5">
            🛍️
          </div>

          <p className="text-gray-500">
            Product image not available
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // GALLERY
  // =========================================================

  return (
    <div className="w-full space-y-5 lg:sticky lg:top-32">

      {/* =====================================================
          MAIN MEDIA
      ===================================================== */}

      <div
        className="
          relative
          w-full
          h-[500px]
          md:h-[650px]
          overflow-hidden
          rounded-2xl
          bg-gray-100
        "
      >
        {selectedMedia?.type === "video" ? (
          <video
            src={selectedMedia.url}
            autoPlay
            muted
            loop
            controls
            playsInline
            preload="metadata"
            className="
              w-full
              h-full
              object-cover
            "
          />
        ) : (
          <Image
            src={selectedMedia.url}
            alt={
              product?.name || "Product"
            }
            fill
            priority
            sizes="
              (max-width: 768px) 100vw,
              50vw
            "
            className="object-cover"
          />
        )}
      </div>

      {/* =====================================================
          THUMBNAILS
      ===================================================== */}

      <div
        className="
          flex
          gap-4
          overflow-x-auto
          pb-2
        "
      >
        {media.map((item, index) => {
          const isSelected =
            selectedMedia?.url === item.url;

          return (
            <button
              key={`${item.url}-${index}`}
              type="button"
              onClick={() =>
                setActiveMedia(item)
              }
              className={`
                relative
                flex-shrink-0
                w-20
                h-24
                rounded-lg
                overflow-hidden
                border-2
                transition-all

                ${
                  isSelected
                    ? "border-black"
                    : "border-gray-200"
                }
              `}
            >
              {/* =========================================
                  VIDEO THUMBNAIL
              ========================================= */}

              {item.type === "video" ? (
                <>
                  <video
                    src={item.url}
                    muted
                    playsInline
                    preload="metadata"
                    className="
                      w-full
                      h-full
                      object-cover
                    "
                  />

                  {/* VIDEO ICON */}

                  <div
                    className="
                      absolute
                      inset-0
                      flex
                      items-center
                      justify-center
                      bg-black/20
                    "
                  >
                    <div
                      className="
                        w-8
                        h-8
                        rounded-full
                        bg-white/90
                        flex
                        items-center
                        justify-center
                        shadow
                      "
                    >
                      <span className="text-black text-sm ml-0.5">
                        ▶
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                /* =========================================
                   IMAGE THUMBNAIL
                ========================================= */

                <Image
                  src={item.url}
                  alt={`${product?.name || "Product"}-${index}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}