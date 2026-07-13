import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  error: [],
  isAuthenticated: false,
  loading: false,
};

export const customerReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginuser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logoutuser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
    currentuser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    editUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
    removeerror: (state, action) => {
      state.error = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  loginuser,
  logoutuser,
  iserror,
  removeerror,
  currentuser,
  editUser,
} = customerReducer.actions;

export default customerReducer.reducer;
