
"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

import Header from "@/app/component/mainpage/Header";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";
import Footer from "@/app/component/resuable/Footer";

import { sendOtp, verifyOtp } from "@/app/store/action/userAction";
import { mergeLocalCart } from "@/app/store/action/cartAction";

import { useDispatch } from "react-redux";

function LoginContent() {
  const router = useRouter();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("redirect") || "/";

  const [step, setStep] = useState(1);
  const [mobileNumber, setmobileNumber] = useState("");

  // 6 digit OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const [loading, setLoading] = useState(false);

  // =========================
  // SEND OTP
  // =========================
  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (mobileNumber.length !== 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    setLoading(true);

    try {
      const res = await dispatch(sendOtp(mobileNumber));

      if (res.success) {
        alert("OTP sent successfully");

        // Reset all 6 OTP fields
        setOtp(["", "", "", "", "", ""]);

        setStep(2);
      } else {
        alert(res.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Send OTP Error:", error);
      alert("Something went wrong while sending OTP.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // VERIFY OTP
  // =========================
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    // Must be exactly 6 digits
    if (otpValue.length !== 6) {
      alert("Please enter the complete 6-digit OTP.");
      return;
    }

    if (!/^\d{6}$/.test(otpValue)) {
      alert("OTP must contain 6 digits.");
      return;
    }

    setLoading(true);

    try {
      const res = await dispatch(
        verifyOtp({
          mobileNumber,
          otp: otpValue,
        })
      );

      if (res.success) {
        // Merge any guest cart items into the backend
        await dispatch(mergeLocalCart());

        router.push(redirectTo);
      } else {
        alert(res.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Verify OTP Error:", error);
      alert("Something went wrong while verifying OTP.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // OTP INPUT CHANGE
  // =========================
  const handleOtpChange = (element, index) => {
    const value = element.value;

    // Only allow numbers
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];

    // Keep only one digit
    newOtp[index] = value.slice(-1);

    setOtp(newOtp);

    // Move to next input
    if (value && index < otp.length - 1) {
      const nextInput = element.nextElementSibling;

      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  // =========================
  // BACKSPACE
  // =========================
  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const previousInput = e.currentTarget.previousElementSibling;

      if (previousInput) {
        previousInput.focus();
      }
    }
  };

  // =========================
  // CHANGE MOBILE NUMBER
  // =========================
  const handleChangeMobile = () => {
    setStep(1);

    // Reset all 6 OTP fields
    setOtp(["", "", "", "", "", ""]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-luxury-cream">
      <MarqueeBar />

      <Header />

      <main className="relative flex-1 flex items-center justify-center overflow-hidden px-4 mt-32 mb-20">
        {/* Background Glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[650px] h-[650px] rounded-full bg-luxury-gold/5 blur-[120px]" />
        </div>

        {/* Login Card */}
        <div className="relative z-10 w-full max-w-md luxury-glass rounded-2xl border border-[#C5A880]/20 p-8 md:p-12 shadow-[0_20px_50px_rgba(197,168,128,0.06)] animate-fade-up">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif uppercase tracking-[0.1em] text-luxury-dark leading-tight mb-3">
              {step === 1 ? "Welcome Back" : "Verification"}
            </h1>

            <p className="mx-auto max-w-[320px] text-sm leading-6 tracking-wide font-light text-[#6C6C6C]">
              {step === 1
                ? "Enter your mobile number to login in an account."
                : `We've sent a 6-digit code to +91 ${mobileNumber}`}
            </p>
          </div>

          {/* =========================
              MOBILE NUMBER
          ========================= */}
          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-7">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] text-luxury-gold-dark mb-3">
                  Mobile Number
                </label>

                <div className="relative flex flex-row items-center gap-2 border border-[#C5A880]/30 focus-within:border-[#C5A880]">
                  <span className="text-luxury-dark/60 font-light tracking-wide px-3">
                    +91
                  </span>

                  <input
                    type="tel"
                    inputMode="numeric"
                    value={mobileNumber}
                    onChange={(e) =>
                      setmobileNumber(
                        e.target.value.replace(/\D/g, "").slice(0, 10)
                      )
                    }
                    placeholder="Enter mobile number"
                    required
                    className="w-full h-14 bg-transparent pl-4 pr-4 text-luxury-dark tracking-[0.15em] placeholder:text-luxury-dark/20 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || mobileNumber.length !== 10}
                className="w-full h-14 mt-3 bg-luxury-dark text-[#C5A880] text-xs uppercase tracking-[0.2em] font-light transition-all duration-500 hover:bg-[#C5A880] hover:text-[#121212] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>

              <div className="w-full text-center text-sm">
                Not Registered yet?{" "}
                <Link
                  href={redirectTo !== "/" ? `/sign-up?redirect=${encodeURIComponent(redirectTo)}` : "/sign-up"}
                  className="text-luxury-gold-dark hover:text-luxury-dark transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </form>
          ) : (
            /* =========================
               OTP VERIFICATION
            ========================= */
            <form onSubmit={handleVerifyOtp} className="space-y-8">
              <div className="flex items-center justify-center gap-2 md:gap-3">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={data}
                    onChange={(e) =>
                      handleOtpChange(e.target, index)
                    }
                    onKeyDown={(e) =>
                      handleOtpKeyDown(e, index)
                    }
                    onFocus={(e) => e.target.select()}
                    className="w-11 h-14 sm:w-12 sm:h-14 md:w-14 md:h-14 bg-transparent border border-[#C5A880]/30 text-center text-xl font-light text-luxury-dark focus:outline-none focus:border-[#C5A880] transition-all"
                  />
                ))}
              </div>

              <p className="text-center text-xs text-[#777]">
                Enter the 6-digit OTP sent to your mobile number.
              </p>

              <button
                type="submit"
                disabled={loading || otp.join("").length !== 6}
                className="w-full mt-3 h-14 bg-luxury-dark text-[#C5A880] text-xs uppercase tracking-[0.2em] font-light transition-all duration-500 hover:bg-[#C5A880] hover:text-[#121212] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={handleChangeMobile}
                  className="text-[11px] uppercase tracking-[0.15em] text-luxury-gold-dark hover:text-luxury-dark transition-colors mt-3"
                >
                  Change Mobile Number
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginContent />
    </Suspense>
  );
}

