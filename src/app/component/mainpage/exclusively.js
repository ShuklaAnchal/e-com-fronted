"use client";

import {
  FaGift,
  FaShippingFast,
  FaBoxOpen,
} from "react-icons/fa";
import { MdLocalOffer } from "react-icons/md";

const benefits = [
  {
    id: 1,
    title: "EXCLUSIVE OFFERS",
    icon: <MdLocalOffer size={34} />,
  },
  {
    id: 2,
    title: "FREE SAMPLES",
    icon: <FaBoxOpen size={32} />,
  },
  {
    id: 3,
    title: "FREE SHIPPING",
    icon: <FaShippingFast size={34} />,
  },
  {
    id: 4,
    title: "PERSONALIZED GIFTING",
    icon: <FaGift size={32} />,
  },
];

export default function BenefitsSection() {
  return (
    <section className="bg-[#1b1b1b] text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Top Heading */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <div className="h-px w-24 bg-gray-500" />
          <p className="uppercase tracking-[4px] text-sm text-gray-300 whitespace-nowrap">
            Exclusively on Siyass.com
          </p>
          <div className="h-px w-24 bg-gray-500" />
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {benefits.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              <div className="w-20 h-20 rounded-full border border-gray-400 flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-black">
                {item.icon}
              </div>

              <h3 className="mt-6 text-sm md:text-base tracking-[3px] font-light">
                {item.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}