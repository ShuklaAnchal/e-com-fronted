"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "@/app/store/action/adminAction";

export default function ProtectedRoute({ children, type }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const adminAuth = useSelector((state) => state.login);

  const adminData = adminAuth?.admin;
  const currentUser = adminData?.user;
  const userRole = adminData?.role || adminData?.userType;

  console.log("Redux Login State:", adminAuth);
  console.log("Current User:", currentUser);
  console.log("User Role:", userRole);

  // Fetch current user after refresh
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        // No token -> logout
        if (!token) {
          router.replace("/adminLogin");
          return;
        }

        // Redux empty after refresh -> get current user
        if (!adminData) {
          const response = await dispatch(fetchCurrentUser());

          if (!response?.success) {
            localStorage.removeItem("adminToken");
            router.replace("/adminLogin");
            return;
          }
        }
      } catch (error) {
        console.log("Authentication Error:", error);

        localStorage.removeItem("adminToken");
        router.replace("/adminLogin");
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, [dispatch, router, adminData]);

  // Role based protection
  useEffect(() => {
    if (!userRole) return;

    if (type === "admin") {
      if (userRole !== "admin") {
        router.replace("/admin/dashboard");
      }
    }

    if (type === "user") {
      if (userRole !== "user") {
        router.replace("/admin/dashboard");
      }
    }
  }, [type, userRole, router]);

  // Loading while checking authentication
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // User not authenticated
  if (!adminAuth?.isAuthenticated) {
    return null;
  }

  return children;
}
