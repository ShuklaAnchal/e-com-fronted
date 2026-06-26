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

  const [image, setImage] = useState(null);

  useEffect(() => {
    refreshCategories?.();
  }, []);

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
        sortOrder: editData?.sortOrder || 0,
        isActive: editData?.isActive ?? true,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSubCategory((prev) => ({
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
      const formData = new FormData();

      formData.append("categoryId", subCategory.categoryId);
      formData.append("name", subCategory.name);
      formData.append("slug", subCategory.slug);
      formData.append("description", subCategory.description);
      formData.append("icon", subCategory.icon);

      formData.append("metaTitle", subCategory.metaTitle);
      formData.append("metaDescription", subCategory.metaDescription);
      formData.append("keywords", subCategory.keywords);

      formData.append("sortOrder", String(subCategory.sortOrder));
      formData.append("isActive", String(subCategory.isActive));

      if (image) {
        formData.append("image", image);
      }

      let response;

      if (editData?._id) {
        response = await dispatch(
          editSubCategorydetailes(editData._id, formData),
        );
      } else {
        response = await dispatch(createSubCategory(formData));
      }

      // Refresh list immediately
      if (refreshSubCategories) {
        await refreshSubCategories();
      }

      // Reset form
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

      // Close form/modal
      onClose?.();
    } catch (error) {
      console.error("SubCategory save failed:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {" "}
      <div className="bg-white rounded-xl p-3">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div>
            <div className="grid md:grid-cols-3 gap-4">
              <select
                name="categoryId"
                value={subCategory.categoryId}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
                required
              >
                <option value="">Select Category</option>

                {categories?.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <input
                type="text"
                name="name"
                value={subCategory.name}
                onChange={handleChange}
                placeholder="Subcategory Name"
                className="w-full border rounded-lg px-4 py-2"
                required
              />

              <input
                type="text"
                name="slug"
                value={subCategory.slug}
                onChange={handleChange}
                placeholder="Slug"
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>

            {/* Media */}
            <div className="mt-5">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border rounded-lg p-2"
              />

              {editData?.image && (
                <img
                  src={editData.image}
                  alt="subcategory"
                  className="w-24 h-24 object-cover mt-3 rounded"
                />
              )}
            </div>
            <textarea
              name="description"
              rows={2}
              value={subCategory.description}
              onChange={handleChange}
              placeholder="Sub category description..."
              className="w-full border rounded-lg px-4 py-2 mt-4"
            />
          </div>

          {/* SEO */}
          <div>
            <h3 className="text-md font-semibold mb-4 border-b pb-2">
              SEO Information
            </h3>

            <div className=" grid grid-cols-3 gap-2">
              <input
                type="text"
                name="metaTitle"
                value={subCategory.metaTitle}
                onChange={handleChange}
                placeholder="Meta Title"
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                name="metaDescription"
                rows={1}
                value={subCategory.metaDescription}
                onChange={handleChange}
                placeholder="Meta Description"
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                type="text"
                name="keywords"
                value={subCategory.keywords}
                onChange={handleChange}
                placeholder="Keywords, keywords,...."
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>

          {/* Settings */}
          <div>
            <h3 className="text-md font-semibold mb-4 border-b pb-2">
              Settings
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="number"
                name="sortOrder"
                value={subCategory.sortOrder}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={subCategory.isActive}
                  onChange={handleChange}
                />

                <label>Active Sub Category</label>
              </div>
            </div>
          </div>

          <div className="flex justify-end text-end">
            <button
              type="submit" className=" cursor-pointer
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
              {editData ? "Update Sub Category" : "Create Sub Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubCategoryForm;
