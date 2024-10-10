import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoMdAttach,
  IoMdClose,
} from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useLocalStorageObject } from "../../hooks/useLocalStorageObject";
import useOutsideClick from "../../hooks/useOutsideClick";
import formatFileSize from "../../libs/formatFileSize";
import {
  useDeleteQuickResMsgMutation,
  useFetchQuickResMsgQuery,
} from "../../Redux/api/inboxApiSlice";
import AddQuickMsgModal from "../chat/AddQuickMsgModal";
import EditQuickMsgModal from "../chat/EditQuickMsgModal";
import Divider from "../Divider";

const OrderDeliveryForm = ({ handleClose }) => {
  // All reference states here
  const textareaRef = useRef(null);
  const menuRef = useRef(null);
  const sourceInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);

  // Redux query imports here
  const { data: quickMsgs } = useFetchQuickResMsgQuery();
  const [deleteQuickResMsg] = useDeleteQuickResMsgMutation();

  //   all states here
  const [textValue, setTextValue] = useState("");
  const [qucikMsgBtnController, setQucikMsgBtnController] = useState(null);
  const [openEditMsgModal, setOpenEditMsgModal] = useState(null);
  const [openAddMsgModal, setOpenAddMsgModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [thumbnailImage, setThumbnailImage] = useState(null);

  // localStorage state
  const [{ quickResponse }, updateItem] = useLocalStorageObject("utils", {
    quickResponse: false,
  });
  const [deliveryDraft] = useLocalStorageObject("deliveryDraft", {
    messageText: textValue,
    attachments: selectedImages,
    thumbnailImage,
  });

  //   all side effects here
  useEffect(() => {
    if (deliveryDraft) {
      setTextValue(deliveryDraft?.messageText);
      setSelectedImages(deliveryDraft?.attachments);
      setThumbnailImage(deliveryDraft?.thumbnailImage);
    }
  }, [deliveryDraft]);

  //  all handler functions here
  // Quick Messages Handlers
  const handleQuickMsgs = (id) => {
    setQucikMsgBtnController(qucikMsgBtnController === id ? null : id);
  };

  const handleChangeQuickMsg = (e) => {
    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    // Insert the emoji at the cursor position
    const newText =
      textValue.substring(0, startPos) +
      e.target.value +
      textValue.substring(endPos, textValue.length);

    setTextValue(newText);

    // Move the cursor position after the emoji
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd =
        startPos + e.target.value.length;
      textarea.focus();
    }, 0);
  };

  const handleDeleteQuickMsg = async (id) => {
    try {
      await deleteQuickResMsg(id).unwrap();
      toast.success("Quick Message deleted successfully");
    } catch {
      toast.error("Failed to delete message");
    }
  };

  // Text Editor handler
  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  // Image Preview Controllers
  const getImagesWithDimensions = (files) => {
    const images = [];

    const handleImageLoad = (file) => {
      images.push({
        name: file.name,
        size: file.size,
        url: URL.createObjectURL(file),
      });
      if (images.length === files.length) {
        setSelectedImages((prevImages) => {
          // Ensure prevImages is an array
          return Array.isArray(prevImages)
            ? [...prevImages, ...images]
            : images;
        });
      }
    };

    for (let i = 0; i < files.length; i++) {
      handleImageLoad(files[i]);
    }
  };

  const handleChangeSelectedImage = (event) => {
    const files = Array.from(event.target.files);
    getImagesWithDimensions(files);

    // Reset the file input to allow re-uploading the same file
    sourceInputRef.current.value = null;
  };

  const handleThumbnailChange = (e) => {
    const file = Array.from(e.target.files)[0];
    const fileUrl = URL.createObjectURL(file);
    setThumbnailImage({
      name: file.name,
      url: fileUrl,
      size: file.size,
    });

    thumbnailInputRef.current.value = "";
  };

  const handleThumbnailRemove = () => {
    setThumbnailImage(null);
    thumbnailInputRef.current.value = "";
  };

  const handleImageRemove = (index) => {
    setSelectedImages((prevImages) => {
      const newImages = prevImages.filter((_, i) => i !== index);
      return newImages;
    });
  };

  //   Saving Draft Data Handler
  const handleSaveDraft = () => {
    const formData = {
      messageText: textValue,
      attachments: selectedImages,
      thumbnailImage,
    };
    localStorage.setItem("deliveryDraft", JSON.stringify(formData));
  };

  //   submitting form data
  const handleSubmit = (e) => {
    e.preventDefault();
    if (textValue.length <= 5000 && selectedImages && thumbnailImage) {
      const formData = {
        messageText: textValue,
        attachments: selectedImages,
        thumbnailImage,
      };
      console.log(formData);

      const resetStorage = {
        messageText: "",
        attachments: [],
        thumbnailImage: null,
      };
      localStorage.setItem("deliveryDraft", JSON.stringify(resetStorage));
      handleClose(false);
    }
  };

  // click outside the box it will be toggled
  useOutsideClick(menuRef, () => setQucikMsgBtnController(null));

  return (
    <>
      <div className="fixed left-0 top-0 z-[99999999] flex h-screen w-full items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <form
          className="w-full max-w-[800px] rounded-md border bg-white p-4 shadow-btn-shadow"
          onSubmit={handleSubmit}
        >
          <div className="flex items-center justify-between px-2 pb-4">
            <h1 className="text-xl font-semibold text-primary">Deliver work</h1>
            <IoMdClose
              className="cursor-pointer text-2xl text-black/50"
              onClick={() => handleClose(false)}
            />
          </div>
          <div className="border">
            <div
              className={`${quickResponse ? "h-[140px]" : "h-[40px]"} border-b border-slate-300 p-2`}
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 font-semibold">
                  Quick Response{" "}
                  <button
                    type="button"
                    className="bg-transparent"
                    onClick={() => updateItem("quickResponse", !quickResponse)}
                  >
                    {quickResponse ? (
                      <IoIosArrowDown className="text-xl text-primary" />
                    ) : (
                      <IoIosArrowUp className="text-xl text-primary" />
                    )}
                  </button>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium">
                  <p>Local time: 4:52 PM</p>
                  <Divider className="h-4 w-px !bg-black" />
                  <p>Last seen 23 hours ago</p>
                </div>
              </div>
              <div
                className={`${quickResponse ? "block" : "hidden"} flex h-[100px] flex-wrap items-start gap-3 overflow-y-auto py-2`}
              >
                {quickMsgs?.map((msg, i) => (
                  <div
                    key={i}
                    className="relative flex items-center gap-2 border border-gray-400 px-2 py-1 text-xs hover:bg-primary/10"
                  >
                    <button
                      type="button"
                      value={msg.description}
                      onClick={handleChangeQuickMsg}
                    >
                      {msg.title}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleQuickMsgs(msg.id)}
                    >
                      <IoIosArrowDown className="text-base text-gray-400" />
                    </button>
                    {qucikMsgBtnController === msg.id && (
                      <div
                        className="absolute top-full z-10 rounded-lg border border-solid bg-white py-2 text-center *:block *:p-[5px_15px]"
                        ref={menuRef}
                      >
                        <button
                          type="button"
                          className="w-full text-xs hover:bg-gray-200"
                          onClick={() => setOpenEditMsgModal(msg)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteQuickMsg(msg.id)}
                          className="w-full text-xs hover:bg-gray-200"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex items-center gap-2 border border-gray-400 px-2 py-1 text-xs hover:bg-primary/10">
                  <button
                    type="button"
                    onClick={() => setOpenAddMsgModal(true)}
                  >
                    + Add New
                  </button>
                </div>
              </div>
            </div>
            <textarea
              name=""
              className={`block h-[150px] w-full resize-none p-3 outline-none ${textValue?.length > 5000 ? "border border-canceled" : ""}`}
              placeholder="Typing"
              ref={textareaRef}
              value={textValue}
              onChange={handleTextChange}
            ></textarea>
            <p
              className={`select-none p-2 text-end text-xs font-medium ${textValue?.length > 5000 ? "text-canceled" : "text-black/50"}`}
            >
              {textValue?.length || 0}/5,000
            </p>
            {selectedImages?.length > 0 && (
              <div className="preview-scroll-overflow-x flex gap-2 border-t p-2">
                {selectedImages?.map((image, index) => (
                  <div key={index} className="w-[120px]">
                    <div className="group relative">
                      <img
                        className={`h-[80px] w-full object-contain`}
                        src={image?.url}
                        alt={`Selected ${index}`}
                      />
                      <button
                        type="button"
                        className="absolute right-1 top-1 rounded-full bg-black bg-opacity-50 p-1 text-white"
                        onClick={() => handleImageRemove(index)}
                      >
                        <RiDeleteBin6Line size={15} />
                      </button>
                    </div>
                    <h1
                      className="truncate text-xs font-medium"
                      title={image?.name}
                    >
                      {image?.name}
                    </h1>
                    <span className="text-xs">
                      ({formatFileSize(image?.size)})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="p-4">
            <div className="flex items-center gap-5">
              <div>
                <input
                  type="file"
                  id="uploadThumbnail"
                  hidden
                  ref={thumbnailInputRef}
                  onChange={handleThumbnailChange}
                />
                <label
                  htmlFor="uploadThumbnail"
                  className="inline-block cursor-pointer rounded-md bg-lightskyblue px-10 py-2 font-semibold"
                >
                  <IoMdAttach className="inline-block text-xl" /> Thumbnail
                </label>
              </div>
              <div>
                <input
                  type="file"
                  id="uploadSource"
                  hidden
                  multiple
                  onChange={handleChangeSelectedImage}
                  ref={sourceInputRef}
                />
                <label
                  htmlFor="uploadSource"
                  className="inline-block cursor-pointer rounded-md bg-lightskyblue px-10 py-2 font-semibold"
                >
                  <IoMdAttach className="inline-block text-xl" /> Source Files
                </label>
              </div>
              {selectedImages?.length > 0 && (
                <p className="ms-auto text-xs font-semibold">
                  {selectedImages?.length} Attachments
                </p>
              )}
            </div>
            <div className="mt-5 flex items-end gap-5">
              {thumbnailImage && (
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={thumbnailImage?.url}
                      alt=""
                      className="w-[100px] object-cover"
                    />
                    <button
                      type="button"
                      className="absolute right-1 top-1 rounded-full bg-black bg-opacity-50 p-1 text-white"
                      onClick={() => handleThumbnailRemove()}
                    >
                      <RiDeleteBin6Line size={15} />
                    </button>
                  </div>
                  <div className="text-sm">
                    <h1 className="max-w-[200px]">{thumbnailImage?.name}</h1>
                    <span className="text-black/50">
                      ({formatFileSize(thumbnailImage?.size)})
                    </span>
                  </div>
                </div>
              )}
              <button
                type="button"
                className="ms-auto rounded-md bg-revision px-10 py-2 font-semibold text-white"
                onClick={handleSaveDraft}
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="rounded-md bg-primary px-10 py-2 font-semibold text-white"
              >
                Deliver
              </button>
            </div>
          </div>
        </form>
      </div>
      {/* Here all the modals components */}
      {openEditMsgModal && (
        <EditQuickMsgModal
          handleClose={setOpenEditMsgModal}
          value={openEditMsgModal}
          controller={setQucikMsgBtnController}
        />
      )}
      {openAddMsgModal && <AddQuickMsgModal handleClose={setOpenAddMsgModal} />}
    </>
  );
};

export default OrderDeliveryForm;
