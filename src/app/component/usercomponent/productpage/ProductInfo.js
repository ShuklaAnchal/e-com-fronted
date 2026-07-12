"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  FaTruck,
  FaLeaf,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaBoxOpen,
} from "react-icons/fa";

import {
  MdSecurity,
  MdLocalFireDepartment,
  MdAutorenew,
} from "react-icons/md";

import { addToCartAction } from "@/app/store/action/cartAction";
import QuantitySelector from "./QuantitySelector";
import ProductActions from "./ProductActions";

export default function ProductInfo({ product }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(
    product?.variants?.[0] || null
  );

  const [pincode, setPincode] = useState("");
  const [deliveryResult, setDeliveryResult] = useState(null);

  const handleAddToCart = async (qty) => {
    const result = await dispatch(
      addToCartAction(
        {
          ...product,
          selectedVariant,
        },
        qty
      )
    );

    if (result.success) {
      alert("Product added successfully.");
    } else {
      alert(result.message);
    }
  };

  const handleBuyNow = async (qty) => {
    const result = await dispatch(
      addToCartAction(
        {
          ...product,
          selectedVariant,
        },
        qty
      )
    );

    if (result.success) {
      alert("Proceeding to Checkout");
    }
  };

  const checkPincode = () => {
    if (pincode.length !== 6) {
      setDeliveryResult({
        available: false,
        message: "Please enter a valid 6 digit pincode.",
      });
      return;
    }

    setDeliveryResult({
      available: true,
      date: "Delivered in 3-5 Business Days",
    });
  };

  return (
    <div className="flex flex-col animate-fade-up w-full">

      {/* Collection */}
      <p className="uppercase tracking-[0.45em] text-xs text-luxury-gold mb-4">
        Signature Fragrance Collection
      </p>

      {/* Name */}
      <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extralight text-luxury-dark leading-tight uppercase mb-5">
        {product.name}
      </h1>

      {/* Price */}
      <div className="flex flex-wrap items-center gap-3 md:gap-5 border-b border-luxury-gold/20 pb-8 mb-8">
        <span className="text-2xl md:text-3xl font-medium text-luxury-dark">
          ₹ {product.price}
        </span>

        {product.mrp && (
          <span className="line-through text-gray-400">
            ₹ {product.mrp}
          </span>
        )}

        {product.mrp && (
          <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
            Save ₹ {product.mrp - product.price}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-[#666] leading-8 font-light mb-10">
        {product.description ||
          "Crafted with premium soy wax and infused with luxurious fragrance oils, our candles transform every space into a warm and elegant sanctuary. Clean-burning, hand-poured, and designed for moments of relaxation."}
      </p>

      {/* Variant */}
      {product.variants?.length > 0 && (
        <div className="mb-10">
          <p className="uppercase tracking-[0.3em] text-xs text-luxury-gold mb-4">
            Choose Variant
          </p>

          <div className="flex flex-wrap gap-3">
            {product.variants.map((variant) => (
              <button
                key={variant.id}
                onClick={() => setSelectedVariant(variant)}
                className={`px-5 py-2 rounded-full border transition-all duration-300 ${
                  selectedVariant?.id === variant.id
                    ? "bg-luxury-dark text-white border-luxury-dark"
                    : "border-luxury-gold/30 hover:border-luxury-gold"
                }`}
              >
                {variant.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Product Specifications */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        <div>
          <p className="uppercase text-xs tracking-[0.25em] text-luxury-gold mb-2">
            Wax Type
          </p>

          <p>Soy Wax Blend</p>
        </div>

        <div>
          <p className="uppercase text-xs tracking-[0.25em] text-luxury-gold mb-2">
            Burn Time
          </p>

          <p>40 - 50 Hours</p>
        </div>

        <div>
          <p className="uppercase text-xs tracking-[0.25em] text-luxury-gold mb-2">
            Wick
          </p>

          <p>Lead-Free Cotton</p>
        </div>

        <div>
          <p className="uppercase text-xs tracking-[0.25em] text-luxury-gold mb-2">
            Handcrafted
          </p>

          <p>Made in India</p>
        </div>
      </div>

      {/* Candle Highlights */}
      <div className="grid grid-cols-2 gap-4 mb-10">

        <div className="border rounded-xl border-luxury-gold/20 p-4">
          <FaLeaf  className="w-5 h-5 text-luxury-gold mb-3" />
          <h4 className="font-serif mb-1">Natural Soy Wax</h4>
          <p className="text-xs text-gray-500">
            Clean & eco-friendly burn
          </p>
        </div>

        <div className="border rounded-xl border-luxury-gold/20 p-4">
          <MdLocalFireDepartment  className="w-5 h-5 text-luxury-gold mb-3" />
          <h4 className="font-serif mb-1">Long Burn</h4>
          <p className="text-xs text-gray-500">
            Up to 50 hours
          </p>
        </div>

        <div className="border rounded-xl border-luxury-gold/20 p-4">
          <FaCheckCircle className="w-5 h-5 text-luxury-gold mb-3" />
          <h4 className="font-serif mb-1">Premium Oils</h4>
          <p className="text-xs text-gray-500">
            Rich lasting fragrance
          </p>
        </div>

        <div className="border rounded-xl border-luxury-gold/20 p-4">
          <FaBoxOpen className="w-5 h-5 text-luxury-gold mb-3" />
          <h4 className="font-serif mb-1">Luxury Packaging</h4>
          <p className="text-xs text-gray-500">
            Gift-ready presentation
          </p>
        </div>

      </div>

      {/* Delivery */}
      <div className="border border-luxury-gold/20 rounded-2xl p-6 mb-10">

        <div className="flex items-center gap-2 mb-5">
          <FaMapMarkerAlt className="w-5 h-5 text-luxury-gold" />

          <h3 className="uppercase tracking-[0.25em] text-xs">
            Check Delivery
          </h3>
        </div>

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Enter Pincode"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="flex-1 border rounded-lg px-4 py-3 outline-none focus:border-luxury-gold"
          />

          <button
            onClick={checkPincode}
            className="bg-luxury-dark text-white px-6 rounded-lg"
          >
            Check
          </button>

        </div>

        {deliveryResult && (
          <p
            className={`mt-4 text-sm ${
              deliveryResult.available
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {deliveryResult.available
              ? `✓ ${deliveryResult.date}`
              : deliveryResult.message}
          </p>
        )}

      </div>

      {/* Quantity */}
      <div className="mb-10">

        <p className="uppercase tracking-[0.25em] text-xs mb-4">
          Quantity
        </p>

        <QuantitySelector
          quantity={quantity}
          setQuantity={setQuantity}
        />

      </div>

      {/* Buttons */}
      <ProductActions
        quantity={quantity}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Trust */}
      <div className="grid grid-cols-2 gap-5 mt-12">

        <div className="flex gap-3">
          <FaTruck className="w-5 h-5 text-luxury-gold" />
          <div>
            <h4 className="font-medium">Free Shipping</h4>
            <p className="text-xs text-gray-500">
              On prepaid orders above ₹999
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <MdAutorenew  className="w-5 h-5 text-luxury-gold" />
          <div>
            <h4 className="font-medium">Easy Returns</h4>
            <p className="text-xs text-gray-500">
              7-Day replacement for damaged items
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <MdSecurity  className="w-5 h-5 text-luxury-gold" />
          <div>
            <h4 className="font-medium">Secure Payments</h4>
            <p className="text-xs text-gray-500">
              100% encrypted checkout
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <FaCheckCircle className="w-5 h-5 text-luxury-gold" />
          <div>
            <h4 className="font-medium">Authentic Product</h4>
            <p className="text-xs text-gray-500">
              Hand-poured with premium ingredients
            </p>
          </div>
        </div>

      </div>

      {/* Policies */}
      <div className="mt-12 border-t border-luxury-gold/20 pt-8">

        <h3 className="uppercase tracking-[0.3em] text-xs text-luxury-gold mb-6">
          Shipping & Policies
        </h3>

        <ul className="space-y-3 text-sm text-gray-600 leading-7">
          <li>• Orders are dispatched within 24–48 hours.</li>
          <li>• Delivery usually takes 3–7 business days.</li>
          <li>• Returns are accepted only for damaged or incorrect products.</li>
          <li>• Replacement requests must be raised within 7 days of delivery.</li>
          <li>• Due to the handcrafted nature of our candles, slight variations in color and finish are natural.</li>
          <li>• Store candles in a cool, dry place away from direct sunlight.</li>
        </ul>

      </div>

    </div>
  );
}