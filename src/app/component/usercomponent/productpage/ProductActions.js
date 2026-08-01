"use client";

import { FaHeart, FaShoppingCart, FaBolt } from "react-icons/fa";
import { useState } from "react";

export default function ProductActions({
  quantity,
  onAddToCart,
  onBuyNow,
  disabled = false,
}) {
  const [wishlist, setWishlist] = useState(false);

  return (
    <div className="space-y-4">

      {/* Wishlist */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setWishlist(!wishlist)}
        className={`w-full border rounded-xl py-4 flex items-center justify-center gap-3 transition ${
          wishlist
            ? "border-red-500 text-red-500"
            : "border-gray-300 text-gray-800"
        }`}
      >
        <FaHeart />

        {wishlist
          ? "Added to Wishlist"
          : "Add to Wishlist"}
      </button>

      {/* Cart + Buy Now */}
      <div className="grid grid-cols-2 gap-3">

        <button
          type="button"
          disabled={disabled}
          onClick={() => onAddToCart(quantity)}
          className="bg-black text-white rounded-xl py-4 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <FaShoppingCart />
          Add to Cart
        </button>

        <button
          type="button"
          disabled={disabled}
          onClick={() => onBuyNow(quantity)}
          className="bg-gray-900 text-white rounded-xl py-4 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          <FaBolt />
          Buy Now
        </button>

      </div>

    </div>
  );
}