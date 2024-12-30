import React from "react";
import { SlPicture } from "react-icons/sl";

const PreviewChatFiles = ({
  file,
  handlePreviewImage,
  files,
  setSliderData,
}) => {
  const isImage = file?.format?.startsWith("image/");
  const isImages = files?.filter((file) => file?.format?.startsWith("image/"));

  const handleOpenSlider = (e) => {
    e.preventDefault();
    const data = {
      openSlider: true,
      images: isImages,
      selectedImage: file,
    };
    setSliderData(data);
  };

  const renderPreview = () => {
    if (isImages?.length > 0 && isImage) {
      return (
        <img
          src={file.url}
          alt=""
          className="h-[100px] w-full cursor-pointer object-cover sm:h-[150px]"
          onClick={handleOpenSlider}
        />
      );
    } else if (isImage) {
      return (
        <img
          src={file.url}
          alt=""
          className="h-[100px] w-full cursor-pointer object-cover sm:h-[150px]"
          onClick={(e) => handlePreviewImage(e, file?.url)}
        />
      );
    } else {
      return (
        <div className="flex h-[100px] w-full select-none flex-col items-center justify-center bg-gray-300 sm:h-[150px]">
          <SlPicture className="text-xl opacity-50 sm:text-3xl" />
          <p className="font-bold opacity-50">No Preview</p>
        </div>
      );
    }
  };

  return renderPreview();
};

export default React.memo(PreviewChatFiles);
