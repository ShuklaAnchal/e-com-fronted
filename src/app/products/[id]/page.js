"use client";

import Header from "@/app/component/mainpage/Header";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";
import Footer from "@/app/component/resuable/Footer";

import ProductGallery from "@/app/component/usercomponent/productpage/ProductGallery";
import ProductInfo from "@/app/component/usercomponent/productpage/ProductInfo";

const dummyProduct = {
  _id: "1",

  name: "Vanilla Soy Candle",

  description:
    "Hand-poured soy candle with warm vanilla notes. Experience the ultimate luxury and a calming aroma that fills your room. Crafted with natural sustainable materials.",

  price: 799,

  mrp: 999,

  // Dummy Variants
  variants: [
    {
      id: "v1",
      name: "Vanilla - 250g",
      fragrance: "Vanilla",
      weight: "250g",
      price: 799,
      mrp: 999,
    },
    {
      id: "v2",
      name: "Vanilla - 400g",
      fragrance: "Vanilla",
      weight: "400g",
      price: 1099,
      mrp: 1299,
    },
    {
      id: "v3",
      name: "Lavender - 250g",
      fragrance: "Lavender",
      weight: "250g",
      price: 849,
      mrp: 1049,
    },
    {
      id: "v4",
      name: "Sandalwood - 250g",
      fragrance: "Sandalwood",
      weight: "250g",
      price: 899,
      mrp: 1099,
    },
    {
      id: "v5",
      name: "Rose & Oud - 250g",
      fragrance: "Rose & Oud",
      weight: "250g",
      price: 949,
      mrp: 1199,
    },
  ],

  media: [
    {
      type: "image",
      url: "/candle.png",
    },
    {
      type: "image",
      url: "/candle_hover.png",
    },
    {
      type: "video",
      url: "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
    },
  ],

  details: [
    {
      label: "Weight",
      value: "250g",
    },
    {
      label: "Burn Time",
      value: "45 Hours",
    },
    {
      label: "Wax",
      value: "100% Pure Soy Wax",
    },
    {
      label: "Wick",
      value: "Crackling Wood Wick",
    },
  ],
};

export default function ProductDetailsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarqueeBar />

      <Header />
      <main className="pt-24 md:pt-32 bg-luxury-cream flex-1 mb-20">
        <section className="py-6 md:py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
              {/* Product Images */}
              <div className="w-full lg:w-1/2">
                <ProductGallery product={dummyProduct} />
              </div>

              {/* Product Information */}
              <div className="w-full lg:w-1/2">
                <ProductInfo product={dummyProduct} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
