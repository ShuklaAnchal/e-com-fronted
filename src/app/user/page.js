"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import Header from "@/app/component/mainpage/Header";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";
import AddressForm from "@/app/component/forms/addAddressForm";

import {
  fetchCurrentUser,
  logoutCurrentUser,
} from "@/app/store/action/adminAction";

import { asyncfetchUserwiseOrders } from "@/app/store/action/orderAction";
import { asyncfetchUserWishlist } from "@/app/store/action/wishlistAction";
import {asyncfetchAddress} from "@/app/store/action/addressAction"

import ProfileSidebar from "../component/profile/ProfileSidebar";
import ProfileTab from "../component/profile/ProfileTab";
import OrdersTab from "../component/profile/OrdersTab";
import WishlistTab from "../component/profile/WishlistTab";
import AddressTab from "../component/profile/AddressTab";

const TABS = [
  { id: "profile", label: "Profile" },
  { id: "orders", label: "My Orders" },
  { id: "wishlist", label: "Wishlist" },
  { id: "address", label: "Address" },
];

export default function UserProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.login);
  const orderState = useSelector((state) => state.order);

  const admin =
    loginState?.admin ||
    loginState?.user ||
    null;

  const orders =
    orderState?.order?.orders ||
    orderState?.orders ||
    [];

  const [activeTab, setActiveTab] = useState("profile");

  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [wishlistPagination, setWishlistPagination] = useState(null);

  const [ordersLoading, setOrdersLoading] = useState(false);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addresses, setAddresses] = useState([]);

  /* ==========================================================
     FETCH USER
  ========================================================== */

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token =
          localStorage.getItem("userToken") ||
          localStorage.getItem("token") ||
          localStorage.getItem("adminToken");

        if (
          !token ||
          token === "undefined" ||
          token === "null"
        ) {
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
     FETCH ORDERS
  ========================================================== */

  useEffect(() => {
    if (!admin || activeTab !== "orders") return;

    const loadOrders = async () => {
      try {
        setOrdersLoading(true);

        await dispatch(
          asyncfetchUserwiseOrders()
        );
      } catch (error) {
        console.error("ORDERS ERROR:", error);
      } finally {
        setOrdersLoading(false);
      }
    };

    loadOrders();
  }, [activeTab, admin, dispatch]);

  /* ==========================================================
     FETCH WISHLIST
  ========================================================== */

  useEffect(() => {
    if (!admin || activeTab !== "wishlist") return;

    const loadWishlist = async () => {
      try {
        setWishlistLoading(true);

        const data = await dispatch(
          asyncfetchUserWishlist({
            page: 1,
            limit: 8,
          })
        );

        console.log("Wishlist API:", data);

        setWishlist(data?.wishlist || []);
        setWishlistPagination(
          data?.pagination || null
        );
      } catch (error) {
        console.error(
          "WISHLIST ERROR:",
          error?.response?.data ||
            error?.message ||
            error
        );

        setWishlist([]);
        setWishlistPagination(null);
      } finally {
        setWishlistLoading(false);
      }
    };

    loadWishlist();
  }, [activeTab, admin, dispatch]);


  /* ==========================================================
   FETCH USER ADDRESSES
========================================================== */

useEffect(() => {
  if (!admin) return;

  const loadAddresses = async () => {
    try {
      const data = await dispatch(asyncfetchAddress());

      console.log("ADDRESS API:", data);

      setAddresses(data?.shippingAddress || []);
    } catch (error) {
      console.error(
        "ADDRESS FETCH ERROR:",
        error?.response?.data ||
          error?.message ||
          error
      );

      setAddresses([]);
    }
  };

  loadAddresses();
}, [admin, dispatch]);


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
     ADDRESS
  ========================================================== */

const handleAddressSuccess = async () => {
  try {
    const data = await dispatch(asyncfetchAddress());

    console.log("UPDATED ADDRESS API:", data);

    setAddresses(data?.shippingAddress || []);
  } catch (error) {
    console.error(
      "REFRESH ADDRESS ERROR:",
      error?.response?.data ||
        error?.message ||
        error
    );
  } finally {
    setShowAddressForm(false);
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
              mx-auto mb-5
              h-10 w-10
              animate-spin
              rounded-full
              border
              border-[#C5A880]
              border-t-transparent
            "
          />

          <p
            className="
              text-[10px]
              uppercase
              tracking-[0.3em]
              text-[#A68A5E]
            "
          >
            Loading Profile
          </p>
        </div>
      </div>
    );
  }

  /* ==========================================================
     USER NOT FOUND
  ========================================================== */

  if (!admin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <p className="mb-5 text-4xl">👤</p>

          <h1 className="mb-3 font-serif text-2xl">
            User Not Found
          </h1>

          <p className="mb-6 text-sm text-gray-500">
            Please login again to continue.
          </p>

          <button
            onClick={() => router.replace("/login")}
            className="
              bg-[#121212]
              px-8 py-3
              text-[10px]
              uppercase
              tracking-[0.2em]
              text-[#C5A880]
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

  const userName =
    admin?.name ||
    admin?.fullName ||
    "User";

  const userEmail =
    admin?.email || "";

  const userMobile =
    admin?.mobileNumber ||
    admin?.phone ||
    "";

  /* ==========================================================
     RENDER
  ========================================================== */

  return (
    <div className="flex min-h-screen flex-col bg-[#FAF7F2]">

      <MarqueeBar />

      <Header />

      <main className="flex-1 pb-20 pt-32 md:pt-36">

        <div className="mx-auto max-w-7xl px-5 md:px-8">

          {/* PAGE HEADER */}

          <div className="mb-12 text-center md:mb-14">

            <p
              className="
                mb-3
                text-[10px]
                uppercase
                tracking-[0.4em]
                text-[#C5A880]
              "
            >
              My Account
            </p>

            <h1
              className="
                mb-5
                font-serif
                text-3xl
                font-light
                uppercase
                tracking-[0.1em]
                text-[#121212]
                md:text-5xl
              "
            >
              Welcome, {userName.split(" ")[0]}
            </h1>

            <div className="mx-auto h-px w-12 bg-[#C5A880]" />
          </div>

          {/* MAIN GRID */}

          <div
            className="
              grid
              grid-cols-1
              items-start
              gap-8
              lg:grid-cols-[280px_1fr]
            "
          >

            {/* SIDEBAR */}

            <ProfileSidebar
              admin={admin}
              userName={userName}
              userMobile={userMobile}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              handleLogout={handleLogout}
              logoutLoading={logoutLoading}
              tabs={TABS}
            />

            {/* CONTENT */}

            <section>

              {activeTab === "profile" && (
                <ProfileTab
                  admin={admin}
                  userName={userName}
                  userEmail={userEmail}
                  userMobile={userMobile}
                  orders={orders}
                  setActiveTab={setActiveTab}
                />
              )}

              {activeTab === "orders" && (
                <OrdersTab
                  orders={orders}
                  loading={ordersLoading}
                  router={router}
                />
              )}

              {activeTab === "wishlist" && (
                <WishlistTab
                  wishlist={wishlist}
                  loading={wishlistLoading}
                  pagination={wishlistPagination}
                  router={router}
                />
              )}

              {activeTab === "address" && (
                <AddressTab
                  addresses={addresses}
                  setShowAddressForm={
                    setShowAddressForm
                  }
                />
              )}

            </section>
          </div>
        </div>
      </main>

      {/* ADDRESS MODAL */}

      {showAddressForm && (
        <AddressForm
          onClose={() =>
            setShowAddressForm(false)
          }
          onSuccess={handleAddressSuccess}
        />
      )}
    </div>
  );
}