"use client";

import Header from "@/app/component/mainpage/Header";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";
import Footer from "@/app/component/resuable/Footer";

import BlogHero from "@/app/component/blog/BlogHero";
import FeaturedBlog from "@/app/component/blog/FeaturedBlog";
import BlogGrid from "@/app/component/blog/BlogGrid";
import BlogCategories from "@/app/component/blog/BlogCategories";
import NewsletterSection from "@/app/component/blog/NewsletterSection";

import { blogs } from "@/app/component/blog/DummyBlogData";

export default function BlogsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-luxury-cream">

      <MarqueeBar />
      <Header />

      <main className="flex-1 pt-24 md:pt-32">

        <BlogHero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <FeaturedBlog blog={blogs[0]} />

          <BlogCategories />

          <BlogGrid blogs={blogs.slice(1)} />

        </div>

        <NewsletterSection />

      </main>

      <Footer />

    </div>
  );
}