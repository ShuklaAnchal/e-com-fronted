"use client";

import React from "react";

export default function CheckoutHeader() {
  return (
    <div className="border-b border-luxury-gold/20 bg-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold mb-2">
              Secure Checkout
            </p>

            <h1 className="font-serif text-3xl md:text-4xl text-luxury-dark uppercase tracking-[0.08em]">
              Checkout
            </h1>
          </div>

          <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#777]">
            <span>Cart</span>

            <span>—</span>

            <span className="text-luxury-dark font-medium">
              Checkout
            </span>

            <span>—</span>

            <span>Payment</span>
          </div>

        </div>
      </div>
    </div>
  );
}