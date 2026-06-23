import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: null,
  error: [],
  isAuthenticated: true,
};

export const customerReducer = createSlice({
  name: "customer",
  initialState,
  reducers: {
    fetchCustomer: (state, action) => {
      state.customer = action.payload;
      state.isAuthenticated = true;
    },
    createnewCustomer: (state, action) => {
      state.customer = action.payload;
      state.isAuthenticated = true;
    },
    editCustomer: (state, action) => {
      state.customer = action.payload;
      state.isAuthenticated = true;
    },
    removeCustomer: (state, action) => {
      state.customer = action.payload;
      state.isAuthenticated = true;
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createnewCustomer,
  fetchCustomer,
  editCustomer,
  removeCustomer,
  iserror,
} = customerReducer.actions;

export default customerReducer.reducer;