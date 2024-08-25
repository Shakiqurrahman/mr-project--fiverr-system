import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/category/categorySlice";
import passwordVisibilitySlice from "./features/passwordVisibilitySlice";
import userSlice from "./features/userSlice";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";


const persistConfig = {
  key: "auth",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
  reducer: {
    user: persistedReducer,
    passwordVisibility: passwordVisibilitySlice,
    category: categorySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To allow non-serializable values
    }),
});
export default store;
export const persistor = persistStore(store);
