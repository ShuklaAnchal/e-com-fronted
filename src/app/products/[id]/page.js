"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Header from "@/app/component/mainpage/Header";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";
import Footer from "@/app/component/resuable/Footer";

import { fetchProductbyID } from "@/app/store/action/productAction";

import ProductGallery from "@/app/component/usercomponent/productpage/ProductGallery";
import ProductInfo from "@/app/component/usercomponent/productpage/ProductInfo";


// =====================================================
// Accordion Component
// =====================================================

function AccordionItem({ title, children, isOpen, onClick }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <button
        type="button"
        onClick={onClick}
        className="
          w-full
          flex
          items-center
          justify-between
          px-6
          py-5
          text-left
          bg-white
          hover:bg-gray-50
          transition-colors
        "
      >
        <span className="text-base md:text-lg font-semibold text-gray-900">
          {title}
        </span>

        <span
          className="
            text-2xl
            font-light
            text-gray-900
            leading-none
            transition-transform
            duration-300
          "
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {/* Content */}
      <div
        className={`
          grid
          transition-all
          duration-300
          ease-in-out
          ${
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0"
          }
        `}
      >
        <div className="overflow-hidden">
          <div className="px-6 pb-6 pt-1 text-gray-600 leading-7">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}


// =====================================================
// Product Details Page
// =====================================================

export default function ProductDetailsPage() {
  const params = useParams();

  const id = params?.id;

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Accordion state
  const [openAccordion, setOpenAccordion] = useState(null);

  // ===================================================
  // Fetch Product
  // ===================================================

  useEffect(() => {
    if (!id) return;

    const getProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await fetchProductbyID(id)(() => {});

        console.log("Fetch Product Result:", result);

        if (result?.success) {
          setProductData(result);
        } else {
          setError("Product not found.");
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    };

    getProduct();
  }, [id]);

  // ===================================================
  // Loading
  // ===================================================

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500 text-lg">
          Loading product...
        </p>
      </div>
    );
  }

  // ===================================================
  // Error
  // ===================================================

  if (error || !productData?.product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">
            Product Not Found
          </h2>

          <p className="text-gray-500">
            {error || "This product is not available."}
          </p>
        </div>
      </div>
    );
  }

  // ===================================================
  // Product Data
  // ===================================================

  const product = productData.product;

  const variants = productData.variants || [];

  const productDetails = productData.productDetails || [];

  // ===================================================
  // Product Specifications
  // Remove Category & Sub Category
  // ===================================================

  const specificationValues =
    productDetails?.[0]?.values?.filter((item) => {
      const attributeName = item?.attributeName
        ?.toLowerCase()
        ?.trim();

      return (
        attributeName !== "category" &&
        attributeName !== "sub category" &&
        attributeName !== "subcategory"
      );
    }) || [];

  // ===================================================
  // Accordion Toggle
  // ===================================================

  const toggleAccordion = (section) => {
    setOpenAccordion((prev) =>
      prev === section ? null : section
    );
  };

  // ===================================================
  // Return
  // ===================================================

  return (
    <div className="min-h-screen bg-white">

      {/* =================================================
          Header
      ================================================= */}

      <MarqueeBar />

      <Header />

      {/* =================================================
          Main
      ================================================= */}

      <main className="pt-24 md:pt-32 pb-20">

        <section className="px-4 sm:px-6 lg:px-8">

          <div className="max-w-7xl mx-auto">

            {/* =================================================
                Breadcrumb
            ================================================= */}

            <div className="mb-6 md:mb-8 text-sm text-gray-500">
              Home /{" "}
              {product.category?.name || "Products"} /{" "}
              <span className="text-gray-900">
                {product.name}
              </span>
            </div>


            {/* =================================================
                Product Main Section
            ================================================= */}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

              {/* Gallery */}

              <ProductGallery
                product={product}
                variants={variants}
              />

              {/* Product Info */}

              <ProductInfo
                product={product}
                variants={variants}
                productDetails={productDetails}
              />

            </div>


            {/* =================================================
                Product Details Accordion
            ================================================= */}

            <div className="mt-14 md:mt-20 max-w-full">

              <div className="space-y-4">

                {/* =================================================
                    DESCRIPTION
                ================================================= */}

                <AccordionItem
                  title="Description"
                  isOpen={openAccordion === "description"}
                  onClick={() =>
                    toggleAccordion("description")
                  }
                >
                  <div className="max-w-5xl">

                    <p className="whitespace-pre-line">
                      {product.fullDescription ||
                        product.shortDescription ||
                        "No description available."}
                    </p>

                  </div>
                </AccordionItem>


                {/* =================================================
                    SHIPPING & RETURN
                ================================================= */}

                <AccordionItem
                  title="Shipping & Return"
                  isOpen={openAccordion === "shipping"}
                  onClick={() =>
                    toggleAccordion("shipping")
                  }
                >

                  <div className="space-y-5">

                    {/* COD */}

                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                      <span className="font-medium text-gray-900">
                        Cash on Delivery
                      </span>

                      <span>
                        {product.shipping?.codAvailable
                          ? "Available"
                          : "Not Available"}
                      </span>
                    </div>


                    {/* Fragile */}

                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
                      <span className="font-medium text-gray-900">
                        Fragile Item
                      </span>

                      <span>
                        {product.shipping?.fragileItem
                          ? "Yes"
                          : "No"}
                      </span>
                    </div>


                    {/* Shipping */}

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Shipping Information
                      </h4>

                      <p>
                        Your order will be carefully packed
                        and shipped to the address provided
                        during checkout.
                      </p>
                    </div>


                    {/* Return */}

                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        Return Policy
                      </h4>

                      <p>
                        Please refer to our return policy for
                        information about eligible returns,
                        replacements and refunds.
                      </p>
                    </div>

                  </div>

                </AccordionItem>


                {/* =================================================
                    MANUFACTURING DETAILS
                ================================================= */}

                <AccordionItem
                  title="Manufacturing details"
                  isOpen={openAccordion === "manufacturing"}
                  onClick={() =>
                    toggleAccordion("manufacturing")
                  }
                >

                  <div className="space-y-4">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      {/* Manufacturer */}

                      {product.manufacturer && (
                        <div>
                          <p className="text-sm text-gray-500">
                            Manufacturer
                          </p>

                          <p className="font-medium text-gray-900">
                            {product.manufacturer}
                          </p>
                        </div>
                      )}


                      {/* Brand */}

                      {product.brand && (
                        <div>
                          <p className="text-sm text-gray-500">
                            Brand
                          </p>

                          <p className="font-medium text-gray-900">
                            {product.brand}
                          </p>
                        </div>
                      )}


                      {/* Country */}

                      {product.countryOfOrigin && (
                        <div>
                          <p className="text-sm text-gray-500">
                            Country of Origin
                          </p>

                          <p className="font-medium text-gray-900">
                            {product.countryOfOrigin}
                          </p>
                        </div>
                      )}


                      {/* Manufacturer Address */}

                      {product.manufacturerAddress && (
                        <div>
                          <p className="text-sm text-gray-500">
                            Manufacturer Address
                          </p>

                          <p className="font-medium text-gray-900">
                            {product.manufacturerAddress}
                          </p>
                        </div>
                      )}

                    </div>


                    {/* If no manufacturing data */}

                    {!product.manufacturer &&
                      !product.brand &&
                      !product.countryOfOrigin &&
                      !product.manufacturerAddress && (
                        <p className="text-gray-500">
                          Manufacturing details are not
                          available.
                        </p>
                      )}

                  </div>

                </AccordionItem>


                {/* =================================================
                    PRODUCT SPECIFICATIONS
                ================================================= */}

                {specificationValues.length > 0 && (
                  <AccordionItem
                    title="Product Specifications"
                    isOpen={
                      openAccordion === "specifications"
                    }
                    onClick={() =>
                      toggleAccordion("specifications")
                    }
                  >

                    <div className="border border-gray-200 rounded-xl overflow-hidden">

                      {specificationValues.map(
                        (item, index) => (
                          <div
                            key={
                              item._id || index
                            }
                            className="
                              grid
                              grid-cols-1
                              sm:grid-cols-2
                              border-b
                              last:border-b-0
                              border-gray-200
                            "
                          >

                            {/* Attribute */}

                            <div
                              className="
                                bg-gray-50
                                px-5
                                py-4
                                font-medium
                                text-gray-800
                              "
                            >
                              {item.attributeName ||
                                "-"}
                            </div>


                            {/* Value */}

                            <div
                              className="
                                px-5
                                py-4
                                text-gray-600
                              "
                            >
                              {item.value || "-"}

                              {item.unit
                                ? ` ${item.unit}`
                                : ""}
                            </div>

                          </div>
                        )
                      )}

                    </div>

                </AccordionItem>
                )}


                {/* =================================================
                    HIGHLIGHTS
                ================================================= */}

                {product.highlights?.length > 0 && (
                  <AccordionItem
                    title="Highlights"
                    isOpen={
                      openAccordion === "highlights"
                    }
                    onClick={() =>
                      toggleAccordion("highlights")
                    }
                  >

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      {product.highlights.map(
                        (highlight, index) => (
                          <div
                            key={index}
                            className="
                              border
                              border-gray-200
                              rounded-lg
                              p-4
                            "
                          >
                            <p>
                              {highlight}
                            </p>
                          </div>
                        )
                      )}

                    </div>

                  </AccordionItem>
                )}

              </div>

            </div>


            {/* =================================================
                Category / Product Information
            ================================================= */}

            {/* <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="border border-gray-200 rounded-2xl p-6">

                <h3 className="text-lg font-semibold mb-5">
                  Shipping Information
                </h3>

                <div className="space-y-3 text-gray-600">

                  <p className="flex justify-between gap-4">
                    <span>COD Available</span>

                    <strong className="text-gray-900">
                      {product.shipping?.codAvailable
                        ? "Yes"
                        : "No"}
                    </strong>
                  </p>

                  <p className="flex justify-between gap-4">
                    <span>Fragile Item</span>

                    <strong className="text-gray-900">
                      {product.shipping?.fragileItem
                        ? "Yes"
                        : "No"}
                    </strong>
                  </p>

                </div>

              </div>

              <div className="border border-gray-200 rounded-2xl p-6">

                <h3 className="text-lg font-semibold mb-5">
                  Product Information
                </h3>

                <div className="space-y-3 text-gray-600">

                  <p className="flex justify-between gap-4">
                    <span>Brand</span>

                    <strong className="text-gray-900">
                      {product.brand || "-"}
                    </strong>
                  </p>

                  <p className="flex justify-between gap-4">
                    <span>Category</span>

                    <strong className="text-gray-900">
                      {product.category?.name || "-"}
                    </strong>
                  </p>

                  <p className="flex justify-between gap-4">
                    <span>Sub Category</span>

                    <strong className="text-gray-900">
                      {product.subCategory?.name || "-"}
                    </strong>
                  </p>

                </div>

              </div>

            </div> */}

          </div>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              

        </section>

      </main>


      {/* =================================================
          Footer
      ================================================= */}

      <Footer />

    </div>
  );
}