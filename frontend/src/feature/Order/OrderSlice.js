import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderServices from "./OrderServices";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const getOrders = createAsyncThunk("orders/getall", async (_, thunkAPI) => {
  try {
    return await OrderServices.getOrders();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;
