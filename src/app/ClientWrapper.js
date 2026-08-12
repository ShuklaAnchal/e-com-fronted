"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { mergeLocalCart } from "@/app/store/action/cartAction";
import { fetchCurrentUser } from "@/app/store/action/adminAction";
// import {
//   fetchnotificationbyID,
//   fetchunreadNotification,
// } from "@/app/store/Actions/notificationAction";
// import { initSocket } from "@/app/utils/socket";
// import NotificationPopup from "@/app/component/notification/NotificationPopup";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { selectUnreadNotifications } from "@/app/utils/notificationSelectors";


export default function ClientWrapper({ children }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.login.admin);
  const loading = useSelector((state) => state.login.loading);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const adminToken = localStorage.getItem("adminToken");
    const userToken = localStorage.getItem("userToken");

    const token = adminToken || userToken;

    if (!token) {
      return;
    }

    // Restore current user from backend
   if (token && !user) {
      dispatch(fetchCurrentUser());
    }

    // Only merge guest cart when customer token exists
    if (userToken) {
      const localCart = JSON.parse(
        localStorage.getItem("cartItems") || "[]"
      );

      if (localCart.length > 0) {
        dispatch(mergeLocalCart());
      }
    }
  }, [dispatch, user]);

  return <>{children}</>;
}