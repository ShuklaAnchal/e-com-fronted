"use client";

import { useState } from "react";
import { FaPaperPlane } from "react-icons/fa";

export default function NewsletterSection() {

  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email);

    alert("Thank you for subscribing!");

    setEmail("");
  };

  return (
    <section className="relative overflow-hidden py-24 mt-24 bg-luxury-dark">

      {/* Background Glow */}

      <div className="absolute -top-20 left-0 w-72 h-72 bg-luxury-gold/10 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 right-0 w-96 h-96 bg-luxury-gold/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">

        <p className="uppercase tracking-[0.45em] text-xs text-luxury-gold mb-5">

          Stay Inspired

        </p>

        <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-8">

          Join Our Journal

        </h2>

        <p className="text-gray-300 text-lg leading-8 max-w-2xl mx-auto mb-12">

          Be the first to discover new fragrance collections,
          candle care tips, seasonal inspiration,
          exclusive offers, and stories from our world.

        </p>

        <form
          onSubmit={handleSubmit}
          className="max-w-2xl mx-auto"
        >

          <div className="flex flex-col sm:flex-row gap-4">

            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 rounded-full px-7 py-4 bg-white outline-none border border-transparent focus:border-luxury-gold"
            />

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-luxury-gold text-white px-8 py-4 hover:bg-[#B8913F] transition duration-300"
            >

              Subscribe

              <FaPaperPlane />

            </button>

          </div>

        </form>

        <p className="text-gray-400 text-sm mt-8">

          We respect your privacy. No spam, only beautiful stories and exclusive updates.

        </p>

      </div>

    </section>
  );
}