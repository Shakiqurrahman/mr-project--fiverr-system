import { createSlice } from "@reduxjs/toolkit";

const utilSlice = createSlice({
  name: "util",
  initialState: {
    openNotifications: false,
    openNotificationDrawer: false,
    searchText: "",
  },
  reducers: {
    setOpenNotifications: (state, action) => {
      state.openNotifications = action.payload;
    },
    setOpenNotificationDrawer: (state, action) => {
      state.openNotificationDrawer = action.payload;
    },
    setSearchText: (state, action) => {
      state.searchText = action.payload;
    },
  },
});

export const {
  setOpenNotifications,
  setOpenNotificationDrawer,
  setSearchText,
} = utilSlice.actions;
export default utilSlice.reducer;
