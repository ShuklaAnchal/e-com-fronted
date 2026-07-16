"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { addToCartAction, fetchCart } from "@/app/store/action/cartAction";

export default function CartPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { cartItems, loading } = useSelector((state) => state.cart);
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for client mount
  useEffect(() => {
    setMounted(true);
    dispatch(fetchCart());
  }, [dispatch]);

  const subtotal =
    cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  const handleLoadDummyData = async () => {
    const dummyProduct1 = {
      _id: "dummy-1",
      name: "Vanilla Soy Candle",
      price: 799,
      images: ["/candle.png"],
    };
    const dummyProduct2 = {
      _id: "dummy-2",
      name: "Midnight Oud",
      price: 1799,
      images: ["/candle.png"],
    };

    await dispatch(addToCartAction(dummyProduct1, 1));
    await dispatch(addToCartAction(dummyProduct2, 2));
  };

  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (!token || token === "undefined" || token === "null") {
      alert("Please login to proceed to checkout");
      router.push("/login");
    } else {
      alert("Proceeding to payment gateway...");
    }
  };

  if (!mounted) return null; // Avoid SSR hydration errors

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-luxury-cream pt-32 mb-20 mt-[100px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 animate-fade-up">
            <h1 className="text-4xl md:text-5xl font-serif text-luxury-dark uppercase tracking-[0.1em] mb-4">
              Your Cart
            </h1>
            <div className="w-20 h-[1px] bg-luxury-gold"></div>
          </div>

          {loading ? (
            <div className="min-h-[40vh] flex items-center justify-center">
              <p className="text-luxury-gold tracking-widest uppercase text-sm animate-pulse">
                Loading Cart...
              </p>
            </div>
          ) : !cartItems || cartItems.length === 0 ? (
            <div className="min-h-[40vh] flex flex-col items-center justify-center border border-[#C5A880]/20 bg-[#FAF7F2] p-10 animate-fade-in">
              <p className="font-serif text-2xl text-luxury-dark mb-4 text-center">
                Your shopping cart is empty.
              </p>
              <p className="text-[#6C6C6C] font-light tracking-wide mb-8 text-center max-w-md">
                Discover our signature collections and find the perfect
                aromatics for your space.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => router.push("/products")}
                  className="bg-luxury-dark text-[#C5A880] text-xs uppercase tracking-[0.2em] py-4 px-8 hover:bg-[#C5A880] hover:text-[#121212] transition-colors duration-500 font-light"
                >
                  Continue Shopping
                </button>
                <button
                  onClick={handleLoadDummyData}
                  className="border border-[#C5A880]/50 text-[#C5A880] text-xs uppercase tracking-[0.2em] py-4 px-8 hover:bg-[#C5A880] hover:text-[#121212] transition-colors duration-500 font-light"
                >
                  Load Dummy Data
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              {/* Cart Items List */}
              <div className="lg:col-span-8 animate-fade-up">
                <div className="border-b border-luxury-gold/20 pb-4 mb-6 hidden md:grid grid-cols-12 text-[10px] uppercase tracking-[0.2em] text-luxury-gold-dark">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                <div className="space-y-8">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center group relative border-b border-luxury-gold/10 pb-8 md:pb-6"
                    >
                      {/* Product Image & Name */}
                      <div className="col-span-1 md:col-span-6 flex items-center gap-6">
                        <div className="w-24 h-32 relative bg-luxury-dark/5 border border-luxury-gold/10 overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image || "/candle.png"}
                            alt={item.name}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase tracking-[0.2em] text-luxury-gold mb-1">
                            Signature
                          </p>
                          <h3 className="font-serif text-lg text-luxury-dark uppercase tracking-wide">
                            {item.name}
                          </h3>
                          <button className="text-[10px] text-red-400 uppercase tracking-widest mt-4 hover:text-red-600 transition-colors">
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-1 md:col-span-2 text-left md:text-center">
                        <span className="md:hidden text-[10px] uppercase tracking-widest text-luxury-gold-dark mr-2">
                          Price:
                        </span>
                        <span className="font-sans text-sm text-luxury-dark tracking-wide">
                          Rs. {item.price}
                        </span>
                      </div>

                      {/* Quantity */}
                      <div className="col-span-1 md:col-span-2 flex justify-start md:justify-center">
                        <span className="md:hidden text-[10px] uppercase tracking-widest text-luxury-gold-dark mr-2 self-center">
                          Qty:
                        </span>
                        <div className="flex items-center border border-luxury-gold/30">
                          <button className="px-3 py-1 text-luxury-dark hover:text-luxury-gold transition-colors">
                            -
                          </button>
                          <span className="px-3 py-1 text-sm font-sans">
                            {item.quantity}
                          </span>
                          <button className="px-3 py-1 text-luxury-dark hover:text-luxury-gold transition-colors">
                            +
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="col-span-1 md:col-span-2 text-left md:text-right">
                        <span className="md:hidden text-[10px] uppercase tracking-widest text-luxury-gold-dark mr-2">
                          Total:
                        </span>
                        <span className="font-sans text-sm text-luxury-dark font-medium tracking-wide">
                          Rs. {item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div
                className="lg:col-span-4 animate-fade-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="luxury-glass p-8 border border-luxury-gold/20">
                  <h2 className="font-serif text-2xl text-luxury-dark uppercase tracking-[0.1em] mb-6 pb-4 border-b border-luxury-gold/20">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6C6C6C] font-light tracking-wide">
                        Subtotal
                      </span>
                      <span className="font-sans text-luxury-dark tracking-wide">
                        Rs. {subtotal}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6C6C6C] font-light tracking-wide">
                        Shipping
                      </span>
                      <span className="font-sans text-luxury-dark tracking-wide">
                        Calculated at checkout
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between text-lg border-t border-luxury-gold/20 pt-6 mb-8">
                    <span className="font-serif text-luxury-dark tracking-wide uppercase">
                      Total
                    </span>
                    <span className="font-sans text-luxury-dark font-medium tracking-wide">
                      Rs. {subtotal}
                    </span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full bg-luxury-dark text-[#C5A880] text-xs uppercase tracking-[0.2em] py-4 transition-all duration-500 hover:bg-[#C5A880] hover:text-[#121212] font-light"
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
