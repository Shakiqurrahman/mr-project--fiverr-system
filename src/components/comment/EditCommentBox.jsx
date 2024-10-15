import React, { useState } from "react";

const EditCommentBox = ({ comment, handleUpdateComment }) => {
  const [commentObj, setCommentObj] = useState(comment || null);

  const handleCommentTextChange = (e) => {
    setCommentObj({ ...commentObj, comment: e.target.value });
  };

  const handleComment = (e) => {
    e.preventDefault();
    console.log(commentObj);

    handleUpdateComment(commentObj);
    setCommentObj(null);
  };
  return (
    <div className="border-b p-4">
      <div className="rounded-md border border-primary p-4">
        <form onSubmit={handleComment} className="w-full space-y-2">
          <div className="flex items-start gap-2 border-b">
            <img
              src={commentObj?.senderImage}
              alt={commentObj?.senderUserName}
              className="h-6 w-6 rounded-full"
            />
            <textarea
              placeholder="Leave a comment..."
              className="mb-2 w-full text-base outline-none"
              rows={4}
              onChange={handleCommentTextChange}
              value={commentObj?.comment}
              name="comment"
              id="comment"
            ></textarea>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="flex items-center gap-1 text-sm font-semibold text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1 text-sm font-semibold text-primary"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCommentBox;
