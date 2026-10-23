
"use client";

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncfetchSubcategory } from "@/app/store/action/subcategoryAction";

export function useSubcategories() {
  const dispatch = useDispatch();

  const [Subcategories, SetSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  const refreshSubcategories = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);

        const result = await dispatch(
          asyncfetchSubcategory({
            page,
            limit: pagination.limit,
          })
        );

        const subcategories = result?.subcategories || [];

        SetSubcategories(subcategories);

        setPagination({
          currentPage: result?.currentPage ?? page,
          limit: result?.limit ?? pagination.limit,
          total: result?.totalSubcategories ?? 0,
          totalPages: result?.totalPages ?? 1,
        });

        return result;
      } catch (error) {
        console.error("Fetch subcategories error:", error);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [dispatch, pagination.limit]
  );

  useEffect(() => {
    refreshSubcategories(1);
  }, [refreshSubcategories]);

  const nextPage = useCallback(async () => {
    if (
      loading ||
      pagination.currentPage >= pagination.totalPages
    ) {
      return;
    }

    await refreshSubcategories(pagination.currentPage + 1);
  }, [
    loading,
    pagination.currentPage,
    pagination.totalPages,
    refreshSubcategories,
  ]);

  const previousPage = useCallback(async () => {
    if (loading || pagination.currentPage <= 1) {
      return;
    }

    await refreshSubcategories(pagination.currentPage - 1);
  }, [loading, pagination.currentPage, refreshSubcategories]);

  const refreshCurrentSubcategories = useCallback(async () => {
    return await refreshSubcategories(pagination.currentPage);
  }, [refreshSubcategories, pagination.currentPage]);

  return {
    Subcategories,
    loading,
    pagination,
    refreshSubcategories,
    refreshCurrentSubcategories,
    nextPage,
    previousPage,
  };
}
