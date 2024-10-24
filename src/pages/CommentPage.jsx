import CommentImagePreview from "../components/comment/CommentImagePreview";
import CommentSideDrawer from "../components/comment/CommentSideDrawer";

const CommentPage = () => {
  return (
    <div className="fixed left-0 top-0 z-[999] flex h-screen w-full flex-wrap overflow-y-auto bg-black/70 md:flex-nowrap">
      <div className="h-auto flex-1 md:h-full">
        <CommentImagePreview />
      </div>
      <div className="w-full md:w-[320px]">
        <CommentSideDrawer />
      </div>
    </div>
  );
};

export default CommentPage;
