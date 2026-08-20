"use client";

import InputField from "./InputField";

export default function AddressForm({
  formData,
  onChange,
  onAddressTypeChange,
  onSave,
  onUseSavedAddress,
  showUseSavedButton,
  savingAddress,
}) {
  return (
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

        {showUseSavedButton && (
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
          onClick={onSave}
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
  );
}