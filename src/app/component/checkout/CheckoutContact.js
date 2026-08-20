"use client";

import React from "react";

export default function ContactInformation({
  formData,
  onChange,
}) {
  return (
    <section className="bg-[#FAF7F2] border border-luxury-gold/20 p-5 sm:p-6 md:p-8">

      <div className="mb-7">
        <p className="text-[10px] uppercase tracking-[0.25em] text-luxury-gold mb-2">
          Step 01
        </p>

        <h2 className="font-serif text-2xl text-luxury-dark uppercase tracking-[0.08em]">
          Contact Information
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

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
          placeholder="Enter mobile number"
          type="tel"
          inputMode="numeric"
          required
        />

      </div>
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