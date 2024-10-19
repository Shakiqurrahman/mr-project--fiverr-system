import React, { useEffect, useRef, useState } from "react";
import { GrFormUp } from "react-icons/gr";
import { MdEdit, MdReply } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiShiftRight } from "react-icons/tfi";
import { useSelector } from "react-redux";
import CommentInputBox from "./CommentInputBox";
import EditCommentBox from "./EditCommentBox";
import EditReplyBox from "./EditReplyBox";
import ReplyCommentBox from "./ReplyCommentBox";

const CommentSideDrawer = () => {
  const { user } = useSelector((state) => state.user);
  const { commentObj, comments } = useSelector((state) => state.comment);

  console.log(commentObj);

  const [commentCollapse, setCommentCollapse] = useState(false);
  const [focusWriteComment, setFocusWriteComment] = useState(false);
  const [showCommentEdit, setShowCommentEdit] = useState(null);
  const [showReplyEdit, setShowReplyEdit] = useState(null);
  const [showCommentReply, setShowCommentReply] = useState(null);

  // const [comments, setComments] = useState([
  //   {
  //     commentId: 1,
  //     markerId: null,
  //     comment: "Logo Change",
  //     senderUserName: "mahfujurrahm535",
  //     senderImage: logo,
  //     isSubmitted: true,
  //     replies: [
  //       {
  //         id: 1,
  //         replyText: "Okay brother!",
  //         senderUserName: "mahfujurrahm535",
  //         senderImage: logo,
  //         isSubmitted: true,
  //       },
  //     ],
  //   },
  //   {
  //     commentId: 2,
  //     comment: "Image Change",
  //     senderUserName: "mahfujurrahm535",
  //     senderImage: logo,
  //     isSubmitted: true,
  //     replies: [],
  //   },
  // ]);

  // initially changing state for focusing commentbox
  useEffect(() => {
    commentObj && setFocusWriteComment(commentObj.isFocus);
  }, [commentObj]);

  // const handleCommentAdd = (commentText) => {
  //   setComments([
  //     ...comments,
  //     {
  //       commentId: `${comments.length + 1}${commentText}`,
  //       comment: commentText,
  //       senderUserName: user?.userName,
  //       senderImage: user?.image,
  //       isSubmitted: false,
  //       replies: [],
  //     },
  //   ]);
  //   setFocusWriteComment(false);
  // };

  const handleEditComment = (comment, reply) => {
    setShowCommentReply(null);
    setFocusWriteComment(true);

    if (reply) {
      setShowReplyEdit({ ...comment, replies: reply });
    } else {
      setShowCommentEdit(comment);
    }
  };

  // const handleCommentDelete = (commentId, replyId) => {
  //   if (replyId) {
  //     setComments((prevComments) =>
  //       prevComments.map((comment) => {
  //         if (comment.commentId === commentId) {
  //           return {
  //             ...comment,
  //             replies: comment.replies.filter((reply) => reply.id !== replyId),
  //           };
  //         }
  //         return comment;
  //       }),
  //     );
  //   } else {
  //     setComments(comments.filter((c) => c.commentId !== commentId));
  //   }
  // };

  // handle update comment
  // const handleUpdateComment = (commentObj) => {
  //   setComments((prevComments) =>
  //     prevComments.map((c) =>
  //       c.commentId === commentObj.id
  //         ? {
  //             ...c,
  //             comment: commentObj.comment,
  //             isSubmitted: commentObj.isSubmitted,
  //             replies: c.replies.map((reply) =>
  //               reply.id === commentObj.replies.id
  //                 ? {
  //                     ...reply,
  //                     replyText: commentObj.replies.replyText,
  //                     isSubmitted: false,
  //                   }
  //                 : reply,
  //             ),
  //           }
  //         : c,
  //     ),
  //   );
  //   setFocusWriteComment(false);
  //   setShowCommentEdit(null);
  // };

  // Add a reply in comment
  // const handleReplyAdd = (commentId, replyText) => {
  //   setComments(
  //     comments.map((comment) =>
  //       comment.commentId === commentId
  //         ? {
  //             ...comment,
  //             replies: [
  //               ...comment.replies,
  //               {
  //                 commentId: `${comment.replies.length + 1}${replyText}`,
  //                 replyText: replyText,
  //                 senderUserName: user?.userName,
  //                 senderImage: user?.image,
  //                 isSubmitted: false,
  //               },
  //             ],
  //           }
  //         : comment,
  //     ),
  //   );
  //   setShowCommentReply(null);
  // };

  // Check for unsubmitted comments and unsubmitted replies
  const unsubmittedComments = comments?.filter(
    (c) => !c?.isSubmitted && c.commentId,
  )?.length;

  const unsubmittedRepliedComments = comments
    ?.flatMap((c) => c.replies || [])
    ?.filter((r) => !r?.isSubmitted)?.length;

  const totalUnsubmitted = unsubmittedComments + unsubmittedRepliedComments;

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const updatedComments = comments.map((comment) => ({
      ...comment,
      isSubmitted: true,
      replies: comment?.replies?.map((reply) => ({
        ...reply,
        isSubmitted: true,
      })),
    }));
    // setComments(updatedComments);
    console.log("submitted total comments : ", updatedComments);
  };

  // Ref for comment container
  const commentsContainerRef = useRef(null);

  // Scroll to bottom when textarea is focused
  useEffect(() => {
    if (
      (showCommentEdit || focusWriteComment) &&
      commentsContainerRef.current
    ) {
      commentsContainerRef.current.scrollTo({
        top: commentsContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [showCommentEdit, focusWriteComment]);

  console.log("comments", comments);

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
          {comments?.filter((c) => c.commentId)?.length} COMMENTS{" "}
          <GrFormUp
            className={`text-base ${commentCollapse && "rotate-180"} duration-300`}
          />
        </button>
      </div>

      <div ref={commentsContainerRef} className="flex-1 overflow-y-auto">
        {!commentCollapse && (
          <div className="overflow-y-auto">
            {/* comments  */}
            <div>
              {comments
                .filter((c) => c.commentId)
                .map((comment) => (
                  <div key={comment.commentId} className="border-b p-4 pb-2">
                    <div className="flex items-start gap-2">
                      <img
                        src={comment?.senderImage}
                        alt={comment?.senderUserName}
                        className="h-6 w-6 rounded-full"
                      />
                      <div className="w-full space-y-2 overflow-hidden">
                        <div className="group w-full space-y-2 overflow-hidden">
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
                            {comment?.commentText}
                          </p>
                          <div className="flex w-full items-center justify-between gap-1 pb-2">
                            <button
                              onClick={() =>
                                setShowCommentReply(comment.commentId)
                              }
                              type="button"
                              className="flex items-center gap-1 text-sm font-semibold text-gray-400"
                            >
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
                                // onClick={() =>
                                //   handleCommentDelete(comment?.commentId)
                                // }
                                type="button"
                                className="text-lg text-gray-400 duration-300 hover:text-black"
                              >
                                <RiDeleteBin6Line />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Replies */}
                        {comment?.replies?.map((reply) => (
                          <div
                            key={reply.id}
                            className="group border-t pb-2 pt-4"
                          >
                            <div className="flex items-start gap-2">
                              <img
                                src={reply?.senderImage}
                                alt={reply?.senderUserName}
                                className="h-6 w-6 rounded-full"
                              />
                              <div className="w-full space-y-2 overflow-hidden">
                                <div className="flex flex-wrap items-center gap-2">
                                  <p
                                    title={reply?.senderUserName}
                                    className={`${!reply?.isSubmitted && "max-w-[110px]"} truncate text-sm font-bold`}
                                  >
                                    {reply?.senderUserName}
                                  </p>
                                  {!reply?.isSubmitted && (
                                    <p className="rounded-full border px-2 py-1 text-xs font-medium text-gray-500">
                                      Not yet submitted
                                    </p>
                                  )}
                                </div>
                                <p className="text-sm font-medium text-gray-500">
                                  {reply?.replyText}
                                </p>
                                <div className="flex w-full items-center justify-between gap-1">
                                  <button
                                    onClick={() =>
                                      setShowCommentReply(comment.commentId)
                                    }
                                    type="button"
                                    className="flex items-center gap-1 text-sm font-semibold text-gray-400"
                                  >
                                    <MdReply className="text-lg" />
                                    Reply
                                  </button>
                                  <div className="hidden items-center gap-2 duration-300 group-hover:flex">
                                    <button
                                      onClick={() =>
                                        handleEditComment(comment, reply)
                                      }
                                      type="button"
                                      className="text-lg text-gray-400 duration-300 hover:text-black"
                                    >
                                      <MdEdit />
                                    </button>
                                    <button
                                      // onClick={() =>
                                      //   handleCommentDelete(
                                      //     comment?.commentId,
                                      //     reply?.id,
                                      //   )
                                      // }
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
                    </div>
                    {/* Reply input box */}
                    {showCommentReply === comment.commentId && (
                      <div>
                        <ReplyCommentBox
                          comments={comments}
                          setShowCommentReply={setShowCommentReply}
                          autoFocus={true}
                          // handleCommentAdd={(replyText) =>
                          //   handleReplyAdd(comment.commentId, replyText)
                          // }
                        />
                      </div>
                    )}
                  </div>
                ))}
            </div>

            {/* write a comment  */}
            {!showCommentEdit && !showCommentReply && !showReplyEdit && (
              <CommentInputBox
                comments={comments}
                focusWriteComment={focusWriteComment}
                setFocusWriteComment={setFocusWriteComment}
                // handleCommentAdd={handleCommentAdd}
              />
            )}
            {/* edit a comment  */}
            {showCommentEdit && (
              <EditCommentBox
                comment={showCommentEdit}
                focusWriteComment={focusWriteComment}
                setFocusWriteComment={setFocusWriteComment}
                setShowCommentEdit={setShowCommentEdit}
                // handleUpdateComment={handleUpdateComment}
              />
            )}
            {/* edit a reply comment  */}
            {showReplyEdit && (
              <EditReplyBox
                reply={showReplyEdit}
                focusWriteComment={focusWriteComment}
                setFocusWriteComment={setFocusWriteComment}
                setShowReplyEdit={setShowReplyEdit}
                // handleUpdateComment={handleUpdateComment}
              />
            )}
          </div>
        )}
      </div>

      {/* submit button  */}
      <div className="sticky bottom-0 border-t bg-white p-4">
        <button
          onClick={handleCommentSubmit}
          disabled={totalUnsubmitted === 0}
          type="button"
          className="w-full rounded-md bg-primary px-5 py-4 text-sm font-semibold text-white disabled:bg-primary/50"
        >
          Submit {totalUnsubmitted > 0 && totalUnsubmitted} Comments
        </button>
      </div>
    </div>
  );
};

export default CommentSideDrawer;
