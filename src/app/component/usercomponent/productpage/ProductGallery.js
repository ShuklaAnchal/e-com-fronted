"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  product,
  variants = [],
}) {
  const media = useMemo(() => {
    const allImages = [];

    variants.forEach((variant) => {
      if (variant?.images?.length) {
        variant.images.forEach((image) => {
          if (typeof image === "string") {
            allImages.push({
              type: "image",
              url: image,
            });
          } else if (image?.url) {
            allImages.push({
              type: image.type || "image",
              url: image.url,
            });
          }
        });
      }
    });

    return allImages;
  }, [variants]);

  const [activeMedia, setActiveMedia] = useState(null);

  const selectedMedia = activeMedia || media[0];

  if (media.length === 0) {
    return (
      <div className="w-full">

        <div className="w-full h-[500px] md:h-[650px] rounded-2xl bg-gray-100 flex flex-col items-center justify-center">

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

  return (
    <div className="w-full space-y-5 lg:sticky lg:top-32">

      {/* Main Image */}
      <div className="relative w-full h-[500px] md:h-[650px] overflow-hidden rounded-2xl bg-gray-100">

        {selectedMedia.type === "video" ? (
          <video
            src={selectedMedia.url}
            autoPlay
            muted
            loop
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={selectedMedia.url}
            alt={product?.name || "Product"}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        )}

      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2">

        {media.map((item, index) => (
          <button
            key={`${item.url}-${index}`}
            type="button"
            onClick={() => setActiveMedia(item)}
            className={`relative flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 ${
              selectedMedia.url === item.url
                ? "border-black"
                : "border-gray-200"
            }`}
          >

            {item.type === "video" ? (
              <video
                src={item.url}
                muted
                className="w-full h-full object-cover"
              />
            ) : (
              <Image
                src={item.url}
                alt={`${product?.name}-${index}`}
                fill
                sizes="80px"
                className="object-cover"
              />
            )}

          </button>
        ))}

      </div>

    </div>
  );
}