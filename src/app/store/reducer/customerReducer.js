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
    customerLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },

    customerLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },

    currentCustomer: (state, action) => {
      state.user = action.payload;
      state.token =
        typeof window !== "undefined"
          ? localStorage.getItem("userToken")
          : null;
      state.isAuthenticated = true;
    },

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
  customerLogin,
  customerLogout,
  currentCustomer,
  editCustomer,
  customerError,
  clearCustomerError,
} = customerReducer.actions;

export default customerReducer.reducer;
