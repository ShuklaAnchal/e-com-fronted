"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProducts } from "@/app/hooks/productHook";

const Products = () => {
  const router = useRouter();

  const { products = [], loading, refreshProducts } = useProducts();
  console.log({ products });

  // --------------------------------------------------
  // SAFE IMAGE URL HELPER
  // --------------------------------------------------
 const getImageUrl = (imageUrl) => {
  const placeholder = "/placeholder-product.png";

  if (!imageUrl || typeof imageUrl !== "string") {
    return placeholder;
  }

  const trimmedUrl = imageUrl.trim();

  if (
    !trimmedUrl ||
    trimmedUrl === "undefined" ||
    trimmedUrl === "null" ||
    trimmedUrl.includes("/undefined") ||
    trimmedUrl.includes("undefined/")
  ) {
    return placeholder;
  }

  // Full URL
  if (
    trimmedUrl.startsWith("http://") ||
    trimmedUrl.startsWith("https://")
  ) {
    return trimmedUrl;
  }

  // Local Next.js public image
  if (trimmedUrl.startsWith("/")) {
    if (trimmedUrl.startsWith("/placeholder")) {
      return trimmedUrl;
    }

    if (process.env.NEXT_PUBLIC_API_URL) {
      return `${process.env.NEXT_PUBLIC_API_URL.replace(
        /\/$/,
        ""
      )}${trimmedUrl}`;
    }

    return trimmedUrl;
  }

  // Relative backend path
  if (process.env.NEXT_PUBLIC_API_URL) {
    return `${process.env.NEXT_PUBLIC_API_URL.replace(
      /\/$/,
      ""
    )}/${trimmedUrl.replace(/^\/+/, "")}`;
  }

  return placeholder;
};

  // --------------------------------------------------
  // CONVERT API PRODUCT STRUCTURE INTO UI STRUCTURE
  // --------------------------------------------------
const mappedProducts = products
  .filter((product) => product.status === "published")
  .map((product) => {
    // -----------------------------------------
    // PRODUCT LEVEL IMAGES ONLY
    // -----------------------------------------
    const imageMedia =
      Array.isArray(product.media)
        ? product.media.filter(
            (media) =>
              media &&
              media.mediaType === "image" &&
              typeof media.url === "string" &&
              media.url.trim() !== ""
          )
        : [];

    // -----------------------------------------
    // PRIMARY PRODUCT IMAGE
    // -----------------------------------------
    const primaryMedia =
      imageMedia.find((media) => media.isPrimary === true) ||
      imageMedia[0];

    // -----------------------------------------
    // HOVER PRODUCT IMAGE
    // -----------------------------------------
    const hoverMedia =
      imageMedia.find(
        (media) =>
          media.url !== primaryMedia?.url
      ) || primaryMedia;

    // -----------------------------------------
    // DEFAULT VARIANT
    // -----------------------------------------
    const defaultVariant =
      product.variants?.find(
        (variant) => variant.isDefault === true
      ) || product.variants?.[0];

    // -----------------------------------------
    // PRICING
    // -----------------------------------------
    const mrp = Number(
      defaultVariant?.pricing?.mrp || 0
    );

    const sellingPrice = Number(
      defaultVariant?.pricing?.sellingPrice || 0
    );

    // -----------------------------------------
    // INVENTORY
    // -----------------------------------------
    const inStock =
      defaultVariant?.inventory?.inStock === true;

    const stockQuantity = Number(
      defaultVariant?.inventory?.stockQuantity || 0
    );

    // -----------------------------------------
    // FINAL UI PRODUCT
    // -----------------------------------------
    return {
      ...product,

      // Product-level media
      image: getImageUrl(primaryMedia?.url),
      hoverImage: getImageUrl(hoverMedia?.url),

      // Product information
      description:
        product.shortDescription ||
        product.fullDescription ||
        "Premium quality product",

      // Variant pricing
      mrp,
      price: sellingPrice,

      // Variant inventory
      inStock,
      stockQuantity,

      // Optional useful values
      variantId: defaultVariant?._id,
      sku: defaultVariant?.sku,
    };
  });

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------
  if (loading) {
    return (
      <section className="w-full py-16">
        <div className="flex justify-center items-center">
          <p className="text-sm text-gray-500">Loading products...</p>
        </div>
      </section>
    );
  }

  // --------------------------------------------------
  // RETURN
  // --------------------------------------------------
  return (
    <section className="w-full py-0 sm:py-10 md:py-16">
      <div className="w-full max-w-[1600px] mx-auto px-3 sm:px-5 md:px-8 lg:px-10">
        {/* --------------------------------------------------
            SECTION HEADING
        -------------------------------------------------- */}
        <div className="mb-8 sm:mb-8 md:mb-12">
          <h2
            className="
              text-2xl
              sm:text-4xl
              md:text-5xl
              font-extralight
              text-center
              mb-2
              sm:mb-4
              tracking-[0.08em]
              sm:tracking-[0.1em]
              text-luxury-dark
              uppercase
            "
          >
            New Launches
          </h2>

          <p
            className="
              text-center
              text-luxury-dark
              text-[12px]
              sm:text-[15px]
              tracking-wide
              sm:tracking-wider
              font-medium
            "
          >
            Meticulously formulated. Small-batch crafted.
          </p>
        </div>

        {/* --------------------------------------------------
            NO PRODUCTS
        -------------------------------------------------- */}
        {mappedProducts.length === 0 ? (
          <div className="py-16 sm:py-20 text-center">
            <p className="text-sm text-gray-500">No products available.</p>
          </div>
        ) : (
          /* --------------------------------------------------
             PRODUCTS GRID
          -------------------------------------------------- */
          <div
            className="grid
              grid-cols-2
              gap-3
              sm:gap-5
              md:grid-cols-4
              md:gap-6
              lg:gap-8
            "
          >
            {mappedProducts.map((product) => (
              /* --------------------------------------------------
                 PRODUCT CARD
              -------------------------------------------------- */
              <div
                key={product._id}
                onClick={() => router.push(`/products/${product._id}`)}
                className=" group flex flex-col text-center cursor-pointer bg-white/40 backdrop-blur-[2px] border border-[#C5A880]/15
rounded-[14px] sm:rounded-[18px]  md:rounded-[20px] shadow-[0_5px_20px_rgba(40,30,20,0.05)] transition-all duration-500
ease-out  hover:border-[#C5A880]/40 hover:shadow-[0_15px_40px_rgba(197,168,128,0.12)] hover:-translate-y-1"
              >
                <div
                  className=" font-sans
    relative
    aspect-square
    overflow-hidden
    rounded-t-[14px]
    sm:rounded-t-[18px]
    md:rounded-t-[20px]
  "
                >
                  {/* --------------------------------------------------
      PRODUCT BADGES
  -------------------------------------------------- */}
                  <div
                    className="
      absolute
      top-2
      left-2
      sm:top-3
      sm:left-3
      z-20
      flex
      flex-col
      items-start
      gap-1
    "
                  >
                    {/* NEW */}
                    <span
                      className="
        bg-[#121212]/90
        text-white
        px-2
        sm:px-3
        py-1
        sm:py-1.5
        text-[7px]
        sm:text-[9px]
        uppercase
        tracking-[0.15em]
        sm:tracking-[0.2em]
        font-medium
        rounded-[3px]
        shadow-sm
      "
                    >
                      NEW
                    </span>

                    {/* RAKHI SPECIAL */}
                    <span
                      className="
        bg-[#C5A880]
        text-[#121212]
        px-2
        sm:px-3
        py-1
        sm:py-1.5
        text-[7px]
        sm:text-[9px]
        uppercase
        tracking-[0.12em]
        sm:tracking-[0.18em]
        font-medium
        rounded-[3px]
        shadow-sm
      "
                    >
                      Rakhi Special
                    </span>
                  </div>

                  {/* MAIN IMAGE */}
                  <Image
                    src={product.image || "/placeholder-product.png"}
                    alt={product.name || "Product"}
                    fill
                    sizes="
      (max-width: 500px) 34vw,
      (max-width: 600px) 20vw,
      20vw
    "
                    className="
      object-contain rounded-[25px] border-none
      p-1
      sm:p-2
      transition-transform
      duration-700
      ease-out
      group-hover:scale-[1.04]
    "
                  />

                  {/* HOVER IMAGE */}
                  <Image
                    src={
                      product.hoverImage ||
                      product.image ||
                      "/placeholder-product.png"
                    }
                    alt={`${product.name || "Product"} Hover`}
                    fill
                    sizes="
      (max-width: 640px) 44vw,
      (max-width: 768px) 30vw,
      20vw
    "
                    className="
      object-contain rounded-[25px]
      p-1
      sm:p-2
      opacity-0
      transition-opacity
      duration-500
      group-hover:opacity-100
    "
                  />

                  {/* OUT OF STOCK */}
                  {!product.inStock && (
                    <div
                      className="
        absolute
        inset-0
        z-10
        bg-black/30
        flex
        items-center
        justify-center
      "
                    >
                      <span
                        className="
          bg-white/90
          px-2
          sm:px-4
          py-1.5
          sm:py-2
          text-[7px]
          sm:text-[10px]
          uppercase
          tracking-[0.12em]
          sm:tracking-[0.15em]
          text-black
        "
                      >
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                <div className="px-4 pb-3 mt-2">
                  {/* --------------------------------------------------
                    PRODUCT NAME
                -------------------------------------------------- */}
                  <h3
                    className="
                    text-[9px]
                    sm:text-xs
                    md:text-sm
                    font-medium
                    tracking-[0.1em]
                    sm:tracking-[0.16em]
                    text-luxury-dark
                    mb-1
                    sm:mb-2
                    uppercase
                    truncate
                    transition-colors
                    duration-300
                    group-hover:text-luxury-gold
                  "
                  >
                    {product.name}
                  </h3>

                  {/* --------------------------------------------------
                    DESCRIPTION
                -------------------------------------------------- */}
                  <p
                    className="text-[10px] sm:text-[12px] md:text-[15px]
                    text-[#777]
                    font-normal
                    leading-[1.4]
                    line-clamp-2
                    min-h-[10px]
                    sm:min-h-[10px]
                    font-sans
                    tracking-wide
                    px-0.5
                    sm:px-1
                  "
                  >
                    {product.description}
                  </p>

                  {/* --------------------------------------------------
                    PRICE
                -------------------------------------------------- */}
                  {product.mrp > 0 && product.price > 0 ? (
                    <div
                      className="
                      flex
                      items-baseline
                      justify-center

                      gap-1
                      sm:gap-2

                      mt-2
                      sm:mt-3

                      pt-1.5
                      sm:pt-2

                      border-t
                      border-[#C5A880]/15
                    "
                    >
                      {/* MRP */}
                      {product.mrp > product.price && (
                        <span
                          className="
                          text-[10px]
                          sm:text-[10px]

                          text-[#999]

                          line-through
                          font-light
                        "
                        >
                          Rs. {product.mrp}
                        </span>
                      )}

                      {/* SELLING PRICE */}
                      <span
                        className="
                        text-[12px]
                        sm:text-xs

                        text-luxury-dark

                        font-medium
                        tracking-wide
                      "
                      >
                        Rs. {product.price}
                      </span>
                    </div>
                  ) : (
                    <div className="mt-2 sm:mt-3">
                      <span
                        className="
                        text-[8px]
                        sm:text-xs
                        text-gray-500
                      "
                      >
                        Price unavailable
                      </span>
                    </div>
                  )}

                  {/* --------------------------------------------------
                    BUY BUTTON
                -------------------------------------------------- */}
                  <button
                    disabled={!product.inStock}
                    onClick={(e) => {
                      e.stopPropagation();

                      if (product.inStock) {
                        router.push(`/products/${product._id}`);
                      }
                    }}
                    className={` mt-2.5 sm:mt-4 w-full border py-2 sm:py-2.5 md:py-3
text-[7px] sm:text-[9px]   md:text-[10px] uppercase bg-[#C5A880]
tracking-[0.1em]  sm:tracking-[0.18em] transition-all duration-500
font-normal rounded-[10px]
 ${
   product.inStock
     ? `
                          border-[#C5A880]/50
                          text-[#B08F5A]
                          bg-transparent

                          hover:bg-[#C5A880]
                          hover:text-[#121212]

                          cursor-pointer
                        `
     : `
                          border-gray-300
                          text-gray-400

                          cursor-not-allowed
                        `
 }
                  `}
                  >
                    {product.inStock ? "Buy Now" : "Out of Stock"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* --------------------------------------------------
            VIEW ALL
        -------------------------------------------------- */}
        <div
          className="
            flex
            justify-center

            mt-8
            sm:mt-10
            md:mt-12
          "
        >
          <button
            onClick={() => router.push("/products")}
            className="
              border
              border-luxury-dark
              text-luxury-dark

              px-7
              sm:px-10

              py-3
              sm:py-4

              tracking-[0.15em]
              sm:tracking-[0.2em]

              uppercase

              text-[9px]
              sm:text-xs

              hover:bg-luxury-dark
              hover:text-luxury-cream

              transition-all
              duration-500

              bg-transparent

              font-light

              cursor-pointer

              shadow-sm
            "
          >
            View All Creations
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;

// ### Also check your `.env`

// You should have something like:

// ```env
// NEXT_PUBLIC_API_URL=http://localhost:5000
// ```

// or, for production:

// ```env
// NEXT_PUBLIC_API_URL=https://your-api-domain.com
// ```

// **Do not put a trailing `/`** at the end.

// And create:

// ```text
// public/placeholder-product.png
// ```

// So your structure should be:

// ```text
// project/
// ├── app/
// ├── public/
// │   └── placeholder-product.png
// ├── .env.local
// ├── package.json
// └── ...
// ```

// Now even if your backend returns:

// ```js
// media: [
//   {
//     mediaType: "image",
//     url: undefined
//   }
// ]
// ```

// or:

// ```js
// url: "/uploads/undefined"
// ```

// the frontend will safely show:

// ```text
// /public/placeholder-product.png
// ```

// instead of sending `undefined/uploads/undefined` to `next/image`.
