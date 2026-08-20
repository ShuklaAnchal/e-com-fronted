"use client";

import React from "react";
import Image from "next/image";

export default function OrderSummary({
  cartItems = [],
  mrpTotal,
  discount,
  subtotal,
  shipping,
  total,

  selectedAddress,
  formData,
  showNewAddressForm,

  paymentMethod,
  placingOrder,
  addressLoading,
  savingAddress,

  onEditCart,
  onChangeAddress,
  onPlaceOrder,
}) {
  return (
    <div className="lg:sticky lg:top-28">

      <section className="bg-[#FAF7F2] border border-luxury-gold/20 p-5 sm:p-6 md:p-8">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-luxury-gold/20 pb-5 mb-6">

          <h2 className="font-serif text-2xl text-luxury-dark uppercase tracking-[0.08em]">
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

        <div className="space-y-5 max-h-[420px] overflow-y-auto pr-2">

          {cartItems.map((item, index) => {

            const image =
              item.image ||
              item.images?.[0] ||
              "/candle.png";

            const itemPrice =
              Number(item.price || 0);

            const quantity =
              Number(item.quantity || 0);

            return (
              <div
                key={`${
                  item.productId ||
                  item.product ||
                  index
                }-${index}`}
                className="
                  flex
                  gap-4
                  border-b
                  border-luxury-gold/10
                  pb-5
                "
              >

                {/* IMAGE */}

                <div className="
                  relative
                  w-20
                  h-24
                  flex-shrink-0
                  bg-luxury-dark/5
                  border
                  border-luxury-gold/10
                  overflow-hidden
                ">

                  <Image
                    src={image}
                    alt={
                      item.name ||
                      "Product"
                    }
                    fill
                    className="object-cover"
                    sizes="80px"
                  />

                  <span className="
                    absolute
                    top-1
                    right-1
                    bg-luxury-dark
                    text-white
                    text-[9px]
                    min-w-5
                    h-5
                    px-1
                    flex
                    items-center
                    justify-center
                  ">
                    {quantity}
                  </span>

                </div>

                {/* PRODUCT */}

                <div className="flex-1 min-w-0">

                  <h3 className="
                    font-serif
                    text-sm
                    text-luxury-dark
                    uppercase
                    tracking-wide
                  ">
                    {item.name ||
                      item.productName ||
                      "Product"}
                  </h3>

                  {item.variantLabel && (
                    <p className="
                      text-[9px]
                      text-luxury-gold
                      uppercase
                      tracking-widest
                      mt-1
                    ">
                      {item.variantLabel}
                    </p>
                  )}

                  <p className="text-sm text-luxury-dark mt-3">
                    Rs. {itemPrice.toFixed(2)}
                  </p>

                </div>

                {/* TOTAL */}

                <div className="
                  text-sm
                  font-medium
                  text-luxury-dark
                ">
                  Rs.{" "}
                  {(itemPrice * quantity).toFixed(2)}
                </div>

              </div>
            );
          })}

        </div>

        {/* PRICE */}

        <div className="mt-7 space-y-4">

          <PriceRow
            label="MRP Total"
            value={`Rs. ${mrpTotal.toFixed(2)}`}
          />

          {discount > 0 && (
            <PriceRow
              label="Discount"
              value={`- Rs. ${discount.toFixed(2)}`}
              green
            />
          )}

          <PriceRow
            label="Subtotal"
            value={`Rs. ${subtotal.toFixed(2)}`}
          />

          <PriceRow
            label="Shipping"
            value={
              shipping === 0
                ? "FREE"
                : `Rs. ${shipping.toFixed(2)}`
            }
            green
          />

        </div>

        {/* TOTAL */}

        <div className="
          border-t
          border-luxury-gold/20
          mt-6
          pt-6
          flex
          justify-between
          items-center
        ">

          <div>

            <p className="
              font-serif
              text-lg
              text-luxury-dark
              uppercase
              tracking-wide
            ">
              Total
            </p>

            <p className="
              text-[9px]
              uppercase
              tracking-widest
              text-[#777]
              mt-1
            ">
              Inclusive of applicable taxes
            </p>

          </div>

          <p className="
            font-serif
            text-2xl
            text-luxury-dark
          ">
            Rs. {total.toFixed(2)}
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
          formData.name &&
          formData.addressline && (
            <div className="
              border
              border-luxury-gold/15
              mt-6
              p-4
            ">

              <p className="
                text-[9px]
                uppercase
                tracking-widest
                text-luxury-gold
              ">
                New Delivery Address
              </p>

              <p className="
                text-sm
                font-medium
                text-luxury-dark
                mt-2
              ">
                {formData.name}
              </p>

              <p className="
                text-xs
                text-[#777]
                mt-1
              ">
                {formData.addressline}
              </p>

              <p className="
                text-xs
                text-[#777]
                mt-1
              ">
                {formData.city},{" "}
                {formData.state} -{" "}
                {formData.pincode}
              </p>

            </div>
          )}

        {/* PLACE ORDER */}

        <button
          type="submit"
          disabled={
            placingOrder ||
            addressLoading ||
            savingAddress
          }
          onClick={onPlaceOrder}
          className="
            w-full
            mt-7
            bg-luxury-dark
            text-luxury-gold
            py-5
            text-xs
            uppercase
            tracking-[0.25em]
            hover:bg-luxury-gold
            hover:text-luxury-dark
            transition-all
            duration-500
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {placingOrder
            ? "Processing..."
            : paymentMethod === "COD"
            ? "Place Order"
            : "Continue to Payment"}
        </button>

        <p className="
          text-[9px]
          text-[#777]
          text-center
          uppercase
          tracking-widest
          leading-relaxed
          mt-5
        ">
          By placing your order, you agree to
          our Terms & Conditions and Privacy
          Policy.
        </p>

      </section>
    </div>
  );
}

function AddressSummary({
  address,
  onChangeAddress,
}) {
  return (
    <div className="
      border
      border-luxury-gold/15
      mt-6
      p-4
    ">

      <div className="
        flex
        items-center
        justify-between
        gap-3
      ">

        <p className="
          text-[9px]
          uppercase
          tracking-widest
          text-luxury-gold
        ">
          Delivering To
        </p>

        <button
          type="button"
          onClick={onChangeAddress}
          className="
            text-[9px]
            uppercase
            tracking-widest
            text-luxury-gold
          "
        >
          Change
        </button>

      </div>

      <p className="
        text-sm
        font-medium
        text-luxury-dark
        mt-2
      ">
        {address.name ||
          address.fullName}
      </p>

      <p className="
        text-xs
        text-[#777]
        mt-1
        leading-relaxed
      ">
        {address.addressline ||
          address.address}

        {address.locality
          ? `, ${address.locality}`
          : ""}

        {address.landmark
          ? `, ${address.landmark}`
          : ""}
      </p>

      <p className="
        text-xs
        text-[#777]
        mt-1
      ">
        {address.city}

        {address.city &&
        address.state
          ? ", "
          : ""}

        {address.state}

        {address.pincode
          ? ` - ${address.pincode}`
          : ""}
      </p>

      <p className="
        text-xs
        text-[#777]
        mt-1
      ">
        Mobile:{" "}
        {address.mobileNumber ||
          address.mobile}
      </p>

    </div>
  );
}

function PriceRow({
  label,
  value,
  green = false,
}) {
  return (
    <div className="
      flex
      justify-between
      items-center
      text-sm
    ">

      <span className="
        text-[#6C6C6C]
        font-light
        tracking-wide
      ">
        {label}
      </span>

      <span
        className={
          green
            ? "text-green-600 tracking-wide"
            : "text-luxury-dark tracking-wide"
        }
      >
        {value}
      </span>

    </div>
  );
}