"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { useCategories } from "@/app/hooks/catgeoryHook";
import { useSubcategories } from "@/app/hooks/subcategoryHook";

import { createNewAttribute } from "@/app/store/action/attributeAction";

const CreateAttribute = () => {
  const dispatch = useDispatch();

  const { categories } = useCategories();

  const { Subcategories, fetchSubcategories } = useSubcategories();

  const [form, setForm] = useState({
    categoryId: "",
    subCategoryId: "",
    name: "",
    slug: "",
    fieldType: "",
    unit: "",
    placeholder: "",
    requiredField: false,
    filterable: false,
    searchable: false,
    isVariantAttribute: false,

    sortOrder: 0,

    isActive: true,
  });

  const [options, setOptions] = useState([]);

  // Category Change

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;

    setForm((prev) => ({
      ...prev,
      categoryId,
      subCategoryId: "",
    }));

    if (categoryId) {
      fetchSubcategories(categoryId);
    }
  };

  // Input Change

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Auto Slug

  const handleNameChange = (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,
      name: value,
      slug: value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-"),
    }));
  };

  // Options

  const addOption = () => {
    setOptions((prev) => [...prev, ""]);
  };

  const updateOption = (index, value) => {
    const temp = [...options];
    temp[index] = value;
    setOptions(temp);
  };

  const removeOption = (index) => {
    const temp = [...options];
    temp.splice(index, 1);
    setOptions(temp);
  };

  // Submit

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      sortOrder: Number(form.sortOrder),
      options:
        form.fieldType === "select" || form.fieldType === "multiselect"
          ? options.filter((item) => item.trim() !== "")
          : [],
    };

    const result = await dispatch(createNewAttribute(payload));

    if (result.success) {
      alert("Attribute created successfully");

      setForm({
        categoryId: "",
        subCategoryId: "",
        name: "",
        slug: "",
        fieldType: "",
        unit: "",
        placeholder: "",
        requiredField: false,
        filterable: false,
        searchable: false,
        isVariantAttribute: false,
        sortOrder: 0,
        isActive: true,
      });

      setOptions([]);
    } else {
      alert(result.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Create Attribute</h1>

      <form onSubmit={submitHandler} className="space-y-4">
        {/* Category */}

        <select
          className="border p-2 w-full"
          value={form.categoryId}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>

          {categories?.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Sub Category */}

        <select
          className="border p-2 w-full"
          name="subCategoryId"
          value={form.subCategoryId}
          onChange={handleChange}
        >
          <option value="">Select Sub Category</option>

          {Subcategories?.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>

        {/* Name */}

        <input
          className="border p-2 w-full"
          placeholder="Attribute Name"
          value={form.name}
          onChange={handleNameChange}
        />

        {/* Slug */}

        <input
          className="border p-2 w-full"
          placeholder="Slug"
          name="slug"
          value={form.slug}
          onChange={handleChange}
        />

        {/* Field Type */}

        <select
          className="border p-2 w-full"
          name="fieldType"
          value={form.fieldType}
          onChange={handleChange}
        >
          <option value="">Select Field Type</option>

          <option value="text">Text</option>

          <option value="textarea">Textarea</option>

          <option value="number">Number</option>

          <option value="boolean">Boolean</option>

          <option value="select">Select</option>

          <option value="multiselect">Multi Select</option>

          <option value="date">Date</option>
        </select>

        {/* Options */}

        {(form.fieldType === "select" || form.fieldType === "multiselect") && (
          <div>
            <p className="font-semibold">Options</p>

            {options.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  className="border p-2 flex-1"
                  value={item}
                  onChange={(e) => updateOption(index, e.target.value)}
                />

                <button type="button" onClick={() => removeOption(index)}>
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addOption}
              className="bg-gray-200 px-3 py-1"
            >
              + Add Option
            </button>
          </div>
        )}

        <input
          className="border p-2 w-full"
          placeholder="Unit (kg, cm, inch)"
          name="unit"
          value={form.unit}
          onChange={handleChange}
        />

        <input
          className="border p-2 w-full"
          placeholder="Placeholder"
          name="placeholder"
          value={form.placeholder}
          onChange={handleChange}
        />

        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Sort Order"
          name="sortOrder"
          value={form.sortOrder}
          onChange={handleChange}
        />

        {/* Flags */}

        <div className="space-y-2">
          <label className="block">
            <input
              type="checkbox"
              name="requiredField"
              checked={form.requiredField}
              onChange={handleChange}
            />
            Required Field
          </label>

          <label className="block">
            <input
              type="checkbox"
              name="filterable"
              checked={form.filterable}
              onChange={handleChange}
            />
            Filterable
          </label>

          <label className="block">
            <input
              type="checkbox"
              name="searchable"
              checked={form.searchable}
              onChange={handleChange}
            />
            Searchable
          </label>

          <label className="block">
            <input
              type="checkbox"
              name="isVariantAttribute"
              checked={form.isVariantAttribute}
              onChange={handleChange}
            />
            Variant Attribute
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Create Attribute
        </button>
      </form>
    </div>
  );
};

export default CreateAttribute;

