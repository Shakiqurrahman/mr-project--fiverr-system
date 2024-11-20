import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { affiliateApiSlice } from "./api/affiliateApiSlice";
import { allUserApiSlice } from "./api/allUserApiSlice";
import { analyticsApiSlice } from "./api/analyticsApiSlice";
import { apiSlice } from "./api/apiSlice";
import { dashboardApiSlice } from "./api/dashboardApiSlice";
import { inboxApiSlice } from "./api/inboxApiSlice";
import { multiProjectApiSlice } from "./api/multiProjectApiSlice";
import { offerProjectApiSlice } from "./api/offerProjectApiSlice";
import { orderApiSlice } from "./api/orderApiSlice";
import { reviewApiSlice } from "./api/reviewApiSlice";
import { uploadDesignApiSlice } from "./api/uploadDesignApiSlice";
import cartSlice from "./features/cartSlice";
import categorySlice from "./features/category/categorySlice";
import chatSlice from "./features/chatSlice";
import commentSlice from "./features/commentsSlice";
import dashboardSlice from "./features/dashboardSlice";
import offerProjectSlice from "./features/offerProjectSlice";
import orderSlice from "./features/orderSlice";
import passwordVisibilitySlice from "./features/passwordVisibilitySlice";
import previewImageSlice from "./features/previewImageSlice";
import userSlice from "./features/userSlice";
import utilSlice from "./features/utilSlice";

// Persist configs
const userPersistConfig = {
  key: "auth",
  version: 1,
  storage,
};

const cartPersistConfig = {
  key: "cart",
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

const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);

const persistedOfferProjectReducer = persistReducer(
  offerProjectPersistConfig,
  offerProjectSlice,
);

const store = configureStore({
  reducer: {
    user: persistedUserReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [allUserApiSlice.reducerPath]: allUserApiSlice.reducer,
    cart: persistedCartReducer,
    passwordVisibility: passwordVisibilitySlice,
    category: categorySlice,
    offerProject: persistedOfferProjectReducer,
    [offerProjectApiSlice.reducerPath]: offerProjectApiSlice.reducer,
    [uploadDesignApiSlice.reducerPath]: uploadDesignApiSlice.reducer,
    [multiProjectApiSlice.reducerPath]: multiProjectApiSlice.reducer,
    [inboxApiSlice.reducerPath]: inboxApiSlice.reducer,
    [orderApiSlice.reducerPath]: orderApiSlice.reducer,
    chat: chatSlice,
    comment: commentSlice,
    order: orderSlice,
    previewImage: previewImageSlice,
    dashboard: dashboardSlice,
    utils: utilSlice,
    [dashboardApiSlice.reducerPath]: dashboardApiSlice.reducer,
    [analyticsApiSlice.reducerPath]: analyticsApiSlice.reducer,
    [affiliateApiSlice.reducerPath]: affiliateApiSlice.reducer,
    [reviewApiSlice.reducerPath]: reviewApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // To allow non-serializable values
      immutableCheck: false,
    }).concat(
      apiSlice.middleware,
      allUserApiSlice.middleware,
      offerProjectApiSlice.middleware,
      uploadDesignApiSlice.middleware,
      multiProjectApiSlice.middleware,
      inboxApiSlice.middleware,
      orderApiSlice.middleware,
      dashboardApiSlice.middleware,
      analyticsApiSlice.middleware,
      affiliateApiSlice.middleware,
      reviewApiSlice.middleware,
    ),
});

export default store;
export const persistor = persistStore(store);
