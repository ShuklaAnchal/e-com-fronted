"use client";

import { useEffect, useState } from "react";

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
   PROFILE TAB
============================================================ */

export default function ProfileTab({
  admin,
  userName,
  userEmail,
  userMobile,
  orders,
  setActiveTab,
}) {
  const [editMode, setEditMode] = useState(false);

  const [saving, setSaving] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: "",
    mobileNumber: "",
  });

  /* ==========================================================
     SEED FORM
  ========================================================== */

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

  /* ==========================================================
     SAVE PROFILE
  ========================================================== */

  const handleProfileSave = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      /*
        Connect your update profile API here.

        Example:

        await dispatch(
          updateProfile(profileForm)
        );
      */

      console.log(
        "PROFILE UPDATE:",
        profileForm
      );

      await new Promise((resolve) =>
        setTimeout(resolve, 500)
      );

      setEditMode(false);
    } catch (error) {
      console.error(
        "PROFILE UPDATE ERROR:",
        error
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>

      {/* =====================================================
          PERSONAL INFORMATION
      ===================================================== */}

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

      {/* =====================================================
          PROFILE CARD
      ===================================================== */}

      <div
        className="
          mb-8
          border
          border-[#C5A880]/15
          bg-white
          shadow-sm
        "
      >

        {editMode ? (
          <form
            onSubmit={handleProfileSave}
            className="p-6 md:p-8"
          >

            <div
              className="
                grid
                grid-cols-1
                gap-6
                md:grid-cols-2
              "
            >

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
                disabled={saving}
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
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() =>
                  setEditMode(false)
                }
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

            {/* PROFILE DETAILS */}

            <div
              className="
                grid
                grid-cols-1
                md:grid-cols-2
              "
            >

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

            <div
              className="
                mx-6
                border-t
                border-[#C5A880]/10
                md:mx-8
              "
            />

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
                    (order) =>
                      order.status ===
                      "Delivered"
                  ).length
                }
                border
              />

              <StatCell
                label="Pending"
                value={
                  orders.filter(
                    (order) =>
                      order.status ===
                      "Pending"
                  ).length
                }
                border
              />

            </div>

          </>
        )}

      </div>

      {/* =====================================================
          RECENT ORDERS
      ===================================================== */}

      <SectionHeader
        title="Recent Orders"
        subtitle="Your latest purchases"
        action={
          <button
            onClick={() =>
              setActiveTab("orders")
            }
            className="
              text-[11px]
              uppercase
              tracking-[0.15em]
              text-[#C5A880]
            "
          >
            View All →
          </button>
        }
      />

      <RecentOrdersPreview
        orders={orders.slice(0, 3)}
      />

    </div>
  );
}

/* ============================================================
   SECTION HEADER
============================================================ */

function SectionHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <div
      className="
        mb-5
        flex
        flex-col
        justify-between
        gap-4
        border-b
        border-[#C5A880]/10
        pb-4
        sm:flex-row
        sm:items-end
      "
    >
      <div>

        <h2
          className="
            font-serif
            text-xl
            font-normal
            uppercase
            tracking-[0.06em]
            text-[#121212]
            md:text-2xl
          "
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className="
              mt-1
              text-[11px]
              tracking-[0.1em]
              text-gray-400
            "
          >
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

function ProfileField({
  label,
  value,
}) {
  return (
    <div
      className="
        border-b
        border-[#C5A880]/10
        px-6
        py-5
        md:px-8
      "
    >
      <p
        className="
          mb-2
          text-[9px]
          uppercase
          tracking-[0.3em]
          text-[#C5A880]
        "
      >
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
        ${
          border
            ? "border-l border-[#C5A880]/10"
            : ""
        }
      `}
    >
      <p className="font-serif text-3xl font-light text-[#C5A880]">
        {value}
      </p>

      <p
        className="
          mt-1
          text-[9px]
          uppercase
          tracking-[0.25em]
          text-gray-400
        "
      >
        {label}
      </p>
    </div>
  );
}

/* ============================================================
   FORM FIELD
============================================================ */

function FormField({
  label,
  value,
  onChange,
  type = "text",
  prefix,
}) {
  return (
    <div>

      <label
        className="
          mb-2
          block
          text-[9px]
          uppercase
          tracking-[0.3em]
          text-[#A68A5E]
        "
      >
        {label}
      </label>

      <div
        className="
          flex
          border
          border-[#C5A880]/30
          bg-[#FDFBF8]
          focus-within:border-[#C5A880]
        "
      >

        {prefix && (
          <span
            className="
              flex
              items-center
              border-r
              border-[#C5A880]/20
              px-4
              text-xs
              text-gray-400
            "
          >
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
   RECENT ORDERS
============================================================ */

function RecentOrdersPreview({
  orders,
}) {
  if (!orders?.length) {
    return (
      <div
        className="
          border
          border-[#C5A880]/15
          bg-white
          py-12
          text-center
        "
      >
        <p className="mb-3 text-3xl">
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
        const status =
          order.status || "Pending";

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

              <p className="mb-1 text-sm text-[#C5A880]">
                ₹
                {formatPrice(
                  order.totalAmount ||
                    order.total
                )}
              </p>

              <span
                className="
                  bg-[#C5A880]/10
                  px-2
                  py-1
                  text-[9px]
                  uppercase
                  tracking-[0.2em]
                  text-[#A68A5E]
                "
              >
                {status}
              </span>

            </div>

          </div>
        );
      })}

    </div>
  );
}