import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";
import { updateAComment } from "../../Redux/features/commentsSlice";

const ReplyCommentBox = ({
  comment,
  handleCommentAdd,
  autoFocus,
  setShowCommentReply,
}) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const textAreaRef = useRef(null);
  const commentBox = useRef(null);

  const [commentText, setCommentText] = useState("");
  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  };

  const handleComment = (e) => {
    e.preventDefault();
    if (commentText) {
      const data = {
        ...comment,
        replies: [
          ...comment.replies,
          {
            replyId: shortid.generate(),
            userId: user?.id,
            senderUserName: user?.userName,
            senderImage: user?.userImage,
            replyText: commentText,
            isSubmitted: false,
          },
        ],
      };
      dispatch(updateAComment(data));
      setShowCommentReply(null);
      setCommentText("");
    }
  };

  useEffect(() => {
    if (autoFocus && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [autoFocus]);

  const letterLogo = user?.userName?.trim().charAt(0).toUpperCase();

  // useOutsideClick(commentBox, () => setShowCommentReply(null));
  return (
    <div ref={commentBox} className="my-2 bg-white">
      <div className={`rounded-md border border-primary p-4 duration-300`}>
        <form onSubmit={handleComment} className="w-full space-y-2">
          <div className={`flex items-start gap-2 border-b`}>
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
