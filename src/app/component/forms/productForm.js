"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
  createProduct,
  editProductDetails,
} from "@/app/store/action/productAction";

import { fetchSubcategorybyCategoryID } from "@/app/store/action/subcategoryAction";
import { fetchAttributeBySubCatgeoryID } from "@/app/store/action/attributeAction";

import { useCategories } from "@/app/hooks/catgeoryHook";

const ProductForm = ({ editData, onClose, refreshProducts }) => {
  const dispatch = useDispatch();
  const { categories, loading } = useCategories();

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // ============================
  // PRODUCT STATE
  // ============================

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

  // ============================
  // OTHER STATES
  // ============================

  const [subcategories, setSubcategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [attributeValues, setAttributeValues] = useState({});

  const [loadingSubs, setLoadingSubs] = useState(false);
  const [loadingAttributes, setLoadingAttributes] = useState(false);

  // ============================
  // EDIT MODE
  // ============================

  useEffect(() => {
    if (!editData) return;

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
  }, [editData]);

  // ============================
  // LOAD SUBCATEGORY IN EDIT MODE
  // ============================

  useEffect(() => {
    if (!editData?.categoryId?._id) return;

    loadSubCategories(editData.categoryId._id);
  }, [editData]);

  // ============================
  // LOAD ATTRIBUTE IN EDIT MODE
  // ============================

  useEffect(() => {
    if (!editData?.subCategoryId?._id) return;

    fetchAttributes(editData.subCategoryId._id);
  }, [editData]);

  // ============================
  // HANDLE INPUT
  // ============================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ============================
  // LOAD SUBCATEGORIES
  // ============================

  const loadSubCategories = async (categoryId) => {
    if (!categoryId) {
      setSubcategories([]);
      return;
    }

    try {
      setLoadingSubs(true);

      const res = await dispatch(fetchSubcategorybyCategoryID(categoryId));

      setSubcategories(res?.subcategories || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingSubs(false);
    }
  };

  // ============================
  // CATEGORY CHANGE
  // ============================

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;

    setProduct((prev) => ({
      ...prev,
      categoryId,
      subCategoryId: "",
    }));

    setAttributes([]);
    setAttributeValues({});

    await loadSubCategories(categoryId);
  };

  // ============================
  // FETCH ATTRIBUTES
  // ============================

  const fetchAttributes = async (subCategoryId) => {
    if (!subCategoryId) {
      setAttributes([]);
      return;
    }

    try {
      setLoadingAttributes(true);

      const res = await dispatch(fetchAttributeBySubCatgeoryID(subCategoryId));
      console.log({ res });

      setAttributes(res?.attributes || []);
    } catch (err) {
      console.log(err);
      setAttributes([]);
    } finally {
      setLoadingAttributes(false);
    }
  };

  // ============================
  // SUBCATEGORY CHANGE
  // ============================

  const handleSubCategoryChange = async (e) => {
    const subCategoryId = e.target.value;

    setProduct((prev) => ({
      ...prev,
      subCategoryId,
    }));

    setAttributeValues({});

    await fetchAttributes(subCategoryId);
  };

  // ============================
  // ATTRIBUTE VALUE CHANGE
  // ============================

  const handleAttributeChange = (attributeId, value) => {
    setAttributeValues((prev) => ({
      ...prev,
      [attributeId]: value,
    }));
  };

  // ============================
  // IMAGE
  // ============================

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setProduct((prev) => ({
      ...prev,
      images: files,
      imagePreviews: files.map((file) => URL.createObjectURL(file)),
    }));
  };

  // ============================
  // VIDEO
  // ============================

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);

    setProduct((prev) => ({
      ...prev,
      videos: files,
      videoPreviews: files.map((file) => URL.createObjectURL(file)),
    }));
  };

  // ============================
  // FILE PICKERS
  // ============================

  const handleImageClick = () => imageInputRef.current?.click();
  const handleVideoClick = () => videoInputRef.current?.click();

  // ============================
  // CLEANUP
  // ============================

  useEffect(() => {
    return () => {
      product.imagePreviews.forEach((url) => URL.revokeObjectURL(url));

      product.videoPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [product.imagePreviews, product.videoPreviews]);

  // ============================
  // SUBMIT
  // ============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("slug", product.slug);
    formData.append("shortDescription", product.shortDescription);
    formData.append("fullDescription", product.fullDescription);

    formData.append("categoryId", product.categoryId);
    formData.append("subCategoryId", product.subCategoryId);

    formData.append("brand", product.brand);
    formData.append("tags", product.tags);
    formData.append("highlights", product.highlights);

    formData.append("attributes", JSON.stringify(attributeValues));

    product.images.forEach((image) => {
      formData.append("images", image);
    });

    product.videos.forEach((video) => {
      formData.append("videos", video);
    });

    if (editData?._id) {
      await dispatch(editProductDetails(editData._id, formData));
    } else {
      await dispatch(createProduct(formData));
    }

    refreshProducts?.();
    onClose?.();
  };

  // ============================
  // UI
  // ============================

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6">
      {/* ================= BASIC DETAILS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <input
          type="text"
          name="slug"
          placeholder="Slug"
          value={product.slug}
          onChange={handleChange}
          className="border rounded p-2"
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={handleChange}
          className="border rounded p-2"
        />
      </div>

      {/* ================= CATEGORY ================= */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={product.categoryId}
          onChange={handleCategoryChange}
          className="border rounded p-2"
        >
          <option value="">{loading ? "Loading..." : "Select Category"}</option>

          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={product.subCategoryId}
          onChange={handleSubCategoryChange}
          className="border rounded p-2"
        >
          <option value="">
            {loadingSubs ? "Loading..." : "Select Subcategory"}
          </option>

          {subcategories?.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* ================= IMAGE ================= */}
        <div
          onClick={handleImageClick}
          className="border-2 border-dashed rounded-lg p-5 cursor-pointer text-center"
        >
          <p>Upload Images</p>

          <input
            ref={imageInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />

          <div className="flex flex-wrap gap-3 mt-4">
            {product.imagePreviews.map((image, index) => (
              <img
                key={index}
                src={image}
                alt=""
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* ================= VIDEO ================= */}
        <div
          onClick={handleVideoClick}
          className="border-2 border-dashed rounded-lg p-5 cursor-pointer text-center"
        >
          <p>Upload Videos</p>

          <input
            ref={videoInputRef}
            type="file"
            multiple
            accept="video/*"
            className="hidden"
            onChange={handleVideoChange}
          />

          <div className="flex flex-wrap gap-3 mt-4">
            {product.videoPreviews.map((video, index) => (
              <video
                key={index}
                src={video}
                controls
                className="w-44 rounded"
              />
            ))}
          </div>
        </div>
      </div>

      {/* ================= DESCRIPTION ================= */}
      <div className="grid grid-row-2 gap-3">
        <input
          type="text"
          name="shortDescription"
          placeholder="Short Description"
          value={product.shortDescription}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />

        <textarea
          rows={2}
          name="fullDescription"
          placeholder="Full Description"
          value={product.fullDescription}
          onChange={handleChange}
          className="border rounded p-2 w-full resize-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          name="tags"
          placeholder="Tags (comma separated)"
          value={product.tags}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />

        <input
          type="text"
          name="highlights"
          placeholder="Highlights (comma separated)"
          value={product.highlights}
          onChange={handleChange}
          className="border rounded p-2 w-full"
        />
      </div>
      {/* ================= DYNAMIC ATTRIBUTES ================= */}

      <div className="space-y-4">
        {loadingAttributes ? (
          <p>Loading Attributes...</p>
        ) : (
          <>
            {attributes.map((attr) => {
              switch (attr.fieldType) {
                case "text":
                  return (
                    <div key={attr._id}>
                      <label className="block mb-1">{attr.name}</label>

                      <input
                        type="text"
                        placeholder={attr.placeholder}
                        required={attr.requiredField}
                        value={attributeValues[attr._id] || ""}
                        onChange={(e) =>
                          handleAttributeChange(attr._id, e.target.value)
                        }
                        className="border rounded p-2 w-full"
                      />
                    </div>
                  );

                case "textarea":
                  return (
                    <div key={attr._id}>
                      <label className="block mb-1">{attr.name}</label>

                      <textarea
                        rows={3}
                        placeholder={attr.placeholder}
                        required={attr.requiredField}
                        value={attributeValues[attr._id] || ""}
                        onChange={(e) =>
                          handleAttributeChange(attr._id, e.target.value)
                        }
                        className="border rounded p-2 w-full resize-none"
                      />
                    </div>
                  );

                case "number":
                  return (
                    <div key={attr._id}>
                      <label className="block mb-1">
                        {attr.name}
                        {attr.unit && ` (${attr.unit})`}
                      </label>

                      <input
                        type="number"
                        placeholder={attr.placeholder}
                        required={attr.requiredField}
                        value={attributeValues[attr._id] || ""}
                        onChange={(e) =>
                          handleAttributeChange(attr._id, e.target.value)
                        }
                        className="border rounded p-2 w-full"
                      />
                    </div>
                  );

                case "boolean":
                  return (
                    <div key={attr._id}>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={attributeValues[attr._id] || false}
                          onChange={(e) =>
                            handleAttributeChange(attr._id, e.target.checked)
                          }
                        />
                        {attr.name}
                      </label>
                    </div>
                  );

                case "select":
                  return (
                    <div key={attr._id}>
                      <label className="block mb-1">{attr.name}</label>

                      <select
                        required={attr.requiredField}
                        value={attributeValues[attr._id] || ""}
                        onChange={(e) =>
                          handleAttributeChange(attr._id, e.target.value)
                        }
                        className="border rounded p-2"
                      >
                        <option value="">Select {attr.name}</option>

                        {attr.options?.map((option) => (
                          <option className="mt-2 p-2" key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  );

                case "multiselect":
                  return (
                    <div key={attr._id}>
                      <label className="block mb-2">{attr.name}</label>

                      <select
                        multiple
                        value={attributeValues[attr._id] || []}
                        onChange={(e) => {
                          const values = [...e.target.selectedOptions].map(
                            (option) => option.value,
                          );

                          handleAttributeChange(attr._id, values);
                        }}
                        className="border rounded p-2 w-full h-32"
                      >
                        {attr.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  );

                case "date":
                  return (
                    <div key={attr._id}>
                      <label className="block mb-1">{attr.name}</label>

                      <input
                        type="date"
                        required={attr.requiredField}
                        value={attributeValues[attr._id] || ""}
                        onChange={(e) =>
                          handleAttributeChange(attr._id, e.target.value)
                        }
                        className="border rounded p-2 w-full"
                      />
                    </div>
                  );

                default:
                  return null;
              }
            })}
          </>
        )}
      </div>
      {/* ================= SUBMIT ================= */}

      <button
        type="submit"
        className="bg-[#5C4033] text-white px-8 py-3 rounded-lg"
      >
        {editData ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
};

export default ProductForm;
