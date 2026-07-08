import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./reducer/loginReducer"
import categoryReducer from "./reducer/categoryReducer"
import SubcategoryReducer from "./reducer/subcatgeoryReducer";
import productReducer  from "./reducer/productReducer";
import customerReducer from "./reducer/customerReducer";
import orderReducer from "./reducer/orderReducer"

export const store = configureStore({
  reducer: {
    login: loginReducer,
    catgeory:categoryReducer,
    subcategory:SubcategoryReducer,
    product:productReducer,
    customer:customerReducer,
    order:orderReducer
  },
});