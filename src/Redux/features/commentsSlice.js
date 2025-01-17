import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    images: [],
    commentObj: null,
    imageDetails: null,
    highlight: null,
    unsubmittedCommentsCount: 0,
  },
  reducers: {
    setImageArray: (state, action) => {
      const images = action.payload.map((image) => ({
        ...image,
        comments: image.comments.map((comment) => ({
          ...comment,
          newComment: false,
          replies: comment.replies.map((reply) => ({
            ...reply,
            newReply: false,
          })),
        })),
      }));
      state.images = images;
    },

    updateImageArray: (state, action) => {
      const imageDetails = action.payload;
      state.images = state.images.map((img) => {
        if (img.imageId === imageDetails.imageId) {
          return imageDetails;
        } else {
          return img;
        }
      });
    },

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
      const details = state.imageDetails;
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
  setImageArray,
  updateImageArray,
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
  setUnsubmittedCommentsCount,
} = commentSlice.actions;

export default commentSlice.reducer;
