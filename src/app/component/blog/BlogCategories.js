"use client";

import { useState } from "react";
import { categories } from "./DummyBlogData";

export default function BlogCategories({
  onCategoryChange = () => {},
}) {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategory = (category) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <section className="py-16">

      <div className="flex flex-col items-center">

        <p className="uppercase tracking-[0.45em] text-xs text-luxury-gold mb-4">
          Explore
        </p>

        <h2 className="font-serif text-3xl md:text-4xl text-luxury-dark mb-5">

          Browse By Category

        </h2>

        <p className="text-gray-600 text-center max-w-2xl leading-8 mb-12">

          Discover thoughtfully curated articles on candle care,
          fragrance inspiration, wellness rituals, gifting ideas,
          and luxurious home living.

        </p>

      </div>

      <div className="flex flex-wrap justify-center gap-4">

        {categories.map((category) => {

          const active = activeCategory === category;

          return (
            <button
              key={category}
              onClick={() => handleCategory(category)}
              className={`px-8 py-3 rounded-full transition-all duration-300 border text-sm tracking-wide

                ${
                  active
                    ? "bg-luxury-dark text-white border-luxury-dark shadow-lg"
                    : "bg-white border-luxury-gold/20 text-luxury-dark hover:border-luxury-gold hover:bg-luxury-gold hover:text-white"
                }

              `}
            >
              {category}
            </button>
          );
        })}

      </div>

    </section>
  );
}