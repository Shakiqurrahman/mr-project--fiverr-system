import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    commentObj: null,
    comments: [],
  },
  reducers: {
    setCommentObj: (state, action) => {
      state.commentObj = action.payload;
    },
    setMarkersData: (state, action) => {
      const filteredComments = state.comments.filter((c) => c.commentId);

      state.comments = [...filteredComments, action.payload];
    },
    deleteComment: (state, action) => {
      if (action.payload) {
        state.comments = state.comments.filter(
          (c) => c.markerId !== action.payload,
        );
      }
      state.commentObj = null;
    },
    removeEmptyComment: (state, action) => {
      state.comments = state.comments.filter(
        (c) => c.commentId || c.markerId !== action.payload,
      );
    },
    setCommentsData: (state, action) => {
      console.log(action.payload);

      if (action.payload.markerId) {
        state.comments = state.comments.map((c) => {
          if (c.markerId === action.payload.markerId) {
            return action.payload;
          } else {
            return c;
          }
        });
      } else {
        state.comments = [...state.comments, action.payload];
      }
      state.commentObj = null;
    },
  },
});

export const {
  setCommentObj,
  setMarkersData,
  setCommentsData,
  deleteComment,
  removeEmptyComment,
} = commentSlice.actions;

export default commentSlice.reducer;
