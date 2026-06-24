"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { COLORS } from "@/app/component/constant/Color";

const Header = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 56);
      setShowTopBtn(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      const count = cart.reduce(
        (total, item) => total + (item.quantity || 1),
        0
      );

      setCartCount(count);
    };

    updateCartCount();

    window.addEventListener("cartUpdated", updateCartCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  const navItems = [
    { id: "home", name: "Home", route: "/" },
    { id: "products", name: "Products", route: "/products" },
    { id: "about", name: "About", route: "/#about" },
    { id: "contact", name: "Contact", route: "/#contact" },
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavClick = (item) => {
    setIsOpen(false);

    if (item.id === "products") {
      router.push("/products");
      return;
    }

    if (item.route.startsWith("/#")) {
      const sectionId = item.route.replace("/#", "");

      if (window.location.pathname !== "/") {
        router.push(item.route);
        return;
      }

      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }
    } else {
      router.push(item.route);
    }
  };

  return (
    <>
      <header
        className={`fixed left-0 w-full transition-all duration-300 backdrop-blur-xl ${
          isScrolled
            ? "top-0 shadow-sm z-50"
            : "top-12 bg-transparent z-40"
        }`}
        style={isScrolled ? { backgroundColor: COLORS.white } : {}}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-6 flex items-center justify-between relative">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden absolute left-0 px-2 transition-colors ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10 mr-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`text-sm font-light tracking-widest transition-all cursor-pointer ${
                  isScrolled
                    ? "text-black hover:text-gray-600"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
              </button>
            ))}

            {/* More Dropdown */}
            <div
              className="relative"
              onMouseLeave={() => setShowMore(false)}
            >
              <button
                onMouseEnter={() => setShowMore(true)}
                onClick={() => setShowMore(!showMore)}
                className={`text-sm font-light tracking-widest transition-all cursor-pointer ${
                  isScrolled
                    ? "text-black hover:text-gray-600"
                    : "text-white/80 hover:text-white"
                }`}
              >
                More ▾
              </button>

              {showMore && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link
                    href="/faqs"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    FAQ's
                  </Link>

                  <Link
                    href="/policys/cancellationRefund"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Refund Policy
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* Logo */}
          <div
            className="absolute left-1/2 -translate-x-1/2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src="/siyaas-removebg-preview.png"
              alt="Siyaas Logo"
              width={100}
              height={60}
              priority
              className="object-contain hover:opacity-90 transition-opacity"
            />
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-6 ml-auto">
            {/* Search Icon */}
            <button
              className={`transition-colors ${
                isScrolled
                  ? "text-black hover:text-gray-600"
                  : "text-white hover:text-gray-200"
              }`}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* User Icon (Frontend Only) */}
            <button
              className={`transition-colors ${
                isScrolled
                  ? "text-black hover:text-gray-600"
                  : "text-white hover:text-gray-200"
              }`}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              </svg>
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => router.push("/cart")}
              className={`relative transition-colors ${
                isScrolled
                  ? "text-black hover:text-gray-600"
                  : "text-white hover:text-gray-200"
              }`}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>

              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden backdrop-blur-xl bg-black/40">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className="block w-full text-left px-6 py-4 text-sm tracking-widest text-white hover:bg-white/10"
              >
                {item.name}
              </button>
            ))}

            <Link
              href="/faqs"
              className="block px-6 py-4 text-sm tracking-widest text-white hover:bg-white/10"
            >
              FAQ's
            </Link>

            <Link
              href="/policys/cancellationRefund"
              className="block px-6 py-4 text-sm tracking-widest text-white hover:bg-white/10"
            >
              Refund Policy
            </Link>
          </div>
        )}
      </header>

      {/* Scroll To Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-black/80 text-white hover:bg-black transition-all"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}
    </>
  );
};

export default Header;