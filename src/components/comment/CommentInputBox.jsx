import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";

const CommentInputBox = ({
  handleCommentAdd,
  focusWriteComment,
  setFocusWriteComment,
}) => {
  const { user } = useSelector((state) => state.user);

  const commentBox = useRef(null);
  const [commentText, setCommentText] = useState("");
  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText) {
      handleCommentAdd(commentText);
      setCommentText("");
    }
  };

  useOutsideClick(commentBox, () => setFocusWriteComment(false));
  return (
    <div ref={commentBox} className="border-b p-4">
      <div
        className={`rounded-md border ${focusWriteComment && "border-primary"} p-4 duration-300`}
      >
        <form onSubmit={handleComment} className="w-full space-y-2">
          <div
            className={`flex items-start gap-2 ${focusWriteComment && "border-b"}`}
          >
            <img
              src={user?.image}
              alt={user?.image}
              className="h-6 w-6 rounded-full"
            />
            <textarea
              onFocus={() => setFocusWriteComment(true)}
              placeholder="Leave a comment..."
              className={`mb-2 w-full text-base outline-none ${!focusWriteComment && "resize-none"}`}
              rows={focusWriteComment ? 4 : 1}
              onChange={handleCommentTextChange}
              value={commentText}
              name="comment"
              id="comment"
            ></textarea>
          </div>
          {focusWriteComment && (
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setFocusWriteComment(false)}
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
