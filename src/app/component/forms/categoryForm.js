"use client";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

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
    isActive: true,
  });

  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  // --------------------------------------------------
  // EDIT MODE SET DATA
  // --------------------------------------------------
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
        isActive: editData?.isActive ?? true,
      });

      // Reset newly selected files when switching edit data
      setImage(null);
      setVideo(null);
    }
  }, [editData]);

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
  // VIDEO PREVIEW
  // --------------------------------------------------
  useEffect(() => {
    if (!video) {
      setVideoURL(null);
      return;
    }

    const url = URL.createObjectURL(video);
    setVideoURL(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [video]);

  // --------------------------------------------------
  // INPUT CHANGE
  // --------------------------------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCategory((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // --------------------------------------------------
  // IMAGE CHANGE
  // --------------------------------------------------
  const handleImageChange = (e) => {
    if (e.target.files?.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  // --------------------------------------------------
  // VIDEO CHANGE
  // --------------------------------------------------
  const handleVideoChange = (e) => {
    if (e.target.files?.length > 0) {
      setVideo(e.target.files[0]);
    }
  };

  // --------------------------------------------------
  // SUBMIT
  // --------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submission
    if (submitting) return;

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
          .filter(Boolean)
          .join(","),
      );

      formData.append("sortOrder", String(category.sortOrder));
      formData.append("isActive", String(category.isActive));
      // Only append image if user selected a new image
      if (image) {
        formData.append("image", image);
      }

      // Only append video if user selected a new video
      if (video) {
        formData.append("video", video);
      }

      // --------------------------------------------------
      // UPDATE CATEGORY
      // --------------------------------------------------
      if (editData?._id) {
        await dispatch(editCategorydetailes(editData._id, formData));

        toast.success("Category updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }

      // --------------------------------------------------
      // CREATE CATEGORY
      // --------------------------------------------------
      else {
        await dispatch(createCategory(formData));

        toast.success("Category created successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }

      // Refresh category list
      await refreshCategories?.();

      /*
       * IMPORTANT:
       * DO NOT call onClose() here.
       *
       * The modal/form will remain open after successful
       * creation/update.
       *
       * It will only close when the user clicks the X button.
       */
    } catch (error) {
      console.error("Category save failed:", error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to save category. Please try again.",
        {
          position: "top-right",
          autoClose: 4000,
        },
      );
    } finally {
      // Saving is finished
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-xl text-[15px] font-normal border border-gray-300 px-4 py-1.5 outline-none transition-all duration-200 focus:border-[#5C4033] focus:ring-4 focus:ring-[#5C4033]/10";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        {/* --------------------------------------------------
            HEADER
        -------------------------------------------------- */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              {editData ? "Update Category" : "Create Category"}
            </h2>

            <p className="text-sm text-gray-500">
              {editData
                ? "Update category information"
                : "Add a new product category"}
            </p>
          </div>

          {/* --------------------------------------------------
              CLOSE BUTTON
          -------------------------------------------------- */}
          <button
            type="button"
            onClick={() => {
              if (submitting) return;
              onClose?.();
            }}
            disabled={submitting}
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-gray-500 transition hover:bg-gray-100 hover:text-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* --------------------------------------------------
            FORM
        -------------------------------------------------- */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {/* NAME + SLUG */}
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Category Name
              </label>

              <input
                type="text"
                name="name"
                value={category.name}
                onChange={handleChange}
                placeholder="Category Name"
                className={inputClass}
                required
                disabled={submitting}
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">
                Slug
              </label>

              <input
                type="text"
                name="slug"
                value={category.slug}
                onChange={handleChange}
                placeholder="category-slug"
                className={inputClass}
                required
                disabled={submitting}
              />
            </div>
          </div>

          {/* IMAGE + VIDEO */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* IMAGE */}
            <div>
              <div className="cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-4 text-center transition hover:border-[#5C4033]">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full"
                  disabled={submitting}
                />

                <p className="mt-2 font-medium text-gray-700">
                  Upload Category Image
                </p>

                <p className="text-xs text-gray-500">JPG, PNG, WEBP</p>
              </div>

              {(image || editData?.image) && (
                <img
                  src={imageURL || editData?.image}
                  alt="Category preview"
                  className="mt-2 h-32 w-40 rounded-lg border object-cover"
                />
              )}
            </div>

            {/* VIDEO */}
            <div>
              <div className="cursor-pointer rounded-xl border-2 border-dashed border-gray-300 p-4 text-center transition hover:border-[#5C4033]">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="w-full"
                  disabled={submitting}
                />

                <p className="mt-2 font-medium text-gray-700">
                  Upload Category Video
                </p>

                <p className="text-xs text-gray-500">MP4, WebM, MOV</p>
              </div>

              {(videoURL || editData?.video) && (
                <video
                  controls
                  className="mt-2 h-32 w-40 rounded-lg border object-cover"
                  src={videoURL || editData?.video}
                />
              )}
            </div>
          </div>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            rows={3}
            value={category.description}
            onChange={handleChange}
            placeholder="Category Description"
            className={inputClass}
            disabled={submitting}
          />

          {/* SEO */}
          <div>
            <h3 className="mb-3 text-md font-semibold">SEO Information</h3>

            <div className="grid gap-2 md:grid-cols-3">
              <input
                type="text"
                name="metaTitle"
                value={category.metaTitle}
                onChange={handleChange}
                placeholder="Meta Title"
                className={inputClass}
                disabled={submitting}
              />

              <input
                type="text"
                name="metaDescription"
                value={category.metaDescription}
                onChange={handleChange}
                placeholder="Meta Description"
                className={inputClass}
                disabled={submitting}
              />

              <input
                type="text"
                name="keywords"
                value={category.keywords}
                onChange={handleChange}
                placeholder="keyword1, keyword2"
                className={inputClass}
                disabled={submitting}
              />
            </div>
          </div>

          {/* SETTINGS */}
          <div className="grid items-center gap-6 md:grid-cols-2">
            <input
              type="number"
              name="sortOrder"
              value={category.sortOrder}
              onChange={handleChange}
              className={inputClass}
              disabled={submitting}
            />

            <label
              className={`flex items-center gap-3 ${
                submitting ? "cursor-not-allowed opacity-60" : "cursor-pointer"
              }`}
            >
              <input
                type="checkbox"
                name="isActive"
                checked={category.isActive}
                onChange={handleChange}
                className="h-5 w-5"
                disabled={submitting}
              />

              <span className="font-medium">Active Category</span>
            </label>
          </div>

          {/* --------------------------------------------------
              SUBMIT
          -------------------------------------------------- */}
          <div className="flex justify-end border-t pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex min-w-[180px] items-center justify-center gap-2 rounded-xl bg-[#5C4033] px-8 py-2 font-semibold text-white transition hover:bg-[#4A3227] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  {/* Spinner */}
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                  <span>{editData ? "Updating..." : "Creating..."}</span>
                </>
              ) : (
                <span>{editData ? "Update Category" : "Create Category"}</span>
              )}
            </button>
          </div>

          {/* SUBMITTING MESSAGE */}
          {submitting && (
            <div className="flex items-center justify-center gap-2 rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-600">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#5C4033]" />
              Please wait while we save your category...
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
