"use client";

import { FaHeart, FaShoppingCart, FaBolt } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWishlist } from "@/app/store/action/wishlistAction";

export default function ProductActions({
  productId,
  variantId,
  quantity,
  onAddToCart,
  onBuyNow,
  disabled = false,
}) {
  const dispatch = useDispatch();

  const [wishlist, setWishlist] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // GET CART FROM REDUX
  const cartState = useSelector((state) => state.cart);

  console.log("CART STATE:", cartState);

  // Adjust this depending on your reducer structure
  const cartItems =
    cartState?.cart?.items ||
    cartState?.items ||
    cartState?.cartItems ||
    [];

  // CHECK CURRENT PRODUCT + VARIANT
  const isInCart = cartItems.some((item) => {
    const itemProductId =
      item?.productId?._id ||
      item?.productId ||
      item?.product?._id;

    const itemVariantId =
      item?.variantId?._id ||
      item?.variantId ||
      item?.selectedVariant?._id;

    return (
      String(itemProductId) === String(productId) &&
      String(itemVariantId) === String(variantId)
    );
  });

  console.log("Current Product ID:", productId);
  console.log("Current Variant ID:", variantId);
  console.log("Is In Cart:", isInCart);

  // =========================
  // WISHLIST
  // =========================
  const handleWishlist = async () => {
    if (!productId) {
      console.error("Product ID is missing");
      return;
    }

    try {
      setWishlistLoading(true);

      const formData = {
        productId,
        ...(variantId ? { variantId } : {}),
      };

      console.log("Adding to wishlist:", formData);

      const result = await dispatch(createWishlist(formData));

      console.log("Wishlist result:", result);

      if (result?.success) {
        setWishlist(true);
      }
    } catch (error) {
      console.error("WISHLIST ERROR:", error);
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="space-y-4">

      {/* =========================
          WISHLIST
      ========================= */}
      <button
        type="button"
        disabled={disabled || wishlistLoading}
        onClick={handleWishlist}
        className={`w-full rounded-xl border py-4 flex items-center justify-center gap-3 transition ${
          wishlist
            ? "border-red-500 text-red-500"
            : "border-gray-300 text-gray-800"
        } disabled:opacity-50`}
      >
        <FaHeart />

        {wishlistLoading
          ? "Adding..."
          : wishlist
            ? "Added to Wishlist"
            : "Add to Wishlist"}
      </button>

      {/* =========================
          CART + BUY NOW
      ========================= */}
      <div className="grid grid-cols-2 gap-3">

        {/* ADD TO CART */}
        <button
          type="button"
          disabled={disabled || isInCart}
          onClick={() => onAddToCart(quantity)}
          className={`rounded-xl py-4 flex items-center justify-center gap-2 transition ${
            isInCart
              ? "bg-green-600 text-white cursor-default"
              : "bg-black text-white hover:bg-gray-800"
          } disabled:opacity-70`}
        >
          <FaShoppingCart />

          {isInCart ? "Added to Cart" : "Add to Cart"}
        </button>

        {/* BUY NOW */}
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