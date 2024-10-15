import React, { useState } from "react";
import { GrFormUp } from "react-icons/gr";
import { MdEdit, MdReply } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiShiftRight } from "react-icons/tfi";
import { useSelector } from "react-redux";
import logo from "../../assets/images/MR Logo Icon.png";
import CommentInputBox from "./CommentInputBox";
import EditCommentBox from "./EditCommentBox";

const CommentSideDrawer = () => {
  const { user } = useSelector((state) => state.user);

  const [commentCollapse, setCommentCollapse] = useState(false);
  const [focusWriteComment, setFocusWriteComment] = useState(false);
  const [showCommentEdit, setShowCommentEdit] = useState(null);
  const [showCommentReply, setShowCommentReply] = useState(false);
  const [comments, setComments] = useState([
    {
      id: 1,
      comment: "Logo Change",
      senderUserName: "mahfujurrahm535",
      senderImage: logo,
      isSubmitted: true,
    },
    {
      id: 2,
      comment: "Image Change",
      senderUserName: "mahfujurrahm535",
      senderImage: logo,
      isSubmitted: true,
    },
  ]);

  const handleCommentAdd = (commentText) => {
    setComments([
      ...comments,
      {
        id: `${comments.length + 1}${commentText}`,
        comment: commentText,
        senderUserName: user?.userName,
        senderImage: user?.image,
        isSubmitted: false,
      },
    ]);
    setFocusWriteComment(false);
  };

  const handleEditComment = (comment) => {
    setFocusWriteComment(true);
    setShowCommentEdit(comment);
  };

  const handleCommentDelete = (commentId) => {
    setComments(comments.filter((c) => c.id !== commentId));
  };

  const handleUpdateComment = (commentObj) => {
    setComments(
      comments.map((c) =>
        c.id === commentObj.id ? { ...c, comment: commentObj.comment } : c,
      ),
    );
    setFocusWriteComment(false);
    setShowCommentEdit(null);
  };

  // Check for unsubmitted comments
  const unsubmittedComments = comments?.filter((c) => !c?.isSubmitted)?.length;

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const updatedComments = comments.map((comment) => ({
      ...comment,
      isSubmitted: true,
    }));
    setComments(updatedComments);
    console.log("submitted total comments : ", updatedComments);
  };

  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-base font-semibold">Comments</h2>
        <TfiShiftRight className="text-xl text-gray-500" />
      </div>
      {/* file name  */}
      <div className="border-y bg-lightskyblue px-4 py-2">
        <h3
          title="Cleaning services flyer design and so on"
          className="mb-1 line-clamp-1 text-sm font-semibold"
        >
          Cleaning services flyer design...
        </h3>
        <button
          type="button"
          onClick={() => setCommentCollapse(!commentCollapse)}
          className="flex items-center gap-1 text-xs text-gray-500"
        >
          {comments?.length} COMMENTS{" "}
          <GrFormUp
            className={`text-base ${commentCollapse && "rotate-180"} duration-300`}
          />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {!commentCollapse && (
          <div className="overflow-y-auto">
            {/* comments  */}
            <div>
              {comments.map((comment) => (
                <div key={comment.id} className="group border-b p-4">
                  <div className="flex items-start gap-2">
                    <img
                      src={comment?.senderImage}
                      alt={comment?.senderUserName}
                      className="h-6 w-6 rounded-full"
                    />
                    <div className="w-full space-y-2 overflow-hidden">
                      <div className="flex flex-wrap items-center gap-2">
                        <p
                          title={comment?.senderUserName}
                          className={`${!comment?.isSubmitted && "max-w-[110px]"} truncate text-sm font-bold`}
                        >
                          {comment?.senderUserName}
                        </p>
                        {!comment?.isSubmitted && (
                          <p className="rounded-full border px-2 py-1 text-xs font-medium text-gray-500">
                            Not yet submitted
                          </p>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-500">
                        {comment?.comment}
                      </p>
                      <div className="flex w-full items-center justify-between gap-1">
                        <button className="flex items-center gap-1 text-sm font-semibold text-gray-400">
                          <MdReply className="text-lg" />
                          Reply
                        </button>
                        <div className="hidden items-center gap-2 duration-300 group-hover:flex">
                          <button
                            onClick={() => handleEditComment(comment)}
                            type="button"
                            className="text-lg text-gray-400 duration-300 hover:text-black"
                          >
                            <MdEdit />
                          </button>
                          <button
                            onClick={() => handleCommentDelete(comment?.id)}
                            type="button"
                            className="text-lg text-gray-400 duration-300 hover:text-black"
                          >
                            <RiDeleteBin6Line />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* write a comment  */}
            {!showCommentEdit && (
              <CommentInputBox
                comments={comments}
                focusWriteComment={focusWriteComment}
                setFocusWriteComment={setFocusWriteComment}
                handleCommentAdd={handleCommentAdd}
              />
            )}
            {/* edit a comment  */}
            {showCommentEdit && (
              <EditCommentBox
                comment={showCommentEdit}
                focusWriteComment={focusWriteComment}
                setFocusWriteComment={setFocusWriteComment}
                setShowCommentEdit={setShowCommentEdit}
                handleUpdateComment={handleUpdateComment}
              />
            )}
          </div>
        )}
      </div>

      {/* submit button  */}
      <div className="sticky bottom-0 border-t bg-white p-4">
        <button
          onClick={handleCommentSubmit}
          disabled={unsubmittedComments === 0}
          type="button"
          className="w-full rounded-md bg-primary px-5 py-4 text-sm font-semibold text-white disabled:bg-primary/50"
        >
          Submit {unsubmittedComments > 0 && unsubmittedComments} Comments
        </button>
      </div>
    </div>
  );
};

export default CommentSideDrawer;
