"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Header from "@/app/component/mainpage/Header";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";
import AddressForm from "@/app/component/forms/addAddressForm";

import {
  fetchCurrentUser,
  logoutCurrentUser,
} from "@/app/store/action/adminAction";

import { asyncfetchUserwiseOrders } from "@/app/store/action/orderAction";

/* ============================================================
   STATUS
============================================================ */

const STATUS_STYLES = {
  Pending: {
    dot: "bg-[#C5A880]",
    bg: "bg-[#C5A880]/10",
    text: "text-[#A68A5E]",
  },

  Processing: {
    dot: "bg-[#6C9BCF]",
    bg: "bg-[#6C9BCF]/10",
    text: "text-[#5080A8]",
  },

  Shipped: {
    dot: "bg-[#7ABFAB]",
    bg: "bg-[#7ABFAB]/10",
    text: "text-[#4E9E89]",
  },

  Delivered: {
    dot: "bg-[#5EAD6F]",
    bg: "bg-[#5EAD6F]/10",
    text: "text-[#3A8A4E]",
  },

  Cancelled: {
    dot: "bg-[#CC6060]",
    bg: "bg-[#CC6060]/10",
    text: "text-[#B04040]",
  },
};

const getStatus = (status) => STATUS_STYLES[status] || STATUS_STYLES.Pending;

/* ============================================================
   HELPERS
============================================================ */

const formatDate = (date) => {
  if (!date) return "—";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN").format(price || 0);

/* ============================================================
   TABS
============================================================ */

const TABS = [
  {
    id: "profile",
    label: "Profile",
  },
  {
    id: "orders",
    label: "My Orders",
  },
  {
    id: "address",
    label: "Address",
  },
];

/* ============================================================
   PAGE
============================================================ */

export default function UserProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();

  /* ==========================================================
     REDUX
  ========================================================== */

  const loginState = useSelector((state) => state.login);
  const orderState = useSelector((state) => state.order);

  const admin = loginState?.admin || loginState?.user || null;

  const orders = orderState?.order?.orders || orderState?.orders || [];

  /* ==========================================================
     LOCAL STATE
  ========================================================== */

  const [activeTab, setActiveTab] = useState("profile");

  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(true);

  const [logoutLoading, setLogoutLoading] = useState(false);

  const [ordersLoading, setOrdersLoading] = useState(false);

  // Address form visibility
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Saved addresses
  const [addresses, setAddresses] = useState([]);

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    mobileNumber: "",
  });

  /* ==========================================================
     FETCH CURRENT USER
  ========================================================== */

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (typeof window === "undefined") return;

        const token =
          localStorage.getItem("userToken") ||
          localStorage.getItem("token") ||
          localStorage.getItem("adminToken");

        if (!token || token === "undefined" || token === "null") {
          router.replace("/login");
          return;
        }

        if (admin) {
          setLoading(false);
          return;
        }

        await dispatch(fetchCurrentUser());
      } catch (error) {
        console.error("USER FETCH ERROR:", error);
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [dispatch, router, admin]);

  /* ==========================================================
     SEED PROFILE FORM
  ========================================================== */

  useEffect(() => {
    if (!admin) return;

    setProfileForm({
      name: admin.name || "",
      email: admin.email || "",
      mobileNumber: admin.mobileNumber || admin.phone || "",
    });
  }, [admin]);

  /* ==========================================================
     FETCH ORDERS
  ========================================================== */

  useEffect(() => {
    if (!admin) return;

    if (activeTab !== "orders") return;

    const fetchOrders = async () => {
      try {
        setOrdersLoading(true);

        await dispatch(asyncfetchUserwiseOrders());
      } catch (error) {
        console.error("ORDERS ERROR:", error);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [activeTab, admin, dispatch]);

  /* ==========================================================
     LOGOUT
  ========================================================== */

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      await dispatch(logoutCurrentUser());

      localStorage.removeItem("userToken");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("token");

      router.replace("/");
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    } finally {
      setLogoutLoading(false);
    }
  };

  /* ==========================================================
     ADDRESS CREATED
  ========================================================== */

  const handleAddressSuccess = (address) => {
    console.log("ADDRESS CREATED:", address);

    setAddresses((prev) => [...prev, address]);

    setShowAddressForm(false);
  };

  /* ==========================================================
     PROFILE SAVE
  ========================================================== */

  const handleProfileSave = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      /*
        Connect your update profile API here.
      */

      console.log("PROFILE UPDATE:", profileForm);

      await new Promise((resolve) => setTimeout(resolve, 500));

      setEditMode(false);
    } catch (error) {
      console.error("PROFILE UPDATE ERROR:", error);
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================================
     LOADING
  ========================================================== */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <div
            className="
              mx-auto
              mb-5
              h-10
              w-10
              animate-spin
              rounded-full
              border
              border-[#C5A880]
              border-t-transparent
            "
          />

          <p className="text-[10px] uppercase tracking-[0.3em] text-[#A68A5E]">
            Loading Profile
          </p>
        </div>
      </div>
    );
  }

  /* ==========================================================
     NO USER
  ========================================================== */

  if (!admin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2] px-6">
        <div className="text-center">
          <p className="mb-5 text-4xl">👤</p>

          <h1 className="mb-3 font-serif text-2xl text-[#121212]">
            User Not Found
          </h1>

          <p className="mb-6 text-sm text-gray-500">
            Please login again to continue.
          </p>

          <button
            onClick={() => router.replace("/login")}
            className="
              bg-[#121212]
              px-8
              py-3
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-[#C5A880]
              transition
              hover:bg-[#C5A880]
              hover:text-[#121212]
            "
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  /* ==========================================================
     USER DATA
  ========================================================== */

  const userName = admin?.name || admin?.fullName || "User";

  const userEmail = admin?.email || "";

  const userMobile = admin?.mobileNumber || admin?.phone || "";

  const initials = userName
    .split(" ")
    .map((name) => name?.[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2]">
      <MarqueeBar />

      <Header />

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="flex-1 pb-20 pt-32 md:pt-36">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {/* =================================================
              TITLE
          ================================================= */}

          <div className="mb-12 text-center md:mb-14">
            <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-[#C5A880]">
              My Account
            </p>

            <h1 className="mb-5 font-serif text-3xl font-light uppercase tracking-[0.1em] text-[#121212] md:text-5xl">
              Welcome, {userName.split(" ")[0]}
            </h1>

            <div className="mx-auto h-px w-12 bg-[#C5A880]" />
          </div>

          {/* =================================================
              GRID
          ================================================= */}

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[280px_1fr]">
            {/* =================================================
                SIDEBAR
            ================================================= */}

            <aside className="space-y-4">
              {/* PROFILE CARD */}

              <div className="border border-[#C5A880]/15 bg-white p-8 text-center shadow-sm">
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

                <h2 className="mb-2 font-serif text-xl text-[#121212]">
                  {userName}
                </h2>

                {userMobile && (
                  <p className="mb-5 text-[11px] tracking-[0.1em] text-gray-400">
                    +91 {userMobile}
                  </p>
                )}

                {/* MEMBER */}

                <div className="mb-7 inline-flex items-center gap-2 border border-[#C5A880]/30 px-4 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />

                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#A68A5E]">
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
                  {logoutLoading ? "Signing Out..." : "Sign Out"}
                </button>
              </div>

              {/* NAVIGATION */}

              <nav className="overflow-hidden border border-[#C5A880]/15 bg-white">
                {TABS.map((tab) => (
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
                    <span className="text-[11px] uppercase tracking-[0.2em]">
                      {tab.label}
                    </span>

                    <span className="text-lg">›</span>
                  </button>
                ))}
              </nav>

              {/* QUICK LINKS */}

              <div className="border border-[#C5A880]/10 bg-white p-6">
                <p className="mb-4 text-[9px] uppercase tracking-[0.3em] text-[#C5A880]">
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

            {/* =================================================
                RIGHT CONTENT
            ================================================= */}

            <section>
              {/* =================================================
                  PROFILE
              ================================================= */}

              {activeTab === "profile" && (
                <div>
                  <SectionHeader
                    title="Personal Information"
                    subtitle="Manage your profile details"
                    action={
                      !editMode && (
                        <button
                          onClick={() => setEditMode(true)}
                          className="
                            border
                            border-[#C5A880]/30
                            px-5
                            py-2.5
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            text-gray-600
                            transition
                            hover:bg-[#C5A880]
                            hover:text-[#121212]
                          "
                        >
                          Edit Profile
                        </button>
                      )
                    }
                  />

                  {/* PROFILE CARD */}

                  <div className="mb-8 border border-[#C5A880]/15 bg-white shadow-sm">
                    {editMode ? (
                      <form onSubmit={handleProfileSave} className="p-6 md:p-8">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                          <FormField
                            label="Full Name"
                            value={profileForm.name}
                            onChange={(value) =>
                              setProfileForm({
                                ...profileForm,
                                name: value,
                              })
                            }
                          />

                          <FormField
                            label="Email Address"
                            type="email"
                            value={profileForm.email}
                            onChange={(value) =>
                              setProfileForm({
                                ...profileForm,
                                email: value,
                              })
                            }
                          />
                        </div>

                        <div className="mt-6">
                          <FormField
                            label="Mobile Number"
                            value={profileForm.mobileNumber}
                            onChange={(value) =>
                              setProfileForm({
                                ...profileForm,
                                mobileNumber: value,
                              })
                            }
                            prefix="+91"
                          />
                        </div>

                        <div className="mt-8 flex gap-3">
                          <button
                            type="submit"
                            disabled={loading}
                            className="
                              bg-[#121212]
                              px-7
                              py-3
                              text-[10px]
                              uppercase
                              tracking-[0.2em]
                              text-[#C5A880]
                              transition
                              hover:bg-[#C5A880]
                              hover:text-[#121212]
                              disabled:opacity-50
                            "
                          >
                            {loading ? "Saving..." : "Save Changes"}
                          </button>

                          <button
                            type="button"
                            onClick={() => setEditMode(false)}
                            className="
                              border
                              border-[#C5A880]/30
                              px-7
                              py-3
                              text-[10px]
                              uppercase
                              tracking-[0.2em]
                              text-gray-600
                            "
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2">
                          <ProfileField label="Full Name" value={userName} />

                          <ProfileField
                            label="Email Address"
                            value={userEmail}
                          />

                          <ProfileField
                            label="Mobile Number"
                            value={userMobile ? `+91 ${userMobile}` : null}
                          />

                          <ProfileField
                            label="Member Since"
                            value={formatDate(admin?.createdAt)}
                          />
                        </div>

                        <div className="mx-6 border-t border-[#C5A880]/10 md:mx-8" />

                        {/* STATS */}

                        <div className="grid grid-cols-3">
                          <StatCell
                            label="Total Orders"
                            value={orders.length}
                          />

                          <StatCell
                            label="Delivered"
                            value={
                              orders.filter(
                                (order) => order.status === "Delivered",
                              ).length
                            }
                            border
                          />

                          <StatCell
                            label="Pending"
                            value={
                              orders.filter(
                                (order) => order.status === "Pending",
                              ).length
                            }
                            border
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* RECENT ORDERS */}

                  <SectionHeader
                    title="Recent Orders"
                    subtitle="Your latest purchases"
                    action={
                      <button
                        onClick={() => setActiveTab("orders")}
                        className="text-[11px] uppercase tracking-[0.15em] text-[#C5A880]"
                      >
                        View All →
                      </button>
                    }
                  />

                  <RecentOrdersPreview orders={orders.slice(0, 3)} />
                </div>
              )}

              {/* =================================================
                  ORDERS
              ================================================= */}

              {activeTab === "orders" && (
                <div>
                  <SectionHeader
                    title="My Orders"
                    subtitle={`${orders.length} order${
                      orders.length !== 1 ? "s" : ""
                    } placed`}
                  />

                  {ordersLoading ? (
                    <OrdersSkeleton />
                  ) : orders.length === 0 ? (
                    <EmptyState
                      icon="📦"
                      title="No Orders Yet"
                      message="You haven't placed any orders."
                      actionLabel="Shop Now"
                      onAction={() => router.push("/products")}
                    />
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <OrderCard key={order._id} order={order} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* =================================================
                  ADDRESS
              ================================================= */}

              {activeTab === "address" && (
                <div>
                  <SectionHeader
                    title="Saved Addresses"
                    subtitle="Manage your delivery addresses"
                    action={
                      <button
                        onClick={() => setShowAddressForm(true)}
                        className="
                          bg-[#121212]
                          px-5
                          py-2.5
                          text-[10px]
                          uppercase
                          tracking-[0.2em]
                          text-[#C5A880]
                          transition
                          hover:bg-[#C5A880]
                          hover:text-[#121212]
                        "
                      >
                        + Add Address
                      </button>
                    }
                  />

                  {/* SAVED ADDRESSES */}

                  {addresses.length === 0 ? (
                    <EmptyState
                      icon="📍"
                      title="No Address Saved"
                      message="Add a delivery address to make checkout faster."
                      actionLabel="Add Address"
                      onAction={() => setShowAddressForm(true)}
                    />
                  ) : (
                    <div className="space-y-5">
                      {addresses.map((address, index) => (
                        <AddressCard
                          key={address._id || index}
                          address={address}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      {/* =====================================================
          ADDRESS FORM MODAL
      ===================================================== */}

      {showAddressForm && (
        <AddressForm
          onClose={() => setShowAddressForm(false)}
          onSuccess={handleAddressSuccess}
        />
      )}
    </div>
  );
}

/* ============================================================
   SECTION HEADER
============================================================ */

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="mb-5 flex flex-col justify-between gap-4 border-b border-[#C5A880]/10 pb-4 sm:flex-row sm:items-end">
      <div>
        <h2 className="font-serif text-xl font-normal uppercase tracking-[0.06em] text-[#121212] md:text-2xl">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-[11px] tracking-[0.1em] text-gray-400">
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}

/* ============================================================
   PROFILE FIELD
============================================================ */

function ProfileField({ label, value }) {
  return (
    <div className="border-b border-[#C5A880]/10 px-6 py-5 md:px-8">
      <p className="mb-2 text-[9px] uppercase tracking-[0.3em] text-[#C5A880]">
        {label}
      </p>

      <p className="text-sm tracking-wide text-[#121212]">
        {value || "Not provided"}
      </p>
    </div>
  );
}

/* ============================================================
   STAT
============================================================ */

function StatCell({ label, value, border }) {
  return (
    <div
      className={`
        py-5
        text-center
        ${border ? "border-l border-[#C5A880]/10" : ""}
      `}
    >
      <p className="font-serif text-3xl font-light text-[#C5A880]">{value}</p>

      <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-gray-400">
        {label}
      </p>
    </div>
  );
}

/* ============================================================
   FORM FIELD
============================================================ */

function FormField({ label, value, onChange, type = "text", prefix }) {
  return (
    <div>
      <label className="mb-2 block text-[9px] uppercase tracking-[0.3em] text-[#A68A5E]">
        {label}
      </label>

      <div className="flex border border-[#C5A880]/30 bg-[#FDFBF8] focus-within:border-[#C5A880]">
        {prefix && (
          <span className="flex items-center border-r border-[#C5A880]/20 px-4 text-xs text-gray-400">
            {prefix}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            h-12
            w-full
            bg-transparent
            px-4
            text-sm
            text-[#121212]
            outline-none
          "
        />
      </div>
    </div>
  );
}

/* ============================================================
   ADDRESS CARD
============================================================ */

function AddressCard({ address }) {
  return (
    <div className="border border-[#C5A880]/15 bg-white p-6 shadow-sm md:p-8">
      {/* HEADER */}

      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <span className="border border-[#C5A880]/30 bg-[#C5A880]/5 px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-[#A68A5E]">
            {address.addressType || "Home"}
          </span>

          <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
            Delivery Address
          </span>
        </div>
      </div>

      {/* NAME */}

      <div className="mb-5">
        <h3 className="mb-1 font-serif text-xl text-[#121212]">
          {address.name}
        </h3>

        {address.mobileNumber && (
          <p className="text-xs text-gray-500">+91 {address.mobileNumber}</p>
        )}
      </div>

      {/* ADDRESS */}

      <div className="space-y-1 text-sm leading-6 text-gray-600">
        <p>{address.addressline}</p>

        <p>{address.locality}</p>

        <p>
          {address.city}, {address.state} - {address.pincode}
        </p>

        {address.landmark && (
          <p className="pt-1 text-gray-400">Landmark: {address.landmark}</p>
        )}
      </div>

      {/* ALTERNATE NUMBER */}

      {address.alternateNumber && (
        <div className="mt-5 border-t border-[#C5A880]/10 pt-5">
          <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">
            Alternate Number
          </p>

          <p className="mt-1 text-sm text-gray-600">
            +91 {address.alternateNumber}
          </p>
        </div>
      )}
    </div>
  );
}

/* ============================================================
   RECENT ORDERS
============================================================ */

function RecentOrdersPreview({ orders }) {
  if (!orders?.length) {
    return (
      <div className="border border-[#C5A880]/15 bg-white py-12 text-center">
        <p className="mb-3 text-3xl">🕯️</p>

        <p className="font-serif text-lg text-gray-500">No recent orders</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {orders.map((order) => {
        const st = getStatus(order.status);

        return (
          <div
            key={order._id}
            className="
              flex
              items-center
              justify-between
              border
              border-[#C5A880]/15
              bg-white
              px-5
              py-4
            "
          >
            <div>
              <p className="mb-1 text-xs">
                #{order._id?.slice(-8).toUpperCase()}
              </p>

              <p className="text-[10px] text-gray-400">
                {formatDate(order.createdAt)}
              </p>
            </div>

            <div className="text-right">
              <p className="mb-1 text-sm text-[#C5A880]">
                ₹{formatPrice(order.totalAmount || order.total)}
              </p>

              <span
                className={`
                  px-2
                  py-1
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  ${st.bg}
                  ${st.text}
                `}
              >
                {st.label || order.status}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   ORDER CARD
============================================================ */

function OrderCard({ order }) {
  const st = getStatus(order.status);

  const items = order.items || order.products || [];

  return (
    <div className="border border-[#C5A880]/15 bg-white p-5 shadow-sm transition hover:border-[#C5A880]/30 md:p-7">
      {/* TOP */}

      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="mb-1 text-[9px] uppercase tracking-[0.3em] text-gray-400">
            Order ID
          </p>

          <p className="text-sm tracking-wide">
            #{order._id?.slice(-8).toUpperCase() || "N/A"}
          </p>
        </div>

        <div
          className={`
            flex
            items-center
            gap-2
            px-3
            py-1.5
            ${st.bg}
          `}
        >
          <span
            className={`
              h-1.5
              w-1.5
              rounded-full
              ${st.dot}
            `}
          />

          <span
            className={`
              text-[9px]
              uppercase
              tracking-[0.2em]
              ${st.text}
            `}
          >
            {order.status}
          </span>
        </div>
      </div>

      {/* META */}

      <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
        <div>
          <p className="mb-1 text-[9px] uppercase tracking-[0.3em] text-gray-400">
            Placed On
          </p>

          <p className="text-sm">{formatDate(order.createdAt)}</p>
        </div>

        <div>
          <p className="mb-1 text-[9px] uppercase tracking-[0.3em] text-gray-400">
            Items
          </p>

          <p className="text-sm">
            {items.length} item
            {items.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div>
          <p className="mb-1 text-[9px] uppercase tracking-[0.3em] text-gray-400">
            Total Amount
          </p>

          <p className="text-sm font-medium text-[#C5A880]">
            ₹{formatPrice(order.totalAmount || order.total)}
          </p>
        </div>
      </div>

      {/* ITEMS */}

      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 border-t border-[#C5A880]/10 pt-4">
          {items.slice(0, 4).map((item, index) => (
            <div
              key={index}
              className="
                  border
                  border-[#C5A880]/10
                  bg-[#C5A880]/5
                  px-3
                  py-2
                  text-xs
                  text-gray-600
                "
            >
              {item.productId?.name || item.name || "Product"}

              <span className="ml-2 text-[#C5A880]">
                × {item.quantity || 1}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyState({ icon, title, message, actionLabel, onAction }) {
  return (
    <div className="border border-[#C5A880]/15 bg-white px-6 py-16 text-center">
      <p className="mb-5 text-5xl">{icon}</p>

      <h3 className="mb-3 font-serif text-2xl font-light uppercase tracking-[0.08em]">
        {title}
      </h3>

      <p className="mx-auto mb-8 max-w-sm text-xs leading-7 text-gray-400">
        {message}
      </p>

      {actionLabel && (
        <button
          onClick={onAction}
          className="
            bg-[#121212]
            px-8
            py-3
            text-[10px]
            uppercase
            tracking-[0.2em]
            text-[#C5A880]
            transition
            hover:bg-[#C5A880]
            hover:text-[#121212]
          "
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

/* ============================================================
   ORDERS SKELETON
============================================================ */

function OrdersSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="animate-pulse border border-[#C5A880]/10 bg-white p-7"
        >
          <div className="mb-7 flex justify-between">
            <div className="h-3 w-28 rounded bg-gray-200" />

            <div className="h-6 w-20 rounded bg-gray-200" />
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div className="h-3 rounded bg-gray-200" />

            <div className="h-3 rounded bg-gray-200" />

            <div className="h-3 rounded bg-gray-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
