"use client";

import React, { useEffect, useState } from "react";
import {
  createProduct,
  editProductDetails,
} from "@/app/store/action/productAction";
import { useCategories } from "@/app/hooks/catgeoryHook";
import { useDispatch } from "react-redux";

const ProductForm = ({
  editData,
  onClose,
  refreshProducts,
}) => {
  const dispatch = useDispatch();

    const { categories, loading, refreshCategories } = useCategories();

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

  const [images, setImages] = useState([]);

useEffect(() => {
  if (editData) {
    setProduct({
      name: editData?.name || "",
      slug: editData?.slug || "",
      shortDescription: editData?.shortDescription || "",
      fullDescription: editData?.fullDescription || "",

      categoryId:
        editData?.categoryId?._id ||
        editData?.categoryId ||
        "",

      subCategoryId:
        editData?.subCategoryId?._id ||
        editData?.subCategoryId ||
        "",

      brand: editData?.brand || "",

      tags: editData?.tags?.join(",") || "",

      highlights:
        editData?.highlights?.join(",") || "",
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

  const handleNestedChange = (
    section,
    field,
    value
  ) => {
    setProduct((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files?.length) {
      setImages([...e.target.files]);
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", product.name);
    formData.append("slug", product.slug);
    formData.append(
      "shortDescription",
      product.shortDescription
    );
    formData.append(
      "fullDescription",
      product.fullDescription
    );

    formData.append(
      "categoryId",
      product.categoryId
    );

    formData.append(
      "subCategoryId",
      product.subCategoryId
    );

    formData.append("brand", product.brand);

    formData.append("tags", product.tags);

    formData.append(
      "highlights",
      product.highlights
    );

    if (editData?._id) {
      await dispatch(
        editProductDetails(
          editData._id,
          formData
        )
      );
    } else {
      await dispatch(
        createProduct(formData)
      );
    }

    refreshProducts?.();
    onClose?.();
  } catch (error) {
    console.error(error);
  }
};

  return (
   <div>
    <form onSubmit={handleSubmit} className="space-y-4">

  <input
    type="text"
    name="name"
    value={product.name}
    onChange={handleChange}
    placeholder="Luxury Candle"
    className="w-full border rounded-lg px-4 py-2"
    required
  />

  <input
    type="text"
    name="slug"
    value={product.slug}
    onChange={handleChange}
    placeholder="luxury-candle"
    className="w-full border rounded-lg px-4 py-2"
    required
  />

  <textarea
    name="shortDescription"
    value={product.shortDescription}
    onChange={handleChange}
    placeholder="Premium scented candle"
    className="w-full border rounded-lg px-4 py-2"
    required
  />

  <textarea
    name="fullDescription"
    value={product.fullDescription}
    onChange={handleChange}
    placeholder="Long luxury candle description"
    className="w-full border rounded-lg px-4 py-2"
    required
  />

<select
  name="categoryId"
  value={product.categoryId}
  onChange={handleChange}
  className="w-full border rounded-lg px-4 py-2"
  required
>
  <option value="">
    {loading ? "Loading Categories..." : "Select Category"}
  </option>

  {categories?.map((category) => (
    <option
      key={category._id}
      value={category._id}
    >
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
  >
    <option value="">Select Sub Category</option>
  </select>

  <input
    type="text"
    name="brand"
    value={product.brand}
    onChange={handleChange}
    placeholder="Siyaas"
    className="w-full border rounded-lg px-4 py-2"
  />

  <input
    type="text"
    name="tags"
    value={product.tags}
    onChange={handleChange}
    placeholder="luxury,candle,scented"
    className="w-full border rounded-lg px-4 py-2"
  />

  <input
    type="text"
    name="highlights"
    value={product.highlights}
    onChange={handleChange}
    placeholder="long lasting,premium wax"
    className="w-full border rounded-lg px-4 py-2"
  />

  <button
    type="submit"
    className="px-6 py-2 bg-blue-600 text-white rounded-lg"
  >
    {editData ? "Update Product" : "Create Product"}
  </button>

</form>
   </div>
  );
};

export default ProductForm;