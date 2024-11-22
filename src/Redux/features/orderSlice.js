import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    messages: [],
    projectDetails: null,
    clientDetails: {},
    replyTo: null,
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages.push(action.payload);
    },
    rollbackMessages: (state, action) => {
      state.messages = state?.messages?.map((prev) =>
        prev?.filter((msg) => msg?.messageText !== action.payload),
      );
    },
    updateMessagesByUser: (state, action) => {
      state.messages = action.payload;
    },
    setProjectDetails: (state, action) => {
      state.projectDetails = action.payload;
    },
    setClientDetails: (state, action) => {
      state.clientDetails = action.payload;
    },
    setReplyTo: (state, action) => {
      state.replyTo = action.payload;
    },
  },
});

export const {
  setMessages,
  setClientDetails,
  setProjectDetails,
  rollbackMessages,
  updateMessagesByUser,
  setReplyTo,
} = orderSlice.actions;

export default orderSlice.reducer;
