"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import {
  createProduct,
  editProductDetails,
} from "@/app/store/action/productAction";

import { toast } from "react-toastify";

import { fetchSubcategorybyCategoryID } from "@/app/store/action/subcategoryAction";

import { fetchAttributeBySubCatgeoryID } from "@/app/store/action/attributeAction";

import { useCategories } from "@/app/hooks/catgeoryHook";

// =========================================================
// DEFAULT VARIANT
// =========================================================

const DEFAULT_VARIANT = {
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
};

// =========================================================
// DEFAULT PRODUCT
// =========================================================

const DEFAULT_PRODUCT = {
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

  // =======================================================
  // PRODUCT STATUS
  // =======================================================

  status: "draft",

  isActive: true,

  // =======================================================
  // MEDIA
  // =======================================================

  images: [],
  videos: [],

  imagePreviews: [],
  videoPreviews: [],

  existingImages: [],
  existingVideos: [],

  // =======================================================
  // GIFTING
  // =======================================================

  gifting: {
    giftWrappingAvailable: false,
    personalizedMessage: false,
    corporateGifting: false,
    occasions: "",
    festivals: "",
  },
};

// =========================================================
// COMPONENT
// =========================================================

const ProductForm = ({ editData, onClose, refreshProducts }) => {
  const dispatch = useDispatch();

  const { categories, loading } = useCategories();

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  // =======================================================
  // STATES
  // =======================================================

  const [product, setProduct] = useState(DEFAULT_PRODUCT);

  const [details, setDetails] = useState([]);

  const [variants, setVariants] = useState([
    {
      ...DEFAULT_VARIANT,
      isDefault: true,
    },
  ]);

  const [subcategories, setSubcategories] = useState([]);

  const [attributes, setAttributes] = useState([]);

  const [attributeValues, setAttributeValues] = useState({});

  const [loadingSubs, setLoadingSubs] = useState(false);

  const [loadingAttributes, setLoadingAttributes] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // =========================================================
  // HELPERS
  // =========================================================

  const getId = (value) => {
    if (!value) return "";

    if (typeof value === "string") return value;

    if (value._id) return value._id.toString();

    if (value.$oid) return value.$oid.toString();

    return value.toString();
  };

  const getArray = (value) => {
    if (Array.isArray(value)) return value;

    if (typeof value === "string") {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }

    return [];
  };

  // =========================================================
  // NORMALIZE VARIANT
  // =========================================================

  const normalizeVariant = (variant, index) => {
    return {
      ...DEFAULT_VARIANT,

      ...variant,

      sku: variant?.sku || "",

      barcode: variant?.barcode || "",

      pricing: {
        ...DEFAULT_VARIANT.pricing,

        ...(variant?.pricing || {}),

        mrp:
          variant?.pricing?.mrp !== undefined
            ? variant.pricing.mrp
            : "",

        sellingPrice:
          variant?.pricing?.sellingPrice !== undefined
            ? variant.pricing.sellingPrice
            : "",

        gstRate:
          variant?.pricing?.gstRate !== undefined
            ? variant.pricing.gstRate
            : 18,

        discountPercent:
          variant?.pricing?.discountPercent !== undefined
            ? variant.pricing.discountPercent
            : 0,
      },

      inventory: {
        ...DEFAULT_VARIANT.inventory,

        ...(variant?.inventory || {}),

        stockQuantity:
          variant?.inventory?.stockQuantity !== undefined
            ? variant.inventory.stockQuantity
            : "",

        lowStockThreshold:
          variant?.inventory?.lowStockThreshold !== undefined
            ? variant.inventory.lowStockThreshold
            : 5,

        reservedStock:
          variant?.inventory?.reservedStock !== undefined
            ? variant.inventory.reservedStock
            : 0,

        inStock:
          variant?.inventory?.inStock !== undefined
            ? variant.inventory.inStock
            : true,

        backorderAllowed:
          variant?.inventory?.backorderAllowed !== undefined
            ? variant.inventory.backorderAllowed
            : false,

        preOrder:
          variant?.inventory?.preOrder !== undefined
            ? variant.inventory.preOrder
            : false,
      },

      shippingWeight:
        variant?.shippingWeight !== undefined
          ? variant.shippingWeight
          : "",

      isDefault:
        index === 0 ? true : Boolean(variant?.isDefault),

      attributes: Array.isArray(variant?.attributes)
        ? variant.attributes.map((item) => ({
            ...item,

            attributeId: getId(item.attributeId),

            value: item.value,
          }))
        : [],
    };
  };

  // =========================================================
  // EDIT MODE
  // =========================================================

  useEffect(() => {
    if (!editData) return;

    const categoryId = getId(editData.categoryId);

    const subCategoryId = getId(editData.subCategoryId);

    const normalizedDetails = Array.isArray(editData.details)
      ? editData.details
      : [];

    // =======================================================
    // EXISTING PRODUCT ATTRIBUTES
    // =======================================================

    const existingAttributeValues = {};

    normalizedDetails.forEach((detail) => {
      const attributeId = getId(detail.attributeId);

      if (attributeId) {
        existingAttributeValues[attributeId] = detail.value;
      }
    });

    // =======================================================
    // SET PRODUCT
    // =======================================================

    setProduct({
      name: editData.name || "",

      slug: editData.slug || "",

      shortDescription: editData.shortDescription || "",

      fullDescription: editData.fullDescription || "",

      categoryId,

      subCategoryId,

      brand: editData.brand || "",

      tags: getArray(editData.tags).join(", "),

      highlights: getArray(editData.highlights).join(", "),

      productcollection: editData.productcollection || "",

      // =====================================================
      // PRODUCT STATUS
      // =====================================================

      status: editData.status || "draft",

      isActive:
        editData.isActive !== undefined
          ? Boolean(editData.isActive)
          : true,

      // =====================================================
      // MEDIA
      // =====================================================

      images: [],

      videos: [],

      imagePreviews: [],

      videoPreviews: [],

      existingImages: Array.isArray(editData.images)
        ? editData.images
        : [],

      existingVideos: Array.isArray(editData.videos)
        ? editData.videos
        : [],

      // =====================================================
      // GIFTING
      // =====================================================

      gifting: {
        giftWrappingAvailable: Boolean(
          editData.gifting?.giftWrappingAvailable
        ),

        personalizedMessage: Boolean(
          editData.gifting?.personalizedMessage
        ),

        corporateGifting: Boolean(
          editData.gifting?.corporateGifting
        ),

        occasions: getArray(
          editData.gifting?.occasions
        ).join(", "),

        festivals: getArray(
          editData.gifting?.festivals
        ).join(", "),
      },
    });

    // =======================================================
    // SET ATTRIBUTE VALUES
    // =======================================================

    setAttributeValues(existingAttributeValues);

    setDetails(normalizedDetails);

    // =======================================================
    // LOAD VARIANTS
    // =======================================================

    if (
      Array.isArray(editData.variants) &&
      editData.variants.length > 0
    ) {
      setVariants(
        editData.variants.map((variant, index) =>
          normalizeVariant(variant, index)
        )
      );
    } else {
      setVariants([
        {
          ...DEFAULT_VARIANT,

          isDefault: true,
        },
      ]);
    }

    // =======================================================
    // LOAD SUBCATEGORIES
    // =======================================================

    if (categoryId) {
      loadSubCategories(categoryId);
    }

    // =======================================================
    // LOAD ATTRIBUTES
    // =======================================================

    if (subCategoryId) {
      fetchAttributes(subCategoryId);
    }
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

      return [];
    }

    try {
      setLoadingSubs(true);

      const res = await dispatch(
        fetchSubcategorybyCategoryID(categoryId)
      );

      const list = res?.subcategories || [];

      setSubcategories(list);

      return list;
    } catch (error) {
      console.error(
        "Subcategory loading error:",
        error
      );

      setSubcategories([]);

      return [];
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

    setDetails([]);

    await loadSubCategories(categoryId);
  };

  // =========================================================
  // FETCH ATTRIBUTES
  // =========================================================

  const fetchAttributes = async (subCategoryId) => {
    if (!subCategoryId) {
      setAttributes([]);

      return [];
    }

    try {
      setLoadingAttributes(true);

      const res = await dispatch(
        fetchAttributeBySubCatgeoryID(subCategoryId)
      );

      console.log("ATTRIBUTES:", res);

      const list = res?.attributes || [];

      setAttributes(list);

      return list;
    } catch (error) {
      console.error(
        "Attribute loading error:",
        error
      );

      setAttributes([]);

      return [];
    } finally {
      setLoadingAttributes(false);
    }
  };

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

    setDetails([]);

    await fetchAttributes(subCategoryId);
  };

  // =========================================================
  // ATTRIBUTE TYPE SPLIT
  // =========================================================

  const productAttributes = attributes.filter(
    (item) => !item.isVariantAttribute
  );

  const variantAttributes = attributes.filter(
    (item) => item.isVariantAttribute
  );

  // =========================================================
  // PRODUCT ATTRIBUTE CHANGE
  // =========================================================

  const handleAttributeChange = (
    attributeId,
    value
  ) => {
    setAttributeValues((prev) => ({
      ...prev,

      [attributeId]: value,
    }));
  };

  // =========================================================
  // PREPARE DETAILS
  // =========================================================

  const prepareDetails = () => {
    return Object.entries(attributeValues)
      .filter(([attributeId]) => attributeId)
      .map(([attributeId, value]) => ({
        attributeId,

        value,
      }));
  };

  // =========================================================
  // VARIANT ATTRIBUTE CHANGE
  // =========================================================

  const handleVariantAttributeChange = (
    variantIndex,
    attributeId,
    value
  ) => {
    setVariants((prev) => {
      const updated = [...prev];

      const variant = {
        ...updated[variantIndex],
      };

      const variantAttributesList = [
        ...(variant.attributes || []),
      ];

      const existingIndex =
        variantAttributesList.findIndex(
          (item) =>
            getId(item.attributeId) ===
            getId(attributeId)
        );

      if (existingIndex >= 0) {
        variantAttributesList[existingIndex] = {
          ...variantAttributesList[existingIndex],

          attributeId,

          value,
        };
      } else {
        variantAttributesList.push({
          attributeId,

          value,
        });
      }

      variant.attributes = variantAttributesList;

      updated[variantIndex] = variant;

      return updated;
    });
  };

  // =========================================================
  // ADD VARIANT
  // =========================================================

  const addVariant = () => {
    setVariants((prev) => [
      ...prev,

      {
        ...DEFAULT_VARIANT,

        pricing: {
          ...DEFAULT_VARIANT.pricing,
        },

        inventory: {
          ...DEFAULT_VARIANT.inventory,
        },

        isDefault: false,

        attributes: [],
      },
    ]);
  };

  // =========================================================
  // REMOVE VARIANT
  // =========================================================

  const removeVariant = (index) => {
    setVariants((prev) => {
      const updated = prev.filter(
        (_, i) => i !== index
      );

      if (updated.length > 0) {
        updated[0] = {
          ...updated[0],

          isDefault: true,
        };
      }

      return updated;
    });
  };

  // =========================================================
  // UPDATE VARIANT FIELD
  // =========================================================

  const updateVariantField = (
    index,
    field,
    value
  ) => {
    setVariants((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],

        [field]: value,
      };

      return updated;
    });
  };

  // =========================================================
  // UPDATE VARIANT NESTED
  // =========================================================

  const updateVariantNested = (
    index,
    section,
    field,
    value
  ) => {
    setVariants((prev) => {
      const updated = [...prev];

      updated[index] = {
        ...updated[index],

        [section]: {
          ...updated[index][section],

          [field]: value,
        },
      };

      return updated;
    });
  };

  // =========================================================
  // IMAGE UPLOAD
  // =========================================================

  const handleImageChange = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    setProduct((prev) => ({
      ...prev,

      images: files,

      imagePreviews: files.map((file) =>
        URL.createObjectURL(file)
      ),
    }));
  };

  // =========================================================
  // VIDEO UPLOAD
  // =========================================================

  const handleVideoChange = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    setProduct((prev) => ({
      ...prev,

      videos: files,

      videoPreviews: files.map((file) =>
        URL.createObjectURL(file)
      ),
    }));
  };

  // =========================================================
  // REMOVE EXISTING IMAGE
  // =========================================================

  const removeExistingImage = (index) => {
    setProduct((prev) => ({
      ...prev,

      existingImages:
        prev.existingImages.filter(
          (_, i) => i !== index
        ),
    }));
  };

  // =========================================================
  // REMOVE EXISTING VIDEO
  // =========================================================

  const removeExistingVideo = (index) => {
    setProduct((prev) => ({
      ...prev,

      existingVideos:
        prev.existingVideos.filter(
          (_, i) => i !== index
        ),
    }));
  };

  // =========================================================
  // CLEAN PREVIEW URL
  // =========================================================

  useEffect(() => {
    return () => {
      product.imagePreviews.forEach((url) => {
        URL.revokeObjectURL(url);
      });

      product.videoPreviews.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [
    product.imagePreviews,
    product.videoPreviews,
  ]);

  // =========================================================
  // PREPARE VARIANTS
  // =========================================================

  const prepareVariants = () => {
    return variants.map((variant, index) => ({
      ...variant,

      sku: variant.sku?.trim() || "",

      barcode: variant.barcode?.trim() || "",

      pricing: {
        ...variant.pricing,

        mrp:
          variant.pricing.mrp === ""
            ? 0
            : Number(variant.pricing.mrp),

        sellingPrice:
          variant.pricing.sellingPrice === ""
            ? 0
            : Number(
                variant.pricing.sellingPrice
              ),

        gstRate:
          variant.pricing.gstRate === ""
            ? 0
            : Number(
                variant.pricing.gstRate
              ),

        discountPercent:
          variant.pricing.discountPercent === ""
            ? 0
            : Number(
                variant.pricing
                  .discountPercent
              ),

        currency:
          variant.pricing.currency || "INR",

        taxIncluded: Boolean(
          variant.pricing.taxIncluded
        ),
      },

      inventory: {
        ...variant.inventory,

        stockQuantity:
          variant.inventory.stockQuantity === ""
            ? 0
            : Number(
                variant.inventory
                  .stockQuantity
              ),

        lowStockThreshold:
          variant.inventory
            .lowStockThreshold === ""
            ? 0
            : Number(
                variant.inventory
                  .lowStockThreshold
              ),

        reservedStock:
          variant.inventory.reservedStock === ""
            ? 0
            : Number(
                variant.inventory
                  .reservedStock
              ),

        inStock: Boolean(
          variant.inventory.inStock
        ),

        backorderAllowed: Boolean(
          variant.inventory
            .backorderAllowed
        ),

        preOrder: Boolean(
          variant.inventory.preOrder
        ),
      },

      shippingWeight:
        variant.shippingWeight === ""
          ? 0
          : Number(
              variant.shippingWeight
            ),

      isDefault: index === 0,

      attributes: (
        variant.attributes || []
      ).map((item) => ({
        ...item,

        attributeId: getId(
          item.attributeId
        ),

        value: item.value,
      })),
    }));
  };

  // =========================================================
  // SUBMIT PRODUCT
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // =====================================================
      // VALIDATION
      // =====================================================

      if (!product.name.trim()) {
        toast.error(
          "Product name is required."
        );

        return;
      }

      if (!product.slug.trim()) {
        toast.error(
          "Product slug is required."
        );

        return;
      }

      if (!product.categoryId) {
        toast.error(
          "Please select a category."
        );

        return;
      }

      // =====================================================
      // PRODUCT DATA
      // =====================================================

      const productData = {
        name: product.name.trim(),

        slug: product.slug.trim(),

        shortDescription:
          product.shortDescription?.trim() ||
          "",

        fullDescription:
          product.fullDescription?.trim() ||
          "",

        categoryId:
          product.categoryId,

        subCategoryId:
          product.subCategoryId || null,

        brand:
          product.brand?.trim() ||
          "Siyaas",

        tags: getArray(
          product.tags
        ),

        highlights: getArray(
          product.highlights
        ),

        productcollection:
          product.productcollection?.trim() ||
          "",

        // ===================================================
        // PRODUCT STATUS
        // ===================================================

        status:
          product.status || "draft",

        isActive: Boolean(
          product.isActive
        ),

        // ===================================================
        // GIFTING
        // ===================================================

        gifting: {
          giftWrappingAvailable:
            Boolean(
              product.gifting
                .giftWrappingAvailable
            ),

          personalizedMessage:
            Boolean(
              product.gifting
                .personalizedMessage
            ),

          corporateGifting:
            Boolean(
              product.gifting
                .corporateGifting
            ),

          occasions: getArray(
            product.gifting.occasions
          ),

          festivals: getArray(
            product.gifting.festivals
          ),
        },
      };

      // =====================================================
      // DETAILS
      // =====================================================

      const productDetails =
        prepareDetails();

      // =====================================================
      // VARIANTS
      // =====================================================

      const preparedVariants =
        prepareVariants();

      // =====================================================
      // FORM DATA
      // =====================================================

      const formData = new FormData();

      formData.append(
        "productData",
        JSON.stringify(productData)
      );

      formData.append(
        "variants",
        JSON.stringify(
          preparedVariants
        )
      );

      formData.append(
        "details",
        JSON.stringify(
          productDetails
        )
      );

      // =====================================================
      // EXISTING IMAGES
      // =====================================================

      if (editData?._id) {
        formData.append(
          "existingImages",
          JSON.stringify(
            product.existingImages
          )
        );

        formData.append(
          "existingVideos",
          JSON.stringify(
            product.existingVideos
          )
        );
      }

      // =====================================================
      // NEW IMAGES
      // =====================================================

      product.images.forEach(
        (image) => {
          formData.append(
            "images",
            image
          );
        }
      );

      // =====================================================
      // NEW VIDEOS
      // =====================================================

      product.videos.forEach(
        (video) => {
          formData.append(
            "videos",
            video
          );
        }
      );

      // =====================================================
      // DEBUG
      // =====================================================

      console.log(
        "========== PRODUCT SUBMIT DATA =========="
      );

      console.log(
        "Product:",
        productData
      );

      console.log(
        "Details:",
        productDetails
      );

      console.log(
        "Variants:",
        preparedVariants
      );

      console.log(
        "Existing Images:",
        product.existingImages
      );

      console.log(
        "Existing Videos:",
        product.existingVideos
      );

      // =====================================================
      // UPDATE PRODUCT
      // =====================================================

      if (editData?._id) {
        await dispatch(
          editProductDetails(
            editData._id,
            formData
          )
        );

        toast.success(
          "Product updated successfully!"
        );
      }

      // =====================================================
      // CREATE PRODUCT
      // =====================================================

      else {
        await dispatch(
          createProduct(formData)
        );

        toast.success(
          "Product created successfully!"
        );
      }

      // =====================================================
      // REFRESH PRODUCTS
      // =====================================================

      refreshProducts?.();

    } catch (error) {
      console.error(
        "Product submit error:",
        error
      );

      toast.error(
        error?.message ||
          "Something went wrong while saving the product."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // =========================================================
  // CLOSE
  // =========================================================

  const handleClose = () => {
    if (isSubmitting) return;

    onClose?.();
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="w-full bg-white rounded-2xl">

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* ===================================================
            BASIC DETAILS
        =================================================== */}

        <div className="space-y-4">

          <h3 className="font-bold text-lg text-gray-800">
            Basic Details
          </h3>

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
              value={
                product.productcollection
              }
              onChange={handleChange}
            />

          </div>
        </div>

        {/* ===================================================
            PRODUCT STATUS
        =================================================== */}

        <div className="space-y-4">

          <div>
            <h3 className="font-bold text-lg text-gray-800">
              Product Status
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Control the publishing status and availability
              of this product.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">

            {/* STATUS */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>

              <select
                className="border p-3 rounded-lg w-full bg-white"
                value={product.status}
                onChange={(e) =>
                  setProduct((prev) => ({
                    ...prev,
                    status: e.target.value,
                  }))
                }
              >

                <option value="draft">
                  Draft
                </option>

                <option value="published">
                  Published
                </option>

                <option value="archived">
                  Archived
                </option>

              </select>

            </div>

            {/* ACTIVE / INACTIVE */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Availability
              </label>

              <label
                className={`
                  flex items-center justify-between
                  border rounded-lg p-3
                  cursor-pointer transition
                  ${
                    product.isActive
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 bg-gray-50"
                  }
                `}
              >

                <div>

                  <p className="font-medium text-gray-800">
                    {product.isActive
                      ? "Active"
                      : "Inactive"}
                  </p>

                  <p className="text-xs text-gray-500">
                    {product.isActive
                      ? "Product is active and available"
                      : "Product is currently disabled"}
                  </p>

                </div>

                <input
                  type="checkbox"
                  checked={Boolean(
                    product.isActive
                  )}
                  onChange={(e) =>
                    setProduct((prev) => ({
                      ...prev,

                      isActive:
                        e.target.checked,
                    }))
                  }
                  className="w-5 h-5"
                />

              </label>

            </div>

          </div>

        </div>

        {/* ===================================================
            CATEGORY
        =================================================== */}

        <div className="space-y-4">

          <h3 className="font-bold text-lg text-gray-800">
            Category
          </h3>

          <div className="grid md:grid-cols-2 gap-4">

            <select
              className="border p-3 rounded-lg"
              value={product.categoryId}
              onChange={
                handleCategoryChange
              }
              required
            >

              <option value="">
                {loading
                  ? "Loading..."
                  : "Select Category"}
              </option>

              {categories?.map(
                (category) => (
                  <option
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </option>
                )
              )}

            </select>

            <select
              className="border p-3 rounded-lg"
              value={
                product.subCategoryId
              }
              onChange={
                handleSubCategoryChange
              }
            >

              <option value="">
                {loadingSubs
                  ? "Loading..."
                  : "Select Subcategory"}
              </option>

              {subcategories.map(
                (sub) => (
                  <option
                    key={sub._id}
                    value={sub._id}
                  >
                    {sub.name}
                  </option>
                )
              )}

            </select>

          </div>
        </div>

        {/* ===================================================
            MEDIA
        =================================================== */}

        <div className="space-y-4">

          <h3 className="font-bold text-lg text-gray-800">
            Product Media
          </h3>

          <div className="grid md:grid-cols-2 gap-4">

            {/* IMAGES */}

            <div className="border rounded-xl p-5">

              <div
                className="border-dashed border-2 p-5 rounded-xl cursor-pointer hover:border-blue-500 transition"
                onClick={() =>
                  imageInputRef.current?.click()
                }
              >

                <p className="font-medium">
                  Upload Images
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Select new product images
                </p>

                <input
                  ref={imageInputRef}
                  hidden
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={
                    handleImageChange
                  }
                />

              </div>

              {/* EXISTING IMAGES */}

              {product.existingImages
                .length > 0 && (

                <div className="mt-4">

                  <p className="text-sm font-medium mb-2">
                    Existing Images
                  </p>

                  <div className="flex gap-3 flex-wrap">

                    {product.existingImages.map(
                      (image, index) => {

                        const imageUrl =
                          typeof image ===
                          "string"
                            ? image
                            : image.url ||
                              image.secure_url ||
                              image.path;

                        return (
                          <div
                            key={index}
                            className="relative"
                          >

                            <img
                              src={imageUrl}
                              alt={`Existing ${
                                index + 1
                              }`}
                              className="w-24 h-24 object-cover rounded-lg"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                removeExistingImage(
                                  index
                                )
                              }
                              className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs"
                            >
                              ×
                            </button>

                          </div>
                        );
                      }
                    )}

                  </div>
                </div>
              )}

              {/* NEW IMAGE PREVIEWS */}

              {product.imagePreviews
                .length > 0 && (

                <div className="mt-4">

                  <p className="text-sm font-medium mb-2">
                    New Images
                  </p>

                  <div className="flex gap-3 flex-wrap">

                    {product.imagePreviews.map(
                      (src, index) => (
                        <img
                          key={index}
                          src={src}
                          alt={`Preview ${
                            index + 1
                          }`}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      )
                    )}

                  </div>

                </div>
              )}

            </div>

            {/* VIDEOS */}

            <div className="border rounded-xl p-5">

              <div
                className="border-dashed border-2 p-5 rounded-xl cursor-pointer hover:border-blue-500 transition"
                onClick={() =>
                  videoInputRef.current?.click()
                }
              >

                <p className="font-medium">
                  Upload Videos
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Select new product videos
                </p>

                <input
                  ref={videoInputRef}
                  hidden
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={
                    handleVideoChange
                  }
                />

              </div>

              {/* EXISTING VIDEOS */}

              {product.existingVideos
                .length > 0 && (

                <div className="mt-4">

                  <p className="text-sm font-medium mb-2">
                    Existing Videos
                  </p>

                  <div className="flex gap-3 flex-wrap">

                    {product.existingVideos.map(
                      (video, index) => {

                        const videoUrl =
                          typeof video ===
                          "string"
                            ? video
                            : video.url ||
                              video.secure_url ||
                              video.path;

                        return (
                          <div
                            key={index}
                            className="relative"
                          >

                            <video
                              src={videoUrl}
                              controls
                              className="w-40 rounded-lg"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                removeExistingVideo(
                                  index
                                )
                              }
                              className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs"
                            >
                              ×
                            </button>

                          </div>
                        );
                      }
                    )}

                  </div>

                </div>
              )}

              {/* NEW VIDEO PREVIEWS */}

              {product.videoPreviews
                .length > 0 && (

                <div className="mt-4">

                  <p className="text-sm font-medium mb-2">
                    New Videos
                  </p>

                  {product.videoPreviews.map(
                    (src, index) => (
                      <video
                        key={index}
                        src={src}
                        controls
                        className="w-40 mt-2 rounded-lg"
                      />
                    )
                  )}

                </div>
              )}

            </div>

          </div>

        </div>

        {/* ===================================================
            DESCRIPTION
        =================================================== */}

        <div className="space-y-4">

          <h3 className="font-bold text-lg text-gray-800">
            Description
          </h3>

          <input
            className="border p-3 rounded-lg w-full"
            name="shortDescription"
            placeholder="Short Description"
            value={
              product.shortDescription
            }
            onChange={handleChange}
          />

          <textarea
            className="border p-3 rounded-lg w-full"
            rows={5}
            name="fullDescription"
            placeholder="Full Description"
            value={
              product.fullDescription
            }
            onChange={handleChange}
          />

        </div>

        {/* ===================================================
            CLASSIFICATION
        =================================================== */}

        <div className="space-y-4">

          <h3 className="font-bold text-lg text-gray-800">
            Product Classification
          </h3>

          <div className="grid md:grid-cols-2 gap-4">

            <input
              className="border p-3 rounded-lg"
              name="tags"
              placeholder="Tags comma separated"
              value={product.tags}
              onChange={handleChange}
            />

            <input
              className="border p-3 rounded-lg"
              name="highlights"
              placeholder="Highlights comma separated"
              value={
                product.highlights
              }
              onChange={handleChange}
            />

          </div>

        </div>

        {/* ===================================================
            GIFTING
        =================================================== */}

        <div className="border rounded-xl p-5 bg-gray-50 space-y-5">

          <div>

            <h3 className="font-bold text-lg text-gray-800">
              Gifting Options
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Configure gifting options available for
              this product.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-4">

            {/* GIFT WRAPPING */}

            <label
              className={`
                flex items-center gap-3
                p-4 rounded-lg border
                cursor-pointer transition
                ${
                  product.gifting
                    .giftWrappingAvailable
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white"
                }
              `}
            >

              <input
                type="checkbox"
                checked={Boolean(
                  product.gifting
                    .giftWrappingAvailable
                )}
                onChange={(e) =>
                  handleGiftingChange(
                    "giftWrappingAvailable",
                    e.target.checked
                  )
                }
                className="w-5 h-5"
              />

              <div>

                <p className="font-medium">
                  Gift Wrapping
                </p>

                <p className="text-xs text-gray-500">
                  Allow gift wrapping
                </p>

              </div>

            </label>

            {/* PERSONALIZED */}

            <label
              className={`
                flex items-center gap-3
                p-4 rounded-lg border
                cursor-pointer transition
                ${
                  product.gifting
                    .personalizedMessage
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white"
                }
              `}
            >

              <input
                type="checkbox"
                checked={Boolean(
                  product.gifting
                    .personalizedMessage
                )}
                onChange={(e) =>
                  handleGiftingChange(
                    "personalizedMessage",
                    e.target.checked
                  )
                }
                className="w-5 h-5"
              />

              <div>

                <p className="font-medium">
                  Personalized Message
                </p>

                <p className="text-xs text-gray-500">
                  Customer can add a message
                </p>

              </div>

            </label>

            {/* CORPORATE */}

            <label
              className={`
                flex items-center gap-3
                p-4 rounded-lg border
                cursor-pointer transition
                ${
                  product.gifting
                    .corporateGifting
                    ? "border-green-500 bg-green-50"
                    : "border-gray-200 bg-white"
                }
              `}
            >

              <input
                type="checkbox"
                checked={Boolean(
                  product.gifting
                    .corporateGifting
                )}
                onChange={(e) =>
                  handleGiftingChange(
                    "corporateGifting",
                    e.target.checked
                  )
                }
                className="w-5 h-5"
              />

              <div>

                <p className="font-medium">
                  Corporate Gifting
                </p>

                <p className="text-xs text-gray-500">
                  Enable bulk corporate gifting
                </p>

              </div>

            </label>

          </div>

          <div className="grid md:grid-cols-2 gap-4">

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gifting Occasions
              </label>

              <input
                type="text"
                className="border p-3 rounded-lg w-full bg-white"
                placeholder="Wedding, Birthday, Anniversary"
                value={
                  product.gifting.occasions
                }
                onChange={(e) =>
                  handleGiftingChange(
                    "occasions",
                    e.target.value
                  )
                }
              />

            </div>

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Festivals
              </label>

              <input
                type="text"
                className="border p-3 rounded-lg w-full bg-white"
                placeholder="Diwali, Rakhi, Christmas"
                value={
                  product.gifting.festivals
                }
                onChange={(e) =>
                  handleGiftingChange(
                    "festivals",
                    e.target.value
                  )
                }
              />

            </div>

          </div>

        </div>

        {/* ===================================================
            PRODUCT ATTRIBUTES
        =================================================== */}

        <div className="space-y-4">

          <h3 className="font-bold text-lg">
            Product Details
          </h3>

          {loadingAttributes && (
            <p className="text-sm text-gray-500">
              Loading attributes...
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {productAttributes.map(
              (attr) => (
                <div
                  key={attr._id}
                  className="flex flex-col gap-1"
                >

                  <label className="text-sm font-medium text-gray-700">
                    {attr.name}

                    {attr.unit &&
                      ` (${attr.unit})`}
                  </label>

                  <input
                    type="text"
                    className="border border-gray-300 p-3 rounded-lg w-full"
                    value={
                      attributeValues[
                        attr._id
                      ] ?? ""
                    }
                    onChange={(e) =>
                      handleAttributeChange(
                        attr._id,
                        e.target.value
                      )
                    }
                    placeholder={`Enter ${attr.name}`}
                  />

                </div>
              )
            )}

          </div>

        </div>

        {/* ===================================================
            VARIANTS HEADER
        =================================================== */}

        <div className="flex justify-between items-center">

          <h3 className="font-bold text-lg">
            Variants
          </h3>

          <button
            type="button"
            onClick={addVariant}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            + Add Variant
          </button>

        </div>

        {/* ===================================================
            VARIANTS
        =================================================== */}

        {variants.map(
          (variant, index) => (

            <div
              key={
                variant._id || index
              }
              className="border p-5 rounded-xl space-y-4"
            >

              <div className="flex justify-between items-center">

                <h4 className="font-semibold">
                  Variant {index + 1}
                </h4>

                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      removeVariant(
                        index
                      )
                    }
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Remove Variant
                  </button>
                )}

              </div>

              {/* SKU + BARCODE */}

              <div className="grid md:grid-cols-2 gap-3">

                <input
                  className="border p-3 rounded-lg"
                  placeholder="SKU"
                  value={
                    variant.sku || ""
                  }
                  onChange={(e) =>
                    updateVariantField(
                      index,
                      "sku",
                      e.target.value
                    )
                  }
                />

                <input
                  className="border p-3 rounded-lg"
                  placeholder="Barcode"
                  value={
                    variant.barcode || ""
                  }
                  onChange={(e) =>
                    updateVariantField(
                      index,
                      "barcode",
                      e.target.value
                    )
                  }
                />

              </div>

              {/* PRICE */}

              <div className="grid md:grid-cols-2 gap-3">

                <input
                  type="number"
                  className="border p-3 rounded-lg"
                  placeholder="MRP"
                  value={
                    variant.pricing
                      ?.mrp ?? ""
                  }
                  onChange={(e) =>
                    updateVariantNested(
                      index,
                      "pricing",
                      "mrp",
                      e.target.value
                    )
                  }
                />

                <input
                  type="number"
                  className="border p-3 rounded-lg"
                  placeholder="Selling Price"
                  value={
                    variant.pricing
                      ?.sellingPrice ?? ""
                  }
                  onChange={(e) =>
                    updateVariantNested(
                      index,
                      "pricing",
                      "sellingPrice",
                      e.target.value
                    )
                  }
                />

              </div>

              {/* GST */}

              <div className="grid md:grid-cols-3 gap-3">

                <input
                  type="number"
                  className="border p-3 rounded-lg"
                  placeholder="GST Rate"
                  value={
                    variant.pricing
                      ?.gstRate ?? ""
                  }
                  onChange={(e) =>
                    updateVariantNested(
                      index,
                      "pricing",
                      "gstRate",
                      e.target.value
                    )
                  }
                />

                <input
                  type="number"
                  className="border p-3 rounded-lg"
                  placeholder="Discount %"
                  value={
                    variant.pricing
                      ?.discountPercent ?? ""
                  }
                  onChange={(e) =>
                    updateVariantNested(
                      index,
                      "pricing",
                      "discountPercent",
                      e.target.value
                    )
                  }
                />

                <input
                  className="border p-3 rounded-lg"
                  placeholder="Currency"
                  value={
                    variant.pricing
                      ?.currency || "INR"
                  }
                  onChange={(e) =>
                    updateVariantNested(
                      index,
                      "pricing",
                      "currency",
                      e.target.value
                    )
                  }
                />

              </div>

              {/* TAX INCLUDED */}

              <label className="flex items-center gap-2">

                <input
                  type="checkbox"
                  checked={Boolean(
                    variant.pricing
                      ?.taxIncluded
                  )}
                  onChange={(e) =>
                    updateVariantNested(
                      index,
                      "pricing",
                      "taxIncluded",
                      e.target.checked
                    )
                  }
                  className="w-5 h-5"
                />

                <span className="text-sm">
                  Tax Included
                </span>

              </label>

              {/* INVENTORY */}

              <div className="grid md:grid-cols-2 gap-3">

                <input
                  type="number"
                  className="border p-3 rounded-lg"
                  placeholder="Stock Quantity"
                  value={
                    variant.inventory
                      ?.stockQuantity ?? ""
                  }
                  onChange={(e) =>
                    updateVariantNested(
                      index,
                      "inventory",
                      "stockQuantity",
                      e.target.value
                    )
                  }
                />

                <input
                  type="number"
                  className="border p-3 rounded-lg"
                  placeholder="Low Stock Threshold"
                  value={
                    variant.inventory
                      ?.lowStockThreshold ?? ""
                  }
                  onChange={(e) =>
                    updateVariantNested(
                      index,
                      "inventory",
                      "lowStockThreshold",
                      e.target.value
                    )
                  }
                />

              </div>

              {/* SHIPPING */}

              <input
                type="number"
                className="border p-3 rounded-lg w-full"
                placeholder="Shipping Weight"
                value={
                  variant.shippingWeight ??
                  ""
                }
                onChange={(e) =>
                  updateVariantField(
                    index,
                    "shippingWeight",
                    e.target.value
                  )
                }
              />

              {/* INVENTORY OPTIONS */}

              <div className="grid md:grid-cols-3 gap-3">

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    checked={Boolean(
                      variant.inventory
                        ?.inStock
                    )}
                    onChange={(e) =>
                      updateVariantNested(
                        index,
                        "inventory",
                        "inStock",
                        e.target.checked
                      )
                    }
                  />

                  In Stock

                </label>

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    checked={Boolean(
                      variant.inventory
                        ?.backorderAllowed
                    )}
                    onChange={(e) =>
                      updateVariantNested(
                        index,
                        "inventory",
                        "backorderAllowed",
                        e.target.checked
                      )
                    }
                  />

                  Backorder Allowed

                </label>

                <label className="flex items-center gap-2">

                  <input
                    type="checkbox"
                    checked={Boolean(
                      variant.inventory
                        ?.preOrder
                    )}
                    onChange={(e) =>
                      updateVariantNested(
                        index,
                        "inventory",
                        "preOrder",
                        e.target.checked
                      )
                    }
                  />

                  Pre Order

                </label>

              </div>

              {/* =================================================
                  VARIANT ATTRIBUTES
              ================================================= */}

              {variantAttributes.length >
                0 && (

                <div className="space-y-4 pt-3">

                  <h4 className="font-semibold text-gray-800">
                    Variant Attributes
                  </h4>

                  {variantAttributes.map(
                    (attr) => {

                      const currentValue =
                        variant.attributes?.find(
                          (item) =>
                            getId(
                              item.attributeId
                            ) ===
                            getId(
                              attr._id
                            )
                        )?.value;

                      return (
                        <div
                          key={attr._id}
                          className="space-y-2"
                        >

                          <label className="font-medium">

                            {attr.name}

                            {attr.unit &&
                              ` (${attr.unit})`}

                          </label>

                          {/* TEXT */}

                          {attr.fieldType ===
                            "text" && (

                            <input
                              type="text"
                              placeholder={
                                attr.placeholder
                              }
                              className="border p-3 rounded-lg w-full"
                              value={
                                currentValue ??
                                ""
                              }
                              onChange={(e) =>
                                handleVariantAttributeChange(
                                  index,
                                  attr._id,
                                  e.target.value
                                )
                              }
                            />

                          )}

                          {/* NUMBER */}

                          {attr.fieldType ===
                            "number" && (

                            <input
                              type="number"
                              placeholder={
                                attr.placeholder
                              }
                              className="border p-3 rounded-lg w-full"
                              value={
                                currentValue ??
                                ""
                              }
                              onChange={(e) =>
                                handleVariantAttributeChange(
                                  index,
                                  attr._id,
                                  e.target.value
                                )
                              }
                            />

                          )}

                          {/* SELECT */}

                          {attr.fieldType ===
                            "select" && (

                            <select
                              className="border p-3 rounded-lg w-full"
                              value={
                                currentValue ??
                                ""
                              }
                              onChange={(e) =>
                                handleVariantAttributeChange(
                                  index,
                                  attr._id,
                                  e.target.value
                                )
                              }
                            >

                              <option value="">
                                Select{" "}
                                {attr.name}
                              </option>

                              {attr.options?.map(
                                (option) => (
                                  <option
                                    key={
                                      option
                                    }
                                    value={
                                      option
                                    }
                                  >
                                    {option}
                                  </option>
                                )
                              )}

                            </select>

                          )}

                          {/* MULTISELECT */}

                          {attr.fieldType ===
                            "multiselect" && (

                            <select
                              multiple
                              className="border p-3 rounded-lg w-full h-28"
                              value={
                                Array.isArray(
                                  currentValue
                                )
                                  ? currentValue
                                  : []
                              }
                              onChange={(e) => {

                                const values =
                                  Array.from(
                                    e.target
                                      .selectedOptions
                                  ).map(
                                    (option) =>
                                      option.value
                                  );

                                handleVariantAttributeChange(
                                  index,
                                  attr._id,
                                  values
                                );
                              }}
                            >

                              {attr.options?.map(
                                (option) => (
                                  <option
                                    key={
                                      option
                                    }
                                    value={
                                      option
                                    }
                                  >
                                    {option}
                                  </option>
                                )
                              )}

                            </select>

                          )}

                          {/* BOOLEAN */}

                          {attr.fieldType ===
                            "boolean" && (

                            <label className="flex gap-2 items-center">

                              <input
                                type="checkbox"
                                checked={Boolean(
                                  currentValue
                                )}
                                onChange={(e) =>
                                  handleVariantAttributeChange(
                                    index,
                                    attr._id,
                                    e.target
                                      .checked
                                  )
                                }
                                className="w-5 h-5"
                              />

                              <span>
                                {attr.name}
                              </span>

                            </label>

                          )}

                        </div>
                      );
                    }
                  )}

                </div>

              )}

            </div>
          )
        )}

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

                {editData
                  ? "Updating..."
                  : "Submitting..."}

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