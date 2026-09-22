"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import { fetchOrderbyID } from "@/app/store/action/orderAction";
import { createReviews } from "@/app/store/action/reviewAction";
import axios from "@/app/utils/axios";

/* ============================================================
   STATUS STYLES
============================================================ */

const STATUS_STYLES = {
  Pending: {
    dot: "bg-[#C5A880]",
    bg: "bg-[#C5A880]/10",
    text: "text-[#A68A5E]",
  },

  Processing: {
    dot: "bg-[#6C9BCF]",
    bg: "bg-[#6C9BCF]/10",
    text: "text-[#5080A8]",
  },

  Shipped: {
    dot: "bg-[#7ABFAB]",
    bg: "bg-[#7ABFAB]/10",
    text: "text-[#4E9E89]",
  },

  Delivered: {
    dot: "bg-[#5EAD6F]",
    bg: "bg-[#5EAD6F]/10",
    text: "text-[#3A8A4E]",
  },

  Cancelled: {
    dot: "bg-[#CC6060]",
    bg: "bg-[#CC6060]/10",
    text: "text-[#B04040]",
  },
};

/* ============================================================
   HELPERS
============================================================ */

const getStatusStyle = (status) => {
  return STATUS_STYLES[status] || STATUS_STYLES.Pending;
};

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const formatDateTime = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const formatPrice = (price) => {
  return new Intl.NumberFormat("en-IN").format(Number(price) || 0);
};

/* ============================================================
   MAIN PAGE
============================================================ */

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const orderId = params?.id;

  /* ==========================================================
     LOGIN STATE
  ========================================================== */

  const loginState = useSelector((state) => state.login);

  const admin = loginState?.admin || loginState?.user || null;

  /* ==========================================================
     LOCAL STATE
  ========================================================== */
  const [order, setOrder] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [reviewedProducts, setReviewedProducts] = useState({});

  const [reviewProduct, setReviewProduct] = useState(null);

  /* ==========================================================
     FETCH ORDER USING REDUX ACTION
  ========================================================== */

  useEffect(() => {
    if (!orderId) return;

    const loadOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const result = await dispatch(fetchOrderbyID(orderId));

        console.log("ORDER DETAILS RESPONSE:", result);

        const fetchedOrder = result?.order || result?.data || result;

        setOrder(fetchedOrder);
      } catch (err) {
        console.error("FETCH ORDER DETAILS ERROR:", err);

        setError(err?.message || "Unable to load order details.");
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [orderId, dispatch]);

  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {
    return <OrderDetailsSkeleton />;
  }

  /* ==========================================================
     ERROR
  ========================================================== */

  if (error || !order) {
    return (
      <main className="min-h-screen bg-[#FAF7F2] px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-5xl">
          <button
            type="button"
            onClick={() => router.back()}
            className="
              mb-8
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-gray-500
              transition
              hover:text-[#C5A880]
            "
          >
            ← Back to Orders
          </button>

          <div
            className="
              border
              border-[#C5A880]/15
              bg-white
              px-6
              py-16
              text-center
            "
          >
            <div className="mb-5 text-4xl">📦</div>

            <h2
              className="
                font-serif
                text-2xl
                font-light
                uppercase
                tracking-[0.08em]
                text-[#121212]
              "
            >
              Order Not Found
            </h2>

            <p className="mt-3 text-sm text-gray-400">
              {error || "We couldn't find this order."}
            </p>

            <button
              type="button"
              onClick={() => router.push("/user/profile?tab=orders")}
              className="
                mt-8
                bg-[#121212]
                px-7
                py-3
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-[#C5A880]
                transition
                hover:bg-[#C5A880]
                hover:text-[#121212]
              "
            >
              My Orders
            </button>
          </div>
        </div>
      </main>
    );
  }

  /* ==========================================================
     ORDER DATA
  ========================================================== */

  const status = order?.orderStatus || "Pending";

  const statusStyle = getStatusStyle(status);

  const products = Array.isArray(order?.products) ? order.products : [];

  const totalItems = products.reduce(
    (total, item) => total + (Number(item?.quantity) || 0),
    0,
  );

  const isDelivered = status?.toLowerCase() === "delivered";

  /* ==========================================================
     PAGE
  ========================================================== */

  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      <div
        className="
          mx-auto
          max-w-6xl
          px-4
          py-8
          sm:px-6
          lg:px-8
        "
      >
        {/* ====================================================
            BACK BUTTON
        ==================================================== */}

        <button
          type="button"
          onClick={() => router.back()}
          className="
            mb-6
            flex
            items-center
            gap-2
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-gray-500
            transition
            hover:text-[#C5A880]
          "
        >
          ← Back to Orders
        </button>

        {/* ====================================================
            ORDER HEADER
        ==================================================== */}

        <section
          className="
            mb-6
            border
            border-[#C5A880]/15
            bg-white
            p-5
            sm:p-7
          "
        >
          <div
            className="
              flex
              flex-col
              gap-5
              sm:flex-row
              sm:items-start
              sm:justify-between
            "
          >
            {/* ORDER INFORMATION */}

            <div>
              <p
                className="
                  mb-2
                  text-[9px]
                  uppercase
                  tracking-[0.3em]
                  text-gray-400
                "
              >
                Order Details
              </p>

              <h1
                className="
                  break-all
                  font-serif
                  text-xl
                  font-normal
                  tracking-wide
                  text-[#121212]
                  sm:text-2xl
                "
              >
                #{order?._id}
              </h1>

              <p
                className="
                  mt-2
                  text-[11px]
                  text-gray-400
                "
              >
                Placed on {formatDateTime(order?.createdAt)}
              </p>
            </div>

            {/* STATUS */}

            <div
              className={`
                flex
                w-fit
                items-center
                gap-2
                px-4
                py-2
                ${statusStyle.bg}
              `}
            >
              <span
                className={`
                  h-2
                  w-2
                  rounded-full
                  ${statusStyle.dot}
                `}
              />

              <span
                className={`
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  ${statusStyle.text}
                `}
              >
                {status}
              </span>
            </div>
          </div>
        </section>

        {/* ====================================================
            DELIVERED MESSAGE
        ==================================================== */}

        {isDelivered && (
          <section
            className="
              mb-6
              border
              border-[#5EAD6F]/20
              bg-[#5EAD6F]/5
              px-5
              py-4
            "
          >
            <div className="flex gap-3">
              <div
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-[#5EAD6F]/10
                  text-sm
                  text-[#3A8A4E]
                "
              >
                ✓
              </div>

              <div>
                <p
                  className="
                    text-sm
                    font-medium
                    text-[#3A8A4E]
                  "
                >
                  Your order has been delivered
                </p>

                <p
                  className="
                    mt-1
                    text-[11px]
                    leading-5
                    text-gray-500
                  "
                >
                  We hope you loved your purchase. Share your experience by
                  reviewing the products you received.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ====================================================
            MAIN GRID
        ==================================================== */}

        <div
          className="
            grid
            gap-6
            lg:grid-cols-[1fr_340px]
          "
        >
          {/* ==================================================
              LEFT COLUMN
          ================================================== */}

          <div className="space-y-6">
            {/* =================================================
                PRODUCTS
            ================================================= */}

            <section
              className="
                border
                border-[#C5A880]/15
                bg-white
              "
            >
              {/* HEADER */}

              <div
                className="
                  border-b
                  border-[#C5A880]/10
                  px-5
                  py-4
                  sm:px-6
                "
              >
                <h2
                  className="
                    font-serif
                    text-xl
                    text-[#121212]
                  "
                >
                  Ordered Products
                </h2>

                <p
                  className="
                    mt-1
                    text-[10px]
                    text-gray-400
                  "
                >
                  {totalItems} item
                  {totalItems !== 1 ? "s" : ""}
                </p>
              </div>

              {/* PRODUCTS */}

              <div>
                {products.length === 0 ? (
                  <div
                    className="
                      px-6
                      py-12
                      text-center
                      text-sm
                      text-gray-400
                    "
                  >
                    No products found.
                  </div>
                ) : (
                  products.map((item, index) => (
                    <OrderProduct
                      key={item?._id || index}
                      item={item}
                      isDelivered={isDelivered}
                      reviewed={reviewedProducts[item?.product?._id]}
                      onReview={() => setReviewProduct(item)}
                    />
                  ))
                )}
              </div>
            </section>

            {/* =================================================
                SHIPPING ADDRESS
            ================================================= */}

            <ShippingAddress address={order?.shippingAddress} />
          </div>

          {/* ==================================================
              RIGHT COLUMN
          ================================================== */}

          <div className="space-y-6">
            {/* PRICE */}

            <PriceDetails order={order} />

            {/* PAYMENT */}

            <PaymentDetails order={order} />

            {/* TIMELINE */}

            <OrderTimeline order={order} />
          </div>
        </div>
      </div>

      {/* ======================================================
          REVIEW MODAL
      ====================================================== */}

      {reviewProduct && (
        <ReviewModal
          orderId={order?._id}
          productItem={reviewProduct}
          onClose={() => setReviewProduct(null)}
          onSuccess={(productId) => {
            setReviewedProducts((previous) => ({
              ...previous,
              [productId]: true,
            }));

            setReviewProduct(null);
          }}
        />
      )}
    </main>
  );
}

/* ============================================================
   ORDER PRODUCT
============================================================ */

function OrderProduct({ item, isDelivered, reviewed, onReview }) {
  const product = item?.product || {};

  const variant = item?.variant || {};

  const productMedia = Array.isArray(item?.productMedia)
    ? item.productMedia
    : [];

  // Priority:
  // 1. Primary front_view image
  // 2. Any front_view image
  // 3. Any product image
  const image =
    productMedia.find(
      (media) =>
        media?.mediaType === "image" &&
        media?.sectionType === "front_view" &&
        media?.isPrimary === true &&
        media?.url
    )?.url ||
    productMedia.find(
      (media) =>
        media?.mediaType === "image" &&
        media?.sectionType === "front_view" &&
        media?.url
    )?.url ||
    productMedia.find(
      (media) =>
        media?.mediaType === "image" &&
        media?.url
    )?.url ||
    null;

  const quantity = Number(item?.quantity) || 1;

  const price = Number(item?.price) || 0;

  const itemTotal = price * quantity;

  return (
    <div
      className="
        border-b
        border-[#C5A880]/10
        p-5
        last:border-b-0
        sm:p-6
      "
    >
      {/* ======================================================
          PRODUCT
      ====================================================== */}

      <div className="flex gap-4">
        {/* IMAGE */}

        <div
          className="
            h-24
            w-24
            shrink-0
            overflow-hidden
            bg-[#FAF7F2]
            sm:h-28
            sm:w-28
          "
        >
          {image ? (
            <img
              src={image}
              alt={product?.name || "Product"}
              className="
                h-full
                w-full
                object-cover
              "
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                text-2xl
                text-[#C5A880]
              "
            >
              ♡
            </div>
          )}
        </div>

        {/* DETAILS */}

        <div className="min-w-0 flex-1">
          <p
            className="
              mb-1
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-gray-400
            "
          >
            {product?.brand || "Siyaas"}
          </p>

          <h3
            className="
              font-serif
              text-lg
              leading-tight
              text-[#121212]
            "
          >
            {product?.name || "Product"}
          </h3>

          {variant?.sku && (
            <p
              className="
                mt-2
                text-[10px]
                text-gray-400
              "
            >
              SKU: {variant.sku}
            </p>
          )}

          <div
            className="
              mt-3
              flex
              flex-wrap
              gap-x-5
              gap-y-1
            "
          >
            <p
              className="
                text-[11px]
                text-gray-500
              "
            >
              Qty: {quantity}
            </p>

            <p
              className="
                text-[11px]
                text-gray-500
              "
            >
              ₹{formatPrice(price)} each
            </p>
          </div>
        </div>

        {/* ITEM TOTAL */}

        <div className="shrink-0 text-right">
          <p
            className="
              text-sm
              font-medium
              text-[#121212]
            "
          >
            ₹{formatPrice(itemTotal)}
          </p>
        </div>
      </div>

      {/* ======================================================
          REVIEW BUTTON
      ====================================================== */}

      {isDelivered && (
        <div
          className="
            mt-5
            border-t
            border-[#C5A880]/10
            pt-4
          "
        >
          {reviewed ? (
            <div
              className="
                flex
                items-center
                gap-2
                text-[10px]
                uppercase
                tracking-[0.15em]
                text-[#3A8A4E]
              "
            >
              <span>✓</span>
              <span>Review Submitted</span>
            </div>
          ) : (
            <button
              type="button"
              onClick={onReview}
              className="
                border
                border-[#C5A880]
                px-5
                py-2.5
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-[#A68A5E]
                transition
                hover:bg-[#C5A880]
                hover:text-white
              "
            >
              ★ Write a Review
            </button>
          )}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   PRICE DETAILS
============================================================ */

function PriceDetails({ order }) {
  return (
    <section
      className="
        border
        border-[#C5A880]/15
        bg-white
      "
    >
      <div
        className="
          border-b
          border-[#C5A880]/10
          px-5
          py-4
        "
      >
        <h2
          className="
            font-serif
            text-xl
            text-[#121212]
          "
        >
          Price Details
        </h2>
      </div>

      <div className="space-y-4 p-5">
        <PriceRow label="Subtotal" value={`₹${formatPrice(order?.subtotal)}`} />

        <PriceRow
          label="Discount"
          value={`- ₹${formatPrice(order?.discount)}`}
          valueClass="text-[#3A8A4E]"
        />

        <PriceRow
          label="Shipping"
          value={
            Number(order?.shippingCost) > 0
              ? `₹${formatPrice(order.shippingCost)}`
              : "FREE"
          }
          valueClass={Number(order?.shippingCost) > 0 ? "" : "text-[#3A8A4E]"}
        />

        <PriceRow label="Tax" value={`₹${formatPrice(order?.tax)}`} />

        <div
          className="
            border-t
            border-[#C5A880]/15
            pt-4
          "
        >
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <span
              className="
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-gray-500
              "
            >
              Total
            </span>

            <span
              className="
                font-serif
                text-xl
                text-[#C5A880]
              "
            >
              ₹{formatPrice(order?.totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   PRICE ROW
============================================================ */

function PriceRow({ label, value, valueClass = "" }) {
  return (
    <div
      className="
        flex
        justify-between
        gap-4
      "
    >
      <span
        className="
          text-[11px]
          text-gray-500
        "
      >
        {label}
      </span>

      <span
        className={`
          text-[11px]
          text-gray-700
          ${valueClass}
        `}
      >
        {value}
      </span>
    </div>
  );
}

/* ============================================================
   PAYMENT DETAILS
============================================================ */

function PaymentDetails({ order }) {
  return (
    <section
      className="
        border
        border-[#C5A880]/15
        bg-white
      "
    >
      <div
        className="
          border-b
          border-[#C5A880]/10
          px-5
          py-4
        "
      >
        <h2
          className="
            font-serif
            text-xl
            text-[#121212]
          "
        >
          Payment
        </h2>
      </div>

      <div className="space-y-4 p-5">
        <InfoRow label="Payment Method" value={order?.paymentMethod || "—"} />

        <InfoRow label="Payment Status" value={order?.paymentStatus || "—"} />

        {order?.providerOrderId && (
          <InfoRow label="Transaction ID" value={order.providerOrderId} />
        )}
      </div>
    </section>
  );
}

/* ============================================================
   SHIPPING ADDRESS
============================================================ */

function ShippingAddress({ address }) {
  if (!address) return null;

  return (
    <section
      className="
        border
        border-[#C5A880]/15
        bg-white
      "
    >
      <div
        className="
          border-b
          border-[#C5A880]/10
          px-5
          py-4
          sm:px-6
        "
      >
        <h2
          className="
            font-serif
            text-xl
            text-[#121212]
          "
        >
          Delivery Address
        </h2>
      </div>

      <div className="p-5 sm:p-6">
        <p
          className="
            text-sm
            font-medium
            text-[#121212]
          "
        >
          {address?.name || "—"}
        </p>

        {address?.mobileNumber && (
          <p
            className="
              mt-1
              text-[11px]
              text-gray-500
            "
          >
            {address.mobileNumber}
          </p>
        )}

        <div
          className="
            mt-4
            text-xs
            leading-6
            text-gray-500
          "
        >
          {address?.addressline && <p>{address.addressline}</p>}

          {address?.locality && <p>{address.locality}</p>}

          {[address?.city, address?.state].filter(Boolean).length > 0 && (
            <p>{[address?.city, address?.state].filter(Boolean).join(", ")}</p>
          )}

          {address?.pincode && <p>PIN - {address.pincode}</p>}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   ORDER TIMELINE
============================================================ */

function OrderTimeline({ order }) {
  const status = order?.orderStatus || "Pending";

  const steps = [
    {
      label: "Order Placed",
      date: order?.createdAt,
      active: true,
    },

    {
      label: "Processing",
      active: ["Processing", "Shipped", "Delivered"].includes(status),
    },

    {
      label: "Shipped",
      active: ["Shipped", "Delivered"].includes(status),
    },

    {
      label: "Delivered",
      active: status === "Delivered",
      date: status === "Delivered" ? order?.updatedAt : null,
    },
  ];

  return (
    <section
      className="
        border
        border-[#C5A880]/15
        bg-white
      "
    >
      <div
        className="
          border-b
          border-[#C5A880]/10
          px-5
          py-4
        "
      >
        <h2
          className="
            font-serif
            text-xl
            text-[#121212]
          "
        >
          Order Status
        </h2>
      </div>

      <div className="p-5">
        <div className="space-y-5">
          {steps.map((step, index) => (
            <div key={step.label} className="flex gap-3">
              <div
                className="
                    flex
                    flex-col
                    items-center
                  "
              >
                <span
                  className={`
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      text-[9px]
                      ${
                        step.active
                          ? "bg-[#C5A880] text-white"
                          : "bg-gray-100 text-gray-300"
                      }
                    `}
                >
                  {step.active ? "✓" : ""}
                </span>

                {index < steps.length - 1 && (
                  <span
                    className="
                        mt-1
                        h-7
                        w-px
                        bg-gray-100
                      "
                  />
                )}
              </div>

              <div>
                <p
                  className={`
                      text-[11px]
                      ${step.active ? "text-[#121212]" : "text-gray-300"}
                    `}
                >
                  {step.label}
                </p>

                {step.date && (
                  <p
                    className="
                        mt-1
                        text-[9px]
                        text-gray-400
                      "
                  >
                    {formatDateTime(step.date)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   INFO ROW
============================================================ */

function InfoRow({ label, value }) {
  return (
    <div>
      <p
        className="
          text-[9px]
          uppercase
          tracking-[0.15em]
          text-gray-400
        "
      >
        {label}
      </p>

      <p
        className="
          mt-1
          break-all
          text-xs
          text-gray-600
        "
      >
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   REVIEW MODAL
============================================================ */

function ReviewModal({ orderId, productItem, onClose, onSuccess }) {
  const product = productItem?.product || {};
  const dispatch = useDispatch();

  const productId = product?._id;

  const [rating, setRating] = useState(0);

  const [hoverRating, setHoverRating] = useState(0);

  const [review, setReview] = useState("");

  const [image, setImage] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");

  /* ==========================================================
     IMAGE
  ========================================================== */

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size should be less than 5 MB.");
      return;
    }

    setError("");
    setImage(file);
  };

  /* ==========================================================
     SUBMIT REVIEW
  ========================================================== */

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!rating) {
      setError("Please select a rating.");
      return;
    }

    if (!review.trim()) {
      setError("Please write a review.");
      return;
    }

    if (!productId) {
      setError("Product information is missing.");
      return;
    }

    if (!orderId) {
      setError("Order information is missing.");
      return;
    }

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("productId", productId);
      formData.append("orderId", orderId);
      formData.append("rating", String(rating));
      formData.append("review", review.trim());

      if (image) {
        formData.append("image", image);
      }

      const result = await dispatch(createReviews(formData));

      if (!result?.success) {
        setError(
          result?.payload?.message ||
            result?.error?.message ||
            "Unable to submit your review.",
        );
        return;
      }

      onSuccess(productId);
    } catch (err) {
      console.error("SUBMIT REVIEW ERROR:", err);

      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to submit your review.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  /* ==========================================================
     MODAL
  ========================================================== */

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          if (!submitting) {
            onClose();
          }
        }
      }}
    >
      <div
        className="
          max-h-[90vh]
          w-full
          max-w-lg
          overflow-y-auto
          bg-white
          shadow-2xl
        "
      >
        {/* ==================================================
            MODAL HEADER
        ================================================== */}

        <div
          className="
            flex
            items-start
            justify-between
            border-b
            border-[#C5A880]/10
            px-5
            py-5
            sm:px-6
          "
        >
          <div className="min-w-0 pr-4">
            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-gray-400
              "
            >
              Review Product
            </p>

            <h2
              className="
                mt-1
                font-serif
                text-2xl
                leading-tight
                text-[#121212]
              "
            >
              {product?.name || "Product"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="
              text-2xl
              leading-none
              text-gray-400
              transition
              hover:text-[#121212]
              disabled:opacity-50
            "
          >
            ×
          </button>
        </div>

        {/* ==================================================
            FORM
        ================================================== */}

        <form onSubmit={handleSubmit} className="p-5 sm:p-6">
          {/* =================================================
              RATING
          ================================================= */}

          <div className="mb-6">
            <label
              className="
                mb-3
                block
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-gray-500
              "
            >
              Your Rating
            </label>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="
                      p-1
                      text-3xl
                      leading-none
                      transition
                      hover:scale-110
                    "
                  aria-label={`${star} star`}
                >
                  <span
                    className={
                      star <= (hoverRating || rating)
                        ? "text-[#C5A880]"
                        : "text-gray-200"
                    }
                  >
                    ★
                  </span>
                </button>
              ))}
            </div>

            {rating > 0 && (
              <p
                className="
                  mt-2
                  text-[10px]
                  text-gray-400
                "
              >
                {rating === 1 && "Poor"}

                {rating === 2 && "Fair"}

                {rating === 3 && "Good"}

                {rating === 4 && "Very Good"}

                {rating === 5 && "Excellent"}
              </p>
            )}
          </div>

          {/* =================================================
              REVIEW
          ================================================= */}

          <div className="mb-6">
            <label
              htmlFor="product-review"
              className="
                mb-2
                block
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-gray-500
              "
            >
              Your Review
            </label>

            <textarea
              id="product-review"
              value={review}
              onChange={(event) => setReview(event.target.value)}
              rows={5}
              maxLength={1000}
              placeholder="Tell us about your experience with this product..."
              className="
                w-full
                resize-none
                border
                border-gray-200
                px-4
                py-3
                text-sm
                text-gray-700
                outline-none
                transition
                focus:border-[#C5A880]
              "
            />

            <div
              className="
                mt-1
                text-right
                text-[9px]
                text-gray-400
              "
            >
              {review.length}/1000
            </div>
          </div>

          {/* =================================================
              IMAGE
          ================================================= */}

          <div className="mb-6">
            <label
              htmlFor="review-image"
              className="
                mb-2
                block
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-gray-500
              "
            >
              Add Photo
              <span
                className="
                  ml-1
                  normal-case
                  tracking-normal
                  text-gray-400
                "
              >
                (optional)
              </span>
            </label>

            <input
              id="review-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="
                block
                w-full
                border
                border-dashed
                border-gray-200
                p-3
                text-xs
                text-gray-500
                file:mr-3
                file:border-0
                file:bg-[#FAF7F2]
                file:px-3
                file:py-2
                file:text-[9px]
                file:uppercase
                file:tracking-[0.15em]
              "
            />

            {image && (
              <p
                className="
                  mt-2
                  truncate
                  text-[10px]
                  text-gray-400
                "
              >
                Selected: {image.name}
              </p>
            )}
          </div>

          {/* =================================================
              ERROR
          ================================================= */}

          {error && (
            <div
              className="
                mb-5
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-[11px]
                text-red-600
              "
            >
              {error}
            </div>
          )}

          {/* =================================================
              BUTTONS
          ================================================= */}

          <div
            className="
              flex
              flex-col-reverse
              gap-3
              sm:flex-row
              sm:justify-end
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="
                border
                border-gray-200
                px-6
                py-3
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-gray-500
                transition
                hover:border-gray-400
                disabled:opacity-50
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="
                bg-[#121212]
                px-7
                py-3
                text-[9px]
                uppercase
                tracking-[0.2em]
                text-[#C5A880]
                transition
                hover:bg-[#C5A880]
                hover:text-[#121212]
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ============================================================
   LOADING SKELETON
============================================================ */

function OrderDetailsSkeleton() {
  return (
    <main className="min-h-screen bg-[#FAF7F2]">
      <div
        className="
          mx-auto
          max-w-6xl
          px-4
          py-8
          sm:px-6
          lg:px-8
        "
      >
        <div
          className="
            mb-6
            h-4
            w-32
            animate-pulse
            rounded
            bg-gray-200
          "
        />

        <div
          className="
            mb-6
            animate-pulse
            border
            border-gray-100
            bg-white
            p-7
          "
        >
          <div
            className="
              h-3
              w-24
              rounded
              bg-gray-200
            "
          />

          <div
            className="
              mt-3
              h-8
              w-48
              rounded
              bg-gray-200
            "
          />

          <div
            className="
              mt-3
              h-3
              w-40
              rounded
              bg-gray-200
            "
          />
        </div>

        <div
          className="
            grid
            gap-6
            lg:grid-cols-[1fr_340px]
          "
        >
          <div className="space-y-6">
            <div
              className="
                animate-pulse
                border
                bg-white
                p-6
              "
            >
              <div
                className="
                  mb-6
                  h-6
                  w-32
                  rounded
                  bg-gray-200
                "
              />

              {[1, 2].map((item) => (
                <div
                  key={item}
                  className="
                      mb-6
                      flex
                      gap-4
                    "
                >
                  <div
                    className="
                        h-28
                        w-28
                        rounded
                        bg-gray-200
                      "
                  />

                  <div className="flex-1">
                    <div
                      className="
                          h-3
                          w-20
                          rounded
                          bg-gray-200
                        "
                    />

                    <div
                      className="
                          mt-3
                          h-5
                          w-48
                          rounded
                          bg-gray-200
                        "
                    />

                    <div
                      className="
                          mt-3
                          h-3
                          w-32
                          rounded
                          bg-gray-200
                        "
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              className="
                h-48
                animate-pulse
                bg-white
              "
            />
          </div>

          <div className="space-y-6">
            <div
              className="
                h-72
                animate-pulse
                bg-white
              "
            />

            <div
              className="
                h-52
                animate-pulse
                bg-white
              "
            />

            <div
              className="
                h-64
                animate-pulse
                bg-white
              "
            />
          </div>
        </div>
      </div>
    </main>
  );
}
