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
    bg-white
    overflow-hidden
    border border-[#D9C7A7]/20
    hover:border-[#C5A880]
    transition-all duration-700
    hover:-translate-y-2
    hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)]
  "
>
  {/* Media */}
  <div className="relative h-[500px] overflow-hidden">
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
        duration-1000
        group-hover:scale-110
      "
    />

    {/* Luxury Gradient Overlay */}
    <div
      className="
        absolute inset-0
        bg-gradient-to-t
        from-black/60
        via-black/10
        to-transparent
      "
    />

    {/* Category Name Overlay */}
    <div className="absolute bottom-8 left-8 z-10">
      <p className="text-[#C5A880] uppercase tracking-[0.3em] text-xs mb-3">
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
  <div className="p-8">
    <p
      className="
        text-[#6C6C6C]
        text-sm
        leading-relaxed
        tracking-wide
        font-light
      "
    >
      {item.subtitle}
    </p>

    <div className="flex items-center justify-between mt-8">
      <span
        className="
          text-[11px]
          uppercase
          tracking-[0.3em]
          text-[#C5A880]
        "
      >
        Explore Collection
      </span>

      <span
        className="
          text-[#C5A880]
          text-xl
          transition-transform
          duration-500
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