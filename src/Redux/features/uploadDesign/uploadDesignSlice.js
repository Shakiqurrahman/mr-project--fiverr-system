import { createSlice } from "@reduxjs/toolkit";
import { fetchGetUpload } from "./uploadDesignApi";

const uploadDesignSlice = createSlice({
    name: "uploadDesign",
    initialState : { uploadDesign: [], loading: false, error: null },
    extraReducers : (builder) => 
        builder
      // fetching state
      .addCase(fetchGetUpload.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGetUpload.fulfilled, (state, action) => {
        state.loading = false;
        state.uploadDesign = action.payload;
        state.error = null;
      })
      .addCase(fetchGetUpload.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

});

export default uploadDesignSlice.reducer;