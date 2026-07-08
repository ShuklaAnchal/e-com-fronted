"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
  createProduct,
  editProductDetails,
} from "@/app/store/action/productAction";


import {fetchSubcategorybyCategoryID
} from "@/app/store/action/subcategoryAction";

import { useCategories } from "@/app/hooks/catgeoryHook";

const ProductForm = ({ editData, onClose, refreshProducts }) => {
  const dispatch = useDispatch();
  const { categories, loading } = useCategories();

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // ----------------------
  // LOCAL STATE
  // ----------------------
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    shortDescription: "",
    fullDescription: "",
    categoryId: "",
    subCategoryId: "",
    brand: "",
    tags: "",
    highlights: "",

    images: [],
    videos: [],

    imagePreviews: [],
    videoPreviews: [],
  });

  const [subcategories, setSubcategories] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(false);

  // ----------------------
  // EDIT MODE
  // ----------------------
  useEffect(() => {
    if (editData) {
      setProduct({
        name: editData?.name || "",
        slug: editData?.slug || "",
        shortDescription: editData?.shortDescription || "",
        fullDescription: editData?.fullDescription || "",
        categoryId: editData?.categoryId?._id || "",
        subCategoryId: editData?.subCategoryId?._id || "",
        brand: editData?.brand || "",
        tags: editData?.tags?.join(",") || "",
        highlights: editData?.highlights?.join(",") || "",
        images: [],
        videos: [],
        imagePreviews: [],
        videoPreviews: [],
      });
    }
  }, [editData]);

  // ----------------------
  // HANDLE INPUT
  // ----------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ----------------------
  // CATEGORY CHANGE + API CALL
  // ----------------------
  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;

    setProduct((prev) => ({
      ...prev,
      categoryId,
      subCategoryId: "",
    }));

    if (!categoryId) return;

    try {
      setLoadingSubs(true);

      const res = await dispatch(
        fetchSubcategorybyCategoryID(categoryId)
      );
     console.log({res});
     
      setSubcategories(res?.subcategories || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingSubs(false);
    }
  };

  // ----------------------
  // IMAGE UPLOAD
  // ----------------------
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setProduct((prev) => ({
      ...prev,
      images: files,
      imagePreviews: files.map((file) => URL.createObjectURL(file)),
    }));
  };

  // ----------------------
  // VIDEO UPLOAD
  // ----------------------
  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);

    setProduct((prev) => ({
      ...prev,
      videos: files,
      videoPreviews: files.map((file) => URL.createObjectURL(file)),
    }));
  };

  // ----------------------
  // CLICK TRIGGERS
  // ----------------------
  const handleImageClick = () => imageInputRef.current?.click();
  const handleVideoClick = () => videoInputRef.current?.click();

  // ----------------------
  // CLEANUP URLS
  // ----------------------
  useEffect(() => {
    return () => {
      product.imagePreviews.forEach((url) => URL.revokeObjectURL(url));
      product.videoPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [product.imagePreviews, product.videoPreviews]);

  // ----------------------
  // SUBMIT
  // ----------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("slug", product.slug);
    formData.append("shortDescription", product.shortDescription);
    formData.append("fullDescription", product.fullDescription);
    formData.append("categoryId", product.categoryId);
    // formData.append("subCategoryId", product.subCategoryId);
    formData.append("brand", product.brand);
    formData.append("tags", product.tags);
    formData.append("highlights", product.highlights);

    product.images.forEach((img) => formData.append("images", img));
    product.videos.forEach((vid) => formData.append("videos", vid));

    if (editData?._id) {
      await dispatch(editProductDetails(editData._id, formData));
    } else {
      await dispatch(createProduct(formData));
    }

    refreshProducts?.();
    onClose?.();
  };

  // ----------------------
  // UI
  // ----------------------
  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">

      {/* BASIC */}
      <div className="grid grid-cols-3 gap-3">
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="border p-2 rounded"
        />

        <input
          name="slug"
          value={product.slug}
          onChange={handleChange}
          placeholder="Slug"
          className="border p-2 rounded"
        />

        <input
          name="brand"
          value={product.brand}
          onChange={handleChange}
          placeholder="Brand"
          className="border p-2 rounded"
        />
      </div>

      {/* CATEGORY */}
      <div className="grid grid-cols-2 gap-3">
        <select
          value={product.categoryId}
          onChange={handleCategoryChange}
          className="border p-2 rounded"
        >
          <option value="">
            {loading ? "Loading..." : "Select Category"}
          </option>

          {categories?.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* <select
          name="subCategoryId"
          value={product.subCategoryId}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="">
            {loadingSubs ? "Loading..." : "Select Subcategory"}
          </option>

          {subcategories?.map((s) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select> */}
      </div>

      {/* UPLOAD */}
      <div className="grid grid-cols-2 gap-6">

        {/* IMAGES */}
        <div
          onClick={handleImageClick}
          className="border-2 border-dashed p-4 text-center cursor-pointer"
        >
          🖼️ Upload Images
          <input
            ref={imageInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          <div className="flex gap-2 mt-2 flex-wrap">
            {product.imagePreviews.map((img, i) => (
              <img
                key={i}
                src={img}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* VIDEOS */}
        <div
          onClick={handleVideoClick}
          className="border-2 border-dashed p-4 text-center cursor-pointer"
        >
          🎥 Upload Videos
          <input
            ref={videoInputRef}
            type="file"
            multiple
            accept="video/*"
            onChange={handleVideoChange}
            className="hidden"
          />

          <div className="flex gap-2 mt-2 flex-wrap">
            {product.videoPreviews.map((vid, i) => (
              <video
                key={i}
                src={vid}
                controls
                className="w-32 h-24 rounded"
              />
            ))}
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      <input
        name="shortDescription"
        value={product.shortDescription}
        onChange={handleChange}
        placeholder="Short Description"
        className="border p-2 w-full rounded"
      />

      <textarea
        name="fullDescription"
        value={product.fullDescription}
        onChange={handleChange}
        placeholder="Full Description"
        className="border p-2 w-full rounded"
      />

      {/* SUBMIT */}
      <button
        type="submit"
        className="bg-[#5C4033] text-white px-6 py-2 rounded"
      >
        {editData ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
};

export default ProductForm;