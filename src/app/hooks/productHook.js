
// hooks/useProducts.js

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncfetchproduct } from "@/app/store/action/productAction";

export function useProducts() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  // =========================================================
  // FETCH PRODUCTS
  // =========================================================

  const fetchProducts = useCallback(
    async (page = 1, append = false) => {
      try {
        if (append) {
          setLoadingMore(true);
        } else {
          setLoading(true);
        }

        const result = await dispatch(
          asyncfetchproduct({
            page,
            limit: 10,
          }),
        );

        console.log("Product API Result:", result);

        const newProducts = result?.products || [];

        // =====================================================
        // REPLACE OR APPEND
        // =====================================================

        if (append) {
          setProducts((prevProducts) => [
            ...prevProducts,
            ...newProducts,
          ]);
        } else {
          setProducts(newProducts);
        }

        // =====================================================
        // UPDATE PAGINATION
        // =====================================================

        if (result?.pagination) {
          setPagination({
            currentPage: result.pagination.currentPage,
            limit: result.pagination.limit,
            total: result.pagination.total,
            totalPages: result.pagination.totalPages,
          });
        }

        return result;
      } catch (error) {
        console.error("Fetch products error:", error);
        throw error;
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [dispatch],
  );

  // =========================================================
  // INITIAL FETCH
  // =========================================================

  useEffect(() => {
    fetchProducts(1, false);
  }, [fetchProducts]);

  // =========================================================
  // LOAD MORE PRODUCTS
  // Used for Infinite Scroll
  // =========================================================

  const loadMoreProducts = useCallback(async () => {
    // Already loading next page
    if (loadingMore) {
      return;
    }

    // No more pages
    if (pagination.currentPage >= pagination.totalPages) {
      return;
    }

    const nextPage = pagination.currentPage + 1;

    await fetchProducts(nextPage, true);
  }, [
    loadingMore,
    pagination.currentPage,
    pagination.totalPages,
    fetchProducts,
  ]);

  // =========================================================
  // NEXT PAGE
  // Existing pagination behavior
  // =========================================================

  const nextPage = async () => {
    if (pagination.currentPage >= pagination.totalPages) {
      return;
    }

    await fetchProducts(pagination.currentPage + 1, false);
  };

  // =========================================================
  // PREVIOUS PAGE
  // Existing pagination behavior
  // =========================================================

  const previousPage = async () => {
    if (pagination.currentPage <= 1) {
      return;
    }

    await fetchProducts(pagination.currentPage - 1, false);
  };

  // =========================================================
  // REFRESH CURRENT PAGE
  // =========================================================

  const refreshProducts = async () => {
    await fetchProducts(pagination.currentPage, false);
  };

  // =========================================================
  // RETURN
  // =========================================================

  return {
    products,

    // Initial page loading
    loading,

    // Loading next page
    loadingMore,

    pagination,

    // Existing pagination functions
    nextPage,
    previousPage,

    // New infinite-scroll function
    loadMoreProducts,

    refreshProducts,
  };
}

