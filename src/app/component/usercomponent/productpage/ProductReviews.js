"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import Image from "next/image";

import { asyncfetchProductWiseReview } from "@/app/store/action/reviewAction";
import { getMediaUrl } from "@/app/utils/mediaUrl";

const ProductReviews = ({ id }) => {
const dispatch = useDispatch();

const [reviews, setReviews] = useState([]);
const [reviewLoading, setReviewLoading] = useState(true);
const [reviewError, setReviewError] = useState("");
const [visibleReviews, setVisibleReviews] = useState(5);

useEffect(() => {
if (!id) return;

const getProductReviews = async () => {
  try {
    setReviewLoading(true);
    setReviewError("");

    const result = await dispatch(
      asyncfetchProductWiseReview(id)
    );

    const response = result?.payload || result;

    if (response?.success) {
      setReviews(
        Array.isArray(response?.reviews)
          ? response.reviews
          : []
      );
    } else {
      setReviews([]);
    }
  } catch (error) {
    console.error(
      "Failed to fetch product reviews:",
      error
    );

    setReviewError("Unable to load reviews.");
    setReviews([]);
  } finally {
    setReviewLoading(false);
  }
};

getProductReviews();


}, [id, dispatch]);

/* =========================
RATING CALCULATIONS
========================= */

const ratingStats = useMemo(() => {
const total = reviews.length;

if (!total) {
  return {
    average: "0.0",
    counts: {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    },
  };
}

const counts = {
  5: 0,
  4: 0,
  3: 0,
  2: 0,
  1: 0,
};

let sum = 0;

reviews.forEach((review) => {
  const rating = Math.round(
    Number(review?.rating || 0)
  );

  if (rating >= 1 && rating <= 5) {
    counts[rating]++;
    sum += rating;
  }
});

return {
  average: (sum / total).toFixed(1),
  counts,
};


}, [reviews]);

const getPercentage = (rating) => {
if (!reviews.length) return 0;


return Math.round(
  (ratingStats.counts[rating] / reviews.length) * 100
);


};

const displayedReviews = reviews.slice(
0,
visibleReviews
);

const hasMoreReviews =
visibleReviews < reviews.length;

/* =========================
STAR COMPONENT
========================= */

const Stars = ({ rating, size = "text-sm" }) => {
return ( <div className="flex items-center gap-0.5">
{[1, 2, 3, 4, 5].map((star) => (
<span
key={star}
className={`${size} ${
              star <= Number(rating || 0)
                ? "text-[#C5A880]"
                : "text-gray-200"
            }`}
>
★ </span>
))} </div>
);
};

return ( <section className="mt-14 md:mt-20">


  <div className="w-full">

    {/* =========================
        SECTION HEADER
    ========================= */}

    <div className="text-center mb-10">

      <p className="text-[10px] md:text-xs tracking-[0.4em] text-[#C5A880] uppercase mb-3">
        CUSTOMER STORIES
      </p>

      <h2 className="text-3xl md:text-4xl font-serif font-light tracking-wide text-[#1A1A1A]">
        Customer Reviews
      </h2>

      <div className="w-12 h-px bg-[#C5A880] mx-auto mt-5" />

    </div>

    {/* =========================
        LOADING
    ========================= */}

    {reviewLoading && (
      <div className="border border-[#C5A880]/15 rounded-2xl p-10 text-center">

        <div className="w-8 h-8 border-2 border-[#C5A880]/30 border-t-[#C5A880] rounded-full animate-spin mx-auto" />

        <p className="text-sm text-gray-500 mt-4">
          Loading customer reviews...
        </p>

      </div>
    )}

    {/* =========================
        ERROR
    ========================= */}

    {!reviewLoading && reviewError && (
      <div className="border border-gray-200 rounded-2xl p-10 text-center">

        <p className="text-gray-500 text-sm">
          {reviewError}
        </p>

      </div>
    )}

    {/* =========================
        NO REVIEWS
    ========================= */}

    {!reviewLoading &&
      !reviewError &&
      reviews.length === 0 && (

        <div className="border border-[#C5A880]/15 rounded-2xl p-10 md:p-16 text-center bg-[#FAF7F2]/40">

          <div className="text-4xl text-[#C5A880]/60 mb-4">
            ★
          </div>

          <h3 className="text-lg font-serif text-gray-900">
            No reviews yet
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Be the first customer to share your experience.
          </p>

        </div>
      )}

    {/* =========================
        REVIEWS
    ========================= */}

    {!reviewLoading &&
      !reviewError &&
      reviews.length > 0 && (

        <div className="space-y-10">

          {/* =========================
              RATING SUMMARY
          ========================= */}

          <div className="border border-[#C5A880]/20 rounded-2xl bg-[#FAF7F2]/50 p-6 md:p-8">

            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-12">

              {/* Average Rating */}

              <div className="flex flex-col items-center justify-center text-center md:border-r md:border-[#C5A880]/15 md:pr-10">

                <span className="text-5xl md:text-6xl font-serif font-light text-[#1A1A1A]">
                  {ratingStats.average}
                </span>

                <Stars
                  rating={Math.round(
                    Number(ratingStats.average)
                  )}
                  size="text-lg"
                />

                <p className="text-xs text-gray-500 mt-3 tracking-wide">
                  Based on {reviews.length}{" "}
                  {reviews.length === 1
                    ? "review"
                    : "reviews"}
                </p>

              </div>

              {/* Rating Distribution */}

              <div className="flex flex-col justify-center gap-2.5">

                {[5, 4, 3, 2, 1].map((rating) => (

                  <div
                    key={rating}
                    className="flex items-center gap-3"
                  >

                    <span className="w-7 text-xs text-gray-500">
                      {rating}★
                    </span>

                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">

                      <div
                        className="h-full bg-[#C5A880] rounded-full transition-all duration-700"
                        style={{
                          width: `${getPercentage(
                            rating
                          )}%`,
                        }}
                      />

                    </div>

                    <span className="w-9 text-right text-xs text-gray-400">
                      {getPercentage(rating)}%
                    </span>

                  </div>

                ))}

              </div>

            </div>
          </div>

          {/* =========================
              REVIEW HEADER
          ========================= */}

          <div className="flex items-center justify-between">

            <div>
              <h3 className="text-xl font-serif text-gray-900">
                What customers are saying
              </h3>

              <p className="text-xs text-gray-500 mt-1">
                Real experiences from our customers
              </p>
            </div>

            <span className="hidden sm:block text-xs tracking-wider text-gray-400 uppercase">
              {reviews.length} Reviews
            </span>

          </div>

          {/* =========================
              REVIEW LIST
          ========================= */}

          <div className="divide-y divide-gray-200">

            {displayedReviews.map(
              (review, index) => {

                const imageUrl =
                  review?.mediaType === "image" &&
                  review?.url
                    ? getMediaUrl(review.url)
                    : null;

                return (
                  <article
                    key={
                      review?._id || index
                    }
                    className="py-7 first:pt-0 last:pb-0"
                  >

                    {/* User Header */}

                    <div className="flex items-start justify-between gap-4">

                      <div className="flex items-center gap-3">

                        {/* Avatar */}

                        <div className="w-10 h-10 rounded-full bg-[#FAF7F2] border border-[#C5A880]/20 flex items-center justify-center flex-shrink-0">

                          <span className="text-sm font-serif text-[#C5A880]">
                            {(
                              review?.user?.name ||
                              "C"
                            )
                              .charAt(0)
                              .toUpperCase()}
                          </span>

                        </div>

                        <div>

                          <p className="text-sm font-medium text-gray-900">
                            {review?.user?.name ||
                              "Customer"}
                          </p>

                          <div className="flex items-center gap-2 mt-1">

                            <Stars
                              rating={
                                review?.rating
                              }
                            />

                            <span className="text-[11px] text-gray-400">
                              {review?.createdAt
                                ? new Date(
                                    review.createdAt
                                  ).toLocaleDateString(
                                    "en-IN",
                                    {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    }
                                  )
                                : ""}
                            </span>

                          </div>

                        </div>

                      </div>

                      {/* Verified */}

                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-gray-400">

                        <span className="text-[#C5A880]">
                          ✓
                        </span>

                        Verified

                      </span>

                    </div>

                    {/* Review Text */}

                    {review?.review && (
                      <p className="mt-4 text-sm md:text-[15px] text-gray-600 leading-7 max-w-3xl">
                        {review.review}
                      </p>
                    )}

                    {/* Review Image */}

                    {imageUrl && (
                      <div className="mt-5">

                        <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden border border-gray-200 group cursor-pointer">

                          <Image
                            src={imageUrl}
                            alt="Customer review"
                            fill
                            sizes="112px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />

                        </div>

                      </div>
                    )}

                  </article>
                );
              }
            )}

          </div>

          {/* =========================
              SHOW MORE
          ========================= */}

          {hasMoreReviews && (

            <div className="flex justify-center pt-2">

              <button
                type="button"
                onClick={() =>
                  setVisibleReviews(
                    (prev) => prev + 5
                  )
                }
                className="
                  px-7
                  py-3
                  border
                  border-[#C5A880]/40
                  rounded-full
                  text-xs
                  uppercase
                  tracking-[0.2em]
                  text-gray-700
                  hover:bg-[#C5A880]
                  hover:text-white
                  transition-all
                  duration-300
                "
              >
                Show More Reviews
              </button>

            </div>
          )}

          {/* Show Less */}

          {visibleReviews >= reviews.length &&
            reviews.length > 5 && (

              <div className="flex justify-center">

                <button
                  type="button"
                  onClick={() =>
                    setVisibleReviews(5)
                  }
                  className="
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    text-[#C5A880]
                    hover:text-gray-900
                    transition
                  "
                >
                  Show Less
                </button>

              </div>
            )}

        </div>
      )}

  </div>
</section>


);
};

export default ProductReviews;
