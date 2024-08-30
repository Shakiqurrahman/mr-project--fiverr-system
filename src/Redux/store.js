import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { allUserApiSlice } from "./api/allUserApiSlice";
import { apiSlice } from "./api/apiSlice";
import { uploadDesignApiSlice } from "./api/uploadDesignApiSlice";
import categorySlice from "./features/category/categorySlice";
import passwordVisibilitySlice from "./features/passwordVisibilitySlice";
import userSlice from "./features/userSlice";
import { offerProjectApiSlice } from "./api/offerProjectApiSlice";

const persistConfig = {
  key: "auth",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, userSlice);

const store = configureStore({
  reducer: {
    user: persistedReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [allUserApiSlice.reducerPath]: allUserApiSlice.reducer,
    passwordVisibility: passwordVisibilitySlice,
    category: categorySlice,
    [offerProjectApiSlice.reducerPath]: offerProjectApiSlice.reducer,
    [uploadDesignApiSlice.reducerPath]: uploadDesignApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To allow non-serializable values
    }).concat(
      apiSlice.middleware,
      allUserApiSlice.middleware,
      offerProjectApiSlice.middleware,
      uploadDesignApiSlice.middleware,
    ),
});
export default store;
export const persistor = persistStore(store);
