"use client";

import React, { useEffect, useState } from "react";
import {
  createCategory,
  editCategorydetailes,
} from "@/app/store/action/categoryAction";
import { useDispatch } from "react-redux";

const CategoryForm = ({ editData, onClose,   }) => {
  const dispatch = useDispatch();

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
        keywords: editData?.seo?.keywords || "",
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

      if (refreshCategories) {
        await refreshCategories();
      }

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error("Category save failed:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-2xl font-bold mb-6">
          {editData ? "Edit Category" : "Create Category"}
        </h2>

        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
              Basic Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                value={category.name}
                onChange={handleChange}
                placeholder="Electronics"
                className="w-full border rounded-lg px-4 py-2"
                required
              />

              <input
                type="text"
                name="slug"
                value={category.slug}
                onChange={handleChange}
                placeholder="electronics"
                className="w-full border rounded-lg px-4 py-2"
                required
              />
            </div>

            <textarea
              name="description"
              rows={4}
              value={category.description}
              onChange={handleChange}
              placeholder="Category description..."
              className="w-full border rounded-lg px-4 py-2 mt-4"
            />
          </div>

          {/* Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">Media</h3>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border rounded-lg p-2"
            />

            {editData?.image && (
              <img
                src={editData.image}
                alt="category"
                className="w-24 h-24 object-cover mt-3 rounded"
              />
            )}

            <input
              type="text"
              name="icon"
              value={category.icon}
              onChange={handleChange}
              placeholder="fa-mobile-screen"
              className="w-full border rounded-lg px-4 py-2 mt-4"
            />
          </div>

          {/* SEO */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
              SEO Information
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                name="metaTitle"
                value={category.metaTitle}
                onChange={handleChange}
                placeholder="Meta Title"
                className="w-full border rounded-lg px-4 py-2"
              />

              <textarea
                name="metaDescription"
                rows={3}
                value={category.metaDescription}
                onChange={handleChange}
                placeholder="Meta Description"
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                type="text"
                name="keywords"
                value={category.keywords}
                onChange={handleChange}
                placeholder="electronics,mobile,laptop"
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
          </div>

          {/* Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
              Settings
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="number"
                name="sortOrder"
                value={category.sortOrder}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  name="active"
                  checked={category.active}
                  onChange={handleChange}
                />

                <label>Active Category</label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
          >
            {editData ? "Update Category" : "Create Category"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;

