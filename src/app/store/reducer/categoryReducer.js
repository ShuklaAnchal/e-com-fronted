import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: null,
  error: [],
  isAuthenticated: true,
};

export const categoryReducer = createSlice({
  name: "category",
  initialState,
  reducers: {
    fetchCategory: (state, action) => {
      state.category = action.payload;
      state.isAuthenticated = true;
    },
    createnewCategory: (state, action) => {
      state.category = action.payload;
      state.isAuthenticated = true;
    },
    editCategory: (state, action) => {
      state.category = action.payload;
      state.isAuthenticated = true;
    },
    removeCategory: (state, action) => {
      state.category = action.payload;
      state.isAuthenticated = true;
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createnewCategory,
  fetchCategory,
  editCategory,
  removeCategory,
  iserror,
} = categoryReducer.actions;

export default categoryReducer.reducer;