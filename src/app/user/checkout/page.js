"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import { fetchCart } from "@/app/store/action/cartAction";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { cartItems, loading } = useSelector((state) => state.cart);

  const [mounted, setMounted] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    email: "",
    address: "",
    landmark: "",
    pincode: "",
    city: "",
    state: "",
    addressType: "Home",
  });

  const [paymentMethod, setPaymentMethod] = useState("UPI");

  useEffect(() => {
    setMounted(true);

    const token = localStorage.getItem("userToken");

    if (!token || token === "undefined" || token === "null") {
      router.push("/login?redirect=/user/checkout");
      return;
    }

    dispatch(fetchCart());
  }, [dispatch, router]);

  /*
   * Calculate cart values
   */
  const subtotal = useMemo(() => {
    return (
      cartItems?.reduce(
        (total, item) =>
          total + Number(item.price || 0) * Number(item.quantity || 0),
        0,
      ) || 0
    );
  }, [cartItems]);

  const mrpTotal = useMemo(() => {
    return (
      cartItems?.reduce(
        (total, item) =>
          total +
          Number(item.mrp || item.price || 0) * Number(item.quantity || 0),
        0,
      ) || 0
    );
  }, [cartItems]);

  const discount = Math.max(mrpTotal - subtotal, 0);

  /*
   * For now shipping is free.
   * Change this when your backend provides shipping calculation.
   */
  const shipping = 0;

  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (
      !formData.fullName ||
      !formData.mobile ||
      !formData.address ||
      !formData.pincode ||
      !formData.city ||
      !formData.state
    ) {
      alert("Please complete your delivery address.");
      return;
    }

    try {
      setPlacingOrder(true);

      /*
       * IMPORTANT:
       * Connect your existing order API/action here.
       *
       * Do NOT trust subtotal/total calculated on frontend.
       * Your backend should recalculate:
       * - product price
       * - variant price
       * - stock
       * - discount
       * - GST
       * - shipping
       * - final total
       */

      const orderPayload = {
        items: cartItems.map((item) => ({
          productId: item.product,
          variantId: item.variantId || item.variant,
          quantity: item.quantity,
        })),

        shippingAddress: {
          fullName: formData.fullName,
          mobile: formData.mobile,
          email: formData.email,
          address: formData.address,
          landmark: formData.landmark,
          pincode: formData.pincode,
          city: formData.city,
          state: formData.state,
          addressType: formData.addressType,
        },

        paymentMethod,
      };

      console.log("Order Payload:", orderPayload);

      /*
       * Example:
       *
       * const response = await dispatch(
       *   createOrderAction(orderPayload)
       * ).unwrap();
       *
       * Then:
       *
       * router.push(`/user/order-success/${response.order.id}`);
       */

      if (paymentMethod === "COD") {
        alert("COD order flow is ready to connect with your order API.");
      } else {
        alert(
          `${paymentMethod} payment flow is ready to connect with Razorpay.`,
        );
      }
    } catch (error) {
      console.error("Place order error:", error);
      alert(error?.message || "Unable to place order.");
    } finally {
      setPlacingOrder(false);
    }
  };

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-luxury-cream flex items-center justify-center">
        <p className="text-luxury-gold tracking-[0.25em] uppercase text-sm animate-pulse">
          Loading Checkout...
        </p>
      </div>
    );
  }

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-luxury-cream pt-32 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-luxury-dark mb-4">
            Your Cart Is Empty
          </h1>

          <p className="text-[#6C6C6C] mb-8">
            Add products to your cart before proceeding to checkout.
          </p>

          <button
            onClick={() => router.push("/products")}
            className="bg-luxury-dark text-luxury-gold px-8 py-4 text-xs uppercase tracking-[0.2em] hover:bg-luxury-gold hover:text-luxury-dark transition-all duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-luxury-cream pt-28 pb-20">
      {/* Header */}
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
              <span className="text-luxury-gold">Cart</span>

              <span>—</span>

              <span className="text-luxury-dark font-medium">Checkout</span>

              <span>—</span>

              <span>Payment</span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* LEFT SIDE */}
            <div className="lg:col-span-7 space-y-8">
              {/* Contact Information */}
              <section className="bg-[#FAF7F2] border border-luxury-gold/20 p-6 md:p-8">
                <div className="mb-7">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold mb-2">
                    Step 01
                  </p>

                  <h2 className="font-serif text-2xl text-luxury-dark uppercase tracking-[0.08em]">
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <InputField
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />

                  <InputField
                    label="Mobile Number"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    type="tel"
                    required
                  />

                  <div className="md:col-span-2">
                    <InputField
                      label="Email Address"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter email address"
                      type="email"
                    />
                  </div>
                </div>
              </section>

              {/* Delivery Address */}
              <section className="bg-[#FAF7F2] border border-luxury-gold/20 p-6 md:p-8">
                <div className="mb-7">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold mb-2">
                    Step 02
                  </p>

                  <h2 className="font-serif text-2xl text-luxury-dark uppercase tracking-[0.08em]">
                    Delivery Address
                  </h2>
                </div>

                <div className="space-y-5">
                  <InputField
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House / Flat / Building / Street"
                    required
                  />

                  <InputField
                    label="Landmark"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder="Nearby landmark (optional)"
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <InputField
                      label="Pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="Pincode"
                      inputMode="numeric"
                      required
                    />

                    <InputField
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="City"
                      required
                    />

                    <InputField
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State"
                      required
                    />
                  </div>

                  {/* Address Type */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-luxury-gold-dark mb-3">
                      Address Type
                    </label>

                    <div className="flex gap-3">
                      {["Home", "Work"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              addressType: type,
                            }))
                          }
                          className={`px-6 py-3 text-xs uppercase tracking-widest border transition-all ${
                            formData.addressType === type
                              ? "bg-luxury-dark text-luxury-gold border-luxury-dark"
                              : "bg-transparent text-luxury-dark border-luxury-gold/30 hover:border-luxury-gold"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section className="bg-[#FAF7F2] border border-luxury-gold/20 p-6 md:p-8">
                <div className="mb-7">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold mb-2">
                    Step 03
                  </p>

                  <h2 className="font-serif text-2xl text-luxury-dark uppercase tracking-[0.08em]">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  <PaymentOption
                    value="UPI"
                    title="UPI"
                    description="Pay securely using UPI"
                    selected={paymentMethod === "UPI"}
                    onChange={setPaymentMethod}
                  />

                  <PaymentOption
                    value="CARD"
                    title="Credit / Debit Card"
                    description="Secure card payment"
                    selected={paymentMethod === "CARD"}
                    onChange={setPaymentMethod}
                  />

                  <PaymentOption
                    value="NET_BANKING"
                    title="Net Banking"
                    description="Pay through your bank"
                    selected={paymentMethod === "NET_BANKING"}
                    onChange={setPaymentMethod}
                  />

                  <PaymentOption
                    value="COD"
                    title="Cash on Delivery"
                    description="Pay when your order arrives"
                    selected={paymentMethod === "COD"}
                    onChange={setPaymentMethod}
                  />
                </div>
              </section>

              {/* Trust */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <TrustItem
                  title="Secure Payment"
                  description="Encrypted checkout"
                />

                <TrustItem
                  title="Safe Delivery"
                  description="Carefully packed"
                />

                <TrustItem
                  title="Easy Support"
                  description="We're here to help"
                />
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                <section className="bg-[#FAF7F2] border border-luxury-gold/20 p-6 md:p-8">
                  <div className="flex items-center justify-between border-b border-luxury-gold/20 pb-5 mb-6">
                    <h2 className="font-serif text-2xl text-luxury-dark uppercase tracking-[0.08em]">
                      Your Order
                    </h2>

                    <button
                      type="button"
                      onClick={() => router.push("/user/cart")}
                      className="text-[10px] uppercase tracking-widest text-luxury-gold hover:text-luxury-dark transition-colors"
                    >
                      Edit Cart
                    </button>
                  </div>

                  {/* Products */}
                  <div className="space-y-5 max-h-[420px] overflow-y-auto pr-2">
                    {cartItems.map((item, index) => (
                      <div
                        key={`${item.product}-${index}`}
                        className="flex gap-4 border-b border-luxury-gold/10 pb-5"
                      >
                        <div className="relative w-20 h-24 flex-shrink-0 bg-luxury-dark/5 border border-luxury-gold/10 overflow-hidden">
                          <Image
                            src={item.image || "/candle.png"}
                            alt={item.name || "Product"}
                            fill
                            className="object-cover"
                          />

                          <span className="absolute top-1 right-1 bg-luxury-dark text-white text-[9px] min-w-5 h-5 flex items-center justify-center">
                            {item.quantity}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif text-sm text-luxury-dark uppercase tracking-wide">
                            {item.name}
                          </h3>

                          {item.variantLabel && (
                            <p className="text-[9px] text-luxury-gold uppercase tracking-widest mt-1">
                              {item.variantLabel}
                            </p>
                          )}

                          <div className="flex items-center gap-2 mt-3">
                            <span className="text-sm text-luxury-dark">
                              Rs. {Number(item.price || 0).toFixed(2)}
                            </span>

                            {item.mrp &&
                              Number(item.mrp) > Number(item.price) && (
                                <span className="text-xs text-gray-400 line-through">
                                  Rs. {Number(item.mrp).toFixed(2)}
                                </span>
                              )}
                          </div>
                        </div>

                        <div className="text-sm font-medium text-luxury-dark">
                          Rs.{" "}
                          {(
                            Number(item.price || 0) * Number(item.quantity || 0)
                          ).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Details */}
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
                      value={shipping === 0 ? "FREE" : `Rs. ${shipping}`}
                      green
                    />
                  </div>

                  {/* Total */}
                  <div className="border-t border-luxury-gold/20 mt-6 pt-6 flex justify-between items-center">
                    <div>
                      <p className="font-serif text-lg text-luxury-dark uppercase tracking-wide">
                        Total
                      </p>

                      <p className="text-[9px] uppercase tracking-widest text-[#777] mt-1">
                        Inclusive of applicable taxes
                      </p>
                    </div>

                    <p className="font-serif text-2xl text-luxury-dark">
                      Rs. {total.toFixed(2)}
                    </p>
                  </div>

                  {/* Place Order */}
                  <button
                    type="submit"
                    disabled={placingOrder}
                    className="w-full mt-7 bg-luxury-dark text-luxury-gold py-5 text-xs uppercase tracking-[0.25em] hover:bg-luxury-gold hover:text-luxury-dark transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {placingOrder
                      ? "Processing..."
                      : paymentMethod === "COD"
                        ? "Place Order"
                        : "Continue to Payment"}
                  </button>

                  <div className="mt-5 text-center">
                    <p className="text-[9px] text-[#777] uppercase tracking-widest leading-relaxed">
                      By placing your order, you agree to our
                      <br />
                      Terms & Conditions and Privacy Policy.
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

/* -------------------------------------------------------
   Input Field
------------------------------------------------------- */

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  inputMode,
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.2em] text-luxury-gold-dark mb-2">
        {label}
        {required && <span className="text-red-400 ml-1">*</span>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        inputMode={inputMode}
        className="w-full bg-transparent border border-luxury-gold/25 px-4 py-3.5 text-sm text-luxury-dark placeholder:text-gray-400 outline-none focus:border-luxury-gold transition-colors"
      />
    </div>
  );
}

/* -------------------------------------------------------
   Payment Option
------------------------------------------------------- */

function PaymentOption({ value, title, description, selected, onChange }) {
  return (
    <label
      className={`flex items-center gap-4 p-4 border cursor-pointer transition-all ${
        selected
          ? "border-luxury-gold bg-luxury-gold/5"
          : "border-luxury-gold/15 hover:border-luxury-gold/40"
      }`}
    >
      <input
        type="radio"
        name="paymentMethod"
        value={value}
        checked={selected}
        onChange={() => onChange(value)}
        className="accent-[#C5A880]"
      />

      <div className="flex-1">
        <p className="text-sm text-luxury-dark font-medium">{title}</p>

        <p className="text-[10px] text-[#777] mt-1">{description}</p>
      </div>

      {selected && (
        <span className="text-[9px] uppercase tracking-widest text-luxury-gold">
          Selected
        </span>
      )}
    </label>
  );
}

/* -------------------------------------------------------
   Price Row
------------------------------------------------------- */

function PriceRow({ label, value, green = false }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-[#6C6C6C] font-light tracking-wide">{label}</span>

      <span
        className={`tracking-wide ${
          green ? "text-green-600" : "text-luxury-dark"
        }`}
      >
        {value}
      </span>
    </div>
  );
}

/* -------------------------------------------------------
   Trust Item
------------------------------------------------------- */

function TrustItem({ title, description }) {
  return (
    <div className="border border-luxury-gold/15 bg-[#FAF7F2] p-4 text-center">
      <p className="text-[10px] uppercase tracking-widest text-luxury-dark">
        {title}
      </p>

      <p className="text-[9px] text-[#777] mt-1">{description}</p>
    </div>
  );
}
