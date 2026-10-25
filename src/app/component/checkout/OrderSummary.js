"use client";

import React from "react";

const PLACEHOLDER_IMAGE = "/placeholder-product.png";

function getProductImage(item) {
  const product =
    item?.productId && typeof item.productId === "object"
      ? item.productId
      : item?.product && typeof item.product === "object"
        ? item.product
        : null;

  const media = Array.isArray(product?.media) ? product.media : [];

  const validImages = media.filter(
    (image) =>
      image?.mediaType === "image" &&
      image?.url &&
      !String(image.url).includes("undefined") &&
      !String(image.url).includes("null"),
  );

  const primaryFrontImage = validImages.find(
    (image) => image?.sectionType === "front_view" && image?.isPrimary === true,
  );

  const frontImage = validImages.find(
    (image) => image?.sectionType === "front_view",
  );

  const imageUrl =
    item?.image ||
    item?.productImage ||
    item?.thumbnail ||
    primaryFrontImage?.url ||
    frontImage?.url ||
    validImages.find((image) => image?.isPrimary === true)?.url ||
    validImages[0]?.url;

  if (
    !imageUrl ||
    String(imageUrl).includes("undefined") ||
    String(imageUrl).includes("null")
  ) {
    return PLACEHOLDER_IMAGE;
  }

  return imageUrl;
}

function getProductName(item) {
  const product =
    item?.productId && typeof item.productId === "object"
      ? item.productId
      : item?.product && typeof item.product === "object"
        ? item.product
        : null;

  return item?.name || item?.productName || product?.name || "Product";
}

function getProductMRP(item) {
  const product =
    item?.productId && typeof item.productId === "object"
      ? item.productId
      : item?.product && typeof item.product === "object"
        ? item.product
        : null;

  return (
    Number(
      item?.mrp ??
        item?.MRP ??
        product?.mrp ??
        product?.MRP ??
        product?.originalPrice ??
        product?.regularPrice,
    ) || 0
  );
}

export default function OrderSummary({
  cartItems = [],
  mrpTotal = 0,
  discount = 0,
  subtotal = 0,
  shipping = 0,
  total = 0,

  selectedAddress,
  formData = {},
  showNewAddressForm = false,

  paymentMethod,
  placingOrder = false,
  addressLoading = false,
  savingAddress = false,

  onEditCart,
  onChangeAddress,
  onPlaceOrder,
}) {
  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  const formatPrice = (value) => `Rs. ${(Number(value) || 0).toFixed(2)}`;

  const calculatedMRPTotal = safeCartItems.reduce((sum, item) => {
    const price = Number(item?.price) || 0;
    const mrp = getProductMRP(item);
    const quantity = Math.max(0, Number(item?.quantity) || 1);

    return sum + Math.max(mrp, price) * quantity;
  }, 0);

  const calculatedSubtotal = safeCartItems.reduce((sum, item) => {
    const price = Number(item?.price) || 0;
    const quantity = Math.max(0, Number(item?.quantity) || 1);

    // Selling price already includes the product discount.
    return sum + price * quantity;
  }, 0);

  const calculatedDiscount = Math.max(
    calculatedMRPTotal - calculatedSubtotal,
    0,
  );

  const calculatedShipping = Math.max(Number(shipping) || 0, 0);

  // Do not subtract the discount again.
  const calculatedTotal = calculatedSubtotal + calculatedShipping;

  return (
    <div className="lg:sticky lg:top-28">
      <section className="border border-luxury-gold/20 bg-[#FAF7F2] p-5 sm:p-6 md:p-8">
        {/* HEADER */}
        <div className="mb-6 flex items-center justify-between border-b border-luxury-gold/20 pb-5">
          <h2 className="font-serif text-2xl uppercase tracking-[0.08em] text-luxury-dark">
            Your Order
          </h2>

          <button
            type="button"
            onClick={onEditCart}
            className="text-[10px] uppercase tracking-widest text-luxury-gold hover:text-luxury-dark"
          >
            Edit Cart
          </button>
        </div>

        {/* PRODUCTS */}
        <div className="max-h-[420px] space-y-5 overflow-y-auto pr-2">
          {safeCartItems.length === 0 ? (
            <p className="py-5 text-center text-sm text-gray-500">
              No products in your order.
            </p>
          ) : (
            safeCartItems.map((item, index) => {
              const image = getProductImage(item);
              const name = getProductName(item);
              const itemPrice = Number(item?.price) || 0;
              const itemMRP = getProductMRP(item);
              const quantity = Number(item?.quantity) || 1;
              const itemTotal = itemPrice * quantity;

              const savingsPerItem = Math.max(itemMRP - itemPrice, 0);
              const savingsTotal = savingsPerItem * quantity;

              return (
                <div
                  key={
                    item?._id ||
                    `${item?.productId?._id || item?.productId || item?.product || index}-${item?.variantId || index}`
                  }
                  className="flex gap-4 border-b border-luxury-gold/10 pb-5"
                >
                  {/* PRODUCT IMAGE */}
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white">
                    <img
                      src={image}
                      alt={name}
                      className="h-full w-full object-contain p-1"
                      loading="lazy"
                      onError={(event) => {
                        if (
                          !event.currentTarget.src.endsWith(PLACEHOLDER_IMAGE)
                        ) {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = PLACEHOLDER_IMAGE;
                        }
                      }}
                    />

                    <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center bg-luxury-dark px-1 text-[9px] text-white">
                      {quantity}
                    </span>
                  </div>

                  {/* PRODUCT DETAILS */}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-serif text-sm uppercase tracking-wide text-luxury-dark">
                      {name}
                    </h3>

                    {item?.variantLabel && (
                      <p className="mt-1 text-[9px] uppercase tracking-widest text-luxury-gold">
                        {item.variantLabel}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {/* Selling Price */}
                      <span className="text-sm font-semibold text-luxury-dark">
                        {formatPrice(itemPrice)}
                      </span>

                      {/* Original MRP */}
                      {itemMRP > itemPrice && (
                        <span className="text-xs text-gray-500 line-through">
                          {formatPrice(itemMRP)}
                        </span>
                      )}

                      {/* Discount Percentage */}
                      {itemMRP > itemPrice && (
                        <span className="text-[10px] font-medium text-green-700">
                          {Math.round(((itemMRP - itemPrice) / itemMRP) * 100)}%
                          OFF
                        </span>
                      )}
                    </div>

                    {itemMRP > itemPrice && (
                      <p className="mt-1 text-[10px] text-green-700">
                        You save {formatPrice(savingsPerItem)} per item
                      </p>
                    )}
                  </div>

                  {/* ITEM TOTAL */}
                  <div className="shrink-0 text-right text-sm font-medium text-luxury-dark">
                    {formatPrice(itemTotal)}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* PRICE BREAKDOWN */}

        {/* PRICE BREAKDOWN */}
        <div className="mt-7 space-y-4">
          <PriceRow label="MRP Total" value={formatPrice(calculatedMRPTotal)} />

          {calculatedDiscount > 0 && (
            <PriceRow
              label="Product Discount"
              value={`- ${formatPrice(calculatedDiscount)}`}
              green
            />
          )}

          <PriceRow label="Subtotal" value={formatPrice(calculatedSubtotal)} />

          <PriceRow
            label="Shipping"
            value={
              calculatedShipping === 0
                ? "FREE"
                : formatPrice(calculatedShipping)
            }
            green
          />
        </div>

        {/* ORDER TOTAL */}
        {/* <div className="mt-6 flex items-center justify-between border-t border-luxury-gold/20 pt-6">
          <div>
            <p className="font-serif text-lg uppercase tracking-wide text-luxury-dark">
              Total
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-widest text-[#777]">
              Inclusive of applicable taxes
            </p>
          </div>

          <p className="font-serif text-2xl text-luxury-dark">
            {formatPrice(calculatedTotal)}
          </p>
        </div> */}

        {/* ORDER TOTAL */}
        <div className="mt-6 flex items-center justify-between border-t border-luxury-gold/20 pt-6">
          <div>
            <p className="font-serif text-lg uppercase tracking-wide text-luxury-dark">
              Total
            </p>

            <p className="mt-1 text-[9px] uppercase tracking-widest text-[#777]">
              Inclusive of applicable taxes
            </p>
          </div>

          <p className="font-serif text-2xl text-luxury-dark">
            {formatPrice(total)}
          </p>
        </div>

        {/* SELECTED ADDRESS */}
        {selectedAddress && (
          <AddressSummary
            address={selectedAddress}
            onChangeAddress={onChangeAddress}
          />
        )}

        {/* NEW ADDRESS */}
        {!selectedAddress &&
          showNewAddressForm &&
          formData?.name &&
          formData?.addressline && (
            <div className="mt-6 border border-luxury-gold/15 p-4">
              <p className="text-[9px] uppercase tracking-widest text-luxury-gold">
                New Delivery Address
              </p>

              <p className="mt-2 text-sm font-medium text-luxury-dark">
                {formData.name}
              </p>

              <p className="mt-1 text-xs text-[#777]">{formData.addressline}</p>

              <p className="mt-1 text-xs text-[#777]">
                {formData.city}, {formData.state} - {formData.pincode}
              </p>
            </div>
          )}

        {/* PLACE ORDER */}
        {/* PLACE ORDER */}
        <button
          type="submit"
          disabled={
            placingOrder ||
            addressLoading ||
            savingAddress ||
            safeCartItems.length === 0
          }
          className="mt-7 w-full bg-luxury-dark py-5 text-xs uppercase tracking-[0.25em] text-luxury-gold transition-all duration-500 hover:bg-luxury-gold hover:text-luxury-dark disabled:cursor-not-allowed disabled:opacity-50"
        >
          {placingOrder
            ? "Processing..."
            : paymentMethod === "COD"
              ? "Place Order"
              : "Continue to Payment"}
        </button>

        <p className="mt-5 text-center text-[9px] uppercase leading-relaxed tracking-widest text-[#777]">
          By placing your order, you agree to our Terms &amp; Conditions and
          Privacy Policy.
        </p>
      </section>
    </div>
  );
}

function AddressSummary({ address, onChangeAddress }) {
  return (
    <div className="mt-6 border border-luxury-gold/15 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[9px] uppercase tracking-widest text-luxury-gold">
          Delivering To
        </p>

        <button
          type="button"
          onClick={onChangeAddress}
          className="text-[9px] uppercase tracking-widest text-luxury-gold"
        >
          Change
        </button>
      </div>

      <p className="mt-2 text-sm font-medium text-luxury-dark">
        {address.name || address.fullName}
      </p>

      <p className="mt-1 text-xs leading-relaxed text-[#777]">
        {address.addressline || address.address}
        {address.locality ? `, ${address.locality}` : ""}
        {address.landmark ? `, ${address.landmark}` : ""}
      </p>

      <p className="mt-1 text-xs text-[#777]">
        {address.city}
        {address.city && address.state ? ", " : ""}
        {address.state}
        {address.pincode ? ` - ${address.pincode}` : ""}
      </p>

      <p className="mt-1 text-xs text-[#777]">
        Mobile: {address.mobileNumber || address.mobile}
      </p>
    </div>
  );
}

function PriceRow({ label, value, green = false }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="font-light tracking-wide text-[#6C6C6C]">{label}</span>

      <span
        className={
          green
            ? "tracking-wide text-green-600"
            : "tracking-wide text-luxury-dark"
        }
      >
        {value}
      </span>
    </div>
  );
}
