import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: null,
  error: [],
  isAuthenticated: true,
};

export const productReducer = createSlice({
  name: "product",
  initialState,
  reducers: {
    fetchProduct: (state, action) => {
      state.product = action.payload;
      state.isAuthenticated = true;
    },
    createnewProduct: (state, action) => {
      state.product = action.payload;
      state.isAuthenticated = true;
    },
    editProduct: (state, action) => {
      state.product = action.payload;
      state.isAuthenticated = true;
    },
    removeProduct: (state, action) => {
      state.product = action.payload;
      state.isAuthenticated = true;
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchProduct,
  createnewProduct,
  editProduct,
  removeProduct,
  iserror,
} = productReducer.actions;

export default productReducer.reducer;