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

      <main className="pt-32 bg-luxury-cream flex-1 mt-32 mb-20">
        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto flex flex-row gap-16 items-start">
            {/* Product Images */}

            <ProductGallery product={dummyProduct} />

            {/* Product Information */}

            <ProductInfo product={dummyProduct} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
