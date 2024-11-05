import { configureStore } from "@reduxjs/toolkit";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import storage from "redux-persist/lib/storage";
import { allUserApiSlice } from "./api/allUserApiSlice";
import { apiSlice } from "./api/apiSlice";
import { inboxApiSlice } from "./api/inboxApiSlice";
import { multiProjectApiSlice } from "./api/multiProjectApiSlice";
import { offerProjectApiSlice } from "./api/offerProjectApiSlice";
import { orderApiSlice } from "./api/orderApiSlice";
import { uploadDesignApiSlice } from "./api/uploadDesignApiSlice";
import cartSlice from "./features/cartSlice";
import categorySlice from "./features/category/categorySlice";
import chatSlice from "./features/chatSlice";
import commentSlice from "./features/commentsSlice";
import offerProjectSlice from "./features/offerProjectSlice";
import passwordVisibilitySlice from "./features/passwordVisibilitySlice";
import userSlice from "./features/userSlice";

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

// const inboxApiPersistConfig = {
//   key: 'inboxApi',
//   storage,
//   whitelist: ['queries', 'mutations'],
// };

// Persisted reducers
const persistedUserReducer = persistReducer(userPersistConfig, userSlice);

const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);

const persistedOfferProjectReducer = persistReducer(
  offerProjectPersistConfig,
  offerProjectSlice,
);

// const persistedInboxApiReducer = persistReducer(inboxApiPersistConfig, inboxApiSlice.reducer);

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
    // [inboxApiSlice.reducerPath]: persistedInboxApiReducer,
    chat: chatSlice,
    comment: commentSlice,
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
    ),
});

export default store;
export const persistor = persistStore(store);
