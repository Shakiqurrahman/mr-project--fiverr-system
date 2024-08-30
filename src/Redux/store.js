import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { allUserApiSlice } from "./api/allUserApiSlice";
import { apiSlice } from "./api/apiSlice";
import { offerProjectApiSlice } from "./api/offerProjectApiSlice";
import { uploadDesignApiSlice } from "./api/uploadDesignApiSlice";
import categorySlice from "./features/category/categorySlice";
import passwordVisibilitySlice from "./features/passwordVisibilitySlice";
import userSlice from "./features/userSlice";

// Persist config for the "userSlice"
const userPersistConfig = {
  key: "auth",
  version: 1,
  storage,
};

// Persist config for the "offerProjectApiSlice"
// const offerProjectPersistConfig = {
//   key: "offerProject",
//   version: 1,
//   storage,
// };

// Wrap the "userSlice" reducer with persistReducer
const persistedUserReducer = persistReducer(userPersistConfig, userSlice);

// Wrap the "offerProjectApiSlice" reducer with persistReducer
// const persistedOfferProjectReducer = persistReducer(
//   offerProjectPersistConfig,
//   offerProjectApiSlice.reducer,
// );

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [allUserApiSlice.reducerPath]: allUserApiSlice.reducer,
    passwordVisibility: passwordVisibilitySlice,
    category: categorySlice,
    [offerProjectApiSlice.reducerPath]: offerProjectApiSlice.reducer,
    // [offerProjectApiSlice.reducerPath]: persistedOfferProjectReducer,
    [uploadDesignApiSlice.reducerPath]: offerProjectApiSlice.reducer,
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
