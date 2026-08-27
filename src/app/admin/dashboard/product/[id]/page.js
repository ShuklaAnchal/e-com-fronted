"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useRouter } from "next/navigation";

import { fetchProductbyID } from "@/app/store/action/productAction";

import ProductHeader from "@/app/component/productDetailesPage/ProductHeader";
import BasicInfoCard from "@/app/component/productDetailesPage/BasicInfoCard";
import DescriptionCard from "@/app/component/productDetailesPage/DescriptionCard";
import VariantList from "@/app/component/productDetailesPage/VariantList";
import ShippingCard from "@/app/component/productDetailesPage/ShippingCard";
import ExperienceCard from "@/app/component/productDetailesPage/ExperienceCard";
import SeoCard from "@/app/component/productDetailesPage/SeoCard";

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  const productID = params?.id;

  // =====================================================
  // FETCH PRODUCT
  // =====================================================

  useEffect(() => {
    if (!productID) return;

    const getProduct = async () => {
      try {
        setLoading(true);

        const response = await dispatch(fetchProductbyID(productID));

        console.log("PRODUCT DETAILS RESPONSE:", response);

        /*
         * Depending on your Redux action response,
         * the actual data may be inside:
         *
         * response.payload
         * response.data
         * response
         */

        const result = response?.payload || response?.data || response;

        console.log("PRODUCT DETAILS:", result);

        setProductData(result);
      } catch (error) {
        console.error("FETCH PRODUCT DETAILS ERROR:", error);

        setProductData(null);
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [productID, dispatch]);

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="h-screen w-screen primarycolor flex">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <div
              className="
                w-8
                h-8
                border-2
                border-gray-300
                border-t-gray-800
                rounded-full
                animate-spin
                mx-auto
              "
            />

            <p className="mt-4 text-sm text-gray-500">
              Loading product details...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // PRODUCT NOT FOUND
  // =====================================================

  if (!productData) {
    return (
      <div className="h-screen w-screen primarycolor flex">
        <div className="w-full h-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Product Not Found
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              We could not find the requested product.
            </p>

            <button
              type="button"
              onClick={() => router.back()}
              className="
                mt-5
                px-5
                py-2
                rounded-lg
                bg-gray-800
                text-white
                text-sm
                hover:bg-gray-700
              "
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =====================================================
  // HANDLE DIFFERENT RESPONSE STRUCTURES
  // =====================================================

  /*
   * Your old code was using:
   *
   * productData.product
   * productData.variants
   *
   * So we support that structure here.
   */

  const product = productData?.product || productData;

  const variants = productData?.variants || product?.variants || [];

  console.log("FINAL PRODUCT:", product);
  console.log("FINAL VARIANTS:", variants);

  // =====================================================
  // PAGE
  // =====================================================

  return (
    <div className="h-screen w-screen primarycolor flex">
      {/* =================================================
          NAVBAR
      ================================================= */}

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <div
        className="
          w-[90%]
          h-full
          px-14
          flex
          flex-col
          py-10
          gap-5
          overflow-y-auto
        "
      >
        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Product Details
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              View product details, variants, shipping and other information
            </p>
          </div>

          <button
            type="button"
            onClick={() => router.back()}
            className="
              px-7
              py-2
              rounded-lg
              border
              border-gray-300
              bg-white
              text-md
              text-gray-700
              hover:bg-gray-50
            "
          >
            Back
          </button>
        </div>

        {/* =================================================
            PRODUCT HEADER
        ================================================= */}

        <div>
          <ProductHeader product={product} />
        </div>

        {/* =================================================
            BASIC INFORMATION
        ================================================= */}

        <div>
          <BasicInfoCard product={product} />
        </div>

        {/* =================================================
            DESCRIPTION
        ================================================= */}

        <div>
          <DescriptionCard product={product} />
        </div>

        {/* =================================================
            VARIANTS
        ================================================= */}

        <div>
          <VariantList variants={variants} />
        </div>

        {/* =================================================
            SHIPPING
        ================================================= */}

        <div>
          <ShippingCard shipping={product?.shipping} />
        </div>

        {/* =================================================
            EXPERIENCE
        ================================================= */}

        <div>
          <ExperienceCard experience={product?.experience} />
        </div>

        {/* =================================================
            SEO
        ================================================= */}

        <div>
          <SeoCard seo={product?.seo} />
        </div>
      </div>
    </div>
  );
};

export default Page;
