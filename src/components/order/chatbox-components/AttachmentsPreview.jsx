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
      const link = document.createElement("a");
      link.href = file.url; // Ensure this points to the file's URL
      link.setAttribute("download", file.name); // Set the filename
      document.body.appendChild(link);
      link.click(); // Simulate click to download
      document.body.removeChild(link); // Clean up
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

  console.log(files);

  return (
    <>
      <div className="relative mt-3">
        {files?.length > 3 && (
          <Link
            className="font-medium text-primary"
            onClick={() => handleDownloadAll()}
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
              <a
                href={att?.url}
                download={att?.name}
                target="_blank"
                className="mt-2 flex items-center justify-center text-xs"
              >
                <BiDownload className="shrink-0 text-lg text-primary" />
                <div
                  className="mx-2 line-clamp-1 font-medium"
                  title={att?.name}
                >
                  <GenerateName name={att?.name} />
                </div>
                <span className="shrink-0 text-black/50">
                  ({formatFileSize(att?.size)})
                </span>
              </a>
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
