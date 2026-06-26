"use client";

import { useState } from "react";
import { HiOutlineTrash, HiOutlinePlus } from "react-icons/hi";
import { createProductVarient } from "@/app/store/action/productAction";
import { useDispatch } from "react-redux";

export default function VariantForm({ product, onClose, onSubmit }) {
  const [variants, setVariants] = useState([
    {
      color: "",
      size: "",
      sku: "",
      price: "",
      stock: "",
      images: [],
    },
  ]);

  const dispatch = useDispatch();

  const handleChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleImageChange = (index, files) => {
    const updated = [...variants];
    updated[index].images = Array.from(files);
    setVariants(updated);
  };

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
      },
    ]);
  };

  const removeVariant = (index) => {
    if (variants.length === 1) return;

    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      const payload = variants.map((variant) => ({
        attributes: [
          {
            name: "Color",
            value: variant.color,
          },
          {
            name: "Size",
            value: variant.size,
          },
        ],

        sku: variant.sku,

        pricing: {
          mrp: Number(variant.price),
          sellingPrice: Number(variant.price),
        },

        inventory: {
          stockQuantity: Number(variant.stock),
        },

        imageCount: variant.images.length,

        barcode: "",

        shippingWeight: 0,

        isDefault: false,

        isActive: true,
      }));

      formData.append("variants", JSON.stringify(payload));

      variants.forEach((variant) => {
        variant.images.forEach((image) => {
          formData.append("images", image);
        });
      });

      await dispatch(createProductVarient(product._id, formData));

      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4">
      {/* {product && (
        <div className="bg-gray-50 border rounded-lg p-2">
          <p className="text-sm text-gray-500">
            Product
          </p>

          <h2 className="font-semibold text-lg">
            {product.name}
          </h2>
        </div>
      )} */}

      {variants.map((variant, index) => (
        <div
          key={index}
          className="border rounded-xl p-5 bg-white shadow-sm space-y-4"
        >
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-md">Variant {index + 1}</h3>

            {variants.length > 1 && (
              <button
                type="button"
                onClick={() => removeVariant(index)}
                className="text-red-500 hover:text-red-700"
              >
                <HiOutlineTrash size={20} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm mb-1">Color</label>

              <input
                type="text"
                value={variant.color}
                onChange={(e) => handleChange(index, "color", e.target.value)}
                className="w-full border rounded-lg px-3 py-1.5"
                placeholder="Black"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Size</label>

              <input
                type="text"
                value={variant.size}
                onChange={(e) => handleChange(index, "size", e.target.value)}
                className="w-full border rounded-lg px-3 py-1.5"
                placeholder="XL"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">SKU</label>

              <input
                type="text"
                value={variant.sku}
                onChange={(e) => handleChange(index, "sku", e.target.value)}
                className="w-full border rounded-lg px-3 py-1.5"
                placeholder="SKU001"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Price</label>

              <input
                type="number"
                value={variant.price}
                onChange={(e) => handleChange(index, "price", e.target.value)}
                className="w-full border rounded-lg px-3 py-1.5"
                placeholder="1000"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Stock</label>

              <input
                type="number"
                value={variant.stock}
                onChange={(e) => handleChange(index, "stock", e.target.value)}
                className="w-full border rounded-lg px-3 py-1.5"
                placeholder="25"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Images</label>

              <input
                type="file"
                multiple
                onChange={(e) => handleImageChange(index, e.target.files)}
                className="w-full"
              />

              {variant.images.length > 0 && (
                <p className="text-xs mt-1 text-gray-500">
                  {variant.images.length} image(s) selected
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addVariant}
        className="flex items-center gap-2 px-4 py-1.5 rounded-lg border border-dashed border-[#5C4033] text-[#5C4033] hover:bg-[#5C4033] hover:text-white transition"
      >
        <HiOutlinePlus />
        Add Another Variant
      </button>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 rounded-lg border"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-[#5C4033] text-white"
        >
          Save Variants
        </button>
      </div>
    </form>
  );
}
