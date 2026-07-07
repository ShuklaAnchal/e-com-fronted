"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Header from "@/app/component/mainpage/Hearder";
import MarqueeBar from '@/app/component/mainpage/MarqueeBar'

import Footer from "@/app/component/resuable/Footer";

const CategoryProductsPage = ({ params }) => {
  const router = useRouter();
  
  // Unwrap params using React.use if needed in React 19, or just use params.id
  // We'll decode the category ID (or name) to display
  const categoryName = decodeURIComponent(params.id || "Category");

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
  ]);

  return (
    <div>
         <MarqueeBar />
        <Header />
    <main className="h-auto bg-luxury-cream mt-32">
    
      
      {/* Category Header */}
      <div className="pt-32 pb-16 px-6 border-b border-luxury-gold/10">
        <div className="max-w-7xl mx-auto text-center animate-fade-up">
          <p className="text-xs tracking-[0.4em] text-luxury-gold font-light mb-3 uppercase">
            Collection
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-extralight text-luxury-dark uppercase tracking-[0.1em] mb-6 capitalize">
            {categoryName}
          </h1>
          <p className="font-serif italic text-luxury-gold-dark/70 text-lg tracking-wider font-light max-w-2xl mx-auto">
            Discover pieces carefully curated for the {categoryName} collection, embodying our signature craftsmanship.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <section className="py-20">
        <div className="container mx-auto px-6 max-w-7xl">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {products.map((product, index) => (
                <div
                  key={product._id}
                  onClick={() => router.push(`/products/${product._id}`)}
                  className="text-center cursor-pointer group flex flex-col border border-[#C5A880]/10 p-4 bg-[#FAF7F2] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-[#C5A880]/40 hover:shadow-[0_20px_50px_rgba(197,168,128,0.06)] hover:-translate-y-1.5 animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
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
          ) : (
            <div className="text-center py-20">
              <p className="font-serif text-2xl text-luxury-dark font-light">No products found in this collection.</p>
              <button
                onClick={() => router.push("/products")}
                className="mt-8 border border-luxury-dark text-luxury-dark px-10 py-4 tracking-[0.2em] uppercase text-xs hover:bg-luxury-dark hover:text-luxury-cream transition-all duration-500 bg-transparent font-light cursor-pointer"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
    </div>
  );
};

export default CategoryProductsPage;
