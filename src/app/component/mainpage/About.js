"use client";

import Image from "next/image";

const About = () => {
  return (
    <section id="about" className="bg-[#FAF7F2] py-32 overflow-hidden border-b border-[#C5A880]/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top */}
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-[#C5A880] uppercase tracking-[0.5em] text-xs mb-6 font-light">
            The Siyaas Philosophy
          </p>

          <h2 className="text-3xl md:text-5xl font-serif font-light leading-tight text-[#1A1A1A] uppercase tracking-wider">
            Crafted To Transform
            <br />
            Moments Into Rituals
          </h2>

          <div className="w-24 h-px bg-[#C5A880]/30 mx-auto my-10"></div>

          <p className="text-[#6C6C6C] text-sm leading-8 font-light max-w-3xl mx-auto font-sans tracking-wide">
            Siyaas was born from a simple belief —
            fragrance should not merely scent a room,
            it should shape an experience.
            <br className="hidden md:inline" />
            Every candle, diffuser, and handcrafted creation
            is designed to bring warmth, stillness, and
            elegance into everyday living.
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative mt-24 border border-[#C5A880]/15 p-2 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-[#C5A880]/40 group cursor-pointer">
          <div className="aspect-[16/8] overflow-hidden relative w-full h-[280px] md:h-[480px]">
            <Image
              src="/banner2.png"
              alt="Luxury Candles"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-102"
            />
          </div>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-12 mt-24">
          <div className="text-center border-t border-[#C5A880]/20 pt-8 px-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-[#C5A880]/50 hover:-translate-y-1">
            <div className="text-[#C5A880] text-3xl font-light font-sans mb-4">01</div>

            <h3 className="font-serif text-lg text-[#1A1A1A] mb-4 uppercase tracking-[0.1em] font-light">
              Handcrafted
            </h3>

            <p className="text-[#6C6C6C] text-xs leading-7 font-light font-sans tracking-wide">
              Every piece is poured, finished and
              curated with meticulous attention
              to detail.
            </p>
          </div>

          <div className="text-center border-t border-[#C5A880]/20 pt-8 px-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-[#C5A880]/50 hover:-translate-y-1">
            <div className="text-[#C5A880] text-3xl font-light font-sans mb-4">02</div>

            <h3 className="font-serif text-lg text-[#1A1A1A] mb-4 uppercase tracking-[0.1em] font-light">
              Natural Ingredients
            </h3>

            <p className="text-[#6C6C6C] text-xs leading-7 font-light font-sans tracking-wide">
              Premium soy wax, refined fragrance
              oils and carefully selected materials
              create a cleaner experience.
            </p>
          </div>

          <div className="text-center border-t border-[#C5A880]/20 pt-8 px-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-[#C5A880]/50 hover:-translate-y-1">
            <div className="text-[#C5A880] text-3xl font-light font-sans mb-4">03</div>

            <h3 className="font-serif text-lg text-[#1A1A1A] mb-4 uppercase tracking-[0.1em] font-light">
              Timeless Luxury
            </h3>

            <p className="text-[#6C6C6C] text-xs leading-7 font-light font-sans tracking-wide">
              Designed to complement modern interiors
              while preserving the charm of artisanal
              craftsmanship.
            </p>
          </div>
        </div>

        {/* Quote */}
        <div className="max-w-4xl mx-auto text-center mt-32">
          <p className="font-serif italic text-xl md:text-3xl font-extralight text-[#1A1A1A] leading-relaxed max-w-4xl mx-auto">
            “Luxury is not about excess.
            It is about creating beauty
            in the moments we live every day.”
          </p>

          <div className="mt-10">
            <span className="text-[#C5A880] uppercase tracking-[0.4em] text-xs font-light">
              Siyaas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;