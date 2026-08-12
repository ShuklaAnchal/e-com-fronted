import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  error: [],
  isAuthenticated: false,
  loading: false,
};

export const customerReducer = createSlice({
  name: "customer",

  initialState,

  reducers: {

    editCustomer: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },

    customerError: (state, action) => {
      state.error.push(action.payload);
    },

    clearCustomerError: (state) => {
      state.error = [];
    },
  },
});

export const {
  customerLogout,
  editCustomer,
  customerError,
  clearCustomerError,
} = customerReducer.actions;

export default customerReducer.reducer;
