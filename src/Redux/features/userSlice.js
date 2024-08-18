import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: { user: null, loading: false, token: null },
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        setUser(state, action) {
            state.loading = false;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});

export const { loginStart, setUser, logout } = userSlice.actions;
export default userSlice.reducer;
