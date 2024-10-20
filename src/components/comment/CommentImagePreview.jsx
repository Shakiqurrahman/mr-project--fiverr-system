import { useEffect, useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { LiaDownloadSolid } from "react-icons/lia";
import ImageMarker from "react-image-marker";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";
import thumbnail2 from "../../assets/images/project-thumbnail-alt.jpg";
import thumbnail from "../../assets/images/project-thumbnail.jpg";
import formatFileSize from "../../libs/formatFileSize";
import {
  setCommentObj,
  setHighlight,
  setImageDetails,
  setMarkersData,
} from "../../Redux/features/commentsSlice";

const CommentImagePreview = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { comments, commentObj, highlight } = useSelector(
    (state) => state.comment,
  );
  const filteredComments = comments?.filter((c) => c.top);
  const images = [
    {
      id: 1,
      url: thumbnail,
      name: "Image 1.jpg",
      size: 215463,
    },
    {
      id: 2,
      url: thumbnail2,
      name: "Image 2.jpg",
      size: 2154631,
    },
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  const CustomMarker = ({ markerId }) => {
    return (
      <p
        className={`size-3 cursor-pointer rounded-full border border-white bg-primary ${highlight && highlight === markerId ? "animate-popup opacity-100" : highlight && highlight !== markerId ? "opacity-60" : "opacity-100"}`}
        onClick={() => dispatch(setHighlight(markerId))}
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

  useEffect(() => {
    if (selectedImage) {
      dispatch(setImageDetails(selectedImage));
    }
  }, [selectedImage, dispatch]);

  console.log(comments);

  const multiple = images.length > 1;

  return (
    <div className="h-full w-full">
      <div className="flex h-[60px] items-center gap-3 p-4 font-medium text-white">
        <button
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
        <a href={selectedImage?.url} download={selectedImage?.name}>
          <LiaDownloadSolid className="text-xl text-primary" />
        </a>
        <div className="ms-auto flex gap-2">
          {user?.image ? (
            <img
              className="size-8 rounded-full bg-[rgba(255,255,255,0.20)] object-cover"
              src={user?.image}
              alt="user"
            />
          ) : (
            <div className="flex size-8 items-center justify-center rounded-full bg-[#ffefef]/80 text-3xl font-bold text-[#3b3b3b]/50">
              {user?.userName?.charAt(0)}
            </div>
          )}
          {user?.image ? (
            <img
              className="size-8 rounded-full bg-[rgba(255,255,255,0.20)] object-cover"
              src={user?.image}
              alt="user"
            />
          ) : (
            <div className="flex size-8 items-center justify-center rounded-full bg-[#ffefef]/80 text-3xl font-bold text-[#3b3b3b]/50">
              {user?.userName?.charAt(0)}
            </div>
          )}
        </div>
      </div>
      <div
        className={`flex ${multiple ? "h-[calc(100%_-_160px)]" : "h-[calc(100%_-_60px)]"} w-full items-center justify-center p-10`}
      >
        <ImageMarker
          src={selectedImage?.url} // Replace with your image URL
          markers={filteredComments || []}
          onAddMarker={handleMarkerAdd}
          markerComponent={CustomMarker}
          extraClass="max-h-full max-w-full object-contain"
        />
      </div>
      {multiple && (
        <div className="preview-scroll-overflow-x flex h-[100px] w-full items-center gap-3 p-5">
          {images?.map((img, index) => (
            <button
              key={index}
              type="button"
              className="h-full"
              onClick={() => setSelectedImage(img)}
            >
              <img
                src={img?.url}
                alt={img?.name}
                className="max-h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentImagePreview;
