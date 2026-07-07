"use client";

export default function ProductActions({
  quantity,
  onAddToCart,
  onBuyNow,
}) {
  return (
    <div className="space-y-4 mt-8">

      {/* Add to Cart */}
      <button
        onClick={() => onAddToCart(quantity)}
        className="w-full h-14 bg-luxury-dark text-luxury-cream uppercase tracking-[0.2em] text-xs font-light transition-all duration-300 hover:bg-luxury-gold hover:text-luxury-dark cursor-pointer"
      >
        Add to Cart
      </button>

      {/* Buy Now */}
      <button
        onClick={() => onBuyNow(quantity)}
        className="w-full h-14 border border-luxury-dark text-luxury-dark uppercase tracking-[0.2em] text-xs font-light transition-all duration-300 hover:bg-luxury-dark hover:text-luxury-cream cursor-pointer"
      >
        Buy It Now
      </button>

    </div>
  );
}