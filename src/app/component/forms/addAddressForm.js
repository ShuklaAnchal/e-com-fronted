"use client";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  AddAddress,
  editAddressdetailes,
} from "@/app/store/action/addressAction";

const INITIAL_FORM = {
  name: "",
  mobileNumber: "",
  pincode: "",
  locality: "",
  addressline: "",
  city: "",
  state: "",
  landmark: "",
  alternateNumber: "",
  addressType: "Home",
};

export default function AddressForm({ onClose, onSuccess, address = null }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  const [pincodeLoading, setPincodeLoading] = useState(false);

  const [error, setError] = useState("");

  const [pincodeMessage, setPincodeMessage] = useState("");

  const [postOffices, setPostOffices] = useState([]);

  // ============================================================
  // EDIT MODE
  // ============================================================

  useEffect(() => {
    if (address) {
      setForm({
        name: address.name || "",

        mobileNumber: address.mobileNumber?.toString() || "",

        pincode: address.pincode?.toString() || "",

        locality: address.locality || "",

        addressline: address.addressline || "",

        city: address.city || "",

        state: address.state || "",

        landmark: address.landmark || "",

        alternateNumber: address.alternateNumber?.toString() || "",

        addressType: address.addressType || "Home",
      });
    } else {
      setForm(INITIAL_FORM);
    }
  }, [address]);

  // ============================================================
  // HANDLE CHANGE
  // ============================================================

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (error) {
      setError("");
    }
  };

  // ============================================================
  // FETCH PINCODE DETAILS
  // ============================================================

  const fetchPincodeDetails = async (pincode) => {
    if (pincode.length !== 6) {
      return;
    }

    try {
      setPincodeLoading(true);
      setPincodeMessage("");
      setError("");

      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`,
      );

      if (!response.ok) {
        throw new Error("Unable to fetch pincode details");
      }

      const data = await response.json();

      if (
        !data ||
        !data[0] ||
        data[0].Status !== "Success" ||
        !data[0].PostOffice ||
        data[0].PostOffice.length === 0
      ) {
        setPostOffices([]);

        setPincodeMessage("Invalid pincode. Please check the pincode.");

        setForm((prev) => ({
          ...prev,
          city: "",
          state: "",
          locality: "",
        }));

        return;
      }

      const offices = data[0].PostOffice;

      setPostOffices(offices);

      const state = offices[0]?.State || "";

      setForm((prev) => ({
        ...prev,
        state,
        city: "",
        locality: "",
      }));

      setPincodeMessage(
        `${offices.length} location${offices.length > 1 ? "s" : ""} found`,
      );
    } catch (error) {
      console.error("PINCODE FETCH ERROR:", error);

      setPostOffices([]);

      setPincodeMessage("Unable to fetch pincode details.");

      setForm((prev) => ({
        ...prev,
        city: "",
        state: "",
        locality: "",
      }));
    } finally {
      setPincodeLoading(false);
    }
  };

  // ============================================================
  // PINCODE CHANGE
  // ============================================================

  const handlePincodeChange = (value) => {
    const pincode = value.replace(/\D/g, "").slice(0, 6);

    setForm((prev) => ({
      ...prev,
      pincode,
    }));

    if (pincode.length < 6) {
      setPostOffices([]);

      setPincodeMessage("");

      setForm((prev) => ({
        ...prev,
        pincode,
        city: "",
        state: "",
        locality: "",
      }));

      return;
    }

    if (pincode.length === 6) {
      fetchPincodeDetails(pincode);
    }
  };

  // ============================================================
  // LOCALITY CHANGE
  // ============================================================

  const handleLocalityChange = (value) => {
    const selectedOffice = postOffices.find((office) => office.Name === value);

    setForm((prev) => ({
      ...prev,
      locality: value,
    }));

    if (selectedOffice) {
      console.log("SELECTED POST OFFICE:", selectedOffice);
    }
  };

  // ============================================================
  // SUBMIT
  // ============================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    // ==========================================================
    // VALIDATION
    // ==========================================================

    if (!form.name.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (form.mobileNumber.length !== 10) {
      setError("Please enter a valid 10 digit mobile number.");
      return;
    }

    if (form.pincode.length !== 6) {
      setError("Please enter a valid 6 digit pincode.");
      return;
    }

    if (!form.locality.trim()) {
      setError("Please select your locality / post office.");
      return;
    }

    if (!form.city.trim()) {
      setError("Please enter your city.");
      return;
    }

    if (!form.state.trim()) {
      setError("Please enter your state.");
      return;
    }

    if (!form.addressline.trim()) {
      setError("Please enter your complete address.");
      return;
    }

    if (form.alternateNumber && form.alternateNumber.length !== 10) {
      setError("Please enter a valid alternate mobile number.");
      return;
    }

    try {
      setLoading(true);

      // ========================================================
      // JSON PAYLOAD
      // ========================================================

      const payload = {
        name: form.name.trim(),

        // Keep as STRING
        mobileNumber: form.mobileNumber.trim(),

        // Keep as STRING
        pincode: form.pincode.trim(),

        locality: form.locality.trim(),

        addressline: form.addressline.trim(),

        city: form.city.trim(),

        state: form.state.trim(),

        addressType: form.addressType,
      };

      // Optional landmark
      if (form.landmark.trim()) {
        payload.landmark = form.landmark.trim();
      }

      // Optional alternate number
      if (form.alternateNumber.trim()) {
        payload.alternateNumber = form.alternateNumber.trim();
      }

      console.log("ADDRESS PAYLOAD:", payload);

      // ========================================================
      // EDIT ADDRESS
      // ========================================================

      if (address?._id) {
        const result = await dispatch(
          editAddressdetailes({
            id: address._id,
            data: payload,
          }),
        );

        console.log("EDIT ADDRESS RESULT:", result);

        if (result?.meta?.requestStatus === "rejected") {
          throw new Error(
            result?.payload?.message || "Unable to update address.",
          );
        }

        onSuccess?.(
          result?.payload?.address ||
            result?.payload?.shippingAddress ||
            payload,
        );

        onClose?.();

        return;
      }

      // ========================================================
      // CREATE ADDRESS
      // ========================================================

      const result = await dispatch(AddAddress(payload));

      console.log("CREATE ADDRESS RESULT:", result);

      // --------------------------------------------------------
      // Your AddAddress action returns:
      //
      // {
      //   success: true,
      //   payload: data
      // }
      //
      // And backend returns:
      //
      // {
      //   success: true,
      //   message: "...",
      //   shippingAddress: {...}
      // }
      // --------------------------------------------------------

      if (!result?.success) {
        throw new Error(result?.message || "Unable to save address.");
      }

      const savedAddress = result?.payload?.shippingAddress || payload;

      console.log("SAVED ADDRESS:", savedAddress);

      // Send saved address to parent
      onSuccess?.(savedAddress);

      // Close modal
      onClose?.();
    } catch (error) {
      console.error("ADDRESS SAVE ERROR:", error);

      setError(error?.message || "Unable to save address. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
    >
      <div
        className="
          relative
          flex
          max-h-[90vh]
          w-full
          max-w-3xl
          flex-col
          overflow-hidden
          bg-[#FAF7F2]
          shadow-2xl
        "
      >
        {/* HEADER */}

        <div
          className="
            sticky
            top-0
            z-10
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-[#C5A880]/15
            bg-[#FAF7F2]
            px-6
            py-5
            md:px-8
          "
        >
          <div>
            <p
              className="
                mb-1
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-[#A68A5E]
              "
            >
              Delivery Details
            </p>

            <h2
              className="
                font-serif
                text-2xl
                text-[#121212]
                md:text-3xl
              "
            >
              {address ? "Edit Address" : "Add New Address"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              border
              border-[#C5A880]/30
              text-xl
              text-gray-500
              transition
              hover:bg-[#C5A880]
              hover:text-[#121212]
            "
          >
            ×
          </button>
        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
            overflow-y-auto
            p-6
            md:p-8
          "
        >
          {/* ERROR */}

          {error && (
            <div
              className="
                mb-6
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                text-sm
                text-red-600
              "
            >
              {error}
            </div>
          )}

          {/* NAME + MOBILE */}

          <div
            className="
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >
            <AddressField
              label="Full Name"
              required
              value={form.name}
              placeholder="Enter full name"
              onChange={(value) => handleChange("name", value)}
            />

            <AddressField
              label="Mobile Number"
              required
              type="tel"
              value={form.mobileNumber}
              placeholder="10 digit mobile number"
              onChange={(value) =>
                handleChange(
                  "mobileNumber",
                  value.replace(/\D/g, "").slice(0, 10),
                )
              }
            />
          </div>

          {/* PINCODE + LOCALITY */}

          <div
            className="
              mt-5
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >
            {/* PINCODE */}

            <div>
              <AddressField
                label="Pincode"
                required
                type="tel"
                value={form.pincode}
                placeholder="Enter 6 digit pincode"
                onChange={handlePincodeChange}
              />

              {pincodeLoading && (
                <p
                  className="
                    mt-2
                    text-[10px]
                    text-[#A68A5E]
                  "
                >
                  Fetching locations...
                </p>
              )}

              {!pincodeLoading && pincodeMessage && (
                <p
                  className={`
                      mt-2
                      text-[10px]
                      ${
                        pincodeMessage.includes("Invalid") ||
                        pincodeMessage.includes("Unable")
                          ? "text-red-500"
                          : "text-green-600"
                      }
                    `}
                >
                  {pincodeMessage}
                </p>
              )}
            </div>

            {/* LOCALITY */}

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
                Locality / Post Office
                <span className="ml-1 text-red-500">*</span>
              </label>

              {postOffices.length > 0 ? (
                <select
                  value={form.locality}
                  required
                  onChange={(e) => handleLocalityChange(e.target.value)}
                  className="
                    h-12
                    w-full
                    border
                    border-[#C5A880]/30
                    bg-[#FDFBF8]
                    px-4
                    text-sm
                    text-[#121212]
                    outline-none
                    transition
                    focus:border-[#C5A880]
                  "
                >
                  <option value="">Select locality / post office</option>

                  {postOffices.map((office, index) => (
                    <option key={`${office.Name}-${index}`} value={office.Name}>
                      {office.Name}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  value={form.locality}
                  required
                  placeholder={
                    pincodeLoading ? "Fetching..." : "Enter locality"
                  }
                  onChange={(e) => handleChange("locality", e.target.value)}
                  className="
                    h-12
                    w-full
                    border
                    border-[#C5A880]/30
                    bg-[#FDFBF8]
                    px-4
                    text-sm
                    text-[#121212]
                    outline-none
                    placeholder:text-gray-300
                    transition
                    focus:border-[#C5A880]
                  "
                />
              )}
            </div>
          </div>

          {/* ADDRESS */}

          <div className="mt-5">
            <AddressField
              label="Address"
              required
              value={form.addressline}
              placeholder="House No., Building, Street"
              onChange={(value) => handleChange("addressline", value)}
            />
          </div>

          {/* CITY + STATE */}

          <div
            className="
              mt-5
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >
            <AddressField
              label="City"
              required
              value={form.city}
              placeholder="Enter your city"
              onChange={(value) => handleChange("city", value)}
            />

            <AddressField
              label="State"
              required
              value={form.state}
              placeholder="Automatically detected"
              readOnly
              onChange={(value) => handleChange("state", value)}
            />
          </div>

          {/* LANDMARK + ALTERNATE */}

          <div
            className="
              mt-5
              grid
              grid-cols-1
              gap-5
              md:grid-cols-2
            "
          >
            <AddressField
              label="Landmark"
              value={form.landmark}
              placeholder="Optional"
              onChange={(value) => handleChange("landmark", value)}
            />

            <AddressField
              label="Alternate Mobile Number"
              type="tel"
              value={form.alternateNumber}
              placeholder="Optional"
              onChange={(value) =>
                handleChange(
                  "alternateNumber",
                  value.replace(/\D/g, "").slice(0, 10),
                )
              }
            />
          </div>

          {/* ADDRESS TYPE */}

          <div className="mt-6">
            <label
              className="
                mb-3
                block
                text-[9px]
                uppercase
                tracking-[0.3em]
                text-[#A68A5E]
              "
            >
              Address Type
            </label>

            <div className="flex gap-3">
              {["Home", "Work"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChange("addressType", type)}
                  className={`
                    border
                    px-7
                    py-3
                    text-[10px]
                    uppercase
                    tracking-[0.2em]
                    transition

                    ${
                      form.addressType === type
                        ? "border-[#121212] bg-[#121212] text-[#C5A880]"
                        : "border-[#C5A880]/30 bg-transparent text-gray-500 hover:border-[#C5A880]"
                    }
                  `}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* BUTTONS */}

          <div
            className="
              mt-8
              flex
              flex-col
              gap-3
              border-t
              border-[#C5A880]/10
              pt-6
              sm:flex-row
            "
          >
            <button
              type="submit"
              disabled={loading || pincodeLoading}
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
                disabled:cursor-not-allowed
                disabled:opacity-50
              "
            >
              {loading
                ? address
                  ? "Updating..."
                  : "Saving..."
                : address
                  ? "Update Address"
                  : "Save Address"}
            </button>

            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="
                border
                border-[#C5A880]/30
                px-8
                py-3
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-gray-600
                transition
                hover:bg-[#C5A880]/10
                disabled:opacity-50
              "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================
// ADDRESS FIELD
// ============================================================

function AddressField({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = "",
  readOnly = false,
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

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        type={type}
        value={value}
        required={required}
        readOnly={readOnly}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={`
          h-12
          w-full
          border
          border-[#C5A880]/30
          px-4
          text-sm
          text-[#121212]
          outline-none
          placeholder:text-gray-300
          transition

          ${
            readOnly
              ? "cursor-not-allowed bg-gray-100 text-gray-500"
              : "bg-[#FDFBF8] focus:border-[#C5A880]"
          }
        `}
      />
    </div>
  );
}
