"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { asyncfetchlogin } from "../store/action/loginAction";
import { useDispatch } from "react-redux";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const LoginHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await dispatch(
        asyncfetchlogin({
          email: formData.email,
          password: formData.password,
        }),
      );

      const result = response?.payload || response;
      console.log({ result });

      if (result?.token) {
        localStorage.setItem("token", result.token);
      }

      if (result?.success) {
        alert(result?.message || "Login Successful");

        router.replace("/admin/dashboard");
      } else {
        alert(result?.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      alert(error?.response?.data?.message);
      // toast.error(
      //   error?.response?.data?.message ||
      //     "Something went wrong"
      // );

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Admin Panel</h1>
          <p className="text-gray-500 mt-2">Sign in to access the dashboard</p>
        </div>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>

          <button
            type="submit"
            onClick={LoginHandler}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
