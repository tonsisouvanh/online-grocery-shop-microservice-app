import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/User/UserSlice";
import productReducer from "../feature/Product/ProductSlice";
import ratingReducer from "../feature/Rating/RatingSlice";
import merchantReducer from "../feature/Merchant/MerchantSlice";
import cartReducer from "../feature/Cart/CartSlice";
import orderReducer from "../feature/Order/OrderSlice";
const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    rating: ratingReducer,
    merchant: merchantReducer,
    cart: cartReducer,
    order: orderReducer
  },
});
export default store;
