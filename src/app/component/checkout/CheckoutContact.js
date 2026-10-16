
"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { fetchCurrentUser } from "@/app/store/action/adminAction";
import { updateUSerDetailes } from "@/app/store/action/userAction";

export default function ContactInformation({
  formData = {},
  onChange,
}) {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let cancelled = false;

    const loadUserProfile = async () => {
      setLoading(true);

      try {
        const token = localStorage.getItem("userToken");

        if (
          !token ||
          token === "undefined" ||
          token === "null"
        ) {
          return;
        }

        const result = await dispatch(fetchCurrentUser());

        if (cancelled) return;

        if (
          result?.meta?.requestStatus === "rejected" ||
          result?.error
        ) {
          console.error(
            "Failed to load profile:",
            result?.error || result?.payload
          );
          return;
        }

        const payload = result?.payload;

        const user =
          payload?.user ||
          payload?.data?.user ||
          payload?.data?.data?.user ||
          payload?.data ||
          payload?.payload?.user ||
          payload?.payload ||
          payload;

        if (!user || typeof user !== "object") return;

        [
          {
            name: "name",
            value: user.name || user.fullName,
          },
          {
            name: "mobileNumber",
            value:
              user.mobileNumber ||
              user.mobile ||
              user.phoneNumber,
          },
          {
            name: "email",
            value: user.email,
          },
        ].forEach(({ name, value }) => {
          if (value != null && String(value).trim()) {
            onChange?.({
              target: {
                name,
                value: String(value),
              },
            });
          }
        });
      } catch (error) {
        console.error("Profile loading failed:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadUserProfile();

    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    onChange?.(event);

    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));

    setMessage("");
  };

  const handleUpdate = async () => {
    setMessage("");
    setMessageType("");

    const name = (formData.name || "").trim();
    const mobileNumber = (
      formData.mobileNumber || ""
    ).trim();
    const email = (formData.email || "").trim();

    const nextErrors = {};

    if (!name) {
      nextErrors.name = "Please enter your full name.";
    }

    if (!mobileNumber) {
      nextErrors.mobileNumber =
        "Please enter your mobile number.";
    } else if (!/^[6-9]\d{9}$/.test(mobileNumber)) {
      nextErrors.mobileNumber =
        "Please enter a valid 10-digit mobile number.";
    }

    if (!email) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email =
        "Please enter a valid email address.";
    }

    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }

    setSaving(true);

    try {
      const result = await dispatch(
        updateUSerDetailes({
          name,
          mobileNumber,
          email,
        })
      );

      if (
        result?.meta?.requestStatus === "rejected" ||
        result?.error ||
        result?.payload?.success === false
      ) {
        setMessage(
          result?.payload?.message ||
            result?.error?.message ||
            "Unable to update details. Please try again."
        );
        setMessageType("error");
        return;
      }

      setMessage(
        result?.payload?.message ||
          "Contact details updated successfully."
      );
      setMessageType("success");
    } catch (error) {
      console.error("Update profile error:", error);
      setMessage(
        error?.message ||
          "Unable to update details. Please try again."
      );
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[#E5DED5] bg-[#FAF7F2] px-4 py-3 text-sm text-[#33271F] placeholder:text-[#A49A90] outline-none transition focus:border-[#8B6B4A] focus:ring-2 focus:ring-[#C5A880]/25 disabled:cursor-not-allowed disabled:bg-[#F5F1EB]";

  const labelClass =
    "mb-2 block text-sm font-medium text-[#5C4033]";

  const renderError = (field) =>
    errors[field] ? (
      <p className="mt-1.5 text-xs text-red-600">
        {errors[field]}
      </p>
    ) : null;

  return (
    <section className="rounded-2xl border border-[#E9E0D5] p-5 shadow-sm sm:p-6 bg-[#FAF7F2]">
      {/* Heading */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3 border-b border-[#F0EAE2] pb-5">
        <div>
          <h2 className="text-xl font-semibold tracking-wide text-[#5C4033]">
            Contact Information
          </h2>

          <p className="mt-1.5 text-sm leading-6 text-[#82766B]">
            Please provide your details for order updates and
            delivery.
          </p>
        </div>

        {loading && (
          <span className="inline-flex items-center gap-2 rounded-full bg-[#FAF7F2] px-3 py-1.5 text-xs text-[#806447]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#C5A880]" />
            Loading your details...
          </span>
        )}
      </div>

      {/* Inputs remain visible and editable during profile loading */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label htmlFor="contact-name" className={labelClass}>
            Full Name <span className="text-red-500">*</span>
          </label>

          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            value={formData.name ?? ""}
            onChange={handleFieldChange}
            placeholder="Enter your full name"
            required
            disabled={saving}
            className={inputClass}
          />

          {renderError("name")}
        </div>

        {/* Mobile */}
        <div>
          <label htmlFor="contact-mobile" className={labelClass}>
            Mobile Number <span className="text-red-500">*</span>
          </label>

          <input
            id="contact-mobile"
            name="mobileNumber"
            type="tel"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={10}
            value={formData.mobileNumber ?? ""}
            onChange={handleFieldChange}
            placeholder="Enter 10-digit mobile number"
            required
            disabled={saving}
            className={inputClass}
          />

          {renderError("mobileNumber")}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="contact-email" className={labelClass}>
            Email Address <span className="text-red-500">*</span>
          </label>

          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            value={formData.email ?? ""}
            onChange={handleFieldChange}
            placeholder="Enter your email address"
            required
            disabled={saving}
            className={inputClass}
          />

          {renderError("email")}
        </div>
      </div>

      {/* Status message */}
      {message && (
        <div
          role="status"
          className={`mt-5 rounded-lg border px-4 py-3 text-sm ${
            messageType === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-red-200 bg-red-50 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Update button */}
      <div className="mt-6 flex flex-col-reverse gap-3 border-t border-[#F0EAE2] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-[#918579]">
          Your contact details will be used for this order.
        </p>

        <button
          type="button"
          onClick={handleUpdate}
          disabled={saving || loading}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#5C4033] px-6 py-3 text-sm font-semibold tracking-wide text-white transition duration-200 hover:bg-[#463025] focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Updating..." : "Update Details"}
        </button>
      </div>
    </section>
  );
}
