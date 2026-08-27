"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
      "https://lh3.googleusercontent.com/grass-cs/ACvplmNKsWTsSvhUbMXq9X0jKZgnlhTn6nzy8eQqqjMszxxHAPLqHYgYVqVqLcUXhpkTjzXiqBawHfpPRj2k6TR8Wn8HLJLDeVirWRvcKeBDvvi1V5vMbtc2ET-sxlfL9erG8jy9EvdSZsY7b--APP=s138-p-k-rw",
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

const StarRating = ({ rating = 5 }) => {
  return (
    <div className="flex items-center gap-[2px]">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-[15px] ${
            star <= rating ? "text-[#F4B400]" : "text-[#D8D8D8]"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

const GoogleIcon = () => {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-full webprimarycolor shadow-sm">
      <span className="text-[18px] font-bold text-[#4285F4]">G</span>
    </div>
  );
};

const Testimonials = () => {
  const [selectedReview, setSelectedReview] = useState(null);

  return (
    <section className="w-full border-t border-[#e9e5df] webprimarycolor">
      <div className="mx-auto max-w-[1500px] px-5 py-16 sm:px-8 md:px-12 lg:px-16 lg:py-20">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="text-center">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.3em] text-[#9b8060]">
            Customer Love
          </p>

          <h2 className="text-[28px] font-normal uppercase tracking-[0.16em] text-[#171717] sm:text-[34px]">
            What Our Customers Say
          </h2>

          <p className="mx-auto mt-4 max-w-[620px] text-[14px] leading-7 text-[#777] sm:text-[15px]">
            Real experiences from customers who have brought Siyaas fragrances,
            candles and gifts into their homes.
          </p>
        </div>

        {/* =====================================================
            RATING SUMMARY
        ====================================================== */}
        {/* =====================================================
    GOOGLE RATING SUMMARY
===================================================== */}
        <div className="mx-auto mt-12 max-w-[1050px] border-y border-[#e4e1dc] bg-white">
          <div className="grid md:grid-cols-[260px_1fr_300px]">
            {/* =================================================
        OVERALL RATING
    ================================================== */}
            <div className="flex flex-col items-center justify-center px-6 py-8 md:border-r md:border-[#e8e5e1]">
              <div className="text-[64px] font-medium leading-none tracking-[-0.05em] text-[#202124]">
                4.8
              </div>

              <div className="mt-3">
                <StarRating rating={5} />
              </div>

              <p className="mt-3 text-[13px] text-[#6f6f6f]">
                52 Google reviews
              </p>
            </div>

            {/* =================================================
        RATING BREAKDOWN
    ================================================== */}
            <div className="px-6 py-8 sm:px-10">
              <div className="flex items-center justify-between">
                <h3 className="text-[14px] font-medium text-[#202124]">
                  Rating overview
                </h3>

                <span className="text-[11px] text-[#999]">52 reviews</span>
              </div>

              <div className="mt-5 space-y-2.5">
                {/* 5 Star */}
                <div className="flex items-center gap-3">
                  <span className="w-[12px] text-[12px] text-[#555]">5</span>

                  <span className="text-[12px] text-[#F4B400]">★</span>

                  <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-[#eeeeee]">
                    <div
                      className="h-full rounded-full bg-[#F4B400]"
                      style={{ width: "94%" }}
                    />
                  </div>

                  <span className="w-[30px] text-right text-[11px] text-[#888]">
                    49
                  </span>
                </div>

                {/* 4 Star */}
                <div className="flex items-center gap-3">
                  <span className="w-[12px] text-[12px] text-[#555]">4</span>

                  <span className="text-[12px] text-[#F4B400]">★</span>

                  <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-[#eeeeee]">
                    <div
                      className="h-full rounded-full bg-[#F4B400]"
                      style={{ width: "6%" }}
                    />
                  </div>

                  <span className="w-[30px] text-right text-[11px] text-[#888]">
                    3
                  </span>
                </div>

                {/* 3 Star */}
                <div className="flex items-center gap-3">
                  <span className="w-[12px] text-[12px] text-[#555]">3</span>

                  <span className="text-[12px] text-[#F4B400]">★</span>

                  <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-[#eeeeee]">
                    <div
                      className="h-full rounded-full bg-[#F4B400]"
                      style={{ width: "0%" }}
                    />
                  </div>

                  <span className="w-[30px] text-right text-[11px] text-[#888]">
                    0
                  </span>
                </div>

                {/* 2 Star */}
                <div className="flex items-center gap-3">
                  <span className="w-[12px] text-[12px] text-[#555]">2</span>

                  <span className="text-[12px] text-[#F4B400]">★</span>

                  <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-[#eeeeee]">
                    <div
                      className="h-full rounded-full bg-[#F4B400]"
                      style={{ width: "0%" }}
                    />
                  </div>

                  <span className="w-[30px] text-right text-[11px] text-[#888]">
                    0
                  </span>
                </div>

                {/* 1 Star */}
                <div className="flex items-center gap-3">
                  <span className="w-[12px] text-[12px] text-[#555]">1</span>

                  <span className="text-[12px] text-[#F4B400]">★</span>

                  <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-[#eeeeee]">
                    <div
                      className="h-full rounded-full bg-[#F4B400]"
                      style={{ width: "0%" }}
                    />
                  </div>

                  <span className="w-[30px] text-right text-[11px] text-[#888]">
                    0
                  </span>
                </div>
              </div>
            </div>

            {/* =================================================
        GOOGLE SOURCE
    ================================================== */}
            <div className="flex items-center justify-center border-t border-[#e8e5e1] px-6 py-8 md:border-l md:border-t-0">
              <div className="text-center">
                {/* Google Logo */}
                <div className="mx-auto flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[#eeeeee] bg-white shadow-sm">
                  <span className="text-[24px] font-semibold text-[#4285F4]">
                    G
                  </span>
                </div>

                <p className="mt-3 text-[14px] font-medium text-[#202124]">
                  Google Reviews
                </p>

                <div className="mt-2 flex items-center justify-center gap-2">
                  <StarRating rating={5} />

                  <span className="text-[12px] font-medium text-[#555]">
                    4.8
                  </span>
                </div>

                <p className="mt-2 text-[11px] text-[#999]">
                  Based on 52 reviews
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            REVIEWS HEADER
        ====================================================== */}
        <div className="mt-16 flex items-end justify-between border-b border-[#dedad4] pb-5">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-[#9b8060]">
              Reviews
            </p>

            <h3 className="mt-1 text-[22px] font-normal text-[#171717]">
              Customer Experiences
            </h3>
          </div>

          <p className="hidden text-[12px] text-[#999] sm:block">
            52 Google Reviews
          </p>
        </div>

        {/* =====================================================
            SWIPER
        ====================================================== */}
        <div className="relative mt-8">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              nextEl: ".reviews-next",
              prevEl: ".reviews-prev",
            }}
            pagination={{
              el: ".reviews-pagination",
              clickable: true,
            }}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
              },
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
            className="reviews-swiper !pb-12"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="!h-auto">
                <article className="group flex h-full min-h-[360px] flex-col rounded-xl border border-[#e6e1da] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.07)]">
                  {/* Customer Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eee8df] text-[14px] font-medium uppercase text-[#80694e]">
                        {testimonial.name.charAt(0)}
                      </div>

                      <div>
                        <h4 className="text-[14px] font-medium text-[#222]">
                          {testimonial.name}
                        </h4>

                        <p className="mt-0.5 text-[11px] text-[#999]">
                          {testimonial.date}
                        </p>
                      </div>
                    </div>

                    <GoogleIcon />
                  </div>

                  {/* Rating */}
                  <div className="mt-5 flex items-center justify-between">
                    <StarRating rating={testimonial.rating} />

                    <span className="text-[10px] uppercase tracking-[0.12em] text-[#aaa]">
                      Verified
                    </span>
                  </div>

                  {/* Review */}
                  <p
                    className={`mt-4 text-[13px] leading-6 text-[#555] ${
                      testimonial.review.length > 180 ? "line-clamp-5" : ""
                    }`}
                  >
                    “{testimonial.review}”
                  </p>

                  {/* Photos */}
                  {testimonial.photos?.length > 0 && (
                    <div className="mt-5 flex gap-2">
                      {testimonial.photos.slice(0, 3).map((photo, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setSelectedReview(testimonial)}
                          className="relative h-[58px] w-[58px] overflow-hidden rounded-lg border border-[#e5e1dc] bg-[#f5f5f5]"
                        >
                          <img
                            src={photo}
                            alt={`${testimonial.name} review photo ${
                              index + 1
                            }`}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Bottom */}
                  <div className="mt-auto pt-5">
                    <div className="border-t border-[#f0ede9] pt-4">
                      <button
                        type="button"
                        onClick={() => setSelectedReview(testimonial)}
                        className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#80694e] transition hover:text-[#222]"
                      >
                        Read full review →
                      </button>
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* =====================================================
              NAVIGATION
          ====================================================== */}
          <button
            type="button"
            className="reviews-prev absolute left-[-15px] top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#ddd] bg-white text-[#333] shadow-sm transition hover:bg-[#222] hover:text-white lg:flex"
            aria-label="Previous reviews"
          >
            ←
          </button>

          <button
            type="button"
            className="reviews-next absolute right-[-15px] top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#ddd] bg-white text-[#333] shadow-sm transition hover:bg-[#222] hover:text-white lg:flex"
            aria-label="Next reviews"
          >
            →
          </button>

          {/* Pagination */}
          <div className="reviews-pagination flex justify-center gap-2" />
        </div>

        {/* =====================================================
            VIEW ALL
        ====================================================== */}
        {/* <div className="mt-8 flex justify-center">
          <button
            type="button"
            className="border border-[#222] bg-[#222] px-8 py-3 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition hover:bg-transparent hover:text-[#222]"
          >
            View All Reviews
          </button>
        </div> */}
      </div>

      {/* =====================================================
          MODAL
      ====================================================== */}
      {selectedReview && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-5 backdrop-blur-sm"
          onClick={() => setSelectedReview(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-[650px] overflow-y-auto rounded-2xl bg-white p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={() => setSelectedReview(null)}
              className="absolute right-5 top-5 flex h-8 w-8 items-center justify-center rounded-full bg-[#f3f1ee] text-[20px] text-[#555] transition hover:bg-[#222] hover:text-white"
              aria-label="Close review"
            >
              ×
            </button>

            {/* User */}
            <div className="flex items-center gap-3 pr-10">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eee8df] text-[16px] font-medium uppercase text-[#80694e]">
                {selectedReview.name.charAt(0)}
              </div>

              <div>
                <h3 className="text-[16px] font-medium text-[#222]">
                  {selectedReview.name}
                </h3>

                <p className="mt-1 text-[12px] text-[#999]">
                  {selectedReview.date}
                </p>
              </div>
            </div>

            {/* Rating */}
            <div className="mt-6 flex items-center gap-3">
              <StarRating rating={selectedReview.rating} />

              <span className="text-[11px] uppercase tracking-[0.15em] text-[#999]">
                Google Review
              </span>
            </div>

            {/* Full Review */}
            <p className="mt-6 text-[15px] leading-7 text-[#444]">
              “{selectedReview.review}”
            </p>

            {/* Photos */}
            {selectedReview.photos?.length > 0 && (
              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {selectedReview.photos.map((photo, index) => (
                  <div
                    key={index}
                    className="aspect-square overflow-hidden rounded-xl border border-[#e6e1da]"
                  >
                    <img
                      src={photo}
                      alt={`${selectedReview.name} review photo ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;
