import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setImageArray,
  setImageDetails,
} from "../../../Redux/features/commentsSlice";
import CommentPage from "../../../pages/CommentPage";

const CommentsPreview = ({ commentedImages }) => {
  const dispatch = useDispatch();

  const [openCommentBox, setOpenCommentBox] = useState(false);

  const filteredImages = commentedImages?.filter((image) => {
    // Check if any comment in this image has newComment: true
    const hasNewComment = image.comments.some(
      (comment) => comment.newComment === true,
    );

    // Check if any comment has replies with newReply: true
    const hasNewReply = image.comments.some((comment) =>
      comment.replies.some((reply) => reply.newReply === true),
    );

    // Return true if either hasNewComment or hasNewReply is true
    return hasNewComment || hasNewReply;
  });

  const totalNewComments =
    filteredImages
      ?.map((img) => img.comments.filter((c) => c.newComment).length)
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0) +
    filteredImages
      ?.map((img) =>
        img.comments
          .map((c) => c.replies.filter((r) => r.newReply).length)
          .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
      )
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const handleOpenCommentBox = (imgObj) => {
    const image = { ...imgObj, newComment: false };
    setOpenCommentBox(true);
    dispatch(setImageDetails(image));
    dispatch(setImageArray(commentedImages));
  };

  return (
    <>
      <div className="mt-3">
        <h1 className="font-medium">{totalNewComments} Comments added.</h1>
        {filteredImages.map((img, index) => (
          <div key={index} className="mt-3 flex items-start gap-3">
            <img
              src={img.url}
              alt={img.name}
              className="w-[60px] object-contain"
            />
            <div>
              <button
                className="text-sm font-semibold text-primary"
                onClick={() => handleOpenCommentBox(img)}
              >
                View{" "}
                {img?.comments?.filter((c) => c.newComment).length +
                  img?.comments
                    ?.map((c) => c.replies.filter((r) => r.newReply).length)
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0,
                    )}{" "}
                Comment
              </button>
              <p className="text-sm">{img.name}</p>
            </div>
          </div>
        ))}
      </div>
      {openCommentBox && <CommentPage close={setOpenCommentBox} />}
    </>
  );
};

export default React.memo(CommentsPreview);
