import axios from "@/app/utils/axios";
import {
  fetchProduct,
  createnewProduct,
  createProductvarient,
  editProduct,
  removeProduct,
  catgeorywiseProducts,
  productByid,
  iserror,
} from "../reducer/productReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// FETCH PRODUCTS WITH BACKEND PAGINATION
export const asyncfetchproduct =
  ({ page = 1, limit = 10 } = {}) =>
  async (dispatch) => {
    try {
      const token = getToken();

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("Fetching products...");
      console.log("Page:", page);
      console.log("Limit:", limit);

      const { data } = await axios.get(
        `/products/fetch-AllProducts-user?page=${page}&limit=${limit}`,
        config,
      );

      console.log("Product API Response:", data);

      // Store only current page products
      dispatch(fetchProduct(data.products || []));

      return data;
    } catch (error) {
      console.error(
        "Error in fetching products:",
        error.response?.data || error.message,
      );

      dispatch(
        iserror(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch products",
        ),
      );

      return null;
    }
  };

export const fetchProductbyID = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/products/fetch-productby-id/${id}`
    );

    dispatch(productByid(data));

    return data; // Return the whole response
  } catch (error) {
    console.error(error);
    dispatch(iserror(error.message));
    throw error;
  }
};

export const createProduct = (formData) => async (dispatch, getState) => {
  
  try {
    const token = getToken();
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post("/products/create", formData, config);


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
export const deleteListedProduct = (id) => async (dispatch, getState) => {

  try {
    const token = getToken(); // get token from localStorage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
      },
    };
    const response = await axios.delete(`/products/delete-Product/${id}`, config);
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

// ======================================================
// UPDATE PRODUCT RELATIONSHIPS
// ======================================================

export const updateProductRelationships =
  (productId, relationshipData) => async (dispatch) => {
    try {
      const token = getToken();

      const response = await axios.put(
        `/products/relationships/${productId}`,
        relationshipData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(
        "UPDATE PRODUCT RELATIONSHIPS ERROR:",
        error
      );

      throw (
        error?.response?.data?.message ||
        error?.message ||
        "Failed to update product relationships"
      );
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


//fetch category wise products 
export const fetchCategoryWiseProducts= (categoryId) => async (dispatch) => {
  try {
    console.log({categoryId});
    
    const { data } = await axios.get(
      `/products/fetch-catgeory-wise-products/${categoryId}`
    );

    dispatch(catgeorywiseProducts(data));
console.log({data});

    return data; // Return the whole response
  } catch (error) {
    console.error(error);
    dispatch(iserror(error.message));
    throw error;
  }
};


