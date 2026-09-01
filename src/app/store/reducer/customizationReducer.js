import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customize: null,
  error: [],
  isAuthenticated: true,
};

export const customizeReducer = createSlice({
  name: "customize",
  initialState,
  reducers: {
    fetchCustomize: (state, action) => {
      state.customize = action.payload;
      state.isAuthenticated = true;
    },
    createnewCustomize: (state, action) => {
      state.customize = action.payload;
      state.isAuthenticated = true;
    },
    editCustomize: (state, action) => {
      state.customize = action.payload;
      state.isAuthenticated = true;
    },
    removeCustomize: (state, action) => {
      state.customize = action.payload;
      state.isAuthenticated = true;
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createnewCustomize,
  fetchCustomize,
  editCustomize,
  removeCustomize,
  iserror,
} = customizeReducer.actions;

export default customizeReducer.reducer;