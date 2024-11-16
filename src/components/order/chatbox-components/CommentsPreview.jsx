import { useState } from "react";
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

  console.log("filteredImages", filteredImages);

  const handleOpenCommentBox = (imgObj) => {
    setOpenCommentBox(true);
    dispatch(setImageDetails(imgObj));
    dispatch(setImageArray(commentedImages));
  };

  return (
    <>
      <div className="mt-3">
        <h1 className="font-medium">
          {filteredImages?.length} Comments added.
        </h1>
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
                View {img?.comments?.length} Comment
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

export default CommentsPreview;
