import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { allUserApiSlice } from "./api/allUserApiSlice";
import { apiSlice } from "./api/apiSlice";
import { offerProjectApiSlice } from "./api/offerProjectApiSlice";
import { uploadDesignApiSlice } from "./api/uploadDesignApiSlice";
import categorySlice from "./features/category/categorySlice";
import offerProjectSlice from "./features/offerProjectSlice";
import passwordVisibilitySlice from "./features/passwordVisibilitySlice";
import userSlice from "./features/userSlice";

// Persist configs
const userPersistConfig = {
  key: "auth",
  version: 1,
  storage,
};

const offerProjectPersistConfig = {
  key: "offerProject",
  version: 1,
  storage,
};

// Persisted reducers
const persistedUserReducer = persistReducer(userPersistConfig, userSlice);

const persistedOfferProjectReducer = persistReducer(
  offerProjectPersistConfig,
  offerProjectSlice,
);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [allUserApiSlice.reducerPath]: allUserApiSlice.reducer,
    passwordVisibility: passwordVisibilitySlice,
    category: categorySlice,
    offerProject: persistedOfferProjectReducer,
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
