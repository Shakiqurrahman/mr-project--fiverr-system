import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { configApi } from "../../libs/configApi";

export const fetchCategory = createAsyncThunk("getData/category", async () => {
  try {
    const api = `${configApi.api}category/get`;

    const response = await axios.get(api);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
});

const categorySlice = createSlice({
  name: "category",
  initialState: { category: [], loading: false, error: null },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default categorySlice.reducer;
