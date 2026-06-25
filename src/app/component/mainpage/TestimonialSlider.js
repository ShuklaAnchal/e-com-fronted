"use client";

const videos = [
  "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
];

export default function MomentsWithSiyaas() {
  return (
    <section className="py-32 bg-[#FAF7F2] overflow-hidden border-b border-[#C5A880]/10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.5em] uppercase text-[#C5A880] mb-5 font-light">
            Siyaas Community
          </p>

          <h2 className="font-serif text-3xl md:text-5xl font-light text-[#1A1A1A] leading-tight uppercase tracking-wider">
            Moments With Siyaas
          </h2>

          <div className="w-24 h-px bg-[#C5A880] mx-auto my-8" />

          <p className="max-w-2xl mx-auto text-[#6C6C6C] text-sm leading-8 font-light tracking-wide font-sans">
            Discover how our handcrafted fragrances become part of daily
            rituals, transforming ordinary spaces into warm and memorable
            experiences.
          </p>
        </div>

        {/* Video Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Large Feature Video */}
          <div className="lg:col-span-2 group cursor-pointer">
            <div className="overflow-hidden bg-[#FAF7F2] border border-[#C5A880]/10 p-2 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-[#C5A880]/40">
              <video
                src={videos[0]}
                autoPlay
                muted
                loop
                playsInline
                className="
                  w-full
                  h-[400px]
                  md:h-[600px]
                  object-cover
                  transition-transform
                  duration-[1.5s]
                  ease-[cubic-bezier(0.25,1,0.5,1)]
                  group-hover:scale-[1.02]
                "
              />
            </div>
          </div>

          {/* Side Videos */}
          <div className="flex flex-col gap-8">
            <div className="overflow-hidden bg-[#FAF7F2] border border-[#C5A880]/10 p-1.5 group cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-[#C5A880]/40">
              <video
                src={videos[1]}
                autoPlay
                muted
                loop
                playsInline
                className="
                  w-full
                  h-[190px]
                  md:h-[285px]
                  object-cover
                  transition-transform
                  duration-[1.5s]
                  ease-[cubic-bezier(0.25,1,0.5,1)]
                  group-hover:scale-[1.02]
                "
              />
            </div>

            <div className="overflow-hidden bg-[#FAF7F2] border border-[#C5A880]/10 p-1.5 group cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-[#C5A880]/40">
              <video
                src={videos[2]}
                autoPlay
                muted
                loop
                playsInline
                className="
                  w-full
                  h-[190px]
                  md:h-[285px]
                  object-cover
                  transition-transform
                  duration-[1.5s]
                  ease-[cubic-bezier(0.25,1,0.5,1)]
                  group-hover:scale-[1.02]
                "
              />
            </div>
          </div>
        </div>

        {/* Brand Quote */}
        <div className="max-w-5xl mx-auto text-center mt-28">
          <p className="font-serif italic text-xl md:text-3xl font-extralight text-[#1A1A1A] leading-relaxed max-w-4xl mx-auto">
            “Luxury is not simply what you see,
            <br />
            but what you feel long after the moment has passed.”
          </p>

          <div className="w-20 h-px bg-[#C5A880] mx-auto my-8" />

          <p className="uppercase tracking-[0.4em] text-[10px] text-[#C5A880] font-light">
            Siyaas
          </p>
        </div>

        {/* Brand Values */}
        <div className="grid md:grid-cols-3 gap-10 mt-32">
          <div className="text-center border-t border-[#C5A880]/20 pt-8 px-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-[#C5A880]/50 hover:-translate-y-1">
            <span className="block text-[#C5A880] text-xs uppercase tracking-[0.3em] font-light mb-3">
              01 / Process
            </span>
            <h3 className="font-serif text-lg text-[#1A1A1A] mb-4 uppercase tracking-[0.1em]">
              Handcrafted
            </h3>

            <p className="text-[#6C6C6C] text-xs leading-7 font-light font-sans tracking-wide">
              Every creation is carefully poured and finished by hand to ensure
              exceptional quality and attention to detail.
            </p>
          </div>

          <div className="text-center border-t border-[#C5A880]/20 pt-8 px-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-[#C5A880]/50 hover:-translate-y-1">
            <span className="block text-[#C5A880] text-xs uppercase tracking-[0.3em] font-light mb-3">
              02 / Quality
            </span>
            <h3 className="font-serif text-lg text-[#1A1A1A] mb-4 uppercase tracking-[0.1em]">
              Premium Fragrance
            </h3>

            <p className="text-[#6C6C6C] text-xs leading-7 font-light font-sans tracking-wide">
              Thoughtfully curated fragrance compositions designed to elevate
              the atmosphere of every space.
            </p>
          </div>

          <div className="text-center border-t border-[#C5A880]/20 pt-8 px-4 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] hover:border-[#C5A880]/50 hover:-translate-y-1">
            <span className="block text-[#C5A880] text-xs uppercase tracking-[0.3em] font-light mb-3">
              03 / Design
            </span>
            <h3 className="font-serif text-lg text-[#1A1A1A] mb-4 uppercase tracking-[0.1em]">
              Timeless Design
            </h3>

            <p className="text-[#6C6C6C] text-xs leading-7 font-light font-sans tracking-wide">
              Elegant forms and refined aesthetics created to complement modern
              interiors and meaningful rituals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
