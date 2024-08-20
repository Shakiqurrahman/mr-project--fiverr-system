import { createSlice } from "@reduxjs/toolkit";

const passwordVisibilitySlice = createSlice({
    name: "passwordVisibility",
    initialState: {
        showPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
    },
    reducers: {
        toggleShowPassword: (state) => {
            state.showPassword = !state.showPassword;
        },
        toggleShowNewPassword: (state) => {
            state.showNewPassword = !state.showNewPassword;
        },
        toggleShowConfirmPassword: (state) => {
            state.showConfirmPassword = !state.showConfirmPassword;
        },
        clearPasswordVisibility: (state) => {
            state.showPassword = false;
            state.showNewPassword = false;
            state.showConfirmPassword = false;
        }
    },
});

export const {
    toggleShowPassword,
    toggleShowNewPassword,
    toggleShowConfirmPassword,
    clearPasswordVisibility
} = passwordVisibilitySlice.actions;
export default passwordVisibilitySlice.reducer;
