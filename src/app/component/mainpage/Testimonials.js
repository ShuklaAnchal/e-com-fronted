"use client";

import React, { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Deepika Shindey",
    image: "/images/testimonial-1.jpg",
    review:
      "Kimirica Gifting Studio at Kalpatru, Grandeur store has my heart! 💖 Stepping inside feels like walking into a little world of luxury. ✨",
  },
  {
    id: 2,
    name: "Priya Sharma",
    image: "/images/testimonial-2.jpg",
    review:
      "Absolutely loved the experience! Everything feels so elegant, premium and beautifully curated. ✨",
  },
  {
    id: 3,
    name: "Ananya Kapoor",
    image: "/images/testimonial-3.jpg",
    review:
      "The perfect place for beautiful gifts. The quality and presentation are simply amazing! 💕",
  },
  {
    id: 4,
    name: "Riya Mehta",
    image: "/images/testimonial-4.jpg",
    review:
      "Such a beautiful gifting experience. Every little detail feels luxurious and thoughtfully designed.",
  },
  {
    id: 5,
    name: "Aarushi Singh",
    image: "/images/testimonial-5.jpg",
    review:
      "I absolutely loved the collection. The packaging, quality and overall experience were wonderful. ❤️",
  },
  {
    id: 6,
    name: "Megha Jain",
    image: "/images/testimonial-6.jpg",
    review:
      "A gorgeous place for gifting. Everything looks elegant, sophisticated and premium.",
  },
  {
    id: 7,
    name: "Shreya Gupta",
    image: "/images/testimonial-7.jpg",
    review:
      "Beautiful products and an amazing experience. Definitely coming back again! ✨",
  },
  {
    id: 8,
    name: "Kavya Malhotra",
    image: "/images/testimonial-8.jpg",
    review:
      "The attention to detail is incredible. It truly feels like stepping into a little world of luxury.",
  },
  {
    id: 9,
    name: "Nisha Verma",
    image: "/images/testimonial-9.jpg",
    review:
      "Elegant, premium and beautifully presented. Loved every bit of the experience! 💖",
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto flex min-h-[520px] w-full max-w-[1720px] flex-col items-center px-5 py-14 sm:px-8 sm:py-16 md:px-12 lg:px-16">

        {/* Heading */}
        <h2
          className="
            text-center
            text-[24px]
            font-normal
            uppercase
            tracking-[0.18em]
            text-[#111]
            sm:text-[26px]
            md:text-[27px]
          "
        >
          Testimonials
        </h2>

        {/* Stars */}
        <div className="mt-12 flex items-center justify-center gap-[8px]">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className="
                text-[20px]
                leading-none
                text-[#FFB800]
                sm:text-[21px]
              "
            >
              ★
            </span>
          ))}
        </div>

        {/* Review */}
        <div className="mt-8 flex min-h-[72px] w-full max-w-[950px] items-center justify-center">
          <p
            className="
              text-center
              text-[15px]
              font-normal
              leading-[1.8]
              tracking-[0.01em]
              text-[#222]
              sm:text-[16px]
              md:text-[17px]
            "
          >
            {activeTestimonial.review}
          </p>
        </div>

        {/* Customer Image */}
        <div className="mt-8 flex flex-col items-center">
          <div
            className="
              relative
              h-[100px]
              w-[100px]
              overflow-hidden
              rounded-full
              sm:h-[102px]
              sm:w-[102px]
            "
          >
            <Image
              src={activeTestimonial.image}
              alt={activeTestimonial.name}
              fill
              sizes="102px"
              className="object-cover"
            />
          </div>

          {/* Customer Name */}
          <p
            className="
              mt-4
              text-[15px]
              font-normal
              tracking-[0.01em]
              text-[#111]
            "
          >
            {activeTestimonial.name}
          </p>
        </div>

        {/* Slider Dots */}
        <div className="mt-10 flex items-center justify-center gap-[15px]">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              aria-label={`Go to testimonial ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`
                h-[7px]
                w-[7px]
                rounded-full
                transition-all
                duration-300
                ${
                  activeIndex === index
                    ? "scale-110 bg-[#222]"
                    : "bg-[#b8b8b8] hover:bg-[#777]"
                }
              `}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;