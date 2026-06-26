"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import {
  createCategory,
  editCategorydetailes,
} from "@/app/store/action/categoryAction";

const CategoryForm = ({ editData, onClose, refreshCategories }) => {
  const dispatch = useDispatch();

  const [submitting, setSubmitting] = useState(false);

  const [category, setCategory] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "",
    image: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    sortOrder: 0,
    active: true,
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editData) {
      setCategory({
        name: editData?.name || "",
        slug: editData?.slug || "",
        description: editData?.description || "",
        icon: editData?.icon || "",
        image: editData?.image || "",
        metaTitle: editData?.seo?.metaTitle || "",
        metaDescription: editData?.seo?.metaDescription || "",
        keywords: editData?.seo?.keywords?.join(", ") || "",
        sortOrder: editData?.sortOrder || 0,
        active: editData?.active ?? true,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCategory((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files?.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("name", category.name);
      formData.append("slug", category.slug);
      formData.append("description", category.description);
      formData.append("icon", category.icon);

      formData.append("metaTitle", category.metaTitle);
      formData.append("metaDescription", category.metaDescription);
      formData.append("keywords", category.keywords);

      formData.append("sortOrder", String(category.sortOrder));
      formData.append("active", String(category.active));

      if (image) {
        formData.append("image", image);
      }

      if (editData?._id) {
        await dispatch(editCategorydetailes(editData._id, formData));
      } else {
        await dispatch(createCategory(formData));
      }

      await refreshCategories?.();

      onClose?.();
    } catch (error) {
      console.error("Category save failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl text-[15px] font-normal border border-gray-300 px-4 py-1.5 outline-none transition-all duration-200 focus:border-[#5C4033] focus:ring-4 focus:ring-[#5C4033]/10";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl p-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div>
            <div className="grid md:grid-cols-3 gap-4">
              <input
                type="text"
                name="name"
                value={category.name}
                onChange={handleChange}
                placeholder="Category Name"
                className={inputClass}
                required
              />

              <input
                type="text"
                name="slug"
                value={category.slug}
                onChange={handleChange}
                placeholder="category-slug"
                className={inputClass}
                required
              />

              {/* Media */}
              <div>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full"
                  />
                </div>

                {(image || editData?.image) && (
                  <div className="mt-2">
                    <img
                      src={image ? URL.createObjectURL(image) : editData?.image}
                      alt="preview"
                      className="w-32 h-10 object-cover rounded-xl border"
                    />
                  </div>
                )}

                {/* <input
              type="text"
              name="icon"
              value={category.icon}
              onChange={handleChange}
              placeholder="Icon Class"
              className={`${inputClass} mt-4`}
            /> */}
              </div>
            </div>

            <textarea
              name="description"
              rows={2}
              value={category.description}
              onChange={handleChange}
              placeholder="Category Description"
              className={`${inputClass} mt-4`}
            />
          </div>

          {/* SEO */}
          <div>
            <div className="border-b border-gray-200 pb-3 mb-5 ">
              <h3 className="text-md font-semibold text-gray-800">
                SEO Information
              </h3>
            </div>

            <div className="space-y-3">
              <div className="grid md:grid-cols-3 gap-2">
                <input
                  type="text"
                  name="metaTitle"
                  value={category.metaTitle}
                  onChange={handleChange}
                  placeholder="Meta Title"
                  className={inputClass}
                />

                <input
                  type="text"
                  name="metaDescription"
                  value={category.metaDescription}
                  onChange={handleChange}
                  placeholder="Meta Description"
                  className={inputClass}
                />
                   <input
                type="text"
                name="keywords"
                value={category.keywords}
                onChange={handleChange}
                placeholder="keyword1, keyword2, keyword3"
                className={inputClass}
              />
              </div>

        
            </div>
          </div>

          {/* Settings */}
          <div>
            <div className="border-b border-gray-200 pb-3 mb-5">
              <h3 className="text-md font-semibold text-gray-800">Settings</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 items-center">
              <input
                type="number"
                name="sortOrder"
                value={category.sortOrder}
                onChange={handleChange}
                className={inputClass}
              />

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="active"
                  checked={category.active}
                  onChange={handleChange}
                  className="h-5 w-5"
                />

                <span className="font-medium text-gray-700">
                  Active Category
                </span>
              </label>
            </div>
          </div>

          {/* Submit */}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className=" cursor-pointer
                px-8 py-1.5
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
                ? "Saving..."
                : editData
                  ? "Update Category"
                  : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
