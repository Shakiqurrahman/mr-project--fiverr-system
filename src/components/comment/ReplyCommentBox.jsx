import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

const ReplyCommentBox = ({
  handleCommentAdd,
  autoFocus,
  setShowCommentReply,
}) => {
  const { user } = useSelector((state) => state.user);

  const textAreaRef = useRef(null);
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

  useEffect(() => {
    if (autoFocus && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [autoFocus]);

  // useOutsideClick(commentBox, () => setShowCommentReply(null));
  return (
    <div ref={commentBox} className="my-2 bg-white">
      <div className={`rounded-md border border-primary p-4 duration-300`}>
        <form onSubmit={handleComment} className="w-full space-y-2">
          <div className={`flex items-start gap-2 border-b`}>
            <img
              src={user?.image}
              alt={user?.image}
              className="h-6 w-6 rounded-full"
            />
            <textarea
              ref={textAreaRef}
              placeholder="Leave a comment..."
              className={`mb-2 w-full text-base outline-none`}
              rows={4}
              onChange={handleCommentTextChange}
              value={commentText}
              name="comment"
              id="comment"
            ></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setShowCommentReply(null)}
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
        </form>
      </div>
    </div>
  );
};

export default ReplyCommentBox;
