import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsFillReplyFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosAttach } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import {
  useDeleteQuickResMsgMutation,
  useFetchQuickResMsgQuery,
} from "../../Redux/api/inboxApiSlice";
import { useLocalStorageObject } from "../../hooks/useLocalStorageObject";
import useOutsideClick from "../../hooks/useOutsideClick";
import { configApi } from "../../libs/configApi";
import formatFileSize from "../../libs/formatFileSize";
import { connectSocket } from "../../libs/socketService";
import Divider from "../Divider";
import AddQuickMsgModal from "../chat/AddQuickMsgModal";
import CreateOfferModal from "../chat/CreateOfferModal";
import EditQuickMsgModal from "../chat/EditQuickMsgModal";
import EmojiPicker from "../chat/EmojiPicker";

import { Link } from "react-router-dom";
import Logo from "../../assets/images/MR Logo White.png";
import AdditionalOfferPreview from "./chatbox-components/AdditionalOfferPreview";
import AttachmentsPreview from "./chatbox-components/AttachmentsPreview";

const OrderChatBox = () => {
  // Redux query imports here
  const { data: quickMsgs } = useFetchQuickResMsgQuery();
  const [deleteQuickResMsg] = useDeleteQuickResMsgMutation();

  const { user, token } = useSelector((state) => state.user);

  // Checking Admin
  const isAdmin = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(user?.role);

  // Socket Connection
  const socket = connectSocket(`${configApi.socket}`, token);

  // localStorage state
  const [{ quickResponse }, updateItem] = useLocalStorageObject("utils", {
    quickResponse: false,
  });

  // all ref here
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);
  const menuRef = useRef(null);
  const endOfMessagesRef = useRef(null);

  // all states defination here
  const [selectedImages, setSelectedImages] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [qucikMsgBtnController, setQucikMsgBtnController] = useState(null);
  const [openEditMsgModal, setOpenEditMsgModal] = useState(null);
  const [openAddMsgModal, setOpenAddMsgModal] = useState(false);
  const [openOfferModal, setOpenOfferModal] = useState(false);

  // all side effect calls here
  useEffect(
    () => {
      // Inital Scroll to last message
      endOfMessagesRef.current?.scrollIntoView();
    },
    [
      /*messages*/
    ],
  );

  // click outside the box it will be toggled
  useOutsideClick(menuRef, () => setQucikMsgBtnController(null));

  // all handler starts here
  // Quick Messages Handlers
  const handleQuickMsgs = (id) => {
    setQucikMsgBtnController(qucikMsgBtnController === id ? null : id);
  };

  const handleDeleteQuickMsg = async (id) => {
    try {
      await deleteQuickResMsg(id).unwrap();
      toast.success("Quick Message deleted successfully");
    } catch {
      toast.error("Failed to delete message");
    }
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

  // Image Preview Controllers
  const getImagesWithDimensions = (files) => {
    const images = [];

    const handleImageLoad = (file) => {
      images.push({
        file: file,
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
  };

  const handleImageRemove = (index) => {
    setSelectedImages((prevImages) => {
      const newImages = prevImages.filter((_, i) => i !== index);
      return newImages;
    });

    // Reset the file input to allow re-uploading the same file
    fileInputRef.current.value = null;
  };

  // Text Editor handler
  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };

  // EmojiPicker Handler
  const handleEmojiSelect = (emoji) => {
    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;

    // Insert the emoji at the cursor position
    const newText =
      textValue.substring(0, startPos) +
      emoji +
      textValue.substring(endPos, textValue.length);

    setTextValue(newText);

    // Move the cursor position after the emoji
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = startPos + emoji.length;
      textarea.focus();
    }, 0);
  };

  // handler for Submitting/Send a Message
  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    // if (textValue || selectedImages.length > 0) {
    //   const response = async () => {
    //     const attachments = selectedImages?.map((img) => ({
    //       name: img.file.name,
    //       size: img.file.size,
    //       url: img.url,
    //     }));
    //     const submitForm = {
    //       messageText: textValue,
    //       senderUserName: user?.userName,
    //       userImage: user?.image,
    //       attachment: attachments || [],
    //       customOffer: null,
    //       msgDate,
    //       msgTime,
    //     };
    //     if (isAdmin) {
    //       socket?.emit("admin-message", {
    //         userId: conversationUser,
    //         ...submitForm,
    //       });
    //       const res = await sendAMessage({
    //         recipientId: conversationUser,
    //         ...submitForm,
    //       }).unwrap();
    //     } else {
    //       socket?.emit("user-message", {
    //         userId: user?.id,
    //         ...submitForm,
    //       });
    //       const res = await sendAMessage({
    //         recipientId: "66fba5d5dca406c532a6b338",
    //         ...submitForm,
    //       }).unwrap();
    //     }
    //     return { result: "Success" };
    //   };
    //   const result = await response();
    //   if (result.result === "Success") {
    //     setTextValue("");
    //     // Clear the state
    //     setSelectedImages(null);

    //     // Reset the file input value
    //     if (fileInputRef.current) {
    //       fileInputRef.current.value = "";
    //     }
    //   }
    // }
  };

  return (
    <>
      <div className="h-[calc(100%_-_100px)] w-full rounded-lg shadow-btn-shadow">
        {/* Conversation Field */}
        <div
          className={`${quickResponse && selectedImages?.length > 0 ? "h-[calc(100%_-_423px)]" : quickResponse ? "h-[calc(100%_-_280px)]" : selectedImages?.length > 0 ? "h-[calc(100%_-_321px)]" : "h-[calc(100%_-_180px)]"} overflow-y-auto p-2 sm:p-5`}
        >
          {/* All message Container */}
          <div>
            <div className="group mt-3 flex items-start gap-3 px-3">
              <div className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-[#ffefef]">
                <img
                  src={Logo}
                  alt=""
                  className="size-full rounded-full object-cover"
                />
              </div>
              <div className="grow">
                <div className="mt-1 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <h1 className="text-sm font-semibold sm:text-base">
                      Client Name
                    </h1>
                    <p className="text-[10px] text-black/50 sm:text-xs">
                      Apr 22, 2023, 7:33 AM
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-black/50 opacity-0 group-hover:opacity-100">
                    <button type="button">
                      <BsFillReplyFill className="text-xl" />
                    </button>
                    <button type="button">
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
                {/* Here is the message text to preview */}
                <div className="mt-1 w-11/12">
                  <p className="text-sm sm:text-base">
                    hello, looking for a flyer for my bathroom and kitchen
                    company. i like the black and gold one you have listed
                  </p>
                </div>
                <AttachmentsPreview />
                <AdditionalOfferPreview />
              </div>
            </div>
          </div>

          <div ref={endOfMessagesRef} />
        </div>
        {/* Text Field Part */}
        <div
          className={`${quickResponse && selectedImages?.length > 0 ? "h-[423px]" : quickResponse ? "h-[280px]" : "h-[180px]"} px-3`}
        >
          <div className="rounded-t-md border border-b border-slate-300">
            {selectedImages?.length > 0 && (
              <div className="flex gap-2 overflow-x-auto border-b p-[10px]">
                {selectedImages?.map((image, index) => (
                  <div key={index} className="w-[120px]">
                    <div className="group relative">
                      <img
                        className={`h-[80px] w-full object-contain`}
                        src={image.url}
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
                      title={image.file.name}
                    >
                      {image.file.name}
                    </h1>
                    <span className="text-xs">
                      ({formatFileSize(image.file.size)})
                    </span>
                  </div>
                ))}
              </div>
            )}
            <div
              className={`${quickResponse ? "h-[140px]" : "h-[40px]"} border-b border-slate-300 p-2`}
            >
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
              className="block h-[90px] w-full resize-none p-3 outline-none"
              placeholder="Type a message..."
              ref={textareaRef}
              value={textValue}
              onChange={handleTextChange}
            ></textarea>
            <div className="flex h-[50px] items-center justify-between border-t border-slate-300">
              <div className="flex items-center gap-[2px] pl-1 sm:gap-3 sm:pl-3">
                <EmojiPicker
                  onEmojiSelect={handleEmojiSelect}
                  style={{ transform: "translateX(-5%)" }}
                />
                <Divider className={"h-[30px] w-px !bg-gray-400"} />
                <div>
                  <input
                    type="file"
                    multiple
                    id="select-images"
                    hidden
                    onChange={handleChangeSelectedImage}
                    ref={fileInputRef}
                  />
                  <label htmlFor="select-images" className="cursor-pointer">
                    <IoIosAttach className="text-2xl" />
                  </label>
                </div>
                {isAdmin && (
                  <button
                    type="button"
                    className="bg-lightskyblue px-2 py-2 text-xs font-medium sm:text-sm"
                    onClick={() => setOpenOfferModal(true)}
                  >
                    Create an Offer
                  </button>
                )}
              </div>
              <button
                type="button"
                className="flex h-full w-[100px] items-center justify-center bg-primary text-sm font-semibold text-white sm:w-[120px] sm:text-base"
                onClick={handleSubmitMessage}
              >
                Send
              </button>
            </div>
          </div>
        </div>
        {/* Here all the modals components */}
        {openEditMsgModal && (
          <EditQuickMsgModal
            handleClose={setOpenEditMsgModal}
            value={openEditMsgModal}
            controller={setQucikMsgBtnController}
          />
        )}
        {openAddMsgModal && (
          <AddQuickMsgModal handleClose={setOpenAddMsgModal} />
        )}
        {openOfferModal && (
          <CreateOfferModal
            handleClose={setOpenOfferModal}
            onOfferSubmit={socket}
            // values={messages}
          />
        )}
      </div>
      <p className="my-5 text-center">
        View conversation with{" "}
        <Link to={`/clientusername`} className="font-semibold text-primary">
          clientusername
        </Link>{" "}
        in your inbox
      </p>
    </>
  );
};

export default OrderChatBox;
