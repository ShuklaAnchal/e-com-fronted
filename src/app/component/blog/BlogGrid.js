"use client";

import BlogCard from "./BlogCard";

export default function BlogGrid({ blogs = [] }) {
  return (
    <section id="blogs" className="py-20">

      {/* Section Heading */}

      <div className="flex flex-col items-center text-center mb-16">

        <p className="uppercase tracking-[0.45em] text-xs text-luxury-gold mb-4">

          Latest Articles

        </p>

        <h2 className="font-serif text-3xl md:text-5xl text-luxury-dark mb-5">

          Discover More Stories

        </h2>

        <p className="text-gray-600 max-w-2xl leading-8">

          Immerse yourself in fragrance inspiration,
          candle care, wellness rituals and luxurious
          living through our carefully curated journal.

        </p>

      </div>

      {/* Blog Grid */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
          />
        ))}

      </div>

      {/* Empty State */}

      {blogs.length === 0 && (

        <div className="text-center py-24">

          <h3 className="font-serif text-3xl text-luxury-dark mb-4">

            No Articles Found

          </h3>

          <p className="text-gray-500">

            New journal entries will be published soon.

          </p>

        </div>

      )}

    </section>
  );
}