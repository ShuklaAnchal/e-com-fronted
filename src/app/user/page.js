"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Header from "@/app/component/mainpage/Header";
import MarqueeBar from "@/app/component/mainpage/MarqueeBar";
import Footer from "@/app/component/resuable/Footer";
import {
  fetchCurrentUser,
  logoutCurrentUser,
} from "@/app/store/action/loginAction";
import { asyncfetchUserwiseOrders } from "@/app/store/action/orderAction";

/* ─────────────────────────── helpers ─────────────────────────── */
const STATUS_STYLES = {
  Pending: {
    dot: "#C5A880",
    bg: "rgba(197,168,128,0.1)",
    text: "#A68A5E",
    label: "Pending",
  },
  Processing: {
    dot: "#6C9BCF",
    bg: "rgba(108,155,207,0.1)",
    text: "#5080A8",
    label: "Processing",
  },
  Shipped: {
    dot: "#7ABFAB",
    bg: "rgba(122,191,171,0.1)",
    text: "#4E9E89",
    label: "Shipped",
  },
  Delivered: {
    dot: "#5EAD6F",
    bg: "rgba(94,173,111,0.1)",
    text: "#3A8A4E",
    label: "Delivered",
  },
  Cancelled: {
    dot: "#CC6060",
    bg: "rgba(204,96,96,0.1)",
    text: "#B04040",
    label: "Cancelled",
  },
};

const getStatus = (status) =>
  STATUS_STYLES[status] || STATUS_STYLES["Pending"];

const formatDate = (dateString) => {
  if (!dateString) return "—";
  return new Date(dateString).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatPrice = (price) =>
  new Intl.NumberFormat("en-IN").format(price || 0);

/* ─────────────────────────── tab data ─────────────────────────── */
const TABS = [
  { id: "profile", label: "Profile" },
  { id: "orders", label: "My Orders" },
  { id: "address", label: "Address" },
];

/* ════════════════════════════ PAGE ════════════════════════════ */
export default function UserProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.login);
  const orderState = useSelector((state) => state.order);

  const admin = loginState?.admin || null;
  const orders = orderState?.order?.orders || [];

  const [activeTab, setActiveTab] = useState("profile");
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    mobileNumber: "",
  });

  /* seed form when admin loads */
  useEffect(() => {
    if (admin) {
      setProfileForm({
        name: admin.name || "",
        email: admin.email || "",
        mobileNumber: admin.mobileNumber || "",
      });
    }
  }, [admin]);

  /* redirect if not logged in */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else if (!admin) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, admin, router]);

  /* fetch orders when tab switches */
  useEffect(() => {
    if (activeTab === "orders") {
      setOrdersLoading(true);
      dispatch(asyncfetchUserwiseOrders()).finally(() =>
        setOrdersLoading(false)
      );
    }
  }, [activeTab, dispatch]);

  /* handlers */
  const handleLogout = async () => {
    setLogoutLoading(true);
    await dispatch(logoutCurrentUser());
    localStorage.removeItem("token");
    router.push("/");
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    // dispatch(updateCurrentUser(admin._id, profileForm));
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setEditMode(false);
  };

  /* ── avatar initials ── */
  const initials = admin?.name
    ? admin.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  /* ══════════════════════════ RENDER ══════════════════════════ */
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2]">
      <MarqueeBar />
      <Header />

      {/* ── decorative ambient glow ── */}
      <div
        aria-hidden
        style={{
          position: "fixed",
          top: "20%",
          right: "-10%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(197,168,128,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          bottom: "10%",
          left: "-8%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(197,168,128,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <main style={{ flex: 1, paddingTop: 140, paddingBottom: 80, position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px" }}>

          {/* ── Page Title ── */}
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <p style={{
              fontSize: 10,
              letterSpacing: "0.4em",
              color: "#C5A880",
              textTransform: "uppercase",
              fontWeight: 300,
              marginBottom: 12,
            }}>
              My Account
            </p>
            <h1 style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 300,
              color: "#121212",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}>
              {admin?.name ? `Welcome, ${admin.name.split(" ")[0]}` : "Your Profile"}
            </h1>
            <div style={{ width: 48, height: 1, background: "linear-gradient(90deg, transparent, #C5A880, transparent)", margin: "0 auto" }} />
          </div>

          {/* ── Main Grid ── */}
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 32, alignItems: "start" }}>

            {/* ════ LEFT SIDEBAR ════ */}
            <aside>
              {/* Avatar Card */}
              <div style={{
                background: "#fff",
                border: "1px solid rgba(197,168,128,0.15)",
                padding: "40px 24px 32px",
                textAlign: "center",
                marginBottom: 16,
                boxShadow: "0 8px 40px rgba(197,168,128,0.05)",
              }}>
                {/* Avatar Circle */}
                <div style={{
                  width: 88,
                  height: 88,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #C5A880 0%, #A68A5E 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 20px",
                  boxShadow: "0 0 0 6px rgba(197,168,128,0.12), 0 8px 24px rgba(197,168,128,0.2)",
                }}>
                  <span style={{
                    fontSize: 28,
                    fontFamily: "var(--font-serif)",
                    color: "#FAF7F2",
                    fontWeight: 400,
                    letterSpacing: "0.05em",
                  }}>
                    {initials}
                  </span>
                </div>

                <h2 style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 20,
                  fontWeight: 400,
                  color: "#121212",
                  letterSpacing: "0.05em",
                  marginBottom: 6,
                }}>
                  {admin?.name || "Guest User"}
                </h2>

                <p style={{ fontSize: 11, color: "#8E8E8E", letterSpacing: "0.1em", marginBottom: 20 }}>
                  {admin?.mobileNumber ? `+91 ${admin.mobileNumber}` : ""}
                </p>

                {/* Member Badge */}
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 16px",
                  border: "1px solid rgba(197,168,128,0.35)",
                  marginBottom: 28,
                }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#C5A880", display: "inline-block" }} />
                  <span style={{ fontSize: 9, letterSpacing: "0.25em", color: "#A68A5E", textTransform: "uppercase" }}>
                    Siyaas Member
                  </span>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  style={{
                    width: "100%",
                    padding: "12px 0",
                    border: "1px solid rgba(197,168,128,0.3)",
                    background: "transparent",
                    color: "#A68A5E",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.4s ease",
                    fontFamily: "var(--font-sans)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#C5A880";
                    e.currentTarget.style.color = "#121212";
                    e.currentTarget.style.borderColor = "#C5A880";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#A68A5E";
                    e.currentTarget.style.borderColor = "rgba(197,168,128,0.3)";
                  }}
                >
                  {logoutLoading ? "Signing Out..." : "Sign Out"}
                </button>
              </div>

              {/* Nav Menu */}
              <nav style={{
                background: "#fff",
                border: "1px solid rgba(197,168,128,0.15)",
                overflow: "hidden",
                boxShadow: "0 8px 40px rgba(197,168,128,0.05)",
              }}>
                {TABS.map((tab, i) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: "18px 24px",
                      background: activeTab === tab.id ? "rgba(197,168,128,0.06)" : "transparent",
                      borderLeft: activeTab === tab.id ? "2px solid #C5A880" : "2px solid transparent",
                      borderBottom: i < TABS.length - 1 ? "1px solid rgba(197,168,128,0.08)" : "none",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                      if (activeTab !== tab.id) {
                        e.currentTarget.style.background = "rgba(197,168,128,0.04)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== tab.id) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    <span style={{
                      fontSize: 11,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: activeTab === tab.id ? "#C5A880" : "#6C6C6C",
                      fontFamily: "var(--font-sans)",
                      fontWeight: activeTab === tab.id ? 500 : 300,
                      transition: "color 0.3s ease",
                    }}>
                      {tab.label}
                    </span>
                    <span style={{ color: activeTab === tab.id ? "#C5A880" : "#CBCBCB", fontSize: 14 }}>›</span>
                  </button>
                ))}
              </nav>

              {/* Quick Links */}
              <div style={{ marginTop: 16, padding: "24px", background: "#fff", border: "1px solid rgba(197,168,128,0.1)" }}>
                <p style={{ fontSize: 9, letterSpacing: "0.3em", color: "#C5A880", textTransform: "uppercase", marginBottom: 16 }}>Quick Links</p>
                {[
                  { label: "Browse Products", href: "/products" },
                  { label: "Shopping Cart", href: "/cart" },
                  { label: "FAQ's", href: "/faqs" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: "block",
                      fontSize: 10,
                      letterSpacing: "0.15em",
                      color: "#6C6C6C",
                      textTransform: "uppercase",
                      padding: "8px 0",
                      borderBottom: "1px solid rgba(197,168,128,0.08)",
                      textDecoration: "none",
                      transition: "color 0.3s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#C5A880")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#6C6C6C")}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </aside>

            {/* ════ RIGHT CONTENT ════ */}
            <div>

              {/* ── PROFILE TAB ── */}
              {activeTab === "profile" && (
                <div style={{ animation: "fadeUp 0.5s ease forwards" }}>
                  <SectionHeader
                    title="Personal Information"
                    subtitle="Manage your profile details"
                    action={
                      !editMode && (
                        <button
                          onClick={() => setEditMode(true)}
                          style={outlineBtn}
                        >
                          Edit Profile
                        </button>
                      )
                    }
                  />

                  <div style={card}>
                    {editMode ? (
                      <form onSubmit={handleProfileSave}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                          <FormField
                            label="Full Name"
                            value={profileForm.name}
                            onChange={(v) => setProfileForm({ ...profileForm, name: v })}
                            placeholder="Your full name"
                          />
                          <FormField
                            label="Email Address"
                            type="email"
                            value={profileForm.email}
                            onChange={(v) => setProfileForm({ ...profileForm, email: v })}
                            placeholder="your@email.com"
                          />
                        </div>
                        <FormField
                          label="Mobile Number"
                          type="tel"
                          value={profileForm.mobileNumber}
                          onChange={(v) => setProfileForm({ ...profileForm, mobileNumber: v })}
                          placeholder="10-digit mobile number"
                          prefix="+91"
                        />

                        <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
                          <button type="submit" disabled={loading} style={primaryBtn}>
                            {loading ? "Saving..." : "Save Changes"}
                          </button>
                          <button
                            type="button"
                            onClick={() => { setEditMode(false); }}
                            style={outlineBtn}
                          >
                            Cancel
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
                          <ProfileField label="Full Name" value={admin?.name} />
                          <ProfileField label="Email Address" value={admin?.email} />
                          <ProfileField label="Mobile Number" value={admin?.mobileNumber ? `+91 ${admin.mobileNumber}` : null} />
                          <ProfileField label="Member Since" value={formatDate(admin?.createdAt)} />
                        </div>

                        {/* Gold Divider */}
                        <div style={{ borderTop: "1px solid rgba(197,168,128,0.12)", margin: "32px 0 28px" }} />

                        {/* Stats Row */}
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0 }}>
                          <StatCell label="Total Orders" value={orders.length || 0} />
                          <StatCell label="Delivered" value={orders.filter(o => o.status === "Delivered").length || 0} border />
                          <StatCell label="Pending" value={orders.filter(o => o.status === "Pending").length || 0} border />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ── Recent Orders Preview ── */}
                  <SectionHeader
                    title="Recent Orders"
                    subtitle="Your latest purchases"
                    action={
                      <button onClick={() => setActiveTab("orders")} style={ghostBtn}>
                        View All →
                      </button>
                    }
                  />

                  <RecentOrdersPreview orders={orders.slice(0, 3)} />
                </div>
              )}

              {/* ── ORDERS TAB ── */}
              {activeTab === "orders" && (
                <div style={{ animation: "fadeUp 0.5s ease forwards" }}>
                  <SectionHeader title="My Orders" subtitle={`${orders.length} order${orders.length !== 1 ? "s" : ""} placed`} />

                  {ordersLoading ? (
                    <OrdersSkeleton />
                  ) : orders.length === 0 ? (
                    <EmptyState
                      icon="📦"
                      title="No Orders Yet"
                      message="You haven't placed any orders. Start shopping and discover our luxury collection."
                      actionLabel="Shop Now"
                      onAction={() => router.push("/products")}
                    />
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      {orders.map((order) => (
                        <OrderCard key={order._id} order={order} router={router} />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* ── ADDRESS TAB ── */}
              {activeTab === "address" && (
                <div style={{ animation: "fadeUp 0.5s ease forwards" }}>
                  <SectionHeader title="Saved Addresses" subtitle="Manage your delivery addresses" />

                  {admin?.address ? (
                    <AddressCard address={admin.address} />
                  ) : (
                    <EmptyState
                      icon="📍"
                      title="No Address Saved"
                      message="Add a delivery address to make checkout faster and easier."
                      actionLabel="Add Address"
                      onAction={() => {}}
                    />
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* inline keyframes */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @media (max-width: 860px) {
          .profile-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

/* ════════════════════════════ SUB-COMPONENTS ════════════════════════════ */

/* Section Header */
function SectionHeader({ title, subtitle, action }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginBottom: 20,
      paddingBottom: 16,
      borderBottom: "1px solid rgba(197,168,128,0.12)",
    }}>
      <div>
        <h2 style={{
          fontFamily: "var(--font-serif)",
          fontSize: 22,
          fontWeight: 400,
          color: "#121212",
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 4,
        }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ fontSize: 11, color: "#8E8E8E", letterSpacing: "0.1em" }}>{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}

/* Profile Info Field */
function ProfileField({ label, value }) {
  return (
    <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(197,168,128,0.08)" }}>
      <p style={{ fontSize: 9, letterSpacing: "0.3em", color: "#C5A880", textTransform: "uppercase", marginBottom: 8 }}>
        {label}
      </p>
      <p style={{ fontSize: 14, color: value ? "#121212" : "#CBCBCB", fontFamily: "var(--font-sans)", fontWeight: 300, letterSpacing: "0.05em" }}>
        {value || "Not provided"}
      </p>
    </div>
  );
}

/* Stat Cell */
function StatCell({ label, value, border }) {
  return (
    <div style={{
      padding: "20px 24px",
      textAlign: "center",
      borderLeft: border ? "1px solid rgba(197,168,128,0.12)" : "none",
    }}>
      <p style={{
        fontFamily: "var(--font-serif)",
        fontSize: 32,
        fontWeight: 300,
        color: "#C5A880",
        marginBottom: 4,
        letterSpacing: "0.05em",
      }}>
        {value}
      </p>
      <p style={{ fontSize: 9, letterSpacing: "0.25em", color: "#8E8E8E", textTransform: "uppercase" }}>
        {label}
      </p>
    </div>
  );
}

/* Form Field */
function FormField({ label, value, onChange, type = "text", placeholder, prefix }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <label style={{
        display: "block",
        fontSize: 9,
        letterSpacing: "0.3em",
        color: "#A68A5E",
        textTransform: "uppercase",
        marginBottom: 10,
      }}>
        {label}
      </label>
      <div style={{
        display: "flex",
        alignItems: "center",
        border: "1px solid rgba(197,168,128,0.3)",
        background: "#FDFBF8",
        transition: "border-color 0.3s",
      }}>
        {prefix && (
          <span style={{
            padding: "0 14px",
            fontSize: 12,
            color: "#8E8E8E",
            borderRight: "1px solid rgba(197,168,128,0.2)",
            fontFamily: "var(--font-sans)",
          }}>
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: "100%",
            height: 48,
            background: "transparent",
            border: "none",
            outline: "none",
            padding: "0 16px",
            fontSize: 13,
            color: "#121212",
            fontFamily: "var(--font-sans)",
            fontWeight: 300,
            letterSpacing: "0.05em",
          }}
          onFocus={(e) => {
            e.currentTarget.parentElement.style.borderColor = "#C5A880";
          }}
          onBlur={(e) => {
            e.currentTarget.parentElement.style.borderColor = "rgba(197,168,128,0.3)";
          }}
        />
      </div>
    </div>
  );
}

/* Order Card */
function OrderCard({ order, router }) {
  const st = getStatus(order.status);
  const items = order.items || order.products || [];

  return (
    <div style={{
      background: "#fff",
      border: "1px solid rgba(197,168,128,0.15)",
      padding: "24px 28px",
      boxShadow: "0 4px 24px rgba(197,168,128,0.04)",
      transition: "box-shadow 0.4s ease, border-color 0.4s ease",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = "0 8px 40px rgba(197,168,128,0.1)";
      e.currentTarget.style.borderColor = "rgba(197,168,128,0.3)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = "0 4px 24px rgba(197,168,128,0.04)";
      e.currentTarget.style.borderColor = "rgba(197,168,128,0.15)";
    }}
    onClick={() => router.push(`/products`)}
    >
      {/* Top Row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <p style={{ fontSize: 9, letterSpacing: "0.3em", color: "#8E8E8E", textTransform: "uppercase", marginBottom: 6 }}>
            Order ID
          </p>
          <p style={{ fontSize: 13, color: "#121212", fontFamily: "var(--font-sans)", fontWeight: 400, letterSpacing: "0.05em" }}>
            #{order._id?.slice(-8).toUpperCase() || "N/A"}
          </p>
        </div>

        {/* Status Badge */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "6px 14px",
          background: st.bg,
          border: `1px solid ${st.dot}30`,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: st.dot, display: "inline-block" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.2em", color: st.text, textTransform: "uppercase", fontWeight: 500 }}>
            {st.label}
          </span>
        </div>
      </div>

      {/* Meta */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 20 }}>
        <div>
          <p style={metaLabel}>Placed On</p>
          <p style={metaValue}>{formatDate(order.createdAt)}</p>
        </div>
        <div>
          <p style={metaLabel}>Items</p>
          <p style={metaValue}>{items.length} item{items.length !== 1 ? "s" : ""}</p>
        </div>
        <div>
          <p style={metaLabel}>Total Amount</p>
          <p style={{ ...metaValue, color: "#C5A880", fontWeight: 500 }}>
            ₹{formatPrice(order.totalAmount || order.total)}
          </p>
        </div>
      </div>

      {/* Products Preview */}
      {items.length > 0 && (
        <div style={{
          borderTop: "1px solid rgba(197,168,128,0.1)",
          paddingTop: 16,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
        }}>
          {items.slice(0, 4).map((item, idx) => (
            <div key={idx} style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              background: "rgba(197,168,128,0.04)",
              border: "1px solid rgba(197,168,128,0.12)",
            }}>
              <span style={{ fontSize: 11, color: "#6C6C6C", letterSpacing: "0.05em" }}>
                {item.productId?.name || item.name || "Product"}
              </span>
              <span style={{ fontSize: 10, color: "#C5A880" }}>× {item.quantity || 1}</span>
            </div>
          ))}
          {items.length > 4 && (
            <div style={{
              padding: "6px 12px",
              fontSize: 10,
              color: "#8E8E8E",
              letterSpacing: "0.1em",
              display: "flex",
              alignItems: "center",
            }}>
              +{items.length - 4} more
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* Recent Orders Preview (for profile tab) */
function RecentOrdersPreview({ orders }) {
  if (!orders || orders.length === 0) {
    return (
      <div style={{
        ...card,
        textAlign: "center",
        padding: "40px 24px",
      }}>
        <p style={{ fontSize: 28, marginBottom: 12 }}>🕯️</p>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: 16, color: "#8E8E8E", fontWeight: 300 }}>
          No recent orders
        </p>
        <p style={{ fontSize: 11, color: "#CBCBCB", marginTop: 6, letterSpacing: "0.1em" }}>
          Your order history will appear here
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {orders.map((order) => {
        const st = getStatus(order.status);
        return (
          <div key={order._id} style={{
            ...card,
            padding: "16px 24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <div>
              <p style={{ fontSize: 11, color: "#121212", letterSpacing: "0.05em", marginBottom: 4 }}>
                #{order._id?.slice(-8).toUpperCase()}
              </p>
              <p style={{ fontSize: 10, color: "#8E8E8E", letterSpacing: "0.08em" }}>
                {formatDate(order.createdAt)}
              </p>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: 13, color: "#C5A880", fontWeight: 500, marginBottom: 4 }}>
                ₹{formatPrice(order.totalAmount)}
              </p>
              <span style={{
                fontSize: 9,
                letterSpacing: "0.2em",
                color: st.text,
                background: st.bg,
                padding: "3px 10px",
                textTransform: "uppercase",
              }}>
                {st.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* Address Card */
function AddressCard({ address }) {
  return (
    <div style={{ ...card, padding: "32px" }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 20,
      }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 14px",
          border: "1px solid rgba(197,168,128,0.35)",
        }}>
          <span style={{ fontSize: 9, letterSpacing: "0.25em", color: "#A68A5E", textTransform: "uppercase" }}>
            📍 Default Address
          </span>
        </div>
        <button style={outlineBtn}>Edit</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
        {[
          ["Street", address.street],
          ["City", address.city],
          ["State", address.state],
          ["Pincode", address.pincode],
          ["Country", address.country || "India"],
        ].map(([k, v]) => (
          <ProfileField key={k} label={k} value={v} />
        ))}
      </div>
    </div>
  );
}

/* Empty State */
function EmptyState({ icon, title, message, actionLabel, onAction }) {
  return (
    <div style={{
      ...card,
      textAlign: "center",
      padding: "64px 32px",
    }}>
      <p style={{ fontSize: 48, marginBottom: 20 }}>{icon}</p>
      <h3 style={{
        fontFamily: "var(--font-serif)",
        fontSize: 22,
        fontWeight: 300,
        color: "#121212",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        marginBottom: 12,
      }}>
        {title}
      </h3>
      <p style={{ fontSize: 12, color: "#8E8E8E", maxWidth: 320, margin: "0 auto 32px", lineHeight: 2, letterSpacing: "0.05em" }}>
        {message}
      </p>
      <button onClick={onAction} style={primaryBtn}>{actionLabel}</button>
    </div>
  );
}

/* Orders Skeleton */
function OrdersSkeleton() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {[1, 2, 3].map((i) => (
        <div key={i} style={{
          ...card,
          padding: "24px 28px",
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <SkeletonLine w={120} h={12} />
            <SkeletonLine w={80} h={24} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            <SkeletonLine w="80%" h={10} />
            <SkeletonLine w="60%" h={10} />
            <SkeletonLine w="70%" h={10} />
          </div>
        </div>
      ))}
    </div>
  );
}

function SkeletonLine({ w, h }) {
  return (
    <div style={{
      width: w,
      height: h,
      background: "linear-gradient(90deg, rgba(197,168,128,0.08) 25%, rgba(197,168,128,0.15) 50%, rgba(197,168,128,0.08) 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite",
      borderRadius: 2,
    }} />
  );
}

/* ── Shared style objects ── */
const card = {
  background: "#fff",
  border: "1px solid rgba(197,168,128,0.15)",
  boxShadow: "0 4px 32px rgba(197,168,128,0.05)",
  marginBottom: 24,
};

const primaryBtn = {
  padding: "13px 32px",
  background: "#121212",
  color: "#C5A880",
  border: "1px solid #121212",
  fontSize: 10,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  cursor: "pointer",
  fontFamily: "var(--font-sans)",
  fontWeight: 300,
  transition: "all 0.4s ease",
};

const outlineBtn = {
  padding: "10px 24px",
  background: "transparent",
  color: "#6C6C6C",
  border: "1px solid rgba(197,168,128,0.3)",
  fontSize: 10,
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  cursor: "pointer",
  fontFamily: "var(--font-sans)",
  fontWeight: 300,
  transition: "all 0.4s ease",
};

const ghostBtn = {
  background: "none",
  border: "none",
  padding: 0,
  fontSize: 11,
  letterSpacing: "0.15em",
  color: "#C5A880",
  cursor: "pointer",
  textTransform: "uppercase",
  fontFamily: "var(--font-sans)",
};

const metaLabel = {
  fontSize: 9,
  letterSpacing: "0.3em",
  color: "#8E8E8E",
  textTransform: "uppercase",
  marginBottom: 6,
};

const metaValue = {
  fontSize: 13,
  color: "#121212",
  fontFamily: "var(--font-sans)",
  fontWeight: 300,
  letterSpacing: "0.05em",
};