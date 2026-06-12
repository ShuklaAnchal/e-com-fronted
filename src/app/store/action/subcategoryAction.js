import axios from "@/app/utils/axios";
import {
  fetchSubCategory,
  createnewSubCategory,
  editSubCategory,
  removeSubCategory,
  iserror,
} from "../reducer/subcatgeoryReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const asyncfetchSubcategory = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/subcategory/fetch-all-subcategories");
    // console.log("Fetched products:", data.products);
    
    dispatch(fetchSubCategory(data.subcategories));
    return data;
  } catch (error) {
    console.error("Error in fetcing subcategory:", error.message);
    dispatch(iserror(error.message));
  }
};

//fetch the product by the id
export const fetchSubcategorybyID = (id) => async (dispatch, getState) => {
  try {
    const token = getToken(); // get token from localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };

    const { data } = await axios.get(`/subcategory/fetch-one-subcategory/${id}`, config);

    dispatch(fetchSubCategory(data));
    return data;
  } catch (error) {
    console.error("Error in fetcing subcategory detailes:", error.message);
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
    const { data } = await axios.post("/subcategory/create-category", formData, config);

    dispatch(createnewSubCategory(data));

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
        `/subcategory/update-category/${id}`,
        formData,
        config
      );

      dispatch(editSubCategory(result.data));
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
    const response = await axios.delete(`/subcategory/delete-category/${id}`, config);
    dispatch(removeSubCategory(response.data));
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