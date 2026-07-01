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
    metaTitle: "",
    metaDescription: "",
    keywords: "",
    sortOrder: 0,
    active: true,
  });

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const [videoURL, setVideoURL] = useState(null);

  // -------------------------
  // EDIT MODE SET DATA
  // -------------------------
  useEffect(() => {
    if (editData) {
      setCategory({
        name: editData?.name || "",
        slug: editData?.slug || "",
        description: editData?.description || "",
        icon: editData?.icon || "",
        metaTitle: editData?.seo?.metaTitle || "",
        metaDescription: editData?.seo?.metaDescription || "",
        keywords: editData?.seo?.keywords?.join(", ") || "",
        sortOrder: editData?.sortOrder || 0,
        active: editData?.active ?? true,
      });
    }
  }, [editData]);

  // -------------------------
  // VIDEO PREVIEW SAFE HANDLING
  // -------------------------
  useEffect(() => {
    if (!video) {
      setVideoURL(null);
      return;
    }

    const url = URL.createObjectURL(video);
    setVideoURL(url);

    return () => URL.revokeObjectURL(url);
  }, [video]);

  // -------------------------
  // INPUT CHANGE
  // -------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCategory((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // -------------------------
  // FILE HANDLERS
  // -------------------------
  const handleImageChange = (e) => {
    if (e.target.files?.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleVideoChange = (e) => {
    if (e.target.files?.length > 0) {
      setVideo(e.target.files[0]);
    }
  };

  // -------------------------
  // SUBMIT
  // -------------------------
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

      formData.append(
        "keywords",
        category.keywords
          .split(",")
          .map((k) => k.trim())
          .join(","),
      );

      formData.append("sortOrder", String(category.sortOrder));
      formData.append("active", String(category.active));

      if (image) {
        formData.append("image", image);
      }

      if (video) {
        formData.append("video", video);
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
          {/* NAME + SLUG */}
          <div className="grid md:grid-cols-2 gap-4">
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
          </div>

          {/* IMAGE + VIDEO */}
          <div className="grid md:grid-cols-2 gap-4">
            {/* IMAGE */}
            <div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-[#5C4033] transition cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                />

                <p className="mt-2 font-medium text-gray-700">
                  Upload Category Image
                </p>

                <p className="text-xs text-gray-500">JPG, PNG, WEBP</p>
              </div>

              {(image || editData?.image) && (
                <img
                  src={image ? URL.createObjectURL(image) : editData?.image}
                  className="mt-2 w-40 rounded-lg border"
                />
              )}
            </div>

            {/* VIDEO */}
            <div>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-[#5C4033] transition cursor-pointer">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="w-full"
                />

                <p className="mt-2 font-medium text-gray-700">
                  Upload Category Video
                </p>

                <p className="text-xs text-gray-500">MP4, WebM, MOV</p>
              </div>

              {(videoURL || editData?.video) && (
                <video controls className="mt-2 w-40 rounded-lg border">
                  <source src={videoURL || editData?.video} type="video/mp4" />
                </video>
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            rows={2}
            value={category.description}
            onChange={handleChange}
            placeholder="Category Description"
            className={`${inputClass} mt-2`}
          />

          {/* SEO */}
          <div>
            <h3 className="text-md font-semibold mb-3">SEO Information</h3>

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
                placeholder="keyword1, keyword2"
                className={inputClass}
              />
            </div>
          </div>

          {/* SETTINGS */}
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
              <span className="font-medium">Active Category</span>
            </label>
          </div>

          {/* SUBMIT */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-1.5 rounded-xl adminpanel text-white font-semibold hover:bg-[#4A3227] disabled:opacity-50"
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
