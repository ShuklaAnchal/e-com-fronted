"use client";

import { useState } from "react";
import { HiOutlineTrash, HiOutlinePlus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { createProductVarient } from "@/app/store/action/productAction";

export default function VariantForm({ product, onClose }) {
  const [variants, setVariants] = useState([
    {
      color: "",
      size: "",
      sku: "",
      price: "",
      stock: "",
      images: [],
      videos: [],
    },
  ]);

  const dispatch = useDispatch();

  // ======================
  // HANDLE INPUT CHANGE
  // ======================
  const handleChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  // ======================
  // IMAGES
  // ======================
  const handleImageChange = (index, files) => {
    const updated = [...variants];
    updated[index].images = Array.from(files);
    setVariants(updated);
  };

  // ======================
  // VIDEOS
  // ======================
  const handleVideoChange = (index, files) => {
    const updated = [...variants];
    updated[index].videos = Array.from(files);
    setVariants(updated);
  };

  // ======================
  // ADD VARIANT
  // ======================
  const addVariant = () => {
    setVariants([
      ...variants,
      {
        color: "",
        size: "",
        sku: "",
        price: "",
        stock: "",
        images: [],
        videos: [],
      },
    ]);
  };

  // ======================
  // REMOVE VARIANT
  // ======================
  const removeVariant = (index) => {
    if (variants.length === 1) return;
    setVariants(variants.filter((_, i) => i !== index));
  };

  // ======================
  // SUBMIT
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      const payload = variants.map((variant) => ({
        attributes: [
          { name: "Color", value: variant.color },
          { name: "Size", value: variant.size },
        ],

        sku: variant.sku,

        pricing: {
          mrp: Number(variant.price),
          sellingPrice: Number(variant.price),
        },

        inventory: {
          stockQuantity: Number(variant.stock),
        },

        barcode: "",
        shippingWeight: 0,
        isDefault: false,
        isActive: true,

        // IMPORTANT: MEDIA STRUCTURE
        media: [
          ...variant.images.map(() => ({
            type: "image",
            sectionType: "front_view",
          })),

          ...variant.videos.map(() => ({
            type: "video",
            sectionType: "reel",
          })),
        ],
      }));

      // JSON payload
      formData.append("variants", JSON.stringify(payload));

      // ======================
      // APPEND IMAGES FIRST
      // ======================
      variants.forEach((variant) => {
        variant.images.forEach((img) => {
          formData.append("media", img);
        });
      });

      // ======================
      // THEN VIDEOS
      // ======================
      variants.forEach((variant) => {
        variant.videos.forEach((vid) => {
          formData.append("media", vid);
        });
      });

      await dispatch(createProductVarient(product._id, formData));

      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  // ======================
  // UI
  // ======================
  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      {variants.map((variant, index) => (
        <div key={index} className="border p-5 rounded-xl space-y-4">
          {/* HEADER */}
          <div className="flex justify-between">
            <h3>Variant {index + 1}</h3>

            <button type="button" onClick={() => removeVariant(index)}>
              <HiOutlineTrash />
            </button>
          </div>

          <div>
            {/* INPUT GRID */}
            <div className="grid grid-cols-3 gap-3">
              {/* COLOR */}
              <input
                placeholder="Color"
                value={variant.color}
                onChange={(e) => handleChange(index, "color", e.target.value)}
                className="border p-2 rounded-[10px]"
              />

              {/* SIZE */}
              <input
                placeholder="Size"
                value={variant.size}
                onChange={(e) => handleChange(index, "size", e.target.value)}
                className="border p-2"
              />

              {/* SKU */}
              <input
                placeholder="SKU"
                value={variant.sku}
                onChange={(e) => handleChange(index, "sku", e.target.value)}
                className="border p-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* PRICE */}
              <input
                type="number"
                placeholder="Price"
                value={variant.price}
                onChange={(e) => handleChange(index, "price", e.target.value)}
                className="border p-2 rounded-[10px]"
              />

              {/* STOCK */}
              <input
                type="number"
                placeholder="Stock"
                value={variant.stock}
                onChange={(e) => handleChange(index, "stock", e.target.value)}
                className="border p-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* IMAGES */}
              <div>
                <label className="text-sm">Images</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageChange(index, e.target.files)}
                />
                <p className="text-xs">
                  {variant.images.length} images selected
                </p>
              </div>
              {/* VIDEOS */}
              <div>
                <label className="text-sm">Videos</label>
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={(e) => handleVideoChange(index, e.target.files)}
                />
                <p className="text-xs">
                  {variant.videos.length} videos selected
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* ADD VARIANT */}
      <button
        className="adminpanel px-2 py-1.5 text-white font-semibold hover:bg-[#4A3227] disabled:opacity-50 flex items-center  gap-2"
        type="button"
        onClick={addVariant}
      >
        <HiOutlinePlus /> Add Variant
      </button>

      {/* ACTIONS */}
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onClose}>
          Cancel
        </button>

        <button type="submit">Save Variants</button>
      </div>
    </form>
  );
}
