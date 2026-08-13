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
    const { data } = await axios.get("/address/fetch-all-categories");
    // console.log("Fetched products:", data.products);
    dispatch(fetchAddress(data.address));
    return data;
  } catch (error) {
    console.error("Error in fetcing Address:", error.message);
    dispatch(iserror(error.message));
  }
};


export const AddAddress = (formData) => async (dispatch, getState) => {

  try {
    const token = getToken();
      console.log({token});
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post("/address/add-shippingaddress", formData, config);

    dispatch(createAddress(data));

    return { success: true, payload: data };
  } catch (error) {
    const message =
      error?.response?.data?.error || "Failed to create Address";
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

      dispatch(editCategory(result.data));
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
    const response = await axios.delete(`/categorys/delete-category/${id}`, config);
    dispatch(removeCategory(response.data));
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