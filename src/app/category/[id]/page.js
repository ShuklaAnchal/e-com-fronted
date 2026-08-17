"use client";

import Image from "next/image";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Header from "@/app/component/mainpage/Header";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";
import Footer from "@/app/component/resuable/Footer";

import { fetchCategoryWiseProducts } from "@/app/store/action/productAction";

const CategoryProductsPage = () => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const categoryName = params?.id
    ? decodeURIComponent(params.id)
    : "";

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

        const result = await dispatch(
          fetchCategoryWiseProducts(categoryId)
        )

        console.log("API Result:", result);

        // ========================================
        // SAVE API DATA
        // ========================================

        setCategoryProducts(result.products);

        console.log(
          "Saved Products:",
          result
        );

      } catch (error) {
        console.error(
          "Failed to fetch products:",
          error
        );

        setError(
          error?.message ||
            "Failed to fetch products"
        );

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
    console.log(
      "Products stored in state:",
      categoryProducts
    );
  }, [categoryProducts]);

  // ============================================
  // PRODUCT CLICK
  // ============================================

  const openProduct = (productId) => {
    if (!productId) return;

    router.push(`/products/${productId}`);
  };

  return (
    <div>
      <MarqueeBar />

      <Header />

      <main className="h-auto bg-luxury-cream mt-32">

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
              Discover pieces carefully curated for this
              collection, embodying our signature craftsmanship.
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
                  {error}
                </p>
              </div>
            )}

            {/* PRODUCTS */}

            {!loading &&
              !error &&
              categoryProducts.length > 0 && (

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 lg:gap-8">

                  {categoryProducts.map(
                    (product, index) => (

                      <div
                        key={product._id}
                        onClick={() =>
                          openProduct(product._id)
                        }
                        className="
                          text-center
                          cursor-pointer
                          group
                          flex
                          flex-col
                          border
                          border-[#C5A880]/10
                          lg:p-2
                          p-1
                          bg-[#FAF7F2]
                          transition-all
                          duration-700
                          hover:border-[#C5A880]/40
                          hover:shadow-[0_20px_50px_rgba(197,168,128,0.06)]
                          hover:-translate-y-1.5
                        "
                        style={{
                          animationDelay:
                            `${index * 100}ms`,
                        }}
                      >

                        {/* IMAGE */}

                        <div
                          className="
                            w-full
                            aspect-[4/5]
                            overflow-hidden
                            relative
                            mb-2
                            border
                            border-[#C5A880]/5
                            bg-luxury-dark/5
                          "
                        >

                          {product.images?.[0] ? (

                            <Image
                              src={product.images[0]}
                              alt={
                                product.name ||
                                "Product"
                              }
                              fill
                              sizes="
                                (max-width: 768px) 50vw,
                                25vw
                              "
                              className="
                                object-cover
                                transition-transform
                                duration-[1.2s]
                                group-hover:scale-105
                              "
                            />

                          ) : (

                            <div className="w-full h-full flex items-center justify-center">
                              <span className="text-gray-400 text-sm">
                                No Image
                              </span>
                            </div>

                          )}

                          {/* SECOND IMAGE */}

                          {product.images?.[1] && (

                            <Image
                              src={product.images[1]}
                              alt={`${product.name} Hover`}
                              fill
                              sizes="
                                (max-width: 768px) 50vw,
                                25vw
                              "
                              className="
                                object-cover
                                opacity-0
                                transition-opacity
                                duration-700
                                group-hover:opacity-100
                              "
                            />

                          )}

                        </div>

                        {/* NAME */}

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
                            group-hover:text-luxury-gold
                          "
                        >
                          {product.name}
                        </h3>

                        {/* DESCRIPTION */}

                        <p
                          className="
                            text-[11px]
                            text-[#6C6C6C]
                            mb-1
                            font-light
                            leading-relaxed
                            line-clamp-2
                            min-h-[2.5rem]
                            font-sans
                            tracking-wide
                          "
                        >
                          {product.shortDescription ||
                            product.description ||
                            "Premium quality product"}
                        </p>

                        {/* PRICE */}

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

                          {product.mrp && (
                            <span
                              className="
                                text-[#8E8E8E]
                                line-through
                                text-[10px]
                              "
                            >
                              Rs. {product.mrp}
                            </span>
                          )}

                          <span
                            className="
                              text-luxury-dark
                              font-medium
                              tracking-wide
                              text-xs
                              font-sans
                            "
                          >
                            Rs.{" "}

                            {product.sellingPrice ||
                              product.price ||
                              product.pricing
                                ?.sellingPrice ||
                              product.variants?.[0]
                                ?.pricing
                                ?.sellingPrice ||
                              "N/A"}
                          </span>

                        </div>

                        {/* BUY NOW */}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();

                            openProduct(
                              product._id
                            );
                          }}
                          className="
                            mt-3
                            w-full
                            border
                            border-[#C5A880]/50
                            text-[#C5A880]
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            py-3
                            transition-all
                            duration-500
                            bg-transparent
                            hover:bg-[#C5A880]
                            hover:text-[#121212]
                            font-light
                            cursor-pointer
                          "
                        >
                          Buy Now
                        </button>

                      </div>
                    )
                  )}

                </div>
              )}

            {/* NO PRODUCTS */}

            {!loading &&
              !error &&
              categoryProducts.length === 0 && (

                <div className="text-center py-20">

                  <p className="font-serif text-2xl text-luxury-dark font-light">
                    No products found in this collection.
                  </p>

                  <button
                    onClick={() =>
                      router.push("/products")
                    }
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