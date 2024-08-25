import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./features/category/categorySlice";
import passwordVisibilitySlice from "./features/passwordVisibilitySlice";
import userSlice from "./features/userSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    passwordVisibility: passwordVisibilitySlice,
    category: categorySlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false, // To allow non-serializable values
  //   }),
});
export default store;
