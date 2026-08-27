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
    icon: <MdLocalOffer />,
  },
  {
    id: 2,
    title: "FREE SAMPLES",
    icon: <FaBoxOpen />,
  },
  {
    id: 3,
    title: "FREE SHIPPING",
    icon: <FaShippingFast />,
  },
  {
    id: 4,
    title: "PERSONALIZED GIFTING",
    icon: <FaGift />,
  },
];

export default function BenefitsSection() {
  return (
    <section className="bg-[#1b1b1b] text-white py-10 md:py-16">

      <div className="max-w-7xl mx-auto px-4 md:px-6">


        {/* Heading */}

        <div className="
          flex 
          items-center 
          justify-center 
          gap-3 
          md:gap-4 
          mb-10 
          md:mb-16
        ">

          <div className="h-px w-10 md:w-24 bg-gray-500" />

          <p
            className="
            uppercase
            tracking-[2px]
            md:tracking-[4px]
            text-[10px]
            md:text-sm
            text-gray-300
            whitespace-nowrap
            "
          >
            Exclusively on Siyaas.in
          </p>

          <div className="h-px w-10 md:w-24 bg-gray-500" />

        </div>



        {/* Benefits */}

        <div
          className="
          grid
          grid-cols-2
          lg:grid-cols-4
          gap-y-8
          gap-x-4
          md:gap-12
          "
        >

          {benefits.map((item) => (

            <div
              key={item.id}
              className="
              flex
              flex-col
              items-center
              text-center
              group
              cursor-pointer
              "
            >

              {/* Icon */}

              <div
                className="
                w-12
                h-12
                md:w-20
                md:h-20
                rounded-full
                border
                border-gray-400
                flex
                items-center
                justify-center
                text-white
                transition-all
                duration-300
                group-hover:bg-white
                group-hover:text-black
                "
              >

                <span className="
                  text-xl
                  md:text-3xl
                ">
                  {item.icon}
                </span>

              </div>



              {/* Title */}

              <h3
                className="
                mt-3
                md:mt-6
                text-[10px]
                md:text-base
                tracking-[1.5px]
                md:tracking-[3px]
                font-light
                leading-tight
                "
              >
                {item.title}
              </h3>


            </div>

          ))}

        </div>

      </div>

    </section>
  );
}