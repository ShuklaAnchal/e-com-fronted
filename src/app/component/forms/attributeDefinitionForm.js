"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { useCategories } from "@/app/hooks/catgeoryHook";

import { fetchSubcategorybyCategoryID } from "@/app/store/action/subcategoryAction";

import {
  createNewAttribute,
  updateAttributeDetails,
} from "@/app/store/action/attributeAction";

const CreateAttribute = ({
  editData = null,
  onClose,
  refreshAttributes,
}) => {
  const dispatch = useDispatch();

  const { categories } = useCategories();

  // ==================================================
  // INITIAL FORM
  // ==================================================

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

  // ==================================================
  // SUBCATEGORIES
  // ==================================================

  const [subcategories, setSubcategories] = useState([]);
  const [loadingSubcategories, setLoadingSubcategories] = useState(false);

  // ==================================================
  // OPTIONS
  // ==================================================

  const [options, setOptions] = useState([]);

  // ==================================================
  // LOADING
  // ==================================================

  const [loading, setLoading] = useState(false);

  // ==================================================
  // FETCH SUBCATEGORIES
  // ==================================================

  const loadSubcategories = useCallback(
    async (categoryId) => {
      if (!categoryId) {
        setSubcategories([]);
        return;
      }

      try {
        setLoadingSubcategories(true);

        const result = await dispatch(
          fetchSubcategorybyCategoryID(categoryId),
        );

        console.log("Subcategories response:", result);

        if (result?.success && Array.isArray(result?.subcategories)) {
          setSubcategories(result.subcategories);
        } else if (Array.isArray(result?.subcategories)) {
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
    },
    [dispatch],
  );

  // ==================================================
  // CATEGORY CHANGE
  // ==================================================

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;

    // Update category
    // Reset subcategory because category changed
    setForm((prev) => ({
      ...prev,
      categoryId,
      subCategoryId: "",
    }));

    // Remove previous subcategories
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

    // Clear options if field type is not select/multiselect
    if (
      name === "fieldType" &&
      value !== "select" &&
      value !== "multiselect"
    ) {
      setOptions([]);
    }
  };

  // ==================================================
  // NAME CHANGE
  // ==================================================

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

  // ==================================================
  // OPTIONS
  // ==================================================

  const addOption = () => {
    setOptions((prev) => [...prev, ""]);
  };

  const updateOption = (index, value) => {
    setOptions((prev) => {
      const updated = [...prev];

      updated[index] = value;

      return updated;
    });
  };

  const removeOption = (index) => {
    setOptions((prev) =>
      prev.filter((_, optionIndex) => optionIndex !== index),
    );
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

    // ----------------------------------------------
    // Get Category ID
    // ----------------------------------------------

    const categoryId =
      editData?.categoryId?._id ||
      editData?.categoryId ||
      "";

    // ----------------------------------------------
    // Get Subcategory ID
    // ----------------------------------------------

    const subCategoryId =
      editData?.subCategoryId?._id ||
      editData?.subCategoryId ||
      "";

    // ----------------------------------------------
    // Populate form
    // ----------------------------------------------

    setForm({
      categoryId,

      // If null -> ""
      // This means "All Subcategories"
      subCategoryId: subCategoryId || "",

      name: editData?.name || "",

      slug: editData?.slug || "",

      fieldType: editData?.fieldType || "",

      unit: editData?.unit || "",

      placeholder: editData?.placeholder || "",

      requiredField: editData?.requiredField ?? false,

      filterable: editData?.filterable ?? false,

      searchable: editData?.searchable ?? false,

      isVariantAttribute:
        editData?.isVariantAttribute ?? false,

      sortOrder: editData?.sortOrder ?? 0,

      isActive: editData?.isActive ?? true,
    });

    // ----------------------------------------------
    // Existing options
    // ----------------------------------------------

    if (
      editData?.fieldType === "select" ||
      editData?.fieldType === "multiselect"
    ) {
      setOptions(
        Array.isArray(editData?.options)
          ? editData.options
          : [],
      );
    } else {
      setOptions([]);
    }

    // ----------------------------------------------
    // Load subcategories
    // ----------------------------------------------

    if (categoryId) {
      loadSubcategories(categoryId);
    }
  }, [editData, loadSubcategories]);

  // ==================================================
  // SUBMIT
  // ==================================================

  const submitHandler = async (e) => {
    e.preventDefault();

    if (loading) return;

    // ----------------------------------------------
    // Basic validation
    // ----------------------------------------------

    if (!form.categoryId) {
      alert("Please select a category");
      return;
    }

    if (!form.name.trim()) {
      alert("Please enter attribute name");
      return;
    }

    if (!form.fieldType) {
      alert("Please select field type");
      return;
    }

    // ----------------------------------------------
    // Select options validation
    // ----------------------------------------------

    if (
      form.fieldType === "select" ||
      form.fieldType === "multiselect"
    ) {
      const cleanedOptions = options
        .map((item) => item.trim())
        .filter(Boolean);

      if (cleanedOptions.length === 0) {
        alert("Please add at least one option");
        return;
      }
    }

    try {
      setLoading(true);

      // ----------------------------------------------
      // Prepare options
      // ----------------------------------------------

      const cleanedOptions =
        form.fieldType === "select" ||
        form.fieldType === "multiselect"
          ? options
              .map((item) => item.trim())
              .filter(Boolean)
          : [];

      // ----------------------------------------------
      // Prepare payload
      // ----------------------------------------------

      const payload = {
        categoryId: form.categoryId,

        // Empty subcategory means:
        // Attribute applies to all subcategories
        subCategoryId: form.subCategoryId || null,

        name: form.name.trim(),

        slug: form.slug.trim(),

        fieldType: form.fieldType,

        options: cleanedOptions,

        unit: form.unit?.trim() || "",

        placeholder: form.placeholder?.trim() || "",

        requiredField: Boolean(form.requiredField),

        filterable: Boolean(form.filterable),

        searchable: Boolean(form.searchable),

        isVariantAttribute: Boolean(
          form.isVariantAttribute,
        ),

        sortOrder: Number(form.sortOrder) || 0,

        isActive: Boolean(form.isActive),
      };

      console.log("Attribute payload:", payload);

      let result;

      // ==================================================
      // UPDATE
      // ==================================================

      if (editData?._id) {
        result = await dispatch(
          updateAttributeDetails(
            editData._id,
            payload,
          ),
        );
      }

      // ==================================================
      // CREATE
      // ==================================================

      else {
        result = await dispatch(
          createNewAttribute(payload),
        );
      }

      console.log("Attribute result:", result);

      // ==================================================
      // SUCCESS
      // ==================================================

      if (result?.success) {
        alert(
          editData
            ? "Attribute updated successfully"
            : "Attribute created successfully",
        );

        // Reset
        setForm(initialForm);
        setOptions([]);
        setSubcategories([]);

        // Refresh attribute list
        if (refreshAttributes) {
          await refreshAttributes();
        }

        // Close modal/form
        if (onClose) {
          onClose();
        }
      }

      // ==================================================
      // ERROR
      // ==================================================

      else {
        alert(
          result?.message ||
            "Something went wrong",
        );
      }
    } catch (error) {
      console.error(
        "Attribute save failed:",
        error,
      );

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  // ==================================================
  // INPUT CLASS
  // ==================================================

  const inputClass =
    "border p-2 w-full rounded-lg";

  // ==================================================
  // UI
  // ==================================================

  return (
    <div className="max-w-xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">
        {editData
          ? "Update Attribute"
          : "Create Attribute"}
      </h1>

      <form
        onSubmit={submitHandler}
        className="space-y-4"
      >
        {/* ==================================================
            CATEGORY
        ================================================== */}

        <div>
          <label className="block font-medium mb-1">
            Category
          </label>

          <select
            className={inputClass}
            value={form.categoryId}
            onChange={handleCategoryChange}
            required
            disabled={loading}
          >
            <option value="">
              Select Category
            </option>

            {categories?.map((cat) => (
              <option
                key={cat._id}
                value={cat._id}
              >
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* ==================================================
            SUBCATEGORY
        ================================================== */}

        <div>
          <label className="block font-medium mb-1">
            Sub Category
          </label>

          <select
            className={inputClass}
            name="subCategoryId"
            value={form.subCategoryId}
            onChange={handleChange}
            disabled={
              loading ||
              loadingSubcategories ||
              !form.categoryId
            }
          >
            <option value="">
              {loadingSubcategories
                ? "Loading Subcategories..."
                : "All Subcategories"}
            </option>

            {subcategories?.map((sub) => (
              <option
                key={sub._id}
                value={sub._id}
              >
                {sub.name}
              </option>
            ))}
          </select>

          <p className="text-sm text-gray-500 mt-1">
            Select "All Subcategories" if this
            attribute applies to the entire category.
          </p>
        </div>

        {/* ==================================================
            NAME
        ================================================== */}

        <div>
          <label className="block font-medium mb-1">
            Attribute Name
          </label>

          <input
            className={inputClass}
            placeholder="e.g. Brand, Flavor, Weight"
            value={form.name}
            onChange={handleNameChange}
            required
            disabled={loading}
          />
        </div>

        {/* ==================================================
            SLUG
        ================================================== */}

        <div>
          <label className="block font-medium mb-1">
            Slug
          </label>

          <input
            className={inputClass}
            placeholder="attribute-slug"
            name="slug"
            value={form.slug}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>

        {/* ==================================================
            FIELD TYPE
        ================================================== */}

        <div>
          <label className="block font-medium mb-1">
            Field Type
          </label>

          <select
            className={inputClass}
            name="fieldType"
            value={form.fieldType}
            onChange={handleChange}
            required
            disabled={loading}
          >
            <option value="">
              Select Field Type
            </option>

            <option value="text">
              Text
            </option>

            <option value="textarea">
              Textarea
            </option>

            <option value="number">
              Number
            </option>

            <option value="boolean">
              Boolean
            </option>

            <option value="select">
              Select
            </option>

            <option value="multiselect">
              Multi Select
            </option>

            <option value="date">
              Date
            </option>
          </select>
        </div>

        {/* ==================================================
            OPTIONS
        ================================================== */}

        {(form.fieldType === "select" ||
          form.fieldType === "multiselect") && (
          <div>
            <p className="font-semibold mb-2">
              Options
            </p>

            {options.map((item, index) => (
              <div
                key={index}
                className="flex gap-2 mb-2"
              >
                <input
                  className={`${inputClass} flex-1`}
                  value={item}
                  placeholder={`Option ${index + 1}`}
                  onChange={(e) =>
                    updateOption(
                      index,
                      e.target.value,
                    )
                  }
                  disabled={loading}
                />

                <button
                  type="button"
                  onClick={() =>
                    removeOption(index)
                  }
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

        {/* ==================================================
            UNIT
        ================================================== */}

        <div>
          <label className="block font-medium mb-1">
            Unit
          </label>

          <input
            className={inputClass}
            placeholder="e.g. kg, cm, inch"
            name="unit"
            value={form.unit}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* ==================================================
            PLACEHOLDER
        ================================================== */}

        <div>
          <label className="block font-medium mb-1">
            Placeholder
          </label>

          <input
            className={inputClass}
            placeholder="Enter placeholder text"
            name="placeholder"
            value={form.placeholder}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* ==================================================
            SORT ORDER
        ================================================== */}

        <div>
          <label className="block font-medium mb-1">
            Sort Order
          </label>

          <input
            type="number"
            className={inputClass}
            placeholder="Sort Order"
            name="sortOrder"
            value={form.sortOrder}
            onChange={handleChange}
            disabled={loading}
            min="0"
          />
        </div>

        {/* ==================================================
            FLAGS
        ================================================== */}

        <div className="space-y-3">

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="requiredField"
              checked={form.requiredField}
              onChange={handleChange}
              disabled={loading}
            />

            <span>Required Field</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="filterable"
              checked={form.filterable}
              onChange={handleChange}
              disabled={loading}
            />

            <span>Filterable</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="searchable"
              checked={form.searchable}
              onChange={handleChange}
              disabled={loading}
            />

            <span>Searchable</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isVariantAttribute"
              checked={form.isVariantAttribute}
              onChange={handleChange}
              disabled={loading}
            />

            <span>Variant Attribute</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isActive"
              checked={form.isActive}
              onChange={handleChange}
              disabled={loading}
            />

            <span>Active Attribute</span>
          </label>

        </div>

        {/* ==================================================
            SUBMIT
        ================================================== */}

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