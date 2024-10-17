import { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { LiaDownloadSolid } from "react-icons/lia";
import ImageMarker from "react-image-marker";
import { useSelector } from "react-redux";
import thumbnail2 from "../../assets/images/project-thumbnail-alt.jpg";
import thumbnail from "../../assets/images/project-thumbnail.jpg";
import formatFileSize from "../../libs/formatFileSize";

const CommentImagePreview = () => {
  const { user } = useSelector((state) => state.user);
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

  const [markers, setMarkers] = useState([]);
  const [selectedImage, setSelectedImage] = useState(images[0]);

  const CustomMarker = () => {
    return (
      <p
        className="size-5 rounded-full bg-primary"
        onClick={() => console.log("clicked")}
      ></p>
    );
  };

  const handleMarkerAdd = (marker) => {
    const id = markers.length + 1;
    const newMarker = { id, ...marker };
    setMarkers([...markers, newMarker]);
  };

  // const handleMarkerDelete = (id) => {
  //   const newMarkers = markers.filter((m) => m.id !== id);
  //   setMarkers(newMarkers);
  // };

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
            <div className="flex size-8 items-center justify-center rounded-full bg-[#ffefef]/80 object-cover text-3xl font-bold text-[#3b3b3b]/50">
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
            <div className="flex size-8 items-center justify-center rounded-full bg-[#ffefef]/80 object-cover text-3xl font-bold text-[#3b3b3b]/50">
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
          markers={markers}
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
