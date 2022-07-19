import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductServices from "./ProductServices";

const initialState = {
  products: [],
  singleProduct: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};
// // Create new product
// export const createProduct = createAsyncThunk(
//   "products/create",
//   async (productData, thunkAPI) => {
//     try {
//       // const token = thunkAPI.getState().auth.user.token;
//       return await ProductServices.createVaccine(productData);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// Get user products
export const getProducts = createAsyncThunk("products/getall", async (_, thunkAPI) => {
  try {
    return await ProductServices.getProducts();
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getProduct = createAsyncThunk("products/getById", async (id, thunkAPI) => {
  try {
    return await ProductServices.getProduct(id);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// export const getVaccine = createAsyncThunk("products/:id", async (id, thunkAPI) => {
//   try {
//     return await ProductServices.getVaccine(id);
//   } catch (error) {
//     const message =
//       (error.response && error.response.data && error.response.data.message) ||
//       error.message ||
//       error.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });

// // Delete user vaccine
// export const deleteVaccine = createAsyncThunk(
//   "products/delete",
//   async (id, thunkAPI) => {
//     try {
//       const token = thunkAPI.getState().auth.user.token;
//       return await ProductServices.deleteVaccine(id, token);
//     } catch (error) {
//       const message =
//         (error.response &&
//           error.response.data &&
//           error.response.data.message) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // get single product
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleProduct = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

  },
});

export const { reset } = ProductSlice.actions;
export default ProductSlice.reducer;
