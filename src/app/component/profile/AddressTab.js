"use client";

export default function AddressTab({
  addresses = [],
  setShowAddressForm,
}) {
  return (
    <div>
      {/* =====================================================
          HEADER
      ===================================================== */}

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
            Saved Addresses
          </h2>

          <p
            className="
              mt-1
              text-[11px]
              tracking-[0.1em]
              text-gray-400
            "
          >
            Manage your delivery addresses
          </p>
        </div>

        <button
          type="button"
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
      </div>

      {/* =====================================================
          ADDRESS LIST
      ===================================================== */}

      {addresses.length === 0 ? (
        <EmptyAddressState
          onAdd={() => setShowAddressForm(true)}
        />
      ) : (
        <div className="space-y-5">
          {addresses.map((address, index) => (
            <AddressCard
              key={address?._id || index}
              address={address}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   ADDRESS CARD
============================================================ */

function AddressCard({ address }) {
  return (
    <div
      className="
        border
        border-[#C5A880]/15
        bg-white
        p-6
        shadow-sm
        md:p-8
      "
    >
      {/* HEADER */}

      <div
        className="
          mb-6
          flex
          flex-col
          justify-between
          gap-3
          sm:flex-row
          sm:items-center
        "
      >
        <div className="flex items-center gap-3">
          <span
            className="
              border
              border-[#C5A880]/30
              bg-[#C5A880]/5
              px-3
              py-1.5
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-[#A68A5E]
            "
          >
            {address?.addressType || "Home"}
          </span>

          <span
            className="
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-gray-400
            "
          >
            Delivery Address
          </span>
        </div>
      </div>

      {/* NAME */}

      <div className="mb-5">
        <h3
          className="
            mb-1
            font-serif
            text-xl
            text-[#121212]
          "
        >
          {address?.name || "—"}
        </h3>

        {address?.mobileNumber && (
          <p className="text-xs text-gray-500">
            +91 {address.mobileNumber}
          </p>
        )}
      </div>

      {/* ADDRESS */}

      <div
        className="
          space-y-1
          text-sm
          leading-6
          text-gray-600
        "
      >
        {address?.addressline && (
          <p>{address.addressline}</p>
        )}

        {address?.locality && (
          <p>{address.locality}</p>
        )}

        {(address?.city ||
          address?.state ||
          address?.pincode) && (
          <p>
            {address?.city || ""}
            {address?.city && address?.state
              ? ", "
              : ""}
            {address?.state || ""}
            {address?.pincode
              ? ` - ${address.pincode}`
              : ""}
          </p>
        )}

        {address?.landmark && (
          <p className="pt-1 text-gray-400">
            Landmark: {address.landmark}
          </p>
        )}
      </div>

      {/* ALTERNATE NUMBER */}

      {address?.alternateNumber && (
        <div
          className="
            mt-5
            border-t
            border-[#C5A880]/10
            pt-5
          "
        >
          <p
            className="
              text-[9px]
              uppercase
              tracking-[0.2em]
              text-gray-400
            "
          >
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
   EMPTY ADDRESS
============================================================ */

function EmptyAddressState({ onAdd }) {
  return (
    <div
      className="
        border
        border-[#C5A880]/15
        bg-white
        px-6
        py-16
        text-center
      "
    >
      <p className="mb-5 text-5xl">
        📍
      </p>

      <h3
        className="
          mb-3
          font-serif
          text-2xl
          font-light
          uppercase
          tracking-[0.08em]
          text-[#121212]
        "
      >
        No Address Saved
      </h3>

      <p
        className="
          mx-auto
          mb-8
          max-w-sm
          text-xs
          leading-7
          text-gray-400
        "
      >
        Add a delivery address to make
        checkout faster.
      </p>

      <button
        type="button"
        onClick={onAdd}
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
        Add Address
      </button>
    </div>
  );
}