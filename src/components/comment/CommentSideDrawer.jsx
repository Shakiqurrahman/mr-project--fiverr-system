import React, { useState } from "react";
import { GrFormUp } from "react-icons/gr";
import { MdReply } from "react-icons/md";
import { TfiShiftRight } from "react-icons/tfi";
import logo from "../../assets/images/MR Logo Icon.png";

const CommentSideDrawer = () => {
  const [showWriteComment, setShowWriteComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      comment: "Logo Change",
      senderUserName: "John Doe",
      senderImage: logo,
    },
    {
      id: 2,
      comment: "Image Change",
      senderUserName: "John Doe",
      senderImage: logo,
    },
    {
      id: 3,
      comment: "Image Change",
      senderUserName: "John Doe",
      senderImage: logo,
      isSubmitted: true,
    },
    {
      id: 4,
      comment: "Image Change",
      senderUserName: "John Doe",
      senderImage: logo,
      isSubmitted: true,
    },
  ]);

  const handleCommentTextChange = (e) => {
    setCommentText(e.target.value);
  }

  const handleCommentAdd = (e) => {
    e.preventDefault();
    console.log('comment', commentText);
    
  }

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
        <p className="flex items-center gap-1 text-xs text-gray-500">
          2 COMMENTS <GrFormUp className="text-base" />
        </p>
      </div>
      <div className="flex-1 overflow-y-auto">
        {/* comments  */}
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="border-b p-4">
              <div className="flex items-start gap-2">
                <img
                  src={comment?.senderImage}
                  alt={comment?.senderUserName}
                  className="h-6 w-6 rounded-full"
                />
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <p
                      title={comment?.senderUserName}
                      className="max-w-[110px] truncate text-sm font-bold"
                    >
                      {comment?.senderUserName}
                    </p>
                    {comment?.isSubmitted && (
                      <p className="rounded-full border px-2 py-1 text-xs font-medium text-gray-500">
                        Not yet submitted
                      </p>
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-500">
                    {comment?.comment}
                  </p>
                  <button className="flex items-center gap-1 text-sm font-semibold text-gray-400">
                    <MdReply className="text-lg" />
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* write a comment  */}
        {!showWriteComment && (
          <div className="border-b p-4">
            <div className="rounded-md border border-primary p-4">
              <form  onSubmit={handleCommentAdd} className="w-full space-y-2">
                <div className="flex items-start gap-2 border-b">
                  <img
                    src={comments[0]?.senderImage}
                    alt={comments[0]?.senderUserName}
                    className="h-6 w-6 rounded-full"
                  />
                  <textarea
                    placeholder="Leave a comment..."
                    className="mb-2 w-full text-base outline-none"
                    rows={4}
                    onChange={handleCommentTextChange}
                    value={commentText}
                    name="comment"
                    id="comment"
                  ></textarea>
                </div>
                <div className="flex justify-end gap-4">
                  <button type="button" className="flex items-center gap-1 text-sm font-semibold text-gray-500">
                    Cancel
                  </button>
                  <button type="submit" className="flex items-center gap-1 text-sm font-semibold text-primary">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* submit button  */}
      <div className="sticky bottom-0 border-t bg-white p-4">
        <button
          type="submit"
          className="w-full rounded-md bg-primary px-5 py-4 text-sm font-semibold text-white"
        >
          Submit 2 Comments
        </button>
      </div>
    </div>
  );
};

export default CommentSideDrawer;
