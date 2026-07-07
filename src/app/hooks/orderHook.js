import { useEffect, useState } from "react";
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

  const refreshOrders = async () => {
    setLoading(true);

    const allOrdersResult = await dispatch(asyncfetchAllOrders());
    const userOrdersResult = await dispatch(asyncfetchUserwiseOrders());

    if (allOrdersResult?.orders) {
      setAllOrders(allOrdersResult.orders);
    }

    if (userOrdersResult?.orders) {
      setUserOrders(userOrdersResult.orders);
    }

    setLoading(false);
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  return {
    allOrders,
    userOrders,
    loading,
    refreshOrders,
  };
}