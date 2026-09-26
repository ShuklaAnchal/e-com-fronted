"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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

const CartPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState(false);

  // =========================================================
  // CART REDUX STATE
  // =========================================================

  const cartState = useSelector((state) => state.cart);

  const cartItems = cartState?.cartItems || [];
  const loading = cartState?.loading || false;

  // =========================================================
  // FETCH CART
  // =========================================================

  useEffect(() => {
    setMounted(true);

    dispatch(fetchCart());
  }, [dispatch]);

  // =========================================================
  // DEBUG CART RESPONSE
  // =========================================================

  useEffect(() => {
    console.log("CART DATA FROM fetchCart:", cartItems);
  }, [cartItems]);

  // =========================================================
  // GET PRODUCT IMAGE
  // =========================================================

  const getProductImage = (product) => {
    const imageMedia =
      product?.media?.filter(
        (media) =>
          media?.mediaType === "image" &&
          media?.url &&
          !String(media.url).includes("undefined")
      ) || [];

    const primaryImage =
      imageMedia.find(
        (media) => media?.isPrimary === true
      )?.url ||
      imageMedia[0]?.url ||
      null;

    return getMediaUrl(primaryImage);
  };

  // =========================================================
  // GET SELECTED VARIANT
  // =========================================================

  const getSelectedVariant = (item) => {
    const product = item?.productId;

    if (!product?.variants?.length) {
      return null;
    }

    if (item?.variantId) {
      const variant = product.variants.find(
        (variant) =>
          String(variant?._id) ===
          String(item?.variantId)
      );

      if (variant) {
        return variant;
      }
    }

    return (
      product.variants.find(
        (variant) => variant?.isDefault === true
      ) ||
      product.variants[0] ||
      null
    );
  };

  // =========================================================
  // TOTAL ITEMS
  // =========================================================

  const totalItems = cartItems.reduce(
    (total, item) =>
      total + (Number(item?.quantity) || 0),
    0
  );

  // =========================================================
  // SUBTOTAL
  // =========================================================

  const subtotal = cartItems.reduce(
    (total, item) => {
      const price = Number(item?.price) || 0;
      const quantity = Number(item?.quantity) || 0;

      return total + price * quantity;
    },
    0
  );

  // =========================================================
  // REMOVE ITEM
  // =========================================================

  const handleRemove = async (item) => {
    try {
      const productId =
        item?.productId?._id ||
        item?.product;

      const variantId = item?.variantId;

      console.log("REMOVE CART:", {
        productId,
        variantId,
      });

      await dispatch(
        removeFromCartAction({
          productId,
          variantId,
        })
      ).unwrap();
    } catch (error) {
      console.error(
        "REMOVE CART ERROR:",
        error
      );
    }
  };

  // =========================================================
  // UPDATE QUANTITY
  // =========================================================

  const handleQuantityChange = async (
    item,
    change
  ) => {
    const currentQuantity =
      Number(item?.quantity) || 0;

    const newQuantity =
      currentQuantity + change;

    if (newQuantity < 1) {
      return;
    }

    try {
      const productId =
        item?.productId?._id ||
        item?.product;

      console.log("UPDATE CART:", {
        productId,
        variantId: item?.variantId,
        newQuantity,
      });

      await dispatch(
        updateCartQuantityAction(
          productId,
          newQuantity
        )
      ).unwrap();
    } catch (error) {
      console.error(
        "UPDATE CART ERROR:",
        error
      );
    }
  };

  // =========================================================
  // CHECKOUT
  // =========================================================

  const handleCheckout = () => {
    const token =
      localStorage.getItem("userToken");

    if (
      !token ||
      token === "undefined" ||
      token === "null"
    ) {
      router.push(
        "/sign-up?redirect=/user/checkout"
      );
      return;
    }

    router.push("/user/checkout");
  };

  // =========================================================
  // HYDRATION
  // =========================================================

  if (!mounted) {
    return null;
  }

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <MarqueeBar />

        <Header />

        <main className="pt-40 pb-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <div
              className="
                h-7
                w-7
                animate-spin
                rounded-full
                border-2
                border-[#C5A880]/30
                border-t-[#C5A880]
              "
            />

            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.25em]
                text-gray-500
              "
            >
              Loading Cart...
            </p>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // =========================================================
  // EMPTY CART
  // =========================================================

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <MarqueeBar />

        <Header />

        <main className="pt-36 pb-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p
              className="
                text-[10px]
                sm:text-xs
                uppercase
                tracking-[0.35em]
                text-[#C5A880]
                mb-3
              "
            >
              Your Selection
            </p>

            <h1
              className="
                text-4xl
                sm:text-5xl
                font-serif
                font-extralight
                uppercase
                tracking-[0.08em]
                text-[#121212]
              "
            >
              Your Cart
            </h1>

            <div
              className="
                mt-8
                border
                border-[#C5A880]/20
                rounded-2xl
                bg-[#faf8f4]/50
                p-10
                sm:p-16
              "
            >
              <h2
                className="
                  text-2xl
                  font-serif
                  font-light
                  text-[#121212]
                  mb-3
                "
              >
                Your cart is empty
              </h2>

              <p
                className="
                  text-sm
                  text-gray-500
                  font-light
                  mb-8
                "
              >
                Explore our handcrafted collection
                and find something beautiful for your
                space.
              </p>

              <button
                onClick={() =>
                  router.push("/products")
                }
                className="
                  px-8
                  py-3
                  bg-[#C5A880]
                  border
                  border-[#C5A880]
                  text-[#121212]
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  rounded-lg
                  hover:bg-transparent
                  transition-all
                "
              >
                Explore Collection
              </button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  // =========================================================
  // MAIN
  // =========================================================

  return (
    <div className="min-h-screen bg-white">
      <MarqueeBar />

      <Header />

      <main className="pt-28 sm:pt-36 pb-20 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto">

          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <div className="text-center mb-8 sm:mb-12">
            <p
              className="
                text-[9px]
                sm:text-xs
                uppercase
                tracking-[0.35em]
                text-[#C5A880]
                mb-3
              "
            >
              Your Selection
            </p>

            <h1
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-serif
                font-extralight
                uppercase
                tracking-[0.08em]
                text-[#121212]
              "
            >
              Shopping Cart
            </h1>

            <p
              className="
                mt-3
                text-xs
                sm:text-sm
                text-gray-500
              "
            >
              {totalItems}{" "}
              {totalItems === 1
                ? "item"
                : "items"}{" "}
              in your cart
            </p>
          </div>

          {/* =================================================
              CONTENT
          ================================================= */}

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-[1fr_360px]
              gap-6
              lg:gap-10
              items-start
            "
          >

            {/* =================================================
                CART PRODUCTS
            ================================================= */}

            <section
              className="
                border
                border-[#C5A880]/20
                rounded-2xl
                overflow-hidden
                bg-white
              "
            >

              {/* DESKTOP HEADER */}

              <div
                className="
                  hidden
                  sm:grid
                  grid-cols-[1fr_120px_120px]
                  gap-4
                  px-6
                  py-4
                  bg-[#faf8f4]/60
                  border-b
                  border-[#C5A880]/15
                "
              >
                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-gray-500
                  "
                >
                  Product
                </span>

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-gray-500
                    text-center
                  "
                >
                  Quantity
                </span>

                <span
                  className="
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-gray-500
                    text-right
                  "
                >
                  Total
                </span>
              </div>

              {/* =================================================
                  MAP CART DATA
              ================================================= */}

              {cartItems.map((item, index) => {
                /*
                  IMPORTANT:

                  API CART ITEM
                  -----------------------------
                  item.productId
                  item.price
                  item.quantity
                  item.variantId

                  PRODUCT
                  -----------------------------
                  item.productId._id
                  item.productId.name
                  item.productId.brand
                  item.productId.media
                  item.productId.variants
                */

                const product =
                  item?.productId;

                const productImage =
                  getProductImage(product);

                const selectedVariant =
                  getSelectedVariant(item);

                const price =
                  Number(item?.price) || 0;

                const quantity =
                  Number(item?.quantity) || 0;

                const itemTotal =
                  price * quantity;

                return (
                  <div
                    key={
                      item?._id ||
                      `${product?._id}-${item?.variantId}-${index}`
                    }
                    className="
                      p-4
                      sm:p-6
                      border-b
                      last:border-b-0
                      border-[#C5A880]/15
                    "
                  >

                    {/* =================================================
                        DESKTOP
                    ================================================= */}

                    <div
                      className="
                        hidden
                        sm:grid
                        grid-cols-[1fr_120px_120px]
                        gap-4
                        items-center
                      "
                    >

                      {/* PRODUCT */}

                      <div className="flex items-center gap-4">

                        {/* IMAGE */}

                        <button
                          type="button"
                          onClick={() =>
                            router.push(
                              `/products/${product?._id}`
                            )
                          }
                          className="
                            relative
                            w-24
                            h-24
                            flex-shrink-0
                            overflow-hidden
                            rounded-xl
                            border
                            border-[#C5A880]/15
                            bg-[#faf8f4]
                          "
                        >
                          <Image
                            src={
                              productImage ||
                              "/placeholder-product.png"
                            }
                            alt={
                              product?.name ||
                              "Product"
                            }
                            fill
                            sizes="96px"
                            className="
                              object-contain
                              p-1
                              transition-transform
                              duration-500
                              hover:scale-105
                            "
                          />
                        </button>

                        {/* PRODUCT DATA */}

                        <div className="min-w-0">

                          <p
                            className="
                              text-[8px]
                              uppercase
                              tracking-[0.2em]
                              text-[#C5A880]
                              mb-1
                            "
                          >
                            {product?.brand ||
                              "Siyaas"}
                          </p>

                          <h3
                            onClick={() =>
                              router.push(
                                `/products/${product?._id}`
                              )
                            }
                            className="
                              text-sm
                              font-serif
                              font-light
                              uppercase
                              tracking-[0.08em]
                              text-[#121212]
                              cursor-pointer
                              hover:text-[#B08F5A]
                            "
                          >
                            {product?.name ||
                              "Product"}
                          </h3>

                          {selectedVariant?.sku && (
                            <p
                              className="
                                mt-1
                                text-[9px]
                                text-gray-400
                              "
                            >
                              SKU:{" "}
                              {
                                selectedVariant.sku
                              }
                            </p>
                          )}

                          <p
                            className="
                              mt-2
                              text-xs
                              text-gray-500
                            "
                          >
                            Rs. {price}
                          </p>

                          <button
                            type="button"
                            onClick={() =>
                              handleRemove(item)
                            }
                            className="
                              mt-2
                              text-[8px]
                              uppercase
                              tracking-[0.15em]
                              text-gray-400
                              hover:text-red-500
                            "
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* QUANTITY */}

                      <div className="flex justify-center">
                        <div
                          className="
                            flex
                            items-center
                            border
                            border-[#C5A880]/30
                            rounded-lg
                            overflow-hidden
                          "
                        >
                          <button
                            type="button"
                            disabled={quantity <= 1}
                            onClick={() =>
                              handleQuantityChange(
                                item,
                                -1
                              )
                            }
                            className="
                              w-8
                              h-8
                              text-sm
                              disabled:opacity-30
                              hover:bg-[#faf8f4]
                            "
                          >
                            −
                          </button>

                          <span
                            className="
                              w-8
                              text-center
                              text-xs
                            "
                          >
                            {quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              handleQuantityChange(
                                item,
                                1
                              )
                            }
                            className="
                              w-8
                              h-8
                              text-sm
                              hover:bg-[#faf8f4]
                            "
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* TOTAL */}

                      <div className="text-right">
                        <p
                          className="
                            text-sm
                            font-medium
                            text-[#121212]
                          "
                        >
                          Rs. {itemTotal}
                        </p>
                      </div>
                    </div>

                    {/* =================================================
                        MOBILE
                    ================================================= */}

                    <div
                      className="
                        flex
                        sm:hidden
                        gap-3
                      "
                    >

                      {/* IMAGE */}

                      <button
                        type="button"
                        onClick={() =>
                          router.push(
                            `/products/${product?._id}`
                          )
                        }
                        className="
                          relative
                          w-24
                          h-24
                          flex-shrink-0
                          overflow-hidden
                          rounded-xl
                          border
                          border-[#C5A880]/15
                          bg-[#faf8f4]
                        "
                      >
                        <Image
                          src={
                            productImage ||
                            "/placeholder-product.png"
                          }
                          alt={
                            product?.name ||
                            "Product"
                          }
                          fill
                          sizes="96px"
                          className="
                            object-contain
                            p-1
                          "
                        />
                      </button>

                      {/* DETAILS */}

                      <div className="flex-1 min-w-0">

                        <p
                          className="
                            text-[7px]
                            uppercase
                            tracking-[0.18em]
                            text-[#C5A880]
                          "
                        >
                          {product?.brand ||
                            "Siyaas"}
                        </p>

                        <h3
                          className="
                            mt-1
                            text-[11px]
                            font-serif
                            font-light
                            uppercase
                            tracking-[0.08em]
                            leading-tight
                          "
                        >
                          {product?.name ||
                            "Product"}
                        </h3>

                        {selectedVariant?.sku && (
                          <p
                            className="
                              mt-1
                              text-[8px]
                              text-gray-400
                            "
                          >
                            SKU:{" "}
                            {
                              selectedVariant.sku
                            }
                          </p>
                        )}

                        <p
                          className="
                            mt-2
                            text-[10px]
                            text-gray-600
                          "
                        >
                          Rs. {price}
                        </p>

                        <div
                          className="
                            mt-3
                            flex
                            items-center
                            justify-between
                          "
                        >

                          {/* QUANTITY */}

                          <div
                            className="
                              flex
                              items-center
                              border
                              border-[#C5A880]/30
                              rounded-md
                              overflow-hidden
                            "
                          >
                            <button
                              type="button"
                              disabled={quantity <= 1}
                              onClick={() =>
                                handleQuantityChange(
                                  item,
                                  -1
                                )
                              }
                              className="
                                w-7
                                h-7
                                text-sm
                                disabled:opacity-30
                              "
                            >
                              −
                            </button>

                            <span
                              className="
                                w-7
                                text-center
                                text-[10px]
                              "
                            >
                              {quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(
                                  item,
                                  1
                                )
                              }
                              className="
                                w-7
                                h-7
                                text-sm
                              "
                            >
                              +
                            </button>
                          </div>

                          {/* TOTAL */}

                          <p
                            className="
                              text-xs
                              font-medium
                              text-[#121212]
                            "
                          >
                            Rs. {itemTotal}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            handleRemove(item)
                          }
                          className="
                            mt-2
                            text-[7px]
                            uppercase
                            tracking-[0.15em]
                            text-gray-400
                            hover:text-red-500
                          "
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>

            {/* =================================================
                ORDER SUMMARY
            ================================================= */}

            <aside
              className="
                lg:sticky
                lg:top-32
                border
                border-[#C5A880]/20
                rounded-2xl
                bg-[#faf8f4]/60
                overflow-hidden
              "
            >
              <div
                className="
                  px-5
                  sm:px-6
                  py-5
                  border-b
                  border-[#C5A880]/15
                "
              >
                <p
                  className="
                    text-[8px]
                    uppercase
                    tracking-[0.25em]
                    text-[#C5A880]
                  "
                >
                  Your Order
                </p>

                <h2
                  className="
                    mt-1
                    text-xl
                    font-serif
                    font-light
                    text-[#121212]
                  "
                >
                  Order Summary
                </h2>
              </div>

              <div className="px-5 sm:px-6 py-6">

                <div className="space-y-4">

                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">
                      Items
                    </span>

                    <span className="text-xs">
                      {totalItems}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">
                      Subtotal
                    </span>

                    <span className="text-xs">
                      Rs. {subtotal}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-xs text-gray-500">
                      Shipping
                    </span>

                    <span className="text-xs text-[#B08F5A]">
                      FREE
                    </span>
                  </div>

                  <div
                    className="
                      border-t
                      border-[#C5A880]/20
                      pt-4
                      flex
                      justify-between
                    "
                  >
                    <span
                      className="
                        text-sm
                        font-serif
                      "
                    >
                      Total
                    </span>

                    <span
                      className="
                        text-lg
                        font-medium
                      "
                    >
                      Rs. {subtotal}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="
                    mt-7
                    w-full
                    py-3.5
                    bg-[#C5A880]
                    border
                    border-[#C5A880]
                    text-[#121212]
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    rounded-lg
                    hover:bg-transparent
                    transition-all
                  "
                >
                  Proceed to Checkout
                </button>

                <button
                  type="button"
                  onClick={() =>
                    router.push("/products")
                  }
                  className="
                    mt-3
                    w-full
                    py-3
                    border
                    border-[#C5A880]/40
                    text-[#B08F5A]
                    text-[8px]
                    uppercase
                    tracking-[0.18em]
                    rounded-lg
                    hover:bg-[#C5A880]/10
                  "
                >
                  Continue Shopping
                </button>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;