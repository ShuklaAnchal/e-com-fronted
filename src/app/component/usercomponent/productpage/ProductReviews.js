"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncfetchProductWiseReview } from "@/app/store/action/reviewAction";

const INITIAL_VISIBLE = 3;
const LOAD_MORE_COUNT = 6;

// Demonstration content only. These are not genuine customer submissions.
const SAMPLE_REVIEWS = [
  {
    _id: "sample-1",
    user: { name: "Priya S." },
    rating: 5,
    title: "Beautiful fragrance",
    review:
      "The fragrance creates a warm and relaxing atmosphere. I love the elegant look of this candle.",
    createdAt: "2026-09-18T10:00:00.000Z",
    isSample: true,
  },
  {
    _id: "sample-2",
    user: { name: "Neha K." },
    rating: 4,
    title: "Lovely addition to my home",
    review:
      "The design looks beautiful on my bedside table, and the fragrance is pleasant.",
    createdAt: "2026-09-12T10:00:00.000Z",
    isSample: true,
  },
  {
    _id: "sample-3",
    user: { name: "Riya M." },
    rating: 5,
    title: "Perfect for gifting",
    review:
      "I like the minimal design and premium feel. It makes a thoughtful gifting option.",
    createdAt: "2026-09-05T10:00:00.000Z",
    isSample: true,
  },
  {
    _id: "sample-4",
    user: { name: "Ananya R." },
    rating: 4,
    title: "Elegant and minimal",
    review:
      "A lovely candle for creating a cozy atmosphere during the evening.",
    createdAt: "2026-08-29T10:00:00.000Z",
    isSample: true,
  },
  {
    _id: "sample-5",
    user: { name: "Meera P." },
    rating: 5,
    title: "A lovely self-care essential",
    review: "The candle fits beautifully into my evening relaxation routine.",
    createdAt: "2026-08-21T10:00:00.000Z",
    isSample: true,
  },
  {
    _id: "sample-6",
    user: { name: "Kavya T." },
    rating: 3,
    title: "A nice candle",
    review:
      "The simple design is attractive and works well with my home decor.",
    createdAt: "2026-08-15T10:00:00.000Z",
    isSample: true,
  },
  {
    _id: "sample-7",
    user: { name: "Ishita D." },
    rating: 4,
    title: "A cozy atmosphere",
    review: "A nice addition to a quiet evening at home.",
    createdAt: "2026-08-10T10:00:00.000Z",
    isSample: true,
  },
  {
    _id: "sample-8",
    user: { name: "Aditi M." },
    rating: 5,
    title: "Simple and elegant",
    review:
      "I love the understated appearance and the calming feel it brings to a room.",
    createdAt: "2026-08-03T10:00:00.000Z",
    isSample: true,
  },
];

function getReviewArray(response) {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.reviews)) return response.reviews;
  if (Array.isArray(response?.data?.reviews)) return response.data.reviews;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.result)) return response.result;
  return [];
}

function getRating(review) {
  const value = Number(review?.rating ?? review?.stars ?? 0);

  if (!Number.isFinite(value)) return 0;

  return Math.min(5, Math.max(0, value));
}

function getName(review) {
  return review?.user?.name || review?.userName || review?.name || "Customer";
}

function getText(review) {
  return review?.review || review?.comment || review?.description || "";
}

function getTitle(review) {
  return review?.title || review?.reviewTitle || "";
}

function getDate(review) {
  const value = review?.createdAt || review?.date;

  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function Stars({ rating, size = "text-sm" }) {
  return (
    <div
      className={`flex items-center gap-0.5 ${size}`}
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={
            star <= Math.round(rating) ? "text-[#B58B45]" : "text-[#D9D3CB]"
          }
        >
          ★
        </span>
      ))}
    </div>
  );
}

function RatingBar({ rating, count, total }) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div className="grid grid-cols-[36px_minmax(0,1fr)_38px] items-center gap-3">
      <span className="text-xs text-[#5C4033]">{rating} star</span>

      <div className="h-2 overflow-hidden rounded-full bg-[#EAE4DC]">
        <div
          className="h-full rounded-full bg-[#B58B45] transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>

      <span className="text-right text-xs text-[#81766B]">{count}</span>
    </div>
  );
}

function ReviewCard({ review }) {
  const name = review.reviewerName || getName(review);
  const rating = getRating(review);
  const text = getText(review);
  const title = getTitle(review);

  return (
    <article className="flex h-full flex-col border-b border-[#E6DED4] py-6 first:pt-0 last:border-b-0">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EEE5DA] font-serif text-lg text-[#5C4033]">
          {name.charAt(0).toUpperCase()}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-semibold tracking-wide text-[#3F3027]">
              {name}
            </h3>

            {/* {review.isSample && (
              <span className="rounded-full bg-[#F3EEE7] px-2.5 py-1 text-[10px] uppercase tracking-wider text-[#766555]">
                Sample review
              </span>
            )} */}
          </div>

          <div className="mt-1.5 flex flex-wrap items-center gap-2">
            <Stars rating={rating} />

            {getDate(review) && (
              <span className="text-xs text-[#94877B]">{getDate(review)}</span>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 pl-0 sm:pl-14">
        {title && (
          <h4 className="mb-2 text-sm font-semibold text-[#5C4033]">{title}</h4>
        )}

        <p className="whitespace-pre-line break-words text-sm leading-7 text-[#6F6257]">
          {text}
        </p>
      </div>
    </article>
  );
}

export default function ProductReviews({ product }) {
  const dispatch = useDispatch();
  const productId = product?._id || product?.id;

  const [realReviews, setRealReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  useEffect(() => {
    let cancelled = false;

    async function loadReviews() {
      if (!productId) {
        setRealReviews([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const result = await dispatch(asyncfetchProductWiseReview(productId));

        if (cancelled) return;

        // Supports Redux Toolkit fulfilled action payloads and common API responses.
        if (result?.error) {
          throw new Error(result.error.message || "Failed to fetch reviews");
        }

        const payload = result?.payload ?? result?.data ?? result;
        const reviews = getReviewArray(payload);

        const formatted = reviews
          .filter((review) => review && !review.isSample)
          .map((review, index) => ({
            ...review,
            _id: review._id || review.id || `real-${index}`,
            reviewerName: getName(review),
            rating: getRating(review),
            review: getText(review),
            isSample: false,
          }))
          .filter((review) => review.review);

        setRealReviews(formatted);
      } catch (err) {
        if (!cancelled) {
          setError(
            "Customer reviews could not be loaded. Please try again later.",
          );
          setRealReviews([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadReviews();

    return () => {
      cancelled = true;
    };
  }, [dispatch, productId]);

  const allReviews = useMemo(
    () => [
      ...realReviews,
      ...SAMPLE_REVIEWS.map((review) => ({
        ...review,
        reviewerName: getName(review),
      })),
    ],
    [realReviews],
  );

  const ratingSummary = useMemo(() => {
    const counts = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };

    allReviews.forEach((review) => {
      const rating = getRating(review);
      const roundedRating = Math.round(rating);

      if (roundedRating >= 1 && roundedRating <= 5) {
        counts[roundedRating] += 1;
      }
    });

    const total = allReviews.length;
    const ratingSum = allReviews.reduce(
      (sum, review) => sum + getRating(review),
      0,
    );

    return {
      counts,
      total,
      average: total ? ratingSum / total : 0,
    };
  }, [allReviews]);

  const visibleReviews = allReviews.slice(0, visibleCount);
  const hasMore = visibleCount < allReviews.length;

  return (
    <section
      id="product-reviews"
      className="w-full bg-[#FAF7F2] px-4 py-12 sm:px-6 sm:py-16 lg:px-10 lg:py-20"
      aria-labelledby="reviews-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section heading */}
        <div className="mb-8 text-center sm:mb-10">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em] text-[#9A7A50] sm:text-xs">
            Your experience matters
          </p>

          <h2
            id="reviews-heading"
            className="font-serif text-3xl font-normal text-[#4C3529] sm:text-4xl lg:text-5xl"
          >
            Customer Reviews
          </h2>

          <div className="mx-auto mt-4 h-px w-16 bg-[#B58B45]" />

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#817469]">
            Discover feedback and impressions about our handcrafted candles.
          </p>
        </div>

        {/* Rating summary */}
        <div className="mb-10 grid grid-cols-1 gap-7 border-y border-[#DDD2C4] py-7 sm:mb-12 sm:grid-cols-2 sm:gap-10 sm:py-9">
          <div className="flex flex-col items-center justify-center border-b border-[#E5DCD1] pb-7 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-8">
            <p className="font-serif text-5xl text-[#4C3529] sm:text-6xl">
              {ratingSummary.average.toFixed(1)}
            </p>

            <Stars rating={ratingSummary.average} size="text-xl sm:text-2xl" />

            <p className="mt-3 text-sm text-[#76685B]">
              Based on {ratingSummary.total} displayed reviews
            </p>

            <p className="mt-1 text-xs text-[#9A8D80]">
              {realReviews.length} genuine customer{" "}
              {realReviews.length === 1 ? "review" : "reviews"}
            </p>
          </div>

          <div className="flex flex-col justify-center gap-3 sm:pl-3">
            {[5, 4, 3, 2, 1].map((rating) => (
              <RatingBar
                key={rating}
                rating={rating}
                count={ratingSummary.counts[rating]}
                total={ratingSummary.total}
              />
            ))}
          </div>
        </div>

        {/* Review list heading */}
        <div className="mb-2 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-serif text-2xl text-[#4C3529] sm:text-3xl">
            What people are saying
          </h3>

          <span className="text-xs uppercase tracking-wider text-[#928477]">
            {ratingSummary.total} reviews
          </span>
        </div>

        <p className="mb-6 text-xs leading-5 text-[#928477]">
          Sample reviews are demonstration content, not verified customer
          submissions. The overall rating and distribution include sample
          reviews.
        </p>

        {loading && (
          <div className="py-10 text-center text-sm text-[#817469]">
            Loading customer reviews...
          </div>
        )}

        {error && (
          <p
            role="status"
            className="mb-6 rounded-lg border border-[#E5DCD1] bg-white p-4 text-sm text-[#76685B]"
          >
            {error}
          </p>
        )}

        {/* Reviews */}
        <div className="grid grid-cols-1 gap-x-12 lg:grid-cols-2">
          {visibleReviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>

        {!loading && allReviews.length === 0 && (
          <div className="py-12 text-center">
            <p className="font-serif text-xl text-[#4C3529]">No reviews yet</p>
            <p className="mt-2 text-sm text-[#817469]">
              Customer feedback will appear here when available.
            </p>
          </div>
        )}

        {/* Load more */}
        {!loading && hasMore && (
          <div className="mt-8 flex justify-center sm:mt-10">
            <button
              type="button"
              onClick={() =>
                setVisibleCount((count) => count + LOAD_MORE_COUNT)
              }
              className="min-h-12 min-w-44 border border-[#5C4033] bg-transparent px-8 py-3 text-xs font-medium uppercase tracking-[0.18em] text-[#5C4033] transition-colors duration-300 hover:bg-[#5C4033] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#B58B45] focus:ring-offset-2"
            >
              Load More Reviews
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
