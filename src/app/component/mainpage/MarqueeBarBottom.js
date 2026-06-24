const MarqueeBarBottom = () => {
  const outline1 = "CLEAN BURN. TOXIN‑FREE."
  const main = "100% NATURAL SOY SCENTED CANDLES"
  const outline2 = "ELEVATE EVERY ROOM WITH GENTLE AROMA."

  return (
    <div className="bg-[#CFA36F] w-full overflow-hidden bg-white border-y border-gray-200">
      <div className="py-4">
        <div className="flex animate-marquee">
          <div className="flex whitespace-nowrap">
            <span className="mx-10 text-[22px] md:text-[32px] tracking-[0.25em]">
              <span className="font-normal text-transparent stroke-text">
                {outline1}
              </span>
              <span className="mx-10 font-semibold text-black">
                {main}
              </span>
              <span className="font-normal text-transparent stroke-text">
                {outline2}
              </span>
            </span>
          </div>

          <div className="flex whitespace-nowrap">
            <span className="mx-10 text-[22px] md:text-[32px] tracking-[0.25em]">
              <span className="font-normal text-transparent stroke-text">
                {outline1}
              </span>
              <span className="mx-10 font-semibold text-black">
                {main}
              </span>
              <span className="font-normal text-transparent stroke-text">
                {outline2}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarqueeBarBottom