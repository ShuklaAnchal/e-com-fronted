import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  distributor: null,
  error: [],
  isAuthenticated: true,
};

export const SubcategoryReducer = createSlice({
  name: "distributor",
  initialState,
  reducers: {
    fetchSubCategory: (state, action) => {
      state.distributor = action.payload;
      state.isAuthenticated = true;
    },
    createnewSubCategory: (state, action) => {
      state.distributor = action.payload;
      state.isAuthenticated = true;
    },
    editSubCategory: (state, action) => {
      state.distributor = action.payload;
      state.isAuthenticated = true;
    },
    removeSubCategory: (state, action) => {
      state.distributor = action.payload;
      state.isAuthenticated = true;
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fetchSubCategory,
  createnewSubCategory,
  editSubCategory,
  removeSubCategory,
  iserror,
} = SubcategoryReducer.actions;

export default SubcategoryReducer.reducer;