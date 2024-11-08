import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    messages: [],
    projectDetails: {},
    clientDetails: {},
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages.push(action.payload);
    },
    setProjectDetails: (state, action) => {
      state.projectDetails = action.payload;
    },
    setClientDetails: (state, action) => {
      state.clientDetails = action.payload;
    },
  },
});

export const { setMessages, setClientDetails, setProjectDetails } =
  orderSlice.actions;

export default orderSlice.reducer;
