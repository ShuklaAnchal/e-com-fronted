import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  token: null,
  error: [],
  isAuthenticated: false,
  loading: false,
};

export const adminReducer = createSlice({
  name: "admin",

  initialState,

  reducers: {
    adminLogin: (state, action) => {
      state.admin = action.payload.user;

      state.token = action.payload.token;

      state.isAuthenticated = true;
    },

    adminLogout: (state) => {
      state.admin = null;

      state.token = null;

      state.isAuthenticated = false;
    },

    currentAdmin: (state, action) => {
      state.admin = action.payload;

      state.isAuthenticated = true;
    },

    editAdmin: (state, action) => {
      state.admin = action.payload;

      state.isAuthenticated = true;
    },

    adminError: (state, action) => {
      state.error.push(action.payload);
    },

    clearAdminError: (state) => {
      state.error = [];
    },
  },
});

export const {
  adminLogin,
  adminLogout,
  currentAdmin,
  editAdmin,
  adminError,
  clearAdminError,
} = adminReducer.actions;

export default adminReducer.reducer;
