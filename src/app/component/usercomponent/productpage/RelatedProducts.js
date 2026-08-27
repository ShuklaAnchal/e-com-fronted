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
    <section className="mt-20 md:mt-28">
      {/* =====================================================
          SECTION HEADER
      ===================================================== */}

      <div className="text-center mb-10 md:mb-12">
        <p className="uppercase tracking-[0.3em] text-xs text-gray-500 mb-3">
          Complete Your Collection
        </p>

        <h2 className="font-serif text-3xl md:text-4xl text-gray-900">
          You May Also Like
        </h2>

        <p className="text-gray-500 mt-3 max-w-xl mx-auto">
          Discover more products you might love.
        </p>
      </div>

      {/* =====================================================
          PRODUCTS GRID
      ===================================================== */}

      <div
        className="
          grid
          grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-x-5
          gap-y-10
        "
      >
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
              className="group cursor-pointer"
              onClick={() =>
                handleProductClick(item)
              }
            >
              {/* =================================================
                  IMAGE
              ================================================= */}

              <div
                className="
                  relative
                  aspect-square
                  overflow-hidden
                  rounded-2xl
                  bg-gray-100
                  mb-4
                "
              >
                <img
                  src={image}
                  alt={item?.name || "Product"}
                  className="
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-500
                    group-hover:scale-105
                  "
                />

                {/* Discount */}

                {discountPercent > 0 && (
                  <span
                    className="
                      absolute
                      top-3
                      left-3
                      bg-white
                      text-gray-900
                      text-xs
                      font-medium
                      px-3
                      py-1.5
                      rounded-full
                      shadow-sm
                    "
                  >
                    {discountPercent}% OFF
                  </span>
                )}

                {/* Out of Stock */}

                {!isInStock && (
                  <div
                    className="
                      absolute
                      inset-0
                      bg-black/30
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <span
                      className="
                        bg-white
                        text-gray-900
                        px-4
                        py-2
                        rounded-full
                        text-xs
                        font-medium
                      "
                    >
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {/* =================================================
                  PRODUCT INFO
              ================================================= */}

              <div>
                {/* Brand */}

                {item?.brand && (
                  <p
                    className="
                      uppercase
                      tracking-[0.2em]
                      text-[10px]
                      text-gray-400
                      mb-2
                    "
                  >
                    {item.brand}
                  </p>
                )}

                {/* Name */}

                <h3
                  className="
                    text-sm
                    md:text-base
                    font-medium
                    text-gray-900
                    line-clamp-2
                    min-h-[2.5rem]
                    group-hover:text-gray-600
                    transition-colors
                  "
                >
                  {item?.name}
                </h3>

                {/* Price */}

                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <span className="font-semibold text-gray-900">
                    ₹{sellingPrice}
                  </span>

                  {mrp > sellingPrice && (
                    <span
                      className="
                        text-sm
                        text-gray-400
                        line-through
                      "
                    >
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