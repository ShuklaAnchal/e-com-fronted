"use client";

import React, { useState } from "react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Shubham Sharma",
    rating: 5,
    review:
      "I recently tried the Oud Rose reed diffuser from Siyaas Candles for my room, and it has completely elevated the vibe of my space. It’s long-lasting, not overpowering, and creates a calm, luxurious atmosphere every time I walk in.",
    date: "11 months ago",
    photos: [
      "https://lh3.googleusercontent.com/grass-cs/ACvplmPcwMasY8_i8g3HZfKaSdDXNZ56KrNNkUBKSM9Ro3_xRqbeQo9WAvhWTw0ZLmvSqfG-sQk00EbbWW5ime3uBhqXUJjmRJ2uMyxxBF2D_D1uQ5j-HXuK9CU1CiAJFMhET-Sh88bf0d2S80s=s138-p-k-rw",
      "https://lh3.googleusercontent.com/grass-cs/ACvplmNf2lCtiqH1mUbHleqxBSkQ_nponZi2lI-EC-p4am-CiSS_0e0aRpKJ89YmzbNWne1xXWq4SD8rGrd8rC3cT852MiKfUyuSlVS6wYc-MOsAZyrSfPRay5bpmHp_K9CPq1M_ja_JfFa_w2c=s138-p-k-rw",
    ],
  },
  {
    id: 2,
    name: "Urvashi",
    rating: 5,
    review:
      "I’m a huge fan of candles, and aromatherapy has always been my go to for peace and relaxation. Siyaas candles have truly won me over this is already my second purchase! The fragrances are soothing, the designs are adorable, and the quality is amazing.",
    date: "a year ago",
    photos: [
      "https://lh3.googleusercontent.com/grass-cs/ACvplmOOaDElY--NngNZgHmcgStOv75ptPz89WAdM1bdZpaqGEI9dnByFT68Kgr2-z3yKakkS8AzlwHHKKjM_sJgWibqje_f_Sgm_n9xT743JkmiIRMyR9AFcen3LJaNeehuI6uHQBCOhJitZaI8=s138-p-k-rw",
      "https://lh3.googleusercontent.com/grass-cs/ACvplmNM9JZND4kKLGNtfp-C_PRIouCe1SEBy49E7CBDYydOmdQxq0gwke3pRI-9UHYgma_UE2ZpPYs12fZGtVkvTnuuLbDXrxmrFoJe-ocxE8Hy0hvrOmF-uBUo-RWd52R1aQgXJo5dCtydRPaQ=s138-p-k-rw",
    ],
  },
  {
    id: 3,
    name: "Riya Samanta",
    rating: 5,
    review:
      "Your vanilla fragrance candle smells sooo warm and calming. The fragrance is really soft, sweet, and cozy — it honestly made the whole vibe feel relaxing. Out of all the candles, the vanilla one was my favorite!",
    date: "2 months ago",
    photos: [],
  },
  {
    id: 4,
    name: "Aditya Soni",
    rating: 5,
    review:
      "Siyaas ka Body Butter Wax bahut smooth hai! winter me skin bilkul dry nahi hoti. Fragrance bhi soft aur premium hai.",
    date: "8 months ago",
    photos: [
      "https://lh3.googleusercontent.com/grass-cs/ACvplmM1Uy3C_ZSaLYTVr40hXZrYDBATDmGOHo16wvvqdCsVzsS72bTz3YI0iuIA-prYmgV58KWEP7UeTLxvefsf9eloUjQLXMzBb7an8-s13noByiwYynY4P0sGb3F1Xsv501IC-OWeuXZ6U-Dh=s138-p-k-rw",
    ],
  },
  {
    id: 5,
    name: "Manju Vishwakarma",
    rating: 5,
    review:
      "Gift hampers from Siyaas bahut premium quality ke hote hain. Packaging elegant hai aur candles ki fragrance long-lasting hai. Highly recommended.",
    date: "11 months ago",
    photos: [
      "https://lh3.googleusercontent.com/grass-cs/ACvplmOko2Y5EW9XYYPIoyCgYagrqmnMZki6ev8edIyfXMYumr4-EAsWbFw7QwFFXpeXvgK4HaVRS8BRSDvZsV5W3aa-gVqv8v_0Dn49GLC7UpnUloJCyZNcSMtAlAh0ovUxut1xF0NouaErw2dr=s138-p-k-rw",
    ],
  },
  {
    id: 6,
    name: "Neetesh Vishwakarma",
    rating: 5,
    review:
      "Siyaas festive gift hampers beautifully curated hain. Handmade candles aur premium dry fruits ka combo kaafi impressive hai.",
    date: "11 months ago",
    photos: [
      "https://lh3.googleusercontent.com/grass-cs/ACvplmNKsWTsSvhUbMXq9X0jKZgnlhTn6nzy8eQqqjMszxxHAPLqHYgYVqLcUXhpkTjzXiqBawHfpPRj2k6TR8Wn8HLJLDeVirWRvcKeBDvvi1V5vMbtc2ET-sxlfL9erG8jy9EvdSZsY7b--APP=s138-p-k-rw",
    ],
  },
  {
    id: 7,
    name: "Shraddha Mishra",
    rating: 5,
    review:
      "Very happy with the product of siyaas candle. I absolutely loved the fragrance. It's fragrance is quite refreshing and lasts long. Also the design is pretty with good quality. Amazing product at this price and worth buying.",
    date: "a year ago",
    photos: [
      "https://lh3.googleusercontent.com/grass-cs/ACvplmOX2keoiIM-CMIR5YXD_IxvV9XjIHB0LhyXjzGvRPEyXlb_zTRBcVy7PHok5e-InhLP4t-I-BvwlyZig1CmQfpZmoozMHxrAuYLT3Qu3q-15dfB_P1ZtHNBMpIF1qncopySDyzedX10sNLd=s138-p-k-rw",
      "https://lh3.googleusercontent.com/grass-cs/ACvplmMqipNiOhWE4tPYwB-e1JZXMfkqgqm_CvaguV_10Bzir335n_YliauAFKetZUVqiX8bPwT7GeiWmMsAA_J0JvldYe9ZXSO2CuZs57lUgEwTVfQ8w75wegtTaQFudmV2Kq2lFNCikWWHn7_C=s138-p-k-rw",
    ],
  },
  {
    id: 8,
    name: "Deepika Sharma",
    rating: 5,
    review:
      "Mujhe hamesha ek premium home fragrance chahiye hota tha, SIYAAS ka luxury reed diffuser bilkul perfect nikla.",
    date: "11 months ago",
    photos: [
      "https://lh3.googleusercontent.com/grass-cs/ACvplmMWrHSsbbdiza-WAYoe6o9sS-wVHlyMrGH5BRa_G13zKPyzFyPIjCXLp2fQYwtm4KrvHKXgAC0a9ZpVKgm8lzU-vvDA_mHbXseNZwWBjZVtfN83EQSUJDrzxwbO4TeMu3AiNzWhxbGMty=s138-p-k-rw",
    ],
  },
  {
    id: 9,
    name: "Sujal Rathore",
    rating: 5,
    review:
      "Flower shaped Siyaas candle bahut unique hai. Gifting ke liye classy aur attractive option hai.",
    date: "10 months ago",
    photos: [],
  },
  {
    id: 10,
    name: "Chhotu Vishwakarma",
    rating: 5,
    review:
      "Mene meri shop area m use kiya siyaas ka room diffuser bhut h elegant fragrance hain.",
    date: "10 months ago",
    photos: [
      "https://lh3.googleusercontent.com/grass-cs/ACvplmO5VGgK-LQAvGVl3cusGCHi-olKfh2xdgT0HZu1MMoTES8ic4xUnfayIL5AP3sNWeAUkuXh4OODq6b0MiG3XX_GpjrvcmEDSCqaWoiZbbBsVv4zKQD_ftt3M0pmjoeYPmo5-gumKhCUD0eJ=s138-p-k-rw",
    ],
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
          Customer Reviews
        </h2>

        {/* Google Rating */}
      {/* Google Rating */}
<div className="mt-8 flex flex-col items-center">
  <div className="flex items-center gap-4">
    {/* Rating Number */}
    <span className="font-serif text-[42px] font-light leading-none text-[#111]">
      4.8
    </span>

    {/* Stars + Reviews */}
    <div className="flex flex-col">
      <div className="flex items-center gap-[3px]">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className="text-[18px] leading-none text-[#B89455]"
          >
            ★
          </span>
        ))}
      </div>

      <p className="mt-2 text-[12px] tracking-[0.04em] text-[#777]">
        Based on 52 Google Reviews
      </p>
    </div>
  </div>

  {/* Google Review Label */}
  <div className="mt-4 flex items-center gap-2">
    <span className="h-px w-8 bg-[#d8d2c9]" />

    <span className="text-[10px] uppercase tracking-[0.22em] text-[#999]">
      Google Rating
    </span>

    <span className="h-px w-8 bg-[#d8d2c9]" />
  </div>
</div>

        {/* Review */}
        <div className="mt-8 flex min-h-[100px] w-full max-w-[950px] items-center justify-center">
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
            “{activeTestimonial.review}”
          </p>
        </div>

        {/* Customer */}
        <div className="mt-8 flex flex-col items-center">
          {/* Rating */}
          <div className="mb-3 flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className="text-[15px] leading-none text-[#FFB800]"
              >
                ★
              </span>
            ))}
          </div>

          <p className="text-[15px] font-medium text-[#111]">
            {activeTestimonial.name}
          </p>

          <p className="mt-1 text-[13px] text-gray-500">
            {activeTestimonial.date}
          </p>

          <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-gray-400">
            Google Review
          </p>
        </div>

        {/* Review Photos */}
        {activeTestimonial.photos?.length > 0 && (
          <div className="mt-6 flex gap-3">
            {activeTestimonial.photos.map((photo, index) => (
              <div
                key={index}
                className="
                  relative
                  h-[70px]
                  w-[70px]
                  overflow-hidden
                  rounded-md
                  border
                  border-gray-200
                "
              >
                <Image
                  src={photo}
                  alt={`${activeTestimonial.name} review photo ${index + 1}`}
                  fill
                  sizes="70px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Slider Dots */}
        <div className="mt-10 flex items-center justify-center gap-[15px]">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              aria-label={`Go to review ${index + 1}`}
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
