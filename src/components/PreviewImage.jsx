import { useRef } from "react";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { closePreviewImage } from "../Redux/features/previewImageSlice";
import useOutsideClick from "../hooks/useOutsideClick";

const PreviewImage = () => {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.previewImage);
  const imageRef = useRef(null);
  const closePreview = () => {
    dispatch(closePreviewImage());
  };
  useOutsideClick(imageRef, closePreview);
  return (
    <div className="fixed left-0 top-0 z-[9999999] flex h-screen w-full items-center justify-center overflow-clip bg-black/50 backdrop-blur-sm">
      <button
        className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full bg-gray-200 text-2xl text-black"
        onClick={closePreview}
      >
        <MdClose />
      </button>
      <img
        src={url}
        alt=""
        className="h-full max-w-full object-contain object-center"
        ref={imageRef}
      />
    </div>
  );
};

export default PreviewImage;
