import axios from "@/app/utils/axios";
import {
  createneworder,
  fetchorder,
  fetchorderAdmin,
  fetchOrderDetailes,
  editorder,
  removeorder,
  iserror,
} from "../reducer/orderReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

//fetch all orders admin wise
export const asyncfetchAllOrders = () => async (dispatch, getState) => {
  try {
    const token = getToken(); // get token from localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };

    const { data } = await axios.get("/order/Admin-Allordersview", config);
    // console.log("Fetched products:", data.products);
    dispatch(fetchorderAdmin(data));
    return data;
  } catch (error) {
    console.error("Error in fetcing product:", error.message);
    dispatch(iserror(error.message));
  }
};

//fetch all orders user wise
export const asyncfetchUserwiseOrders = () => async (dispatch, getState) => {
  try {
    const token = getToken(); // get token from localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };

    const { data } = await axios.get("/order/user-allOrders", config);
    // console.log("Fetched products:", data.products);
    dispatch(fetchorder(data));
    return data;
  } catch (error) {
    console.error("Error in fetcing product:", error.message);
    dispatch(iserror(error.message));
  }
};

//fetch the product by the id
export const fetchOrderbyID = (id) => async (dispatch, getState) => {
  try {
    const token = getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(
      `/order/user-orderdetiles/${id}`,
      config
    );

    console.log(data);

    // Store only the order object
    dispatch(fetchOrderDetailes(data.order));

    return data.order;
  } catch (error) {
    console.error("Error in fetching order details:", error.message);
    dispatch(iserror(error.message));
  }
};

export const createOrder = (formData) => async (dispatch) => {
  console.log("CREATE ORDER PAYLOAD:", formData);

  try {
    const token = getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/order/user-order",
      formData,
      config
    );

    console.log("order Action Data:", data);
    
    dispatch(createneworder(data));

    return {
      success: true,
      payload: data,
    };
  } catch (error) {
    console.error(
      "CREATE ORDER ERROR:",
      error?.response?.data || error
    );

    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to create Order";

    dispatch(iserror(message));

    return {
      success: false,
      message,
    };
  }
};

// Optional: separate action if you want to handle Razorpay separately
export const createRazorpayOrder =
  (orderID, orderAmount) => async (dispatch, getState) => {
    // console.log({ orderAmount });
    // console.log({ orderID });

    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      const { data } = await axios.post(
        "/payment/create-order",
        { orderID, orderAmount },
        config,
      );
      // console.log({ data });

      return { success: true, payload: data };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: error?.response?.data?.message || "Error",
      };
    }
  };

// New: verify payment action (same structure)
export const verifyPayment = (paymentData) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const { data } = await axios.post(
      "/payment/verify-payment",
      paymentData,
      config,
    );

    return { success: true, payload: data };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: error?.response?.data?.message || "Payment verification failed",
    };
  }
};

// //edit products detailes
// export const editOdetailes =
//   (id, formData) => async (dispatch, getState) => {
//     try {
//       const token = getToken(); // get token from localStorage
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`, // attach token in headers
//           "Content-Type": "multipart/form-data",
//         },
//       };

//       const result = await axios.put(
//         `/categorys/update-category/${id}`,
//         formData,
//         config,
//       );

//       dispatch(editorder(result.data));
//       return { success: true, payload: result.data };
//     } catch (error) {
//       dispatch(
//         iserror(error?.response?.data?.message || "Failed to create product"),
//       );
//       return {
//         success: false,
//         message: error?.response?.data?.message || "Error",
//       };
//     }
//   };

//delete product detailes
// export const deleteCategory = (id) => async (dispatch, getState) => {
//   try {
//     const token = getToken(); // get token from localStorage
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`, // attach token in headers
//       },
//     };
//     const response = await axios.delete(
//       `/categorys/delete-category/${id}`,
//       config,
//     );
//     dispatch(removeCategory(response.data));
//     return { success: true, payload: response.data };
//   } catch (error) {
//     dispatch(
//       iserror(error?.response?.data?.message || "Failed to create product"),
//     );
//     return {
//       success: false,
//       message: error?.response?.data?.message || "Error",
//     };
//   }
// };
