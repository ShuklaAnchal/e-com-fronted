import axios from "@/app/utils/axios";
import {
createnewPayment,
  fetchPayment,
  editPayment,
  removePayment,
  iserror,
} from "../reducer/paymentReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// FETCH payments WITH PAGINATION
export const asyncfetchpayments =
  ({ page = 1, limit = 8 } = {}) =>
  async (dispatch) => {
    try {
      const token = getToken();

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `/payment/allPayments?page=${page}&limit=${limit}`,
        config,
      );
      // Current page categories
      dispatch(fetchPayment(data || []));

      return data;
    } catch (error) {
      console.error(
        "Error in fetching payments:",
        error.response?.data || error.message,
      );

      dispatch(
        iserror(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch payments",
        ),
      );

      return null;
    }
  };

//fetch the payment by the id
export const fetchPaymentbyID = (id) => async (dispatch, getState) => {
  try {
    const token = getToken(); // get token from localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };

    const { data } = await axios.get(`/payment/fetch-by-id/${id}`, config);

    dispatch(fetchPayment(data));
    return data;
  } catch (error) {
    console.error("Error in fetcing payment detailes:", error.message);
    dispatch(iserror(error.message));
  }
};
