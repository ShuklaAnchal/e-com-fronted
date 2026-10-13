
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Header from "@/app/component/mainpage/Header";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";
import Footer from "@/app/component/resuable/Footer";

import { fetchProductbyID } from "@/app/store/action/productAction";

import ProductGallery from "@/app/component/usercomponent/productpage/ProductGallery";
import ProductInfo from "@/app/component/usercomponent/productpage/ProductInfo";
import RelatedProducts from "@/app/component/usercomponent/productpage/RelatedProducts";
import ProductReviews from "@/app/component/usercomponent/productpage/ProductReviews";

// =====================================================
// Accordion Item
// =====================================================

function AccordionItem({ title, children, isOpen, onClick }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        className="
          flex w-full items-center justify-between gap-3
          bg-white px-3 py-3.5 text-left
          transition-colors duration-200 hover:bg-gray-50
          sm:gap-4 sm:px-5 sm:py-4
          lg:py-5
        "
      >
        <span className="text-sm font-semibold text-gray-900 sm:text-base lg:text-lg">
          {title}
        </span>

        <span
          className="
            shrink-0 text-xl font-light leading-none text-gray-900
            sm:text-2xl
          "
          aria-hidden="true"
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div
            className="
              px-3 pb-4 pt-1 text-sm leading-6 text-gray-600
              sm:px-5 sm:pb-5 sm:text-base sm:leading-7
            "
          >
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
  const [openAccordion, setOpenAccordion] = useState(null);

  // =====================================================
  // Fetch Product
  // =====================================================

  useEffect(() => {
    if (!id) {
      setLoading(true);
      return;
    }

    let cancelled = false;

    const getProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await fetchProductbyID(id)(() => {});

        if (cancelled) return;

        if (result?.success && result?.product) {
          setProductData(result);
          setError("");
        } else {
          setProductData(null);
          setError("Product not found.");
        }
      } catch (err) {
        if (cancelled) return;

        console.error("Failed to fetch product:", err);
        setProductData(null);
        setError("Unable to load product.");
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    getProduct();

    return () => {
      cancelled = true;
    };
  }, [id]);

  // =====================================================
  // Loading State
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <p className="text-sm text-gray-500 sm:text-base">
          Loading product...
        </p>
      </div>
    );
  }

  // =====================================================
  // Error State
  // =====================================================

  if (error || !productData?.product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <div className="max-w-md text-center">
          <h2 className="mb-2 text-xl font-semibold text-gray-900 sm:text-2xl">
            Product Not Found
          </h2>

          <p className="text-sm leading-6 text-gray-500 sm:text-base sm:leading-7">
            {error || "This product is not available."}
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // Product Data
  // =====================================================

  const product = productData.product;
  const variants = productData.variants || [];
  const productDetails = productData.productDetails || [];

  const specificationValues =
    productDetails?.[0]?.values?.filter((item) => {
      const attributeName = item?.attributeName?.toLowerCase()?.trim();

      return !["category", "sub category", "subcategory"].includes(
        attributeName
      );
    }) || [];

  // =====================================================
  // Accordion Toggle
  // =====================================================

  const toggleAccordion = (section) => {
    setOpenAccordion((previous) =>
      previous === section ? null : section
    );
  };

  // =====================================================
  // Main Page
  // =====================================================

  return (
    <div className="min-h-screen overflow-x-clip bg-white">
      <MarqueeBar />
      <Header />

      <main className="pb-10 pt-20 sm:pb-14 sm:pt-24 md:pb-20 md:pt-28">
        <section className="px-3 sm:px-5 lg:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Breadcrumb */}

            <div className="mb-4 break-words text-xs leading-5 text-gray-500 sm:mb-6 sm:text-sm sm:leading-6 md:mb-8">
              <span>Home</span>
              {" / "}
              <span>{product.category?.name || "Products"}</span>
              {" / "}
              <span className="text-gray-900">{product.name}</span>
            </div>

            {/* Main Product Layout */}

            <div
              className="
                grid grid-cols-1 items-start
                gap-6 sm:gap-8
                lg:grid-cols-2 lg:gap-12
                xl:gap-16
              "
            >
              {/* Left Column: Product Gallery */}

              <div
                className="
                  relative min-w-0
                  lg:sticky lg:top-28
                  lg:z-10 lg:self-start
                "
              >
                <ProductGallery
                  product={product}
                  variants={variants}
                />
              </div>

              {/* Right Column: Product Information and Details */}

              <div className="flex min-w-0 flex-col gap-6 sm:gap-8 lg:gap-10">
                {/* Product Information */}

                <ProductInfo
                  product={product}
                  variants={variants}
                  productDetails={productDetails}
                />

                {/* Product Detail Accordions */}

                <div className="w-full space-y-3 sm:space-y-4">
                  {/* Description */}

                  <AccordionItem
                    title="Description"
                    isOpen={openAccordion === "description"}
                    onClick={() => toggleAccordion("description")}
                  >
                    <p className="whitespace-pre-line break-words">
                      {product.fullDescription ||
                        product.shortDescription ||
                        "No description available."}
                    </p>
                  </AccordionItem>

                  {/* Shipping and Return */}

                  <AccordionItem
                    title="Shipping & Return"
                    isOpen={openAccordion === "shipping"}
                    onClick={() => toggleAccordion("shipping")}
                  >
                    <div className="space-y-4 sm:space-y-5">
                      <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                        <span className="font-medium text-gray-900">
                          Cash on Delivery
                        </span>

                        <span>
                          {product.shipping?.codAvailable
                            ? "Available"
                            : "Not Available"}
                        </span>
                      </div>

                      <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                        <span className="font-medium text-gray-900">
                          Fragile Item
                        </span>

                        <span>
                          {product.shipping?.fragileItem ? "Yes" : "No"}
                        </span>
                      </div>

                      <div>
                        <h4 className="mb-1.5 text-sm font-medium text-gray-900 sm:mb-2 sm:text-base">
                          Shipping Information
                        </h4>

                        <p>
                          Your order will be carefully packed and shipped to
                          the address provided during checkout.
                        </p>
                      </div>

                      <div>
                        <h4 className="mb-1.5 text-sm font-medium text-gray-900 sm:mb-2 sm:text-base">
                          Return Policy
                        </h4>

                        <p>
                          Please refer to our return policy for information
                          about eligible returns, replacements and refunds.
                        </p>
                      </div>
                    </div>
                  </AccordionItem>

                  {/* Manufacturing Details */}

                  <AccordionItem
                    title="Manufacturing Details"
                    isOpen={openAccordion === "manufacturing"}
                    onClick={() => toggleAccordion("manufacturing")}
                  >
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {product.manufacturer && (
                          <div className="min-w-0">
                            <p className="mb-1 text-xs text-gray-500 sm:text-sm">
                              Manufacturer
                            </p>

                            <p className="break-words font-medium text-gray-900">
                              {product.manufacturer}
                            </p>
                          </div>
                        )}

                        {product.brand && (
                          <div className="min-w-0">
                            <p className="mb-1 text-xs text-gray-500 sm:text-sm">
                              Brand
                            </p>

                            <p className="break-words font-medium text-gray-900">
                              {product.brand}
                            </p>
                          </div>
                        )}

                        {product.countryOfOrigin && (
                          <div className="min-w-0">
                            <p className="mb-1 text-xs text-gray-500 sm:text-sm">
                              Country of Origin
                            </p>

                            <p className="break-words font-medium text-gray-900">
                              {product.countryOfOrigin}
                            </p>
                          </div>
                        )}

                        {product.manufacturerAddress && (
                          <div className="min-w-0">
                            <p className="mb-1 text-xs text-gray-500 sm:text-sm">
                              Manufacturer Address
                            </p>

                            <p className="break-words font-medium text-gray-900">
                              {product.manufacturerAddress}
                            </p>
                          </div>
                        )}
                      </div>

                      {!product.manufacturer &&
                        !product.brand &&
                        !product.countryOfOrigin &&
                        !product.manufacturerAddress && (
                          <p className="text-sm text-gray-500 sm:text-base">
                            Manufacturing details are not available.
                          </p>
                        )}
                    </div>
                  </AccordionItem>

                  {/* Product Specifications */}

                  {specificationValues.length > 0 && (
                    <AccordionItem
                      title="Product Specifications"
                      isOpen={openAccordion === "specifications"}
                      onClick={() => toggleAccordion("specifications")}
                    >
                      <div className="overflow-hidden rounded-lg border border-gray-200 sm:rounded-xl">
                        {specificationValues.map((item, index) => (
                          <div
                            key={item._id || index}
                            className="
                              grid grid-cols-1
                              border-b border-gray-200
                              last:border-b-0
                              sm:grid-cols-2
                            "
                          >
                            <div
                              className="
                                bg-gray-50 px-3 py-3
                                text-sm font-medium text-gray-800
                                sm:px-5 sm:py-4 sm:text-base
                              "
                            >
                              {item.attributeName || "-"}
                            </div>

                            <div
                              className="
                                break-words px-3 py-3
                                text-sm text-gray-600
                                sm:px-5 sm:py-4 sm:text-base
                              "
                            >
                              {item.value || "-"}
                              {item.unit ? ` ${item.unit}` : ""}
                            </div>
                          </div>
                        ))}
                      </div>
                    </AccordionItem>
                  )}

                  {/* Highlights */}

                  {product.highlights?.length > 0 && (
                    <AccordionItem
                      title="Highlights"
                      isOpen={openAccordion === "highlights"}
                      onClick={() => toggleAccordion("highlights")}
                    >
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {product.highlights.map((highlight, index) => (
                          <div
                            key={index}
                            className="
                              min-w-0 rounded-lg border border-gray-200
                              p-3 text-sm leading-6
                              sm:p-4 sm:text-base sm:leading-7
                            "
                          >
                            <p className="break-words">{highlight}</p>
                          </div>
                        ))}
                      </div>
                    </AccordionItem>
                  )}
                </div>
              </div>
            </div>

            {/* Product Reviews */}

            <div className="mt-10 sm:mt-14 md:mt-20">
              <ProductReviews id={product._id} />
            </div>

            {/* Related Products */}

            <div className="mt-10 sm:mt-12 md:mt-16">
              <RelatedProducts
                products={product.relatedProducts || []}
                currentProductId={product._id}
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
