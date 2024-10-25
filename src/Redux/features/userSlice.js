import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { removeCookie } from "../../libs/removeCookie";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    token: null,
    onlineUsers: [],
    lastSeen: null,
    typingStatus: "",
    openNotifications: false,
    openNotificationDrawer: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload.token;
    },
    setUser: (state, action) => {
      state.loading = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    },

    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setLastSeen: (state, action) => {
      state.lastSeen = action.payload;
    },

    setTypingStatus: (state, action) => {
      state.typingStatus = action.payload;
    },

    setOpenNotifications: (state, action) => {
      state.openNotifications = action.payload;
    },
    setOpenNotificationDrawer: (state, action) => {
      state.openNotificationDrawer = action.payload;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      storage.removeItem("persist:root");
      localStorage.removeItem("profileData");
      removeCookie("authToken");
    },
  },
});

export const {
  setUser,
  setOnlineUsers,
  setLastSeen,
  setTypingStatus,
  logout,
  setOpenNotifications,
  setOpenNotificationDrawer
} = userSlice.actions;
export default userSlice.reducer;
