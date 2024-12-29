import React, { useMemo, useRef, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdClose } from "react-icons/md";

const ImagesSlider = ({ files, handleClose }) => {
  const imgRef = useRef(null);

  const imageFiles = useMemo(
    () => files?.images?.filter((file) => file?.format?.startsWith("image/")),
    [files],
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

  const handleSingleDownload = (fileUrl, fileName) => {
    fetch(fileUrl, { mode: "no-cors" })
      .then((response) => response.blob()) // Convert response to a Blob
      .then((blob) => {
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob); // Create a URL for the Blob
        link.href = url;
        link.setAttribute("download", fileName); // Set the filename for download
        document.body.appendChild(link);
        link.click(); // Trigger the download
        document.body.removeChild(link); // Clean up after download
        URL.revokeObjectURL(url); // Clean up the object URL
      })
      .catch((error) => {
        console.error("Download failed");
      });
  };

  console.dir(imgRef?.current);

  return (
    <div className="fixed left-0 top-0 z-[9999999999] flex h-screen w-full flex-col items-start justify-center bg-black/50 backdrop-blur">
      <button
        className="absolute right-5 top-5 flex size-8 items-center justify-center rounded-full bg-gray-200 text-2xl text-black"
        onClick={() => handleClose(null)}
      >
        <MdClose />
      </button>
      <div
        onClick={() =>
          handleSingleDownload(
            imageFiles[selectedPosition]?.url,
            imageFiles[selectedPosition]?.name,
          )
        }
        className="mb-2 ml-5 flex w-full cursor-pointer items-center gap-2 break-words pr-20 text-white"
      >
        {imageFiles[selectedPosition]?.name}
        <BiDownload className="shrink-0 text-xl text-primary" />
      </div>
      <img
        src={imageFiles[selectedPosition]?.url}
        alt=""
        className="mx-auto h-[calc(100%_-_60px)] max-w-full object-contain object-center"
        ref={imgRef}
      />
      <div className="absolute left-0 top-1/2 flex w-full items-center justify-between px-5">
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
