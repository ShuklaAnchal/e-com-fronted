"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { fetchCurrentAdmin } from "@/app/store/action/adminAction";

export default function ProtectedRoute({ children, type }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.replace("/adminLogin");
          return;
        }

        const response = await dispatch(fetchCurrentAdmin());

        console.log("Current User Response:", response);

        const currentAdmin = response?.payload;

        if (!response?.success || !currentAdmin) {
          localStorage.removeItem("token");
          localStorage.removeItem("admin");
          router.replace("/adminLogin");
          return;
        }

        setAdmin(currentAdmin);
        setRole(response.role);
      } catch (error) {
        console.error("Authentication Error:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("admin");

        router.replace("/adminLogin");
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, [dispatch, router]);

  useEffect(() => {
    console.log("Role Check Effect Triggered ->", {
      isLoading,
      admin,
      role,
      type,
    });

    if (isLoading || !admin || !role) {
      console.log("Skipping role check");
      return;
    }

    const currentRole = role.toLowerCase();
    const requiredRole = type?.toLowerCase();

    console.log("Checking Role:", {
      currentRole,
      requiredRole,
    });

    if (requiredRole === "admin" && currentRole !== "admin") {
      router.replace("/adminLogin");
    }

    if (requiredRole === "user" && currentRole !== "user") {
      router.replace("/login");
    }
  }, [role, admin, type, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!admin) {
    return null;
  }

  return children;
}
