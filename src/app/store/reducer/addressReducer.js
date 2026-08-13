import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: null,
  error: [],
  isAuthenticated: true,
};

export const addressReducer = createSlice({
  name: "address",
  initialState,
  reducers: {
    fetchAddress: (state, action) => {
      state.address = action.payload;
      state.isAuthenticated = true;
    },
    createAddress: (state, action) => {
      state.address = action.payload;
      state.isAuthenticated = true;
    },
    editAddress: (state, action) => {
      state.address = action.payload;
      state.isAuthenticated = true;
    },
    removeAddress: (state, action) => {
      state.address = action.payload;
      state.isAuthenticated = true;
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createAddress,
  fetchAddress,
  editAddress,
  removeAddress,
  iserror,
} = addressReducer.actions;

export default addressReducer.reducer;
