import { createSlice } from "@reduxjs/toolkit";

const utilSlice = createSlice({
  name: "util",
  initialState: {
    openNotifications: false,
    openNotificationDrawer: false,
    searchedText: "",
    searchResult: [],
    notificationBubble: 0,
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
    setNotificationBubble: (state, action) => {
      state.notificationBubble = action.payload;
    },
  },
});

export const {
  setOpenNotifications,
  setOpenNotificationDrawer,
  setSearchedText,
  setSearchResult,
  setNotificationBubble,
} = utilSlice.actions;
export default utilSlice.reducer;
