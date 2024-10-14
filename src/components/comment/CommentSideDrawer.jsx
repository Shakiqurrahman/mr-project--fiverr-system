import React from "react";
import { GrFormUp } from "react-icons/gr";
import { MdReply } from "react-icons/md";
import { TfiShiftRight } from "react-icons/tfi";
import logo from "../../assets/images/MR Logo Icon.png";

const CommentSideDrawer = () => {
  const comments = [
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
  ];
  return (
    <div className="h-full w-full bg-white">
      <div className="flex items-center justify-between p-4">
        <h2 className="text-base font-semibold">Comments</h2>
        <TfiShiftRight className="text-xl text-gray-500" />
      </div>
      <div>
        {/* file name  */}
        <div className="border-y bg-lightskyblue px-4 py-2">
          <h3 className="mb-1 line-clamp-1 text-sm font-semibold">
            Cleaning services flyer deisgn 2
          </h3>
          <p className="flex items-center gap-1 text-xs text-gray-500">
            2 COMMENTS <GrFormUp className="text-base" />
          </p>
        </div>

        {/* comments  */}
        <div>
          {comments.map((comment) => (
            <div key={comment.id} className="border-b p-4">
              <div className="flex items-start gap-2">
                <img
                  src={comment?.senderImage}
                  alt={comment?.senderUserName}
                  className="size-6 rounded-full"
                />
                <div className="space-y-2">
                  <p className="text-sm font-bold">{comment?.senderUserName}</p>
                  <p className="text-sm font-medium text-gray-500">
                    {comment?.comment}
                  </p>
                  <button className="flex items-center gap-1 text-sm font-semibold text-gray-500">
                    <MdReply className="text-lg" />
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* write a comment  */}
        <div className="border-b p-4">
          <div className="border border-primary p-4">
            <div className="flex items-start gap-2">
              <img
                src={comments[0]?.senderImage}
                alt={comments[0]?.senderUserName}
                className="size-6 rounded-full"
              />
              <div className="space-y-2">
                <p className="text-sm font-bold">
                  {comments[0]?.senderUserName}
                </p>
                <p className="text-sm font-medium text-gray-500">
                  {comments[0]?.comment}
                </p>
                <button className="flex items-center gap-1 text-sm font-semibold text-gray-500">
                  <MdReply className="text-lg" />
                  Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSideDrawer;
