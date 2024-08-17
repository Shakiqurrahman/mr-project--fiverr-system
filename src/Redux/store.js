import { configureStore } from '@reduxjs/toolkit';
import  userSlice from './features/userSlice'; 
import passwordVisibilitySlice from './features/passwordVisibilitySlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        passwordVisibility : passwordVisibilitySlice,
    },
});

export default store;
