import { configureStore } from '@reduxjs/toolkit';
import  userSlice from './features/userSlice'; 
import passwordVisibilitySlice from './features/passwordVisibilitySlice';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
    key: "auth",
    version: 1,
    storage,
  };
  
  const persistedReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
    reducer: {
        user: persistedReducer,
        passwordVisibility : passwordVisibilitySlice,
    },
});
export default store;
export const persistor = persistStore(store);
