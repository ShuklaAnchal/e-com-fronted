"use client";

import { notFound } from "next/navigation";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";

import Header from "@/app/component/mainpage/Header";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";
import Footer from "@/app/component/resuable/Footer";

import { blogs } from "@/app/component/blog/DummyBlogData";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaArrowRight,
} from "react-icons/fa";

function ContentBlock({ block }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-gray-700 leading-8 text-lg mb-8">{block.text}</p>
      );
    case "heading":
      return (
        <h2 className="font-serif text-2xl md:text-3xl text-luxury-dark mt-12 mb-5 leading-snug">
          {block.text}
        </h2>
      );
    case "quote":
      return (
        <blockquote className="relative my-10 pl-8 border-l-4 border-luxury-gold">
          <div className="absolute -top-3 -left-1 text-luxury-gold text-5xl leading-none font-serif opacity-30">
            &quot;
          </div>
          <p className="text-luxury-dark font-serif italic text-xl md:text-2xl leading-relaxed">
            {block.text}
          </p>
        </blockquote>
      );
    case "tip":
      return (
        <div className="my-10 rounded-2xl border border-luxury-gold/20 px-8 py-7" style={{backgroundColor: "rgba(197,168,128,0.06)"}}>
          <p className="text-xs uppercase tracking-[0.35em] text-luxury-gold mb-3 font-medium">
            {block.title}
          </p>
          <p className="text-gray-700 leading-7">{block.text}</p>
        </div>
      );
    default:
      return null;
  }
}

function RelatedCard({ blog }) {
  return (
    <Link
      href={`/blogs/${blog.slug}`}
      className="group flex gap-5 items-center p-4 rounded-2xl hover:bg-luxury-cream-dark transition-all duration-300"
    >
      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover group-hover:scale-110 transition duration-500"
        />
      </div>
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold mb-1">
          {blog.category}
        </p>
        <h4 className="text-sm font-medium text-luxury-dark leading-snug group-hover:text-luxury-gold transition-colors line-clamp-2">
          {blog.title}
        </h4>
        <p className="text-xs text-gray-400 mt-1">{blog.readTime}</p>
      </div>
    </Link>
  );
}

export default function BlogDetailPage({ params }) {
  const { slug } = use(params);
  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) notFound();

  const related = blogs
    .filter((b) => b.slug !== slug && b.category === blog.category)
    .slice(0, 3);

  const moreBlogs = blogs
    .filter((b) => b.slug !== slug && !related.find((r) => r.id === b.id))
    .slice(0, 3 - related.length);

  const sidebarBlogs = [...related, ...moreBlogs];

  return (
    <div className="min-h-screen flex flex-col bg-luxury-cream">
      <MarqueeBar />
      <Header />

      <main className="flex-1 pt-24 md:pt-32">

        <div className="relative h-[55vh] md:h-[70vh] w-full overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
          <div className="absolute inset-0 flex flex-col justify-end pb-14 px-6 max-w-5xl mx-auto w-full left-1/2 -translate-x-1/2">
            <span className="inline-block text-[11px] uppercase tracking-[0.35em] text-luxury-gold mb-5">
              {blog.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-tight mb-6 max-w-4xl">
              {blog.title}
            </h1>
            <div className="flex flex-wrap gap-6 text-sm text-white/70">
              <span className="flex items-center gap-2">
                <FaUser className="text-luxury-gold text-xs" />
                {blog.author}
              </span>
              <span className="flex items-center gap-2">
                <FaCalendarAlt className="text-luxury-gold text-xs" />
                {blog.date}
              </span>
              <span className="flex items-center gap-2">
                <FaClock className="text-luxury-gold text-xs" />
                {blog.readTime}
              </span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row gap-16">

            <article className="lg:flex-1 min-w-0">
              <Link
                href="/blogs"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-luxury-gold transition-colors mb-10 group"
              >
                <FaArrowLeft className="transition-transform group-hover:-translate-x-1 text-luxury-gold text-xs" />
                Back to Journal
              </Link>

              <p className="text-xl md:text-2xl text-luxury-dark font-serif leading-relaxed mb-10 pb-10 border-b border-luxury-gold/15">
                {blog.excerpt}
              </p>

              <div>
                {blog.content?.map((block, idx) => (
                  <ContentBlock key={idx} block={block} />
                ))}
              </div>

              <div className="mt-16 pt-10 border-t border-luxury-gold/15 flex items-center gap-5">
                <div className="w-14 h-14 rounded-full bg-luxury-gold/20 flex items-center justify-center shrink-0">
                  <FaUser className="text-luxury-gold text-lg" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-luxury-gold mb-1">Written by</p>
                  <p className="font-serif text-luxury-dark text-lg">{blog.author}</p>
                </div>
              </div>
            </article>

            <aside className="lg:w-80 shrink-0">
              <div className="sticky top-28">
                <div className="inline-block bg-luxury-gold/10 text-luxury-gold text-[11px] tracking-[0.3em] uppercase px-4 py-2 rounded-full mb-8">
                  {blog.category}
                </div>

                {sidebarBlogs.length > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-px flex-1 bg-luxury-gold/20" />
                      <p className="text-[11px] uppercase tracking-[0.35em] text-luxury-gold whitespace-nowrap">More Articles</p>
                      <div className="h-px flex-1 bg-luxury-gold/20" />
                    </div>
                    <div className="space-y-2">
                      {sidebarBlogs.map((b) => (
                        <RelatedCard key={b.id} blog={b} />
                      ))}
                    </div>
                  </div>
                )}

                <div className="rounded-3xl bg-luxury-dark p-8 text-center">
                  <p className="text-luxury-gold text-[10px] tracking-[0.4em] uppercase mb-4">The Candle Studio</p>
                  <h3 className="font-serif text-white text-xl mb-4 leading-snug">Explore Our Luxury Collection</h3>
                  <p className="text-white/50 text-sm mb-7 leading-6">Handcrafted soy candles made with the finest fragrance oils.</p>
                  <Link
                    href="/products"
                    className="inline-flex items-center gap-2 bg-luxury-gold text-white text-sm px-6 py-3 rounded-full hover:bg-luxury-gold-dark transition-colors duration-300 group"
                  >
                    Shop Now
                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>

        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-5 mb-12">
              <div className="h-px w-16 bg-luxury-gold" />
              <p className="text-[11px] uppercase tracking-[0.4em] text-luxury-gold">Continue Reading</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogs
                .filter((b) => b.slug !== slug)
                .slice(0, 3)
                .map((b) => (
                  <Link
                    key={b.id}
                    href={`/blogs/${b.slug}`}
                    className="group block overflow-hidden rounded-3xl border border-luxury-gold/10 hover:border-luxury-gold/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="relative h-52 overflow-hidden">
                      <Image src={b.image} alt={b.title} fill className="object-cover transition duration-700 group-hover:scale-110" />
                    </div>
                    <div className="p-6">
                      <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold mb-3">{b.category}</p>
                      <h3 className="font-serif text-luxury-dark text-lg leading-snug group-hover:text-luxury-gold transition-colors">{b.title}</h3>
                      <div className="flex items-center gap-4 mt-4 text-xs text-gray-400">
                        <span>{b.date}</span>
                        <span>&#183;</span>
                        <span>{b.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}