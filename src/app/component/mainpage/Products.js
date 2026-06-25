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
      images: ["/candle.png", "/candle_hover.png"],
    },
    {
      _id: "2",
      name: "Lavender Bliss",
      description: "Relaxing lavender fragrance for peaceful evenings.",
      price: 899,
      mrp: 1199,
      images: ["/candle.png", "/candle_hover.png"],
    },
    {
      _id: "3",
      name: "Amber Woods",
      description: "Rich amber and woody aroma for luxury spaces.",
      price: 1299,
      mrp: 1499,
      images: ["/candle.png", "/candle_hover.png"],
    },
    {
      _id: "4",
      name: "Rose Garden",
      description: "Elegant floral fragrance inspired by fresh roses.",
      price: 999,
      mrp: 1299,
      images: ["/candle.png", "/candle_hover.png"],
    },
    {
      _id: "5",
      name: "Ocean Breeze",
      description: "Fresh coastal scent with calming undertones.",
      price: 849,
      mrp: 1099,
      images: ["/candle.png", "/candle_hover.png"],
    },
    {
      _id: "6",
      name: "Citrus Glow",
      description: "Bright citrus fragrance to energize your space.",
      price: 749,
      mrp: 999,
      images: ["/candle.png", "/candle_hover.png"],
    },
    {
      _id: "7",
      name: "Luxury Diffuser",
      description: "Premium diffuser crafted for sophisticated interiors.",
      price: 1499,
      mrp: 1899,
      images: ["/candle.png", "/candle_hover.png"],
    },
    {
      _id: "8",
      name: "Midnight Oud",
      description: "Deep oud fragrance with warm oriental notes.",
      price: 1799,
      mrp: 2199,
      images: ["/candle.png", "/candle_hover.png"],
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
              className="text-center cursor-pointer group flex flex-col border border-[#C5A880]/10 p-4 bg-[#FAF7F2] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-[#C5A880]/40 hover:shadow-[0_20px_50px_rgba(197,168,128,0.06)] hover:-translate-y-1.5"
            >
              {/* Product Image */}
              <div className="w-full aspect-[4/5] overflow-hidden relative mb-5 border border-[#C5A880]/5 bg-luxury-dark/5">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-104"
                />

                <Image
                  src={product.images[1]}
                  alt={`${product.name} Hover`}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100"
                />
              </div>

              {/* Product Name */}
              <h3 className="text-xs md:text-sm font-serif tracking-[0.2em] text-luxury-dark mb-2 uppercase font-light truncate transition-colors duration-300 group-hover:text-luxury-gold">
                {product.name}
              </h3>

              {/* Product Description */}
              <p className="text-[11px] text-[#6C6C6C] mb-4 font-light leading-relaxed line-clamp-2 min-h-[2.5rem] font-sans tracking-wide">
                {product.description}
              </p>

              {/* Price */}
              <div className="mt-auto pt-4 border-t border-[#C5A880]/10 flex items-baseline justify-center gap-2">
                <span className="text-[#8E8E8E] line-through text-[10px] font-light">
                  Rs. {product.mrp}
                </span>

                <span className="text-luxury-dark font-medium tracking-wide text-xs font-sans">
                  Rs. {product.price}
                </span>
              </div>

              {/* Buy Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/products/${product._id}`);
                }}
                className="mt-5 w-full border border-[#C5A880]/50 text-[#C5A880] text-[10px] uppercase tracking-[0.2em] py-3 transition-all duration-500 ease-out bg-transparent hover:bg-[#C5A880] hover:text-[#121212] font-light cursor-pointer rounded-none"
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
