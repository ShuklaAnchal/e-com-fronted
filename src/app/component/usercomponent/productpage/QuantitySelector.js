"use client";

export default function QuantitySelector({
  quantity,
  setQuantity,
  min = 1,
  max = 99,
}) {
  const decrease = () => {
    if (quantity > min) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    if (quantity < max) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className="flex items-center border border-luxury-gold/30 w-36 h-14 select-none">
      <button
        onClick={decrease}
        className="w-12 h-full flex items-center justify-center text-xl text-luxury-dark hover:bg-luxury-gold/10 transition-colors"
      >
        −
      </button>

      <div className="flex-1 text-center text-base font-medium text-luxury-dark">
        {quantity}
      </div>

      <button
        onClick={increase}
        className="w-12 h-full flex items-center justify-center text-xl text-luxury-dark hover:bg-luxury-gold/10 transition-colors"
      >
        +
      </button>
    </div>
  );
}