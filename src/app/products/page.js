"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import Header from "@/app/component/mainpage/Header";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";
import Footer from "@/app/component/resuable/Footer";

import { useProducts } from "@/app/hooks/productHook";

const ProductsPage = () => {
  const router = useRouter();

  const { products = [], loading } = useProducts();

  // =========================================================
  // SAFE IMAGE URL HELPER
  // =========================================================

  const getImageUrl = (imageUrl) => {
    const placeholder = "/placeholder-product.png";

    // No image
    if (!imageUrl || typeof imageUrl !== "string") {
      return placeholder;
    }

    const trimmedUrl = imageUrl.trim();

    // Invalid values
    if (
      !trimmedUrl ||
      trimmedUrl === "undefined" ||
      trimmedUrl === "null" ||
      trimmedUrl.includes("/undefined") ||
      trimmedUrl.includes("undefined/")
    ) {
      return placeholder;
    }

    // Already complete URL
    if (trimmedUrl.startsWith("http://") || trimmedUrl.startsWith("https://")) {
      return trimmedUrl;
    }

    // Local/public image
    if (trimmedUrl.startsWith("/")) {
      // Placeholder
      if (trimmedUrl.startsWith("/placeholder")) {
        return trimmedUrl;
      }

      // Backend image
      if (process.env.NEXT_PUBLIC_API_URL) {
        return `${process.env.NEXT_PUBLIC_API_URL.replace(
          /\/$/,
          "",
        )}${trimmedUrl}`;
      }

      return trimmedUrl;
    }

    // Relative backend image
    if (process.env.NEXT_PUBLIC_API_URL) {
      return `${process.env.NEXT_PUBLIC_API_URL.replace(
        /\/$/,
        "",
      )}/${trimmedUrl.replace(/^\//, "")}`;
    }

    return placeholder;
  };

  // =========================================================
  // MAP API PRODUCT DATA
  // =========================================================

  const mappedProducts = products
    .filter((product) => product.status === "published")
    .map((product) => {
      // -------------------------------------------------------
      // IMAGE MEDIA
      // -------------------------------------------------------

      const imageMedia =
        product.media?.filter(
          (media) =>
            media?.mediaType === "image" &&
            media?.url &&
            !String(media.url).includes("undefined"),
        ) || [];

      // -------------------------------------------------------
      // PRIMARY IMAGE
      // -------------------------------------------------------

      const primaryImage =
        imageMedia.find((media) => media?.isPrimary)?.url ||
        imageMedia[0]?.url ||
        null;

      // -------------------------------------------------------
      // HOVER IMAGE
      // -------------------------------------------------------

      const hoverImage =
        imageMedia.find((media) => !media?.isPrimary)?.url ||
        imageMedia[1]?.url ||
        primaryImage ||
        null;

      // -------------------------------------------------------
      // DEFAULT VARIANT
      // -------------------------------------------------------

      const defaultVariant =
        product.variants?.find((variant) => variant?.isDefault) ||
        product.variants?.[0] ||
        null;

      // -------------------------------------------------------
      // UI PRODUCT
      // -------------------------------------------------------

      return {
        ...product,

        image: getImageUrl(primaryImage),

        hoverImage: getImageUrl(hoverImage),

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

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <MarqueeBar />
        <Header />

        <main className="pt-40 pb-20">
          <div className="flex justify-center items-center">
            <p className="text-sm tracking-[0.2em] text-luxury-dark">
              LOADING COLLECTION...
            </p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <div className="min-h-screen bg-white">
      {/* =====================================================
          TOP MARQUEE
      ===================================================== */}

      <MarqueeBar />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <Header />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="h-auto bg-white">
        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <div className="pt-26 pb-5 sm:pb-16 px-4 sm:px-6">
          <div
            className="
              max-w-7xl
              mx-auto
              text-center
              animate-fade-up
            "
          >
            {/* Small Heading */}

            <p
              className="
                text-[10px]
                sm:text-xs
                tracking-[0.3em]
                sm:tracking-[0.4em]
                text-luxury-gold
                font-light
                mb-3
                uppercase
              "
            >
              Signature Collection
            </p>

            {/* Main Heading */}

            <h1
              className="
                text-3xl
                sm:text-4xl
                md:text-6xl
                font-serif
                font-extralight
                text-luxury-dark
                uppercase
                tracking-[0.08em]
                sm:tracking-[0.1em]
                mb-2
                sm:mb-6
              "
            >
              All Products
            </h1>

            {/* Description */}

            <p
              className="
                font-serif
                italic
                text-luxury-gold-dark/70
                text-sm
                sm:text-lg
                tracking-wide
                sm:tracking-wider
                font-light
                max-w-2xl
                mx-auto
                leading-relaxed
              "
            >
              Discover our complete range of meticulously formulated aromatics
              and artisanal creations.
            </p>
          </div>
        </div>

        {/* ===================================================
            PRODUCT GRID
        =================================================== */}

        <section className="py-2 mb-10 sm:mb-14">
          <div
            className="
              container
              mx-auto
              px-3
              sm:px-6
              max-w-8xl
            "
          >
            {/* =================================================
                NO PRODUCTS
            ================================================= */}

            {mappedProducts.length === 0 ? (
              <div className="py-20 text-center">
                <p
                  className="
                    text-sm
                    tracking-[0.15em]
                    text-gray-500
                    uppercase
                  "
                >
                  No products available
                </p>
              </div>
            ) : (
              /* =================================================
                 PRODUCT GRID
              ================================================= */

              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                  sm:gap-5
                  md:grid-cols-4
                  md:gap-6
                  lg:grid-cols-5
                  lg:gap-8
                "
              >
                {mappedProducts.map((product) => (
                  /* ===========================================
                     PRODUCT CARD
                  =========================================== */

                  <div
                    key={product._id}
                    onClick={() => router.push(`/products/${product._id}`)}
                    className="
                      group
                      flex
                      flex-col
                      text-center
                      cursor-pointer
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
                      overflow-hidden
                    "
                  >
                    {/* =======================================
                        IMAGE AREA
                    ======================================= */}

                    <div
                      className="
                        relative
                        w-full
                        aspect-square
                        overflow-hidden
                        bg-[#faf8f4]
                      "
                    >
                      {/* RAKHI SPECIAL */}

                      <div className="absolute top-2 left-2 z-20">
                        <span
                          className="
                            inline-block
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

                      {/* PRIMARY IMAGE */}

                      <Image
                        src={product.image || "/placeholder-product.png"}
                        alt={product.name || "Product"}
                        fill
                        sizes="
                          (max-width: 500px) 44vw,
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
                          object-contain
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
                              px-3
                              sm:px-4
                              py-2
                              text-[8px]
                              sm:text-[10px]
                              uppercase
                              tracking-[0.15em]
                              text-black
                            "
                          >
                            Out of Stock
                          </span>
                        </div>
                      )}
                    </div>

                    {/* =======================================
                        PRODUCT INFORMATION
                    ======================================= */}

                    <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-2">
                      {/* PRODUCT NAME */}

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

                      {/* DESCRIPTION */}

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

                      {/* PRICE */}

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

                          {/* SELLING PRICE */}

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

                      {/* BUY BUTTON */}

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
                          rounded-[10px]

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
          </div>
        </section>

        {/* ===================================================
            FOOTER
        =================================================== */}

        <Footer />
      </main>
    </div>
  );
};

export default ProductsPage;
