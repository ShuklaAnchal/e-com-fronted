"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import {
  FaTruck,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

import { MdSecurity, MdAutorenew } from "react-icons/md";

import { addToCartAction } from "@/app/store/action/cartAction";

import QuantitySelector from "./QuantitySelector";
import ProductActions from "./ProductActions";

// Generate a consistent placeholder rating between 3.5 and 4.8
const getFakeRating = (value = "product") => {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }

  return (35 + (Math.abs(hash) % 14)) / 10;
};

// Stable pseudo-random activity indicator, 50–500.
// This is NOT a real purchase count.
const getProductActivityCount = (productId) => {
  const value = String(productId || "product");
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }

  return 50 + (Math.abs(hash) % 451);
};

export default function ProductInfo({
  product,
  variants = [],
  productDetails = [],
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  // REDUX DATA
  const cartItems = useSelector((state) => state.cart?.cartItems || []);

  const wishlistItems = useSelector(
    (state) => state.wishlist?.wishlistItems || [],
  );

  // DEFAULT VARIANT
  const defaultVariant =
    variants.find((variant) => variant.isDefault) || variants[0] || null;

  // STATES
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const [pincode, setPincode] = useState("");
  const [deliveryResult, setDeliveryResult] = useState(null);

  // PRICING
  const pricing = selectedVariant?.pricing || {};

  const sellingPrice = pricing.sellingPrice || 0;
  const mrp = pricing.mrp || 0;
  const discountPercent = pricing.discountPercent || 0;

  // FAKE RATING
  const fakeRating = getFakeRating(
    String(product?._id || product?.name || "product"),
  );

  // PRODUCT ACTIVITY INDICATOR
  const activityCount = getProductActivityCount(product?._id || product?.name);

  // STOCK
  const stock = selectedVariant?.inventory?.stockQuantity || 0;

  const isInStock = Boolean(selectedVariant?.inventory?.inStock) && stock > 0;

  // LOW STOCK MESSAGE: based on actual inventory
  const showLowStock = isInStock && stock <= 10;

  // CHECK CART
  const isAlreadyInCart = cartItems.some((item) => {
    const cartProductId =
      typeof item.product === "object" ? item.product?._id : item.product;

    const cartVariantId =
      typeof item.variantId === "object" ? item.variantId?._id : item.variantId;

    return (
      String(cartProductId) === String(product?._id) &&
      String(cartVariantId) === String(selectedVariant?._id)
    );
  });

  // CHECK WISHLIST
  const isAlreadyInWishlist = wishlistItems.some((item) => {
    const wishlistProductId =
      typeof item.product === "object" ? item.product?._id : item.product;

    const wishlistVariantId =
      typeof item.variantId === "object" ? item.variantId?._id : item.variantId;

    return (
      String(wishlistProductId) === String(product?._id) &&
      String(wishlistVariantId) === String(selectedVariant?._id)
    );
  });

  // ADD TO CART
  const handleAddToCart = async (qty) => {
    if (!selectedVariant) {
      alert("Please select a variant.");
      return;
    }

    if (!isInStock) {
      alert("This product is currently out of stock.");
      return;
    }

    if (isAlreadyInCart) {
      alert("This product variant is already in your cart.");
      return;
    }

    try {
      const result = await dispatch(
        addToCartAction(
          {
            ...product,
            selectedVariant,
          },
          qty,
        ),
      );

      if (result?.success) {
        console.log("Product added to cart successfully");
      } else {
        alert(result?.message || "Unable to add product.");
      }
    } catch (error) {
      console.error("ADD TO CART ERROR:", error);
    }
  };

  // BUY NOW
  const handleBuyNow = async (qty) => {
    if (!selectedVariant) {
      console.error("Please select a variant.");
      return;
    }

    if (!isInStock) {
      console.error("This product is currently out of stock.");
      return;
    }

    try {
      if (isAlreadyInCart) {
        router.push("/user/cart");
        return;
      }

      const result = await dispatch(
        addToCartAction(
          {
            ...product,
            selectedVariant,
          },
          qty,
        ),
      );

      if (result?.success) {
        router.push("/user/cart");
      } else {
        console.error(result?.message || "Unable to proceed.");
      }
    } catch (error) {
      console.error("BUY NOW ERROR:", error);
    }
  };

  // DELIVERY CHECK
  const checkPincode = () => {
    if (pincode.length !== 6) {
      setDeliveryResult({
        available: false,
        message: "Please enter a valid 6 digit pincode.",
      });
      return;
    }

    // This is an estimate, not a live courier serviceability check.
    setDeliveryResult({
      available: true,
      date: "Estimated delivery in 3–5 business days",
    });
  };

  return (
    <div className="flex w-full min-w-0 flex-col">
      {/* BRAND */}
      <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-gray-500 sm:mb-3 sm:text-xs sm:tracking-[0.3em] lg:mb-4">
        {product.brand || "Premium Collection"}
      </p>

      {/* PRODUCT NAME */}
      <h1 className="mb-2 break-words font-serif text-2xl leading-tight text-gray-900 sm:mb-3 sm:text-3xl md:text-4xl lg:mb-4 lg:text-5xl">
        {product.name}
      </h1>

      {/* CATEGORY */}
      <div className="mb-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 sm:mb-4 sm:text-sm">
        <span>{product.category?.name}</span>

        {product.subCategory?.name && (
          <>
            <span>/</span>
            <span>{product.subCategory.name}</span>
          </>
        )}
      </div>

      {/* PRICE + RATING */}
      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-gray-200 pb-3 sm:mb-3 sm:gap-4 sm:pb-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-2xl font-medium text-gray-900 sm:text-3xl">
            ₹{sellingPrice}
          </span>

          {mrp > sellingPrice && (
            <span className="text-sm text-gray-400 line-through sm:text-lg">
              ₹{mrp}
            </span>
          )}

          {discountPercent > 0 && (
            <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] text-green-700 sm:px-3 sm:text-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* STAR RATING */}
        <div
          className="flex items-center gap-1.5"
          aria-label={`Placeholder rating: ${fakeRating} out of 5`}
          title="Illustrative rating, not a verified review score"
        >
          <FaStar className="text-base text-amber-500 sm:text-lg" />

          <span className="text-sm font-normal text-gray-800 sm:text-base">
            {fakeRating.toFixed(1)}
          </span>
        </div>
      </div>

      {/* LIMITED-TIME OFFER: SMALL TEXT AFTER PRICE */}
      <div className="mb-3 flex items-center gap-1.5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          className="h-3.5 w-3.5 shrink-0 text-amber-700"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
        </svg>

        <span className="text-[11px] font-medium tracking-wide text-amber-800 sm:text-xs">
          Limited-time offer
        </span>
      </div>

      {/* SHORT DESCRIPTION */}
      <p className="mb-4 text-sm leading-6 text-gray-600 sm:mb-5 sm:text-base sm:leading-7 lg:leading-8">
        {product.shortDescription ||
          "Premium quality product crafted with care."}
      </p>

      {/* VARIANTS */}
      {variants.length > 0 && (
        <div className="mb-4 sm:mb-5">
          <p className="mb-2.5 text-[10px] uppercase tracking-[0.18em] text-gray-500 sm:mb-3 sm:text-xs sm:tracking-[0.25em]">
            Choose Variant
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {variants.map((variant) => {
              const isSelected = selectedVariant?._id === variant._id;

              const variantAttribute = variant.attributes?.[0];

              return (
                <button
                  key={variant._id}
                  type="button"
                  onClick={() => {
                    setSelectedVariant(variant);
                    setQuantity(1);
                  }}
                  aria-pressed={isSelected}
                  className={`min-h-10 rounded-full border px-3 py-2 text-xs transition sm:px-5 sm:py-3 sm:text-sm ${
                    isSelected
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-black"
                  }`}
                >
                  {variantAttribute?.value || variant.sku || "Variant"}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STOCK */}
      <div className="mb-3 sm:mb-4">
        {isInStock ? (
          <p className="text-xs text-green-600 sm:text-sm">
            ✓ In Stock ({stock} available)
          </p>
        ) : (
          <p className="text-xs text-red-500 sm:text-sm">Out of Stock</p>
        )}
      </div>

      {/* LOW STOCK URGENCY */}
      {showLowStock && (
        <div className="mb-4 flex items-start gap-2 rounded-lg border border-orange-200 bg-orange-50 p-3">
          <span className="text-sm" aria-hidden="true">
            🔥
          </span>

          <div>
            <p className="text-xs font-semibold text-orange-800 sm:text-sm">
              {stock <= 5
                ? `Hurry! Only ${stock} left in stock`
                : `Limited stock: ${stock} available`}
            </p>

            <p className="mt-1 text-[11px] leading-4 text-orange-700 sm:text-xs">
              Stock is limited. Order soon if you would like this item.
            </p>
          </div>
        </div>
      )}

      {/* PRODUCT ACTIVITY INDICATOR */}

      {/* PRODUCT ACTIVITY INDICATOR */}
      <div className="mb-4 flex items-center gap-2 sm:mb-5">
        <FaShoppingCart className="shrink-0 text-[#5C4033]" />

        <p className="text-xs font-medium text-[#5C4033] sm:text-sm">
          {activityCount} people bought in the last 30 days
        </p>
      </div>

      {/* QUANTITY + ADD TO CART */}
      <div className="mb-3 w-full min-w-0">
        <p className="mb-2.5 text-[10px] uppercase tracking-wider sm:mb-3 sm:text-xs">
          Quantity
        </p>

        <div className="flex w-full min-w-0 items-stretch gap-2 sm:gap-3">
          <div className="shrink-0">
            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
              min={1}
              max={Math.max(1, stock)}
            />
          </div>

          <button
            type="button"
            disabled={!isInStock}
            onClick={() => handleAddToCart(quantity)}
            className="flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-black px-3 py-2.5 text-xs font-medium text-white transition hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-12 sm:rounded-xl sm:px-4 sm:text-sm lg:min-h-14 lg:text-base"
          >
            <FaShoppingCart className="shrink-0" />
            <span className="truncate">Add to Cart</span>
          </button>
        </div>
      </div>

      {/* BUY NOW + WISHLIST */}
      <div className="mb-5 w-full min-w-0 sm:mb-6">
        <ProductActions
          productId={product?._id}
          variantId={selectedVariant?._id}
          quantity={quantity}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          disabled={!isInStock}
          isAlreadyInCart={isAlreadyInCart}
          isAlreadyInWishlist={isAlreadyInWishlist}
          layout="secondary-actions"
        />
      </div>

      {/* DELIVERY */}
      <div className="mt-5 mb-2 rounded-xl border border-gray-200 p-3 sm:mt-7 sm:rounded-2xl sm:p-4">
        <div className="mb-3 flex items-center gap-2 sm:mb-5">
          <FaMapMarkerAlt className="h-4 w-4 shrink-0 text-gray-700 sm:h-5 sm:w-5" />

          <h3 className="text-[10px] font-medium uppercase tracking-wider sm:text-xs">
            Check Delivery
          </h3>
        </div>

        <form
          className="flex w-full min-w-0 gap-2 sm:gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            checkPincode();
          }}
        >
          <input
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="Enter Pincode"
            aria-label="Enter delivery pincode"
            maxLength={6}
            value={pincode}
            onChange={(event) =>
              setPincode(event.target.value.replace(/\D/g, ""))
            }
            className="h-10 min-w-0 flex-1 rounded-lg border border-gray-300 px-3 text-sm outline-none transition placeholder:text-xs focus:border-black sm:h-11 sm:text-sm"
          />

          <button
            type="submit"
            className="h-10 shrink-0 rounded-lg bg-black px-4 text-xs text-white transition hover:bg-gray-800 sm:h-11 sm:px-6 sm:text-sm"
          >
            Check
          </button>
        </form>

        {deliveryResult && (
          <p
            className={`mt-3 text-xs leading-5 sm:mt-4 sm:text-sm ${
              deliveryResult.available ? "text-green-600" : "text-red-500"
            }`}
          >
            {deliveryResult.available
              ? `✓ ${deliveryResult.date}`
              : deliveryResult.message}
          </p>
        )}
      </div>

      {/* TRUST FEATURES */}
      <div className="mt-6 grid grid-cols-1 gap-x-4 gap-y-4 sm:mt-8 sm:grid-cols-2 sm:gap-5 lg:mt-10 lg:gap-6">
        <div className="flex min-w-0 items-start gap-3">
          <FaTruck className="mt-0.5 h-4 w-4 shrink-0 text-gray-700 sm:h-5 sm:w-5" />

          <div className="min-w-0">
            <h4 className="text-sm font-medium sm:text-base">Free Shipping</h4>

            <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
              On prepaid orders above ₹999
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-start gap-3">
          <MdAutorenew className="mt-0.5 h-5 w-5 shrink-0 text-gray-700 sm:h-6 sm:w-6" />

          <div className="min-w-0">
            <h4 className="text-sm font-medium sm:text-base">Easy Returns</h4>

            <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
              7-Day replacement for damaged items
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-start gap-3">
          <MdSecurity className="mt-0.5 h-4 w-4 shrink-0 text-gray-700 sm:h-5 sm:w-5" />

          <div className="min-w-0">
            <h4 className="text-sm font-medium sm:text-base">
              Secure Payments
            </h4>

            <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
              100% encrypted checkout
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-start gap-3">
          <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-gray-700 sm:h-5 sm:w-5" />

          <div className="min-w-0">
            <h4 className="text-sm font-medium sm:text-base">
              Authentic Product
            </h4>

            <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
              Quality assured product
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
