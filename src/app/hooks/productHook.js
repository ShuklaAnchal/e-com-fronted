// hooks/useProducts.js

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncfetchproduct } from "@/app/store/action/productAction";

export function useProducts() {
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
  });

  // Fetch products
  const fetchProducts = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);

        const result = await dispatch(
          asyncfetchproduct({
            page,
            limit: 8,
          }),
        );

        console.log("Product API Result:", result);

        // Current page products
        setProducts(result?.products || []);

        // Backend pagination
        if (result?.pagination) {
          setPagination({
            currentPage: result.pagination.currentPage,
            limit: result.pagination.limit,
            total: result.pagination.total,
            totalPages: result.pagination.totalPages,
          });
        }
      } catch (error) {
        console.error("Fetch products error:", error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  // Initial fetch
  useEffect(() => {
    fetchProducts(1);
  }, [fetchProducts]);

  // NEXT PAGE
  const nextPage = async () => {
    if (pagination.currentPage >= pagination.totalPages) {
      return;
    }

    await fetchProducts(pagination.currentPage + 1);
  };

  // PREVIOUS PAGE
  const previousPage = async () => {
    if (pagination.currentPage <= 1) {
      return;
    }

    await fetchProducts(pagination.currentPage - 1);
  };

  // Refresh current page
  const refreshProducts = async () => {
    await fetchProducts(pagination.currentPage);
  };

  return {
    products,
    loading,

    pagination,

    nextPage,
    previousPage,

    refreshProducts,
  };
}