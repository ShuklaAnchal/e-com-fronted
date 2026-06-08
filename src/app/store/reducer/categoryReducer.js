import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  distributor: null,
  error: [],
  isAuthenticated: true,
};

export const categoryReducer = createSlice({
  name: "distributor",
  initialState,
  reducers: {
    fetchCategory: (state, action) => {
      state.distributor = action.payload;
      state.isAuthenticated = true;
    },
    createnewCategory: (state, action) => {
      state.distributor = action.payload;
      state.isAuthenticated = true;
    },
    editCategory: (state, action) => {
      state.distributor = action.payload;
      state.isAuthenticated = true;
    },
    removeCategory: (state, action) => {
      state.distributor = action.payload;
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