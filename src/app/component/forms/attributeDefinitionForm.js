"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useCategories } from "@/app/hooks/catgeoryHook";

import { fetchSubcategorybyCategoryID } from "@/app/store/action/subcategoryAction";

import {
  createNewAttribute,
  updateAttributeDetails,
} from "@/app/store/action/attributeAction";

const CreateAttribute = ({ editData = null, onClose, refreshAttributes }) => {
  const dispatch = useDispatch();

  const { categories } = useCategories();

  // --------------------------------------------------
  // INITIAL FORM
  // --------------------------------------------------

  const initialForm = {
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
  };

  const [form, setForm] = useState(initialForm);

  // --------------------------------------------------
  // SUBCATEGORIES
  // --------------------------------------------------

  const [subcategories, setSubcategories] = useState([]);

  const [loadingSubcategories, setLoadingSubcategories] = useState(false);

  // --------------------------------------------------
  // OPTIONS
  // --------------------------------------------------

  const [options, setOptions] = useState([]);

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  const [loading, setLoading] = useState(false);

  // ==================================================
  // FETCH SUBCATEGORIES BY CATEGORY
  // ==================================================

  const loadSubcategories = async (categoryId) => {
    if (!categoryId) {
      setSubcategories([]);
      return;
    }

    try {
      setLoadingSubcategories(true);

      const result = await dispatch(fetchSubcategorybyCategoryID(categoryId));

      console.log("Subcategories response:", result);

      if (result?.subcategories) {
        setSubcategories(result.subcategories);
      } else {
        setSubcategories([]);
      }
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);

      setSubcategories([]);
    } finally {
      setLoadingSubcategories(false);
    }
  };

  // ==================================================
  // CATEGORY CHANGE
  // ==================================================

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;

    // Update category and clear previous subcategory
    setForm((prev) => ({
      ...prev,
      categoryId,
      subCategoryId: "",
    }));

    // Clear old subcategories immediately
    setSubcategories([]);

    // Fetch new subcategories
    if (categoryId) {
      await loadSubcategories(categoryId);
    }
  };

  // ==================================================
  // INPUT CHANGE
  // ==================================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,

      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ==================================================
  // NAME CHANGE
  // ==================================================

  const handleNameChange = (e) => {
    const value = e.target.value;

    setForm((prev) => ({
      ...prev,

      name: value,

      slug: value.toLowerCase().trim().replace(/\s+/g, "-"),
    }));
  };

  // ==================================================
  // OPTIONS
  // ==================================================

  const addOption = () => {
    setOptions((prev) => [...prev, ""]);
  };

  const updateOption = (index, value) => {
    setOptions((prev) => {
      const temp = [...prev];

      temp[index] = value;

      return temp;
    });
  };

  const removeOption = (index) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  // ==================================================
  // EDIT MODE
  // ==================================================

  useEffect(() => {
    if (!editData) {
      setForm(initialForm);
      setOptions([]);
      setSubcategories([]);

      return;
    }

    const categoryId = editData?.categoryId?._id || editData?.categoryId || "";

    const subCategoryId =
      editData?.subCategoryId?._id || editData?.subCategoryId || "";

    // Populate form
    setForm({
      categoryId,

      subCategoryId,

      name: editData?.name || "",

      slug: editData?.slug || "",

      fieldType: editData?.fieldType || "",

      unit: editData?.unit || "",

      placeholder: editData?.placeholder || "",

      requiredField: editData?.requiredField ?? false,

      filterable: editData?.filterable ?? false,

      searchable: editData?.searchable ?? false,

      isVariantAttribute: editData?.isVariantAttribute ?? false,

      sortOrder: editData?.sortOrder ?? 0,

      isActive: editData?.isActive ?? true,
    });

    // Existing options
    if (
      editData?.fieldType === "select" ||
      editData?.fieldType === "multiselect"
    ) {
      setOptions(Array.isArray(editData?.options) ? editData.options : []);
    } else {
      setOptions([]);
    }

    // Fetch subcategories for existing category
    if (categoryId) {
      loadSubcategories(categoryId);
    }
  }, [editData]);

  // ==================================================
  // SUBMIT
  // ==================================================

  const submitHandler = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const payload = {
        ...form,

        sortOrder: Number(form.sortOrder) || 0,

        options:
          form.fieldType === "select" || form.fieldType === "multiselect"
            ? options.map((item) => item.trim()).filter(Boolean)
            : [],
      };

      console.log("Attribute payload:", payload);

      let result;

      // UPDATE
      if (editData?._id) {
        result = await dispatch(updateAttributeDetails(editData._id, payload));
      }

      // CREATE
      else {
        result = await dispatch(createNewAttribute(payload));
      }

      console.log("Attribute result:", result);

      if (result?.success) {
        alert(
          editData
            ? "Attribute updated successfully"
            : "Attribute created successfully",
        );

        setForm(initialForm);
        setOptions([]);
        setSubcategories([]);

        await refreshAttributes?.();

        onClose?.();
      } else {
        alert(result?.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Attribute save failed:", error);

      alert(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // INPUT CLASS
  // ==================================================

  const inputClass = "border p-2 w-full rounded-lg";

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="max-w-xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">
        {editData ? "Update Attribute" : "Create Attribute"}
      </h1>

      <form onSubmit={submitHandler} className="space-y-4">
        {/* ==========================================
            CATEGORY
        ========================================== */}

        <select
          className={inputClass}
          value={form.categoryId}
          onChange={handleCategoryChange}
          required
          disabled={loading}
        >
          <option value="">Select Category</option>

          {categories?.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* ==========================================
            SUBCATEGORY
        ========================================== */}

        <select
          className={inputClass}
          name="subCategoryId"
          value={form.subCategoryId}
          onChange={handleChange}
          disabled={loading || loadingSubcategories || !form.categoryId}
          required
        >
          <option value="">
            {loadingSubcategories
              ? "Loading Subcategories..."
              : "Select Sub Category"}
          </option>

          {subcategories?.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>

        {/* ==========================================
            NAME
        ========================================== */}

        <input
          className={inputClass}
          placeholder="Attribute Name"
          value={form.name}
          onChange={handleNameChange}
          required
          disabled={loading}
        />

        {/* ==========================================
            SLUG
        ========================================== */}

        <input
          className={inputClass}
          placeholder="Slug"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          required
          disabled={loading}
        />

        {/* ==========================================
            FIELD TYPE
        ========================================== */}

        <select
          className={inputClass}
          name="fieldType"
          value={form.fieldType}
          onChange={handleChange}
          required
          disabled={loading}
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

        {/* ==========================================
            OPTIONS
        ========================================== */}

        {(form.fieldType === "select" || form.fieldType === "multiselect") && (
          <div>
            <p className="font-semibold mb-2">Options</p>

            {options.map((item, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  className={`${inputClass} flex-1`}
                  value={item}
                  placeholder={`Option ${index + 1}`}
                  onChange={(e) => updateOption(index, e.target.value)}
                  disabled={loading}
                />

                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  className="bg-red-500 text-white px-3 rounded"
                  disabled={loading}
                >
                  Remove
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addOption}
              className="bg-gray-200 px-3 py-1 rounded"
              disabled={loading}
            >
              + Add Option
            </button>
          </div>
        )}

        {/* ==========================================
            UNIT
        ========================================== */}

        <input
          className={inputClass}
          placeholder="Unit (kg, cm, inch)"
          name="unit"
          value={form.unit}
          onChange={handleChange}
          disabled={loading}
        />

        {/* ==========================================
            PLACEHOLDER
        ========================================== */}

        <input
          className={inputClass}
          placeholder="Placeholder"
          name="placeholder"
          value={form.placeholder}
          onChange={handleChange}
          disabled={loading}
        />

        {/* ==========================================
            SORT ORDER
        ========================================== */}

        <input
          type="number"
          className={inputClass}
          placeholder="Sort Order"
          name="sortOrder"
          value={form.sortOrder}
          onChange={handleChange}
          disabled={loading}
        />

        {/* ==========================================
            FLAGS
        ========================================== */}

        <div className="space-y-2">
          <label className="block">
            <input
              type="checkbox"
              name="requiredField"
              checked={form.requiredField}
              onChange={handleChange}
              disabled={loading}
            />{" "}
            Required Field
          </label>

          <label className="block">
            <input
              type="checkbox"
              name="filterable"
              checked={form.filterable}
              onChange={handleChange}
              disabled={loading}
            />{" "}
            Filterable
          </label>

          <label className="block">
            <input
              type="checkbox"
              name="searchable"
              checked={form.searchable}
              onChange={handleChange}
              disabled={loading}
            />{" "}
            Searchable
          </label>

          <label className="block">
            <input
              type="checkbox"
              name="isVariantAttribute"
              checked={form.isVariantAttribute}
              onChange={handleChange}
              disabled={loading}
            />{" "}
            Variant Attribute
          </label>

          <label className="block">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              disabled={loading}
            />{" "}
            Active Attribute
          </label>
        </div>

        {/* ==========================================
            SUBMIT
        ========================================== */}

        <button
          type="submit"
          disabled={loading}
          className="
            bg-blue-600
            text-white
            px-5
            py-2
            rounded
            disabled:opacity-50
            disabled:cursor-not-allowed
          "
        >
          {loading
            ? editData
              ? "Updating..."
              : "Creating..."
            : editData
              ? "Update Attribute"
              : "Create Attribute"}
        </button>
      </form>
    </div>
  );
};

export default CreateAttribute;
