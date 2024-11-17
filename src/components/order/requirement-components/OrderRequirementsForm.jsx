import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { IoMdAttach } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import shortid from "shortid";
import { useUpdateRequirementMutation } from "../../../Redux/api/orderApiSlice";
import { configApi } from "../../../libs/configApi";
import formatFileSize from "../../../libs/formatFileSize";
import CircleProgressBar from "../../CircleProgressBar";
import Divider from "../../Divider";
import FilePreview from "../../FilePreview";
import EmojiPicker from "../../chat/EmojiPicker";

const OrderRequirementsForm = () => {
  const { user } = useSelector((state) => state.user);
  const { projectDetails, clientDetails } = useSelector((state) => state.order);
  const [updateRequirementHandler] = useUpdateRequirementMutation();
  // Checking Admin
  const isAdmin = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(user?.role);

  const fileInputRef = useRef(null);
  const textareasRef = useRef([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const [isOrderStartByAdmin, setIsOrderStartByAdmin] = useState(false);
  // Initial stage Update requirements state
  useEffect(() => {
    if (!projectDetails?.isRequirementsFullFilled) {
      const updateRequirements = projectDetails?.requirements?.map((item) => ({
        id: shortid.generate(),
        question: item.question,
        answer: "",
        attachments: [],
      }));
      setRequirements(updateRequirements);
    }
  }, [projectDetails?.isRequirementsFullFilled, projectDetails?.requirements]);

  useEffect(() => {
    if (projectDetails) {
      const allAnswers = projectDetails?.requirements?.every(
        (item) => item?.answer,
      );
      if (!allAnswers && projectDetails?.isRequirementsFullFilled) {
        setIsOrderStartByAdmin(true);
      }
    }
  }, [projectDetails]);

  //Emoji Picker component handler
  const handleEmojiSelect = (emoji, index, id) => {
    setRequirements((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const textarea = textareasRef.current[index];
          const startPos = textarea.selectionStart;
          const endPos = textarea.selectionEnd;

          console.log(textarea.value, id);

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
      console.log("file", file);

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
            console.log(data);
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
        console.error("Error uploading image:", error);
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
    fileInputRef.current.value = null;
  };

  const handleAdminStart = async (e) => {
    e.preventDefault();
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
        setIsOrderStartByAdmin(true);
      }
    } catch {
      console.log("error to save requirements");
      setSubmitLoading(false);
    }
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
        }
      } catch {
        console.log("error to save requirements");
        setSubmitLoading(false);
      }
    }
  };

  return (
    <>
      {!isAdmin && !isOrderStartByAdmin ? (
        <div className="w-full">
          <h1 className="mb-5 text-center text-xl font-bold leading-relaxed">
            Please fill in the answers to the questions below and attach the
            necessary files, so that we can create your design with your own
            information.
          </h1>
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
                          ref={fileInputRef}
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
                  {item.attachments.length > 0 && (
                    <div className="preview-scroll-overflow-x mt-4 flex gap-4">
                      {item.attachments?.map((att, idx) => (
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
                                onClick={() => handleImageRemove(att)}
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
      ) : (
        <>
          {!isOrderStartByAdmin && (
            <div className="text-center">
              <p className="mx-auto mb-5 px-3 font-medium md:w-3/4">
                Your Client{" "}
                <Link
                  to={"/" + clientDetails?.userName}
                  className="font-semibold text-primary"
                >
                  {clientDetails?.userName}
                </Link>{" "}
                Did not completed all the requirement questions that you have
                asked him. Tell him to fill up all the questions or you can
                start the project by clicking this{" "}
                <span className="font-semibold">
                  &quot;Start The Project&quot;
                </span>{" "}
                button.
              </p>
              <button
                onClick={handleAdminStart}
                disabled={submitLoading}
                type="button"
                className="mx-auto mt-5 flex h-[45px] items-center justify-center rounded-[30px] bg-primary p-2 text-base font-semibold text-white disabled:cursor-not-allowed sm:w-1/3 sm:text-lg"
              >
                {submitLoading ? (
                  <span className="animate-spin text-xl">
                    <FaSpinner />
                  </span>
                ) : (
                  "Start The Project"
                )}
              </button>
            </div>
          )}
        </>
      )}
      {isOrderStartByAdmin && (
        <div className="text-lg font-medium">
          This Project Requirements Are Manually Submitted.
        </div>
      )}
    </>
  );
};

export default OrderRequirementsForm;
