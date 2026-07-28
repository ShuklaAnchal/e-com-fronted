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

  /*
=================================
 PRODUCT STATE
=================================
*/

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

  /*
=================================
 PRODUCT DETAILS ATTRIBUTES
=================================

Example:

Fabric : Silk
Occasion : Wedding

Stored separately
=================================
*/

  const [details, setDetails] = useState([]);

  /*
=================================
 VARIANTS

Example:

Red color
Blue color

Different SKU
Different Price
Different Stock

=================================
*/

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

  /*
=================================
 ATTRIBUTE STATES
=================================
*/

  const [subcategories, setSubcategories] = useState([]);

  const [attributes, setAttributes] = useState([]);

  const [attributeValues, setAttributeValues] = useState({});

  const [loadingSubs, setLoadingSubs] = useState(false);

  const [loadingAttributes, setLoadingAttributes] = useState(false);

  const imageInputRef = useRef(null);

  const videoInputRef = useRef(null);

  /*
=================================
 EDIT MODE
=================================
*/

  useEffect(() => {
    if (!editData) return;

    setProduct({
      name: editData.name || "",

      slug: editData.slug || "",

      shortDescription: editData.shortDescription || "",

      fullDescription: editData.fullDescription || "",

      categoryId: editData.categoryId?._id || "",

      subCategoryId: editData.subCategoryId?._id || "",

      brand: editData.brand || "",

      tags: editData.tags?.join(",") || "",

      highlights: editData.highlights?.join(",") || "",

      images: [],

      videos: [],

      imagePreviews: [],

      videoPreviews: [],
    });
  }, [editData]);

  /*
=================================
 LOAD SUBCATEGORY EDIT MODE
=================================
*/

  useEffect(() => {
    if (!editData?.categoryId?._id) return;

    loadSubCategories(editData.categoryId._id);
  }, [editData]);

  /*
=================================
 LOAD ATTRIBUTES EDIT MODE
=================================
*/

  useEffect(() => {
    if (!editData?.subCategoryId?._id) return;

    fetchAttributes(editData.subCategoryId._id);
  }, [editData]);

  /*
=================================
 INPUT CHANGE
=================================
*/

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,

      [name]: value,
    }));
  };

  /*
=================================
 LOAD SUBCATEGORIES
=================================
*/
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

  /*
=================================
 CATEGORY CHANGE
=================================
*/
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

  /*
=================================
 FETCH ATTRIBUTES
=================================
*/
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

  /*
=================================
 ATTRIBUTE TYPE SPLIT

Normal attributes:

ProductDetails

Variant attributes:

Variants.attributes

=================================
*/

  const productAttributes = attributes.filter(
    (item) => !item.isVariantAttribute,
  );

  const variantAttributes = attributes.filter(
    (item) => item.isVariantAttribute,
  );

  /*
=================================
 SUBCATEGORY CHANGE
=================================
*/

  const handleSubCategoryChange = async (e) => {
    const subCategoryId = e.target.value;

    setProduct((prev) => ({
      ...prev,

      subCategoryId,
    }));

    setAttributeValues({});

    await fetchAttributes(subCategoryId);
  };

  /*
=================================
 PRODUCT ATTRIBUTE CHANGE
=================================
*/
  const handleAttributeChange = (attributeId, value) => {
    setAttributeValues((prev) => ({
      ...prev,

      [attributeId]: value,
    }));
  };


  const prepareDetails = () => {
    return Object.entries(attributeValues).map(([attributeId, value]) => ({
      attributeId,

      value,
    }));
  };

  /*
=================================
 VARIANT ATTRIBUTE CHANGE
=================================
*/

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

  /*
=================================
 ADD VARIANT
=================================
*/

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

  /*
=================================
 REMOVE VARIANT
=================================
*/
  const removeVariant = (index) => {
    setVariants((prev) => prev.filter((_, i) => i !== index));
  };

  /*
=================================
 UPDATE VARIANT FIELD
=================================
*/
  const updateVariantField = (index, field, value) => {
    const updated = [...variants];

    updated[index][field] = value;
    setVariants(updated);
  };

  const updateVariantNested = (index, section, field, value) => {
    const updated = [...variants];

    updated[index][section][field] = value;
    setVariants(updated);
  };

  /*
=================================
 IMAGE UPLOAD
=================================
*/

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setProduct((prev) => ({
      ...prev,
      images: files,

      imagePreviews: files.map((file) => URL.createObjectURL(file)),
    }));
  };

  /*
=================================
 VIDEO UPLOAD
=================================
*/

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);

    setProduct((prev) => ({
      ...prev,
      videos: files,
      videoPreviews: files.map((file) => URL.createObjectURL(file)),
    }));
  };

  //  CLEAN PREVIEW URL

  useEffect(() => {
    return () => {
      product.imagePreviews.forEach((url) => URL.revokeObjectURL(url));

      product.videoPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [product.imagePreviews, product.videoPreviews]);

  //  SUBMIT PRODUCT

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
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

      // status: "active",
    };

    // Product Details
    const productDetails = prepareDetails();

    // FormData
    const formData = new FormData();

    formData.append(
      "productData",
      JSON.stringify(productData)
    );

    formData.append(
      "variants",
      JSON.stringify(variants)
    );

    formData.append(
      "details",
      JSON.stringify(productDetails)
    );

    // Images
    product.images.forEach((image) => {
      formData.append("images", image);
    });

    // Videos
    product.videos.forEach((video) => {
      formData.append("videos", video);
    });

    // =========================
    // EDIT
    // =========================

    if (editData?._id) {
      await dispatch(
        editProductDetails(
          editData._id,
          formData
        )
      );
    }

    // =========================
    // CREATE
    // =========================

    else {
      await dispatch(
        createProduct(formData)
      );
    }

    refreshProducts?.();

    onClose?.();

  } catch (error) {
    console.error(
      "Product submit error:",
      error
    );
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-6">
      {/* BASIC DETAILS */}
      <div className="grid md:grid-cols-3 gap-4">
        <input
          className="border p-2 rounded"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded"
          name="slug"
          placeholder="Slug"
          value={product.slug}
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded"
          name="brand"
          placeholder="Brand"
          value={product.brand}
          onChange={handleChange}
        />
      </div>

      {/* CATEGORY */}

      <div className="grid md:grid-cols-2 gap-4">
        <select
          className="border p-2 rounded"
          value={product.categoryId}
          onChange={handleCategoryChange}
        >
          <option>{loading ? "Loading..." : "Select Category"}</option>

          {categories?.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={product.subCategoryId}
          onChange={handleSubCategoryChange}
        >
          <option>{loadingSubs ? "Loading..." : "Select Subcategory"}</option>
          {subcategories.map((sub) => (
            <option key={sub._id} value={sub._id}>
              {sub.name}
            </option>
          ))}
        </select>
      </div>

      {/* MEDIA */}

      <div className="grid md:grid-cols-2 gap-4">
        <div
          className="border-dashed border-2 p-5 rounded cursor-pointer"
          onClick={() => document.getElementById("images").click()}
        >
          Upload Images
          <input
            id="images"
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
                className="w-24 h-24 object-cover rounded"
              />
            ))}
          </div>
        </div>

        <div
          className="border-dashed border-2 p-5 rounded cursor-pointer"
          onClick={() => document.getElementById("videos").click()}
        >
          Upload Videos
          <input
            id="videos"
            hidden
            type="file"
            multiple
            accept="video/*"
            onChange={handleVideoChange}
          />
          {product.videoPreviews.map((src, i) => (
            <video key={i} src={src} controls className="w-40 mt-2" />
          ))}
        </div>
      </div>

      {/* DESCRIPTION */}
      <input
        className="border p-2 rounded w-full"
        name="shortDescription"
        placeholder="Short Description"
        value={product.shortDescription}
        onChange={handleChange}
      />

      <textarea
        className="border p-2 rounded w-full"
        rows={4}
        name="fullDescription"
        placeholder="Full Description"
        value={product.fullDescription}
        onChange={handleChange}
      />

      {/* TAGS */}

      <div className="grid md:grid-cols-2 gap-4">
        <input
          className="border p-2 rounded"
          name="tags"
          placeholder="Tags comma separated"
          value={product.tags}
          onChange={handleChange}
        />

        <input
          className="border p-2 rounded"
          name="highlights"
          placeholder="Highlights comma separated"
          value={product.highlights}
          onChange={handleChange}
        />
      </div>

      {/* PRODUCT ATTRIBUTES */}
      <h3 className="font-bold text-lg">Product Details</h3>
      {productAttributes.map((attr) => (
        <div key={attr._id}>
          <label>{attr.name}</label>
          <input
            className="border p-2 rounded w-full"
            value={attributeValues[attr._id] || ""}
            onChange={(e) => handleAttributeChange(attr._id, e.target.value)}
          />
        </div>
      ))}

      {/* VARIANTS */}
      <div className="flex justify-between">
        <h3 className="font-bold text-lg">Variants</h3>
        <button
          type="button"
          onClick={addVariant}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Add Variant
        </button>
      </div>

      {variants.map((variant, index) => (
        <div key={index} className="border p-4 rounded space-y-3">
          <input
            className="border p-2 rounded w-full"
            placeholder="SKU"
            value={variant.sku}
            onChange={(e) => updateVariantField(index, "sku", e.target.value)}
          />

          <div className="grid md:grid-cols-2 gap-3">
            <input
              className="border p-2 rounded"
              placeholder="MRP"
              value={variant.pricing.mrp}
              onChange={(e) =>
                updateVariantNested(index, "pricing", "mrp", e.target.value)
              }
            />
            <input
              className="border p-2 rounded"
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
          <input
            className="border p-2 rounded"
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
          {/* VARIANT ATTRIBUTES */}

          {variantAttributes.map((attr) => (
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
                  className="border p-2 rounded w-full"
                  onChange={(e) =>
                    handleVariantAttributeChange(
                      index,
                      attr._id,
                      e.target.value,
                    )
                  }
                />
              )}
              // NUMBER
              {attr.fieldType === "number" && (
                <input
                  type="number"
                  placeholder={attr.placeholder}
                  className="border p-2 rounded w-full"
                  onChange={(e) =>
                    handleVariantAttributeChange(
                      index,
                      attr._id,
                      e.target.value,
                    )
                  }
                />
              )}
              // SELECT
              {attr.fieldType === "select" && (
                <select
                  className="border p-2 rounded w-full"
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
              // MULTISELECT
              {attr.fieldType === "multiselect" && (
                <select
                  multiple
                  className="border p-2 rounded w-full h-28"
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions).map(
                      (option) => option.value,
                    );

                    handleVariantAttributeChange(index, attr._id, values);
                  }}
                >
                  {attr.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
              {attr.fieldType === "boolean" && (
                <label className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleVariantAttributeChange(
                        index,
                        attr._id,
                        e.target.checked,
                      )
                    }
                  />
                  {attr.name}
                </label>
              )}
            </div>
          ))}

          {variants.length > 1 && (
            <button
              type="button"
              onClick={() => removeVariant(index)}
              className="text-red-600"
            >
              Remove Variant
            </button>
          )}
        </div>
      ))}
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
