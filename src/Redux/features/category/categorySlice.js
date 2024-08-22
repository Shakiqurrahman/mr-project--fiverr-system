import { createSlice } from "@reduxjs/toolkit";
import { deleteCategory, fetchCategory } from "./categoryApi.js";

const categorySlice = createSlice({
  name: "category",
  initialState: { category: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
      // fetching state
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
        state.error = null;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // deleting state
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.category = state.category.filter(
          (category) => category.id === action.payload,
        );
        state.error = null;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
