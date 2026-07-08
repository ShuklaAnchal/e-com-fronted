"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { SlUser } from "react-icons/sl";
import { GiShoppingCart } from "react-icons/gi";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Scroll only for homepage
  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      setShowTopBtn(false);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 56);
      setShowTopBtn(window.scrollY > 300);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  // Cart count
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");

      const count = cart.reduce(
        (total, item) => total + (item.quantity || 1),
        0,
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
    {
      id: "home",
      name: "Home",
      route: "/",
    },
    {
      id: "products",
      name: "Products",
      route: "/products",
    },
    {
      id: "about",
      name: "About",
      route: "/#about",
    },
    {
      id: "contact",
      name: "Contact",
      route: "/#contact",
    },
  ];

  const handleNavClick = (item) => {
    setIsOpen(false);

    if (item.route.startsWith("/#")) {
      const sectionId = item.route.replace("/#", "");

      if (pathname !== "/") {
        router.push(item.route);
        return;
      }

      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({
          behavior: "smooth",
        });
      }

      return;
    }

    router.push(item.route);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header
        className={`fixed left-0 w-full transition-all duration-500 backdrop-blur-xl ${
          isScrolled
            ? "top-0 bg-[#FAF7F2]/95 border-b border-[#C5A880]/15 shadow-lg z-50 py-6"
            : "top-12 bg-transparent z-40 py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* Navigation */}

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`text-xs uppercase tracking-[0.25em] transition-colors ${
                  isScrolled
                    ? "text-[#121212] hover:text-[#C5A880]"
                    : "text-white hover:text-[#C5A880]"
                }`}
              >
                {item.name}
              </button>
            ))}

            <div className="relative" onMouseLeave={() => setShowMore(false)}>
              <button
                onMouseEnter={() => setShowMore(true)}
                onClick={() => setShowMore(!showMore)}
                className={`text-xs uppercase tracking-[0.25em] ${
                  isScrolled ? "text-[#121212]" : "text-white"
                }`}
              >
                More ▾
              </button>

              {showMore && (
                <div className="absolute top-8 bg-[#FAF7F2] w-52 shadow-xl py-3">
                  <Link
                    href="/faqs"
                    className="block px-5 py-3 text-xs text-black hover:text-[#C5A880]"
                  >
                    FAQ's
                  </Link>

                  <Link
                    href="/policys/cancellationRefund"
                    className="block px-5 py-3 text-xs text-black hover:text-[#C5A880]"
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
              src={
                isHomePage && !isScrolled
                  ? "/siyassLogowhite.png"
                  : "/siyaas-removebg-preview.png"
              }
              alt="Siyaas Logo"
              width={100}
              height={60}
              priority
              className="object-contain transition-all duration-300"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-6 ml-auto">
            {/* Search Icon */}
            <button
              className={`transition-colors duration-300 cursor-pointer ${
                isScrolled
                  ? "text-[#121212] hover:text-[#C5A880]"
                  : "text-white hover:text-[#C5A880]"
              }`}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* User Icon */}
            <button
              className={`transition-colors duration-300 cursor-pointer ${
                isScrolled
                  ? "text-[#121212] hover:text-[#C5A880]"
                  : "text-white hover:text-[#C5A880]"
              }`}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="7" r="4" />
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              </svg>
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => router.push("/cart")}
              className={`relative transition-colors duration-300 cursor-pointer ${
                isScrolled
                  ? "text-[#121212] hover:text-[#C5A880]"
                  : "text-white hover:text-[#C5A880]"
              }`}
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>

              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#C5A880] text-[#121212] text-[10px] font-medium rounded-full w-4 h-4 flex items-center justify-center shadow-sm animate-scale-in">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-black text-white p-3 rounded-full"
        >
          ↑
        </button>
      )}
    </>
  );
};

export default Header;
