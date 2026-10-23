import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payment: null,
  error: [],
  isAuthenticated: true,
};

export const paymentReducer = createSlice({
  name: "payment",
  initialState,
  reducers: {
    fetchPayment: (state, action) => {
      state.payment = action.payload;
      state.isAuthenticated = true;
    },
    createnewPayment: (state, action) => {
      state.payment = action.payload;
      state.isAuthenticated = true;
    },
    editPayment: (state, action) => {
      state.payment = action.payload;
      state.isAuthenticated = true;
    },
    removePayment: (state, action) => {
      state.payment = action.payload;
      state.isAuthenticated = true;
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createnewPayment,
  fetchPayment,
  editPayment,
  removePayment,
  iserror,
} = paymentReducer.actions;

export default paymentReducer.reducer;