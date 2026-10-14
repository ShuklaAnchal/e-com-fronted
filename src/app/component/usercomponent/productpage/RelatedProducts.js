
"use client";

import { useRouter } from "next/navigation";

export default function RelatedProducts({
  products = [],
  currentProductId,
}) {
  const router = useRouter();

  // Remove current product and invalid products
  const relatedProducts = products.filter(
    (item) =>
      item?._id &&
      String(item._id) !== String(currentProductId)
  );

  if (!relatedProducts.length) {
    return null;
  }

  const handleProductClick = (product) => {
    router.push(`/user/product/${product._id}`);
  };

  return (
    <section className="mt-10 sm:mt-14 md:mt-20 lg:mt-24">
      {/* SECTION HEADER */}
      <div className="mb-6 px-2 text-center sm:mb-8 md:mb-10">
        <p className="mb-2 text-[9px] uppercase tracking-[0.2em] text-gray-500 sm:mb-3 sm:text-[10px] sm:tracking-[0.25em] md:text-xs">
          Complete Your Collection
        </p>

        <h2 className="font-serif text-xl leading-tight text-gray-900 sm:text-2xl md:text-3xl lg:text-4xl">
          You May Also Like
        </h2>

        <p className="mx-auto mt-2 max-w-md text-[11px] leading-relaxed text-gray-500 sm:mt-3 sm:text-xs md:text-sm">
          Discover more products you might love.
        </p>
      </div>

      {/* RESPONSIVE PRODUCTS GRID */}
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 md:grid-cols-3 md:gap-x-5 md:gap-y-10 lg:grid-cols-4 lg:gap-x-6">
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
            Number(
              item?.inventory?.stockQuantity || 0
            ) > 0;

          return (
            <article
              key={item._id}
              className="group min-w-0 cursor-pointer"
              onClick={() => handleProductClick(item)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" ||
                  event.key === " "
                ) {
                  event.preventDefault();
                  handleProductClick(item);
                }
              }}
              role="link"
              tabIndex={0}
              aria-label={`View ${item?.name || "product"}`}
            >
              {/* PRODUCT IMAGE */}
              <div className="relative mb-2.5 aspect-square overflow-hidden rounded-lg bg-[#FAF7F2] sm:mb-3 sm:rounded-xl md:mb-4 md:rounded-2xl">
                <img
                  src={image}
                  alt={item?.name || "Product"}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* DISCOUNT BADGE */}
                {discountPercent > 0 && (
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-white px-2 py-1 text-[8px] font-semibold text-[#5C4033] shadow-sm sm:left-2 sm:top-2 sm:px-2.5 sm:text-[9px] md:left-3 md:top-3 md:px-3 md:py-1.5 md:text-xs">
                    {discountPercent}% OFF
                  </span>
                )}

                {/* OUT OF STOCK */}
                {!isInStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 p-2">
                    <span className="rounded-full bg-white px-2 py-1.5 text-[9px] font-medium text-gray-900 sm:px-3 sm:text-[10px] md:px-4 md:py-2 md:text-xs">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* PRODUCT DETAILS */}
              <div className="min-w-0">
                {/* BRAND */}
                {item?.brand && (
                  <p className="mb-1 truncate text-[8px] uppercase tracking-[0.12em] text-gray-400 sm:mb-1.5 sm:text-[9px] sm:tracking-[0.16em] md:text-[10px] md:tracking-[0.2em]">
                    {item.brand}
                  </p>
                )}

                {/* PRODUCT NAME */}
                <h3 className="line-clamp-2 min-h-[2rem] text-[11px] font-medium leading-4 text-gray-900 transition-colors group-hover:text-[#5C4033] sm:min-h-[2.5rem] sm:text-xs sm:leading-5 md:text-sm lg:text-base">
                  {item?.name}
                </h3>

                {/* PRICE */}
                <div className="mt-1.5 flex flex-wrap items-baseline gap-x-1.5 gap-y-1 sm:mt-2 sm:gap-x-2">
                  <span className="text-xs font-semibold text-gray-900 sm:text-sm md:text-base">
                    ₹{sellingPrice}
                  </span>

                  {mrp > sellingPrice && (
                    <span className="text-[10px] text-gray-400 line-through sm:text-xs md:text-sm">
                      ₹{mrp}
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
