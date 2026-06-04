import React from "react";

const CategoryForm = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-2xl font-bold mb-6">Create Category</h2>

        <form className="space-y-8">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
              Basic Information
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Category Name *
                </label>
                <input
                  type="text"
                  placeholder="Electronics"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Slug *
                </label>
                <input
                  type="text"
                  placeholder="electronics"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium">
                Description
              </label>
              <textarea
                rows={4}
                placeholder="Category description..."
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          {/* Media */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
              Media
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Category Image
                </label>

                <input
                  type="file"
                  className="w-full border rounded-lg p-2"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Icon
                </label>

                <input
                  type="text"
                  placeholder="fa-mobile-screen"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
            </div>
          </div>

          {/* SEO */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
              SEO Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Meta Title
                </label>

                <input
                  type="text"
                  placeholder="Best Electronics Products"
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Meta Description
                </label>

                <textarea
                  rows={3}
                  placeholder="SEO description..."
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Keywords
                </label>

                <input
                  type="text"
                  placeholder="electronics,mobile,laptop,gadgets"
                  className="w-full border rounded-lg px-4 py-2"
                />

                <p className="text-xs text-gray-500 mt-1">
                  Separate keywords with commas.
                </p>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b pb-2">
              Settings
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Sort Order
                </label>

                <input
                  type="number"
                  defaultValue={0}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div className="flex items-center gap-3 mt-8">
                <input
                  type="checkbox"
                  id="active"
                  defaultChecked
                  className="w-4 h-4"
                />

                <label htmlFor="active" className="font-medium">
                  Active Category
                </label>
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-6 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;