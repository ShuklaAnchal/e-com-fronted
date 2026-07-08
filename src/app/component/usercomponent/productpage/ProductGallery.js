"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ product }) {
  const media = product?.media || [];

  if (media.length === 0) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-gray-100">
        Product image not available
      </div>
    );
  }

  const [activeMedia, setActiveMedia] = useState(media[0]);

  return (
    <div className="w-full space-y-5 lg:sticky lg:top-32">

      {/* Main Media */}
      <div className="relative w-full h-[500px] md:h-[650px] overflow-hidden rounded-xl bg-gray-100">
        {activeMedia.type === "video" ? (
          <video
            src={activeMedia.url}
            autoPlay
            muted
            loop
            controls
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={activeMedia.url}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        )}
      </div>


      {/* Thumbnail Gallery */}
      <div className="flex gap-4 overflow-x-auto pb-2">

        {media.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveMedia(item)}
            className={`relative flex-shrink-0 w-20 h-24 rounded-lg overflow-hidden border-2 transition ${
              activeMedia.url === item.url
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
                alt={`${product.name}-${index}`}
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