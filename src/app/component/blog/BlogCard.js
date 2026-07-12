"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

export default function BlogCard({ blog }) {
  return (
    <article className="group bg-white rounded-3xl overflow-hidden border border-luxury-gold/15 hover:border-luxury-gold/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">

      {/* Image */}

      <Link
        href={`/blogs/${blog.slug}`}
        className="block overflow-hidden"
      >
        <div className="relative h-64">

          <Image
            src={blog.image}
            alt={blog.title}
            fill
            className="object-cover transition duration-700 group-hover:scale-110"
          />

        </div>
      </Link>

      {/* Content */}

      <div className="p-7">

        <span className="inline-block text-[11px] uppercase tracking-[0.3em] text-luxury-gold mb-5">

          {blog.category}

        </span>

        <Link href={`/blogs/${blog.slug}`}>

          <h3 className="font-serif text-2xl text-luxury-dark leading-snug mb-4 group-hover:text-luxury-gold transition">

            {blog.title}

          </h3>

        </Link>

        <p className="text-gray-600 leading-7 mb-6 line-clamp-3">

          {blog.excerpt}

        </p>

        {/* Meta */}

        <div className="flex items-center justify-between border-t border-luxury-gold/10 pt-5">

          <div className="space-y-2">

            <div className="flex items-center gap-2 text-sm text-gray-500">

              <FaCalendarAlt className="text-luxury-gold text-xs" />

              <span>{blog.date}</span>

            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">

              <FaClock className="text-luxury-gold text-xs" />

              <span>{blog.readTime}</span>

            </div>

          </div>

          <Link
            href={`/blogs/${blog.slug}`}
            className="flex items-center gap-2 text-luxury-dark font-medium group/link"
          >

            Read

            <FaArrowRight className="transition-transform duration-300 group-hover/link:translate-x-1 text-luxury-gold" />

          </Link>

        </div>

      </div>

    </article>
  );
}