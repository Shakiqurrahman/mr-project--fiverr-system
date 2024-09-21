import { useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

const PreviewImage = ({ url, closePreview }) => {
  const imageRef = useRef(null);
  useOutsideClick(imageRef, closePreview);
  return (
    <div className="fixed left-0 top-0 z-[9999999] flex h-screen w-full items-center justify-center overflow-clip bg-black/50 p-10 backdrop-blur-sm sm:p-20">
      <img
        src={url}
        alt=""
        className="max-h-full w-full max-w-[800px] object-cover object-center"
        ref={imageRef}
      />
    </div>
  );
};

export default PreviewImage;
