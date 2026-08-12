"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  createSubCategory,
  editSubCategorydetailes,
} from "@/app/store/action/subcategoryAction";

import { useCategories } from "@/app/hooks/catgeoryHook";

const SubCategoryForm = ({ editData, onClose, refreshSubCategories }) => {
  const dispatch = useDispatch();

  const { categories, refreshCategories } = useCategories();

  // --------------------------------------------------
  // SUBMITTING
  // --------------------------------------------------
  const [submitting, setSubmitting] = useState(false);

  // --------------------------------------------------
  // SUBCATEGORY DATA
  // --------------------------------------------------
  const [subCategory, setSubCategory] = useState({
    categoryId: "",
    name: "",
    slug: "",
    description: "",
    icon: "",
    image: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    sortOrder: 0,
    isActive: true,
  });

  // --------------------------------------------------
  // IMAGE
  // --------------------------------------------------
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  // --------------------------------------------------
  // FETCH CATEGORIES
  // --------------------------------------------------
  useEffect(() => {
    refreshCategories?.();
  }, []);

  // --------------------------------------------------
  // EDIT MODE
  // --------------------------------------------------
  useEffect(() => {
    if (editData) {
      setSubCategory({
        categoryId: editData?.categoryId?._id || editData?.categoryId || "",

        name: editData?.name || "",

        slug: editData?.slug || "",

        description: editData?.description || "",

        icon: editData?.icon || "",

        image: editData?.image || "",

        metaTitle: editData?.seo?.metaTitle || "",

        metaDescription: editData?.seo?.metaDescription || "",

        keywords: Array.isArray(editData?.seo?.keywords)
          ? editData.seo.keywords.join(", ")
          : "",

        sortOrder: editData?.sortOrder ?? 0,

        isActive: editData?.isActive ?? true,
      });

      // Reset newly selected image
      setImage(null);
      setImageURL(null);
    } else {
      // Reset form when creating
      setSubCategory({
        categoryId: "",
        name: "",
        slug: "",
        description: "",
        icon: "",
        image: "",
        metaTitle: "",
        metaDescription: "",
        keywords: "",
        sortOrder: 0,
        isActive: true,
      });

      setImage(null);
      setImageURL(null);
    }
  }, [editData]);

  // --------------------------------------------------
  // IMAGE PREVIEW
  // --------------------------------------------------
  useEffect(() => {
    if (!image) {
      setImageURL(null);
      return;
    }

    const url = URL.createObjectURL(image);

    setImageURL(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [image]);

  // --------------------------------------------------
  // INPUT CHANGE
  // --------------------------------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSubCategory((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // --------------------------------------------------
  // IMAGE CHANGE
  // --------------------------------------------------
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setImage(file);
  };

  // --------------------------------------------------
  // SUBMIT
  // --------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (submitting) return;

    try {
      setSubmitting(true);

      const formData = new FormData();

      // --------------------------------------------------
      // BASIC INFORMATION
      // --------------------------------------------------
      formData.append("categoryId", subCategory.categoryId);

      formData.append("name", subCategory.name);

      formData.append("slug", subCategory.slug);

      formData.append("description", subCategory.description || "");

      formData.append("icon", subCategory.icon || "");

      // --------------------------------------------------
      // SEO
      // --------------------------------------------------
      formData.append("metaTitle", subCategory.metaTitle || "");

      formData.append("metaDescription", subCategory.metaDescription || "");

      formData.append("keywords", subCategory.keywords || "");

      // --------------------------------------------------
      // SETTINGS
      // --------------------------------------------------
      formData.append("sortOrder", String(subCategory.sortOrder));

      formData.append("isActive", String(subCategory.isActive));

      // --------------------------------------------------
      // IMAGE
      // --------------------------------------------------
      // Only send image when a NEW image is selected.
      //
      // During edit:
      // - no new image = old Cloudinary URL remains
      // - new image = backend uploads new image
      // --------------------------------------------------
      if (image) {
        formData.append("image", image);
      }

      // --------------------------------------------------
      // DEBUG
      // --------------------------------------------------
      console.log("SubCategory FormData:");

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      // --------------------------------------------------
      // UPDATE
      // --------------------------------------------------
      if (editData?._id) {
        await dispatch(editSubCategorydetailes(editData._id, formData));
      }

      // --------------------------------------------------
      // CREATE
      // --------------------------------------------------
      else {
        await dispatch(createSubCategory(formData));
      }

      // --------------------------------------------------
      // REFRESH LIST
      // --------------------------------------------------
      await refreshSubCategories?.();

      // --------------------------------------------------
      // RESET
      // --------------------------------------------------
      setSubCategory({
        categoryId: "",
        name: "",
        slug: "",
        description: "",
        icon: "",
        image: "",
        metaTitle: "",
        metaDescription: "",
        keywords: "",
        sortOrder: 0,
        isActive: true,
      });

      setImage(null);
      setImageURL(null);

      // --------------------------------------------------
      // CLOSE
      // --------------------------------------------------
      onClose?.();
    } catch (error) {
      console.error("SubCategory save failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // --------------------------------------------------
  // INPUT CLASS
  // --------------------------------------------------
  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-[#5C4033] focus:ring-2 focus:ring-[#5C4033]/10";

  // --------------------------------------------------
  // IMAGE TO DISPLAY
  // --------------------------------------------------
  const previewImage = imageURL || editData?.image || "";

  // --------------------------------------------------
  // UI
  // --------------------------------------------------
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl p-3">
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* ==========================================
              BASIC INFORMATION
          ========================================== */}

          <div>
            <div className="grid md:grid-cols-3 gap-4">
              {/* CATEGORY */}
              <select
                name="categoryId"
                value={subCategory.categoryId}
                onChange={handleChange}
                className={inputClass}
                required
                disabled={submitting}
              >
                <option value="">Select Category</option>

                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              {/* NAME */}
              <input
                type="text"
                name="name"
                value={subCategory.name}
                onChange={handleChange}
                placeholder="Subcategory Name"
                className={inputClass}
                required
                disabled={submitting}
              />

              {/* SLUG */}
              <input
                type="text"
                name="slug"
                value={subCategory.slug}
                onChange={handleChange}
                placeholder="Slug"
                className={inputClass}
                required
                disabled={submitting}
              />
            </div>

            {/* ==========================================
                IMAGE
            ========================================== */}

            <div className="mt-5">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Subcategory Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border rounded-lg p-2"
                disabled={submitting}
              />

              {/* IMAGE PREVIEW */}
              {previewImage && (
                <div className="mt-3">
                  <img
                    src={previewImage}
                    alt={subCategory.name || "Subcategory"}
                    className="w-32 h-32 object-cover rounded-lg border"
                  />

                  {image && (
                    <p className="text-xs text-green-600 mt-1">
                      New image selected
                    </p>
                  )}

                  {!image && editData?.image && (
                    <p className="text-xs text-gray-500 mt-1">Current image</p>
                  )}
                </div>
              )}
            </div>

            {/* DESCRIPTION */}
            <textarea
              name="description"
              rows={3}
              value={subCategory.description}
              onChange={handleChange}
              placeholder="Sub category description..."
              className={`${inputClass} mt-4`}
              disabled={submitting}
            />
          </div>

          {/* ==========================================
              SEO
          ========================================== */}

          <div>
            <h3 className="text-md font-semibold mb-4 border-b pb-2">
              SEO Information
            </h3>

            <div className="grid md:grid-cols-3 gap-2">
              {/* META TITLE */}
              <input
                type="text"
                name="metaTitle"
                value={subCategory.metaTitle}
                onChange={handleChange}
                placeholder="Meta Title"
                className={inputClass}
                disabled={submitting}
              />

              {/* META DESCRIPTION */}
              <input
                type="text"
                name="metaDescription"
                value={subCategory.metaDescription}
                onChange={handleChange}
                placeholder="Meta Description"
                className={inputClass}
                disabled={submitting}
              />

              {/* KEYWORDS */}
              <input
                type="text"
                name="keywords"
                value={subCategory.keywords}
                onChange={handleChange}
                placeholder="keyword1, keyword2"
                className={inputClass}
                disabled={submitting}
              />
            </div>
          </div>

          {/* ==========================================
              SETTINGS
          ========================================== */}

          <div>
            <h3 className="text-md font-semibold mb-4 border-b pb-2">
              Settings
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {/* SORT ORDER */}
              <input
                type="number"
                name="sortOrder"
                value={subCategory.sortOrder}
                onChange={handleChange}
                className={inputClass}
                disabled={submitting}
              />

              {/* ACTIVE */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={subCategory.isActive}
                  onChange={handleChange}
                  disabled={submitting}
                  className="h-4 w-4"
                />

                <label>Active Sub Category</label>
              </div>
            </div>
          </div>

          {/* ==========================================
              SUBMIT
          ========================================== */}

          <div className="flex justify-end text-end">
            <button
              type="submit"
              disabled={submitting}
              className="
                cursor-pointer
                px-8
                py-1.5
                rounded-xl
                adminpanel
                text-white
                font-semibold
                shadow-md
                hover:bg-[#4A3227]
                transition-all
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {submitting
                ? editData
                  ? "Updating..."
                  : "Creating..."
                : editData
                  ? "Update Sub Category"
                  : "Create Sub Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubCategoryForm;
