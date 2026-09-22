import axios from "@/app/utils/axios";
import {
  fetchReview,
  createnewReview,
  editReview,
  removeReview,
  iserror,
} from "../reducer/reviewReducer";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

// FETCH CATEGORIES WITH PAGINATION
export const asyncfetchProductWiseReview = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/review/productwise-review/${id}`
    );

    console.log("Reviews API Response:", data);

    dispatch(fetchReview(data || []));

    return data;
  } catch (error) {
    console.error(
      "Error in fetching Reviews:",
      error.response?.data || error.message
    );

    dispatch(
      iserror(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch Reviews"
      )
    );

    return null;
  }
};

//add new review
export const createReviews = (formData) => async (dispatch, getState) => {
  console.log({ formData });

  try {
    const token = getToken();
    console.log({ token });
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // attach token in headers
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post("/review/add-review", formData, config);

    dispatch(createnewReview(data));

    return { success: true, payload: data };
  } catch (error) {
    const message = error?.response?.data?.error || "Failed to create Reviews";
    dispatch(iserror(message));
    return {
      success: false,
      message,
    };
  }
};

// //edit products detailes
// export const editCategorydetailes =
//   (id, formData) => async (dispatch, getState) => {
//     try {
//       const token = getToken(); // get token from localStorage
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`, // attach token in headers
//           "Content-Type": "multipart/form-data",
//         },
//       };

//       const result = await axios.put(
//         `/categorys/update-category/${id}`,
//         formData,
//         config,
//       );

//       dispatch(editCategory(result.data));
//       return { success: true, payload: result.data };
//     } catch (error) {
//       dispatch(
//         iserror(error?.response?.data?.message || "Failed to create product"),
//       );
//       return {
//         success: false,
//         message: error?.response?.data?.message || "Error",
//       };
//     }
//   };

// //delete product detailes
// export const deleteCategory = (id) => async (dispatch, getState) => {
//   try {
//     const token = getToken(); // get token from localStorage
//     const config = {
//       headers: {
//         Authorization: `Bearer ${token}`, // attach token in headers
//       },
//     };
//     const response = await axios.delete(
//       `/categorys/delete-category/${id}`,
//       config,
//     );
//     dispatch(removeCategory(response.data));
//     return { success: true, payload: response.data };
//   } catch (error) {
//     dispatch(
//       iserror(error?.response?.data?.message || "Failed to create product"),
//     );
//     return {
//       success: false,
//       message: error?.response?.data?.message || "Error",
//     };
//   }
// };
