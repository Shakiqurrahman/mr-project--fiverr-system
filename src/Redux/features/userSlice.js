import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, loading: false },
  reducers: {
    loginStart: (state) => { state.loading = true; },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  }
});

export const { loginStart, loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
