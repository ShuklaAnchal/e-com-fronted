
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

  // Get cart from Redux
  const cartState = useSelector((state) => state.cart);

  const cartItems =
    cartState?.cart?.items ||
    cartState?.items ||
    cartState?.cartItems ||
    [];

  // Check whether the selected product and variant are in the cart
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
      String(itemVariantId ?? "") === String(variantId ?? "")
    );
  });

  // Add to wishlist
  const handleWishlist = async () => {
    if (!productId || wishlistLoading || disabled) {
      return;
    }

    try {
      setWishlistLoading(true);

      const formData = {
        productId,
        ...(variantId ? { variantId } : {}),
      };

      const result = await dispatch(createWishlist(formData));

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
    <div className="w-full space-y-3 sm:space-y-4">

      {/* Add to Cart and Buy Now */}

      <div className="grid grid-cols-1 gap-2.5 min-[360px]:grid-cols-2 sm:gap-3">
        {/* Buy Now */}

        <button
          type="button"
          disabled={disabled}
          onClick={() => onBuyNow?.(quantity)}
          className="
            flex min-h-11 w-full min-w-0 items-center
            justify-center gap-2 rounded-lg
            bg-gray-900 px-2.5 py-3
            text-xs font-medium text-white
            transition-all duration-200
            hover:bg-black hover:shadow-md
            active:scale-[0.98]
            sm:min-h-12 sm:gap-2 sm:rounded-xl
            sm:px-3 sm:py-3.5 sm:text-sm
            lg:min-h-14 lg:px-4 lg:py-4 lg:text-base
            disabled:cursor-not-allowed disabled:opacity-50
            disabled:active:scale-100
          "
        >
          <FaBolt
            className="shrink-0 text-xs sm:text-sm"
            aria-hidden="true"
          />

          <span className="truncate">Buy Now</span>
        </button>

      <button
        type="button"
        disabled={disabled || wishlistLoading || wishlist}
        onClick={handleWishlist}
        className={`
          flex min-h-11 w-full items-center justify-center gap-2
          rounded-lg border px-3 py-3
          text-xs font-medium transition-all duration-200
          active:scale-[0.98]
          sm:min-h-12 sm:gap-3 sm:rounded-xl sm:px-4
          sm:py-3.5 sm:text-sm
          lg:min-h-14 lg:py-4 lg:text-base
          ${
            wishlist
              ? "border-red-500 text-red-500"
              : "border-gray-300 text-gray-800 hover:border-gray-500"
          }
          disabled:cursor-not-allowed disabled:opacity-60
          disabled:active:scale-100
        `}
      >
        <FaHeart
          className="shrink-0 text-sm sm:text-base"
          aria-hidden="true"
        />

        <span className="truncate">
          {wishlistLoading
            ? "Adding..."
            : wishlist
              ? "Added to Wishlist"
              : "Add to Wishlist"}
        </span>
      </button>

      </div>
    </div>
  );
}
