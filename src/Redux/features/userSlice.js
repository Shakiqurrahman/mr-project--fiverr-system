import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { removeCookie } from "../../libs/removeCookie";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    token: null,
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
    logout: (state) => {
      state.user = null;
      state.token = null;
      storage.removeItem("persist:root");
      localStorage.removeItem("profileData");
      removeCookie("authToken");
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;
