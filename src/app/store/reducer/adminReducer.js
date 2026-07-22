import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: null,
  token: null,
  role: null,
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
      state.role = action.payload.user?.role ?? action.payload.user?.userType ?? null;
      state.isAuthenticated = true;
    },

    adminLogout: (state) => {
      state.admin = null;
      state.token = null;
      state.isAuthenticated = false;
    },

    currentAdmin: (state, action) => {
      // payload is { user, role } from fetchCurrentUser
      state.admin = action.payload.user ?? action.payload;
      state.role = action.payload.role ?? action.payload.user?.role ?? action.payload.user?.userType ?? null;
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
