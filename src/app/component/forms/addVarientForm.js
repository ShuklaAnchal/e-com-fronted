import React from 'react'

const addVarientForm = () => {
  return (
    <div>
            <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
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
        </div>
        <textarea
          name="shortDescription"
          value={product.shortDescription}
          onChange={handleChange}
          placeholder="Short Descripition"
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <textarea
          name="fullDescription"
          value={product.fullDescription}
          onChange={handleChange}
          placeholder="Full Description"
          className="w-full border rounded-lg px-4 py-2"
          required
        />

        <div className="grid grid-cols-2 gap-4">
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
        </div>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            placeholder="Brand Name"
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            type="text"
            name="tags"
            value={product.tags}
            onChange={handleChange}
            placeholder="Tags..."
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <input
          type="text"
          name="highlights"
          value={product.highlights}
          onChange={handleChange}
          placeholder="Highlights"
          className="w-full border rounded-lg px-4 py-2"
        />

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 hoverColor text-white rounded-lg cursor-pointer"
          >
            {editData ? "Update Product" : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default addVarientForm