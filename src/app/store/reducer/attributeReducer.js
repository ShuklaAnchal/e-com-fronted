import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  attributes: [],
  attribute: null,
  error: [],
  loading: false,
};

export const attributeReducer = createSlice({
  name: "attribute",
  initialState,
  reducers: {
    fetchAttributes: (state, action) => {
      state.attributes = action.payload;
    },

    fetchSingleAttribute: (state, action) => {
      state.attribute = action.payload;
    },

    fetchCategoryAttribute: (state, action) => {
      state.attribute = action.payload;
    },

    fetchSubcategoryAttribute: (state, action) => {
      state.attribute = action.payload;
    },

    createAttribute: (state, action) => {
      state.attributes.push(action.payload);
    },

    updateAttribute: (state, action) => {
      const index = state.attributes.findIndex(
        (item) => item._id === action.payload._id,
      );

      if (index !== -1) {
        state.attributes[index] = action.payload;
      }
    },

    deleteAttribute: (state, action) => {
      state.attributes = state.attributes.filter(
        (item) => item._id !== action.payload,
      );
    },

    iserror: (state, action) => {
      state.error.push(action.payload);
    },
  },
});

// actions

export const {
  fetchAttributes,
  fetchSingleAttribute,
  fetchSubcategoryAttribute,
  fetchCategoryAttribute,
  createAttribute,
  updateAttribute,
  deleteAttribute,
  iserror,
} = attributeReducer.actions;

export default attributeReducer.reducer;
