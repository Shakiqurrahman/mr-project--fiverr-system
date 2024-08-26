import { createSlice } from "@reduxjs/toolkit";

const passwordVisibilitySlice = createSlice({
    name: "passwordVisibility",
    initialState: {
        showOldPassword: false,
        showNewPassword: false,
        showConfirmPassword: false,
    },
    reducers: {
        toggleShowOldPassword: (state) => {
            state.showOldPassword = !state.showOldPassword;
        },
        toggleShowNewPassword: (state) => {
            state.showNewPassword = !state.showNewPassword;
        },
        toggleShowConfirmPassword: (state) => {
            state.showConfirmPassword = !state.showConfirmPassword;
        },
    },
});

export const {
    toggleShowOldPassword,
    toggleShowNewPassword,
    toggleShowConfirmPassword,
} = passwordVisibilitySlice.actions;
export default passwordVisibilitySlice.reducer;
