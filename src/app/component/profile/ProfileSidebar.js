"use client";

import Link from "next/link";

export default function ProfileSidebar({
  admin,
  userName,
  userMobile,
  activeTab,
  setActiveTab,
  handleLogout,
  logoutLoading,
  tabs,
}) {
  const initials = userName
    .split(" ")
    .map((name) => name?.[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <aside className="space-y-4">

      {/* =====================================================
          PROFILE CARD
      ===================================================== */}

      <div
        className="
          border
          border-[#C5A880]/15
          bg-white
          p-8
          text-center
          shadow-sm
        "
      >

        {/* AVATAR */}

        <div
          className="
            mx-auto
            mb-5
            flex
            h-[88px]
            w-[88px]
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-[#C5A880]
            to-[#A68A5E]
            shadow-[0_0_0_6px_rgba(197,168,128,0.12)]
          "
        >
          <span className="font-serif text-3xl text-[#FAF7F2]">
            {initials || "U"}
          </span>
        </div>

        {/* NAME */}

        <h2 className="mb-2 font-serif text-xl text-[#121212]">
          {userName}
        </h2>

        {/* MOBILE */}

        {userMobile && (
          <p
            className="
              mb-5
              text-[11px]
              tracking-[0.1em]
              text-gray-400
            "
          >
            +91 {userMobile}
          </p>
        )}

        {/* MEMBER */}

        <div
          className="
            mb-7
            inline-flex
            items-center
            gap-2
            border
            border-[#C5A880]/30
            px-4
            py-1.5
          "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />

          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.25em]
              text-[#A68A5E]
            "
          >
            Siyaas Member
          </span>
        </div>

        {/* LOGOUT */}

        <button
          onClick={handleLogout}
          disabled={logoutLoading}
          className="
            w-full
            border
            border-[#C5A880]/30
            bg-transparent
            py-3
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-[#A68A5E]
            transition
            hover:bg-[#C5A880]
            hover:text-[#121212]
            disabled:opacity-50
          "
        >
          {logoutLoading
            ? "Signing Out..."
            : "Sign Out"}
        </button>
      </div>

      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav
        className="
          overflow-hidden
          border
          border-[#C5A880]/15
          bg-white
        "
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex
              w-full
              items-center
              justify-between
              border-b
              border-[#C5A880]/10
              px-6
              py-5
              text-left
              transition

              ${
                activeTab === tab.id
                  ? "border-l-2 border-l-[#C5A880] bg-[#C5A880]/5 text-[#C5A880]"
                  : "border-l-2 border-l-transparent text-gray-500 hover:bg-[#C5A880]/5"
              }
            `}
          >
            <span
              className="
                text-[11px]
                uppercase
                tracking-[0.2em]
              "
            >
              {tab.label}
            </span>

            <span className="text-lg">
              ›
            </span>
          </button>
        ))}
      </nav>

      {/* =====================================================
          QUICK LINKS
      ===================================================== */}

      <div
        className="
          border
          border-[#C5A880]/10
          bg-white
          p-6
        "
      >
        <p
          className="
            mb-4
            text-[9px]
            uppercase
            tracking-[0.3em]
            text-[#C5A880]
          "
        >
          Quick Links
        </p>

        {[
          ["Browse Products", "/products"],
          ["Shopping Cart", "/cart"],
          ["FAQ's", "/faqs"],
        ].map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="
              block
              border-b
              border-[#C5A880]/10
              py-2
              text-[10px]
              uppercase
              tracking-[0.15em]
              text-gray-500
              transition
              hover:text-[#C5A880]
            "
          >
            {label}
          </Link>
        ))}
      </div>

    </aside>
  );
}