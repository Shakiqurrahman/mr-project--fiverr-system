import { IoMdArrowBack } from "react-icons/io";
import { LiaDownloadSolid } from "react-icons/lia";
import { useSelector } from "react-redux";

const CommentImagePreview = () => {
  const multiple = true;
  const { user } = useSelector((state) => state.user);
  return (
    <div className="h-full w-full">
      <div className="flex h-[60px] items-center gap-3 p-4 font-medium text-white">
        <button
          type="buttton"
          className="flex size-8 items-center justify-center rounded-full bg-black"
        >
          <IoMdArrowBack className="text-xl" />
        </button>
        <p>
          Cleaning Services Flyer Design 2.jpg{" "}
          <span className="text-white/50">(2.62 MB)</span>
        </p>
        <button type="button">
          <LiaDownloadSolid className="text-xl text-primary" />
        </button>
        <div className="ms-auto flex gap-2">
          {user?.image ? (
            <img
              className="size-8 rounded-full bg-[rgba(255,255,255,0.20)] object-cover"
              src={user?.image}
              alt="user"
            />
          ) : (
            <div className="flex size-8 items-center justify-center rounded-full bg-[#ffefef]/80 object-cover text-3xl font-bold text-[#3b3b3b]/50">
              {user?.userName}
            </div>
          )}
          {user?.image ? (
            <img
              className="size-8 rounded-full bg-[rgba(255,255,255,0.20)] object-cover"
              src={user?.image}
              alt="user"
            />
          ) : (
            <div className="flex size-8 items-center justify-center rounded-full bg-[#ffefef]/80 object-cover text-3xl font-bold text-[#3b3b3b]/50">
              {user?.userName}
            </div>
          )}
        </div>
      </div>
      <div
        className={`flex ${multiple ? "h-[calc(100%_-_160px)]" : "h-[calc(100%_-_60px)]"} w-full items-center justify-center p-10`}
      >
        <img
          src={user?.image}
          alt=""
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <div className="preview-scroll-overflow-x flex h-[100px] w-full items-center gap-3 p-5">
        <button type="button" className="h-full">
          <img
            src={user?.image}
            alt=""
            className="max-h-full w-full object-contain"
          />
        </button>
        <button type="button" className="h-full">
          <img
            src={user?.image}
            alt=""
            className="max-h-full w-full object-contain"
          />
        </button>
      </div>
    </div>
  );
};

export default CommentImagePreview;
