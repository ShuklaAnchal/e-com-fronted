"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import {
  updateProductRelationships,
} from "@/app/store/action/productAction";

export default function ProductRelationshipForm({
  product,
  products = [],
  onClose,
  refreshProducts,
}) {
  const dispatch = useDispatch();

  // =====================================================
  // STATE
  // =====================================================

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [frequentlyBoughtTogether, setFrequentlyBoughtTogether] =
    useState([]);

  const [relatedSearch, setRelatedSearch] = useState("");
  const [frequentlySearch, setFrequentlySearch] =
    useState("");

  const [loading, setLoading] = useState(false);

  // =====================================================
  // INITIALIZE EXISTING RELATIONSHIPS
  // =====================================================

  useEffect(() => {
    if (!product) return;

    setRelatedProducts(
      (product.relatedProducts || []).map((item) =>
        typeof item === "string"
          ? item
          : item?._id
      ).filter(Boolean)
    );

    setFrequentlyBoughtTogether(
      (product.frequentlyBoughtTogether || [])
        .map((item) =>
          typeof item === "string"
            ? item
            : item?._id
        )
        .filter(Boolean)
    );
  }, [product]);

  // =====================================================
  // REMOVE CURRENT PRODUCT
  // =====================================================

  const availableProducts = useMemo(() => {
    return (products || []).filter(
      (item) =>
        item?._id &&
        item._id.toString() !==
          product?._id?.toString()
    );
  }, [products, product]);

  // =====================================================
  // FILTER RELATED PRODUCTS
  // =====================================================

  const filteredRelatedProducts = useMemo(() => {
    const search = relatedSearch
      .trim()
      .toLowerCase();

    if (!search) {
      return availableProducts;
    }

    return availableProducts.filter((item) => {
      return (
        item.name
          ?.toLowerCase()
          .includes(search) ||
        item.slug
          ?.toLowerCase()
          .includes(search)
      );
    });
  }, [availableProducts, relatedSearch]);

  // =====================================================
  // FILTER FREQUENTLY BOUGHT PRODUCTS
  // =====================================================

  const filteredFrequentlyProducts = useMemo(() => {
    const search = frequentlySearch
      .trim()
      .toLowerCase();

    if (!search) {
      return availableProducts;
    }

    return availableProducts.filter((item) => {
      return (
        item.name
          ?.toLowerCase()
          .includes(search) ||
        item.slug
          ?.toLowerCase()
          .includes(search)
      );
    });
  }, [availableProducts, frequentlySearch]);

  // =====================================================
  // TOGGLE RELATED PRODUCT
  // =====================================================

  const toggleRelatedProduct = (productId) => {
    setRelatedProducts((prev) => {
      const exists = prev.includes(productId);

      if (exists) {
        return prev.filter(
          (id) => id !== productId
        );
      }

      return [...prev, productId];
    });
  };

  // =====================================================
  // TOGGLE FREQUENTLY BOUGHT TOGETHER
  // =====================================================

  const toggleFrequentlyBoughtProduct = (
    productId
  ) => {
    setFrequentlyBoughtTogether((prev) => {
      const exists = prev.includes(productId);

      if (exists) {
        return prev.filter(
          (id) => id !== productId
        );
      }

      return [...prev, productId];
    });
  };

  // =====================================================
  // SAVE
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!product?._id) {
      alert("Product ID is missing");
      return;
    }

    try {
      setLoading(true);

      const data = {
        relatedProducts,
        frequentlyBoughtTogether,
      };

      console.log(
        "Updating product relationships:",
        {
          productId: product._id,
          data,
        }
      );

      await dispatch(
        updateProductRelationships(
          product._id,
          data
        )
      );

      alert(
        "Product relationships updated successfully"
      );

      if (refreshProducts) {
        await refreshProducts();
      }

      if (onClose) {
        onClose();
      }
    } catch (error) {
      console.error(
        "Update relationships error:",
        error
      );

      alert(
        error?.message ||
          "Failed to update product relationships"
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // PRODUCT ITEM
  // =====================================================

  const ProductItem = ({
    item,
    selected,
    onToggle,
  }) => {
    return (
      <label
        className={`
          flex items-center gap-3
          p-3
          border
          rounded-lg
          cursor-pointer
          transition
          ${
            selected
              ? "border-[#5C4033] bg-[#F8F4F1]"
              : "border-gray-200 hover:border-[#5C4033]"
          }
        `}
      >
        <input
          type="checkbox"
          checked={selected}
          onChange={() =>
            onToggle(item._id)
          }
          className="w-4 h-4 accent-[#5C4033]"
        />

        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-800 truncate">
            {item.name}
          </p>

          {item.slug && (
            <p className="text-xs text-gray-500 truncate">
              {item.slug}
            </p>
          )}
        </div>
      </label>
    );
  };

  // =====================================================
  // SELECTED PRODUCT NAMES
  // =====================================================

  const getProductName = (id) => {
    const item = availableProducts.find(
      (product) =>
        product._id?.toString() ===
        id?.toString()
    );

    return item?.name || id;
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* =================================================
          PRODUCT INFORMATION
      ================================================= */}

      <div className="bg-[#F8F4F1] border border-[#E7DED7] rounded-lg p-4">
        <p className="text-xs text-gray-500 mb-1">
          Product
        </p>

        <h3 className="text-lg font-semibold text-[#5C4033]">
          {product?.name || "Product"}
        </h3>

        {product?.slug && (
          <p className="text-sm text-gray-500 mt-1">
            {product.slug}
          </p>
        )}
      </div>

      {/* =================================================
          RELATED PRODUCTS
      ================================================= */}

      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-[#5C4033]">
              Related Products
            </h3>

            <p className="text-sm text-gray-500">
              Products similar or related to this product.
            </p>
          </div>

          <span className="text-sm font-medium text-[#5C4033]">
            {relatedProducts.length} selected
          </span>
        </div>

        {/* Search */}

        <input
          type="text"
          value={relatedSearch}
          onChange={(e) =>
            setRelatedSearch(e.target.value)
          }
          placeholder="Search related products..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-3 outline-none focus:border-[#5C4033]"
        />

        {/* Product List */}

        <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
          {filteredRelatedProducts.length > 0 ? (
            filteredRelatedProducts.map((item) => (
              <ProductItem
                key={item._id}
                item={item}
                selected={relatedProducts.includes(
                  item._id
                )}
                onToggle={toggleRelatedProduct}
              />
            ))
          ) : (
            <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg">
              No products found.
            </div>
          )}
        </div>

        {/* Selected */}

        {relatedProducts.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Selected:
            </p>

            <div className="flex flex-wrap gap-2">
              {relatedProducts.map((id) => (
                <span
                  key={id}
                  className="px-3 py-1 bg-[#F8F4F1] text-[#5C4033] rounded-full text-sm"
                >
                  {getProductName(id)}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* =================================================
          FREQUENTLY BOUGHT TOGETHER
      ================================================= */}

      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-[#5C4033]">
              Frequently Bought Together
            </h3>

            <p className="text-sm text-gray-500">
              Products customers commonly purchase with this product.
            </p>
          </div>

          <span className="text-sm font-medium text-[#5C4033]">
            {frequentlyBoughtTogether.length} selected
          </span>
        </div>

        {/* Search */}

        <input
          type="text"
          value={frequentlySearch}
          onChange={(e) =>
            setFrequentlySearch(e.target.value)
          }
          placeholder="Search frequently bought products..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-3 outline-none focus:border-[#5C4033]"
        />

        {/* Product List */}

        <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
          {filteredFrequentlyProducts.length > 0 ? (
            filteredFrequentlyProducts.map(
              (item) => (
                <ProductItem
                  key={item._id}
                  item={item}
                  selected={frequentlyBoughtTogether.includes(
                    item._id
                  )}
                  onToggle={
                    toggleFrequentlyBoughtProduct
                  }
                />
              )
            )
          ) : (
            <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg">
              No products found.
            </div>
          )}
        </div>

        {/* Selected */}

        {frequentlyBoughtTogether.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Selected:
            </p>

            <div className="flex flex-wrap gap-2">
              {frequentlyBoughtTogether.map(
                (id) => (
                  <span
                    key={id}
                    className="px-3 py-1 bg-[#F8F4F1] text-[#5C4033] rounded-full text-sm"
                  >
                    {getProductName(id)}
                  </span>
                )
              )}
            </div>
          </div>
        )}
      </div>

      {/* =================================================
          ACTION BUTTONS
      ================================================= */}

      <div className="flex justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="px-5 py-2.5 rounded-lg bg-[#5C4033] text-white hover:bg-[#4A3228] disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : "Save Relationships"}
        </button>
      </div>
    </form>
  );
}