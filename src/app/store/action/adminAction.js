import axios from "@/app/utils/axios";

import {
  adminLogin,
  adminLogout,
  currentAdmin,
  editAdmin,
  adminError,
  clearAdminError,
} from "../reducer/adminReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// Admin Login
export const asyncfetchlogin = (formData) => async (dispatch) => {
  try {
    // dispatch(clearAdminError());
    const { data } = await axios.post("/adminlogin", formData);
    console.log("Admin Login Response:", data);
    if (data.token) {
      localStorage.setItem("adminToken", data.token);
    }

    console.log({ user: data.admin });
    console.log({ token: data.token });

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

export const fetchCurrentAdmin = () => async (dispatch) => {
  try {
    // Axios interceptor should attach adminToken/userToken
    const { data } = await axios.post("/currentadmin");

    console.log("Current User Response:", data);

    const currentUser = data.admin ?? data.user;

    if (!currentUser) {
      throw new Error("Current user not found");
    }

    const role =
      data.admin?.role ??
      data.admin?.userType ??
      data.user?.role ??
      data.user?.userType ??
      null;

    dispatch(
      currentAdmin({
        user: currentUser,
        role,
      })
    );

    return {
      success: true,
      payload: currentUser,
      role,
    };
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.message ||
      "Failed to fetch current user";

    dispatch(adminError(message));

    return {
      success: false,
      message,
    };
  }
};

export const fetchCurrentUser = () => async (dispatch) => {
  try {
    // URL must start with /admin so the axios interceptor attaches adminToken
    const { data } = await axios.post("/currentadmin");
    console.log("Current User:", data);
    dispatch(
      currentAdmin({
        user: data.user,
        role: data.user ?? data.user?.role ?? data.user?.userType,
      }),
    );

    return {
      success: true,
      payload: data.user,
      role: data.role,
    };
  } catch (error) {
    console.error("Current User Error:", error);
    dispatch(
      adminError(
        error.response?.data?.message || "Failed to fetch current user",
      ),
    );

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
