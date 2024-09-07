import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    alreadyAdded: false,
    // totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.designId === action.payload.designId,
      );

      if (existingItem) {
        toast.error("This item is already in your cart.");
      } else {
        state.items.push(action.payload);
        toast.success("Item added to cart!");
      }
      state.alreadyAdded = true;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((d) => d.designId !== action.payload);
      state.alreadyAdded = false;
      toast.success("Item removed from cart.");
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

// Thunk action for toast notifications
export const addToCartWithToast = (item) => (dispatch, getState) => {
  const state = getState().cart;
  const existingItem = state.items.find((i) => i.designId === item.designId);

  if (existingItem) {
    toast.error("This item is already in your cart.");
  } else {
    dispatch(addToCart(item));
    toast.success("Item added to cart!");
  }
};

export const removeFromCartWithToast = (itemId) => (dispatch) => {
  dispatch(removeFromCart(itemId));
  toast.success("Item removed from cart.");
};
