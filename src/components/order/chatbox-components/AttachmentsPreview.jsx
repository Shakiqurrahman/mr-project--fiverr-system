import { useState } from "react";
import { BiDownload } from "react-icons/bi";
import { Link } from "react-router-dom";
import DownArrow from "../../../assets/images/icons/Down Arrow.svg";
import UpArrow from "../../../assets/images/icons/Upper Arrow.svg";
import thumbnail from "../../../assets/images/project-thumbnail.jpg";
import formatFileSize from "../../../libs/formatFileSize";

const AttachmentsPreview = () => {
  const [expand, setExpand] = useState(false);

  // handle download all button
  const handleDownloadAll = (files) => {
    files.forEach((file) => {
      const link = document.createElement("a");
      link.href = file.url; // Ensure this points to the file's URL
      link.setAttribute("download", file.name); // Set the filename
      document.body.appendChild(link);
      link.click(); // Simulate click to download
      document.body.removeChild(link); // Clean up
    });
  };

  return (
    <div className="relative mt-3">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].length > 3 && (
        <Link
          className="font-medium text-primary"
          onClick={() => handleDownloadAll()}
        >
          Download All
        </Link>
      )}
      <div className="mt-3 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((att, index) => (
          <div key={index}>
            <img
              src={thumbnail}
              alt=""
              className="h-[100px] w-full object-cover sm:h-[150px]"
            />
            <a
              href={thumbnail}
              download={"Thumbnail.jpg"}
              className="mt-2 flex items-center justify-center text-xs"
            >
              <BiDownload className="shrink-0 text-lg text-primary" />
              <p className="mx-2 line-clamp-1 font-medium" /*title={att.name}*/>
                Image name 0123456789.JPG
              </p>
              <span className="shrink-0 text-black/50">
                ({formatFileSize(22165655)})
              </span>
            </a>
          </div>
        ))}
      </div>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].length >= 6 &&
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
  );
};

export default AttachmentsPreview;
