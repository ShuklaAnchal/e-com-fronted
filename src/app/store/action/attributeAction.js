import axios from "@/app/utils/axios";

import {
  fetchAttributes,
  fetchSingleAttribute,
  fetchSubcategoryAttribute,
  fetchCategoryAttribute,
  createAttribute,
  updateAttribute,
  deleteAttribute,
  iserror,
} from "../reducer/attributeReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};


// FETCH ATTRIBUTES WITH PAGINATION
export const asyncFetchAttributes =
  ({ page = 1, limit = 8 } = {}) =>
  async (dispatch) => {
    try {
      const token = getToken();

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      console.log("Fetching attributes...");
      console.log("Page:", page);
      console.log("Limit:", limit);
      console.log("Token:", token);

      const { data } = await axios.get(
        `/attribute/fetch-all?page=${page}&limit=${limit}`,
        config,
      );

      console.log("Attribute API Response:", data);

      // Store only current page attributes
      dispatch(fetchAttributes(data.attributes || []));

      return data;
    } catch (error) {
      console.error("Fetch attributes error:", error.response?.data || error);

      dispatch(
        iserror(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch attributes",
        ),
      );

      return null;
    }
  };

// FETCH ATTRIBUTE BY ID
export const fetchAllAttribute = (id) => async (dispatch) => {
  try {
     const token = getToken();

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    const { data } = await axios.get(`/attribute/fetchAttributesByID/${id}`, config);
    dispatch(fetchSingleAttribute(data.attribute));
    return data;
  } catch (error) {
    dispatch(iserror(error.response?.data?.message || error.message));
  }
};

// FETCH ATTRIBUTE BY ID
export const fetchAttributeByCatgeoryID = (id) => async (dispatch) => {
  try {
     const token = getToken();

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    const { data } = await axios.get(
      `/attribute/fetchAttributesByCatgory/${id}`,config
    );
    dispatch(fetchCategoryAttribute(data.attribute));
    return data;
  } catch (error) {
    dispatch(iserror(error.response?.data?.message || error.message));
  }
};

// FETCH ATTRIBUTE BY ID
export const fetchAttributeBySubCatgeoryID = (id) => async (dispatch) => {
  try {
     const token = getToken();

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
    const { data } = await axios.get(
      `/attribute/fetchAttributesBySubcategory/${id}`,config
    );
    dispatch(fetchSubcategoryAttribute(data.attribute));
    return data;
  } catch (error) {
    dispatch(iserror(error.response?.data?.message || error.message));
  }
};

// CREATE ATTRIBUTE
export const createNewAttribute = (attributeData) => async (dispatch) => {
  try {
    const token = getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    console.log({ attributeData });

    const { data } = await axios.post(
      "/attribute/create",
      attributeData,
      config,
    );
    dispatch(createAttribute(data.attribute));
    return {
      success: true,

      payload: data,
    };
  } catch (error) {
    const message =
      error.response?.data?.message || "Failed to create attribute";

    dispatch(iserror(message));

    return {
      success: false,

      message,
    };
  }
};

// UPDATE ATTRIBUTE
export const updateAttributeDetails =
  (id, attributeData) => async (dispatch) => {
    try {
      const token = getToken();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `/attribute/update/${id}`,
        attributeData,
        config,
      );

      dispatch(updateAttribute(data.attribute));

      return {
        success: true,
        payload: data,
      };
    } catch (error) {
      dispatch(
        iserror(error.response?.data?.message || "Failed to update attribute"),
      );
      return {
        success: false,
      };
    }
  };

// DELETE ATTRIBUTE
export const deleteAttributeById = (id) => async (dispatch) => {
  try {
    const token = getToken();

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios.delete(
      `/attribute/delete/${id}`,

      config,
    );

    dispatch(deleteAttribute(id));

    return {
      success: true,
    };
  } catch (error) {
    dispatch(
      iserror(error.response?.data?.message || "Failed to delete attribute"),
    );

    return {
      success: false,
    };
  }
};
