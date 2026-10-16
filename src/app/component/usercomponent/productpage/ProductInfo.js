"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
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

// Normalize MongoDB IDs and populated references.
const getId = (value) => {
  if (value && typeof value === "object") {
    return String(value._id || value.id || "");
  }

  return String(value ?? "");
};

// Replace this with your actual backend review average when available.
const getFakeRating = (value = "product") => {
  let hash = 0;

  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) | 0;
  }

  return (35 + (Math.abs(hash) % 14)) / 10;
};

const EMPTY_ARRAY = [];
export default function ProductInfo({
  product,
  variants = [],
  productDetails = [],
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  // Redux state: declare each selector only once.
  const cartItems = useSelector(
    (state) => state.cart?.cartItems ?? state.cart?.cart ?? EMPTY_ARRAY,
  );

  const wishlistItems = useSelector(
    (state) => state.wishlist?.wishlistItems ?? EMPTY_ARRAY,
  );

  // Avoid accessing localStorage during server rendering.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const syncAuthentication = () => {
      setIsLoggedIn(Boolean(localStorage.getItem("userToken")));
    };

    syncAuthentication();

    // Also handle login/logout events dispatched by your app.
    window.addEventListener("storage", syncAuthentication);
    window.addEventListener("auth-change", syncAuthentication);

    return () => {
      window.removeEventListener("storage", syncAuthentication);
      window.removeEventListener("auth-change", syncAuthentication);
    };
  }, []);

  // Select the default variant, falling back to the first available variant.
  const defaultVariant = useMemo(
    () => variants.find((variant) => variant?.isDefault) || variants[0] || null,
    [variants],
  );

  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const [quantity, setQuantity] = useState(1);

  const [pincode, setPincode] = useState("");
  const [deliveryResult, setDeliveryResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keep the selection valid if variants arrive asynchronously.
  useEffect(() => {
    setSelectedVariant((current) => {
      if (
        current?._id &&
        variants.some((variant) => getId(variant?._id) === getId(current._id))
      ) {
        return (
          variants.find(
            (variant) => getId(variant?._id) === getId(current._id),
          ) || defaultVariant
        );
      }

      return defaultVariant;
    });
  }, [variants, defaultVariant]);

  // Reset quantity if a variant's stock changes.
  const stock = Math.max(
    0,
    Number(selectedVariant?.inventory?.stockQuantity ?? 0),
  );

  const isInStock =
    Boolean(selectedVariant?._id) &&
    stock > 0 &&
    selectedVariant?.inventory?.inStock !== false;

  useEffect(() => {
    setQuantity((current) =>
      Math.min(Math.max(1, current), Math.max(1, stock)),
    );
  }, [stock, selectedVariant?._id]);

  // Pricing comes from the selected variant.
  const pricing = selectedVariant?.pricing || {};

  const sellingPrice = Number(pricing.sellingPrice ?? 0);
  const mrp = Number(pricing.mrp ?? 0);

  const discountPercent =
    Number(
      pricing.discountPercent ??
        (mrp > sellingPrice && mrp > 0
          ? Math.round(((mrp - sellingPrice) / mrp) * 100)
          : 0),
    ) || 0;

  // Only show a rating if your review data is available.
  const fakeRating = getFakeRating(
    getId(product?._id) || product?.name || "product",
  );

  // Match the selected product AND variant.
  const isAlreadyInCart = useMemo(() => {
    return cartItems.some((item) => {
      const productId = getId(item?.productId || item?.product);

      const variantId = getId(
        item?.variantId || item?.selectedVariant || item?.variant,
      );

      return (
        productId === getId(product?._id) &&
        variantId === getId(selectedVariant?._id)
      );
    });
  }, [cartItems, product?._id, selectedVariant?._id]);

  const isAlreadyInWishlist = useMemo(() => {
    return wishlistItems.some((item) => {
      const productId = getId(item?.productId || item?.product);

      const variantId = getId(
        item?.variantId || item?.selectedVariant || item?.variant,
      );

      // Match by product and variant where the wishlist stores variants.
      // Product-level wishlist entries also count as a match.
      return (
        productId === getId(product?._id) &&
        (!variantId || variantId === getId(selectedVariant?._id))
      );
    });
  }, [wishlistItems, product?._id, selectedVariant?._id]);

  // Shared validation for Add to Cart and Buy Now.
  const validatePurchase = useCallback(
    (qty) => {
      if (!product?._id) {
        return "Product information is unavailable.";
      }

      if (!selectedVariant?._id) {
        return "Please select a product variant.";
      }

      if (!Number.isInteger(Number(qty)) || Number(qty) < 1) {
        return "Please select a valid quantity.";
      }

      if (!isInStock) {
        return "This product is currently out of stock.";
      }

      if (Number(qty) > stock) {
        return `Only ${stock} item(s) are available.`;
      }

      if (!Number.isFinite(sellingPrice) || sellingPrice <= 0) {
        return "The price for this variant is currently unavailable.";
      }

      return null;
    },
    [product?._id, selectedVariant, isInStock, stock, sellingPrice],
  );

  // Add to cart.
  // Assumes your existing action signature is:
  // addToCartAction(productWithVariant, quantity)
  const handleAddToCart = useCallback(
    async (qty = quantity) => {
      const validationError = validatePurchase(qty);

      if (validationError) {
        window.alert(validationError);
        return false;
      }

      if (isSubmitting) return false;

      setIsSubmitting(true);

      try {
        const result = await dispatch(
          addToCartAction(
            {
              ...product,
              selectedVariant,
            },
            Number(qty),
          ),
        );

        // Support Redux Toolkit async thunks.
        if (result?.meta?.requestStatus === "rejected") {
          throw new Error(
            result.payload?.message ||
              result.payload ||
              result.error?.message ||
              "Unable to add this item to your cart.",
          );
        }

        const response = result?.payload ?? result;

        // Recognize common API/action failure shapes.
        if (
          response?.success === false ||
          response?.error ||
          response?.status === "error"
        ) {
          throw new Error(
            response?.message ||
              response?.error?.message ||
              "Unable to add this item to your cart.",
          );
        }

        // Do not block adding a product just because it is
        // already in the cart. Your cart action must merge or
        // increment the matching product/variant quantity.
        return true;
      } catch (error) {
        console.error("ADD TO CART ERROR:", error);

        window.alert(
          typeof error === "string"
            ? error
            : error?.message || "Unable to add this item. Please try again.",
        );

        return false;
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      dispatch,
      product,
      selectedVariant,
      quantity,
      validatePurchase,
      isSubmitting,
    ],
  );

  // Buy Now: validate, add/update the cart, then navigate.
  const handleBuyNow = useCallback(
    async (qty = quantity) => {
      const validationError = validatePurchase(qty);

      if (validationError) {
        window.alert(validationError);
        return;
      }

      // If the selected variant is already in the cart, proceed
      // to the cart without accidentally adding it a second time.
      if (isAlreadyInCart) {
        router.push("/user/cart");
        return;
      }

      const added = await handleAddToCart(qty);

      if (added) {
        router.push("/user/cart");
      }
    },
    [quantity, validatePurchase, isAlreadyInCart, handleAddToCart, router],
  );

  // Delivery estimate only; this does not call a courier API.
  const checkPincode = () => {
    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      setDeliveryResult({
        available: false,
        message: "Please enter a valid 6-digit Indian PIN code.",
      });
      return;
    }

    setDeliveryResult({
      available: null,
      message:
        "PIN code entered. Confirm delivery availability and ETA at checkout.",
    });
  };

  if (!product?._id) {
    return (
      <div className="w-full py-6 text-sm text-gray-500">
        Product information is currently unavailable.
      </div>
    );
  }

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
        <span>
          {typeof product.category === "object"
            ? product.category?.name
            : product.category}
        </span>

        {product.subCategory?.name && (
          <>
            <span>/</span>
            <span>{product.subCategory.name}</span>
          </>
        )}
      </div>

      {/* PRICE */}
      <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-gray-200 pb-4 sm:mb-4 sm:gap-4">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-2xl font-medium text-gray-900 sm:text-3xl">
            ₹{sellingPrice.toLocaleString("en-IN")}
          </span>

          {mrp > sellingPrice && (
            <span className="text-sm text-gray-400 line-through sm:text-lg">
              ₹{mrp.toLocaleString("en-IN")}
            </span>
          )}

          {mrp > sellingPrice && discountPercent > 0 && (
            <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] text-green-700 sm:px-3 sm:text-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Illustrative only. Do not present as a real review score. */}
        <div
          className="flex items-center gap-1.5"
          aria-label={`Illustrative rating ${fakeRating} out of 5, not customer reviews`}
          title="Illustrative rating, not a verified customer review score"
        >
          <FaStar
            aria-hidden="true"
            className="text-base text-amber-500 sm:text-lg"
          />
          <span className="text-sm text-gray-800 sm:text-base">
            {fakeRating.toFixed(1)}
          </span>
          <span className="text-xs text-gray-500">(illustrative)</span>
        </div>
      </div>

      {/* DESCRIPTION */}
      <p className="mb-4 text-sm leading-6 text-gray-600 sm:mb-5 sm:text-base sm:leading-7 lg:leading-8">
        {product.shortDescription ||
          "A thoughtfully crafted product from Siyaas."}
      </p>

      {/* VARIANTS */}
      {variants.length > 0 && (
        <div className="mb-4 sm:mb-5">
          <p className="mb-2.5 text-[10px] uppercase tracking-[0.18em] text-gray-500 sm:mb-3 sm:text-xs sm:tracking-[0.25em]">
            Choose Variant
          </p>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            {variants.map((variant) => {
              const isSelected =
                getId(selectedVariant?._id) === getId(variant?._id);

              const attribute = variant.attributes?.[0];

              const label =
                attribute?.value || variant.name || variant.sku || "Variant";

              const variantStock = Number(
                variant.inventory?.stockQuantity ?? 0,
              );

              const variantAvailable =
                variantStock > 0 && variant.inventory?.inStock !== false;

              return (
                <button
                  key={variant._id}
                  type="button"
                  disabled={!variantAvailable}
                  onClick={() => {
                    setSelectedVariant(variant);
                    setQuantity(1);
                    setDeliveryResult(null);
                  }}
                  aria-pressed={isSelected}
                  className={`min-h-10 rounded-full border px-3 py-2 text-xs transition sm:px-5 sm:py-3 sm:text-sm ${
                    isSelected
                      ? "border-black bg-black text-white"
                      : "border-gray-300 hover:border-black"
                  } disabled:cursor-not-allowed disabled:opacity-40`}
                >
                  {label}
                  {!variantAvailable ? " (Out of stock)" : ""}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* STOCK */}
      <div className="mb-3 sm:mb-4" aria-live="polite">
        {isInStock ? (
          <p className="text-xs text-green-600 sm:text-sm">
            ✓ In Stock
            {stock <= 10 ? ` — Only ${stock} left` : ""}
          </p>
        ) : (
          <p className="text-xs text-red-500 sm:text-sm">
            Out of stock or variant unavailable
          </p>
        )}
      </div>

      {/* QUANTITY */}
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
            disabled={!isInStock || isSubmitting}
            onClick={() => handleAddToCart(quantity)}
            className="flex min-h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-lg bg-black px-3 py-2.5 text-xs font-medium text-white transition hover:bg-gray-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:min-h-12 sm:rounded-xl sm:px-4 sm:text-sm lg:min-h-14 lg:text-base"
          >
            <FaShoppingCart className="shrink-0" />
            <span className="truncate">
              {isSubmitting
                ? "Adding..."
                : isAlreadyInCart
                  ? "Add More"
                  : "Add to Cart"}
            </span>
          </button>
        </div>
      </div>

      {/* BUY NOW + WISHLIST */}
      <div className="mb-5 w-full min-w-0 sm:mb-6">
        <ProductActions
          productId={product._id}
          variantId={selectedVariant?._id}
          quantity={quantity}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          disabled={!isInStock || isSubmitting}
          isAlreadyInCart={isAlreadyInCart}
          isAlreadyInWishlist={isAlreadyInWishlist}
          layout="secondary-actions"
        />
      </div>

      {/* DELIVERY CHECK */}
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
            placeholder="Enter PIN code"
            aria-label="Enter delivery PIN code"
            maxLength={6}
            value={pincode}
            onChange={(event) => {
              setPincode(event.target.value.replace(/\D/g, ""));
              setDeliveryResult(null);
            }}
            className="h-10 min-w-0 flex-1 rounded-lg border border-gray-300 px-3 text-sm outline-none transition placeholder:text-xs focus:border-black sm:h-11"
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
            role="status"
            className={`mt-3 text-xs leading-5 sm:mt-4 sm:text-sm ${
              deliveryResult.available === false
                ? "text-red-500"
                : "text-gray-600"
            }`}
          >
            {deliveryResult.message}
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
              7-day replacement for damaged items, subject to policy
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
              Secure checkout with your configured payment provider
            </p>
          </div>
        </div>

        <div className="flex min-w-0 items-start gap-3">
          <FaCheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-gray-700 sm:h-5 sm:w-5" />
          <div className="min-w-0">
            <h4 className="text-sm font-medium sm:text-base">
              Quality Assured
            </h4>
            <p className="mt-1 text-xs leading-5 text-gray-500 sm:text-sm">
              Carefully crafted Siyaas products
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
