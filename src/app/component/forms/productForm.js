"use client";

import React, { useEffect, useState } from "react";
import {
  createProduct,
  editProductDetails,
} from "@/app/store/action/productAction";
import { fetchSubcategorybyCategoryID } from "@/app/store/action/subcategoryAction";
import { useCategories } from "@/app/hooks/catgeoryHook";
import { useSubcategories } from "@/app/hooks/subcategoryHook";
import { useDispatch } from "react-redux";

const ProductForm = ({ editData, onClose, refreshProducts }) => {
  const dispatch = useDispatch();

  const { categories, loading } = useCategories();
  const { Subcategories } = useSubcategories();

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
  });

  useEffect(() => {
    if (editData) {
      setProduct({
        name: editData?.name || "",
        slug: editData?.slug || "",
        shortDescription: editData?.shortDescription || "",
        fullDescription: editData?.fullDescription || "",

        categoryId: editData?.categoryId?._id || editData?.categoryId || "",

        subCategoryId:
          editData?.subCategoryId?._id || editData?.subCategoryId || "",

        brand: editData?.brand || "",

        tags: editData?.tags?.join(",") || "",

        highlights: editData?.highlights?.join(",") || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const categoryId = editData?.categoryId?._id || editData?.categoryId;

    if (categoryId) {
      dispatch(fetchSubcategorybyCategoryID(categoryId));
    }
  }, [editData, dispatch]);

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;

    setProduct((prev) => ({
      ...prev,
      categoryId,
      subCategoryId: "",
    }));

    if (categoryId) {
      dispatch(fetchSubcategorybyCategoryID(categoryId));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("SUBMIT CLICKED");
    try {
      const payload = {
        name: product.name,
        slug: product.slug,
        shortDescription: product.shortDescription,
        fullDescription: product.fullDescription,
        categoryId: product.categoryId,
        subCategoryId: product.subCategoryId,
        brand: product.brand,
        tags: product.tags,
        highlights: product.highlights,
      };

      if (editData?._id) {
        await dispatch(editProductDetails(editData._id, payload));
      } else {
        await dispatch(createProduct(payload));
      }

      refreshProducts?.();
      onClose?.();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4 p-4  ">
        <div className="grid grid-cols-3 gap-3">
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <input
            type="text"
            name="slug"
            value={product.slug}
            onChange={handleChange}
            placeholder="Slug"
            className="w-full border rounded-lg px-4 py-2"
            required
          />
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            placeholder="Brand Name"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="grid grid-cols-3 gap-3">
          <select
            name="categoryId"
            value={product.categoryId}
            onChange={handleCategoryChange}
            className="w-full border rounded-lg px-4 py-2"
            required
          >
            <option value="">
              {loading ? "Loading Categories..." : "Select Category"}
            </option>

            {categories?.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            name="subCategoryId"
            value={product.subCategoryId}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
            required
            disabled={!product.categoryId}
          >
            <option value="">
              {product.categoryId
                ? "Select Subcategory"
                : "Select Category First"}
            </option>

            {Subcategories?.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="tags"
            value={product.tags}
            onChange={handleChange}
            placeholder="Tags..."
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            name="shortDescription"
            value={product.shortDescription}
            onChange={handleChange}
            placeholder="Short Descripition"
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            type="text"
            name="highlights"
            value={product.highlights}
            onChange={handleChange}
            placeholder="Highlights"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <textarea
          name="fullDescription"
          value={product.fullDescription}
          onChange={handleChange}
          placeholder="Full Description"
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <div className="flex justify-end">
          <button
            type="submit"
              className=" cursor-pointer
                px-8 py-1.5
                rounded-xl
                bg-[#5C4033]
                text-white
                font-semibold
                shadow-md
                hover:bg-[#4A3227]
                transition-all
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
          >
            {editData ? "Update Product" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
