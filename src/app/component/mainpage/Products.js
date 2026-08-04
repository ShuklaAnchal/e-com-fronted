"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useProducts } from "@/app/hooks/productHook";

const Products = () => {
  const router = useRouter();

  const {
    products = [],
    loading,
    refreshProducts,
  } = useProducts();


  // Convert API product structure into UI structure
  const mappedProducts = products
    .filter((product) => product.status === "published")
    .map((product) => {
      // Get only image media
      const imageMedia =
        product.media?.filter(
          (media) => media.mediaType === "image"
        ) || [];

      // Primary image
      const primaryImage =
        imageMedia.find((media) => media.isPrimary)?.url ||
        imageMedia[0]?.url ||
        "/placeholder-product.png";

      // Second image for hover
      const hoverImage =
        imageMedia.find((media) => !media.isPrimary)?.url ||
        imageMedia[1]?.url ||
        primaryImage;

      // Find default variant
      const defaultVariant =
        product.variants?.find(
          (variant) => variant.isDefault
        ) || product.variants?.[0];

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

        price:
          defaultVariant?.pricing?.sellingPrice || 0,

        inStock:
          defaultVariant?.inventory?.inStock ?? false,

        stockQuantity:
          defaultVariant?.inventory?.stockQuantity || 0,
      };
    });

  // Loading
  if (loading) {
    return (
      <section className="webprimarycolor w-full px-4 py-20">
        <div className="container mx-auto w-[90%]">
          <p className="text-center text-sm text-luxury-dark">
            Loading products...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="webprimarycolor w-full px-4">
      <div className="container mx-auto w-[90%]">

        {/* Heading */}
        <p className="text-center text-xs tracking-[0.4em] text-luxury-gold font-light mb-3 uppercase">
          Latest Releases
        </p>

        <h2 className="text-3xl sm:text-5xl font-serif font-extralight text-center mb-4 tracking-[0.1em] text-luxury-dark uppercase">
          New Launches
        </h2>

        <p className="text-center font-serif italic text-luxury-gold-dark/70 mb-16 text-base tracking-wider font-light">
          Meticulously formulated. Small-batch crafted.
        </p>

        {/* No products */}
        {mappedProducts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-sm text-gray-500">
              No products available.
            </p>
          </div>
        ) : (
          /* Products */
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8">
            {mappedProducts.map((product) => (
              <div
                key={product._id}
                onClick={() =>
                  router.push(`/products/${product._id}`)
                }
                className="
                  text-center
                  cursor-pointer
                  group
                  flex
                  flex-col
                  p-4
                  webprimarycolor
                  transition-all
                  shadow-md
                  rounded-[20px]
                  duration-700
                  ease-[cubic-bezier(0.25,1,0.5,1)]
                  hover:border-[#C5A880]/40
                  hover:shadow-[0_20px_50px_rgba(197,168,128,0.06)]
                  hover:-translate-y-1.5
                "
              >

                {/* Product Image */}
                <div
                  className="
                    w-full
                    aspect-[4/5]
                    overflow-hidden
                    relative
                    mb-2
                    rounded-xl
                  "
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="
                      object-cover
                      transition-transform
                      duration-[1.2s]
                      ease-[cubic-bezier(0.25,1,0.5,1)]
                      group-hover:scale-105
                      rounded-xl
                    "
                  />

                  {/* Hover Image */}
                  <Image
                    src={product.hoverImage}
                    alt={`${product.name} Hover`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="
                      object-cover
                      opacity-0
                      transition-opacity
                      duration-700
                      ease-in-out
                      group-hover:opacity-100
                      rounded-xl
                    "
                  />

                  {/* Out Of Stock */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span className="bg-white/90 px-4 py-2 text-xs uppercase tracking-widest text-black">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Name */}
                <h3
                  className="
                    text-xs
                    md:text-sm
                    font-serif
                    tracking-[0.2em]
                    text-luxury-dark
                    mb-2
                    uppercase
                    font-light
                    truncate
                    transition-colors
                    duration-300
                    group-hover:text-luxury-gold
                  "
                >
                  {product.name}
                </h3>

                {/* Product Description */}
                <p
                  className="
                    text-[11px]
                    text-[#6C6C6C]
                    font-medium
                    leading-relaxed
                    line-clamp-2
                    min-h-[1.5rem]
                    font-sans
                    tracking-wide
                  "
                >
                  {product.description}
                </p>

                {/* Price */}
                {product.mrp > 0 && product.price > 0 ? (
                  <div
                    className="
                      mt-auto
                      pt-1
                      border-t
                      border-[#C5A880]/10
                      flex
                      items-baseline
                      justify-center
                      gap-2
                    "
                  >
                    {/* MRP */}
                    {product.mrp > product.price && (
                      <span
                        className="
                          text-[#8E8E8E]
                          line-through
                          text-[10px]
                          font-light
                        "
                      >
                        Rs. {product.mrp}
                      </span>
                    )}

                    {/* Selling Price */}
                    <span
                      className="
                        text-luxury-dark
                        font-medium
                        tracking-wide
                        text-xs
                        font-sans
                      "
                    >
                      Rs. {product.price}
                    </span>
                  </div>
                ) : (
                  <div className="mt-auto pt-4">
                    <span className="text-xs text-gray-500">
                      Price unavailable
                    </span>
                  </div>
                )}

                {/* Buy Button */}
                <button
                  disabled={!product.inStock}
                  onClick={(e) => {
                    e.stopPropagation();

                    if (product.inStock) {
                      router.push(
                        `/products/${product._id}`
                      );
                    }
                  }}
                  className={`
                    mt-5
                    w-full
                    border
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    py-3
                    transition-all
                    duration-500
                    ease-out
                    font-light
                    rounded-none

                    ${
                      product.inStock
                        ? `
                          border-[#C5A880]/50
                          text-[#C5A880]
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
                  {product.inStock
                    ? "Buy Now"
                    : "Out of Stock"}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* View All */}
        <div className="flex justify-center mt-14 md:mt-16">
          <button
            onClick={() => router.push("/products")}
            className="
              border
              border-luxury-dark
              text-luxury-dark
              px-10
              py-4
              tracking-[0.2em]
              uppercase
              text-xs
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