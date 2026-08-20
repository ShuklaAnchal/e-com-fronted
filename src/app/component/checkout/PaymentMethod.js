"use client";

import React from "react";

export default function PaymentMethod({
  paymentMethod,
  onChange,
}) {
  const options = [
    {
      value: "UPI",
      title: "UPI",
      description: "Pay securely using UPI",
    },
    {
      value: "CARD",
      title: "Credit / Debit Card",
      description: "Secure card payment",
    },
    {
      value: "NET_BANKING",
      title: "Net Banking",
      description: "Pay through your bank",
    },
    {
      value: "COD",
      title: "Cash on Delivery",
      description: "Pay when your order arrives",
    },
  ];

  return (
    <section className="bg-[#FAF7F2] border border-luxury-gold/20 p-5 sm:p-6 md:p-8">

      <div className="mb-7">
        <p className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold mb-2">
          Step 03
        </p>

        <h2 className="font-serif text-2xl text-luxury-dark uppercase tracking-[0.08em]">
          Payment Method
        </h2>
      </div>

      <div className="space-y-3">

        {options.map((option) => {

          const selected =
            paymentMethod === option.value;

          return (
            <label
              key={option.value}
              className={`
                flex
                items-center
                gap-4
                p-4
                border
                cursor-pointer
                transition-all
                ${
                  selected
                    ? "border-luxury-gold bg-luxury-gold/5"
                    : "border-luxury-gold/15 hover:border-luxury-gold/40"
                }
              `}
            >

              <input
                type="radio"
                name="paymentMethod"
                value={option.value}
                checked={selected}
                onChange={() =>
                  onChange(option.value)
                }
                className="accent-[#C5A880]"
              />

              <div className="flex-1">

                <p className="text-sm text-luxury-dark font-medium">
                  {option.title}
                </p>

                <p className="text-[10px] text-[#777] mt-1">
                  {option.description}
                </p>

              </div>

              {selected && (
                <span className="text-[9px] uppercase tracking-widest text-luxury-gold">
                  Selected
                </span>
              )}

            </label>
          );
        })}

      </div>
    </section>
  );
}