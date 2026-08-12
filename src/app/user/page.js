"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Header from "@/app/component/mainpage/Header";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";

import {
  fetchCurrentUser,
  logoutCurrentUser,
} from "@/app/store/action/adminAction";

import { asyncfetchUserwiseOrders } from "@/app/store/action/orderAction";


// ============================================================
// STATUS
// ============================================================

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

const getStatus = (status) =>
  STATUS_STYLES[status] || STATUS_STYLES.Pending;


// ============================================================
// HELPERS
// ============================================================

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


// ============================================================
// TABS
// ============================================================

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


// ============================================================
// PAGE
// ============================================================

export default function UserProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();

  // ----------------------------------------------------------
  // REDUX
  // ----------------------------------------------------------

  const loginState = useSelector((state) => state.login);
  const orderState = useSelector((state) => state.order);
  /*
    IMPORTANT:

    Your previous code was using:

      loginState?.admin

    So we continue using that.

    If your Redux reducer actually stores the user in
    loginState.user, change this to:

      const admin = loginState?.user || null;
  */

  const admin =
    loginState?.admin ||
    loginState?.user ||
    null;

  const orders =
    orderState?.order?.orders ||
    orderState?.orders ||
    [];


  // ----------------------------------------------------------
  // LOCAL STATE
  // ----------------------------------------------------------

  const [activeTab, setActiveTab] = useState("profile");

  const [editMode, setEditMode] = useState(false);

  const [loading, setLoading] = useState(true);

  const [logoutLoading, setLogoutLoading] = useState(false);

  const [ordersLoading, setOrdersLoading] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    mobileNumber: "",
  });


  // ==========================================================
  // FETCH CURRENT USER
  // ==========================================================

  useEffect(() => {
    const loadUser = async () => {
      try {
        if (typeof window === "undefined") return;

        const token =
          localStorage.getItem("userToken") ||
          localStorage.getItem("token") ||
          localStorage.getItem("adminToken");
        // NO TOKEN
        if (
          !token ||
          token === "undefined" ||
          token === "null"
        ) {
          router.replace("/login");

          return;
        }
        // USER ALREADY EXISTS
        if (admin) {
          return;
        }
        // FETCH CURRENT USER

        const result = await dispatch(fetchCurrentUser());

      } catch (error) {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    loadUser();

  }, [dispatch, router, admin]);


  // ==========================================================
  // SEED FORM
  // ==========================================================

  useEffect(() => {
    if (!admin) return;

    setProfileForm({
      name: admin.name || "",
      email: admin.email || "",
      mobileNumber:
        admin.mobileNumber ||
        admin.phone ||
        "",
    });

  }, [admin]);


  // ==========================================================
  // FETCH ORDERS
  // ==========================================================

  useEffect(() => {
    if (!admin) return;

    if (activeTab !== "orders") return;

    const fetchOrders = async () => {
      try {
        setOrdersLoading(true);

        const result = await dispatch(
          asyncfetchUserwiseOrders()
        );
      } catch (error) {
        console.error(
          "ORDERS ERROR:",
          error
        );
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();

  }, [activeTab, admin, dispatch]);


  // ==========================================================
  // LOGOUT
  // ==========================================================

  const handleLogout = async () => {
    try {
      setLogoutLoading(true);

      await dispatch(
        logoutCurrentUser()
      );

      localStorage.removeItem("userToken");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("token");

      router.replace("/");

    } catch (error) {
      console.error(
        "LOGOUT ERROR:",
        error
      );
    } finally {
      setLogoutLoading(false);
    }
  };


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">

          <div className="w-10 h-10 border border-[#C5A880] border-t-transparent rounded-full animate-spin mx-auto mb-5" />

          <p className="text-[10px] tracking-[0.3em] uppercase text-[#A68A5E]">
            Loading Profile
          </p>

        </div>
      </div>
    );
  }


  // ==========================================================
  // NO USER
  // ==========================================================

  if (!admin) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-6">

        <div className="text-center">

          <p className="text-4xl mb-5">
            👤
          </p>

          <h1 className="font-serif text-2xl text-[#121212] mb-3">
            User Not Found
          </h1>

          <p className="text-sm text-gray-500 mb-6">
            Please login again to continue.
          </p>

          <button
            onClick={() =>
              router.replace("/login")
            }
            className="
              px-8
              py-3
              bg-[#121212]
              text-[#C5A880]
              text-[10px]
              tracking-[0.2em]
              uppercase
              hover:bg-[#C5A880]
              hover:text-[#121212]
              transition
            "
          >
            Login
          </button>

        </div>

      </div>
    );
  }


  // ==========================================================
  // USER DATA
  // ==========================================================

  const userName =
    admin?.name ||
    admin?.fullName ||
    "User";

  const userEmail =
    admin?.email ||
    "";

  const userMobile =
    admin?.mobileNumber ||
    admin?.phone ||
    "";

  const initials = userName
    .split(" ")
    .map((name) => name?.[0])
    .filter(Boolean)
    .join("")
    .toUpperCase()
    .slice(0, 2);


  // ==========================================================
  // SAVE PROFILE
  // ==========================================================

  const handleProfileSave = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {

      /*
        Put your updateCurrentUser API here.

        Example:

        await dispatch(
          updateCurrentUser({
            id: admin._id,
            ...profileForm,
          })
        );
      */

      console.log(
        "PROFILE UPDATE:",
        profileForm
      );

      await new Promise(
        (resolve) =>
          setTimeout(resolve, 500)
      );

      setEditMode(false);

    } catch (error) {

      console.error(
        "PROFILE UPDATE ERROR:",
        error
      );

    } finally {
      setLoading(false);
    }
  };


  // ==========================================================
  // RENDER
  // ==========================================================

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">

      <MarqueeBar />

      <Header />


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="flex-1 pt-32 md:pt-36 pb-20">

        <div className="max-w-7xl mx-auto px-5 md:px-8">


          {/* =================================================
              TITLE
          ================================================= */}

          <div className="text-center mb-12 md:mb-14">

            <p className="text-[10px] tracking-[0.4em] text-[#C5A880] uppercase mb-3">
              My Account
            </p>

            <h1 className="font-serif text-3xl md:text-5xl font-light tracking-[0.1em] uppercase text-[#121212] mb-5">

              Welcome,{" "}
              {userName.split(" ")[0]}

            </h1>

            <div className="w-12 h-px bg-[#C5A880] mx-auto" />

          </div>


          {/* =================================================
              GRID
          ================================================= */}

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">


            {/* ===============================================
                SIDEBAR
            =============================================== */}

            <aside className="space-y-4">


              {/* PROFILE CARD */}

              <div className="bg-white border border-[#C5A880]/15 p-8 text-center shadow-sm">

                {/* AVATAR */}

                <div className="
                  w-22
                  h-22
                  w-[88px]
                  h-[88px]
                  rounded-full
                  bg-gradient-to-br
                  from-[#C5A880]
                  to-[#A68A5E]
                  flex
                  items-center
                  justify-center
                  mx-auto
                  mb-5
                  shadow-[0_0_0_6px_rgba(197,168,128,0.12)]
                ">

                  <span className="font-serif text-3xl text-[#FAF7F2]">
                    {initials || "U"}
                  </span>

                </div>


                <h2 className="font-serif text-xl text-[#121212] mb-2">
                  {userName}
                </h2>


                {userMobile && (
                  <p className="text-[11px] tracking-[0.1em] text-gray-400 mb-5">
                    +91 {userMobile}
                  </p>
                )}


                {/* MEMBER */}

                <div className="inline-flex items-center gap-2 border border-[#C5A880]/30 px-4 py-1.5 mb-7">

                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />

                  <span className="text-[9px] tracking-[0.25em] uppercase text-[#A68A5E]">
                    Siyaas Member
                  </span>

                </div>


                {/* LOGOUT */}

                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="
                    w-full
                    py-3
                    border
                    border-[#C5A880]/30
                    bg-transparent
                    text-[#A68A5E]
                    text-[10px]
                    tracking-[0.2em]
                    uppercase
                    hover:bg-[#C5A880]
                    hover:text-[#121212]
                    transition
                    disabled:opacity-50
                  "
                >

                  {logoutLoading
                    ? "Signing Out..."
                    : "Sign Out"}

                </button>

              </div>


              {/* NAV */}

              <nav className="bg-white border border-[#C5A880]/15 overflow-hidden">

                {TABS.map((tab, index) => (

                  <button
                    key={tab.id}
                    onClick={() =>
                      setActiveTab(tab.id)
                    }
                    className={`
                      w-full
                      flex
                      items-center
                      justify-between
                      px-6
                      py-5
                      text-left
                      border-b
                      border-[#C5A880]/10
                      transition
                      ${
                        activeTab === tab.id
                          ? "border-l-2 border-l-[#C5A880] bg-[#C5A880]/5 text-[#C5A880]"
                          : "border-l-2 border-l-transparent text-gray-500 hover:bg-[#C5A880]/5"
                      }
                    `}
                  >

                    <span className="text-[11px] tracking-[0.2em] uppercase">
                      {tab.label}
                    </span>

                    <span className="text-lg">
                      ›
                    </span>

                  </button>

                ))}

              </nav>


              {/* QUICK LINKS */}

              <div className="bg-white border border-[#C5A880]/10 p-6">

                <p className="text-[9px] tracking-[0.3em] text-[#C5A880] uppercase mb-4">
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
                      py-2
                      text-[10px]
                      tracking-[0.15em]
                      uppercase
                      text-gray-500
                      border-b
                      border-[#C5A880]/10
                      hover:text-[#C5A880]
                      transition
                    "
                  >
                    {label}
                  </Link>

                ))}

              </div>

            </aside>


            {/* ===============================================
                RIGHT CONTENT
            =============================================== */}

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
                          onClick={() =>
                            setEditMode(true)
                          }
                          className="
                            px-5
                            py-2.5
                            border
                            border-[#C5A880]/30
                            text-[10px]
                            tracking-[0.2em]
                            uppercase
                            text-gray-600
                            hover:bg-[#C5A880]
                            hover:text-[#121212]
                            transition
                          "
                        >
                          Edit Profile
                        </button>
                      )
                    }
                  />


                  {/* PROFILE CARD */}

                  <div className="bg-white border border-[#C5A880]/15 shadow-sm mb-8">


                    {editMode ? (

                      <form
                        onSubmit={
                          handleProfileSave
                        }
                        className="p-6 md:p-8"
                      >

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                          <FormField
                            label="Full Name"
                            value={
                              profileForm.name
                            }
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
                            value={
                              profileForm.email
                            }
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
                            value={
                              profileForm.mobileNumber
                            }
                            onChange={(value) =>
                              setProfileForm({
                                ...profileForm,
                                mobileNumber: value,
                              })
                            }
                            prefix="+91"
                          />

                        </div>


                        <div className="flex gap-3 mt-8">

                          <button
                            type="submit"
                            disabled={loading}
                            className="
                              px-7
                              py-3
                              bg-[#121212]
                              text-[#C5A880]
                              text-[10px]
                              tracking-[0.2em]
                              uppercase
                              hover:bg-[#C5A880]
                              hover:text-[#121212]
                              transition
                              disabled:opacity-50
                            "
                          >
                            {loading
                              ? "Saving..."
                              : "Save Changes"}
                          </button>


                          <button
                            type="button"
                            onClick={() =>
                              setEditMode(false)
                            }
                            className="
                              px-7
                              py-3
                              border
                              border-[#C5A880]/30
                              text-[10px]
                              tracking-[0.2em]
                              uppercase
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

                          <ProfileField
                            label="Full Name"
                            value={userName}
                          />

                          <ProfileField
                            label="Email Address"
                            value={userEmail}
                          />

                          <ProfileField
                            label="Mobile Number"
                            value={
                              userMobile
                                ? `+91 ${userMobile}`
                                : null
                            }
                          />

                          <ProfileField
                            label="Member Since"
                            value={formatDate(
                              admin?.createdAt
                            )}
                          />

                        </div>


                        <div className="mx-6 md:mx-8 border-t border-[#C5A880]/10" />


                        {/* STATS */}

                        <div className="grid grid-cols-3">

                          <StatCell
                            label="Total Orders"
                            value={
                              orders.length
                            }
                          />

                          <StatCell
                            label="Delivered"
                            value={
                              orders.filter(
                                (o) =>
                                  o.status ===
                                  "Delivered"
                              ).length
                            }
                            border
                          />

                          <StatCell
                            label="Pending"
                            value={
                              orders.filter(
                                (o) =>
                                  o.status ===
                                  "Pending"
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
                        onClick={() =>
                          setActiveTab("orders")
                        }
                        className="text-[11px] tracking-[0.15em] uppercase text-[#C5A880]"
                      >
                        View All →
                      </button>
                    }
                  />


                  <RecentOrdersPreview
                    orders={orders.slice(0, 3)}
                  />

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
                      orders.length !== 1
                        ? "s"
                        : ""
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
                      onAction={() =>
                        router.push(
                          "/products"
                        )
                      }
                    />

                  ) : (

                    <div className="space-y-4">

                      {orders.map(
                        (order) => (
                          <OrderCard
                            key={order._id}
                            order={order}
                          />
                        )
                      )}

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
                  />

                  {admin?.address ? (

                    <AddressCard
                      address={
                        admin.address
                      }
                    />

                  ) : (

                    <EmptyState
                      icon="📍"
                      title="No Address Saved"
                      message="Add a delivery address to make checkout faster."
                      actionLabel="Add Address"
                      onAction={() => {}}
                    />

                  )}

                </div>

              )}

            </section>

          </div>

        </div>

      </main>
    </div>
  );
}


// ============================================================
// SECTION HEADER
// ============================================================

function SectionHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-5 pb-4 border-b border-[#C5A880]/10">

      <div>

        <h2 className="font-serif text-xl md:text-2xl font-normal tracking-[0.06em] uppercase text-[#121212]">
          {title}
        </h2>

        {subtitle && (
          <p className="text-[11px] tracking-[0.1em] text-gray-400 mt-1">
            {subtitle}
          </p>
        )}

      </div>

      {action}

    </div>
  );
}


// ============================================================
// PROFILE FIELD
// ============================================================

function ProfileField({
  label,
  value,
}) {
  return (
    <div className="px-6 md:px-8 py-5 border-b border-[#C5A880]/10">

      <p className="text-[9px] tracking-[0.3em] uppercase text-[#C5A880] mb-2">
        {label}
      </p>

      <p className="text-sm text-[#121212] tracking-wide">
        {value || "Not provided"}
      </p>

    </div>
  );
}


// ============================================================
// STAT
// ============================================================

function StatCell({
  label,
  value,
  border,
}) {
  return (
    <div
      className={`
        py-5
        text-center
        ${border ? "border-l border-[#C5A880]/10" : ""}
      `}
    >

      <p className="font-serif text-3xl font-light text-[#C5A880]">
        {value}
      </p>

      <p className="text-[9px] tracking-[0.25em] uppercase text-gray-400 mt-1">
        {label}
      </p>

    </div>
  );
}


// ============================================================
// FORM FIELD
// ============================================================

function FormField({
  label,
  value,
  onChange,
  type = "text",
  prefix,
}) {
  return (
    <div>

      <label className="block text-[9px] tracking-[0.3em] uppercase text-[#A68A5E] mb-2">
        {label}
      </label>

      <div className="flex border border-[#C5A880]/30 bg-[#FDFBF8] focus-within:border-[#C5A880]">

        {prefix && (
          <span className="flex items-center px-4 text-xs text-gray-400 border-r border-[#C5A880]/20">
            {prefix}
          </span>
        )}

        <input
          type={type}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          className="
            w-full
            h-12
            px-4
            bg-transparent
            outline-none
            text-sm
            text-[#121212]
          "
        />

      </div>

    </div>
  );
}


// ============================================================
// ORDER CARD
// ============================================================

function OrderCard({
  order,
}) {
  const st = getStatus(order.status);

  const items =
    order.items ||
    order.products ||
    [];

  return (
    <div className="bg-white border border-[#C5A880]/15 p-5 md:p-7 hover:border-[#C5A880]/30 transition shadow-sm">

      {/* TOP */}

      <div className="flex justify-between items-start gap-4 mb-5">

        <div>

          <p className="text-[9px] tracking-[0.3em] uppercase text-gray-400 mb-1">
            Order ID
          </p>

          <p className="text-sm tracking-wide">
            #
            {order._id
              ?.slice(-8)
              .toUpperCase() ||
              "N/A"}
          </p>

        </div>


        {/* STATUS */}

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
              w-1.5
              h-1.5
              rounded-full
              ${st.dot}
            `}
          />

          <span
            className={`
              text-[9px]
              tracking-[0.2em]
              uppercase
              ${st.text}
            `}
          >
            {order.status}
          </span>

        </div>

      </div>


      {/* META */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">

        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-1">
            Placed On
          </p>

          <p className="text-sm">
            {formatDate(
              order.createdAt
            )}
          </p>
        </div>


        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-1">
            Items
          </p>

          <p className="text-sm">
            {items.length} item
            {items.length !== 1
              ? "s"
              : ""}
          </p>
        </div>


        <div>
          <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mb-1">
            Total Amount
          </p>

          <p className="text-sm text-[#C5A880] font-medium">
            ₹
            {formatPrice(
              order.totalAmount ||
                order.total
            )}
          </p>
        </div>

      </div>


      {/* ITEMS */}

      {items.length > 0 && (

        <div className="border-t border-[#C5A880]/10 pt-4 flex flex-wrap gap-2">

          {items
            .slice(0, 4)
            .map((item, index) => (

              <div
                key={index}
                className="px-3 py-2 bg-[#C5A880]/5 border border-[#C5A880]/10 text-xs text-gray-600"
              >

                {item.productId?.name ||
                  item.name ||
                  "Product"}

                <span className="text-[#C5A880] ml-2">
                  ×{" "}
                  {item.quantity || 1}
                </span>

              </div>

            ))}

        </div>

      )}

    </div>
  );
}


// ============================================================
// RECENT ORDERS
// ============================================================

function RecentOrdersPreview({
  orders,
}) {
  if (!orders?.length) {
    return (
      <div className="bg-white border border-[#C5A880]/15 text-center py-12">

        <p className="text-3xl mb-3">
          🕯️
        </p>

        <p className="font-serif text-lg text-gray-500">
          No recent orders
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-3">

      {orders.map((order) => {

        const st = getStatus(
          order.status
        );

        return (
          <div
            key={order._id}
            className="
              bg-white
              border
              border-[#C5A880]/15
              px-5
              py-4
              flex
              justify-between
              items-center
            "
          >

            <div>

              <p className="text-xs mb-1">
                #
                {order._id
                  ?.slice(-8)
                  .toUpperCase()}
              </p>

              <p className="text-[10px] text-gray-400">
                {formatDate(
                  order.createdAt
                )}
              </p>

            </div>


            <div className="text-right">

              <p className="text-sm text-[#C5A880] mb-1">
                ₹
                {formatPrice(
                  order.totalAmount ||
                    order.total
                )}
              </p>

              <span
                className={`
                  text-[9px]
                  tracking-[0.2em]
                  uppercase
                  px-2
                  py-1
                  ${st.bg}
                  ${st.text}
                `}
              >
                {st.label}
              </span>

            </div>

          </div>
        );

      })}

    </div>
  );
}


// ============================================================
// ADDRESS
// ============================================================

function AddressCard({
  address,
}) {
  return (
    <div className="bg-white border border-[#C5A880]/15 p-6 md:p-8">

      <div className="inline-flex border border-[#C5A880]/30 px-4 py-2 mb-6">

        <span className="text-[9px] tracking-[0.25em] uppercase text-[#A68A5E]">
          📍 Default Address
        </span>

      </div>


      <div className="grid grid-cols-1 md:grid-cols-2">

        <ProfileField
          label="Street"
          value={address.street}
        />

        <ProfileField
          label="City"
          value={address.city}
        />

        <ProfileField
          label="State"
          value={address.state}
        />

        <ProfileField
          label="Pincode"
          value={address.pincode}
        />

        <ProfileField
          label="Country"
          value={
            address.country ||
            "India"
          }
        />

      </div>

    </div>
  );
}


// ============================================================
// EMPTY
// ============================================================

function EmptyState({
  icon,
  title,
  message,
  actionLabel,
  onAction,
}) {
  return (
    <div className="bg-white border border-[#C5A880]/15 text-center py-16 px-6">

      <p className="text-5xl mb-5">
        {icon}
      </p>

      <h3 className="font-serif text-2xl font-light uppercase tracking-[0.08em] mb-3">
        {title}
      </h3>

      <p className="text-xs text-gray-400 max-w-sm mx-auto mb-8 leading-7">
        {message}
      </p>

      <button
        onClick={onAction}
        className="
          px-8
          py-3
          bg-[#121212]
          text-[#C5A880]
          text-[10px]
          tracking-[0.2em]
          uppercase
          hover:bg-[#C5A880]
          hover:text-[#121212]
          transition
        "
      >
        {actionLabel}
      </button>

    </div>
  );
}


// ============================================================
// SKELETON
// ============================================================

function OrdersSkeleton() {
  return (
    <div className="space-y-4">

      {[1, 2, 3].map((item) => (

        <div
          key={item}
          className="bg-white border border-[#C5A880]/10 p-7 animate-pulse"
        >

          <div className="flex justify-between mb-7">

            <div className="h-3 w-28 bg-gray-200 rounded" />

            <div className="h-6 w-20 bg-gray-200 rounded" />

          </div>


          <div className="grid grid-cols-3 gap-5">

            <div className="h-3 bg-gray-200 rounded" />

            <div className="h-3 bg-gray-200 rounded" />

            <div className="h-3 bg-gray-200 rounded" />

          </div>

        </div>

      ))}

    </div>
  );
}