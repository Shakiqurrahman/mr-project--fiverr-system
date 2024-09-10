import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
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
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((d) => d.designId !== action.payload);
      toast.success("Item removed from cart.");
    },
    setCart: (state, action) => {
      state.items = action.payload;
    },
    syncCartWithDesigns: (state, action) => {
      const availableProducts = action.payload;
      state.items = state.items.filter((item) =>
        availableProducts.some((product) => product.designId === item.designId),
      );
    },
  },
});

export const { addToCart, removeFromCart, setCart, syncCartWithDesigns } =
  cartSlice.actions;
export default cartSlice.reducer;
