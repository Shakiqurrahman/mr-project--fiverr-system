import { saveAs } from "file-saver";
import JSZip from "jszip";
import Slider from "react-slick/lib/slider";
import LeftArrowIcon from "../../../assets/images/icons/Left Arrow.svg";
import RightArrowIcon from "../../../assets/images/icons/Right Arrow.svg";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiDownload } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useAcceptDeliveryMutation,
  useAcceptRevisionMutation,
} from "../../../Redux/api/orderApiSlice";
import { setPreviewImage } from "../../../Redux/features/previewImageSlice";
import formatFileSize from "../../../libs/formatFileSize";
import CommentPage from "../../../pages/CommentPage";
import Divider from "../../Divider";

const OrderDeliveryPreview = ({ messageObj, data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { projectDetails, clientDetails } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const isAdmin = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(user?.role);

  const [acceptRevision] = useAcceptRevisionMutation();
  const [acceptDelivery] = useAcceptDeliveryMutation();

  const [openCommentBox, setOpenCommentBox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // handle download all button
  // const handleDownloadAll = (files) => {
  //   files.forEach((file) => {
  //     const link = document.createElement("a");
  //     link.href = file.url; // Ensure this points to the file's URL
  //     link.setAttribute("download", file.name); // Set the filename
  //     link.target = "_blank";
  //     document.body.appendChild(link);
  //     link.click(); // Simulate click to download
  //     document.body.removeChild(link); // Clean up
  //   });
  // };
  const handleDownloadAll = (files) => {
    files.forEach((file) => {
      // Use fetch to download the file as a Blob
      fetch(file.url, { mode: "no-cors" })
        .then((response) => response.blob()) // Convert response to a Blob
        .then((blob) => {
          const link = document.createElement("a");
          const url = URL.createObjectURL(blob); // Create a URL for the Blob
          link.href = url;
          link.setAttribute("download", file.name); // Set the filename for download
          document.body.appendChild(link);
          link.click(); // Trigger the download
          document.body.removeChild(link); // Clean up after download
          URL.revokeObjectURL(url); // Clean up the object URL
        })
        .catch((error) => {
          console.error("Download failed:", error);
        });
    });
  };

  //   handle download all files zip
  const handleDownloadZip = async (files) => {
    const zip = new JSZip();

    // Fetch and add files to the zip
    for (const file of files) {
      const response = await fetch(file?.url, { mode: "no-cors" });
      const blob = await response.blob();
      zip.file(file.name || file.url.split("/").pop(), blob); // Use file.name or fallback to the URL's last segment
    }

    // Generate the zip file
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "files.zip"); // Save the zip file
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "order-slider",
    arrows: true,
    // autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: true,
          // autoplay: true,
          autoplaySpeed: 2000,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          // autoplay: true,
          autoplaySpeed: 2000,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: true,
          // autoplay: true,
          autoplaySpeed: 2000,
          nextArrow: <NextArrow />,
          prevArrow: <PrevArrow />,
        },
      },
    ],
  };

  const handleRevision = async (e) => {
    e.preventDefault();
    if (messageObj?.uniqueId) {
      const { id, ...updatedMessage } = messageObj;
      const data = {
        projectNumber: projectDetails?.projectNumber,
        uniqueId: messageObj?.uniqueId,
        updatedMessage,
      };
      try {
        const res = await acceptRevision(data).unwrap();
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleAccept = async (e) => {
    e.preventDefault();
    if (messageObj?.uniqueId) {
      const { id, ...updatedMessage } = messageObj;
      const data = {
        projectNumber: projectDetails?.projectNumber,
        userId: projectDetails?.userId,
        uniqueId: messageObj?.uniqueId,
        updatedMessage,
      };
      try {
        const res = await acceptDelivery(data).unwrap();
        if (res?.success) {
          const data = {
            projectDetails: res?.data,
            clientDetails,
          };
          navigate(`/feedback`, { state: data });
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleOpenComment = (att) => {
    setOpenCommentBox(true);
    setSelectedImage(att);
  };

  const handlePreviewImage = (e, url) => {
    e.preventDefault();
    dispatch(setPreviewImage(url));
  };

  const foundImages =
    data?.attachments?.filter((file) => file?.format?.startsWith("image/"))
      .length > 0;

  return (
    <>
      <div
        className={`mt-5 flex ${!foundImages ? "flex-wrap-reverse" : "flex-wrap-reverse xl:flex-nowrap"} items-start gap-3`}
      >
        <div
          className={`${!foundImages ? "w-full" : "w-full shrink-0 xl:w-2/3"}`}
        >
          {foundImages && (
            <>
              <h1 className="mb-2 text-lg font-semibold">Preview Image</h1>
              <div>
                <Slider {...settings}>
                  {data?.attachments
                    ?.filter((file) => file?.format?.startsWith("image/"))
                    ?.map((att, index) => (
                      <div key={index} className="w-full">
                        <img
                          onClick={(e) =>
                            handlePreviewImage(
                              e,
                              projectDetails?.projectStatus === "Completed" &&
                                data?.isAccepted
                                ? att?.url
                                : att?.watermark,
                            )
                          }
                          src={
                            projectDetails?.projectStatus === "Completed" &&
                            data?.isAccepted
                              ? att?.url
                              : att?.watermark
                          }
                          alt={att?.name}
                          className="block w-full max-w-full cursor-pointer object-cover"
                        />
                        <div className="mt-4 text-center">
                          <a
                            href={
                              projectDetails?.projectStatus === "Completed" &&
                              data?.isAccepted
                                ? att?.url
                                : att?.watermark
                            }
                            download={att?.name}
                            target="_blank"
                            className="inline-block rounded-[30px] border border-gray-400 px-5 py-2 text-lg font-medium text-black/50"
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    ))}
                </Slider>
              </div>
            </>
          )}
        </div>
        <div
          className={
            foundImages ? "w-full shrink-0 xl:w-1/3" : "w-full shrink-0"
          }
        >
          <h1
            className={`mb-2 ${projectDetails?.projectStatus === "Completed" && data?.isAccepted ? "ms-6" : ""} text-lg font-semibold`}
          >
            Final Files
          </h1>
          <div>
            {data?.thumbnailImage && (
              <>
                <a
                  href={
                    projectDetails?.projectStatus === "Completed" &&
                    data?.isAccepted
                      ? data?.thumbnailImage?.url
                      : undefined
                  }
                  download={
                    projectDetails?.projectStatus === "Completed" &&
                    data?.isAccepted
                      ? data?.thumbnailImage?.name
                      : undefined
                  }
                  className="flex items-start gap-2 text-sm"
                  target="_blank"
                >
                  {projectDetails?.projectStatus === "Completed" &&
                    data?.isAccepted && (
                      <BiDownload className="shrink-0 text-lg text-primary" />
                    )}
                  <p>
                    {data?.thumbnailImage?.name}{" "}
                    <span className="text-black/50">
                      ({formatFileSize(parseInt(data?.thumbnailImage?.size))})
                    </span>
                  </p>
                </a>
                <Divider
                  className={`my-5 ${projectDetails?.projectStatus === "Completed" ? "ms-6" : ""} h-px w-[50px] !bg-black`}
                />
              </>
            )}
            {data?.attachments?.length > 0 &&
              data?.attachments?.map((att, index) => (
                <a
                  key={index}
                  href={
                    projectDetails?.projectStatus === "Completed" &&
                    data?.isAccepted
                      ? att?.url
                      : undefined
                  }
                  download={
                    projectDetails?.projectStatus === "Completed" &&
                    data?.isAccepted
                      ? att?.name
                      : undefined
                  }
                  target="_blank"
                  className="flex items-start gap-2 text-sm"
                >
                  {projectDetails?.projectStatus === "Completed" &&
                    data?.isAccepted && (
                      <BiDownload className="shrink-0 text-lg text-primary" />
                    )}
                  <p className="w-full break-words">
                    {att?.name}{" "}
                    <span className="text-black/50">
                      ({formatFileSize(att?.size)})
                    </span>
                  </p>
                </a>
              ))}
          </div>
        </div>
      </div>
      {!isAdmin &&
        projectDetails?.projectStatus === "Completed" &&
        data?.isAccepted && (
          <div
            className={
              foundImages
                ? "mt-5 flex w-full gap-3 xl:w-2/3"
                : "mt-5 flex w-full gap-3"
            }
          >
            <button
              type="button"
              className="w-1/2 rounded-[30px] bg-primary p-2 text-center font-semibold text-white"
              onClick={() => handleDownloadZip(data?.attachments)}
            >
              Zip Download
            </button>
            <button
              type="button"
              className="w-1/2 rounded-[30px] bg-revision p-2 text-center font-semibold text-white"
              onClick={() => handleDownloadAll(data?.attachments)}
            >
              Individual Download
            </button>
          </div>
        )}
      {!isAdmin &&
        projectDetails?.projectStatus !== "Completed" &&
        projectDetails?.projectStatus !== "Canceled" && (
          <div
            className={
              foundImages
                ? "mt-3 w-full xl:mt-0 xl:w-2/3"
                : "mt-3 w-full xl:mt-0"
            }
          >
            <p>
              {foundImages && !data?.isAccepted && !data?.isRevision
                ? `The watermark will no longer show after accepting the delivery
              file. Please accept your final file first, then download the
              files.`
                : `${
                    !data?.isAccepted && !data?.isRevision
                      ? "To get the files download link please accept your final file first, then download the files."
                      : ""
                  }`}
            </p>
            <div className="my-5 flex justify-center gap-5">
              {projectDetails?.deliveryAttempt !== 2 &&
                !data?.isAccepted &&
                !data?.isRevision && (
                  <button
                    type="button"
                    className="rounded-[30px] bg-primary px-10 py-2 text-center font-semibold text-white"
                    onClick={handleAccept}
                  >
                    Accept
                  </button>
                )}
              {projectDetails?.deliveryAttempt !== 1 && !data?.isRevision && (
                <button
                  type="button"
                  className="rounded-[30px] bg-revision px-10 py-2 text-center font-semibold text-white"
                  onClick={handleRevision}
                >
                  Revision
                </button>
              )}
            </div>
          </div>
        )}
      {openCommentBox && (
        <CommentPage
          selected={selectedImage}
          images={data?.attachments || []}
          close={setOpenCommentBox}
        />
      )}
    </>
  );
};

// Custom arrows design components
function NextArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="slick-arrow absolute right-0 top-[35%] z-[2] flex h-[35px] w-[35px] translate-y-[35%] cursor-pointer items-center justify-center rounded-full border before:content-none"
    >
      <img src={RightArrowIcon} alt="" />
    </div>
  );
}

function PrevArrow({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="slick-arrow absolute left-0 top-[35%] z-[2] flex h-[35px] w-[35px] translate-y-[35%] cursor-pointer items-center justify-center rounded-full border before:content-none"
    >
      <img src={LeftArrowIcon} alt="" />
    </div>
  );
}

export default React.memo(OrderDeliveryPreview);
