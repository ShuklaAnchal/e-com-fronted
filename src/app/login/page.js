"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/component/mainpage/Header";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";
import Footer from "@/app/component/resuable/Footer";
import { sendOtp, verifyOtp } from "@/app/store/action/userAction";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [step, setStep] = useState(1);
  const [mobileNumber, setmobileNumber] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (mobileNumber.length !== 10) {
      alert("Please enter a valid mobile number.");
      return;
    }

    setLoading(true);

    const res = await dispatch(sendOtp(mobileNumber));

    setLoading(false);

    if (res.success) {
      alert("OTP sent successfully");
      setStep(2);
    } else {
      alert(res.message);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    const otpValue = otp.join("");

    if (otpValue.length !== 4) {
      alert("Please enter valid OTP");
      return;
    }

    setLoading(true);

    const res = await dispatch(
      verifyOtp({
        mobileNumber,
        otp: otpValue,
      }),
    );

    setLoading(false);

    if (res.success) {
      alert("Login Successful");
      router.push("/cart");
    } else {
      alert(res.message);
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    if (element.value && element.nextSibling) {
      element.nextSibling.focus();
    }
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
                ? "Enter your mobile number to sign in or create an account."
                : `We've sent a 4-digit code to +91 ${mobileNumber}`}
            </p>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-7">
              <div>
                <label className="block text-[10px] uppercase tracking-[0.25em] text-luxury-gold-dark mb-3">
                  Mobile Number
                </label>

                <div className="relative flex flex row items-center gap-2 border border-[#C5A880]/30 focus:outline-none focus:border-[#C5A880]">
                  <span className="text-luxury-dark/60 font-light tracking-wide px-3">
                    +91
                  </span>

                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) =>
                      setmobileNumber(
                        e.target.value.replace(/\D/g, "").slice(0, 10),
                      )
                    }
                    // placeholder="00000 00000"
                    required
                    className="w-full h-14 bg-transparent pl-14 pr-4 text-luxury-dark tracking-[0.15em] placeholder:text-luxury-dark/20 outline-none transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 mt-3 bg-luxury-dark text-[#C5A880] text-xs uppercase tracking-[0.2em] font-light transition-all duration-500 hover:bg-[#C5A880] hover:text-[#121212] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-8">
              <div className="flex items-center justify-center gap-3 md:gap-4">
                {otp.map((data, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={data}
                    onChange={(e) => handleOtpChange(e.target, index)}
                    onFocus={(e) => e.target.select()}
                    className="w-14 h-14 md:w-16 md:h-16 bg-transparent border border-[#C5A880]/30 text-center text-xl font-light text-luxury-dark focus:outline-none focus:border-[#C5A880] transition-all"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-3 h-14 bg-luxury-dark text-[#C5A880] text-xs uppercase tracking-[0.2em] font-light transition-all duration-500 hover:bg-[#C5A880] hover:text-[#121212] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Verifying..." : "Verify & Login"}
              </button>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setOtp(["", "", "", ""]);
                  }}
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
