"use client";

import React from "react";

export default function ProductForm() {
  return (
    <form className="space-y-8">
      {/* BASIC INFO */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Product Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Product Name *
            </label>
            <input
              type="text"
              placeholder="Luxury Wooden Chair"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Slug *
            </label>
            <input
              type="text"
              placeholder="luxury-wooden-chair"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Category *
            </label>

            <select className="w-full border rounded-lg px-4 py-2">
              <option>Select Category</option>
              <option>Furniture</option>
              <option>Home Decor</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Sub Category *
            </label>

            <select className="w-full border rounded-lg px-4 py-2">
              <option>Select Sub Category</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Brand
            </label>

            <input
              type="text"
              placeholder="Siyaas"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Collection
            </label>

            <input
              type="text"
              placeholder="Summer Collection"
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium">
            Short Description
          </label>

          <textarea
            rows={3}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium">
            Full Description
          </label>

          <textarea
            rows={6}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium">
            Tags
          </label>

          <input
            type="text"
            placeholder="chair,wood,premium"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
      </div>

      {/* PRODUCT IMAGE */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Product Images
        </h2>

        <input
          type="file"
          multiple
          className="w-full border rounded-lg p-2"
        />
      </div>

      {/* SHIPPING */}
      <details className="bg-white border rounded-xl p-6">
        <summary className="font-semibold cursor-pointer">
          Shipping Details
        </summary>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <input
            type="number"
            placeholder="Weight (kg)"
            className="border rounded-lg px-4 py-2"
          />

          <input
            type="text"
            placeholder="Shipping Class"
            className="border rounded-lg px-4 py-2"
          />

          <input
            type="number"
            placeholder="Length"
            className="border rounded-lg px-4 py-2"
          />

          <input
            type="number"
            placeholder="Width"
            className="border rounded-lg px-4 py-2"
          />
        </div>
      </details>

      {/* SEO */}
      <details className="bg-white border rounded-xl p-6">
        <summary className="font-semibold cursor-pointer">
          SEO Settings
        </summary>

        <div className="space-y-4 mt-4">
          <input
            type="text"
            placeholder="Meta Title"
            className="w-full border rounded-lg px-4 py-2"
          />

          <textarea
            rows={3}
            placeholder="Meta Description"
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="text"
            placeholder="Keywords"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
      </details>

      {/* STATUS */}
      <div className="bg-white border rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Product Status
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <select className="border rounded-lg px-4 py-2">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
            <option value="archived">Archived</option>
          </select>

          <div className="flex flex-wrap gap-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Active
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Featured
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Trending
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Bestseller
            </label>
          </div>
        </div>
      </div>

      {/* SUBMIT */}
      <div className="flex justify-end gap-4">
        <button
          type="button"
          className="px-6 py-2 border rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-6 py-2 bg-[#5C4033] text-white rounded-lg"
        >
          Create Product
        </button>
      </div>
    </form>
  );
}