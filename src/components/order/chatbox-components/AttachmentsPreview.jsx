import React, { useState } from "react";
import { BiDownload } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  setImageArray,
  setImageDetails,
} from "../../../Redux/features/commentsSlice";
import DownArrow from "../../../assets/images/icons/Down Arrow.svg";
import UpArrow from "../../../assets/images/icons/Upper Arrow.svg";
import formatFileSize from "../../../libs/formatFileSize";
import CommentPage from "../../../pages/CommentPage";
import GenerateName from "../../GenerateName";
import PreviewChatFiles from "../../PreviewChatFiles";

const AttachmentsPreview = ({ files }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [expand, setExpand] = useState(false);

  const [openCommentBox, setOpenCommentBox] = useState(false);

  // handle download all button
  const handleDownloadAll = (downloadFiles) => {
    downloadFiles.forEach((file) => {
      // Use fetch to download the file as a Blob
      fetch(file?.url, { mode: "no-cors" })
        .then((response) => response.blob()) // Convert response to a Blob
        .then((blob) => {
          const link = document.createElement("a");
          const url = URL.createObjectURL(blob); // Create a URL for the Blob
          link.href = url;
          link.setAttribute("download", file?.name); // Set the filename for download
          document.body.appendChild(link);
          link.click(); // Trigger the download
          document.body.removeChild(link); // Clean up after download
          URL.revokeObjectURL(url); // Clean up the object URL
        })
        .catch((error) => {
          console.error("Download failed");
        });
    });
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

  const handleOpenComment = (att) => {
    const getOnlyImages = files.filter((file) =>
      file?.format?.startsWith("image/"),
    );
    setOpenCommentBox(true);
    dispatch(setImageDetails(att));
    dispatch(setImageArray(getOnlyImages));
  };

  return (
    <>
      <div className="relative mt-3">
        {files?.length > 3 && (
          <Link
            className="font-medium text-primary"
            onClick={() => handleDownloadAll(files)}
          >
            Download All
          </Link>
        )}
        <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {files?.map((att, index) => (
            <div key={index}>
              <PreviewChatFiles
                file={att}
                handlePreviewImage={() => handleOpenComment(att)}
              />
              <Link
                onClick={() => handleSingleDownload(att?.url, att?.name)}
                className="mt-2 flex items-center justify-start text-xs"
              >
                <BiDownload className="shrink-0 text-lg text-primary" />
                <div
                  className="mx-2 line-clamp-1 font-medium"
                  title={att?.name}
                >
                  <GenerateName name={att?.name} />
                </div>
                <span className="ml-auto shrink-0 text-black/50">
                  ({formatFileSize(att?.size)})
                </span>
              </Link>
            </div>
          ))}
        </div>
        {files?.length >= 8 &&
          (!expand ? (
            <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-white pb-8 pt-40">
              <button
                className="rounded-full border bg-white"
                onClick={() => setExpand(!expand)}
              >
                <img src={DownArrow} alt="" className="h-[50px] w-[50px]" />
              </button>
            </div>
          ) : (
            <div className="relative z-10 flex justify-center bg-gradient-to-t from-white pb-8 pt-5">
              <button
                className="rounded-full border bg-white"
                onClick={() => setExpand(!expand)}
              >
                <img src={UpArrow} alt="" className="h-[50px] w-[50px]" />
              </button>
            </div>
          ))}
      </div>
      {openCommentBox && <CommentPage close={setOpenCommentBox} />}
    </>
  );
};

export default React.memo(AttachmentsPreview);
