import axios from "@/app/utils/axios";

import {
  adminLogin,
  adminLogout,
  currentAdmin,
  editAdmin,
  adminError,
  clearAdminError,
} from "../reducer/adminReducer";

// Admin Login

export const asyncfetchlogin = (formData) => async (dispatch) => {
  try {
    dispatch(clearAdminError());
    const { data } = await axios.post("/adminlogin", formData);
    console.log("Admin Login Response:", data);
    if (data.token) {
      localStorage.setItem("adminToken", data.token);
    }

    dispatch(
      adminLogin({
        user: data.admin,
        token: data.token,
      }),
    );
    return {
      success: true,
      payload: data,
    };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Login failed";
    dispatch(adminError(errorMessage));
    return {
      success: false,
      message: errorMessage,
    };
  }
};

// Fetch Current Admin After Refresh
export const fetchCurrentUser = () => async (dispatch) => {
  try {
    const { data } = await axios.post("/currentadmin");
    console.log("Current Admin:", data);
    dispatch(currentAdmin(data.admin || data.user));
    return {
      success: true,
      payload: data.admin || data.user,
    };
  } catch (error) {
    console.error("Current Admin Error:", error);
    dispatch(adminError("Failed to fetch admin"));
    return {
      success: false,
    };
  }
};

// Update Admin Profile

export const updateCurrentUser = (id, payload) => async (dispatch) => {
  try {
    const token = localStorage.getItem("adminToken");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`/portal/update/${id}`, payload, config);
    dispatch(editAdmin(data));
    return {
      success: true,
      payload: data,
    };
  } catch (error) {
    const message = error.response?.data?.message || "Failed to update admin";
    dispatch(adminError(message));
    return {
      success: false,
      message,
    };
  }
};

// Logout Admin
export const logoutCurrentUser = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("adminToken");
    await axios.post(
      "/portal/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    localStorage.removeItem("adminToken");
    dispatch(adminLogout());
    return {
      success: true,
    };
  } catch (error) {
    console.error("Logout Error:", error);
    dispatch(adminError("Logout failed"));
    return {
      success: false,
    };
  }
};
