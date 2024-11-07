import { useState } from "react";
import CommentImagePreview from "../components/comment/CommentImagePreview";
import CommentSideDrawer from "../components/comment/CommentSideDrawer";

const CommentPage = ({ selected, images, close }) => {
  const [sideDrawer, setSideDrawer] = useState(true);
  return (
    <div className="fixed left-0 top-0 z-[999] flex h-screen w-full flex-wrap overflow-y-auto bg-black/70 md:flex-nowrap">
      <div className="h-auto flex-1 md:h-full">
        <CommentImagePreview
          imagesArray={images}
          close={close}
          selected={selected}
          drawer={sideDrawer}
          openDrawer={setSideDrawer}
        />
      </div>
      <div className={`w-full ${sideDrawer ? "block" : "hidden"} md:w-[320px]`}>
        <CommentSideDrawer drawerClose={setSideDrawer} />
      </div>
    </div>
  );
};

export default CommentPage;
