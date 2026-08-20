import axios from "@/app/utils/axios";
import {
  createAddress,
  fetchAddress,
  editAddress,
  removeAddress,
  iserror,
} from "../reducer/addressReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const asyncfetchAddress = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/address/fetch-userwise-shippingaddress");
    console.log("Fetched products:", data);
    dispatch(fetchAddress(data.address));
    return data;
  } catch (error) {
    console.error("Error in fetcing Address:", error.message);
    dispatch(iserror(error.message));
  }
};


export const AddAddress = (addressData) => async (dispatch) => {
  try {
    const token = getToken();

    console.log("TOKEN:", token);
    console.log("ADDRESS DATA:", addressData);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/address/add-shippingaddress",
      addressData,
      config
    );

    console.log("ADD ADDRESS RESPONSE:", data);

    dispatch(createAddress(data));

    return {
      success: true,
      payload: data,
    };
  } catch (error) {
    console.error(
      "ADD ADDRESS ERROR:",
      error?.response?.data || error
    );

    const message =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      "Failed to create Address";

    dispatch(iserror(message));

    return {
      success: false,
      message,
    };
  }
};


//edit products detailes
export const editAddressdetailes =
  (id, formData) => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, // attach token in headers
          "Content-Type": "multipart/form-data",
        },
      };

      const result = await axios.put(
        `/address/update-shippingaddress/${id}`,
        formData,
        config
      );

      dispatch(editAddress(result.data));
      return { success: true, payload: result.data };
    } catch (error) {
      dispatch(
        iserror(error?.response?.data?.message || "Failed to create product")
      );
      return {
        success: false,
        message: error?.response?.data?.message || "Error",
      };
    }
  };

//delete product detailes
export const deleteCategory = (id) => async (dispatch, getState) => {

  try {
    const token = getToken(); // get token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };
    const response = await axios.delete(`/address/delete-shippingAddres/${id}`, config);
    dispatch(removeAddress(response.data));
    return { success: true, payload: response.data };
  } catch (error) {
    dispatch(
      iserror(error?.response?.data?.message || "Failed to create product")
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Error",
    };
  }
};