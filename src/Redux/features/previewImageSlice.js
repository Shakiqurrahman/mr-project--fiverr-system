import { createSlice } from "@reduxjs/toolkit";

const previewImageSlice = createSlice({
  name: "previewImage",
  initialState: {
    url: null,
    isOpen: false,
  },
  reducers: {
    setPreviewImage: (state, action) => {
      state.url = action.payload;
      state.isOpen = true;
    },
    closePreviewImage: (state) => {
      state.isOpen = false;
      state.url = null;
    },
  },
});

export const { setPreviewImage, closePreviewImage } = previewImageSlice.actions;

export default previewImageSlice.reducer;
