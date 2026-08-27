import axios from "@/app/utils/axios";
import {
  createnewWishlist,
  fetchWishlist,
  editWishlist,
  removeWishlist,
  iserror,
} from "../reducer/wishlistReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// FETCH CATEGORIES WITH PAGINATION
export const asyncfetchUserWishlist =
  ({ page = 1, limit = 8 } = {}) =>
  async (dispatch) => {
    try {
      const token = getToken();

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("Fetching wishlist...");
      console.log("Page:", page);
      console.log("Limit:", limit);

      const { data } = await axios.get(
        `/wishlist/fetch-detailes-userwise-wishlist?page=${page}&limit=${limit}`,
        config,
      );

      console.log("Wishlist API Response:", data);

      // Current page categories
      dispatch(fetchWishlist(data.wishlist || []));

      return data;
    } catch (error) {
      console.error(
        "Error in fetching wishlist:",
        error.response?.data || error.message,
      );

      dispatch(
        iserror(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch wishlist",
        ),
      );

      return null;
    }
  };

export const createWishlist = (formData) => async (dispatch) => {
  try {
    const token = getToken();

    console.log("Wishlist payload:", formData);
    console.log("Wishlist token:", token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/wishlist/add-wishlisted-product",
      formData,
      config
    );

    console.log("Wishlist API response:", data);

    // Don't dispatch category action here.
    // If you have a wishlist reducer action, dispatch it here.

    return {
      success: true,
      payload: data,
    };
  } catch (error) {
    console.error(
      "WISHLIST CREATE ERROR:",
      error.response?.data || error.message
    );

    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      "Failed to add product to wishlist";

    dispatch(iserror(message));

    return {
      success: false,
      message,
    };
  }
};

//edit products detailes
export const editCategorydetailes =
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
        `/categorys/update-category/${id}`,
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