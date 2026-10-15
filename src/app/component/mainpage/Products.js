
"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

import { mainpageproducts } from "@/app/store/action/productAction";

const Products = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMainPageProducts = async () => {
      try {
        setLoading(true);

        const result = await dispatch(
          mainpageproducts({
            page: 1,
            limit: 8,
          })
        );

        setProducts(result?.products || []);
      } catch (error) {
        console.error("Fetch main page products error:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMainPageProducts();
  }, [dispatch]);

  const getImageUrl = (imageUrl) => {
    const placeholder = "/placeholder-product.png";

    if (!imageUrl || typeof imageUrl !== "string") {
      return placeholder;
    }

    const url = imageUrl.trim();

    if (
      !url ||
      url === "undefined" ||
      url === "null" ||
      url.includes("/undefined") ||
      url.includes("undefined/")
    ) {
      return placeholder;
    }

    if (/^https?:\/\//i.test(url)) {
      return url;
    }

    const baseUrl = (
      process.env.NEXT_PUBLIC_API_URL || ""
    ).replace(/\/+$/, "");

    if (url.startsWith("/")) {
      if (url.startsWith("/placeholder") || !baseUrl) {
        return url;
      }

      return `${baseUrl}${url}`;
    }

    return baseUrl
      ? `${baseUrl}/${url.replace(/^\/+/, "")}`
      : placeholder;
  };

  // Map products once
  const mappedProducts = products
    .filter((product) => product.status === "published")
    .map((product) => {
      const imageMedia = Array.isArray(product.media)
        ? product.media.filter(
            (media) =>
              media?.mediaType === "image" &&
              typeof media.url === "string" &&
              media.url.trim() !== ""
          )
        : [];

      const primaryMedia =
        imageMedia.find((media) => media.isPrimary === true) ||
        imageMedia[0];

      const hoverMedia =
        imageMedia.find(
          (media) => media.url !== primaryMedia?.url
        ) || primaryMedia;

      const defaultVariant =
        product.variants?.find(
          (variant) => variant.isDefault === true
        ) || product.variants?.[0];

      const mrp = Number(defaultVariant?.pricing?.mrp || 0);

      const sellingPrice = Number(
        defaultVariant?.pricing?.sellingPrice || 0
      );

      const inStock =
        defaultVariant?.inventory?.inStock === true;

      return {
        ...product,
        image: getImageUrl(primaryMedia?.url),
        hoverImage: getImageUrl(hoverMedia?.url),
        description:
          product.shortDescription ||
          product.fullDescription ||
          "Premium quality product",
        mrp,
        price: sellingPrice,
        inStock,
        stockQuantity: Number(
          defaultVariant?.inventory?.stockQuantity || 0
        ),
      };
    });

  // Split into two groups without duplicating products
  const newLaunches = mappedProducts.slice(0, 4);
  const bestSellers = mappedProducts.slice(4, 8);

  // Same product-card design in both sections
  const renderProductGrid = (sectionProducts, badgeLabel) => (
    <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4 md:gap-6 lg:gap-8">
      {sectionProducts.map((product) => (
        <div
          key={product._id}
          onClick={() =>
            router.push(`/products/${product._id}`)
          }
          className="group flex cursor-pointer flex-col overflow-hidden rounded-[14px] border border-[#C5A880]/15 bg-white/40 text-center shadow-[0_5px_20px_rgba(40,30,20,0.05)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-[#C5A880]/40 hover:shadow-[0_15px_40px_rgba(197,168,128,0.12)] sm:rounded-[18px] md:rounded-[20px]"
        >
          {/* PRODUCT IMAGE */}
          <div className="relative aspect-square overflow-hidden">
            <span className="absolute left-2 top-2 z-20 rounded-[3px] bg-[#121212]/90 px-2 py-1 text-[7px] font-medium uppercase tracking-[0.15em] text-white sm:left-3 sm:top-3 sm:px-3 sm:py-1.5 sm:text-[9px]">
              {badgeLabel}
            </span>

            <Image
              src={product.image}
              alt={product.name || "Product"}
              fill
              sizes="(max-width: 767px) 46vw, 25vw"
              className="rounded-[20px] object-contain p-1 transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:p-2"
            />

            <Image
              src={product.hoverImage}
              alt={`${product.name || "Product"} Hover`}
              fill
              sizes="(max-width: 767px) 46vw, 25vw"
              className="rounded-[20px] object-contain p-1 opacity-0 transition-opacity duration-500 group-hover:opacity-100 sm:p-2"
            />

            {!product.inStock && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30">
                <span className="bg-white/90 px-3 py-2 text-[8px] uppercase tracking-wider text-black sm:text-[10px]">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* PRODUCT DETAILS */}
          <div className="flex flex-1 flex-col px-2 pb-3 mt-2 sm:px-4">
            <h3 className="mb-1 truncate text-[9px] font-medium uppercase tracking-[0.1em] text-luxury-dark transition-colors duration-300 group-hover:text-luxury-gold sm:mb-2 sm:text-xs sm:tracking-[0.16em] md:text-sm">
              {product.name}
            </h3>

            <p className="line-clamp-2 min-h-[28px] px-0.5 font-sans text-[10px] font-normal leading-[1.4] tracking-wide text-[#777] sm:min-h-[34px] sm:text-[12px] md:text-[15px]">
              {product.description}
            </p>

            {/* PRICE */}
            {product.mrp > 0 && product.price > 0 ? (
              <div className="mt-2 flex items-baseline justify-center gap-1 border-t border-[#C5A880]/15 pt-2 sm:mt-3 sm:gap-2">
                {product.mrp > product.price && (
                  <span className="text-[10px] font-light text-[#999] line-through">
                    Rs. {product.mrp}
                  </span>
                )}

                <span className="text-[12px] font-medium tracking-wide text-luxury-dark sm:text-xs">
                  Rs. {product.price}
                </span>
              </div>
            ) : (
              <p className="mt-2 text-[9px] text-gray-500 sm:mt-3 sm:text-xs">
                Price unavailable
              </p>
            )}

            {/* BUY BUTTON */}
            <button
              type="button"
              disabled={!product.inStock}
              onClick={(event) => {
                event.stopPropagation();

                if (product.inStock) {
                  router.push(`/products/${product._id}`);
                }
              }}
              className={`mt-auto mt-3 w-full rounded-[10px] border py-2.5 text-[8px] font-normal uppercase tracking-[0.1em] transition-all duration-500 sm:mt-4 sm:py-3 sm:text-[10px] sm:tracking-[0.18em] ${
                product.inStock
                  ? "cursor-pointer border-[#C5A880]/50 bg-transparent text-[#B08F5A] hover:bg-[#C5A880] hover:text-[#121212]"
                  : "cursor-not-allowed border-gray-300 text-gray-400"
              }`}
            >
              {product.inStock ? "Buy Now" : "Out of Stock"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <section className="w-full py-16">
        <div className="flex items-center justify-center">
          <p className="text-sm text-gray-500">
            Loading products...
          </p>
        </div>
      </section>
    );
  }

  return (
    <div className="w-full">
      {/* NEW LAUNCHES SECTION */}
      <section className="w-full py-10 sm:py-10 md:py-16">
        <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-5 md:px-8 lg:px-10">
          <div className="mb-8 sm:mb-8 md:mb-12">
            <h2 className="mb-2 text-center text-2xl font-extralight uppercase tracking-[0.08em] text-luxury-dark sm:mb-4 sm:text-4xl sm:tracking-[0.1em] md:text-5xl">
              New Launches
            </h2>

            <p className="text-center text-[12px] font-medium tracking-wide text-luxury-dark sm:text-[15px] sm:tracking-wider">
              Meticulously formulated. Small-batch crafted.
            </p>
          </div>

          {newLaunches.length > 0 ? (
            renderProductGrid(newLaunches, "NEW")
          ) : (
            <p className="py-10 text-center text-sm text-gray-500">
              No new launches available.
            </p>
          )}

          <div className="mt-8 flex justify-center sm:mt-10 md:mt-12">
            <button
              type="button"
              onClick={() => router.push("/products")}
              className="border border-luxury-dark bg-transparent px-7 py-3 text-[9px] font-light uppercase tracking-[0.15em] text-luxury-dark shadow-sm transition-all duration-500 hover:bg-luxury-dark hover:text-luxury-cream sm:px-10 sm:py-4 sm:text-xs sm:tracking-[0.2em]"
            >
              View All Creations
            </button>
          </div>
        </div>
      </section>

      {/* BEST SELLERS SECTION */}
      <section className="w-full border-t border-[#C5A880]/15 py-10 sm:py-10 md:py-16">
        <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-5 md:px-8 lg:px-10">
          <div className="mb-8 sm:mb-8 md:mb-12">
            <h2 className="mb-2 text-center text-2xl font-extralight uppercase tracking-[0.08em] text-luxury-dark sm:mb-4 sm:text-4xl sm:tracking-[0.1em] md:text-5xl">
              Best Sellers
            </h2>

            <p className="text-center text-[12px] font-medium tracking-wide text-luxury-dark sm:text-[15px] sm:tracking-wider">
              Our most-loved creations, chosen for every occasion.
            </p>
          </div>

          {bestSellers.length > 0 ? (
            renderProductGrid(bestSellers, "BEST SELLER")
          ) : (
            <p className="py-10 text-center text-sm text-gray-500">
              No best sellers available.
            </p>
          )}

          <div className="mt-8 flex justify-center sm:mt-10 md:mt-12">
            <button
              type="button"
              onClick={() => router.push("/products")}
              className="border border-luxury-dark bg-transparent px-7 py-3 text-[9px] font-light uppercase tracking-[0.15em] text-luxury-dark shadow-sm transition-all duration-500 hover:bg-luxury-dark hover:text-luxury-cream sm:px-10 sm:py-4 sm:text-xs sm:tracking-[0.2em]"
            >
              View All Creations
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
