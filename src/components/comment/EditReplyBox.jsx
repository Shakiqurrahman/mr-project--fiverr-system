import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAComment } from "../../Redux/features/commentsSlice";

const EditReplyBox = ({
  reply,
  handleUpdateComment,
  focusWriteComment,
  setFocusWriteComment,
  setShowReplyEdit,
}) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const textAreaRef = useRef(null);

  const [replyObj, setReplyObj] = useState(reply.reply || null);

  useEffect(() => {
    if (replyObj) {
      textAreaRef?.current?.focus();

      // Set the selection to the end of the current value
      const textArea = textAreaRef?.current;
      const valueLength = textArea?.value?.length;
      textArea.setSelectionRange(valueLength, valueLength);
    }
  }, [replyObj]);

  const handleCommentTextChange = (e) => {
    setReplyObj({
      ...replyObj,
      replyText: e.target.value,
      isSubmitted: false,
      newReply: true,
    });
  };

  const handleComment = (e) => {
    e.preventDefault();
    // handleUpdateComment(replyObj);
    const comment = reply.comment;
    const replies = comment.replies.map((r) => {
      if (r.replyId === replyObj.replyId) {
        return replyObj;
      } else {
        return r;
      }
    });
    const data = {
      ...comment,
      replies,
    };
    dispatch(updateAComment(data));
    setReplyObj(null);
    setShowReplyEdit(null);
    setFocusWriteComment(false);
  };

  const handleCancel = () => {
    setFocusWriteComment(false);
    setShowReplyEdit(null);
    setReplyObj(null);
  };
  return (
    <div className="border-b p-4">
      <div
        className={`rounded-md border ${focusWriteComment && "border-primary"} p-4 duration-300`}
      >
        <form onSubmit={handleComment} className="w-full space-y-2">
          <div className="flex items-start gap-2 border-b">
            {user?.image ? (
              <img
                src={user?.image}
                alt={user?.image}
                className="h-6 w-6 flex-shrink-0 rounded-full"
              />
            ) : (
              <div className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-[#ffefef]/80 object-cover text-lg font-bold text-[#3b3b3b]/50">
                {user?.userName?.trim()?.charAt(0)?.toUpperCase()}
              </div>
            )}
            <textarea
              placeholder="Updated comment..."
              className="mb-2 w-full resize-none text-base outline-none"
              rows={4}
              onChange={handleCommentTextChange}
              value={replyObj?.replyText}
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
                disabled={replyObj?.replyText === reply?.reply?.replyText}
                className="flex items-center gap-1 text-sm font-semibold text-primary disabled:text-primary/50"
              >
                Update
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditReplyBox;
