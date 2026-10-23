
import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import {
  asyncfetchAllOrders,
  asyncfetchUserwiseOrders,
} from "@/app/store/action/orderAction";

export function useOrders() {
  const dispatch = useDispatch();

  const [allOrders, setAllOrders] = useState([]);
  const [userOrders, setUserOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // PAGINATION STATE
  // =========================================================

  const [pagination, setPagination] = useState({
    currentPage: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  });

  // =========================================================
  // FETCH ADMIN ORDERS
  // =========================================================

  const refreshOrders = useCallback(
    async (page = 1) => {
      try {
        setLoading(true);

        const result = await dispatch(
          asyncfetchAllOrders({
            page,
            limit: pagination.limit,
          })
        );

        console.log("Admin Orders API Result:", result);

        const orders = result?.orders || [];

        setAllOrders(orders);

        // Update pagination using backend response
        setPagination({
          currentPage: result?.currentPage ?? page,
          limit: result?.limit ?? pagination.limit,
          total: result?.totalOrders ?? 0,
          totalPages: result?.totalPages ?? 1,
        });

        return result;
      } catch (error) {
        console.error("Fetch admin orders error:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [dispatch, pagination.limit]
  );

  // =========================================================
  // INITIAL FETCH
  // =========================================================

  useEffect(() => {
    refreshOrders(1);
  }, [refreshOrders]);

  // =========================================================
  // NEXT PAGE
  // =========================================================

  const nextPage = useCallback(async () => {
    if (
      loading ||
      pagination.currentPage >= pagination.totalPages
    ) {
      return;
    }

    await refreshOrders(pagination.currentPage + 1);
  }, [
    loading,
    pagination.currentPage,
    pagination.totalPages,
    refreshOrders,
  ]);

  // =========================================================
  // PREVIOUS PAGE
  // =========================================================

  const previousPage = useCallback(async () => {
    if (loading || pagination.currentPage <= 1) {
      return;
    }

    await refreshOrders(pagination.currentPage - 1);
  }, [loading, pagination.currentPage, refreshOrders]);

  // =========================================================
  // REFRESH CURRENT PAGE
  // =========================================================

  const refreshCurrentOrders = useCallback(async () => {
    await refreshOrders(pagination.currentPage);
  }, [refreshOrders, pagination.currentPage]);

  // =========================================================
  // FETCH USER-WISE ORDERS
  // =========================================================

  const refreshuserOrders = useCallback(async () => {
    setLoading(true);

    try {
      const result = await dispatch(asyncfetchUserwiseOrders());

      if (result?.orders) {
        setUserOrders(result.orders);
      }

      return result;
    } catch (error) {
      console.error("Fetch user orders error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  // =========================================================
  // RETURN
  // =========================================================

  return {
    allOrders,
    userOrders,
    loading,

    // Fetch functions
    refreshOrders,
    refreshCurrentOrders,
    refreshuserOrders,

    // Pagination
    pagination,
    nextPage,
    previousPage,
  };
}
