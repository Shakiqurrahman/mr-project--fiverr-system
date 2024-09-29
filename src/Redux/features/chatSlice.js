import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversationUser: null,
    chatData: [],
  },
  reducers: {
    setConversationUser: (state, action) => {
      state.conversationUser = action.payload;
    },
    setChatData: (state, action) => {
      state.chatData = action.payload;
    },
  },
});

export const { setConversationUser, setChatData } = chatSlice.actions;

export default chatSlice.reducer;
