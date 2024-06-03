import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartReducer";
import orderReducer from "./orderReducer";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    order: orderReducer,
  },
});
export default store;
