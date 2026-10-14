"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import {
  updateProductRelationships,
} from "@/app/store/action/productAction";

import { useProducts } from "@/app/hooks/productHook";

export default function ProductRelationshipForm({
  product,
  onClose,
  refreshProducts: refreshParentProducts,
}) {
  const dispatch = useDispatch();

  // =====================================================
  // PRODUCTS + PAGINATION
  // =====================================================

  const {
    products: allProducts = [],
    loading: productsLoading,
    loadingMore = false,
    pagination,
    loadMoreProducts,
    refreshProducts: refreshAllProducts,
  } = useProducts();

  // =====================================================
  // STATE
  // =====================================================

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [frequentlyBoughtTogether, setFrequentlyBoughtTogether] =
    useState([]);

  const [relatedSearch, setRelatedSearch] = useState("");
  const [frequentlySearch, setFrequentlySearch] = useState("");

  const [saving, setSaving] = useState(false);

  // =====================================================
  // HELPERS
  // =====================================================

  const getId = (item) => {
    if (!item) return "";

    const id = typeof item === "string" ? item : item._id;

    return id ? String(id) : "";
  };

  const hasMoreProducts =
    pagination &&
    pagination.currentPage < pagination.totalPages;

  // =====================================================
  // INITIALIZE EXISTING RELATIONSHIPS
  // =====================================================

  useEffect(() => {
    if (!product) return;

    setRelatedProducts(
      (product.relatedProducts || [])
        .map(getId)
        .filter(Boolean)
    );

    setFrequentlyBoughtTogether(
      (product.frequentlyBoughtTogether || [])
        .map(getId)
        .filter(Boolean)
    );
  }, [product]);

  // =====================================================
  // LOAD NEXT PAGE
  // =====================================================

  const handleListScroll = useCallback(
    (event) => {
      const element = event.currentTarget;

      const nearBottom =
        element.scrollHeight -
          element.scrollTop -
          element.clientHeight <
        60;

      if (
        nearBottom &&
        hasMoreProducts &&
        !loadingMore &&
        !productsLoading &&
        typeof loadMoreProducts === "function"
      ) {
        loadMoreProducts();
      }
    },
    [
      hasMoreProducts,
      loadingMore,
      productsLoading,
      loadMoreProducts,
    ]
  );

  // =====================================================
  // REMOVE CURRENT PRODUCT
  // =====================================================

  const availableProducts = useMemo(() => {
    const currentProductId = getId(product);

    return (allProducts || []).filter(
      (item) =>
        item?._id &&
        getId(item) !== currentProductId
    );
  }, [allProducts, product]);

  // =====================================================
  // FILTER RELATED PRODUCTS
  // =====================================================

  const filteredRelatedProducts = useMemo(() => {
    const search = relatedSearch.trim().toLowerCase();

    if (!search) return availableProducts;

    return availableProducts.filter((item) =>
      [item.name, item.slug].some((value) =>
        value?.toLowerCase().includes(search)
      )
    );
  }, [availableProducts, relatedSearch]);

  // =====================================================
  // FILTER FREQUENTLY BOUGHT PRODUCTS
  // =====================================================

  const filteredFrequentlyProducts = useMemo(() => {
    const search = frequentlySearch.trim().toLowerCase();

    if (!search) return availableProducts;

    return availableProducts.filter((item) =>
      [item.name, item.slug].some((value) =>
        value?.toLowerCase().includes(search)
      )
    );
  }, [availableProducts, frequentlySearch]);

  // =====================================================
  // TOGGLE RELATED PRODUCT
  // =====================================================

  const toggleRelatedProduct = (productId) => {
    const id = String(productId);

    setRelatedProducts((previous) =>
      previous.includes(id)
        ? previous.filter((itemId) => itemId !== id)
        : [...previous, id]
    );
  };

  // =====================================================
  // TOGGLE FREQUENTLY BOUGHT TOGETHER
  // =====================================================

  const toggleFrequentlyBoughtProduct = (productId) => {
    const id = String(productId);

    setFrequentlyBoughtTogether((previous) =>
      previous.includes(id)
        ? previous.filter((itemId) => itemId !== id)
        : [...previous, id]
    );
  };

  // =====================================================
  // GET PRODUCT NAME
  // =====================================================

  const getProductName = (id) => {
    const item = (allProducts || []).find(
      (entry) => getId(entry) === String(id)
    );

    return item?.name || String(id);
  };

  // =====================================================
  // SAVE RELATIONSHIPS
  // =====================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!product?._id) {
      alert("Product ID is missing");
      return;
    }

    try {
      setSaving(true);

      const data = {
        relatedProducts,
        frequentlyBoughtTogether,
      };

      await dispatch(
        updateProductRelationships(product._id, data)
      );

      alert("Product relationships updated successfully");

      if (typeof refreshParentProducts === "function") {
        await refreshParentProducts();
      } else if (typeof refreshAllProducts === "function") {
        await refreshAllProducts();
      }

      if (typeof onClose === "function") {
        onClose();
      }
    } catch (error) {
      console.error("Update relationships error:", error);

      alert(
        error?.message ||
          "Failed to update product relationships"
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // REUSABLE PRODUCT ITEM
  // =====================================================

  const ProductItem = ({ item, selected, onToggle }) => (
    <label
      className={`
        flex items-center gap-3 p-3 border rounded-lg
        cursor-pointer transition
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
        onChange={() => onToggle(getId(item))}
        className="w-4 h-4 accent-[#5C4033]"
      />

      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-800 truncate">
          {item.name || "Unnamed product"}
        </p>

        {item.slug && (
          <p className="text-xs text-gray-500 truncate">
            {item.slug}
          </p>
        )}
      </div>
    </label>
  );

  // =====================================================
  // SHARED PRODUCT LIST
  // =====================================================

  const renderProductList = ({
    items,
    selectedIds,
    onToggle,
    emptyMessage,
  }) => (
    <div
      onScroll={handleListScroll}
      className="max-h-64 overflow-y-auto overscroll-contain space-y-2 pr-1"
    >
      {items.length > 0 ? (
        items.map((item) => (
          <ProductItem
            key={getId(item)}
            item={item}
            selected={selectedIds.includes(getId(item))}
            onToggle={onToggle}
          />
        ))
      ) : (
        <div className="text-center py-8 text-gray-500 border border-dashed rounded-lg">
          {productsLoading ? "Loading products..." : emptyMessage}
        </div>
      )}

      {loadingMore && (
        <p className="py-3 text-center text-sm text-gray-500">
          Loading more products...
        </p>
      )}

      {!loadingMore &&
        !productsLoading &&
        items.length > 0 &&
        !hasMoreProducts && (
          <p className="py-3 text-center text-xs text-gray-400">
            All products loaded
          </p>
        )}
    </div>
  );

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* PRODUCT INFORMATION */}

      <div className="bg-[#F8F4F1] border border-[#E7DED7] rounded-lg p-4">
        <p className="text-xs text-gray-500 mb-1">Product</p>

        <h3 className="text-lg font-semibold text-[#5C4033]">
          {product?.name || "Product"}
        </h3>

        {product?.slug && (
          <p className="text-sm text-gray-500 mt-1">
            {product.slug}
          </p>
        )}
      </div>

      {/* RELATED PRODUCTS */}

      <section>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-lg font-semibold text-[#5C4033]">
              Related Products
            </h3>

            <p className="text-sm text-gray-500">
              Products similar or related to this product.
            </p>
          </div>

          <span className="text-sm font-medium text-[#5C4033] whitespace-nowrap">
            {relatedProducts.length} selected
          </span>
        </div>

        <input
          type="text"
          value={relatedSearch}
          onChange={(event) => setRelatedSearch(event.target.value)}
          placeholder="Search related products..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-3 outline-none focus:border-[#5C4033]"
        />

        {renderProductList({
          items: filteredRelatedProducts,
          selectedIds: relatedProducts,
          onToggle: toggleRelatedProduct,
          emptyMessage: "No products found.",
        })}

        {relatedProducts.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Selected:
            </p>

            <div className="flex flex-wrap gap-2">
              {relatedProducts.map((id) => (
                <span
                  key={id}
                  className="px-3 py-1 bg-[#F8F4F1] text-[#5C4033] rounded-full text-sm break-all"
                >
                  {getProductName(id)}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* FREQUENTLY BOUGHT TOGETHER */}

      <section>
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <h3 className="text-lg font-semibold text-[#5C4033]">
              Frequently Bought Together
            </h3>

            <p className="text-sm text-gray-500">
              Products customers commonly purchase with this product.
            </p>
          </div>

          <span className="text-sm font-medium text-[#5C4033] whitespace-nowrap">
            {frequentlyBoughtTogether.length} selected
          </span>
        </div>

        <input
          type="text"
          value={frequentlySearch}
          onChange={(event) =>
            setFrequentlySearch(event.target.value)
          }
          placeholder="Search frequently bought products..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 mb-3 outline-none focus:border-[#5C4033]"
        />

        {renderProductList({
          items: filteredFrequentlyProducts,
          selectedIds: frequentlyBoughtTogether,
          onToggle: toggleFrequentlyBoughtProduct,
          emptyMessage: "No products found.",
        })}

        {frequentlyBoughtTogether.length > 0 && (
          <div className="mt-3">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Selected:
            </p>

            <div className="flex flex-wrap gap-2">
              {frequentlyBoughtTogether.map((id) => (
                <span
                  key={id}
                  className="px-3 py-1 bg-[#F8F4F1] text-[#5C4033] rounded-full text-sm break-all"
                >
                  {getProductName(id)}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ACTION BUTTONS */}

      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t">
        <button
          type="button"
          onClick={onClose}
          disabled={saving}
          className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={saving}
          className="px-5 py-2.5 rounded-lg bg-[#5C4033] text-white hover:bg-[#4A3228] disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Relationships"}
        </button>
      </div>
    </form>
  );
}