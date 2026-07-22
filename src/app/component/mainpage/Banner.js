import React from "react";
import Image from "next/image";

const Banner = () => {
  return (
    <div className="relative h-[90vh] w-full mt-3 md:mt-8">
      <Image
        src="/banner.png"
        alt="Banner"
        fill
        priority
        className="object-cover"
      />
    </div>
  );
};

export default Banner;