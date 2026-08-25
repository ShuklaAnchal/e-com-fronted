"use client";

import Image from "next/image";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Header from "@/app/component/mainpage/Header";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";
import Footer from "@/app/component/resuable/Footer";
import { getMediaUrl } from "@/app/utils/mediaUrl";
import { fetchCategoryWiseProducts } from "@/app/store/action/productAction";

const CategoryProductsPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const categoryName = params?.id ? decodeURIComponent(params.id) : "";

  const categoryId = searchParams.get("categoryId");

  // This stores the API data
  const [categoryProducts, setCategoryProducts] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ============================================
  // GET DATA FROM API
  // ============================================

  useEffect(() => {
    if (!categoryId) return;

    const getProducts = async () => {
      try {
        setLoading(true);
        setError("");
        console.log({ categoryId });

        const result = await dispatch(fetchCategoryWiseProducts(categoryId));

        console.log("API Result:", result);

        // ========================================
        // SAVE API DATA
        // ========================================

        setCategoryProducts(result.products);

        console.log("Saved Products:", result);
      } catch (error) {
        console.error("Failed to fetch products:", error);

        setError(error?.message || "Failed to fetch products");

        setCategoryProducts([]);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [categoryId, dispatch]);

  console.log([categoryProducts]);

  // ============================================
  // DEBUG SAVED DATA
  // ============================================

  useEffect(() => {
    console.log("Products stored in state:", categoryProducts);
  }, [categoryProducts]);

  // ============================================
  // PRODUCT CLICK
  // ============================================

  const openProduct = (productId) => {
    if (!productId) return;

    router.push(`/products/${productId}`);
  };

  return (
    <div className="webprimarycolor">
      <MarqueeBar />

      <Header />

      <main className="h-auto webprimarycolor mt-32 bg-red-500">
        {/* ======================================
            CATEGORY HEADER
        ====================================== */}

        <div className="pt-0 pb-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <p className="text-xs tracking-[0.4em] text-luxury-gold font-light mb-1 uppercase">
              Collection
            </p>

            <h1 className="text-4xl md:text-6xl font-serif font-extralight text-luxury-dark uppercase tracking-[0.1em] mb-3">
              {categoryName || "Category"}
            </h1>

            <p className="font-serif italic text-luxury-gold-dark/70 text-lg tracking-wider font-light max-w-2xl mx-auto">
              Discover pieces carefully curated for this collection, embodying
              our signature craftsmanship.
            </p>
          </div>
        </div>

        {/* ======================================
            PRODUCTS
        ====================================== */}

        <section className="pb-16">
          <div className="container mx-auto px-6 max-w-7xl">
            {/* LOADING */}

            {loading && (
              <div className="text-center py-20">
                <p className="font-serif text-2xl text-luxury-dark">
                  Loading products...
                </p>
              </div>
            )}

            {/* ERROR */}

            {!loading && error && (
              <div className="text-center py-20">
                <p className="font-serif text-2xl text-red-500">
                  {error.message}
                </p>
              </div>
            )}

            {/* PRODUCTS */}

            {!loading && !error && categoryProducts.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-8">
                {categoryProducts.map((product, index) => {
                  const mainImage = product.images?.[0]
                    ? getMediaUrl(product.images[0])
                    : "/placeholder-product.png";

                  const hoverImage = product.images?.[1]
                    ? getMediaUrl(product.images[1])
                    : mainImage;

                  // ============================================
                  // PRICE
                  // ============================================

                  const sellingPrice =
                    product.sellingPrice ||
                    product.price ||
                    product.pricing?.sellingPrice ||
                    product.variants?.[0]?.pricing?.sellingPrice ||
                    0;

                  const mrp =
                    product.mrp ||
                    product.pricing?.mrp ||
                    product.variants?.[0]?.pricing?.mrp ||
                    0;

                  // ============================================
                  // STOCK
                  // ============================================

                  const inStock =
                    product.inStock !== undefined
                      ? product.inStock
                      : product.variants?.some(
                          (variant) => variant.inStock !== false,
                        );

                  return (
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
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      {/* ==========================================
          IMAGE CONTAINER
      =========================================== */}

                      <div
                        className="
          relative
          aspect-square
          overflow-hidden
          bg-[#F8F5F0]
          rounded-t-[14px]
          sm:rounded-t-[18px]
          md:rounded-t-[20px]
        "
                      >
                        {/* ========================================
            PRODUCT BADGES
        ========================================= */}

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

                        {/* ========================================
            MAIN IMAGE
        ========================================= */}

                        <Image
                          src={mainImage}
                          alt={product.name || "Product"}
                          fill
                          sizes="
            (max-width: 500px) 50vw,
            (max-width: 768px) 33vw,
            25vw
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

                        {/* ========================================
            HOVER IMAGE
        ========================================= */}

                        {product.images?.[1] && (
                          <Image
                            src={hoverImage}
                            alt={`${product.name || "Product"} Hover`}
                            fill
                            sizes="
              (max-width: 640px) 50vw,
              (max-width: 768px) 33vw,
              25vw
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
                        )}

                        {/* ========================================
            OUT OF STOCK
        ========================================= */}

                        {!inStock && (
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

                      {/* ==========================================
          PRODUCT CONTENT
      =========================================== */}

                      <div className="px-3 sm:px-4 pb-3">
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
            font-sans
            tracking-wide
            px-0.5
            sm:px-1
          "
                        >
                          {product.description || "Premium quality product"}
                        </p>

                        {/* ========================================
            PRICE
        ========================================= */}

                        {sellingPrice > 0 ? (
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

                            {mrp > sellingPrice && (
                              <span
                                className="
                  text-[7px]
                  sm:text-[10px]
                  text-[#999]
                  line-through
                  font-light
                "
                              >
                                Rs. {mrp}
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
                              Rs. {sellingPrice}
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

                        {/* ========================================
            BUY NOW
        ========================================= */}

                        <button
                          disabled={!inStock}
                          onClick={(e) => {
                            e.stopPropagation();

                            if (inStock) {
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
              inStock
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
                          {inStock ? "Buy Now" : "Out of Stock"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* NO PRODUCTS */}

            {!loading && !error && categoryProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="font-serif text-2xl text-luxury-dark font-light">
                  No products found in this collection.
                </p>

                <button
                  onClick={() => router.push("/products")}
                  className="
                      mt-8
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
                    "
                >
                  View All Products
                </button>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default CategoryProductsPage;
