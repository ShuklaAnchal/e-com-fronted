"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";

import { fetchCategoryWiseProducts } from "@/app/store/action/productAction";
import { fetchCategorybyID } from "@/app/store/action/categoryAction";

const CategoryPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const categoryId = params?.id;

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);

  // =====================================================
  // FETCH CATEGORY + PRODUCTS
  // =====================================================

  useEffect(() => {
    if (!categoryId) return;

    const loadCategory = async () => {
      try {
        setLoading(true);

        const response = await dispatch(fetchCategorybyID(categoryId));

        console.log("CATEGORY RESPONSE:", response);

        const categoryData =
          response?.payload?.category ||
          response?.payload?.data ||
          response?.payload ||
          response?.category ||
          response?.data ||
          null;

        setCategory(categoryData);
      } catch (error) {
        console.error("Error fetching category:", error);

        setCategory(null);
      } finally {
        setLoading(false);
      }
    };

    const loadProducts = async () => {
      try {
        setProductsLoading(true);

        const response = await dispatch(fetchCategoryWiseProducts(categoryId));

        console.log("CATEGORY PRODUCTS RESPONSE:", response);

        const productData =
          response?.payload?.products ||
          response?.payload?.data ||
          response?.payload ||
          response?.products ||
          response?.data ||
          [];

        setProducts(Array.isArray(productData) ? productData : []);
      } catch (error) {
        console.error("Error fetching category products:", error);

        setProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };

    loadCategory();
    loadProducts();
  }, [categoryId, dispatch]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <main className="h-screen overflow-hidden bg-white">
        <div className="h-full overflow-y-auto">
          {/* Hero Skeleton */}
          <section className="relative min-h-[55vh] bg-neutral-100">
            <div className="absolute inset-0 animate-pulse bg-neutral-200" />

            <div className="relative flex min-h-[55vh] items-center justify-center px-6 py-20">
              <div className="w-full max-w-3xl text-center">
                <div className="mx-auto h-7 w-32 animate-pulse rounded-full bg-neutral-300" />

                <div className="mx-auto mt-6 h-12 w-72 animate-pulse rounded bg-neutral-300 sm:h-16 sm:w-96" />

                <div className="mx-auto mt-5 h-4 w-full max-w-xl animate-pulse rounded bg-neutral-300" />

                <div className="mx-auto mt-8 h-11 w-40 animate-pulse rounded-full bg-neutral-300" />
              </div>
            </div>
          </section>

          {/* Category Information Skeleton */}
          <section className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
            <div className="mx-auto h-3 w-24 animate-pulse rounded bg-neutral-100" />

            <div className="mx-auto mt-4 h-8 w-64 animate-pulse rounded bg-neutral-100" />

            <div className="mx-auto mt-5 h-4 w-full max-w-2xl animate-pulse rounded bg-neutral-100" />

            <div className="mx-auto mt-2 h-4 w-3/4 max-w-xl animate-pulse rounded bg-neutral-100" />
          </section>

          {/* Product Skeleton */}
          <section className="mx-auto max-w-7xl px-6 pb-20 sm:px-10 lg:px-16">
            <div className="mb-8 flex items-end justify-between">
              <div>
                <div className="h-3 w-20 animate-pulse rounded bg-neutral-100" />

                <div className="mt-3 h-8 w-56 animate-pulse rounded bg-neutral-100" />
              </div>

              <div className="h-4 w-20 animate-pulse rounded bg-neutral-100" />
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index}>
                  <div className="aspect-square animate-pulse rounded-2xl bg-neutral-100" />

                  <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-neutral-100" />

                  <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-neutral-100" />
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    );
  }

  // =====================================================
  // CATEGORY NOT FOUND
  // =====================================================

  if (!category) {
    return (
      <main className="h-screen overflow-hidden bg-white">
        <div className="flex h-full items-center justify-center overflow-y-auto px-6">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-neutral-900">
              Category not found
            </h1>

            <p className="mt-2 text-sm text-neutral-500">
              The category you're looking for doesn't exist.
            </p>

            <Link
              href="/categories"
              className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              View Categories
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // =====================================================
  // MAIN PAGE
  // =====================================================

  return (
    <main className="h-screen overflow-hidden bg-white">
      {/* =================================================
          SCROLLABLE PAGE
      ================================================= */}

      <div className="h-full overflow-y-auto scroll-smooth">
        {/* =================================================
            HERO
        ================================================= */}

        <section className="relative min-h-[55vh] overflow-hidden">
          {/* =================================================
              VIDEO
          ================================================= */}

          {category?.video ? (
            <div className="absolute inset-0">
              <video
                autoPlay
                muted
                loop
                playsInline
                poster={category?.image || undefined}
                className="h-full w-full object-cover"
              >
                <source src={category.video} type="video/mp4" />
              </video>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/45" />
            </div>
          ) : category?.image ? (
            /* =================================================
                IMAGE
            ================================================= */

            <div className="absolute inset-0">
              <Image
                src={category.image}
                alt={category.name || "Category"}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/45" />
            </div>
          ) : (
            /* =================================================
                FALLBACK
            ================================================= */

            <div className="absolute inset-0 bg-neutral-100" />
          )}

          {/* =================================================
              HERO CONTENT
          ================================================= */}

          <div className="relative mx-auto flex min-h-[55vh] max-w-7xl items-center justify-center px-5 py-16 text-center sm:px-6 sm:py-20">
            <div className="max-w-3xl">
              {/* Label */}

              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[9px] font-medium uppercase tracking-[0.3em] text-white backdrop-blur-md sm:text-[10px]">
                Collection
              </span>

              {/* Category Name */}

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:mt-6 sm:text-5xl md:text-6xl lg:text-7xl">
                {category.name}
              </h1>

              {/* Description */}

              {category.description && (
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-white/85 sm:mt-5 sm:text-base sm:leading-7">
                  {category.description}
                </p>
              )}

              {/* Explore Button */}

              <a
                href="#products"
                className="mt-7 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-neutral-100 sm:mt-8 sm:px-7"
              >
                Explore Collection
              </a>
            </div>
          </div>
        </section>

        {/* =================================================
            CATEGORY INFORMATION
        ================================================= */}

        <section className="mx-auto max-w-4xl px-6 py-14 text-center sm:py-20">
          {/* Small Heading */}

          <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-neutral-400 sm:text-[10px]">
            Discover
          </p>

          {/* Heading */}

          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
            Explore {category.name}
          </h2>

          {/* Description */}

          {category.description && (
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-neutral-500 sm:mt-5 sm:text-base sm:leading-7">
              {category.description}
            </p>
          )}
        </section>

        {/* =================================================
            PRODUCTS
        ================================================= */}

        <section
          id="products"
          className="mx-auto max-w-7xl scroll-mt-10 px-5 pb-16 sm:px-10 sm:pb-20 lg:px-16"
        >
          {/* =================================================
              PRODUCT HEADER
          ================================================= */}

          <div className="mb-7 flex items-end justify-between gap-4 sm:mb-8">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-neutral-400 sm:text-[10px]">
                Shop
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-neutral-900 sm:text-3xl">
                {category.name} Products
              </h2>
            </div>

            {!productsLoading && (
              <span className="shrink-0 text-xs text-neutral-400 sm:text-sm">
                {products.length}{" "}
                {products.length === 1 ? "Product" : "Products"}
              </span>
            )}
          </div>

          {/* =================================================
              PRODUCT LOADING
          ================================================= */}

          {productsLoading ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index}>
                  {/* Image Skeleton */}

                  <div className="aspect-square animate-pulse rounded-2xl bg-neutral-100" />

                  {/* Name Skeleton */}

                  <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-neutral-100" />

                  {/* Price Skeleton */}

                  <div className="mt-2 h-4 w-1/3 animate-pulse rounded bg-neutral-100" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            /* =================================================
                PRODUCT GRID
            ================================================= */

            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4">
              {products.map((product) => {
                // -------------------------------------------------
                // PRODUCT IMAGE
                // -------------------------------------------------

                const image =
                  product?.image ||
                  product?.images?.[0] ||
                  product?.variants?.[0]?.images?.[0] ||
                  "/placeholder-product.png";

                // -------------------------------------------------
                // PRODUCT PRICE
                // -------------------------------------------------

                const price =
                  product?.sellingPrice ||
                  product?.price ||
                  product?.variants?.[0]?.pricing?.sellingPrice;

                // -------------------------------------------------
                // PRODUCT MRP
                // -------------------------------------------------

                const mrp =
                  product?.mrp || product?.variants?.[0]?.pricing?.mrp;

                return (
                  <Link
                    key={product?._id}
                    href={`/product/${product?._id}`}
                    className="group block"
                  >
                    {/* =================================================
                        IMAGE
                    ================================================= */}

                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
                      <Image
                        src={image}
                        alt={product?.name || "Product"}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="
                          (max-width: 640px) 50vw,
                          (max-width: 1024px) 33vw,
                          25vw
                        "
                      />
                    </div>

                    {/* =================================================
                        PRODUCT INFO
                    ================================================= */}

                    <div className="pt-4">
                      {/* Product Name */}

                      <h3 className="line-clamp-1 text-sm font-medium text-neutral-900 sm:text-base">
                        {product?.name}
                      </h3>

                      {/* Price */}

                      {price && (
                        <div className="mt-1 flex items-center gap-2">
                          <p className="text-sm font-semibold text-neutral-700">
                            ₹{price}
                          </p>

                          {/* MRP */}

                          {mrp && Number(mrp) > Number(price) && (
                            <p className="text-xs text-neutral-400 line-through">
                              ₹{mrp}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            /* =================================================
                EMPTY PRODUCTS
            ================================================= */

            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 px-6 py-16 text-center sm:px-10 sm:py-20">
              {/* Icon */}

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                <span className="text-xl">✦</span>
              </div>

              {/* Heading */}

              <h3 className="mt-5 text-lg font-medium text-neutral-900">
                Products coming soon
              </h3>

              {/* Description */}

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
                We're currently preparing products for this collection.
              </p>

              {/* Button */}

              <Link
                href="/products"
                className="mt-6 inline-flex rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
              >
                Browse All Products
              </Link>
            </div>
          )}
        </section>

        {/* =================================================
            BOTTOM CTA
        ================================================= */}

        <section className="border-t border-neutral-100 bg-neutral-50">
          <div className="mx-auto max-w-4xl px-6 py-14 text-center sm:py-20">
            {/* Heading */}

            <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl md:text-4xl">
              Discover more from our collection
            </h2>

            {/* Description */}

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-neutral-500">
              Explore our complete range of products and find something you'll
              love.
            </p>    

            {/* Button */}

            <Link
              href="/products"
              className="mt-7 inline-flex rounded-full bg-black px-7 py-3 text-sm font-medium text-white transition hover:bg-neutral-800"
            >
              View All Products
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default CategoryPage;
