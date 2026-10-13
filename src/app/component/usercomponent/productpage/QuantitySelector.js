
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
    <div
      className="
        flex h-11 w-32 select-none items-center
        overflow-hidden rounded-lg
        border border-luxury-gold/30
        sm:h-12 sm:w-36
        lg:h-14 lg:w-40
      "
      aria-label="Quantity selector"
    >
      <button
        type="button"
        onClick={decrease}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className="
          flex h-full w-10 shrink-0 items-center justify-center
          text-lg text-luxury-dark transition-colors
          hover:bg-luxury-gold/10
          disabled:cursor-not-allowed disabled:opacity-40
          sm:w-12 sm:text-xl
        "
      >
        −
      </button>

      <div
        className="
          flex-1 text-center text-sm font-medium
          text-luxury-dark
          sm:text-base
        "
        aria-live="polite"
        aria-atomic="true"
      >
        {quantity}
      </div>

      <button
        type="button"
        onClick={increase}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className="
          flex h-full w-10 shrink-0 items-center justify-center
          text-lg text-luxury-dark transition-colors
          hover:bg-luxury-gold/10
          disabled:cursor-not-allowed disabled:opacity-40
          sm:w-12 sm:text-xl
        "
      >
        +
      </button>
    </div>
  );
}
