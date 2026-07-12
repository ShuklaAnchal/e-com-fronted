"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ children, type }) {
  const router = useRouter();


  const state = useSelector((state) => state);

console.log("Redux State:", state);
  // Customer Auth
  const userAuth = useSelector((state) => state.user);
  // console.log({userAuth});
  

  // Admin Auth
  const adminAuth = useSelector((state) => state.login);
  // console.log({adminAuth});
  

  useEffect(() => {
    if (type === "user" && !userAuth?.isAuthenticated) {
      router.replace("/login");
    }

    if (type === "admin" && !adminAuth?.isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [
    type,
    userAuth?.isAuthenticated,
    adminAuth?.isAuthenticated,
    router,
  ]);

  if (type === "user" && !userAuth?.isAuthenticated) {
    return null;
  }

  if (type === "admin" && !adminAuth?.isAuthenticated) {
    return null;
  }

  return children;
}