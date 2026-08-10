"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaArrowRight, FaCalendarAlt, FaClock } from "react-icons/fa";
import { blogs } from "@/app/component/blog/DummyBlogData";

// Show only the first 3 blogs as a preview
const previewBlogs = blogs.slice(0, 3);

export default function HomeBlogSection() {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardRefs = useRef([]);

  useEffect(() => {
    const observers = cardRefs.current.map((ref, i) => {
      if (!ref) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) =>
              prev.includes(i) ? prev : [...prev, i]
            );
          }
        },
        { threshold: 0.15 }
      );
      observer.observe(ref);
      return observer;
    });
    return () => observers.forEach((o) => o && o.disconnect());
  }, []);

  return (
    <section className="webprimarycolor w-full py-4 md:py-4 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center mb-8 md:mb-8">
          <p className="text-xs tracking-[0.5em] uppercase text-[#C5A880] mb-2 font-light">
            From The Journal
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1A1A1A] uppercase tracking-wider leading-tight">
            Articles &amp; Blogs
          </h2>

          <div className="w-20 h-px bg-[#C5A880] mx-auto my-2" />

          <p className="max-w-xl mx-auto text-[#6C6C6C] text-sm leading-6 font-light tracking-wide">
            Explore our world of craftsmanship, fragrance and the rituals that
            make everyday moments extraordinary.
          </p>
        </div>

        {/* ── Blog Cards Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {previewBlogs.map((blog, i) => (
            <article
              key={blog.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className="group bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#C5A880]/15 hover:border-[#C5A880]/45 transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl"
              style={{
                opacity: visibleCards.includes(i) ? 1 : 0,
                transform: visibleCards.includes(i)
                  ? "translateY(0)"
                  : "translateY(40px)",
                transition: `opacity 0.8s cubic-bezier(0.25,1,0.5,1) ${i * 120}ms, transform 0.8s cubic-bezier(0.25,1,0.5,1) ${i * 120}ms, box-shadow 0.4s ease, border-color 0.4s ease`,
              }}
            >
              {/* Image */}
              <Link href={`/blogs/${blog.slug}`} className="block overflow-hidden">
                <div className="relative h-56 md:h-60">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                  {/* Category badge */}
                  <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.3em] text-white bg-[#C5A880]/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    {blog.category}
                  </span>
                </div>
              </Link>

              {/* Content */}
              <div className="p-6">
                <Link href={`/blogs/${blog.slug}`}>
                  <h3 className="font-serif text-xl text-[#1A1A1A] leading-snug mb-3 group-hover:text-[#C5A880] transition-colors duration-300">
                    {blog.title}
                  </h3>
                </Link>

                <p className="text-[#6C6C6C] text-sm leading-7 mb-5 line-clamp-2">
                  {blog.excerpt}
                </p>

                {/* Meta + Read link */}
                <div className="flex items-center justify-between border-t border-[#C5A880]/15 pt-4">
                  <div className="flex items-center gap-4 text-xs text-[#9C9C9C]">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt className="text-[#C5A880]" />
                      {blog.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaClock className="text-[#C5A880]" />
                      {blog.readTime}
                    </span>
                  </div>

                  <Link
                    href={`/blogs/${blog.slug}`}
                    className="flex items-center gap-1.5 text-xs font-medium text-[#1A1A1A] group/link luxury-hover-underline"
                  >
                    Read
                    <FaArrowRight className="text-[#C5A880] transition-transform duration-300 group-hover/link:translate-x-1" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── View All CTA ── */}
        <div className="text-center mt-14">
          <Link
            href="/blogs"
            className="draw-border inline-flex items-center gap-3 px-10 py-4 text-xs uppercase tracking-[0.35em] text-[#1A1A1A] border border-[#C5A880]/40 hover:bg-[#C5A880] hover:text-white hover:border-[#C5A880] transition-all duration-500"
          >
            View All Articles
            <FaArrowRight className="text-[#C5A880] group-hover:text-white transition-colors" />
          </Link>
        </div>

      </div>
    </section>
  );
}
