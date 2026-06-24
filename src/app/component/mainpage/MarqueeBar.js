import React from "react"
import { FaTruck, FaUndo, FaTag } from "react-icons/fa"
import { MdLocationOn } from "react-icons/md"

const MarqueeBar = () => {
  const items = [
    { icon: <FaUndo className="text-luxury-gold" />, text: "6 Days Easy Return" },
    { icon: <MdLocationOn className="text-luxury-gold" />, text: "Cash On Delivery Available" },
    { icon: <FaTruck className="text-luxury-gold" />, text: "Free Domestic Shipping" },
    { icon: <FaTag className="text-luxury-gold" />, text: "EMI Option Available" },
  ]

  const row = (
    <div className="flex items-center gap-16 whitespace-nowrap">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 text-xs tracking-[0.2em] font-light uppercase mx-8 text-luxury-cream/90"
        >
          <span className="text-sm">{item.icon}</span>
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  )

  return (
    <div className="fixed top-0 left-0 w-full bg-luxury-dark text-luxury-cream py-3 overflow-hidden z-50 border-b border-luxury-gold/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex animate-marquee hover:[animation-play-state:paused]">
          {row}
          {row}
        </div>
      </div>
    </div>
  )
}

export default MarqueeBar