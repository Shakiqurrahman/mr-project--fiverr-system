import React, { useState } from "react";

const EditReplyBox = ({
  reply,
  handleUpdateComment,
  focusWriteComment,
  setFocusWriteComment,
  setShowReplyEdit,
}) => {
  const [commentObj, setCommentObj] = useState(reply || null);

  const handleCommentTextChange = (e) => {
    setCommentObj({
      ...commentObj,
      replies: {
        ...commentObj.replies,
        replyText: e.target.value,
        isSubmitted: false,
      },
    });
  };


  const handleComment = (e) => {
    e.preventDefault();
    handleUpdateComment(commentObj);
    setCommentObj(null);

    setShowReplyEdit(null);
  };

  const handleCancel = () => {
    setFocusWriteComment(false);
    setShowReplyEdit(null);
    setCommentObj(null);
  };
  return (
    <div className="border-b p-4">
      <div
        className={`rounded-md border ${focusWriteComment && "border-primary"} p-4 duration-300`}
      >
        <form onSubmit={handleComment} className="w-full space-y-2">
          <div className="flex items-start gap-2 border-b">
            <img
              src={commentObj?.senderImage}
              alt={commentObj?.senderUserName}
              className="h-6 w-6 rounded-full"
            />
            <textarea
              placeholder="Updated comment..."
              className="mb-2 w-full resize-none text-base outline-none"
              rows={4}
              onChange={handleCommentTextChange}
              value={commentObj?.replies?.replyText}
              name="comment"
              id="comment"
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
                disabled={
                  !commentObj?.comment ||
                  commentObj.comment === reply?.replyText
                }
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
