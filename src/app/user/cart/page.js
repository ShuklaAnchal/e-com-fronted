"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import Header from "@/app/component/mainpage/Header";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";
import Footer from "@/app/component/resuable/Footer";

import {
  fetchCart,
  removeFromCartAction,
  updateCartQuantityAction,
} from "@/app/store/action/cartAction";

import { getMediaUrl } from "@/app/utils/mediaUrl";

const PLACEHOLDER_IMAGE = "/placeholder-product.png";

const getProductId = (item) => {
  const product = item?.productId ?? item?.product;

  if (typeof product === "string") {
    return product;
  }

  return product?._id ?? product?.id ?? "";
};

const getProductName = (item) => {
  const product = item?.productId ?? item?.product;

  return (
    item?.name ||
    (typeof product === "object" ? product?.name : "") ||
    "Product"
  );
};

const getProductBrand = (item) => {
  const product = item?.productId ?? item?.product;

  return (
    (typeof product === "object" ? product?.brand : "") ||
    "Siyaas"
  );
};

const getProductImage = (item) => {
  const product = item?.productId ?? item?.product;

  // Your current Redux cart data uses item.image.
  const directImage =
    item?.image ||
    item?.productImage ||
    item?.thumbnail;

  const media = Array.isArray(product?.media)
    ? product.media
    : [];

  const primaryImage =
    media.find(
      (entry) =>
        entry?.mediaType === "image" &&
        entry?.isPrimary === true &&
        entry?.url
    )?.url ||
    media.find(
      (entry) =>
        entry?.mediaType === "image" &&
        entry?.url
    )?.url;

  const rawImage = directImage || primaryImage;

  if (
    !rawImage ||
    String(rawImage).includes("undefined") ||
    String(rawImage).includes("null")
  ) {
    return PLACEHOLDER_IMAGE;
  }

  // Preserve valid external URLs, including Cloudinary URLs.

  return getMediaUrl(rawImage) || PLACEHOLDER_IMAGE;
};

const getVariantLabel = (item) => {
  const product = item?.productId ?? item?.product;
  const variants = Array.isArray(product?.variants)
    ? product.variants
    : [];

  const selectedVariant = variants.find(
    (variant) =>
      String(variant?._id) === String(item?.variantId)
  );

  return (
    item?.variantLabel ||
    selectedVariant?.variantLabel ||
    selectedVariant?.name ||
    selectedVariant?.color ||
    selectedVariant?.size ||
    ""
  );
};

const getCartItemKey = (item, index) => {
  const productId = getProductId(item);
  const variantId = item?.variantId || "default";

  return (
    item?._id ||
    item?.id ||
    `${productId}-${variantId}-${index}`
  );
};

const formatPrice = (amount) =>
  `₹${(Number(amount) || 0).toLocaleString("en-IN")}`;

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);
  const [updatingItems, setUpdatingItems] = useState({});
  const [removingItems, setRemovingItems] = useState({});

  const cartState = useSelector((state) => state.cart);

  const cartItems = Array.isArray(cartState?.cartItems)
    ? cartState.cartItems
    : [];

  const loading = Boolean(cartState?.loading);

  useEffect(() => {
    setMounted(true);
    dispatch(fetchCart());
  }, [dispatch]);

  const totalItems = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + Math.max(0, Number(item?.quantity) || 0),
        0
      ),
    [cartItems]
  );

  const subtotal = useMemo(
    () =>
      cartItems.reduce((total, item) => {
        const price = Number(item?.price) || 0;
        const quantity = Number(item?.quantity) || 0;

        return total + price * quantity;
      }, 0),
    [cartItems]
  );

  const handleRemove = useCallback(
    async (item, key) => {
      const productId = getProductId(item);
      const variantId = item?.variantId;

      if (!productId) {
        console.error("Cannot remove cart item: product ID is missing.", item);
        return;
      }

      setRemovingItems((previous) => ({
        ...previous,
        [key]: true,
      }));

      try {
        await dispatch(
          removeFromCartAction({
            productId,
            variantId,
          })
        ).unwrap();
      } catch (error) {
        console.error("REMOVE CART ERROR:", error);
      } finally {
        setRemovingItems((previous) => ({
          ...previous,
          [key]: false,
        }));
      }
    },
    [dispatch]
  );

  const handleQuantityChange = useCallback(
    async (item, change, key) => {
      const productId = getProductId(item);
      const currentQuantity = Number(item?.quantity) || 1;
      const newQuantity = currentQuantity + change;

      if (!productId || newQuantity < 1) {
        return;
      }

      setUpdatingItems((previous) => ({
        ...previous,
        [key]: true,
      }));

      try {
        // Retains your existing action signature.
        await dispatch(
          updateCartQuantityAction(productId, newQuantity)
        ).unwrap();
      } catch (error) {
        console.error("UPDATE CART ERROR:", error);
      } finally {
        setUpdatingItems((previous) => ({
          ...previous,
          [key]: false,
        }));
      }
    },
    [dispatch]
  );

  const handleCheckout = () => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("userToken")
        : null;

    if (
      !token ||
      token === "undefined" ||
      token === "null"
    ) {
      router.push("/sign-up?redirect=/user/checkout");
      return;
    }

    router.push("/user/checkout");
  };

  if (!mounted) {
    return null;
  }

  const pageShell = (children) => (
    <div className="min-h-screen bg-white">
      <MarqueeBar />
      <Header />
      <main className="px-3 pb-20 pt-28 sm:px-6 sm:pt-36">
        {children}
      </main>
      <Footer />
    </div>
  );

  if (loading) {
    return pageShell(
      <div className="flex min-h-[45vh] flex-col items-center justify-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#C5A880]/30 border-t-[#C5A880]" />
        <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500">
          Loading Cart...
        </p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return pageShell(
      <div className="mx-auto max-w-3xl py-8 text-center">
        <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#C5A880] sm:text-xs">
          Your Selection
        </p>

        <h1 className="font-serif text-3xl font-extralight uppercase tracking-[0.08em] text-[#121212] sm:text-5xl">
          Your Cart
        </h1>

        <div className="mt-8 rounded-2xl border border-[#C5A880]/20 bg-[#faf8f4]/50 p-8 sm:p-16">
          <h2 className="mb-3 font-serif text-2xl font-light text-[#121212]">
            Your cart is empty
          </h2>

          <p className="mb-8 text-sm font-light text-gray-500">
            Explore our handcrafted collection and find something
            beautiful for your space.
          </p>

          <button
            type="button"
            onClick={() => router.push("/products")}
            className="rounded-lg border border-[#C5A880] bg-[#C5A880] px-8 py-3 text-[10px] uppercase tracking-[0.2em] text-[#121212] transition hover:bg-transparent"
          >
            Explore Collection
          </button>
        </div>
      </div>
    );
  }

  return pageShell(
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 text-center sm:mb-12">
        <p className="mb-3 text-[10px] uppercase tracking-[0.35em] text-[#C5A880] sm:text-xs">
          Your Selection
        </p>

        <h1 className="font-serif text-3xl font-extralight uppercase tracking-[0.08em] text-[#121212] sm:text-4xl md:text-5xl">
          Shopping Cart
        </h1>

        <p className="mt-3 text-xs text-gray-500 sm:text-sm">
          {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px] lg:gap-10">
        {/* CART PRODUCTS */}
        <section className="overflow-hidden rounded-2xl border border-[#C5A880]/20 bg-white">
          <div className="hidden grid-cols-[1fr_120px_120px] gap-4 border-b border-[#C5A880]/15 bg-[#faf8f4]/60 px-6 py-4 sm:grid">
            <span className="text-[9px] uppercase tracking-[0.2em] text-gray-500">
              Product
            </span>
            <span className="text-center text-[9px] uppercase tracking-[0.2em] text-gray-500">
              Quantity
            </span>
            <span className="text-right text-[9px] uppercase tracking-[0.2em] text-gray-500">
              Total
            </span>
          </div>

          {cartItems.map((item, index) => {
            const key = getCartItemKey(item, index);
            const productId = getProductId(item);
            const name = getProductName(item);
            const brand = getProductBrand(item);
            const image = getProductImage(item);
            const variantLabel = getVariantLabel(item);
            const price = Number(item?.price) || 0;
            const mrp = Number(item?.mrp) || 0;
            const quantity = Number(item?.quantity) || 1;
            const itemTotal = price * quantity;
            const isUpdating = Boolean(updatingItems[key]);
            const isRemoving = Boolean(removingItems[key]);

            const imageElement = (
              <div className="flex h-full w-full items-center justify-center">
                {/* A plain img supports external URLs without Next.js
                    remotePatterns configuration. */}
                <img
                  src={image}
                  alt={name}
                  className="h-full w-full object-contain p-1"
                  loading="lazy"
                  onError={(event) => {
                    if (
                      event.currentTarget.src.endsWith(
                        PLACEHOLDER_IMAGE
                      )
                    ) {
                      return;
                    }

                    event.currentTarget.onerror = null;
                    event.currentTarget.src = PLACEHOLDER_IMAGE;
                  }}
                />
              </div>
            );

            const quantityControl = (
              <div className="inline-flex items-center overflow-hidden rounded-lg border border-[#C5A880]/30">
                <button
                  type="button"
                  aria-label={`Decrease quantity of ${name}`}
                  disabled={quantity <= 1 || isUpdating || isRemoving}
                  onClick={() => handleQuantityChange(item, -1, key)}
                  className="h-8 w-8 text-sm transition hover:bg-[#faf8f4] disabled:opacity-30"
                >
                  −
                </button>

                <span className="w-8 text-center text-xs">
                  {quantity}
                </span>

                <button
                  type="button"
                  aria-label={`Increase quantity of ${name}`}
                  disabled={isUpdating || isRemoving}
                  onClick={() => handleQuantityChange(item, 1, key)}
                  className="h-8 w-8 text-sm transition hover:bg-[#faf8f4] disabled:opacity-30"
                >
                  +
                </button>
              </div>
            );

            const removeButton = (
              <button
                type="button"
                disabled={isRemoving || isUpdating}
                onClick={() => handleRemove(item, key)}
                className="mt-2 text-[9px] uppercase tracking-[0.15em] text-gray-400 transition hover:text-red-500 disabled:opacity-50"
              >
                {isRemoving ? "Removing..." : "Remove"}
              </button>
            );

            return (
              <div
                key={key}
                className="border-b border-[#C5A880]/15 p-4 last:border-b-0 sm:p-6"
              >
                {/* DESKTOP */}
                <div className="hidden grid-cols-[1fr_120px_120px] items-center gap-4 sm:grid">
                  <div className="flex min-w-0 items-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        if (productId) {
                          router.push(`/products/${productId}`);
                        }
                      }}
                      className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-[#C5A880]/15 bg-[#faf8f4]"
                    >
                      {imageElement}
                    </button>

                    <div className="min-w-0">
                      <p className="mb-1 text-[8px] uppercase tracking-[0.2em] text-[#C5A880]">
                        {brand}
                      </p>

                      <h3
                        onClick={() => {
                          if (productId) {
                            router.push(`/products/${productId}`);
                          }
                        }}
                        className="cursor-pointer font-serif text-sm font-light uppercase tracking-[0.06em] text-[#121212] hover:text-[#B08F5A]"
                      >
                        {name}
                      </h3>

                      {variantLabel && (
                        <p className="mt-1 text-[10px] text-gray-500">
                          Variant: {variantLabel}
                        </p>
                      )}

                      <p className="mt-2 text-xs text-gray-500">
                        {formatPrice(price)}
                        {mrp > price && (
                          <span className="ml-2 text-gray-400 line-through">
                            {formatPrice(mrp)}
                          </span>
                        )}
                      </p>

                      {removeButton}
                    </div>
                  </div>

                  <div className="flex justify-center">
                    {quantityControl}
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium text-[#121212]">
                      {formatPrice(itemTotal)}
                    </p>
                    {isUpdating && (
                      <p className="mt-1 text-[9px] text-gray-400">
                        Updating...
                      </p>
                    )}
                  </div>
                </div>

                {/* MOBILE */}
                <div className="flex gap-3 sm:hidden">
                  <button
                    type="button"
                    onClick={() => {
                      if (productId) {
                        router.push(`/products/${productId}`);
                      }
                    }}
                    className="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-[#C5A880]/15 bg-[#faf8f4]"
                  >
                    {imageElement}
                  </button>

                  <div className="min-w-0 flex-1">
                    <p className="text-[8px] uppercase tracking-[0.18em] text-[#C5A880]">
                      {brand}
                    </p>

                    <h3 className="mt-1 font-serif text-[11px] font-light uppercase leading-tight tracking-[0.05em] text-[#121212]">
                      {name}
                    </h3>

                    {variantLabel && (
                      <p className="mt-1 text-[9px] text-gray-500">
                        Variant: {variantLabel}
                      </p>
                    )}

                    <p className="mt-2 text-[10px] text-gray-600">
                      {formatPrice(price)}
                      {mrp > price && (
                        <span className="ml-2 text-gray-400 line-through">
                          {formatPrice(mrp)}
                        </span>
                      )}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <div className="scale-90 origin-left">
                        {quantityControl}
                      </div>

                      <p className="text-xs font-medium text-[#121212]">
                        {formatPrice(itemTotal)}
                      </p>
                    </div>

                    {isUpdating && (
                      <p className="mt-1 text-[9px] text-gray-400">
                        Updating...
                      </p>
                    )}

                    {removeButton}
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* ORDER SUMMARY */}
        <aside className="overflow-hidden rounded-2xl border border-[#C5A880]/20 bg-[#faf8f4]/60 lg:sticky lg:top-32">
          <div className="border-b border-[#C5A880]/15 px-5 py-5 sm:px-6">
            <p className="text-[8px] uppercase tracking-[0.25em] text-[#C5A880]">
              Your Order
            </p>

            <h2 className="mt-1 font-serif text-xl font-light text-[#121212]">
              Order Summary
            </h2>
          </div>

          <div className="px-5 py-6 sm:px-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Items</span>
                <span className="text-xs">{totalItems}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Subtotal</span>
                <span className="text-xs">{formatPrice(subtotal)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-xs text-gray-500">Shipping</span>
                <span className="text-xs text-[#B08F5A]">FREE</span>
              </div>

              <div className="flex justify-between border-t border-[#C5A880]/20 pt-4">
                <span className="font-serif text-sm">Total</span>
                <span className="text-lg font-medium text-[#121212]">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-7 w-full rounded-lg border border-[#C5A880] bg-[#C5A880] py-3.5 text-[9px] uppercase tracking-[0.2em] text-[#121212] transition hover:bg-transparent"
            >
              Proceed to Checkout
            </button>

            <button
              type="button"
              onClick={() => router.push("/products")}
              className="mt-3 w-full rounded-lg border border-[#C5A880]/40 py-3 text-[8px] uppercase tracking-[0.18em] text-[#B08F5A] transition hover:bg-[#C5A880]/10"
            >
              Continue Shopping
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
