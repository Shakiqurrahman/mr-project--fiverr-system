import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";
import {
  cancelComment,
  setCommentsData,
} from "../../Redux/features/commentsSlice";

const CommentInputBox = ({ focusWriteComment, setFocusWriteComment }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { commentObj } = useSelector((state) => state.comment);

  const commentBox = useRef(null);
  const textAreaRef = useRef(null);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (commentObj) {
      textAreaRef.current.focus();
    }
  }, [commentObj]);

  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText) {
      if (commentObj?.markerId) {
        const { isFocus, ...restComment } = commentObj;
        dispatch(
          setCommentsData({
            ...restComment,
            commentId: shortid.generate(),
            isSubmitted: false,
            commentText,
            userId: user?.id,
            senderImage: user?.image,
            senderUserName: user?.userName,
            replies: [],
          }),
        );
      } else {
        console.log("else");
        dispatch(
          setCommentsData({
            commentId: shortid.generate(),
            isSubmitted: false,
            commentText,
            userId: user?.id,
            senderImage: user?.image,
            senderUserName: user?.userName,
            replies: [],
          }),
        );
      }
      setCommentText("");
      setFocusWriteComment(false);
    }
  };

  const handleCancel = () => {
    dispatch(cancelComment(commentObj?.markerId));
    setFocusWriteComment(false);
    setCommentText("");
  };

  const letterLogo = user?.userName?.trim().charAt(0).toUpperCase();

  // useOutsideClick(commentBox, () => setFocusWriteComment(false));
  return (
    <div ref={commentBox} className="sticky bottom-0 border-b bg-white p-4">
      <div
        className={`rounded-md border ${focusWriteComment && "border-primary"} p-4 duration-300`}
      >
        <form onSubmit={handleComment} className="w-full space-y-2">
          <div
            className={`flex items-start gap-2 ${focusWriteComment && "border-b"}`}
          >
            {user?.image ? (
              <img
                src={user?.image}
                alt={user?.image}
                className="h-6 w-6 flex-shrink-0 rounded-full"
              />
            ) : (
              <div className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-[#ffefef]/80 object-cover text-lg font-bold text-[#3b3b3b]/50">
                {letterLogo}
              </div>
            )}
            <textarea
              onFocus={() => setFocusWriteComment(true)}
              placeholder="Leave a comment..."
              className={`mb-2 w-full text-base outline-none ${!focusWriteComment && "resize-none"}`}
              rows={focusWriteComment ? 4 : 1}
              onChange={handleCommentTextChange}
              value={commentText}
              name="comment"
              id="comment"
              ref={textAreaRef}
            ></textarea>
          </div>
          {focusWriteComment && (
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancel}
                type="button"
                className="flex items-center gap-1 text-sm font-semibold text-gray-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!commentText}
                className="flex items-center gap-1 text-sm font-semibold text-primary disabled:text-primary/50"
              >
                Add
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CommentInputBox;
