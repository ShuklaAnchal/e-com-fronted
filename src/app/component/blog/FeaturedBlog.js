"use client";

import Image from "next/image";
import Link from "next/link";

import {
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

export default function FeaturedBlog({ blog }) {
  return (
    <section className="py-20">

      <div className="flex items-center gap-4 mb-10">

        <div className="h-px w-20 bg-luxury-gold"></div>

        <p className="uppercase tracking-[0.4em] text-xs text-luxury-gold">
          Featured Story
        </p>

      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* Image */}

        <div className="relative overflow-hidden rounded-3xl group">

          <Image
            src={blog.image}
            alt={blog.title}
            width={800}
            height={700}
            className="w-full h-[320px] sm:h-[450px] lg:h-[560px] object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition duration-500"></div>

        </div>

        {/* Content */}

        <div>

          <span className="inline-block bg-luxury-gold/10 text-luxury-gold px-4 py-2 rounded-full text-xs tracking-[0.25em] uppercase mb-6">

            {blog.category}

          </span>

          <h2 className="font-serif text-3xl md:text-5xl leading-tight text-luxury-dark mb-6">

            {blog.title}

          </h2>

          <div className="flex flex-wrap gap-6 text-sm text-gray-500 mb-8">

            <div className="flex items-center gap-2">

              <FaCalendarAlt className="text-luxury-gold" />

              {blog.date}

            </div>

            <div className="flex items-center gap-2">

              <FaClock className="text-luxury-gold" />

              {blog.readTime}

            </div>

          </div>

          <p className="text-gray-600 leading-8 text-lg mb-10">

            {blog.excerpt}

          </p>

          <Link
            href={`/blogs/${blog.slug}`}
            className="inline-flex items-center gap-3 group text-luxury-dark font-medium tracking-wide"
          >

            Read Full Story

            <FaArrowRight className="transition group-hover:translate-x-2 text-luxury-gold" />

          </Link>

        </div>

      </div>

    </section>
  );
}