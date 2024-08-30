import { createSlice } from "@reduxjs/toolkit";
import { offerProjectApiSlice } from "../api/offerProjectApiSlice";

// Slice for managing offerProject state
const offerProjectSlice = createSlice({
  name: "offerProject",
  initialState: {
    offerProject: null,
  },
  reducers: {
    setOfferProject: (state, action) => {
      state.offerProject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      offerProjectApiSlice.endpoints.fetchOfferProject.matchFulfilled,
      (state, action) => {
        state.offerProject = action.payload;
      },
    );
  },
});

export const { setOfferProject } = offerProjectSlice.actions;
export default offerProjectSlice.reducer;
