import { createSlice } from "@reduxjs/toolkit";

// Helper function to safely get items from localStorage (for initial state)
const getCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cartItems");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

const initialState = {
  cartItems: getCartFromLocalStorage(),
  loading: false,
  error: null,
};

export const cartReducerSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    setCartSuccess: (state, action) => {
      state.loading = false;
      state.cartItems = action.payload;
    },
    setCartFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // Useful for local storage immediate update without thunk side-effects
    updateLocalCart: (state, action) => {
      state.cartItems = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("cartItems", JSON.stringify(action.payload));
      }
    },
  },
});

export const {
  setCartRequest,
  setCartSuccess,
  setCartFail,
  updateLocalCart,
} = cartReducerSlice.actions;

export default cartReducerSlice.reducer;
