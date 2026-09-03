"use client";

import React from "react";

const DynamicAttributeField = ({
  attribute,
  value,
  onChange,
}) => {
  if (!attribute) return null;

  const {
    _id,
    name,
    fieldType,
    unit,
    options = [],
    placeholder,
    requiredField,
  } = attribute;

  const handleChange = (e) => {
    const newValue = e.target.value;

    onChange(_id, newValue);
  };

  // --------------------------------------------------
  // TEXT
  // --------------------------------------------------

  if (fieldType === "text") {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {name}

          {requiredField && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>

        <div className="relative">
          <input
            type="text"
            value={value || ""}
            onChange={handleChange}
            placeholder={placeholder || `Enter ${name}`}
            required={requiredField}
            className={`w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-black ${
              unit ? "pr-16" : ""
            }`}
          />

          {/* UNIT */}
          {unit && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500">
              {unit}
            </span>
          )}
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // SELECT
  // --------------------------------------------------

  if (fieldType === "select") {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {name}

          {requiredField && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>

        <div className="relative">
          <select
            value={value || ""}
            onChange={handleChange}
            required={requiredField}
            className={`w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-black ${
              unit ? "pr-16" : ""
            }`}
          >
            <option value="">
              {placeholder || `Select ${name}`}
            </option>

            {options.map((option, index) => (
              <option
                key={`${_id}-${index}`}
                value={option}
              >
                {option}
              </option>
            ))}
          </select>

          {unit && (
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500">
              {unit}
            </span>
          )}
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // MULTISELECT
  // --------------------------------------------------

  if (fieldType === "multiselect") {
    const selectedValues = Array.isArray(value)
      ? value
      : [];

    const handleMultiSelect = (option) => {
      let updatedValues;

      if (selectedValues.includes(option)) {
        updatedValues = selectedValues.filter(
          (item) => item !== option
        );
      } else {
        updatedValues = [
          ...selectedValues,
          option,
        ];
      }

      onChange(_id, updatedValues);
    };

    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {name}

          {requiredField && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>

        <div className="rounded-lg border border-gray-300 bg-white p-3">

          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {options.map((option, index) => {
              const checked =
                selectedValues.includes(option);

              return (
                <label
                  key={`${_id}-${index}`}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-3 py-2.5 text-sm transition ${
                    checked
                      ? "border-black bg-gray-50"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      handleMultiSelect(option)
                    }
                    className="h-4 w-4 rounded border-gray-300"
                  />

                  <span className="text-gray-700">
                    {option}
                  </span>
                </label>
              );
            })}
          </div>

          {options.length === 0 && (
            <p className="text-sm text-gray-400">
              No options available.
            </p>
          )}
        </div>

        {unit && (
          <p className="text-xs text-gray-500">
            Unit: <span className="font-medium">{unit}</span>
          </p>
        )}
      </div>
    );
  }

  // --------------------------------------------------
  // NUMBER
  // --------------------------------------------------

  if (fieldType === "number") {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {name}

          {requiredField && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>

        <div className="relative">
          <input
            type="number"
            value={value ?? ""}
            onChange={handleChange}
            placeholder={
              placeholder || `Enter ${name}`
            }
            required={requiredField}
            step="any"
            className={`w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black ${
              unit ? "pr-16" : ""
            }`}
          />

          {unit && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500">
              {unit}
            </span>
          )}
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // FALLBACK
  // --------------------------------------------------

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {name}

        {requiredField && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      <input
        type="text"
        value={value || ""}
        onChange={handleChange}
        placeholder={placeholder || `Enter ${name}`}
        required={requiredField}
        className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
      />

      {unit && (
        <p className="text-xs text-gray-500">
          Unit: {unit}
        </p>
      )}
    </div>
  );
};

export default DynamicAttributeField;