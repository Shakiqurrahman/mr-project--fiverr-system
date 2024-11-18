import React, { useEffect, useRef, useState } from "react";
import { GrFormUp } from "react-icons/gr";
import { MdEdit, MdReply } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiShiftRight } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteComment,
  setHighlight,
  updateAComment,
} from "../../Redux/features/commentsSlice";
import { setMessages } from "../../Redux/features/orderSlice";
import useOutsideClick from "../../hooks/useOutsideClick";
import { configApi } from "../../libs/configApi";
import { connectSocket } from "../../libs/socketService";
import CommentInputBox from "./CommentInputBox";
import EditCommentBox from "./EditCommentBox";
import EditReplyBox from "./EditReplyBox";
import ReplyCommentBox from "./ReplyCommentBox";

const CommentSideDrawer = ({ close, drawerClose }) => {
  const dispatch = useDispatch();
  const commentRef = useRef(null);
  const commentBoxRef = useRef(null);

  const { user, token } = useSelector((state) => state.user);
  const { projectDetails } = useSelector((state) => state.order);
  const {
    images,
    commentObj,
    imageDetails,
    highlight,
    unsubmittedCommentsCount,
  } = useSelector((state) => state.comment);
  const comments = imageDetails?.comments;

  // Checking Admin
  const isAdmin = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(user?.role);

  // Socket Connection
  const socket = connectSocket(`${configApi.socket}`, token);

  const [commentCollapse, setCommentCollapse] = useState(false);
  const [focusWriteComment, setFocusWriteComment] = useState(false);
  const [showCommentEdit, setShowCommentEdit] = useState(null);
  const [showReplyEdit, setShowReplyEdit] = useState(null);
  const [showCommentReply, setShowCommentReply] = useState(null);
  const [replyTo, setReplyTo] = useState(null);

  /* @TODO: api schema
    {
      commentId: 1,
      markerId: null,
      commentText: "Logo Change",
      senderUserName: "mahfujurrahm535",
      senderImage: logo,
      isSubmitted: true,
      replies: [
        {
          id: 1,
          replyText: "Okay brother!",
          senderUserName: "mahfujurrahm535",
          senderImage: logo,
          isSubmitted: true,
        },
      ],
    }
    */

  // initially changing state for focusing commentbox
  useEffect(() => {
    commentObj && setFocusWriteComment(commentObj.isFocus);
  }, [commentObj]);

  const handleEditComment = (comment, reply) => {
    setShowCommentReply(null);
    setFocusWriteComment(true);

    if (reply) {
      setShowReplyEdit({ comment, reply });
    } else {
      setShowCommentEdit(comment);
    }
  };

  const handleCommentDelete = (comment, replyId) => {
    if (replyId) {
      const data = {
        ...comment,
        replies: comment?.replies?.filter((r) => r.replyId !== replyId),
      };
      dispatch(updateAComment(data));
    } else {
      // setComments(comments.filter((c) => c.commentId !== commentId));
      dispatch(deleteComment(comment?.commentId));
    }
  };

  // Check for unsubmitted comments and unsubmitted replies
  const unsubmittedComments = images
    ?.map((image) => {
      return image?.comments?.filter((c) => !c?.isSubmitted && c?.commentId)
        ?.length;
    })
    ?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const unsubmittedRepliedComments = images
    ?.map((image) => {
      return image?.comments
        ?.flatMap((c) => c.replies || [])
        ?.filter((r) => !r?.isSubmitted)?.length;
    })
    ?.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  const totalUnsubmitted = unsubmittedComments + unsubmittedRepliedComments;

  // Setup sending message time and date
  const dates = new Date();
  const timeAndDate = dates.getTime();

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    const updatedComments = images?.map((image) => {
      return {
        ...image,
        comments: image?.comments.map((comment) => ({
          ...comment,
          isSubmitted: true,
          newComment: comment.isSubmitted ? false : true,
          replies: comment?.replies?.map((reply) => ({
            ...reply,
            isSubmitted: true,
            newReply: reply.isSubmitted ? false : true,
          })),
        })),
      };
    });

    const submitForm = {
      messageText: "",
      senderUserName: user?.userName,
      userImage: user?.image,
      attachment: [],
      additionalOffer: null,
      extendDeliveryTime: null,
      deliverProject: null,
      cancelProject: null,
      imageComments: updatedComments || [],
      timeAndDate,
      replyTo,
    };

    if (isAdmin) {
      socket?.emit("order:admin-message", {
        userId: projectDetails?.userId,
        ...submitForm,
      });
    } else {
      socket?.emit("order:user-message", {
        ...submitForm,
      });
    }
    // Optimistically add the message to local state (before API response)
    dispatch(
      setMessages({
        ...submitForm,
        recipientId: isAdmin ? projectDetails?.userId : "",
      }),
    );
    close(false);
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

  const handleOff = () => {
    setShowCommentEdit(null);
    setFocusWriteComment(false);
    setShowCommentReply(false);
  };
  useOutsideClick(commentBoxRef, handleOff);

  return (
    <div className="flex h-full w-full flex-col bg-white" ref={commentBoxRef}>
      <div className="flex items-center justify-between p-4">
        <h2 className="text-base font-semibold">Comments</h2>
        <TfiShiftRight
          className="hidden cursor-pointer text-xl md:block"
          onClick={() => drawerClose(false)}
        />
      </div>
      {/* file name  */}
      <div className="border-y bg-lightskyblue px-4 py-2">
        <h3
          title="Cleaning services flyer design and so on"
          className="mb-1 line-clamp-1 text-sm font-semibold"
        >
          {imageDetails?.name}
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
                ?.filter((c) => c.commentId)
                ?.map((comment) => (
                  <div
                    key={comment.commentId}
                    ref={commentRef}
                    className={`border-b`}
                  >
                    <div
                      onClick={() =>
                        dispatch(
                          setHighlight(
                            highlight && highlight === comment.markerId
                              ? null
                              : comment.markerId,
                          ),
                        )
                      }
                      className={`flex items-start gap-2 p-4 ${highlight && comment.markerId === highlight ? "bg-lightcream" : ""} `}
                    >
                      {comment?.senderImage ? (
                        <img
                          src={comment?.senderImage}
                          alt={comment?.senderUserName}
                          className="h-6 w-6 rounded-full"
                        />
                      ) : (
                        <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-[#ffefef]/80 text-xl font-bold text-[#3b3b3b]/50">
                          {comment?.senderUserName
                            ?.trim()
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>
                      )}
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
                            {comment?.markerId && (
                              <p className="ms-auto size-2 rounded-full bg-revision"></p>
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
                                onClick={() => handleCommentDelete(comment)}
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
                            key={reply.replyId}
                            className="group border-t pb-2 pt-4"
                          >
                            <div className="flex items-start gap-2">
                              {reply?.senderImage ? (
                                <img
                                  src={reply?.senderImage}
                                  alt={reply?.senderUserName}
                                  className="h-6 w-6 rounded-full"
                                />
                              ) : (
                                <div className="flex size-6 flex-shrink-0 items-center justify-center rounded-full bg-[#ffefef]/80 text-lg font-bold text-[#3b3b3b]/50">
                                  {reply?.senderUserName
                                    ?.trim()
                                    ?.charAt(0)
                                    ?.toUpperCase()}
                                </div>
                              )}
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
                                      onClick={() =>
                                        handleCommentDelete(
                                          comment,
                                          reply?.replyId,
                                        )
                                      }
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
                    {showCommentReply === comment?.commentId && (
                      <div className="p-4 pt-2">
                        <ReplyCommentBox
                          setShowCommentReply={setShowCommentReply}
                          comment={comment}
                          autoFocus={true}
                        />
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        )}
        {/* write a comment  */}
        {!showCommentEdit && !showCommentReply && !showReplyEdit && (
          <CommentInputBox
            comments={comments}
            focusWriteComment={focusWriteComment}
            setFocusWriteComment={setFocusWriteComment}
          />
        )}
        {/* edit a comment  */}
        {showCommentEdit && (
          <EditCommentBox
            comment={showCommentEdit}
            focusWriteComment={focusWriteComment}
            setFocusWriteComment={setFocusWriteComment}
            setShowCommentEdit={setShowCommentEdit}
          />
        )}
        {/* edit a reply comment  */}
        {showReplyEdit && (
          <EditReplyBox
            reply={showReplyEdit}
            focusWriteComment={focusWriteComment}
            setFocusWriteComment={setFocusWriteComment}
            setShowReplyEdit={setShowReplyEdit}
          />
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
