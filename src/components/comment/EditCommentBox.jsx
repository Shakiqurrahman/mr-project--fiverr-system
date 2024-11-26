import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateAComment } from "../../Redux/features/commentsSlice";
import useOutsideClick from "../../hooks/useOutsideClick";

const EditCommentBox = ({
  comment,
  handleUpdateComment,
  focusWriteComment,
  setFocusWriteComment,
  setShowCommentEdit,
}) => {
  const dispatch = useDispatch();

  const textAreaRef = useRef(null);
  const editComment = useRef(null);

  const [commentObj, setCommentObj] = useState(comment || null);

  useEffect(() => {
    if (commentObj) {
      textAreaRef.current.focus();

      // Set the selection to the end of the current value
      const textArea = textAreaRef.current;
      const valueLength = textArea.value.length;
      textArea.setSelectionRange(valueLength, valueLength);
    }
  }, [commentObj]);

  const handleCommentTextChange = (e) => {
    setCommentObj({
      ...commentObj,
      commentText: e.target.value,
      isSubmitted: false,
      newComment: true,
    });
  };

  const handleComment = (e) => {
    e.preventDefault();
    // handleUpdateComment(commentObj);
    dispatch(updateAComment(commentObj));
    setCommentObj(null);
    setFocusWriteComment(false);
    setShowCommentEdit(false);
  };

  const handleCancel = () => {
    setFocusWriteComment(false);
    setShowCommentEdit(false);
    setCommentObj(null);
  };

  const handleOff = () => {
    setShowCommentEdit(null);
    setFocusWriteComment(false);
  };

  useOutsideClick(editComment, handleOff);

  return (
    <div className="sticky bottom-0 border-b bg-white p-4" ref={editComment}>
      <div
        className={`rounded-md border ${focusWriteComment && "border-primary"} p-4 duration-300`}
      >
        <form onSubmit={handleComment} className="w-full space-y-2">
          <div className="flex items-start gap-2 border-b">
            {commentObj?.senderImage ? (
              <img
                src={commentObj?.senderImage}
                alt={commentObj?.senderUserName}
                className="h-6 w-6 rounded-full"
              />
            ) : (
              <div className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-[#ffefef]/80 object-cover text-lg font-bold text-[#3b3b3b]/50">
                {commentObj?.senderUserName?.trim()?.charAt(0)?.toUpperCase()}
              </div>
            )}
            <textarea
              placeholder="Updated comment..."
              className="mb-2 w-full resize-none text-base outline-none"
              rows={4}
              onChange={handleCommentTextChange}
              value={commentObj?.commentText}
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
                disabled={
                  !commentObj?.commentText ||
                  commentObj.commentText === comment?.commentText
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

export default EditCommentBox;
