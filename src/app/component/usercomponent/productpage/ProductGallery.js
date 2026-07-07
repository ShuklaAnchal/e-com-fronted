"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ product }) {
  if (!product || !product.media || product.media.length === 0) {
    return (
      <div className="h-[500px] flex items-center justify-center bg-gray-100">
        Product image not available
      </div>
    );
  }

  const [activeMedia, setActiveMedia] = useState(product.media[0]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-5 lg:sticky lg:top-32">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24">
        {product.media.map((item, index) => (
          <button
            key={index}
            onClick={() => setActiveMedia(item)}
            className={`relative w-20 h-24 overflow-hidden border ${
              activeMedia.url === item.url
                ? "border-luxury-gold"
                : "border-gray-200"
            }`}
          >
            {item.type === "video" ? (
              <video
                src={item.url}
                className="w-full h-full object-cover"
                muted
              />
            ) : (
              <Image
                src={item.url}
                alt={product.name}
                fill
                className="object-cover"
              />
            )}
          </button>
        ))}
      </div>

      {/* Main Media */}

      <div className="relative w-full h-[500px] md:h-[650px] overflow-hidden">
        {activeMedia.type === "video" ? (
          <video
            src={activeMedia.url}
            autoPlay
            muted
            loop
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={activeMedia.url}
            alt={product.name}
            fill
            priority
            className="object-cover"
          />
        )}
      </div>
    </div>
  );
}
