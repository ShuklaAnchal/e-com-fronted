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

import { MdSecurity, MdLocalFireDepartment, MdAutorenew } from "react-icons/md";

import { addToCartAction } from "@/app/store/action/cartAction";

import QuantitySelector from "./QuantitySelector";
import ProductActions from "./ProductActions";

export default function ProductInfo({
  product,
  variants = [],
  productDetails = [],
}) {
  const dispatch = useDispatch();

  const defaultVariant =
    variants.find((variant) => variant.isDefault) || variants[0] || null;

  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);

  const [pincode, setPincode] = useState("");
  const [deliveryResult, setDeliveryResult] = useState(null);

  const pricing = selectedVariant?.pricing || {};

  const sellingPrice = pricing.sellingPrice || 0;
  const mrp = pricing.mrp || 0;
  const discountPercent = pricing.discountPercent || 0;

  const stock = selectedVariant?.inventory?.stockQuantity || 0;

  const isInStock = selectedVariant?.inventory?.inStock && stock > 0;

  const handleAddToCart = async (qty) => {
    if (!selectedVariant) {
      alert("Please select a variant.");
      return;
    }

    if (!isInStock) {
      alert("This product is currently out of stock.");
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
      console.log("d")
    } else {
      alert(result?.message || "Unable to add product.");
    }
  };

  const handleBuyNow = async (qty) => {
    if (!selectedVariant) {
      alert("Please select a variant.");
      return;
    }

    if (!isInStock) {
      alert("This product is currently out of stock.");
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
      alert("Proceeding to Checkout");
    } else {
      alert(result?.message || "Unable to proceed.");
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
    <div className="flex flex-col w-full">
      {/* Brand */}
      <p className="uppercase tracking-[0.35em] text-xs text-gray-500 mb-4">
        {product.brand || "Premium Collection"}
      </p>

      {/* Product Name */}
      <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-tight mb-5">
        {product.name}
      </h1>

      {/* Category */}
      <div className="flex gap-2 text-sm text-gray-500 mb-6">
        <span>{product.category?.name}</span>

        {product.subCategory?.name && (
          <>
            <span>/</span>
            <span>{product.subCategory.name}</span>
          </>
        )}
      </div>

      {/* Price */}
      <div className="flex flex-wrap items-center gap-4 border-b border-gray-200 pb-7 mb-7">
        <span className="text-3xl font-medium text-gray-900">
          ₹{sellingPrice}
        </span>

        {mrp > sellingPrice && (
          <span className="line-through text-gray-400 text-lg">₹{mrp}</span>
        )}

        {discountPercent > 0 && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            {discountPercent}% OFF
          </span>
        )}
      </div>

      {/* Short Description */}
      <p className="text-gray-600 leading-8 mb-8">
        {product.shortDescription ||
          "Premium quality product crafted with care."}
      </p>

      {/* Variants */}
      {variants.length > 0 && (
        <div className="mb-8">
          <p className="uppercase tracking-[0.25em] text-xs text-gray-500 mb-4">
            Choose Variant
          </p>

          <div className="flex flex-wrap gap-3">
            {variants.map((variant) => {
              const isSelected = selectedVariant?._id === variant._id;

              const variantAttribute = variant.attributes?.[0];

              return (
                <button
                  key={variant._id}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={`px-5 py-3 rounded-full border transition ${
                    isSelected
                      ? "bg-black text-white border-black"
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

      {/* Stock */}
      <div className="mb-8">
        {isInStock ? (
          <p className="text-green-600 text-sm">
            ✓ In Stock ({stock} available)
          </p>
        ) : (
          <p className="text-red-500 text-sm">Out of Stock</p>
        )}
      </div>

      {/* Delivery */}
      <div className="border border-gray-200 rounded-2xl p-3 mb-2">
        <div className="flex items-center gap-2 mb-5">
          <FaMapMarkerAlt className="text-gray-700" />

          <h3 className="uppercase tracking-wider text-xs">Check Delivery</h3>
        </div>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter Pincode"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
            className="flex-1 border rounded-lg px-2.5 py-1.5 outline-none focus:border-black"
          />

          <button
            type="button"
            onClick={checkPincode}
            className="bg-black text-white px-4 rounded-lg"
          >
            Check
          </button>
        </div>

        {deliveryResult && (
          <p
            className={`mt-4 text-sm ${
              deliveryResult.available ? "text-green-600" : "text-red-500"
            }`}
          >
            {deliveryResult.available
              ? `✓ ${deliveryResult.date}`
              : deliveryResult.message}
          </p>
        )}
      </div>

      {/* Quantity */}
      <div className="mb-8">
        <p className="uppercase tracking-wider text-xs mb-4">Quantity</p>

        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      </div>

      {/* Cart / Buy Now */}
      <ProductActions
        quantity={quantity}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        disabled={!isInStock}
      />

      {/* Trust */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
        <div className="flex gap-3">
          <FaTruck className="w-5 h-5 text-gray-700" />

          <div>
            <h4 className="font-medium">Free Shipping</h4>

            <p className="text-xs text-gray-500">
              On prepaid orders above ₹999
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <MdAutorenew className="w-5 h-5 text-gray-700" />

          <div>
            <h4 className="font-medium">Easy Returns</h4>

            <p className="text-xs text-gray-500">
              7-Day replacement for damaged items
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <MdSecurity className="w-5 h-5 text-gray-700" />

          <div>
            <h4 className="font-medium">Secure Payments</h4>

            <p className="text-xs text-gray-500">100% encrypted checkout</p>
          </div>
        </div>

        <div className="flex gap-3">
          <FaCheckCircle className="w-5 h-5 text-gray-700" />

          <div>
            <h4 className="font-medium">Authentic Product</h4>

            <p className="text-xs text-gray-500">Quality assured product</p>
          </div>
        </div>
      </div>

 
    </div>
  );
}
