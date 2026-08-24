"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

/* ============================================================
   HELPERS
============================================================ */

const formatDate = (date) =>
  new Date(date || Date.now()).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

/* ============================================================
   ORDER STEPS
============================================================ */

function StepLine({ done }) {
  return (
    <div
      className={`h-px flex-1 transition-all duration-700 ${
        done ? "bg-[#C5A880]" : "bg-[#C5A880]/15"
      }`}
    />
  );
}

function Step({ number, label, done, active }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`flex h-9 w-9 items-center justify-center rounded-full border text-[11px] font-medium transition-all duration-700 ${
          done
            ? "border-[#C5A880] bg-[#C5A880] text-[#121212]"
            : active
              ? "border-[#C5A880] bg-transparent text-[#C5A880]"
              : "border-[#C5A880]/20 bg-transparent text-[#C5A880]/30"
        }`}
      >
        {done ? (
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        ) : (
          number
        )}
      </div>
      <span
        className={`hidden text-[9px] uppercase tracking-[0.2em] sm:block ${
          done || active ? "text-[#C5A880]" : "text-[#C5A880]/30"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

/* ============================================================
   ANIMATED CHECKMARK
============================================================ */

function AnimatedCheckmark() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow ring */}
      <div
        className={`absolute h-36 w-36 rounded-full bg-[#C5A880]/8 transition-all duration-1000 ${
          animate ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      />
      {/* Middle ring */}
      <div
        className={`absolute h-28 w-28 rounded-full border border-[#C5A880]/20 transition-all duration-700 delay-100 ${
          animate ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      />
      {/* Inner circle */}
      <div
        className={`relative flex h-20 w-20 items-center justify-center rounded-full border border-[#C5A880]/40 bg-[#C5A880]/10 transition-all duration-700 delay-200 ${
          animate ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
      >
        <svg
          className={`h-8 w-8 text-[#C5A880] transition-all duration-500 delay-500 ${
            animate ? "scale-100 opacity-100" : "scale-0 opacity-0"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>
      </div>
    </div>
  );
}

/* ============================================================
   INFO ROW
============================================================ */

function InfoRow({ label, value, gold = false }) {
  return (
    <div className="flex items-center justify-between border-b border-[#C5A880]/10 py-3.5 last:border-0">
      <span className="text-[11px] uppercase tracking-[0.15em] text-gray-400">
        {label}
      </span>
      <span
        className={`text-[12px] font-medium tracking-wide ${
          gold ? "text-[#C5A880]" : "text-[#121212]"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/* ============================================================
   PAGE
============================================================ */

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);

  /* Replace with real orderId from URL param or Redux state */
  const orderId =
    searchParams.get("orderId") ||
    "SYS-" + Math.random().toString(36).slice(2, 8).toUpperCase();

  const estimatedDelivery = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`min-h-screen bg-[#FAF7F2] pb-24 pt-10 transition-opacity duration-700 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* ======================================================
          PROGRESS STEPS
      ====================================================== */}

      <div className="border-b border-[#C5A880]/10 bg-white py-5">
        <div className="mx-auto flex max-w-4xl items-center gap-3 px-5 md:px-8">
          <Step number={1} label="Cart" done />
          <StepLine done />
          <Step number={2} label="Checkout" done />
          <StepLine done />
          <Step number={3} label="Confirmed" done active />
        </div>
      </div>

      {/* ======================================================
          MAIN
      ====================================================== */}

      <div className="mx-auto max-w-2xl px-5 pt-16 md:px-8">

        {/* ANIMATED CHECKMARK */}
        <div className="mb-8 flex justify-center">
          <AnimatedCheckmark />
        </div>

        {/* HEADING */}
        <div
          className={`mb-10 text-center transition-all duration-700 delay-300 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="mb-3 text-[10px] uppercase tracking-[0.45em] text-[#C5A880]">
            Order Confirmed
          </p>

          <h1 className="mb-4 font-serif text-3xl font-light uppercase tracking-[0.08em] text-[#121212] md:text-4xl">
            Thank You
          </h1>

          <div className="mx-auto mb-4 h-px w-12 bg-[#C5A880]" />

          <p className="mx-auto max-w-sm text-sm leading-relaxed text-gray-500">
            Your order has been placed successfully. We will notify you once
            your items are on their way.
          </p>
        </div>

        {/* ORDER DETAILS CARD */}
        <div
          className={`mb-5 border border-[#C5A880]/15 bg-white p-6 shadow-sm transition-all duration-700 delay-500 md:p-8 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="mb-5 text-[9px] uppercase tracking-[0.35em] text-[#C5A880]">
            Order Details
          </p>

          <InfoRow label="Order ID" value={`#${orderId}`} gold />
          <InfoRow label="Date Placed" value={formatDate()} />
          <InfoRow
            label="Estimated Delivery"
            value={formatDate(estimatedDelivery)}
          />
          <InfoRow label="Payment Status" value="Paid" gold />
        </div>

        {/* SHIPPING NOTE */}
        <div
          className={`mb-10 flex items-start gap-4 border border-[#C5A880]/15 bg-white p-5 transition-all duration-700 delay-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-[#C5A880]/30">
            <svg
              className="h-4 w-4 text-[#C5A880]"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>
          </div>

          <div>
            <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-[#121212]">
              Shipping Update
            </p>
            <p className="text-[12px] leading-relaxed text-gray-500">
              A confirmation email with tracking details will be sent to your
              registered email address within 24 hours.
            </p>
          </div>
        </div>

        {/* CTA BUTTONS */}
        <div
          className={`flex flex-col gap-3 sm:flex-row transition-all duration-700 delay-[900ms] ${
            visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <Link
            href="/user"
            className="
              flex-1
              border
              border-[#C5A880]/30
              py-4
              text-center
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-[#A68A5E]
              transition
              hover:border-[#C5A880]
              hover:bg-[#C5A880]/5
            "
          >
            View My Orders
          </Link>

          <Link
            href="/products"
            className="
              flex-1
              bg-[#121212]
              py-4
              text-center
              text-[10px]
              uppercase
              tracking-[0.25em]
              text-[#C5A880]
              transition
              hover:bg-[#C5A880]
              hover:text-[#121212]
            "
          >
            Continue Shopping
          </Link>
        </div>

        {/* FOOTER NOTE */}
        <div
          className={`mt-14 text-center transition-all duration-700 delay-[1100ms] ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="mx-auto mb-6 h-px w-16 bg-[#C5A880]/30" />

          <p className="mb-3 text-[9px] uppercase tracking-[0.35em] text-[#C5A880]/60">
            Crafted with Care
          </p>

          <p className="mx-auto max-w-xs text-[11px] leading-relaxed text-gray-400">
            Every Siyaas piece is carefully inspected and packaged to reach you
            in perfect condition.
          </p>
        </div>
      </div>
    </div>
  );
}