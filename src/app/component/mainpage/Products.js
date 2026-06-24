"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Products = () => {
  const router = useRouter();

const [products] = useState([
    {
      _id: "1",
      name: "Vanilla Soy Candle",
      description: "Hand-poured soy candle with warm vanilla notes.",
      price: 799,
      mrp: 999,
      images: ["/candle.webp", "/candle.webp"],
    },
    {
      _id: "2",
      name: "Lavender Bliss",
      description: "Relaxing lavender fragrance for peaceful evenings.",
      price: 899,
      mrp: 1199,
      images: ["/candle.webp", "/candle.webp"],
    },
    {
      _id: "3",
      name: "Amber Woods",
      description: "Rich amber and woody aroma for luxury spaces.",
      price: 1299,
      mrp: 1499,
      images: ["/candle.webp", "/candle.webp"],
    },
    {
      _id: "4",
      name: "Rose Garden",
      description: "Elegant floral fragrance inspired by fresh roses.",
      price: 999,
      mrp: 1299,
      images: ["/candle.webp", "/candle.webp"],
    },
    {
      _id: "5",
      name: "Ocean Breeze",
      description: "Fresh coastal scent with calming undertones.",
      price: 849,
      mrp: 1099,
      images: ["/candle.webp", "/candle.webp"],
    },
    {
      _id: "6",
      name: "Citrus Glow",
      description: "Bright citrus fragrance to energize your space.",
      price: 749,
      mrp: 999,
      images: ["/candle.webp", "/candle.webp"],
    },
    {
      _id: "7",
      name: "Luxury Diffuser",
      description: "Premium diffuser crafted for sophisticated interiors.",
      price: 1499,
      mrp: 1899,
      images: ["/candle.webp", "/candle.webp"],
    },
    {
      _id: "8",
      name: "Midnight Oud",
      description: "Deep oud fragrance with warm oriental notes.",
      price: 1799,
      mrp: 2199,
      images: ["/candle.webp", "/candle.webp"],
    },
  ]);

  return (
    <section className="py-24 bg-luxury-cream">
      <div className="container mx-auto px-6 max-w-7xl">
        <p className="text-center text-xs tracking-[0.4em] text-luxury-gold font-light mb-3 uppercase">
          Latest Releases
        </p>

        <h2 className="text-3xl sm:text-5xl font-serif font-extralight text-center mb-4 tracking-[0.1em] text-luxury-dark uppercase">
          New Launches
        </h2>

        <p className="text-center font-serif italic text-luxury-gold-dark/70 mb-16 text-base tracking-wider font-light">
          Meticulously formulated. Small-batch poured.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => router.push(`/products/${product._id}`)}
              className="text-center cursor-pointer group flex flex-col border border-luxury-gold/10 p-3 bg-luxury-cream transition-all duration-500 hover:border-luxury-gold hover:shadow-[0_12px_40px_rgba(197,168,128,0.06)]"
            >
              {/* Product Image */}
              <div className="w-full aspect-square overflow-hidden relative mb-4 md:mb-6 border border-luxury-gold/5 bg-luxury-dark/5">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover transition-all duration-700 group-hover:scale-105"
                />

                <Image
                  src={product.images[1]}
                  alt={`${product.name} Hover`}
                  fill
                  className="object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
              </div>

              {/* Product Name */}
              <h3 className="text-sm md:text-base font-serif tracking-widest text-luxury-dark mb-1.5 uppercase font-light truncate transition-colors duration-300 group-hover:text-luxury-gold">
                {product.name}
              </h3>

              {/* Product Description */}
              <p className="text-xs text-[#6C6C6C] mb-3 font-light line-clamp-2 min-h-[2.25rem] font-sans tracking-wide">
                {product.description}
              </p>

              {/* Price */}
              <div className="mt-auto pt-3 border-t border-luxury-gold/5 flex items-baseline justify-center gap-2">
                <span className="text-[#8E8E8E] line-through text-xs font-light">
                  Rs. {product.mrp}
                </span>

                <span className="text-luxury-dark font-medium tracking-wide text-sm font-sans">
                  Rs. {product.price}
                </span>
              </div>

              {/* Buy Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/products/${product._id}`);
                }}
                className="mt-4 w-full border border-luxury-gold/60 text-luxury-gold text-xs uppercase tracking-[0.2em] py-2.5 transition-all duration-300 bg-transparent hover:bg-luxury-gold hover:text-luxury-dark font-light cursor-pointer"
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-14 md:mt-16">
          <button
            onClick={() => router.push("/products")}
            className="border border-luxury-dark text-luxury-dark px-10 py-4 tracking-[0.2em] uppercase text-xs hover:bg-luxury-dark hover:text-luxury-cream transition-all duration-500 bg-transparent font-light cursor-pointer shadow-sm"
          >
            View All Creations
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;
