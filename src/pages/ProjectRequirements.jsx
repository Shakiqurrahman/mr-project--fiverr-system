import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { IoMdAttach } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import shortid from "shortid";
import {
  useRequirementByProjectNumberQuery,
  useUpdateRequirementMutation,
} from "../Redux/api/orderApiSlice";
import adobeStock from "../assets//images/Stock Logos/01 Adobe Stock Logo.svg";
import shutterStock from "../assets/images/Stock Logos/01 Shutterstock_logo.svg";
import iStock from "../assets/images/Stock Logos/03 iStock logo.png";
import RF_logo from "../assets/images/Stock Logos/04 123RF_Logo.png";
import Getty from "../assets/images/Stock Logos/05 Getty_Images_Logo.png";
import Dreamstime from "../assets/images/Stock Logos/06 Dreamstime_Logo.png";
import Vectezzy from "../assets/images/Stock Logos/07 Vectezzy logo.png";
import alamy from "../assets/images/Stock Logos/alamy logo.png";
import depositPhotos from "../assets/images/Stock Logos/depositphotos.png";
import CircleProgressBar from "../components/CircleProgressBar";
import Divider from "../components/Divider";
import FilePreview from "../components/FilePreview";
import EmojiPicker from "../components/chat/EmojiPicker";
import { configApi } from "../libs/configApi";
import formatFileSize from "../libs/formatFileSize";

const ProjectRequirements = () => {
  const { projectNumber } = useParams();
  const { data: projectDetails } = useRequirementByProjectNumberQuery({
    projectNumber,
  });
  const [updateRequirementHandler] = useUpdateRequirementMutation();
  const navigate = useNavigate();
  const fileInputsRef = useRef([]);
  const textareasRef = useRef([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [requirements, setRequirements] = useState(null);
  const [uploadFilesLength, setUploadFilesLength] = useState([]);

  //Sidebar Stock Images Data
  const stockImages = [
    {
      url: adobeStock,
      link: "",
    },
    {
      url: shutterStock,
      link: "",
    },
    {
      url: iStock,
      link: "",
    },
    {
      url: RF_logo,
      link: "",
    },
    {
      url: Getty,
      link: "",
    },
    {
      url: depositPhotos,
      link: "",
    },
    {
      url: Vectezzy,
      link: "",
    },
    {
      url: Dreamstime,
      link: "",
    },
    {
      url: alamy,
      link: "",
    },
  ];

  // Initial stage Update requirements state
  useEffect(() => {
    if (projectDetails?.requirements) {
      const updateRequirements = projectDetails?.requirements?.map((item) => ({
        id: shortid.generate(),
        question: item.question,
        answer: "",
        attachments: [],
      }));
      setRequirements(updateRequirements);
    }
  }, [projectDetails?.requirements]);

  //Emoji Picker component handler

  const handleEmojiSelect = (emoji, index, id) => {
    setRequirements((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const textarea = textareasRef.current[index];
          const startPos = textarea.selectionStart;
          const endPos = textarea.selectionEnd;

          // Insert the emoji at the cursor position
          const newText =
            item.answer.substring(0, startPos) +
            emoji +
            item.answer.substring(endPos, item.answer.length);

          const updatedItem = {
            ...item,
            answer: newText,
          };

          // Move the cursor position after the emoji
          setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd =
              startPos + emoji.length;
            textarea.focus();
          }, 0);

          return updatedItem;
        } else {
          return item;
        }
      }),
    );
  };

  //   Updating Each Answer Field
  const handleChangeAnswer = (e, id) => {
    setRequirements((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            answer: e.target.value,
          };
        } else {
          return item;
        }
      }),
    );
  };

  // Image Preview Controllers

  const getImagesWithDimensions = async (files, id) => {
    const handleImageLoad = async (file, index) => {
      // Create FormData and append the file
      const formData = new FormData();
      formData.append("files", file); // Ensure you're appending files correctly

      const uploadUrl = `${configApi.api}upload-attachment`;

      const uploadData = {
        name: file.name,
        size: file.size,
        progress: 0,
        url: null,
        type: file.type,
        format: null,
      };

      // Update state with new file attachments
      setRequirements((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              attachments: item.attachments
                ? [...item.attachments, uploadData]
                : [uploadData],
            };
          } else {
            return item;
          }
        }),
      );

      try {
        const response = await axios.post(uploadUrl, formData, {
          onUploadProgress: (data) => {
            const percentage = Math.round((data.loaded / data.total) * 100);

            // Update progress state
            setRequirements((prev) =>
              prev.map((item) => {
                if (item.id === id) {
                  return {
                    ...item,
                    attachments: item.attachments.map(
                      (attachment, attachmentIndex) => {
                        if (attachmentIndex === index) {
                          return { ...attachment, progress: percentage };
                        }
                        return attachment;
                      },
                    ),
                  };
                }
                return item;
              }),
            );
          },
        });

        // Extract and update image URL and format after successful upload
        const imageUrl = response.data.data.file.url.replaceAll(
          "-watermark-resized",
          "",
        );
        const fileFormat = response.data.data.file.fileType;

        setRequirements((prev) =>
          prev.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                attachments: item.attachments.map(
                  (attachment, attachmentIndex) => {
                    if (attachmentIndex === index) {
                      return {
                        ...attachment,
                        url: imageUrl,
                        progress: 100,
                        format: fileFormat,
                      };
                    }
                    return attachment;
                  },
                ),
              };
            }
            return item;
          }),
        );
      } catch (error) {
        toast.error("Something went wrong!");
      }
    };

    // Process files one by one in sequence
    for (let i = 0; i < files.length; i++) {
      const selectedImages = requirements?.find(
        (req) => req.id === id,
      )?.attachments;
      const index = selectedImages ? selectedImages.length + i : i; // Track index correctly
      await handleImageLoad(files[i], index); // Wait for each file to finish uploading before starting the next
    }
  };

  const handleChangeSelectedImage = (event, id) => {
    const files = Array.from(event.target.files);
    getImagesWithDimensions(files, id);
    setUploadFilesLength([
      ...uploadFilesLength,
      fileInputsRef.current[id].files.length,
    ]);
  };

  const handleImageRemove = (index, id) => {
    setRequirements((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            attachments: item?.attachments?.filter((_, i) => i !== index),
          };
        } else {
          return item;
        }
      }),
    );

    // Reset the file input to allow re-uploading the same file
    fileInputsRef.current[id].value = null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const checkTextLength = requirements.every(
      (item) => item.answer.length <= 5000 && item.answer.length > 0,
    );
    if (checkTextLength) {
      try {
        setSubmitLoading(true);
        const requirementData = {
          orderId: projectDetails?.id,
          isRequirementsFullFilled: true,
          requirements,
        };
        const res = await updateRequirementHandler(requirementData).unwrap();
        if (res?.success) {
          setSubmitLoading(false);
          navigate(`/order/${projectNumber}`);
        }
      } catch {
        setSubmitLoading(false);
      }
    }
  };

  return (
    <div className="max-width my-10">
      <div className="flex flex-wrap items-start gap-5 sm:flex-nowrap lg:gap-10">
        <div className="w-full shrink sm:w-2/3 md:w-3/4 lg:w-4/5">
          <h1 className="text-center text-xl font-bold leading-relaxed">
            Please fill in the answers to the questions below and attach the
            necessary files, so that we can create your design with your own
            information.
          </h1>
          <p className="my-10 text-center font-medium leading-relaxed">
            If you skip this page, you must complete the &quot;Project
            Requirements&quot; page from the Project page. If you do not
            complete the Project Requirements page, your project will not start
            and your project&apos;s timer will not start.
          </p>
          <form
            className="mx-auto max-w-[800px] border bg-lightskyblue"
            onSubmit={handleSubmit}
          >
            <h1 className="tex-lg bg-primary p-4 text-center font-medium text-white sm:text-[22px]">
              Project Requirements
            </h1>
            <div className="px-3">
              {requirements?.map((item, i) => (
                <div key={i} className="mt-6">
                  <label className="mb-3 flex items-start gap-1 px-2 text-sm font-semibold sm:text-base">
                    <span className="text-primary">{i + 1}.</span>{" "}
                    {item.question}
                  </label>
                  <div
                    className={`border bg-white ${item.answer.length > 5000 ? "border-canceled" : "border-solid"}`}
                  >
                    <textarea
                      className="block h-[80px] w-full resize-none p-3 text-sm outline-none sm:h-[100px] sm:text-base"
                      placeholder="Type here"
                      value={item.answer}
                      onChange={(e) => handleChangeAnswer(e, item.id)}
                      required
                      ref={(el) => (textareasRef.current[i] = el)}
                    ></textarea>
                    <div className="flex items-center justify-end gap-3 p-3">
                      <span
                        className={`text-sm font-medium ${item.answer.length > 5000 ? "text-canceled" : "text-black/50"}`}
                      >
                        {item.answer.length}/5,000
                      </span>
                      <EmojiPicker
                        onEmojiSelect={(emoji) =>
                          handleEmojiSelect(emoji, i, item.id)
                        }
                        emojiSize={"text-lg"}
                        style={{ transform: "translateX(-70%)" }}
                      />
                      <Divider className={"h-[20px] w-[2px] !bg-black/20"} />
                      <div>
                        <input
                          type="file"
                          id={i}
                          hidden
                          ref={(el) => (fileInputsRef.current[item.id] = el)}
                          onChange={(e) =>
                            handleChangeSelectedImage(e, item.id)
                          }
                          multiple
                        />
                        <label htmlFor={i} className="cursor-pointer">
                          <IoMdAttach size={20} />
                        </label>
                      </div>
                    </div>
                  </div>
                  {item?.attachments?.length > 0 && (
                    <>
                      {uploadFilesLength[i] !== item?.attachments?.length && (
                        <p className="mt-4 text-xs">
                          Uploaded {item?.attachments?.length}/
                          {uploadFilesLength[i]}
                        </p>
                      )}
                      <div className="preview-scroll-overflow-x mt-4 flex gap-4">
                        {item?.attachments?.map((att, idx) => (
                          <div key={idx} className="w-[120px] shrink-0">
                            <div className="group relative">
                              {att?.url ? (
                                <FilePreview file={att} />
                              ) : (
                                <div className="flex h-[80px] w-full items-center justify-center bg-lightcream">
                                  <CircleProgressBar
                                    precentage={att?.progress}
                                    circleWidth={50}
                                  />
                                </div>
                              )}
                              {(att?.url || att?.progress === 100) && (
                                <button
                                  type="button"
                                  className="absolute right-1 top-1 rounded-full bg-black bg-opacity-50 p-1 text-white"
                                  onClick={() =>
                                    handleImageRemove(idx, item.id)
                                  }
                                >
                                  <RiDeleteBin6Line size={20} />
                                </button>
                              )}
                            </div>
                            <h1
                              className="truncate text-xs font-medium"
                              title={att?.name}
                            >
                              {att?.name}
                            </h1>
                            <span className="text-xs">
                              ({formatFileSize(att?.size)})
                            </span>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
              <div className="flex justify-end">
                <button type="button" className="mt-5 font-semibold">
                  Save Requirements
                </button>
              </div>
              <div className="mt-5 flex justify-center gap-5">
                <button
                  type="button"
                  onClick={() => navigate(`/order/${projectNumber}`)}
                  disabled={submitLoading}
                  className="mt-5 flex h-[45px] w-1/2 items-center justify-center bg-gray-400 text-base font-semibold text-white disabled:cursor-not-allowed sm:text-lg"
                >
                  Skip
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="mt-5 flex h-[45px] w-1/2 items-center justify-center bg-primary text-base font-semibold text-white disabled:cursor-not-allowed sm:text-lg"
                >
                  {submitLoading ? (
                    <span className="animate-spin text-xl">
                      <FaSpinner />
                    </span>
                  ) : (
                    "Start Now"
                  )}
                </button>
              </div>
              <p className="py-6 text-center text-sm sm:text-base">
                Start your project now by clicking &quot;Start Now&quot;
              </p>
            </div>
          </form>
        </div>
        <div className="w-full shrink-0 sm:w-1/3 md:w-1/4 lg:w-1/5">
          <div className="overflow-hidden rounded-lg border border-solid border-primary">
            <p className="bg-primary p-2 text-center text-white">
              We have added links to some stock image sites below. You can
              choose images from any of sites linked below for your design.
            </p>
            <div className="grid grid-cols-2 gap-x-3 p-2 sm:grid-cols-1">
              {stockImages.map((stock, i) => (
                <div
                  key={i}
                  className="mt-3 overflow-hidden rounded-lg border border-solid border-gray-500"
                >
                  <div className="p-2">
                    <img
                      className="h-[100px] w-full object-contain"
                      src={stock.url}
                      alt=""
                    />
                  </div>
                  <Link
                    to={stock.link}
                    className="block w-full bg-gray-500 p-1 text-center text-white"
                  >
                    Click Here
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectRequirements;
