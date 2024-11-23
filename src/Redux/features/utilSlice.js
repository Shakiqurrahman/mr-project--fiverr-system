import { createSlice } from "@reduxjs/toolkit";

const utilSlice = createSlice({
  name: "util",
  initialState: {
    openNotifications: false,
    openNotificationDrawer: false,
    searchedText: "",
    searchResult: [],
  },
  reducers: {
    setOpenNotifications: (state, action) => {
      state.openNotifications = action.payload;
    },
    setOpenNotificationDrawer: (state, action) => {
      state.openNotificationDrawer = action.payload;
    },
    setSearchedText: (state, action) => {
      state.searchedText = action.payload;
    },
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
  },
});

export const {
  setOpenNotifications,
  setOpenNotificationDrawer,
  setSearchedText,
  setSearchResult,
} = utilSlice.actions;
export default utilSlice.reducer;
