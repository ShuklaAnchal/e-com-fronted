"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { createCustomize } from "@/app/store/action/customizationAction";

const Banner = () => {
const dispatch = useDispatch();

const [showForm, setShowForm] = useState(false);
const [loading, setLoading] = useState(false);

const [formData, setFormData] = useState({
name: "",
mobile: "",
email: "",
occasion: "",
quantity: "",
deliveryDate: "",
customMessage: "",
fragrance: "",
requirements: "",
});

// ======================================================
// HANDLE INPUT
// ======================================================

const handleChange = (e) => {
const { name, value } = e.target;

setFormData((prev) => ({
  ...prev,
  [name]: value,
}));

};

// ======================================================
// SUBMIT FORM
// ======================================================

const handleSubmit = async (e) => {
e.preventDefault();


try {
  setLoading(true);

  const result = await dispatch(
    createCustomize(formData)
  );

  if (result?.success) {
    alert(
      "Your customization request has been submitted successfully. Our team will contact you shortly."
    );

    setFormData({
      name: "",
      mobile: "",
      email: "",
      occasion: "",
      quantity: "",
      deliveryDate: "",
      customMessage: "",
      fragrance: "",
      requirements: "",
    });

    setShowForm(false);
  } else {
    alert(
      result?.message ||
        "Failed to submit customization request."
    );
  }
} catch (error) {
  console.error(error);

  alert(
    "Something went wrong. Please try again."
  );
} finally {
  setLoading(false);
}

};

return (
<>
{/* ======================================================
BANNER
====================================================== */}

  <section className="relative w-full mt-3 sm:mt-5 md:mt-8 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-24">
    <div
      className="
        w-full
        lg:min-h-[500px]
        xl:min-h-[560px]
        flex
        flex-col
        lg:flex-row
        items-center
        justify-between
        gap-8
        sm:gap-10
        lg:gap-12
        xl:gap-20
        overflow-hidden
      "
    >
      {/* IMAGE */}

      <div
        className="
          rounded-[20px]
          relative
          w-full
          sm:w-[90%]
          md:w-[80%]
          lg:w-[48%]
          h-[280px]
          sm:h-[350px]
          md:h-[420px]
          lg:h-[500px]
          xl:h-[560px]
          overflow-hidden
        "
      >
        <Image
          src="/banner-hand.png"
          alt="Custom Candles Available"
          fill
          priority
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 80vw,
            48vw
          "
          className="
            rounded-[20px]
            object-cover
            object-center
            transition-transform
            duration-700
            hover:scale-[1.02]
          "
        />
      </div>

      {/* CONTENT */}

      <div
        className="
          w-full
          sm:w-[90%]
          md:w-[80%]
          lg:w-[45%]
          flex
          flex-col
          items-center
          lg:items-start
          text-center
          lg:text-left
          gap-3
          sm:gap-4
          md:gap-5
          pb-8
          lg:pb-0
        "
      >
        <h4
          className="
            font-medium
            text-[10px]
            sm:text-xs
            md:text-sm
            tracking-[0.2em]
            text-gray-700
          "
        >
          PERSONALISED GIFTING
        </h4>

        <h1
          className="
            font-medium
            text-[22px]
            sm:text-[26px]
            md:text-[30px]
            lg:text-[34px]
            xl:text-[40px]
            leading-tight
            tracking-[0.1em]
            max-w-[500px]
          "
        >
          CUSTOM CANDLES AVAILABLE
        </h1>

        <p
          className="
            max-w-[500px]
            text-[12px]
            sm:text-sm
            md:text-base
            leading-relaxed
            text-gray-600
            font-light
          "
        >
          Make every occasion unforgettable with our
          personalised hidden-message candles. Whether
          it’s a sweet "Happy Rakhi," a special name,
          or a secret note, our handcrafted soy wax
          candles let you express your feelings uniquely.
        </p>

        {/* CUSTOMISE BUTTON */}

        <div className="pt-2 sm:pt-3">
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="
              px-6
              sm:px-7
              md:px-9
              py-2.5
              sm:py-3
              md:py-3.5
              bg-black
              text-white
              text-[10px]
              sm:text-xs
              md:text-sm
              tracking-[0.15em]
              sm:tracking-[0.18em]
              uppercase
              transition-all
              duration-300
              hover:bg-[#C5A880]
              hover:text-black
              active:scale-95
            "
          >
            CUSTOMISE YOURS
          </button>
        </div>
      </div>
    </div>
  </section>

  {/* ======================================================
      CUSTOMIZATION FORM MODAL
  ====================================================== */}

  {showForm && (
    <div
      className="
        fixed
        inset-0
        z-[9999]
        bg-black/60
        backdrop-blur-sm
        flex
        items-center
        justify-center
        p-3
        sm:p-5
      "
      onClick={() => {
        if (!loading) {
          setShowForm(false);
        }
      }}
    >
      <div
        className="
          relative
          w-full
          max-w-2xl
          max-h-[95vh]
          overflow-y-auto
          bg-[#FAF7F2]
          rounded-2xl
          shadow-2xl
          p-5
          sm:p-7
          md:p-9
        "
        onClick={(e) => e.stopPropagation()}
      >
        {/* ==================================================
            CLOSE BUTTON
        ================================================== */}

        <button
          type="button"
          disabled={loading}
          onClick={() => setShowForm(false)}
          className="
            absolute
            top-4
            right-4
            w-9
            h-9
            rounded-full
            bg-black
            text-white
            flex
            items-center
            justify-center
            text-xl
            hover:bg-[#C5A880]
            hover:text-black
            transition-all
            disabled:opacity-50
          "
        >
          ×
        </button>

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="text-center mb-6 pr-8">
          <p
            className="
              text-[9px]
              sm:text-[10px]
              tracking-[0.3em]
              uppercase
              text-[#B08F5A]
              mb-2
            "
          >
            Personalised Gifting
          </p>

          <h2
            className="
              font-serif
              text-2xl
              sm:text-3xl
              text-gray-900
            "
          >
            Customise Your Candle
          </h2>

          <p
            className="
              mt-2
              text-xs
              sm:text-sm
              text-gray-600
            "
          >
            Share your requirements with us and our
            team will contact you shortly.
          </p>
        </div>

        {/* ==================================================
            FORM
        ================================================== */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* NAME + MOBILE */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1.5 text-gray-700">
                Your Name *
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                className="
                  w-full
                  px-4
                  py-3
                  bg-white
                  border
                  border-[#C5A880]/30
                  rounded-lg
                  outline-none
                  text-sm
                  focus:border-[#C5A880]
                "
              />
            </div>

            <div>
              <label className="block text-xs mb-1.5 text-gray-700">
                Mobile Number *
              </label>

              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                maxLength={10}
                pattern="[0-9]{10}"
                placeholder="10 digit mobile number"
                className="
                  w-full
                  px-4
                  py-3
                  bg-white
                  border
                  border-[#C5A880]/30
                  rounded-lg
                  outline-none
                  text-sm
                  focus:border-[#C5A880]
                "
              />
            </div>
          </div>

          {/* EMAIL + OCCASION */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1.5 text-gray-700">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="
                  w-full
                  px-4
                  py-3
                  bg-white
                  border
                  border-[#C5A880]/30
                  rounded-lg
                  outline-none
                  text-sm
                  focus:border-[#C5A880]
                "
              />
            </div>

            <div>
              <label className="block text-xs mb-1.5 text-gray-700">
                Occasion *
              </label>

              <select
                name="occasion"
                value={formData.occasion}
                onChange={handleChange}
                required
                className="
                  w-full
                  px-4
                  py-3
                  bg-white
                  border
                  border-[#C5A880]/30
                  rounded-lg
                  outline-none
                  text-sm
                  focus:border-[#C5A880]
                "
              >
                <option value="">
                  Select occasion
                </option>

                <option value="Birthday">
                  Birthday
                </option>

                <option value="Anniversary">
                  Anniversary
                </option>

                <option value="Wedding">
                  Wedding
                </option>

                <option value="Rakhi">
                  Rakhi
                </option>

                <option value="Diwali">
                  Diwali
                </option>

                <option value="Corporate Gifting">
                  Corporate Gifting
                </option>

                <option value="Baby Shower">
                  Baby Shower
                </option>

                <option value="Proposal">
                  Proposal
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>
          </div>

          {/* QUANTITY + DATE */}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs mb-1.5 text-gray-700">
                Required Quantity *
              </label>

              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                min="1"
                placeholder="Example: 10"
                className="
                  w-full
                  px-4
                  py-3
                  bg-white
                  border
                  border-[#C5A880]/30
                  rounded-lg
                  outline-none
                  text-sm
                  focus:border-[#C5A880]
                "
              />
            </div>

            <div>
              <label className="block text-xs mb-1.5 text-gray-700">
                Required By
              </label>

              <input
                type="date"
                name="deliveryDate"
                value={formData.deliveryDate}
                onChange={handleChange}
                min={
                  new Date()
                    .toISOString()
                    .split("T")[0]
                }
                className="
                  w-full
                  px-4
                  py-3
                  bg-white
                  border
                  border-[#C5A880]/30
                  rounded-lg
                  outline-none
                  text-sm
                  focus:border-[#C5A880]
                "
              />
            </div>
          </div>

          {/* CUSTOM MESSAGE */}

          <div>
            <label className="block text-xs mb-1.5 text-gray-700">
              Custom / Hidden Message *
            </label>

            <textarea
              name="customMessage"
              value={formData.customMessage}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Example: Happy Birthday Mom, With Love..."
              className="
                w-full
                px-4
                py-3
                bg-white
                border
                border-[#C5A880]/30
                rounded-lg
                outline-none
                text-sm
                resize-none
                focus:border-[#C5A880]
              "
            />
          </div>

          {/* FRAGRANCE */}

          <div>
            <label className="block text-xs mb-1.5 text-gray-700">
              Preferred Fragrance
            </label>

            <select
              name="fragrance"
              value={formData.fragrance}
              onChange={handleChange}
              className="
                w-full
                px-4
                py-3
                bg-white
                border
                border-[#C5A880]/30
                rounded-lg
                outline-none
                text-sm
                focus:border-[#C5A880]
              "
            >
              <option value="">
                Select fragrance
              </option>

              <option value="Vanilla">
                Vanilla
              </option>

              <option value="Lavender">
                Lavender
              </option>

              <option value="Rose">
                Rose
              </option>

              <option value="Oud">
                Oud
              </option>

              <option value="Sandalwood">
                Sandalwood
              </option>

              <option value="Citrus">
                Citrus
              </option>

              <option value="Not Sure">
                Not Sure
              </option>
            </select>
          </div>

          {/* ADDITIONAL REQUIREMENTS */}

          <div>
            <label className="block text-xs mb-1.5 text-gray-700">
              Additional Requirements
            </label>

            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={3}
              placeholder="Tell us about colour, packaging, design, gifting requirements, etc."
              className="
                w-full
                px-4
                py-3
                bg-white
                border
                border-[#C5A880]/30
                rounded-lg
                outline-none
                text-sm
                resize-none
                focus:border-[#C5A880]
              "
            />
          </div>

          {/* SUBMIT */}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              py-3.5
              bg-black
              text-white
              text-xs
              sm:text-sm
              uppercase
              tracking-[0.2em]
              rounded-lg
              transition-all
              duration-300
              hover:bg-[#C5A880]
              hover:text-black
              active:scale-[0.98]
              disabled:opacity-60
              disabled:cursor-not-allowed
            "
          >
            {loading
              ? "Submitting..."
              : "Submit Customisation Request"}
          </button>

          <p className="text-[10px] text-center text-gray-500">
            Our team will review your requirement and
            contact you shortly.
          </p>
        </form>
      </div>
    </div>
  )}
</>

);
};

export default Banner;
