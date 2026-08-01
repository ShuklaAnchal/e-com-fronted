"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import Header from "@/app/component/mainpage/Header";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";
import Footer from "@/app/component/resuable/Footer";

import { fetchProductbyID } from "@/app/store/action/productAction";

import ProductGallery from "@/app/component/usercomponent/productpage/ProductGallery";
import ProductInfo from "@/app/component/usercomponent/productpage/ProductInfo";

export default function ProductDetailsPage() {
  const params = useParams();

  const id = params?.id;

  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading product...</p>
      </div>
    );
  }

  if (error || !productData?.product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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

  const product = productData.product;

  const variants = productData.variants || [];

  const productDetails = productData.productDetails || [];

  return (
    <div className="min-h-screen bg-white">
      <MarqueeBar />

      <Header />

      <main className="pt-24 md:pt-32 pb-20">
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">

            {/* Breadcrumb */}
            <div className="mb-8 text-sm text-gray-500">
              Home /{" "}
              {product.category?.name || "Products"} /{" "}
              <span className="text-gray-900">
                {product.name}
              </span>
            </div>

            {/* Product Main Section */}
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

            {/* Product Description */}
            <div className="mt-20 border-t pt-12">

              <h2 className="text-2xl md:text-3xl font-serif mb-6">
                Product Description
              </h2>

              <p className="text-gray-600 leading-8 max-w-4xl">
                {product.fullDescription ||
                  product.shortDescription ||
                  "No description available."}
              </p>

            </div>

            {/* Highlights */}
            {product.highlights?.length > 0 && (
              <div className="mt-16">

                <h2 className="text-2xl md:text-3xl font-serif mb-8">
                  Highlights
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                  {product.highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-xl p-5"
                    >
                      <p className="text-gray-700">
                        {highlight}
                      </p>
                    </div>
                  ))}

                </div>

              </div>
            )}

            {/* Product Specifications */}
            {productDetails?.[0]?.values?.length > 0 && (
              <div className="mt-16">

                <h2 className="text-2xl md:text-3xl font-serif mb-8">
                  Product Specifications
                </h2>

                <div className="border border-gray-200 rounded-2xl overflow-hidden">

                  {productDetails[0].values.map((item, index) => (
                    <div
                      key={item._id || index}
                      className="grid grid-cols-2 border-b last:border-b-0 border-gray-200"
                    >

                      <div className="bg-gray-50 px-5 py-4 font-medium">
                        {item.attributeName}
                      </div>

                      <div className="px-5 py-4 text-gray-600">
                        {item.value}
                        {item.unit ? ` ${item.unit}` : ""}
                      </div>

                    </div>
                  ))}

                </div>

              </div>
            )}

            {/* Shipping Information */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">

              <div className="border rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Shipping
                </h3>

                <div className="space-y-2 text-gray-600">
                  <p>
                    COD Available:{" "}
                    <strong>
                      {product.shipping?.codAvailable
                        ? "Yes"
                        : "No"}
                    </strong>
                  </p>

                  <p>
                    Fragile Item:{" "}
                    <strong>
                      {product.shipping?.fragileItem
                        ? "Yes"
                        : "No"}
                    </strong>
                  </p>
                </div>
              </div>

              <div className="border rounded-2xl p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Category
                </h3>

                <div className="space-y-2 text-gray-600">
                  <p>
                    Category:{" "}
                    <strong>
                      {product.category?.name || "-"}
                    </strong>
                  </p>

                  <p>
                    Sub Category:{" "}
                    <strong>
                      {product.subCategory?.name || "-"}
                    </strong>
                  </p>

                  <p>
                    Brand:{" "}
                    <strong>
                      {product.brand || "-"}
                    </strong>
                  </p>
                </div>
              </div>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}