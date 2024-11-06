import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages.push(action.payload);
    },
  },
});

export const { setMessages } = orderSlice.actions;

export default orderSlice.reducer;
