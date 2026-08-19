// hooks/useAttribute.js

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { asyncFetchAttributes } from "@/app/store/action/attributeAction";

export function useAttributes() {
  const dispatch = useDispatch();

  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
  });

  const fetchAttributes = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);

        const result = await dispatch(
          asyncFetchAttributes({
            page,
            limit: 8,
          }),
        );

        console.log("Attribute API Result:", result);

        // Current page data
        setAttributes(result?.attributes || []);

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
        console.error("Fetch attributes error:", error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch],
  );

  // Initial fetch
  useEffect(() => {
    fetchAttributes(1);
  }, [fetchAttributes]);

  // Next page
  const nextPage = async () => {
    if (pagination.currentPage < pagination.totalPages) {
      await fetchAttributes(pagination.currentPage + 1);
    }
  };

  // Previous page
  const previousPage = async () => {
    if (pagination.currentPage > 1) {
      await fetchAttributes(pagination.currentPage - 1);
    }
  };

  // Refresh current page
  const refreshAttributes = async () => {
    await fetchAttributes(pagination.currentPage);
  };

  return {
    attributes,
    loading,
    pagination,
    nextPage,
    previousPage,
    refreshAttributes,
  };
}