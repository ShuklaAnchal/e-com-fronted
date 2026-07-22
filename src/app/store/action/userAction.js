import axios from "@/app/utils/axios";

import {
  customerLogin,
  customerLogout,
  currentCustomer,
  editCustomer,
  customerError,
  clearCustomerError,
} from "../reducer/customerReducer";

// SEND OTP
export const sendOtp = (mobileNumber) => async (dispatch) => {
  try {
    dispatch(clearCustomerError());
    const { data } = await axios.post(
      "/user/send-otp",

      {
        mobileNumber,
      },
    );
    return {
      success: true,
      payload: data,
    };
  } catch (error) {
    const message = error.response?.data?.message || "Failed to send OTP";
    dispatch(customerError(message));
    return {
      success: false,
      message,
    };
  }
};

// GET CURRENT LOGGED-IN CUSTOMER (for re-hydrating state after refresh)
export const fetchCurrentCustomer = () => async (dispatch) => {
  try {
    // The axios interceptor attaches userToken for non-/admin URLs
    const { data } = await axios.get("/user/current-user");

    console.log("Current Customer:", data);

    dispatch(currentCustomer(data.user));

    return {
      success: true,
      payload: data.user,
    };
  } catch (error) {
    console.error("Current Customer Error:", error);
    dispatch(
      customerError(
        error.response?.data?.message || "Failed to fetch current user",
      ),
    );
    return {
      success: false,
    };
  }
};

// VERIFY OTP LOGIN

export const verifyOtp =
  ({ mobileNumber, otp }) =>
  async (dispatch) => {
    try {
      dispatch(clearCustomerError());
      const { data } = await axios.post("/user/verify-otp", {
        mobileNumber,
        otp,
      });
      console.log("Customer Login Response:", data);
      if (data.token) {
        localStorage.setItem(
          "userToken",
          data.token,
        );
      }
      dispatch(
        customerLogin({
          user: data.user,
          token: data.token,
        }),
      );
      return {
        success: true,
        payload: data,
      };
    } catch (error) {
      const message =
        error.response?.data?.message || "OTP verification failed";
      dispatch(customerError(message));
      return {
        success: false,
        message,
      };
    }
  };


// GET ALL USERS (ADMIN PURPOSE)

export const asyncfetchUsers = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/user/getall-user");
    console.log("Fetched Users:", data.user);
    return data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    dispatch(customerError(error.message));
  }
};

// CUSTOMER LOGOUT

export const logoutCustomer = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("userToken");
    await axios.post(
      "/user/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    localStorage.removeItem("userToken");
    dispatch(customerLogout());
    return {
      success: true,
    };
  } catch (error) {
    console.error("Logout Error:", error);
    dispatch(customerError("Logout failed"));
    return {
      success: false,
    };
  }
};
