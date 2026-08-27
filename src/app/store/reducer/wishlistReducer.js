import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: null,
  error: [],
  isAuthenticated: true,
};

export const wishlistReducer = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    fetchWishlist: (state, action) => {
      state.wishlist = action.payload;
      state.isAuthenticated = true;
    },
    createnewWishlist: (state, action) => {
      state.wishlist = action.payload;
      state.isAuthenticated = true;
    },
    editWishlist: (state, action) => {
      state.wishlist = action.payload;
      state.isAuthenticated = true;
    },
    removeWishlist: (state, action) => {
      state.wishlist = action.payload;
      state.isAuthenticated = true;
    },
    iserror: (state, action) => {
      state.error.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createnewWishlist,
  fetchWishlist,
  editWishlist,
  removeWishlist,
  iserror,
} = wishlistReducer.actions;

export default wishlistReducer.reducer;