import axios from "@/app/utils/axios";

import {
  fetchAttributes,
  fetchSingleAttribute,
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

// FETCH ALL ATTRIBUTES
export const asyncFetchAttributes = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/attribute/fetchAttributes");
    console.log({ data });

    dispatch(fetchAttributes(data.attributes));

    return data;
  } catch (error) {
    dispatch(iserror(error.response?.data?.message || error.message));
  }
};

// FETCH ATTRIBUTE BY ID
export const fetchAttributeById = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`/attribute/fetchAttributesByID/${id}`);

    dispatch(fetchSingleAttribute(data.attribute));

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

export const updateAttributeDetails = (id, attributeData) => async (dispatch) => {
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
