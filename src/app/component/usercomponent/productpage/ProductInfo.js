"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCartAction } from "@/app/store/action/cartAction";
import QuantitySelector from "./QuantitySelector";
import ProductActions from "./ProductActions";

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  const handleAddToCart = async (qty) => {
    console.log("Added to cart:", product.name, "Quantity:", qty);
    const result = await dispatch(addToCartAction(product, qty));
    if (result.success) {
      alert("Product added to cart successfully!");
    } else {
      alert("Failed to add product to cart: " + result.message);
    }
  };

  const handleBuyNow = async (qty) => {
    console.log("Buy now:", product.name, "Quantity:", qty);
    const result = await dispatch(addToCartAction(product, qty));
    if (result.success) {
      // Later redirect to checkout page
      alert("Proceeding to checkout");
    } else {
      alert("Failed to add product to cart: " + result.message);
    }
  };

  return (
    <div className="flex flex-col animate-fade-up">
      {/* Collection Label */}
      <p className="text-xs tracking-[0.4em] text-luxury-gold font-light uppercase mb-4">
        Signature Collection
      </p>

      {/* Product Name */}
      <h1 className="text-3xl md:text-5xl font-serif font-extralight text-luxury-dark uppercase tracking-[0.1em] leading-tight mb-6">
        {product.name}
      </h1>

      {/* Price Section */}
      <div className="flex items-center gap-4 pb-8 mb-8 border-b border-luxury-gold/20">
        <span className="text-2xl text-luxury-dark font-medium tracking-wide">
          Rs. {product.price}
        </span>

        <span className="text-sm text-gray-400 line-through">
          Rs. {product.mrp}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-[#6C6C6C] leading-relaxed tracking-wide font-light mb-10">
        {product.description}
      </p>

      {/* Product Details */}
      <div className="grid grid-cols-2 gap-6 mb-10">
        {product.details?.map((detail, index) => (
          <div key={index}>
            <p className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold mb-2">
              {detail.label}
            </p>

            <p className="text-sm font-serif text-luxury-dark tracking-wide">
              {detail.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quantity */}
      <div className="border-t border-luxury-gold/20 pt-8">
        <p className="text-xs uppercase tracking-[0.25em] text-luxury-dark mb-4">
          Quantity
        </p>

        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      </div>

      {/* Buttons */}
      <ProductActions
        quantity={quantity}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
}
