import axios from "@/app/utils/axios";
import {
 createnewCategory,
  fetchCategory,
  editCategory,
  removeCategory,
  iserror,
} from "../reducer/categoryReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const asyncfetchcategory = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/categorys/fetch-all-categories");
    // console.log("Fetched products:", data.products);
    dispatch(fetchCategory(data.products));
    return data;
  } catch (error) {
    console.error("Error in fetcing product:", error.message);
    dispatch(iserror(error.message));
  }
};

//fetch the product by the id
export const fetchCategorybyID = (id) => async (dispatch, getState) => {
  try {
    const token = getToken(); // get token from localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };

    const { data } = await axios.get(`/categorys/fetch-one-category/${id}`, config);

    dispatch(fetchCategory(data));
    return data;
  } catch (error) {
    console.error("Error in fetcing product detailes:", error.message);
    dispatch(iserror(error.message));
  }
};

export const createCategory = (formData) => async (dispatch, getState) => {
  console.log({formData});
  
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post("/categorys/create-category", formData, config);

    dispatch(createnewCategory(data));

    return { success: true, payload: data };
  } catch (error) {
    const message =
      error?.response?.data?.error || "Failed to create product";
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