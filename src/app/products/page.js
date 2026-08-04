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
  // MAP API PRODUCT DATA
  // =========================================================

  const productData = products
    .filter((product) => product.status === "published")
    .map((product) => {
      // -----------------------------------------------------
      // Product Images
      // -----------------------------------------------------

      const imageMedia =
        product.media?.filter((media) => media.mediaType === "image") || [];

      const primaryImage =
        imageMedia.find((media) => media.isPrimary)?.url ||
        imageMedia[0]?.url ||
        "/placeholder-product.png";

      const hoverImage =
        imageMedia.find((media) => !media.isPrimary)?.url ||
        imageMedia[1]?.url ||
        primaryImage;

      // -----------------------------------------------------
      // Default Variant
      // -----------------------------------------------------

      const defaultVariant =
        product.variants?.find((variant) => variant.isDefault) ||
        product.variants?.[0];

      // -----------------------------------------------------
      // Image URL
      // -----------------------------------------------------

      const getImageUrl = (image) => {
        if (!image) {
          return "/placeholder-product.png";
        }

        if (image.startsWith("http://") || image.startsWith("https://")) {
          return image;
        }

        return `${process.env.NEXT_PUBLIC_API_URL}${image}`;
      };

      return {
        _id: product._id,

        name: product.name,

        description:
          product.shortDescription ||
          product.fullDescription ||
          "Premium handcrafted fragrance.",

        image: getImageUrl(primaryImage),

        hoverImage: getImageUrl(hoverImage),

        // Pricing
        mrp: defaultVariant?.pricing?.mrp || 0,

        price: defaultVariant?.pricing?.sellingPrice || 0,

        // Inventory
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

      <main className="h-auto bg-white mt-5">
        {/* ===================================================
            PAGE HEADER
        =================================================== */}

        <div className="pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
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

                mb-5
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

            {productData.length === 0 ? (
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
                  md:grid-cols-3
                  lg:grid-cols-5

                  gap-2
                  sm:gap-4
                  lg:gap-6
                "
              >
                {productData.map((product) => (
                  /* ===========================================
                     PRODUCT CARD
                  =========================================== */

                  <div
                    key={product._id}
                    onClick={() => router.push(`/products/${product._id}`)}
                    className="
                      text-center
                      cursor-pointer

                      group

                      flex
                      flex-col

                      border
                      border-[#C5A880]/10

                      p-2
                      sm:p-3

                      bg-white

                      transition-all

                      duration-700

                      ease-[cubic-bezier(0.25,1,0.5,1)]

                      hover:border-[#C5A880]/40

                      hover:shadow-[0_20px_50px_rgba(197,168,128,0.06)]

                      hover:-translate-y-1.5

                      animate-fade-in
                    "
                  >
                    {/* =======================================
                        PRODUCT IMAGE
                    ======================================= */}

                    <div
                      className="
                        w-full

                        aspect-[4/5]

                        overflow-hidden

                        relative

                        mb-3
                        sm:mb-5

                        border
                        border-[#C5A880]/5

                        bg-luxury-dark/5
                      "
                    >
                      {/* Primary Image */}

                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="
                          (max-width: 768px) 50vw,
                          (max-width: 1024px) 33vw,
                          20vw
                        "
                        className="
                          object-cover

                          transition-transform

                          duration-[1.2s]

                          ease-[cubic-bezier(0.25,1,0.5,1)]

                          group-hover:scale-105
                        "
                      />

                      {/* Hover Image */}

                      <Image
                        src={product.hoverImage}
                        alt={`${product.name} Hover`}
                        fill
                        sizes="
                          (max-width: 768px) 50vw,
                          (max-width: 1024px) 33vw,
                          20vw
                        "
                        className="
                          object-cover

                          opacity-0

                          transition-opacity

                          duration-700

                          ease-in-out

                          group-hover:opacity-100
                        "
                      />

                      {/* =====================================
                          OUT OF STOCK
                      ===================================== */}

                      {!product.inStock && (
                        <div
                          className="
                            absolute
                            inset-0

                            bg-black/40

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
                        PRODUCT NAME
                    ======================================= */}

                    <h3
                      className="
                        text-[10px]
                        sm:text-xs
                        md:text-sm

                        font-serif

                        tracking-[0.12em]
                        sm:tracking-[0.2em]

                        text-luxury-dark

                        mb-1

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

                    {/* =======================================
                        DESCRIPTION
                    ======================================= */}

                    <p
                      className="
                        text-[9px]
                        sm:text-[11px]

                        text-[#6C6C6C]

                        mb-2

                        font-light

                        leading-relaxed

                        line-clamp-2

                        min-h-[2.5rem]

                        font-sans

                        tracking-wide
                      "
                    >
                      {product.description}
                    </p>

                    {/* =======================================
                        PRICE
                    ======================================= */}

                    {product.mrp > 0 && product.price > 0 ? (
                      <div
                        className="
                          flex
                          items-baseline
                          justify-center

                          gap-1.5
                          sm:gap-2
                        "
                      >
                        {/* MRP */}

                        {product.mrp > product.price && (
                          <span
                            className="
                              text-[#8E8E8E]

                              line-through

                              text-[8px]
                              sm:text-[10px]

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

                            text-[10px]
                            sm:text-xs

                            font-sans
                          "
                        >
                          Rs. {product.price}
                        </span>
                      </div>
                    ) : (
                      <span
                        className="
                          text-[9px]
                          sm:text-xs

                          text-gray-500
                        "
                      >
                        Price unavailable
                      </span>
                    )}

                    {/* =======================================
                        BUY BUTTON
                    ======================================= */}

                    <button
                      disabled={!product.inStock}
                      onClick={(e) => {
                        e.stopPropagation();

                        if (product.inStock) {
                          router.push(`/products/${product._id}`);
                        }
                      }}
                      className={`
                        mt-2

                        w-full

                        border

                        text-[8px]
                        sm:text-[10px]

                        uppercase

                        tracking-[0.15em]
                        sm:tracking-[0.2em]

                        py-2.5
                        sm:py-3

                        transition-all

                        duration-500

                        ease-out

                        font-light

                        cursor-pointer

                        rounded-none

                        ${
                          product.inStock
                            ? `
                              border-[#C5A880]/50

                              text-[#C5A880]

                              bg-transparent

                              hover:bg-[#C5A880]

                              hover:text-[#121212]
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
