"use client";

import React, { useState } from "react";
import {
  createCategory,
  asyncfetchcategory,
  editCategorydetailes
} from "@/app/store/action/categoryAction";
import { useDispatch } from "react-redux";

const CategoryForm = ({   editData,
  onClose,
  refreshCategories, }) => {
  const [category, setCategory] = useState({
    name: "",
    slug: "",
    description: "",
    icon: "",
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    sortOrder: 0,
    active: true,
  });

  const [image, setImage] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCategory((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("name", category.name);
  formData.append("slug", category.slug);
  formData.append(
    "description",
    category.description
  );

  try {
    if (editData?._id) {
      await dispatch(
        editCategorydetailes(
          editData._id,
          formData
        )
      );
    } else {
      await dispatch(
        createCategory(formData)
      );
    }

    await refreshCategories();

    onClose();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-2xl font-bold mb-6">Create Category</h2>

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
                placeholder="Electronics"
                value={category.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />

              <input
                type="text"
                name="slug"
                placeholder="electronics"
                value={category.slug}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
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
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full border rounded-lg p-2"
            />

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

          {/* Settings */}
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

          <button
            type="submit"
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg cursor-pointer"
          >
            Create Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
