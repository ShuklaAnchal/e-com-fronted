"use client";

const videos = [
  "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
  "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
   "https://v1.pinimg.com/videos/mc/720p/6d/a0/fa/6da0fa70eb2ac7b781652a97b3c3be18.mp4",
];

export default function MomentsWithSiyaas() {
  return (
    <section className="py-32 bg-[#F8F4EE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.5em] uppercase text-[#C5A880] mb-5">
            Siyaas Community
          </p>

          <h2 className="font-serif text-4xl md:text-6xl font-light text-[#1A1A1A] leading-tight">
            Moments With Siyaas
          </h2>

          <div className="w-24 h-px bg-[#C5A880] mx-auto my-8" />

          <p className="max-w-2xl mx-auto text-[#6C6C6C] text-base md:text-lg leading-8 font-light">
            Discover how our handcrafted fragrances become part of daily
            rituals, transforming ordinary spaces into warm and memorable
            experiences.
          </p>
        </div>

        {/* Video Layout */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Large Feature Video */}
          <div className="lg:col-span-2 group">
            <div className="overflow-hidden bg-white shadow-sm">
              <video
                src={videos[0]}
                autoPlay
                muted
                loop
                playsInline
                className="
                  w-full
                  h-[500px]
                  md:h-[700px]
                  object-cover
                  transition-transform
                  duration-1000
                  group-hover:scale-105
                "
              />
            </div>
          </div>

          {/* Side Videos */}
          <div className="flex flex-col gap-8">
            <div className="overflow-hidden bg-white group shadow-sm">
              <video
                src={videos[1]}
                autoPlay
                muted
                loop
                playsInline
                className="
                  w-full
                  h-[240px]
                  md:h-[335px]
                  object-cover
                  transition-transform
                  duration-1000
                  group-hover:scale-105
                "
              />
            </div>

            <div className="overflow-hidden bg-white group shadow-sm">
              <video
                src={videos[2]}
                autoPlay
                muted
                loop
                playsInline
                className="
                  w-full
                  h-[240px]
                  md:h-[335px]
                  object-cover
                  transition-transform
                  duration-1000
                  group-hover:scale-105
                "
              />
            </div>
          </div>
        </div>

        {/* Brand Quote */}
        <div className="max-w-5xl mx-auto text-center mt-28">
          <p className="font-serif italic text-2xl md:text-5xl text-[#1A1A1A] leading-relaxed">
            “Luxury is not simply what you see,
            <br />
            but what you feel long after the moment has passed.”
          </p>

          <div className="w-20 h-px bg-[#C5A880] mx-auto my-8" />

          <p className="uppercase tracking-[0.4em] text-xs text-[#C5A880]">
            Siyaas
          </p>
        </div>

        {/* Brand Values */}
        <div className="grid md:grid-cols-3 gap-10 mt-32">
          <div className="text-center">
            <h3 className="font-serif text-2xl text-[#1A1A1A] mb-4">
              Handcrafted
            </h3>

            <p className="text-[#6C6C6C] leading-8 font-light">
              Every creation is carefully poured and finished by hand to ensure
              exceptional quality and attention to detail.
            </p>
          </div>

          <div className="text-center">
            <h3 className="font-serif text-2xl text-[#1A1A1A] mb-4">
              Premium Fragrance
            </h3>

            <p className="text-[#6C6C6C] leading-8 font-light">
              Thoughtfully curated fragrance compositions designed to elevate
              the atmosphere of every space.
            </p>
          </div>

          <div className="text-center">
            <h3 className="font-serif text-2xl text-[#1A1A1A] mb-4">
              Timeless Design
            </h3>

            <p className="text-[#6C6C6C] leading-8 font-light">
              Elegant forms and refined aesthetics created to complement modern
              interiors and meaningful rituals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}