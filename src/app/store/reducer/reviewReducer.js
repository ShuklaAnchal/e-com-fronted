import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  review: null,
  error: [],
  isAuthenticated: true,
};

export const reviewReducer = createSlice({
  name: "review",
  initialState,
  reducers: {
    fetchReview: (state, action) => {
      state.review = action.payload;
      state.isAuthenticated = true;
    },
    createnewReview: (state, action) => {
      state.review = action.payload;
      state.isAuthenticated = true;
    },
    editReview: (state, action) => {
      state.review = action.payload;
      state.isAuthenticated = true;
    },
    removeReview: (state, action) => {
      state.review = action.payload;
      state.isAuthenticated = true;
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchReview,
  createnewReview,
  editReview,
  removeReview,
  iserror,
} = reviewReducer.actions;

export default reviewReducer.reducer;