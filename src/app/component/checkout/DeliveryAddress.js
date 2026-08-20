"use client";

import React from "react";

export default function DeliveryAddress({
  addresses = [],
  loading = false,
  selectedAddressId,
  showNewAddressForm,
  formData,
  savingAddress,

  onSelectAddress,
  onAddNewAddress,
  onUseSavedAddress,
  onChange,
  onAddressTypeChange,
  onSaveAddress,
}) {
  return (
    <section
      id="delivery-address"
      className="bg-[#FAF7F2] border border-luxury-gold/20 p-5 sm:p-6 md:p-8"
    >

      {/* HEADER */}

      <div className="mb-7">
        <p className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold mb-2">
          Step 02
        </p>

        <h2 className="font-serif text-2xl text-luxury-dark uppercase tracking-[0.08em]">
          Delivery Address
        </h2>
      </div>

      {/* LOADING */}

      {loading ? (
        <div className="border border-luxury-gold/15 p-8 text-center">

          <div className="mx-auto w-6 h-6 rounded-full border-2 border-luxury-gold border-t-transparent animate-spin" />

          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-[#777]">
            Loading saved addresses...
          </p>

        </div>
      ) : (
        <>
          {/* SAVED ADDRESSES */}

          {addresses.length > 0 && (
            <div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">

                <h3 className="text-sm font-medium uppercase tracking-wider text-luxury-dark">
                  Saved Addresses
                </h3>

                <button
                  type="button"
                  onClick={onAddNewAddress}
                  className="self-start text-[10px] uppercase tracking-widest text-luxury-gold hover:text-luxury-dark transition-colors"
                >
                  + Add New Address
                </button>

              </div>

              <div className="space-y-4">

                {addresses.map((address, index) => {

                  const id =
                    address?.id ||
                    address?._id ||
                    address?.addressId;

                  const selected =
                    selectedAddressId === id;

                  return (
                    <button
                      key={id || index}
                      type="button"
                      onClick={() =>
                        onSelectAddress(address)
                      }
                      className={`
                        w-full
                        text-left
                        p-4 sm:p-5
                        border
                        transition-all
                        duration-300
                        ${
                          selected
                            ? "border-luxury-gold bg-luxury-gold/5"
                            : "border-luxury-gold/20 hover:border-luxury-gold/50"
                        }
                      `}
                    >

                      <div className="flex gap-4">

                        {/* RADIO */}

                        <div
                          className={`
                            w-5 h-5
                            mt-1
                            rounded-full
                            border
                            flex
                            items-center
                            justify-center
                            flex-shrink-0
                            ${
                              selected
                                ? "border-luxury-gold"
                                : "border-gray-400"
                            }
                          `}
                        >
                          {selected && (
                            <div className="w-2.5 h-2.5 rounded-full bg-luxury-gold" />
                          )}
                        </div>

                        {/* ADDRESS */}

                        <div className="flex-1 min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            <span className="font-medium text-sm text-luxury-dark">
                              {address.name ||
                                address.fullName ||
                                "Saved Address"}
                            </span>

                            {address.addressType && (
                              <span className="px-2 py-1 bg-luxury-dark text-luxury-gold text-[8px] uppercase tracking-widest">
                                {address.addressType}
                              </span>
                            )}

                          </div>

                          <p className="mt-2 text-sm text-[#555] break-words">
                            {address.addressline ||
                              address.address ||
                              ""}
                          </p>

                          {address.locality && (
                            <p className="mt-1 text-xs text-[#777]">
                              {address.locality}
                            </p>
                          )}

                          {address.landmark && (
                            <p className="mt-1 text-xs text-[#777]">
                              Landmark: {address.landmark}
                            </p>
                          )}

                          <p className="mt-2 text-sm text-[#555]">

                            {address.city}

                            {address.city &&
                            address.state
                              ? ", "
                              : ""}

                            {address.state}

                            {address.pincode
                              ? ` - ${address.pincode}`
                              : ""}

                          </p>

                          {address.mobileNumber && (
                            <p className="mt-2 text-xs text-[#777]">
                              Mobile:{" "}
                              {address.mobileNumber}
                            </p>
                          )}

                        </div>

                        {selected && (
                          <span className="hidden sm:block text-[9px] uppercase tracking-widest text-luxury-gold">
                            Selected
                          </span>
                        )}

                      </div>
                    </button>
                  );
                })}

              </div>
            </div>
          )}

          {/* NO ADDRESS */}

          {addresses.length === 0 && (
            <div className="border border-luxury-gold/10 p-5 mb-6">
              <p className="text-sm text-[#777]">
                No saved address found.
                Please add a delivery address.
              </p>
            </div>
          )}

          {/* NEW ADDRESS */}

          {showNewAddressForm && (
            <div className="mt-6 border-t border-luxury-gold/15 pt-6">

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">

                <div>
                  <h3 className="text-sm font-medium uppercase tracking-wider text-luxury-dark">
                    Add New Address
                  </h3>

                  <p className="mt-1 text-xs text-[#777]">
                    Enter your complete delivery details.
                  </p>
                </div>

                {addresses.length > 0 && (
                  <button
                    type="button"
                    onClick={onUseSavedAddress}
                    className="self-start text-[10px] uppercase tracking-widest text-luxury-gold hover:text-luxury-dark"
                  >
                    ← Use Saved Address
                  </button>
                )}

              </div>

              <div className="space-y-5">

                <InputField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  placeholder="Enter your full name"
                  required
                />

                <InputField
                  label="Mobile Number"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={onChange}
                  placeholder="10 digit mobile number"
                  type="tel"
                  inputMode="numeric"
                  required
                />

                <InputField
                  label="Address"
                  name="addressline"
                  value={formData.addressline}
                  onChange={onChange}
                  placeholder="House / Flat / Building / Street"
                  required
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <InputField
                    label="Locality"
                    name="locality"
                    value={formData.locality}
                    onChange={onChange}
                    placeholder="Locality"
                    required
                  />

                  <InputField
                    label="Landmark"
                    name="landmark"
                    value={formData.landmark}
                    onChange={onChange}
                    placeholder="Nearby landmark"
                  />

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                  <InputField
                    label="Pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={onChange}
                    placeholder="6 digit pincode"
                    inputMode="numeric"
                    required
                  />

                  <InputField
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={onChange}
                    placeholder="City"
                    required
                  />

                  <InputField
                    label="State"
                    name="state"
                    value={formData.state}
                    onChange={onChange}
                    placeholder="State"
                    required
                  />

                </div>

                <InputField
                  label="Alternate Number"
                  name="alternateNumber"
                  value={formData.alternateNumber}
                  onChange={onChange}
                  placeholder="Optional alternate number"
                  type="tel"
                  inputMode="numeric"
                />

                {/* ADDRESS TYPE */}

                <div>

                  <label className="block text-[10px] uppercase tracking-[0.2em] text-luxury-gold-dark mb-3">
                    Address Type
                  </label>

                  <div className="flex flex-wrap gap-3">

                    {["Home", "Work"].map((type) => {

                      const active =
                        formData.addressType === type;

                      return (
                        <button
                          key={type}
                          type="button"
                          onClick={() =>
                            onAddressTypeChange(type)
                          }
                          className={`
                            px-6 py-3
                            text-xs
                            uppercase
                            tracking-widest
                            border
                            transition-all
                            ${
                              active
                                ? "bg-luxury-dark text-luxury-gold border-luxury-dark"
                                : "border-luxury-gold/30 text-luxury-dark hover:border-luxury-gold"
                            }
                          `}
                        >
                          {type}
                        </button>
                      );
                    })}

                  </div>
                </div>

                {/* SAVE */}

                <button
                  type="button"
                  onClick={onSaveAddress}
                  disabled={savingAddress}
                  className="
                    w-full
                    bg-luxury-dark
                    text-luxury-gold
                    py-4
                    text-xs
                    uppercase
                    tracking-[0.2em]
                    hover:bg-luxury-gold
                    hover:text-luxury-dark
                    transition-all
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                  "
                >
                  {savingAddress
                    ? "Saving Address..."
                    : "Save Address"}
                </button>

              </div>
            </div>
          )}

          {/* ADD NEW */}

          {!showNewAddressForm &&
            addresses.length > 0 && (
              <button
                type="button"
                onClick={onAddNewAddress}
                className="
                  w-full
                  mt-5
                  py-4
                  border
                  border-dashed
                  border-luxury-gold/40
                  text-xs
                  uppercase
                  tracking-widest
                  text-luxury-dark
                  hover:border-luxury-gold
                  hover:text-luxury-gold
                  transition-all
                "
              >
                + Add New Address
              </button>
            )}
        </>
      )}
    </section>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  inputMode,
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.2em] text-luxury-gold-dark mb-2">
        {label}

        {required && (
          <span className="text-red-500 ml-1">
            *
          </span>
        )}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        inputMode={inputMode}
        className="
          w-full
          bg-transparent
          border border-luxury-gold/25
          px-4 py-3.5
          text-sm
          text-luxury-dark
          placeholder:text-gray-400
          outline-none
          focus:border-luxury-gold
          transition-colors
        "
      />
    </div>
  );
}