"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function BlogHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F9F6F1] via-[#F7F3EC] to-white">

      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-luxury-gold/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">

        <div className="max-w-3xl">

          <p className="uppercase tracking-[0.45em] text-xs text-luxury-gold mb-6">
            The Journal
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-7xl leading-tight font-light text-luxury-dark mb-8">

            Stories Inspired By
            <br />

            <span className="text-luxury-gold">
              Fragrance & Slow Living
            </span>

          </h1>

          <p className="text-gray-600 text-lg leading-8 max-w-2xl mb-10">

            Explore candle care guides, fragrance inspiration,
            wellness rituals, gifting ideas and home styling tips
            designed to elevate your everyday moments.

          </p>

          <Link
            href="#blogs"
            className="inline-flex items-center gap-3 bg-luxury-dark text-white px-8 py-4 rounded-full tracking-wide hover:bg-luxury-gold transition duration-300"
          >
            Explore Articles

            <FaArrowRight />
          </Link>

        </div>

      </div>
    </section>
  );
}