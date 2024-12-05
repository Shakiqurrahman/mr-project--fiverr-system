import { useRef } from "react";
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
    <div className="fixed left-0 top-0 z-[9999999] flex h-screen w-full items-center justify-center overflow-clip bg-black/50 p-10 backdrop-blur-sm">
      <img
        src={url}
        alt=""
        className="max-h-full max-w-full object-cover object-center"
        ref={imageRef}
      />
    </div>
  );
};

export default PreviewImage;
