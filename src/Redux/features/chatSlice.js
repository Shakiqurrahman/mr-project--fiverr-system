import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversationUser: null,
    chatData: [],
    unseenCounts: [],
  },
  reducers: {
    setConversationUser: (state, action) => {
      state.conversationUser = action.payload;
    },
    setChatData: (state, action) => {
      state.chatData = action.payload;
    },
    setUnseenCounts: (state, action) => {
      state.unseenCounts = action.payload;
    },
  },
});

export const { setConversationUser, setChatData, setUnseenCounts } =
  chatSlice.actions;

export default chatSlice.reducer;
