import axios from "@/app/utils/axios";
import {
  createnewCustomer,
  fetchCustomer,
  editCustomer,
  removeCustomer,
  iserror,
} from "../reducer/customerReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const asyncfetchUsers = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/user/getall-user");
    console.log("Fetched products:", data.user);
    dispatch(fetchCustomer(data.user));
    return data;
  } catch (error) {
    console.error("Error in fetcing users:", error.message);
    dispatch(iserror(error.message));
  }
};

//fetch the user by the id
export const fetchUsersbyID = (id) => async (dispatch, getState) => {
  try {
    const token = getToken(); // get token from localStorage

    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };

    const { data } = await axios.get(`/user/get-one-userDetiles/${id}`, config);

    dispatch(fetchCustomer(data));
    return data;
  } catch (error) {
    console.error("Error in fetcing user detailes:", error.message);
    dispatch(iserror(error.message));
  }
};

export const createUsers = (formData) => async (dispatch, getState) => {
  console.log({formData});
  
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post("/user/createnewCustomer", formData, config);

    dispatch(createnewCustomer(data));

    return { success: true, payload: data };
  } catch (error) {
    const message =
      error?.response?.data?.error || "Failed to create user";
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