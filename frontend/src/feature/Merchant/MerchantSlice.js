import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import MerchantServices from "./MerchantServices";

// const merchant = JSON.parse(localStorage.getItem("merchant"));

const initialState = {
  merchant: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new merchant
export const register = createAsyncThunk(
  "merchants/register",
  async (merchantData, thunkAPI) => {
    try {

      return await MerchantServices.register(merchantData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login merchant
// export const login = createAsyncThunk("merchants/login", async (merchantData, thunkAPI) => {
//   try {
//     return await MerchantServices.login(merchantData);
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });

export const merchantSlice = createSlice({
  name: "merchant",
  initialState,
  reducers: {
    reset: (state) => initialState,
    logout: (state) => {
      state.merchant = null;
      localStorage.removeItem("merchant");
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.merchant = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
    // // Login
    // .addCase(login.pending, (state) => {
    //   state.isLoading = true;
    // })
    // .addCase(login.fulfilled, (state, action) => {
    //   state.isLoading = false;
    //   state.isSuccess = true;
    //   state.merchant = action.payload;
    // })
    // .addCase(login.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.isError = true;
    //   state.message = action.payload;
    // })
  },
});

export const { reset, logout } = merchantSlice.actions;
export default merchantSlice.reducer;
