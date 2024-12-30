import { useEffect, useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import { LiaDownloadSolid } from "react-icons/lia";
import ImageMarker from "react-image-marker";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";
import {
  setCommentObj,
  setHighlight,
  setImageDetails,
  setMarkersData,
  updateImageArray,
} from "../../Redux/features/commentsSlice";
import formatFileSize from "../../libs/formatFileSize";
import GenerateName from "../GenerateName";

const CommentImagePreview = ({ selected, close, openDrawer, drawer }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { imageDetails, highlight, images } = useSelector(
    (state) => state.comment,
  );
  const comments = imageDetails?.comments;
  const filteredComments = comments?.filter((c) => c.top);
  // const [images, setImages] = useState(imagesArray || []);

  const [selectedImage, setSelectedImage] = useState(imageDetails || {});

  const CustomMarker = ({ markerId }) => {
    return (
      <p
        className={`size-3 cursor-pointer rounded-full border border-white bg-revision ${highlight && highlight === markerId ? "animate-popup opacity-100" : highlight && highlight !== markerId ? "opacity-60" : "opacity-100"}`}
        onClick={() =>
          dispatch(
            setHighlight(highlight && highlight === markerId ? null : markerId),
          )
        }
      ></p>
    );
  };

  const handleMarkerAdd = (marker) => {
    const id = shortid.generate();
    const newMarker = { markerId: id, ...marker, isFocus: true };
    dispatch(setCommentObj(newMarker));
    dispatch(setHighlight(id));
    dispatch(setMarkersData(newMarker));
  };

  const handleSingleDownload = (fileUrl, fileName) => {
    fetch(fileUrl)
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

  useEffect(() => {
    if (selectedImage) {
      dispatch(setImageDetails(selectedImage));
    }
  }, [selectedImage, dispatch]);

  useEffect(() => {
    if (imageDetails) {
      dispatch(updateImageArray(imageDetails));
      // setImages((prev) =>
      //   prev.map((img) => {
      //     if (img.imageId === imageDetails.imageId) {
      //       return imageDetails;
      //     } else {
      //       return img;
      //     }
      //   }),
      // );
    }
  }, [imageDetails, dispatch]);

  const multiple = images.length > 1;

  return (
    <div className="h-full w-full">
      <div className="flex h-[60px] items-center gap-3 p-4 font-medium text-white">
        <button
          onClick={() => close(false)}
          type="buttton"
          className="flex size-8 items-center justify-center rounded-full bg-black"
        >
          <IoMdArrowBack className="text-xl" />
        </button>
        <p className="text-sm sm:text-base">
          {selectedImage?.name}{" "}
          <span className="text-white/50">
            ({formatFileSize(selectedImage?.size)})
          </span>
        </p>
        <button
          onClick={() =>
            handleSingleDownload(selectedImage?.url, selectedImage?.name)
          }
        >
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
            <div className="flex size-8 items-center justify-center rounded-full bg-[#ffefef]/80 text-2xl font-bold text-[#3b3b3b]/50">
              {user?.userName?.charAt(0)?.toUpperCase()}
            </div>
          )}
          {user?.image ? (
            <img
              className="size-8 rounded-full bg-[rgba(255,255,255,0.20)] object-cover"
              src={user?.image}
              alt="user"
            />
          ) : (
            <div className="flex size-8 items-center justify-center rounded-full bg-[#ffefef]/80 text-2xl font-bold text-[#3b3b3b]/50">
              {user?.userName?.charAt(0)?.toUpperCase()}
            </div>
          )}
        </div>
        {!drawer && (
          <FaRegCommentDots
            className="hidden cursor-pointer text-3xl text-gray-300 md:block"
            onClick={() => openDrawer(true)}
          />
        )}
      </div>
      <div
        className={`flex ${multiple ? "h-[calc(100%_-_160px)]" : "h-[calc(100%_-_60px)]"} w-full items-center justify-center p-10`}
      >
        <ImageMarker
          src={selectedImage?.url} // Replace with your image URL
          markers={filteredComments || []}
          onAddMarker={handleMarkerAdd}
          markerComponent={CustomMarker}
          extraClass={`${multiple ? "max-h-[calc(100vh_-_240px)]" : "max-h-[calc(100vh_-_140px)]"} max-w-full object-contain`}
        />
      </div>
      {multiple && (
        <div className="preview-scroll-overflow-x flex h-[100px] w-full items-center gap-3 p-5">
          {images?.map((img, index) => (
            <button
              key={index}
              type="button"
              className="flex h-full w-[80px] flex-col items-center gap-1"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img?.url}
                alt={img?.name}
                className={`h-2/3 object-contain opacity-50 ${img.imageId === selectedImage.imageId && "scale-105 !opacity-100"}`}
              />
              <h1 className="line-clamp-1 text-xs text-white">
                <GenerateName name={img?.name} />
              </h1>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentImagePreview;
