import { useEffect, useMemo, useRef, useState } from "react";
import { FaSpinner } from "react-icons/fa6";
import { IoMdAttach } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import formatFileSize from "../../../libs/formatFileSize";
import Divider from "../../Divider";
import EmojiPicker from "../../chat/EmojiPicker";

const OrderRequirementsForm = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const textareasRef = useRef([]);
  const [submitLoading, setSubmitLoading] = useState(false);
  const requirementsData = useMemo(
    () => [
      "Which industry do you work in?",
      "Do you have your own/Industry logo?",
      "Do you have your own/Industry website?",
      "Do you have your specific design size?",
      "Do you have any imaginary or specific design ideas?",
      "You have to give clear information that you need in the design. (E.g. all texts, all photos, logo, contact info, etc.)",
    ],
    [],
  );
  const [requirements, setRequirements] = useState(null);
  // Initial stage Update requirements state
  useEffect(() => {
    if (requirementsData) {
      const updateRequirements = requirementsData.map((item, i) => ({
        id: i + 1,
        question: item,
        answer: "",
        attachments: [],
      }));
      setRequirements(updateRequirements);
    }
  }, [requirementsData]);

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
  const getImagesWithDimensions = (files, id) => {
    const images = [];

    const handleImageLoad = (file) => {
      images.push({
        file: file,
        url: URL.createObjectURL(file),
      });
      if (images.length === files.length) {
        setRequirements((prev) =>
          prev.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                attachments: item?.attachments
                  ? [...item.attachments, ...images]
                  : images,
              };
            } else {
              return item;
            }
          }),
        );
      }
    };

    for (let i = 0; i < files.length; i++) {
      handleImageLoad(files[i]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkTextLength = requirements.every(
      (item) => item.answer.length <= 5000,
    );
    console.log(checkTextLength, requirements);
  };

  return (
    <div className="w-full">
      <h1 className="text-center text-xl font-bold leading-relaxed">
        Please fill in the answers to the questions below and attach the
        necessary files, so that we can create your design with your own
        information.
      </h1>
      <p className="my-10 text-center font-medium leading-relaxed">
        If you skip this page, you must complete the &quot;Project
        Requirements&quot; page from the Project page. If you do not complete
        the Project Requirements page, your project will not start and your
        project&apos;s timer will not start.
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
                <span className="text-primary">{i + 1}.</span> {item.question}
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
                      onChange={(e) => handleChangeSelectedImage(e, item.id)}
                      multiple
                    />
                    <label htmlFor={i}>
                      <IoMdAttach size={20} />
                    </label>
                  </div>
                </div>
              </div>
              {item.attachments.length > 0 && (
                <div className="preview-scroll-overflow-x mt-4 flex gap-4">
                  {item.attachments?.map((att, idx) => (
                    <div key={idx} className="w-[120px] shrink-0">
                      <div className="relative">
                        <img
                          className={`h-[80px] w-full object-contain`}
                          src={att.url}
                        />
                        <button
                          type="button"
                          className="absolute right-1 top-1 rounded-full bg-black bg-opacity-50 p-1 text-white"
                          onClick={() => handleImageRemove(idx, item.id)}
                        >
                          <RiDeleteBin6Line size={15} />
                        </button>
                      </div>
                      <h1
                        className="truncate text-xs font-medium"
                        title={att.file.name}
                      >
                        {att.file.name}
                      </h1>
                      <span className="text-xs">
                        ({formatFileSize(att.file.size)})
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
            {user?.role === "USER" ? (
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
            ) : (
              <button
                type="button"
                disabled={submitLoading}
                className="mt-5 flex h-[45px] w-1/2 items-center justify-center bg-primary text-base font-semibold text-white disabled:cursor-not-allowed sm:text-lg"
              >
                {submitLoading ? (
                  <span className="animate-spin text-xl">
                    <FaSpinner />
                  </span>
                ) : (
                  "Start The Project"
                )}
              </button>
            )}
          </div>
          <p className="py-6 text-center text-sm sm:text-base">
            {user?.role === "USER"
              ? `Start your project now by clicking "Start Now"`
              : `Start your project now by clicking "Start The Project"`}
          </p>
        </div>
      </form>
    </div>
  );
};

export default OrderRequirementsForm;
