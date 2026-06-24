"use client";

import React, { useState, useEffect } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaWhatsapp,
  FaChevronDown,
  FaArrowUp,
} from "react-icons/fa";
import { MdEmail, MdLocationOn } from "react-icons/md";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Footer = () => {
  const [openPolicy, setOpenPolicy] = useState(false);
  const [openSupport, setOpenSupport] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      setShowTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="contact"
      className="bg-[#111111] text-[#F5F1EA] border-t border-[#C5A880]/20"
    >
      {/* Top Luxury Divider */}{" "}
      <div className="pt-16">
        {" "}
        <div className="text-center mb-16">
          {" "}
          <p className="text-xs tracking-[0.5em] uppercase text-[#C5A880] mb-4">
            Siyaas{" "}
          </p>
          <div className="w-24 h-px bg-[#C5A880]/40 mx-auto" />
        </div>
      </div>
      <div className="container mx-auto px-6 lg:px-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          {/* Brand */}
          <div>
            <img
              src="/siyaas-removebg-preview.png"
              alt="Siyaas"
              className="w-32 mb-6"
            />

            <p className="text-[#D9D2C5] text-sm leading-7 mb-8">
              Handcrafted candles, diffusers and fragrances designed to elevate
              everyday rituals into luxurious experiences.
            </p>

            <div className="flex gap-4">
              <IconWrap>
                <a
                  href="https://www.instagram.com/siyaas_candles"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram />
                </a>
              </IconWrap>

              <IconWrap>
                <a
                  href="https://www.facebook.com/p/Siyaas-Candles-61578348596603/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF />
                </a>
              </IconWrap>

              <IconWrap>
                <a
                  href="https://youtube.com/@siyaascandles"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube />
                </a>
              </IconWrap>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm tracking-[0.25em] uppercase text-[#C5A880] mb-6">
              Shop
            </h3>

            <ul className="space-y-4">
              <li
                onClick={() => router.push("/categories/candles")}
                className="text-[#D9D2C5] hover:text-[#C5A880] transition-all duration-300 cursor-pointer text-sm"
              >
                Candles
              </li>

              <li
                onClick={() => router.push("/categories/diffusers")}
                className="text-[#D9D2C5] hover:text-[#C5A880] transition-all duration-300 cursor-pointer text-sm"
              >
                Diffusers
              </li>

              <li
                onClick={() => router.push("/categories/perfumes")}
                className="text-[#D9D2C5] hover:text-[#C5A880] transition-all duration-300 cursor-pointer text-sm"
              >
                Perfumes
              </li>

              <li className="text-[#D9D2C5] hover:text-[#C5A880] transition-all duration-300 cursor-pointer text-sm">
                Bestsellers
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <button
              onClick={() => setOpenPolicy(!openPolicy)}
              className="w-full flex justify-between items-center md:cursor-default"
            >
              <h3 className="text-sm tracking-[0.25em] uppercase text-[#C5A880]">
                Policies
              </h3>

              <FaChevronDown
                className={`md:hidden transition-transform ${
                  openPolicy ? "rotate-180" : ""
                }`}
              />
            </button>

            <ul
              className={`overflow-hidden transition-all duration-300 mt-6 space-y-4 ${
                openPolicy ? "max-h-96" : "max-h-0 md:max-h-96"
              }`}
            >
              <li>
                <Link
                  href="/policys/shippingPolicy"
                  className="text-[#D9D2C5] hover:text-[#C5A880] text-sm transition-all"
                >
                  Shipping Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/policys/cancellationRefund"
                  className="text-[#D9D2C5] hover:text-[#C5A880] text-sm transition-all"
                >
                  Cancellation & Refund
                </Link>
              </li>

              <li>
                <Link
                  href="/policys/privacyPolicy"
                  className="text-[#D9D2C5] hover:text-[#C5A880] text-sm transition-all"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/policys/termsConditions"
                  className="text-[#D9D2C5] hover:text-[#C5A880] text-sm transition-all"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <button
              onClick={() => setOpenSupport(!openSupport)}
              className="w-full flex justify-between items-center md:cursor-default"
            >
              <h3 className="text-sm tracking-[0.25em] uppercase text-[#C5A880]">
                Contact
              </h3>

              <FaChevronDown
                className={`md:hidden transition-transform ${
                  openSupport ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 mt-6 space-y-5 ${
                openSupport ? "max-h-[500px]" : "max-h-0 md:max-h-[500px]"
              }`}
            >
              <div className="flex items-center gap-3 text-sm text-[#D9D2C5]">
                <MdEmail className="text-[#C5A880]" />
                <span>siyaascandles@gmail.com</span>
              </div>

              <div className="flex gap-3 text-sm text-[#D9D2C5]">
                <MdLocationOn className="text-[#C5A880] text-xl mt-1 shrink-0" />

                <p>
                  88 Aryan Villa, Behind Palak Vihar Phase 2, Khajuri Kalan,
                  Piplani, Bhopal (M.P.) 462022
                </p>
              </div>

              <a
                href="https://wa.me/916263799823?text=Hello%20I%20am%20interested%20in%20your%20products"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 border border-[#C5A880] text-[#C5A880] px-6 py-3 uppercase tracking-[0.15em] text-xs hover:bg-[#C5A880] hover:text-black transition-all duration-300"
              >
                <FaWhatsapp />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-20 pt-8 border-t border-[#C5A880]/20">
          <p className="text-xs tracking-[0.2em] uppercase text-[#D9D2C5]/70">
            © 2025 Siyaas. Crafted with Elegance.
          </p>

          <div className="flex gap-4 mt-6 md:mt-0">
            <img src="/visa.png" alt="Visa" className="h-6 opacity-80" />
            <img
              src="/mastercard.png"
              alt="Mastercard"
              className="h-6 opacity-80"
            />
            <img src="/paytm.png" alt="Paytm" className="h-6 opacity-80" />
            <img src="/rupay.png" alt="Rupay" className="h-6 opacity-80" />
          </div>
        </div>
      </div>
      {/* Floating Actions */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        {showTop && (
          <button
            onClick={scrollToTop}
            className="w-14 h-14 rounded-full bg-[#C5A880] text-black shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
          >
            <FaArrowUp />
          </button>
        )}

        <a
          href="https://wa.me/916263799823?text=Hello%20I%20am%20interested%20in%20your%20products"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-green-500 text-white shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
        >
          <FaWhatsapp size={24} />
        </a>
      </div>
    </footer>
  );
};

const IconWrap = ({ children }) => (
  <div className="w-11 h-11 rounded-full border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] hover:bg-[#C5A880] hover:text-black transition-all duration-300 cursor-pointer">
    {children}
  </div>
);

export default Footer;
