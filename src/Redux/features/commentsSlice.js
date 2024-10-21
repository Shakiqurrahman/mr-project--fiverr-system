import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    commentObj: null,
    imageDetails: null,
    highlight: null,
  },
  reducers: {
    setCommentObj: (state, action) => {
      state.commentObj = action.payload;
    },

    setMarkersData: (state, action) => {
      const filteredComments = state.imageDetails.comments.filter(
        (c) => c.commentId,
      );

      state.imageDetails.comments = [...filteredComments, action.payload];
    },

    setImageDetails: (state, action) => {
      state.imageDetails = action.payload;
    },

    cancelComment: (state, action) => {
      if (action.payload) {
        state.imageDetails.comments = state.imageDetails.comments.filter(
          (c) => c.markerId !== action.payload,
        );
      }
      state.commentObj = null;
      state.highlight = null;
    },

    deleteComment: (state, action) => {
      if (action.payload) {
        state.imageDetails.comments = state.imageDetails.comments.filter(
          (c) => c.commentId !== action.payload,
        );
      }
      state.commentObj = null;
    },

    removeEmptyComment: (state, action) => {
      state.imageDetails.comments = state.imageDetails.comments.filter(
        (c) => c.commentId || c.markerId !== action.payload,
      );
    },

    setCommentsData: (state, action) => {
      console.log(action.payload);

      if (action.payload.markerId) {
        state.imageDetails.comments = state.imageDetails.comments.map((c) => {
          if (c.markerId === action.payload.markerId) {
            return action.payload;
          } else {
            return c;
          }
        });
      } else {
        state.imageDetails.comments = [
          ...state.imageDetails.comments,
          action.payload,
        ];
      }
      state.commentObj = null;
    },

    updateAComment: (state, action) => {
      state.imageDetails.comments = state.imageDetails.comments.map((c) => {
        if (c.commentId === action.payload.commentId) {
          return action.payload;
        } else {
          return c;
        }
      });
    },

    setHighlight: (state, action) => {
      state.highlight = action.payload;
    },
  },
});

export const {
  setCommentObj,
  setMarkersData,
  setCommentsData,
  setImageDetails,
  cancelComment,
  deleteComment,
  removeEmptyComment,
  updateAComment,
  setReplyData,
  setHighlight,
} = commentSlice.actions;

export default commentSlice.reducer;
