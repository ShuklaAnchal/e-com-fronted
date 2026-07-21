import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducer/adminReducer"
import categoryReducer from "./reducer/categoryReducer"
import SubcategoryReducer from "./reducer/subcatgeoryReducer";
import productReducer  from "./reducer/productReducer";
import customerReducer from "./reducer/customerReducer";
import orderReducer from "./reducer/orderReducer";
import cartReducer from "./reducer/cartReducer";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    catgeory:categoryReducer,
    subcategory:SubcategoryReducer,
    product:productReducer,
    order:orderReducer,
    cart:cartReducer,
    user:customerReducer
  },
});