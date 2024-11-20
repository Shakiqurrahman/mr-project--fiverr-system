import { createSlice } from "@reduxjs/toolkit";

const utilSlice = createSlice({
  name: "util",
  initialState: {
    openNotifications: false,
    openNotificationDrawer: false,
  },
  reducers: {
    setOpenNotifications: (state, action) => {
      state.openNotifications = action.payload;
    },
    setOpenNotificationDrawer: (state, action) => {
      state.openNotificationDrawer = action.payload;
    },
  },
});

export const { setOpenNotifications, setOpenNotificationDrawer } =
  utilSlice.actions;
export default utilSlice.reducer;
