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

  // =========================================================
  // PRODUCT STATE
  // =========================================================

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

    productcollection: "",

    images: [],
    videos: [],

    imagePreviews: [],
    videoPreviews: [],

    // =====================================================
    // GIFTING
    // =====================================================

    gifting: {
      giftWrappingAvailable: false,
      personalizedMessage: false,
      corporateGifting: false,
      occasions: "",
      festivals: "",
    },
  });

  // =========================================================
  // PRODUCT DETAILS ATTRIBUTES
  // =========================================================

  const [details, setDetails] = useState([]);

  // =========================================================
  // VARIANTS
  // =========================================================

  const [variants, setVariants] = useState([
    {
      sku: "",
      barcode: "",

      pricing: {
        mrp: "",
        sellingPrice: "",
        currency: "INR",
        gstRate: 18,
        taxIncluded: true,
        discountPercent: 0,
      },

      inventory: {
        stockQuantity: "",
        lowStockThreshold: 5,
        reservedStock: 0,
        inStock: true,
        backorderAllowed: false,
        preOrder: false,
      },

      shippingWeight: "",

      isDefault: true,

      attributes: [],
    },
  ]);

  // =========================================================
  // ATTRIBUTE STATES
  // =========================================================

  const [subcategories, setSubcategories] = useState([]);
  const [attributes, setAttributes] = useState([]);

  const [attributeValues, setAttributeValues] = useState({});

  const [loadingSubs, setLoadingSubs] = useState(false);
  const [loadingAttributes, setLoadingAttributes] = useState(false);

  // =========================================================
  // SUBMITTING STATE
  // =========================================================

  const [isSubmitting, setIsSubmitting] = useState(false);

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // =========================================================
  // EDIT MODE
  // =========================================================

  useEffect(() => {
    if (!editData) return;

    setProduct({
      name: editData.name || "",

      slug: editData.slug || "",

      shortDescription: editData.shortDescription || "",

      fullDescription: editData.fullDescription || "",

      categoryId: editData.categoryId?._id || editData.categoryId || "",

      subCategoryId:
        editData.subCategoryId?._id || editData.subCategoryId || "",

      brand: editData.brand || "",

      tags: editData.tags?.join(", ") || "",

      highlights: editData.highlights?.join(", ") || "",

      productcollection: editData.productcollection || "",

      images: [],
      videos: [],

      imagePreviews: [],
      videoPreviews: [],

      // =====================================================
      // EDIT GIFTING
      // =====================================================

      gifting: {
        giftWrappingAvailable: editData.gifting?.giftWrappingAvailable || false,

        personalizedMessage: editData.gifting?.personalizedMessage || false,

        corporateGifting: editData.gifting?.corporateGifting || false,

        occasions: editData.gifting?.occasions?.join(", ") || "",

        festivals: editData.gifting?.festivals?.join(", ") || "",
      },
    });

    // Load existing variants if available
    if (editData.variants?.length) {
      setVariants(editData.variants);
    }

    // Load existing details if available
    if (editData.details?.length) {
      const existingValues = {};

      editData.details.forEach((detail) => {
        if (detail.attributeId) {
          existingValues[detail.attributeId?._id || detail.attributeId] =
            detail.value;
        }
      });

      setAttributeValues(existingValues);
      setDetails(editData.details);
    }
  }, [editData]);

  // =========================================================
  // LOAD SUBCATEGORY EDIT MODE
  // =========================================================

  useEffect(() => {
    if (!editData?.categoryId?._id) return;

    loadSubCategories(editData.categoryId._id);
  }, [editData]);

  // =========================================================
  // LOAD ATTRIBUTES EDIT MODE
  // =========================================================

  useEffect(() => {
    if (!editData?.subCategoryId?._id) return;

    fetchAttributes(editData.subCategoryId._id);
  }, [editData]);

  // =========================================================
  // INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // GIFTING CHANGE
  // =========================================================

  const handleGiftingChange = (field, value) => {
    setProduct((prev) => ({
      ...prev,

      gifting: {
        ...prev.gifting,

        [field]: value,
      },
    }));
  };

  // =========================================================
  // LOAD SUBCATEGORIES
  // =========================================================

  const loadSubCategories = async (categoryId) => {
    if (!categoryId) {
      setSubcategories([]);
      return;
    }

    try {
      setLoadingSubs(true);

      const res = await dispatch(fetchSubcategorybyCategoryID(categoryId));

      setSubcategories(res?.subcategories || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingSubs(false);
    }
  };

  // =========================================================
  // CATEGORY CHANGE
  // =========================================================

  const handleCategoryChange = async (e) => {
    const categoryId = e.target.value;

    setProduct((prev) => ({
      ...prev,

      categoryId,

      subCategoryId: "",
    }));

    setSubcategories([]);

    setAttributes([]);

    setAttributeValues({});

    await loadSubCategories(categoryId);
  };

  // =========================================================
  // FETCH ATTRIBUTES
  // =========================================================

  const fetchAttributes = async (subCategoryId) => {
    if (!subCategoryId) {
      setAttributes([]);
      return;
    }

    try {
      setLoadingAttributes(true);

      const res = await dispatch(fetchAttributeBySubCatgeoryID(subCategoryId));

      console.log("ATTRIBUTES", res);

      setAttributes(res?.attributes || []);
    } catch (error) {
      console.log(error);

      setAttributes([]);
    } finally {
      setLoadingAttributes(false);
    }
  };

  // =========================================================
  // ATTRIBUTE TYPE SPLIT
  // =========================================================

  const productAttributes = attributes.filter(
    (item) => !item.isVariantAttribute,
  );

  const variantAttributes = attributes.filter(
    (item) => item.isVariantAttribute,
  );

  // =========================================================
  // SUBCATEGORY CHANGE
  // =========================================================

  const handleSubCategoryChange = async (e) => {
    const subCategoryId = e.target.value;

    setProduct((prev) => ({
      ...prev,

      subCategoryId,
    }));

    setAttributeValues({});

    await fetchAttributes(subCategoryId);
  };

  // =========================================================
  // PRODUCT ATTRIBUTE CHANGE
  // =========================================================

  const handleAttributeChange = (attributeId, value) => {
    setAttributeValues((prev) => ({
      ...prev,

      [attributeId]: value,
    }));
  };

  // =========================================================
  // PREPARE DETAILS
  // =========================================================

  const prepareDetails = () => {
    return Object.entries(attributeValues).map(([attributeId, value]) => ({
      attributeId,
      value,
    }));
  };

  // =========================================================
  // VARIANT ATTRIBUTE CHANGE
  // =========================================================

  const handleVariantAttributeChange = (variantIndex, attributeId, value) => {
    const updated = [...variants];

    const existing = updated[variantIndex].attributes.find(
      (item) => item.attributeId === attributeId,
    );

    if (existing) {
      existing.value = value;
    } else {
      updated[variantIndex].attributes.push({
        attributeId,

        value,
      });
    }

    setVariants(updated);
  };

  // =========================================================
  // ADD VARIANT
  // =========================================================

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,

      {
        sku: "",
        barcode: "",

        pricing: {
          mrp: "",
          sellingPrice: "",
          currency: "INR",
          gstRate: 18,
          taxIncluded: true,
          discountPercent: 0,
        },

        inventory: {
          stockQuantity: "",
          lowStockThreshold: 5,
          reservedStock: 0,
          inStock: true,
          backorderAllowed: false,
          preOrder: false,
        },

        shippingWeight: "",

        isDefault: false,

        attributes: [],
      },
    ]);
  };

  // =========================================================
  // REMOVE VARIANT
  // =========================================================

  const removeVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  // =========================================================
  // UPDATE VARIANT FIELD
  // =========================================================

  const updateVariantField = (index, field, value) => {
    const updated = [...variants];

    updated[index][field] = value;

    setVariants(updated);
  };

  // =========================================================
  // UPDATE VARIANT NESTED
  // =========================================================

  const updateVariantNested = (index, section, field, value) => {
    const updated = [...variants];

    updated[index][section][field] = value;

    setVariants(updated);
  };

  // =========================================================
  // IMAGE UPLOAD
  // =========================================================

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    setProduct((prev) => ({
      ...prev,

      images: files,

      imagePreviews: files.map((file) => URL.createObjectURL(file)),
    }));
  };

  // =========================================================
  // VIDEO UPLOAD
  // =========================================================

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files || []);

    setProduct((prev) => ({
      ...prev,

      videos: files,

      videoPreviews: files.map((file) => URL.createObjectURL(file)),
    }));
  };

  // =========================================================
  // CLEAN PREVIEW URL
  // =========================================================

  useEffect(() => {
    return () => {
      product.imagePreviews.forEach((url) => URL.revokeObjectURL(url));

      product.videoPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [product.imagePreviews, product.videoPreviews]);

  // =========================================================
  // SUBMIT PRODUCT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // =====================================================
      // PRODUCT DATA
      // =====================================================

      const productData = {
        name: product.name.trim(),

        slug: product.slug.trim(),

        shortDescription: product.shortDescription.trim(),

        fullDescription: product.fullDescription.trim(),

        categoryId: product.categoryId,

        subCategoryId: product.subCategoryId || null,

        brand: product.brand?.trim() || "Siyaas",

        tags: product.tags
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        highlights: product.highlights
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),

        productcollection: product.productcollection?.trim() || "",

        // =================================================
        // GIFTING
        // =================================================

        gifting: {
          giftWrappingAvailable: Boolean(product.gifting.giftWrappingAvailable),

          personalizedMessage: Boolean(product.gifting.personalizedMessage),

          corporateGifting: Boolean(product.gifting.corporateGifting),

          occasions: product.gifting.occasions
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),

          festivals: product.gifting.festivals
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
        },
      };

      // =====================================================
      // PRODUCT DETAILS
      // =====================================================

      const productDetails = prepareDetails();

      // =====================================================
      // FORM DATA
      // =====================================================

      const formData = new FormData();

      formData.append("productData", JSON.stringify(productData));

      formData.append("variants", JSON.stringify(variants));

      formData.append("details", JSON.stringify(productDetails));

      // =====================================================
      // IMAGES
      // =====================================================

      product.images.forEach((image) => {
        formData.append("images", image);
      });

      // =====================================================
      // VIDEOS
      // =====================================================

      product.videos.forEach((video) => {
        formData.append("videos", video);
      });

      // =====================================================
      // EDIT
      // =====================================================

      if (editData?._id) {
        await dispatch(editProductDetails(editData._id, formData));
      }

      // =====================================================
      // CREATE
      // =====================================================
      else {
        await dispatch(createProduct(formData));
      }

      // Refresh product list
      refreshProducts?.();

      /*
       * IMPORTANT:
       *
       * Do NOT call onClose() here.
       *
       * The form/modal will remain open after
       * successful submission.
       *
       * User must click the X button to close it.
       */
    } catch (error) {
      console.error("Product submit error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================================
  // CLOSE FORM
  // =========================================================

  const handleClose = () => {
    // Don't close while submitting
    if (isSubmitting) return;

    onClose?.();
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="w-full bg-white rounded-2xl">
      {/* =====================================================
          FORM
      ===================================================== */}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ===================================================
            BASIC DETAILS
        =================================================== */}

        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-800">Basic Details</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              className="border p-3 rounded-lg w-full"
              name="name"
              placeholder="Product Name"
              value={product.name}
              onChange={handleChange}
              required
            />

            <input
              className="border p-3 rounded-lg w-full"
              name="slug"
              placeholder="Slug"
              value={product.slug}
              onChange={handleChange}
              required
            />

            <input
              className="border p-3 rounded-lg w-full"
              name="brand"
              placeholder="Brand"
              value={product.brand}
              onChange={handleChange}
            />

            <input
              className="border p-3 rounded-lg w-full"
              name="productcollection"
              placeholder="Product Collection"
              value={product.productcollection}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ===================================================
            CATEGORY
        =================================================== */}

        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-800">Category</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <select
              className="border p-3 rounded-lg"
              value={product.categoryId}
              onChange={handleCategoryChange}
              required
            >
              <option value="">
                {loading ? "Loading..." : "Select Category"}
              </option>

              {categories?.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            <select
              className="border p-3 rounded-lg"
              value={product.subCategoryId}
              onChange={handleSubCategoryChange}
            >
              <option value="">
                {loadingSubs ? "Loading..." : "Select Subcategory"}
              </option>

              {subcategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ===================================================
            MEDIA
        =================================================== */}

        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-800">Product Media</h3>

          <div className="grid md:grid-cols-2 gap-4">
            {/* IMAGES */}

            <div
              className="border-dashed border-2 p-5 rounded-xl cursor-pointer hover:border-blue-500 transition"
              onClick={() => document.getElementById("images")?.click()}
            >
              <p className="font-medium">Upload Images</p>

              <p className="text-sm text-gray-500 mt-1">
                Select product images
              </p>

              <input
                id="images"
                ref={imageInputRef}
                hidden
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
              />

              <div className="flex gap-3 flex-wrap mt-3">
                {product.imagePreviews.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Preview ${i + 1}`}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>

            {/* VIDEOS */}

            <div
              className="border-dashed border-2 p-5 rounded-xl cursor-pointer hover:border-blue-500 transition"
              onClick={() => document.getElementById("videos")?.click()}
            >
              <p className="font-medium">Upload Videos</p>

              <p className="text-sm text-gray-500 mt-1">
                Select product videos
              </p>

              <input
                id="videos"
                ref={videoInputRef}
                hidden
                type="file"
                multiple
                accept="video/*"
                onChange={handleVideoChange}
              />

              {product.videoPreviews.map((src, i) => (
                <video
                  key={i}
                  src={src}
                  controls
                  className="w-40 mt-2 rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ===================================================
            DESCRIPTION
        =================================================== */}

        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-800">Description</h3>

          <input
            className="border p-3 rounded-lg w-full"
            name="shortDescription"
            placeholder="Short Description"
            value={product.shortDescription}
            onChange={handleChange}
          />

          <textarea
            className="border p-3 rounded-lg w-full"
            rows={5}
            name="fullDescription"
            placeholder="Full Description"
            value={product.fullDescription}
            onChange={handleChange}
          />
        </div>

        {/* ===================================================
            TAGS
        =================================================== */}

        <div className="space-y-4">
          <h3 className="font-bold text-lg text-gray-800">
            Product Classification
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              className="border p-3 rounded-lg"
              name="tags"
              placeholder="Tags comma separated"
              value={product.tags}
              onChange={handleChange}
            />

            <input
              className="border p-3 rounded-lg"
              name="productcollection"
              placeholder="Product Collection"
              value={product.productcollection}
              onChange={handleChange}
            />

            <input
              className="border p-3 rounded-lg"
              name="highlights"
              placeholder="Highlights comma separated"
              value={product.highlights}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* ===================================================
            GIFTING
        =================================================== */}

        <div className="border rounded-xl p-5 bg-gray-50 space-y-5">
          <div>
            <h3 className="font-bold text-lg text-gray-800">Gifting Options</h3>

            <p className="text-sm text-gray-500 mt-1">
              Configure gifting options available for this product.
            </p>
          </div>

          {/* BOOLEAN OPTIONS */}

          <div className="grid md:grid-cols-3 gap-4">
            {/* GIFT WRAPPING */}

            <label
              className={`
                flex items-center gap-3
                p-4 rounded-lg border
                cursor-pointer
                transition
                ${
                  product.gifting.giftWrappingAvailable
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white"
                }
              `}
            >
              <input
                type="checkbox"
                checked={product.gifting.giftWrappingAvailable}
                onChange={(e) =>
                  handleGiftingChange("giftWrappingAvailable", e.target.checked)
                }
                className="w-5 h-5"
              />

              <div>
                <p className="font-medium">Gift Wrapping</p>

                <p className="text-xs text-gray-500">Allow gift wrapping</p>
              </div>
            </label>

            {/* PERSONALIZED MESSAGE */}

            <label
              className={`
                flex items-center gap-3
                p-4 rounded-lg border
                cursor-pointer
                transition
                ${
                  product.gifting.personalizedMessage
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white"
                }
              `}
            >
              <input
                type="checkbox"
                checked={product.gifting.personalizedMessage}
                onChange={(e) =>
                  handleGiftingChange("personalizedMessage", e.target.checked)
                }
                className="w-5 h-5"
              />

              <div>
                <p className="font-medium">Personalized Message</p>

                <p className="text-xs text-gray-500">
                  Customer can add a message
                </p>
              </div>
            </label>

            {/* CORPORATE GIFTING */}

            <label
              className={`
                flex items-center gap-3
                p-4 rounded-lg border
                cursor-pointer
                transition
                ${
                  product.gifting.corporateGifting
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white"
                }
              `}
            >
              <input
                type="checkbox"
                checked={product.gifting.corporateGifting}
                onChange={(e) =>
                  handleGiftingChange("corporateGifting", e.target.checked)
                }
                className="w-5 h-5"
              />

              <div>
                <p className="font-medium">Corporate Gifting</p>

                <p className="text-xs text-gray-500">
                  Enable bulk corporate gifting
                </p>
              </div>
            </label>
          </div>

          {/* OCCASIONS + FESTIVALS */}

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gifting Occasions
              </label>

              <input
                type="text"
                className="border p-3 rounded-lg w-full bg-white"
                placeholder="Wedding, Birthday, Anniversary"
                value={product.gifting.occasions}
                onChange={(e) =>
                  handleGiftingChange("occasions", e.target.value)
                }
              />

              <p className="text-xs text-gray-500 mt-1">
                Separate multiple occasions with commas.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Festivals
              </label>

              <input
                type="text"
                className="border p-3 rounded-lg w-full bg-white"
                placeholder="Diwali, Rakhi, Christmas"
                value={product.gifting.festivals}
                onChange={(e) =>
                  handleGiftingChange("festivals", e.target.value)
                }
              />

              <p className="text-xs text-gray-500 mt-1">
                Separate multiple festivals with commas.
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================
            PRODUCT ATTRIBUTES
        =================================================== */}

        <div className="space-y-4">
          <h3 className="font-bold text-lg">Product Details</h3>

          {loadingAttributes && (
            <p className="text-sm text-gray-500">Loading attributes...</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {productAttributes.map((attr) => (
              <div key={attr._id} className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  {attr.name}
                </label>

                <input
                  type="text"
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={attributeValues[attr._id] || ""}
                  onChange={(e) =>
                    handleAttributeChange(attr._id, e.target.value)
                  }
                  placeholder={`Enter ${attr.name}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ===================================================
            VARIANTS
        =================================================== */}

        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">Variants</h3>

          <button
            type="button"
            onClick={addVariant}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            + Add Variant
          </button>
        </div>

        {/* ===================================================
            VARIANT LIST
        =================================================== */}

        {variants.map((variant, index) => (
          <div key={index} className="border p-5 rounded-xl space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-semibold">Variant {index + 1}</h4>

              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Remove Variant
                </button>
              )}
            </div>

            {/* SKU */}

            <input
              className="border p-3 rounded-lg w-full"
              placeholder="SKU"
              value={variant.sku}
              onChange={(e) => updateVariantField(index, "sku", e.target.value)}
            />

            {/* PRICE */}

            <div className="grid md:grid-cols-2 gap-3">
              <input
                type="number"
                className="border p-3 rounded-lg"
                placeholder="MRP"
                value={variant.pricing.mrp}
                onChange={(e) =>
                  updateVariantNested(index, "pricing", "mrp", e.target.value)
                }
              />

              <input
                type="number"
                className="border p-3 rounded-lg"
                placeholder="Selling Price"
                value={variant.pricing.sellingPrice}
                onChange={(e) =>
                  updateVariantNested(
                    index,
                    "pricing",
                    "sellingPrice",
                    e.target.value,
                  )
                }
              />
            </div>

            {/* STOCK */}

            <input
              type="number"
              className="border p-3 rounded-lg"
              placeholder="Stock Quantity"
              value={variant.inventory.stockQuantity}
              onChange={(e) =>
                updateVariantNested(
                  index,
                  "inventory",
                  "stockQuantity",
                  e.target.value,
                )
              }
            />

            {/* =================================================
                VARIANT ATTRIBUTES
            ================================================= */}

            {variantAttributes.length > 0 && (
              <div className="space-y-4 pt-3">
                <h4 className="font-semibold text-gray-800">
                  Variant Attributes
                </h4>

                {variantAttributes.map((attr) => {
                  const currentValue = variant.attributes.find(
                    (item) => item.attributeId === attr._id,
                  )?.value;

                  return (
                    <div key={attr._id} className="space-y-2">
                      <label className="font-medium">
                        {attr.name}

                        {attr.unit && ` (${attr.unit})`}
                      </label>

                      {/* TEXT */}

                      {attr.fieldType === "text" && (
                        <input
                          type="text"
                          placeholder={attr.placeholder}
                          className="border p-3 rounded-lg w-full"
                          value={currentValue || ""}
                          onChange={(e) =>
                            handleVariantAttributeChange(
                              index,
                              attr._id,
                              e.target.value,
                            )
                          }
                        />
                      )}

                      {/* NUMBER */}

                      {attr.fieldType === "number" && (
                        <input
                          type="number"
                          placeholder={attr.placeholder}
                          className="border p-3 rounded-lg w-full"
                          value={currentValue || ""}
                          onChange={(e) =>
                            handleVariantAttributeChange(
                              index,
                              attr._id,
                              e.target.value,
                            )
                          }
                        />
                      )}

                      {/* SELECT */}

                      {attr.fieldType === "select" && (
                        <select
                          className="border p-3 rounded-lg w-full"
                          value={currentValue || ""}
                          onChange={(e) =>
                            handleVariantAttributeChange(
                              index,
                              attr._id,
                              e.target.value,
                            )
                          }
                        >
                          <option value="">Select {attr.name}</option>

                          {attr.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}

                      {/* MULTISELECT */}

                      {attr.fieldType === "multiselect" && (
                        <select
                          multiple
                          className="border p-3 rounded-lg w-full h-28"
                          value={
                            Array.isArray(currentValue) ? currentValue : []
                          }
                          onChange={(e) => {
                            const values = Array.from(
                              e.target.selectedOptions,
                            ).map((option) => option.value);

                            handleVariantAttributeChange(
                              index,
                              attr._id,
                              values,
                            );
                          }}
                        >
                          {attr.options?.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}

                      {/* BOOLEAN */}

                      {attr.fieldType === "boolean" && (
                        <label className="flex gap-2 items-center">
                          <input
                            type="checkbox"
                            checked={Boolean(currentValue)}
                            onChange={(e) =>
                              handleVariantAttributeChange(
                                index,
                                attr._id,
                                e.target.checked,
                              )
                            }
                            className="w-5 h-5"
                          />

                          <span>{attr.name}</span>
                        </label>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}

        {/* ===================================================
            SUBMIT
        =================================================== */}

        <div className="pt-4 border-t">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`
              w-full
              md:w-auto
              min-w-[180px]
              px-8
              py-3
              rounded-lg
              font-semibold
              text-white
              flex
              items-center
              justify-center
              gap-2
              transition
              ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#5C4033] hover:bg-[#4a3228]"
              }
            `}
          >
            {isSubmitting ? (
              <>
                {/* LOADER */}

                <span
                  className="
                    w-5
                    h-5
                    border-2
                    border-white/40
                    border-t-white
                    rounded-full
                    animate-spin
                  "
                />

                {editData ? "Updating..." : "Submitting..."}
              </>
            ) : editData ? (
              "Update Product"
            ) : (
              "Create Product"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
