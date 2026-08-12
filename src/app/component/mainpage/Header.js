"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useRouter, usePathname } from "next/navigation";
import { FiMenu } from "react-icons/fi";

import { fetchCurrentAdmin } from "@/app/store/action/adminAction";
import { fetchCart } from "@/app/store/action/cartAction";
import { Donegal_One } from "next/font/google";
import { FaRunning } from "react-icons/fa";

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  // =====================================================
  // PAGE
  // =====================================================

  const isHomePage = pathname === "/";

  // =====================================================
  // REDUX STATE
  // =====================================================

  /*
    IMPORTANT:

    If your store is:

    combineReducers({
      login: loginReducer,
      cart: cartReducer
    })

    then use:

    state.login

    NOT:

    state.loginState
  */

  const loginState = useSelector((state) => state.login);

  const { cartItems = [] } = useSelector((state) => state.cart);

  // Your reducer currently seems to store the user inside `admin`
  const currentUser = loginState?.admin || null;

  // =====================================================
  // CART COUNT
  // =====================================================

  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0,
  );

  // =====================================================
  // STATES
  // =====================================================

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // =====================================================
  // SCROLL HANDLER
  // =====================================================

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

  // =====================================================
  // FETCH CURRENT USER
  // =====================================================

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

    if (token && token !== "undefined" && token !== "null" && !currentUser) {
      dispatch(fetchCurrentAdmin());
    }
  }, [dispatch, currentUser]);

  // =====================================================
  // FETCH CART
  // =====================================================

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

    if (token && token !== "undefined" && token !== "null") {
      dispatch(fetchCart());
    }
  }, [dispatch]);

  // =====================================================
  // PROFILE CLICK
  // =====================================================

  const handleProfileClick = () => {
    console.log({hand:"riundf"});
    
    const token =
      typeof window !== "undefined" ? localStorage.getItem("userToken") : null;
console.log({token});

    // No token
    if (!token || token === "undefined" || token === "null") {
      router.push("/login");
      return;
    }

    console.log("PROFILE USER:", currentUser);

    /*
      Depending on your backend response,
      you may have:

      currentUser.userType
      OR
      currentUser.role
    */
    const userType = currentUser?.userType || currentUser?.role;

    console.log("PROFILE USER TYPE:", userType);

    if (userType === "user" || userType === "USER") {
      router.push("/user");
      return;
    }

    // If admin / salesperson / distributor / retailer etc.
    console.log("User is not a normal user:", userType);

    // You can send them somewhere else if required
    router.push("/login");
  };

  // =====================================================
  // NAVIGATION ITEMS
  // =====================================================

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

  // =====================================================
  // NAVIGATION CLICK
  // =====================================================

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

  // =====================================================
  // SCROLL TO TOP
  // =====================================================

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // HEADER ACTIVE STATE
  // =====================================================

  const headerActive = isScrolled || isHovered;

  // =====================================================
  // RETURN
  // =====================================================

  return (
    <>
      {/* =====================================================
          DESKTOP / MAIN HEADER
      ===================================================== */}

      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          group
          fixed
          left-0
          w-full
          z-40
          py-6
          hover:bg-white
          transition-all
          ease-linear
          duration-500
          ${
            isScrolled
              ? "top-0 bg-white border-b border-[#C5A880]/15 shadow-lg z-50 py-6"
              : "top-12 bg-transparent z-40 py-6"
          }
        `}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">
          {/* MOBILE MENU */}

          <button
            className={`
              md:hidden
              transition-colors
              duration-300
              cursor-pointer
              ${headerActive ? "text-[#121212]" : "text-white"}
            `}
            onClick={() => setIsOpen(true)}
          >
            <FiMenu className="w-6 h-6" />
          </button>

          {/* DESKTOP NAVIGATION */}

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  transition-colors
                  duration-300
                  font-semibold
                  ${
                    headerActive
                      ? "text-[#121212] hover:text-[#C5A880]"
                      : "text-white hover:text-[#C5A880]"
                  }
                `}
              >
                {item.name}
              </button>
            ))}

            {/* MORE */}

            <div className="relative" onMouseLeave={() => setShowMore(false)}>
              <button
                onMouseEnter={() => setShowMore(true)}
                onClick={() => setShowMore(!showMore)}
                className={`
                  text-xs
                  uppercase
                  tracking-[0.25em]
                  font-semibold
                  transition-colors
                  duration-300
                  ${headerActive ? "text-[#121212]" : "text-white"}
                `}
              >
                More ▾
              </button>

              {showMore && (
                <div
                  className="
                    absolute
                    top-8
                    left-0
                    bg-white
                    w-52
                    shadow-xl
                    py-3
                    border
                    border-[#C5A880]/10
                    z-50
                  "
                >
                  <Link
                    href="/faqs"
                    className="block px-5 py-3 text-xs text-black hover:text-[#C5A880]"
                  >
                    FAQ&apos;s
                  </Link>

                  <Link
                    href="/policys/cancellationRefund"
                    className="block px-5 py-3 text-xs text-black hover:text-[#C5A880]"
                  >
                    Refund Policy
                  </Link>

                  <Link
                    href="/blogs"
                    className="block px-5 py-3 text-xs text-black hover:text-[#C5A880]"
                  >
                    Blogs
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* LOGO */}

          <div
            className="
              absolute
              left-1/2
              -translate-x-1/2
              cursor-pointer
            "
            onClick={() => router.push("/")}
          >
            <Image
              src="/siyassLogowhite.png"
              alt="Siyaas Logo"
              width={100}
              height={60}
              priority
              className={`
                object-contain
                transition-all
                duration-300
                ${headerActive ? "opacity-0" : "opacity-100"}
              `}
            />

            <Image
              src="/siyaas-removebg-preview.png"
              alt="Siyaas Logo"
              width={100}
              height={60}
              priority
              className={`
                absolute
                inset-0
                w-full
                h-full
                object-contain
                transition-opacity
                duration-500
                ${headerActive ? "opacity-100" : "opacity-0"}
              `}
            />
          </div>

          {/* RIGHT SIDE */}

          <div className="flex items-center gap-6 ml-auto">
            {/* SEARCH */}

            <button
              className={`
                transition-colors
                duration-300
                cursor-pointer
                ${
                  headerActive
                    ? "text-[#121212] hover:text-[#C5A880]"
                    : "text-white hover:text-[#C5A880]"
                }
              `}
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

            {/* USER */}

            <button
             onClick={handleProfileClick}
              className={`
                transition-colors
                duration-300
                cursor-pointer
                ${
                  headerActive
                    ? "text-[#121212] hover:text-[#C5A880]"
                    : "text-white hover:text-[#C5A880]"
                }
              `}
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

            {/* CART */}

            <button
              onClick={() => router.push("/user/cart")}
              className={`
                relative
                transition-colors
                duration-300
                cursor-pointer
                ${
                  headerActive
                    ? "text-[#121212] hover:text-[#C5A880]"
                    : "text-white hover:text-[#C5A880]"
                }
              `}
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
                <span
                  className="
                    absolute
                    -top-1.5
                    -right-2
                    bg-[#C5A880]
                    text-[#121212]
                    text-[10px]
                    font-medium
                    rounded-full
                    w-4
                    h-4
                    flex
                    items-center
                    justify-center
                    shadow-sm
                  "
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}

      <div
        style={{ zIndex: 999 }}
        className={`
          fixed
          inset-0
          bg-black/50
          transition-opacity
          duration-300
          md:hidden
          ${
            isOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
        onClick={() => setIsOpen(false)}
      />

      {/* =====================================================
          MOBILE SIDE PANEL
      ===================================================== */}

      <div
        style={{ zIndex: 1000 }}
        className={`
          fixed
          top-0
          left-0
          h-full
          w-64
          bg-white
          transform
          transition-all
          ease-in
          duration-300
          md:hidden
          flex
          flex-col
          p-6
          ${
            isOpen
              ? "translate-x-0 shadow-2xl"
              : "-translate-x-full shadow-none"
          }
        `}
      >
        <div className="flex justify-between items-center mb-10">
          <Image
            src="/siyaas-removebg-preview.png"
            alt="Siyaas Logo"
            width={80}
            height={40}
            className="object-contain"
          />

          <button
            onClick={() => setIsOpen(false)}
            className="text-3xl text-[#121212]"
          >
            &times;
          </button>
        </div>

        <nav className="flex flex-col gap-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className="
                text-left
                text-sm
                uppercase
                tracking-[0.2em]
                text-[#121212]
                hover:text-[#C5A880]
              "
            >
              {item.name}
            </button>
          ))}

          <div
            className="
              flex
              flex-col
              gap-4
              mt-2
              border-t
              border-[#C5A880]/20
              pt-6
            "
          >
            <span
              className="
                text-sm
                uppercase
                tracking-[0.2em]
                text-[#121212]
              "
            >
              More ▾
            </span>

            <Link
              href="/faqs"
              onClick={() => setIsOpen(false)}
              className="pl-4 text-xs uppercase tracking-widest text-[#6C6C6C]"
            >
              FAQ&apos;s
            </Link>

            <Link
              href="/blogs"
              onClick={() => setIsOpen(false)}
              className="pl-4 text-xs uppercase tracking-widest text-[#6C6C6C]"
            >
              Blogs
            </Link>

            <Link
              href="/policys/cancellationRefund"
              onClick={() => setIsOpen(false)}
              className="pl-4 text-xs uppercase tracking-widest text-[#6C6C6C]"
            >
              Refund Policy
            </Link>
          </div>
        </nav>
      </div>

      {/* SCROLL TOP */}

      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="
            fixed
            bottom-6
            right-6
            z-50
            bg-black
            text-white
            p-3
            rounded-full
          "
        >
          ↑
        </button>
      )}
    </>
  );
};

export default Header;
