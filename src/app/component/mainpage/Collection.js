"use client";

import { useRouter } from "next/navigation";

const categories = [
  {
    title: "Candles",
    subtitle: "Pure soy wax & crackling wood wicks",
    youtube: "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  },
  {
    title: "Diffusers",
    subtitle: "Delicate botanicals & continuous throw",
    youtube: "https://v1.pinimg.com/videos/mc/720p/fa/24/0d/fa240df0d8ded9098812e770dc99f587.mp4",
  },
  {
    title: "Wooden Crafts",
    subtitle: "Meticulously carved heritage mandalas",
     youtube: "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  },
];

const Collection = () => {
  const router = useRouter();

  return (
    <section className="w-full py-24 bg-luxury-cream border-b border-luxury-gold/10">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs tracking-[0.4em] text-luxury-gold font-light mb-3 uppercase">
          CURATED EDITIONS
        </p>
        <h2 className="text-center text-3xl sm:text-5xl font-serif font-extralight tracking-[0.1em] mb-4 text-luxury-dark uppercase">
          Our Collection
        </h2>

        <p className="text-center font-serif italic text-luxury-gold-dark/70 mb-16 text-base tracking-wider font-light">
          Slow-crafted aromatics and artisanal design.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {categories.map((item) => (
            <div
              key={item.title}
              onClick={() =>
                router.push(`/categories/${item.title.toLowerCase()}`)
              }
              className="
                group
                cursor-pointer
                bg-[#FAF7F2]
                overflow-hidden
                border border-[#C5A880]/10
                transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                hover:-translate-y-2.5
                hover:border-[#C5A880]/40
                hover:shadow-[0_20px_50px_rgba(197,168,128,0.08)]
              "
            >
              {/* Media */}
              <div className="relative h-[480px] overflow-hidden">
                <video
                  src={item.youtube}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="
                    absolute inset-0
                    w-full
                    h-full
                    object-cover
                    transition-transform
                    duration-[1.5s]
                    ease-[cubic-bezier(0.25,1,0.5,1)]
                    group-hover:scale-105
                  "
                />

                {/* Luxury Gradient Overlay */}
                <div
                  className="
                    absolute inset-0
                    bg-gradient-to-t
                    from-black/75
                    via-black/20
                    to-transparent
                    transition-opacity
                    duration-500
                    group-hover:opacity-90
                  "
                />

                {/* Category Name Overlay */}
                <div className="absolute bottom-8 left-8 z-10 transition-transform duration-500 group-hover:translate-y-[-4px]">
                  <p className="text-[#C5A880] uppercase tracking-[0.3em] text-[10px] mb-2 font-light">
                    Collection
                  </p>

                  <h3
                    className="
                      text-white
                      text-2xl
                      md:text-3xl
                      font-serif
                      tracking-[0.15em]
                      uppercase
                      font-light
                    "
                  >
                    {item.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 bg-[#FAF7F2] transition-colors duration-500 group-hover:bg-[#F4EFEA]">
                <p
                  className="
                    text-[#6C6C6C]
                    text-xs
                    leading-relaxed
                    tracking-wider
                    font-light
                    h-12
                    line-clamp-2
                  "
                >
                  {item.subtitle}
                </p>

                <div className="flex items-center justify-between mt-8 border-t border-[#C5A880]/10 pt-6">
                  <span
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.3em]
                      text-[#C5A880]
                      font-light
                      relative
                      after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-px after:bg-[#C5A880] after:scale-x-0 after:origin-right after:transition-transform after:duration-500 group-hover:after:scale-x-100 group-hover:after:origin-left
                    "
                  >
                    Explore Collection
                  </span>

                  <span
                    className="
                      text-[#C5A880]
                      text-lg
                      transition-transform
                      duration-500
                      ease-[cubic-bezier(0.25,1,0.5,1)]
                      group-hover:translate-x-2
                    "
                  >
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Collection;