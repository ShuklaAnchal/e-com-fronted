import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: null,
  error: [],
  isAuthenticated: true,
};

export const orderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchorder: (state, action) => {
      state.order = action.payload;
      state.isAuthenticated = true;
    },
     fetchorderAdmin: (state, action) => {
      state.order = action.payload;
      state.isAuthenticated = true;
    },
    createneworder: (state, action) => {
      state.order = action.payload;
      state.isAuthenticated = true;
    },
    editorder: (state, action) => {
      state.order = action.payload;
      state.isAuthenticated = true;
    },
    removeorder: (state, action) => {
      state.order = action.payload;
      state.isAuthenticated = true;
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createneworder,
  fetchorder,
  fetchorderAdmin,
  editorder,
  removeorder,
  iserror,
} = orderReducer.actions;

export default orderReducer.reducer;