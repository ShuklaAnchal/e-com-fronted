"use client";

import { useRouter } from "next/navigation";
import { AiOutlineEye } from "react-icons/ai";

/* ============================================================
   HELPER: GENERATE A STABLE SIMULATED VIEW COUNT
============================================================ */

function getViewCount(productId) {
  const MIN_VIEWS = 600_000;
  const MAX_VIEWS = 2_000_000;

  let hash = 0;
  const id = String(productId || "");

  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }

  const views =
    MIN_VIEWS + (hash % (MAX_VIEWS - MIN_VIEWS + 1));

  if (views >= 1_000_000) {
    return `${(views / 1_000_000)
      .toFixed(1)
      .replace(/\.0$/, "")}M`;
  }

  return `${Math.round(views / 1_000)}K`;
}

/* ============================================================
   RELATED PRODUCTS
============================================================ */

export default function RelatedProducts({
  products = [],
  currentProductId,
}) {
  const router = useRouter();

  const relatedProducts = products.filter(
    (item) =>
      item?._id &&
      String(item._id) !== String(currentProductId)
  );

  if (!relatedProducts.length) return null;

  const handleProductClick = (product) => {
    router.push(`/products/${product._id}`);
  };

  return (
    <section className="mt-10 sm:mt-14 md:mt-20 lg:mt-24">
      {/* Section Heading */}
      <div className="mb-5 sm:mb-7 md:mb-9">
        <h2 className="font-serif text-xl font-medium tracking-wide text-[#5C4033] sm:text-2xl md:text-3xl">
          You May Also Like
        </h2>

        <p className="mt-1.5 text-xs text-gray-500 sm:text-sm">
          Discover more from our collection
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-8 md:grid-cols-4 md:gap-x-6 lg:grid-cols-4 xl:grid-cols-4">
        {relatedProducts.map((item) => {
          const pricing = item?.pricing || {};

          const mrp = Number(pricing.mrp || 0);
          const sellingPrice = Number(
            pricing.sellingPrice || 0
          );
          const discountPercent = Number(
            pricing.discountPercent || 0
          );

          const image =
            item?.image ||
            item?.media?.url ||
            "/placeholder.png";

          const isInStock =
            item?.inventory?.inStock &&
            Number(item?.inventory?.stockQuantity || 0) > 0;

          return (
            <article
              key={item._id}
              onClick={() => handleProductClick(item)}
              className="group cursor-pointer"
            >
              {/* Product Image */}
              <div className="relative mb-2.5 aspect-square overflow-hidden rounded-lg bg-[#FAF7F2]">
                <img
                  src={image}
                  alt={item?.name || "Related product"}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/placeholder.png";
                  }}
                />

                {/* View Count: Top Left */}
            

                {/* Discount Badge */}
                {discountPercent > 0 && (
                  <span className="absolute right-2 top-2 z-10 rounded-sm bg-[#5C4033] px-2 py-1 text-[9px] font-semibold uppercase tracking-wide text-white sm:right-3 sm:top-3 sm:text-[10px]">
                    {discountPercent}% OFF
                  </span>
                )}

                {/* Out of Stock Overlay */}
                {!isInStock && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/35">
                    <span className="rounded-sm bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#5C4033] sm:text-xs">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="space-y-1">
                {item?.brand && (
                  <p className="text-[9px] font-medium uppercase tracking-[0.15em] text-gray-500 sm:text-[10px]">
                    {item.brand}
                  </p>
                )}

                <h3 className="line-clamp-2 text-xs font-medium leading-relaxed text-[#5C4033] transition-colors group-hover:text-[#9B7653] sm:text-sm md:text-base">
                  {item?.name}
                </h3>

                {/* Pricing */}
                <div className="flex flex-wrap items-center gap-2 pt-0.5">
                  <span className="text-sm font-semibold text-[#5C4033] sm:text-base">
                    ₹{sellingPrice.toLocaleString("en-IN")}
                  </span>

                  {mrp > sellingPrice && (
                    <span className="text-[10px] text-gray-400 line-through sm:text-xs">
                      ₹{mrp.toLocaleString("en-IN")}
                    </span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}