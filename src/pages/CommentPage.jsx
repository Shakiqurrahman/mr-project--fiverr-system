import React from "react";
import CommentSideDrawer from "../components/comment/CommentSideDrawer";

const CommentPage = () => {
  return (
    <div className="fixed left-0 top-0 z-[999] flex h-screen w-full justify-end bg-black/70">
      <div className="w-[320px]">
        <CommentSideDrawer />
      </div>
    </div>
  );
};

export default CommentPage;
