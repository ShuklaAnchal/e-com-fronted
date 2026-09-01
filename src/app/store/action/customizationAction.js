import axios from "@/app/utils/axios";

import {
  createnewCustomize,
  fetchCustomize,
  editCustomize,
  removeCustomize,
  iserror,
} from "../reducer/customizationReducer";

// ======================================================
// GET TOKEN
// ======================================================

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }

  return null;
};

// ======================================================
// COMMON CONFIG
// ======================================================

const getConfig = () => {
  const token = getToken();

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// ======================================================
// CREATE CUSTOMIZATION REQUEST
// POST /customization-request/create
// ======================================================

export const createCustomize = (formData) => async (dispatch) => {
  try {
    console.log("Creating customization request:", formData);

    const config = getConfig();

    const { data } = await axios.post(
      "/customization-request/create",
      formData,
      config,
    );

    console.log("Customization request response:", data);

    dispatch(createnewCustomize(data));

    return {
      success: true,
      payload: data,
    };
  } catch (error) {
    console.error(
      "Error creating customization request:",
      error?.response?.data || error.message,
    );

    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error.message ||
      "Failed to submit customization request";

    dispatch(iserror(message));

    return {
      success: false,
      message,
    };
  }
};

// ======================================================
// FETCH ALL CUSTOMIZATION REQUESTS
// GET /customization-request/all
// ======================================================

export const fetchCustomizes =
  ({ page = 1, limit = 10, status = "" } = {}) =>
  async (dispatch) => {
    try {
      const config = getConfig();

      let url = `/customization-request/all?page=${page}&limit=${limit}`;

      if (status) {
        url += `&status=${status}`;
      }

      console.log("Fetching customization requests:", url);

      const { data } = await axios.get(url, config);

      console.log("Customization requests response:", data);

      dispatch(fetchCustomize(data.requests || []));

      return data;
    } catch (error) {
      console.error(
        "Error fetching customization requests:",
        error?.response?.data || error.message,
      );

      const message =
        error?.response?.data?.message ||
        error.message ||
        "Failed to fetch customization requests";

      dispatch(iserror(message));

      return null;
    }
  };

// ======================================================
// FETCH SINGLE CUSTOMIZATION REQUEST
// GET /customization-request/:id
// ======================================================

export const fetchCustomizeByID = (id) => async (dispatch) => {
  try {
    if (!id) {
      dispatch(iserror("Customization request ID is required"));

      return null;
    }

    const config = getConfig();

    const { data } = await axios.get(`/customization-request/${id}`, config);

    console.log("Customization request detail:", data);

    dispatch(fetchCustomize(data));

    return data;
  } catch (error) {
    console.error(
      "Error fetching customization request:",
      error?.response?.data || error.message,
    );

    const message =
      error?.response?.data?.message ||
      error.message ||
      "Failed to fetch customization request";

    dispatch(iserror(message));

    return null;
  }
};

// ======================================================
// UPDATE CUSTOMIZATION REQUEST
// PUT /customization-request/:id
// ======================================================

export const editCustomizeDetailes = (id, formData) => async (dispatch) => {
  try {
    if (!id) {
      dispatch(iserror("Customization request ID is required"));

      return {
        success: false,
        message: "Customization request ID is required",
      };
    }

    const config = getConfig();

    const { data } = await axios.put(
      `/customization-request/${id}`,
      formData,
      config,
    );

    console.log("Updated customization request:", data);

    dispatch(editCustomize(data));

    return {
      success: true,
      payload: data,
    };
  } catch (error) {
    console.error(
      "Error updating customization request:",
      error?.response?.data || error.message,
    );

    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error.message ||
      "Failed to update customization request";

    dispatch(iserror(message));

    return {
      success: false,
      message,
    };
  }
};

// ======================================================
// UPDATE CUSTOMIZATION REQUEST STATUS
// PATCH /customization-request/:id/status
// ======================================================

export const updateCustomizeStatus = (id, status) => async (dispatch) => {
  try {
    if (!id) {
      dispatch(iserror("Customization request ID is required"));

      return {
        success: false,
        message: "Customization request ID is required",
      };
    }

    if (!status) {
      dispatch(iserror("Status is required"));

      return {
        success: false,
        message: "Status is required",
      };
    }

    const config = getConfig();

    const { data } = await axios.patch(
      `/customization-request/${id}/status`,
      { status },
      config,
    );

    console.log("Customization status updated:", data);

    dispatch(editCustomize(data));

    return {
      success: true,
      payload: data,
    };
  } catch (error) {
    console.error(
      "Error updating customization status:",
      error?.response?.data || error.message,
    );

    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error.message ||
      "Failed to update customization status";

    dispatch(iserror(message));

    return {
      success: false,
      message,
    };
  }
};

// ======================================================
// DELETE CUSTOMIZATION REQUEST
// DELETE /customization-request/:id
// ======================================================

export const deleteCustomize = (id) => async (dispatch) => {
  try {
    if (!id) {
      dispatch(iserror("Customization request ID is required"));

      return {
        success: false,
        message: "Customization request ID is required",
      };
    }

    const config = getConfig();

    const { data } = await axios.delete(`/customization-request/${id}`, config);

    console.log("Deleted customization request:", data);

    dispatch(removeCustomize(data));

    return {
      success: true,
      payload: data,
    };
  } catch (error) {
    console.error(
      "Error deleting customization request:",
      error?.response?.data || error.message,
    );

    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error.message ||
      "Failed to delete customization request";

    dispatch(iserror(message));

    return {
      success: false,
      message,
    };
  }
};
