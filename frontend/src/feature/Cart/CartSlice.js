import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CartServices from "./CartServices";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  cart: [],
  total: 0,
  qty: 0,

  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new user
// export const addCart = createAsyncThunk(
//   "users/register",
//   async (userData, thunkAPI) => {
//     try {

//       return await CartServices.register(userData);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       console.log(message);
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// // Login user
// export const removeCart = createAsyncThunk("users/login", async (user, thunkAPI) => {
//   try {
//     return await CartServices.login(user);
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: (state) => initialState,
    addCart: (state, action) => {
      state.cart = [...state.cart, action.payload]
      state.qty += 1;
      state.total += action.payload.price;
    },
    addCartWithQty: (state, action) => {
      state.qty = state.qty + parseInt(action.payload.productQty);
      state.total = state.total + parseInt(action.payload.productQty) * action.payload.price;
      // state.qty = state.qty + action.payload.productQty;

      state.cart = state.cart.map((obj) => {
        if (obj._id === action.payload._id) {

          const qtycpy = obj.qty;
          return { ...obj, qty: qtycpy + parseInt(action.payload.productQty) }
          // return { ...obj, qty: qtycpy + action.payload.productQty }
        }
        return obj;
      })
    },
    removeCart: (state, action) => {
      const index = state.cart.findIndex(item => item._id === action.payload._id);

      const deletedProduct = state.cart[index]

      state.cart.splice(index, 1);
      state.qty -= deletedProduct.qty;
      state.total -= action.payload.price * deletedProduct.qty;
    },
    // clearCart: (state) => initialState,
  },
  // extraReducers: (builder) => {
  //   builder
  //     // Register
  //     .addCase(register.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(register.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.isSuccess = true;
  //       state.user = action.payload;
  //     })
  //     .addCase(register.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.isError = true;
  //       state.message = action.payload;
  //     })
  //     // Login
  //     .addCase(login.pending, (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(login.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.isSuccess = true;
  //       state.user = action.payload;
  //     })
  //     .addCase(login.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.isError = true;
  //       state.message = action.payload;
  //     })
  // },
});

export const { reset, addCart, removeCart, addCartWithQty } = cartSlice.actions;
export default cartSlice.reducer;
