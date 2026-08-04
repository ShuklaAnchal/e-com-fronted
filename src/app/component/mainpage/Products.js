"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProducts } from "@/app/hooks/productHook";

const Products = () => {
  const router = useRouter();

  const { products = [], loading, refreshProducts } = useProducts();

  // --------------------------------------------------
  // Convert API product structure into UI structure
  // --------------------------------------------------
  const mappedProducts = products
    .filter((product) => product.status === "published")
    .map((product) => {
      // Get only image media
      const imageMedia =
        product.media?.filter((media) => media.mediaType === "image") || [];

      // Primary image
      const primaryImage =
        imageMedia.find((media) => media.isPrimary)?.url ||
        imageMedia[0]?.url ||
        "/placeholder-product.png";

      // Hover image
      const hoverImage =
        imageMedia.find((media) => !media.isPrimary)?.url ||
        imageMedia[1]?.url ||
        primaryImage;

      // Default variant
      const defaultVariant =
        product.variants?.find((variant) => variant.isDefault) ||
        product.variants?.[0];

      return {
        ...product,

        image: primaryImage.startsWith("http")
          ? primaryImage
          : `${process.env.NEXT_PUBLIC_API_URL}${primaryImage}`,

        hoverImage: hoverImage.startsWith("http")
          ? hoverImage
          : `${process.env.NEXT_PUBLIC_API_URL}${hoverImage}`,

        description:
          product.shortDescription ||
          product.fullDescription ||
          "Premium quality product",

        mrp: defaultVariant?.pricing?.mrp || 0,

        price: defaultVariant?.pricing?.sellingPrice || 0,

        inStock: defaultVariant?.inventory?.inStock ?? false,

        stockQuantity: defaultVariant?.inventory?.stockQuantity || 0,
      };
    });

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------
  if (loading) {
    return (
      <section className="webprimarycolor w-full px-3 py-20">
        <div className="container mx-auto w-[94%]">
          <p className="text-center text-sm text-luxury-dark">
            Loading products...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="webprimarycolor w-full px-2 sm:px-4 pb-8 md:pb-12">
      <div className="container mx-auto w-[94%] sm:w-[92%]">
        {/* --------------------------------------------------
            SECTION HEADING
        -------------------------------------------------- */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <p
            className="
              text-[10px]
              sm:text-xs
              tracking-[0.3em]
              sm:tracking-[0.4em]
              text-luxury-gold
              font-light
              mb-2
              sm:mb-3
              uppercase
            "
          >
            Latest Releases
          </p>

          <h2
            className="
              text-2xl
              sm:text-4xl
              md:text-5xl
              font-serif
              font-extralight
              text-center
              mb-3
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
              font-serif
              italic
              text-luxury-gold-dark/70
              text-xs
              sm:text-base
              tracking-wide
              sm:tracking-wider
              font-light
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
            className="
              grid
              grid-cols-2
              gap-3
              sm:gap-5
              md:grid-cols-5
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
                className="
                  group
                  flex
                  flex-col
                  text-center
                  cursor-pointer

                  p-2
                  sm:p-3
                  md:p-4

                  bg-white/40
                  backdrop-blur-[2px]

                  border
                  border-[#C5A880]/15

                  rounded-[14px]
                  sm:rounded-[18px]
                  md:rounded-[20px]

                  shadow-[0_5px_20px_rgba(40,30,20,0.05)]

                  transition-all
                  duration-500
                  ease-out

                  hover:border-[#C5A880]/40
                  hover:shadow-[0_15px_40px_rgba(197,168,128,0.12)]
                  hover:-translate-y-1
                "
              >
                {/* --------------------------------------------------
                    PRODUCT IMAGE
                -------------------------------------------------- */}
                <div
                  className="
                    relative
                    w-full

                    aspect-[1/1.05]
                    sm:aspect-[4/4.5]
                    md:aspect-[4/5]

                    overflow-hidden

                    rounded-[10px]
                    sm:rounded-xl

                    mb-2
                    sm:mb-3

                    bg-[#F7F3ED]
                  "
                >
                  {/* Main Image */}
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="
                      (max-width: 640px) 44vw,
                      (max-width: 768px) 30vw,
                      20vw
                    "
                    className="
                      object-contain
                      p-1
                      sm:p-2

                      transition-transform
                      duration-700
                      ease-out

                      group-hover:scale-[1.04]
                    "
                  />

                  {/* Hover Image */}
                  <Image
                    src={product.hoverImage}
                    alt={`${product.name} Hover`}
                    fill
                    sizes="
                      (max-width: 640px) 44vw,
                      (max-width: 768px) 30vw,
                      20vw
                    "
                    className="
                      object-contain
                      p-1
                      sm:p-2

                      opacity-0

                      transition-opacity
                      duration-500

                      group-hover:opacity-100
                    "
                  />

                  {/* --------------------------------------------------
                      OUT OF STOCK
                  -------------------------------------------------- */}
                  {!product.inStock && (
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

                {/* --------------------------------------------------
                    PRODUCT NAME
                -------------------------------------------------- */}
                <h3
                  className="
                    text-[9px]
                    sm:text-xs
                    md:text-sm

                    font-serif
                    font-light

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
                  className="
                    text-[8px]
                    sm:text-[10px]
                    md:text-[11px]

                    text-[#777]

                    font-light

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
                          text-[7px]
                          sm:text-[10px]

                          text-[#999]

                          line-through
                          font-light
                        "
                      >
                        Rs. {product.mrp}
                      </span>
                    )}

                    {/* Selling Price */}
                    <span
                      className="
                        text-[9px]
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
                  className={`
                    mt-2.5
                    sm:mt-4
                    w-full
                    border
                    py-2
                    sm:py-2.5
                    md:py-3
                    text-[7px]
                    sm:text-[9px]
                    md:text-[10px]
                    uppercase
                    tracking-[0.1em]
                    sm:tracking-[0.18em]
                    transition-all
                    duration-500

                    font-light

                    rounded-[2px]

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
