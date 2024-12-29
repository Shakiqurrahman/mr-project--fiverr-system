import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdClose } from "react-icons/md";

const ImagesSlider = ({ files, handleClose }) => {
  const imageFiles = files?.images?.filter((file) =>
    file?.format?.startsWith("image/"),
  );
  const [selectedPosition, setSelectedPosition] = useState(
    imageFiles?.findIndex((img) => img?.url === files?.selectedImage?.url),
  );

  const handlePrev = (e) => {
    e.preventDefault();
    if (selectedPosition > 0) {
      setSelectedPosition((prev) => prev - 1);
    }
  };
  const handleNext = (e) => {
    e.preventDefault();
    if (imageFiles?.length - 1 > selectedPosition) {
      setSelectedPosition((prev) => prev + 1);
    }
  };

  return (
    <div className="fixed left-0 top-0 z-[9999999999] flex h-screen w-full items-center justify-center bg-black/50 backdrop-blur">
      <button
        className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full bg-gray-200 text-2xl text-black"
        onClick={() => handleClose(null)}
      >
        <MdClose />
      </button>
      <img
        src={imageFiles[selectedPosition]?.url}
        alt=""
        className="h-full max-w-full object-contain object-center"
      />
      <div className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 items-center justify-between px-5">
        <button
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-2xl text-black sm:size-10"
          onClick={handlePrev}
        >
          <IoIosArrowBack />
        </button>
        <button
          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-2xl text-black sm:size-10"
          onClick={handleNext}
        >
          <IoIosArrowForward />
        </button>
      </div>
    </div>
  );
};

export default ImagesSlider;
