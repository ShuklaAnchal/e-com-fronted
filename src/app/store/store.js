import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducer/loginReducer"

export const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});