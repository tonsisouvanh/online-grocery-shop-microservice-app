import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import RatingServices from "./RatingServices";

const initialState = {
  ratings: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};


// Create new rating
export const createRating = createAsyncThunk(
  "ratings/create",
  async (ratingData, thunkAPI) => {
    try {
      return await RatingServices.createRating(ratingData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);



export const RatingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    resetRating: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ratings = action.payload;
      })
      .addCase(createRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
  },
});

export const { resetRating } = RatingSlice.actions;
export default RatingSlice.reducer;
