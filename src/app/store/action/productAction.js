import axios from "@/app/utils/axios";
import {
  fetchProduct,
  createnewProduct,
  createProductvarient,
  editProduct,
  removeProduct,
  iserror,
} from "../reducer/productReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

export const asyncfetchproduct = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/products/fetch-AllProducts-user");
    console.log("Fetched products:", data);
    console.log({pr:data.products});
    dispatch(fetchProduct(data.products));
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

    const { data } = await axios.get(`/products/fetch-productby-id/${id}`, config);

    dispatch(fetchProduct(data));
    return data;
  } catch (error) {
    console.error("Error in fetcing product detailes:", error.message);
    dispatch(iserror(error.message));
  }
};

export const createProduct = (formData) => async (dispatch, getState) => {
  console.log({formData});
  
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log({formData});
    
    const { data } = await axios.post("/products/create", formData, config);
 console.log({data});
 
    dispatch(createnewProduct(data));

    return { success: true, payload: data };
  } catch (error) {
  console.log("FULL ERROR", error);
  console.log("RESPONSE", error.response);
  console.log("DATA", error.response?.data);

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
export const editProductDetails =
  (id, formData) => async (dispatch, getState) => {
    try {
      const token = getToken(); // get token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      };

      const result = await axios.put(
        `/products/update-product-detiles/${id}`,
        formData,
        config
      );

      dispatch(editProduct(result.data));
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
    const response = await axios.delete(`/products/delete-category/${id}`, config);
    dispatch(removeProduct(response.data));
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


export const createProductVarient = (productId, formData) => async (dispatch, getState) => {
  console.log({formData});
  
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log({formData});
    
    const { data } = await axios.post(`/product-variant/create-variant/${productId}`, formData, config);
 console.log({data});
 
    dispatch(createProductvarient(data));

    return { success: true, payload: data };
  } catch (error) {
  console.log("FULL ERROR", error);
  console.log("RESPONSE", error.response);
  console.log("DATA", error.response?.data);

  const message =
    error?.response?.data?.error || "Failed to create product";

  dispatch(iserror(message));

  return {
    success: false,
    message,
  };
}
};