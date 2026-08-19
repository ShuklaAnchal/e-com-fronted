// hooks/useCategories.js

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncfetchcategory } from "@/app/store/action/categoryAction";

export function useCategories() {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
  });

  // Fetch categories
  const fetchCategories = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);

        const result = await dispatch(
          asyncfetchcategory({
            page,
            limit: 8,
          }),
        );

        console.log("Category API Result:", result);

        // Current page categories
        setCategories(result?.categories || []);

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
        console.error("Fetch categories error:", error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  // Initial fetch
  useEffect(() => {
    fetchCategories(1);
  }, [fetchCategories]);

  // NEXT PAGE
  const nextPage = async () => {
    if (pagination.currentPage >= pagination.totalPages) {
      return;
    }

    await fetchCategories(pagination.currentPage + 1);
  };

  // PREVIOUS PAGE
  const previousPage = async () => {
    if (pagination.currentPage <= 1) {
      return;
    }

    await fetchCategories(pagination.currentPage - 1);
  };

  // Refresh current page
  const refreshCategories = async () => {
    await fetchCategories(pagination.currentPage);
  };

  return {
    categories,
    loading,

    pagination,

    nextPage,
    previousPage,

    refreshCategories,
  };
}