"use client";

import Image from "next/image";

const About = () => {
  return (
    <section className="bg-[#F8F4EE] py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-[#C5A880] uppercase tracking-[0.5em] text-xs mb-6">
            The Siyaas Philosophy
          </p>

          <h2 className="text-4xl md:text-6xl font-serif font-light leading-tight text-[#1A1A1A]">
            Crafted To Transform
            <br />
            Moments Into Rituals
          </h2>

          <div className="w-24 h-px bg-[#C5A880] mx-auto my-10"></div>

          <p className="text-[#6B6B6B] text-lg leading-9 font-light">
            Siyaas was born from a simple belief —
            fragrance should not merely scent a room,
            it should shape an experience.

            Every candle, diffuser and handcrafted creation
            is designed to bring warmth, stillness and
            elegance into everyday living.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative mt-24">
          <div className="aspect-[16/8] overflow-hidden">
            <Image
              src="/banner2.png"
              alt="Luxury Candles"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-12 mt-24">
          <div className="text-center">
            <div className="text-[#C5A880] text-5xl mb-6">01</div>

            <h3 className="font-serif text-2xl text-[#1A1A1A] mb-4">
              Handcrafted
            </h3>

            <p className="text-[#666] leading-8">
              Every piece is poured, finished and
              curated with meticulous attention
              to detail.
            </p>
          </div>

          <div className="text-center">
            <div className="text-[#C5A880] text-5xl mb-6">02</div>

            <h3 className="font-serif text-2xl text-[#1A1A1A] mb-4">
              Natural Ingredients
            </h3>

            <p className="text-[#666] leading-8">
              Premium soy wax, refined fragrance
              oils and carefully selected materials
              create a cleaner experience.
            </p>
          </div>

          <div className="text-center">
            <div className="text-[#C5A880] text-5xl mb-6">03</div>

            <h3 className="font-serif text-2xl text-[#1A1A1A] mb-4">
              Timeless Luxury
            </h3>

            <p className="text-[#666] leading-8">
              Designed to complement modern interiors
              while preserving the charm of artisanal
              craftsmanship.
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className="max-w-4xl mx-auto text-center mt-32">
          <p className="font-serif italic text-3xl md:text-5xl text-[#1A1A1A] leading-relaxed">
            “Luxury is not about excess.
            It is about creating beauty
            in the moments we live every day.”
          </p>

          <div className="mt-10">
            <span className="text-[#C5A880] uppercase tracking-[0.4em] text-xs">
              Siyaas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;