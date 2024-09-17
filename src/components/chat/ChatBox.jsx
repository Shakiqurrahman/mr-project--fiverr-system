import { useEffect, useRef, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { BsFillReplyFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosAttach,
  IoMdClose,
} from "react-icons/io";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/images/default_user.png";
import DownArrow from "../../assets/images/icons/Down Arrow.svg";
import UpArrow from "../../assets/images/icons/Upper Arrow.svg";
import thumbnailDemo from "../../assets/images/project-thumbnail.jpg";
import { useLocalStorageObject } from "../../hooks/useLocalStorageObject";
import useOutsideClick from "../../hooks/useOutSideClick";
import formatFileSize from "../../libs/formatFileSize";
import Divider from "../Divider";
import AddQuickMsgModal from "./AddQuickMsgModal";
import CreateOfferModal from "./CreateOfferModal";
import EditQuickMsgModal from "./EditQuickMsgModal";
import EmojiPicker from "./EmojiPicker";

const ChatBox = () => {
  const [expand, setExpand] = useState(false);
  const endOfMessagesRef = useRef(null);
  const [{ quickResponse }, updateItem] = useLocalStorageObject("utils", {
    quickResponse: false,
  });
  const { user } = useSelector((state) => state.user);
  const isAdmin = user?.role === "ADMIN";
  const menuRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState(null);
  const [qucikMsgBtnController, setQucikMsgBtnController] = useState(null);
  const [openAddMsgModal, setOpenAddMsgModal] = useState(false);
  const [openEditMsgModal, setOpenEditMsgModal] = useState(null);
  const [openOfferModal, setOpenOfferModal] = useState(false);

  const [quickMsgs, setQuickMsgs] = useState([
    {
      id: 1,
      title: "Thank you",
      text: "Thank you very much for choosing my service!",
    },
  ]);

  // messages state
  const [messages, setMessages] = useState([
    {
      messageId: 1,
      msgDate: "Apr 22, 2023",
      msgTime: "07:33 AM",
      messageText:
        "hello, looking for a flyer for my bathroom and kitchen company. I like the black and gold one you have listed",
      attachment: [],
      customOffer: null,
      contactForm: null,
    },
  ]);

  const [visibility, setVisibility] = useState({});

  useEffect(() => {
    // Inital Scroll to last message
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });

    const checkVisibility = () => {
      const newVisibility = {};
      const currentTime = new Date();

      messages.forEach((message) => {
        const messageDate = new Date(`${message.msgDate} ${message.msgTime}`);
        const fiveMinutesLater = new Date(
          messageDate.getTime() + 5 * 60 * 1000,
        );
        newVisibility[message.messageId] = currentTime < fiveMinutesLater;
      });

      setVisibility(newVisibility);
    };

    // Initial visibility check
    checkVisibility();

    // Set an interval to check every minute
    const intervalId = setInterval(checkVisibility, 60 * 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [messages]);

  // Selected Images Handler
  const handleChangeSelectedImage = (e) => {
    const imagesArr = Array.from(e.target.files);
    if (Array.isArray(imagesArr) && imagesArr.length > 0) {
      const images = imagesArr.map((file) => {
        const size = formatFileSize(file.size);
        const url = URL.createObjectURL(file);
        return {
          name: file.name,
          url,
          size,
        };
      });
      console.log(images);
      setSelectedImages(images);
    }
  };

  // Quick Messages Handlers
  const handleQuickMsgs = (id) => {
    setQucikMsgBtnController(qucikMsgBtnController === id ? null : id);
  };
  const handleAddQuickMsg = (msg) => {
    const maxId =
      quickMsgs.length > 0
        ? Math.max(...quickMsgs.map((item) => item.id)) + 1
        : 1;
    const newMsg = { id: maxId, ...msg };
    setQuickMsgs((prevMsg) => [...prevMsg, newMsg]);
  };
  const handleUpdateQuickMsg = (msg) => {
    setQuickMsgs((prevMsg) => prevMsg.map((v) => (v.id === msg.id ? msg : v)));
  };
  const handleDeleteQuickMsg = (id) => {
    setQuickMsgs((prevMsg) => prevMsg.filter((v) => v.id !== id));
  };

  // input handling
  const [textValue, setTextValue] = useState("");
  const textareaRef = useRef(null);

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

  const handleTextChange = (e) => {
    setTextValue(e.target.value);
  };
  const handleResetImages = () => {
    // Clear the state
    setSelectedImages(null);

    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  useOutsideClick(menuRef, () => setQucikMsgBtnController(null));

  // handler for Submitting/Send a Message
  const handleSubmitMessage = (e) => {
    e.preventDefault();
    if (textValue || selectedImages) {
      const response = () => {
        const date = new Date();
        const msgDate = date.toLocaleDateString([], {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        const msgTime = date.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        const maxId =
          messages.length > 0
            ? Math.max(...messages.map((item) => item.id)) + 1
            : 1;
        const submitForm = {
          id: maxId,
          msgDate,
          msgTime,
          messageText: textValue,
          attachment: selectedImages || null,
          customOffer: null,
        };
        setMessages((prev) => [...prev, submitForm]);
        return { result: "Success" };
      };
      const result = response();
      if (result.result === "Success") {
        setTextValue("");
        // Clear the state
        setSelectedImages(null);

        // Reset the file input value
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      }
    }
  };

  return (
    <div className="h-full">
      {/* Header Part */}
      <div className="flex h-[70px] items-center justify-between bg-[#efefef] p-4">
        <div className="">
          <h1 className="text-lg font-semibold">clientusername</h1>
          <div className="flex items-center gap-3 text-sm">
            <p>Last seen: 18 hours ago</p>
            <Divider className={"h-[15px] w-[2px] !bg-black/50"} />
            <p>Local time: 1:10 PM, May 29, 2023</p>
          </div>
        </div>
        {isAdmin && (
          <div className="flex items-center justify-end gap-3">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-slate-300 text-xs font-semibold">
              3
            </div>
            <button type="button">
              <BsThreeDotsVertical className="text-2xl" />
            </button>
          </div>
        )}
      </div>
      {/* Conversation Field */}
      <div
        className={`${quickResponse ? "h-[calc(100%_-_350px)]" : "h-[calc(100%_-_250px)]"} overflow-y-auto p-5`}
      >
        {/* All message Container */}
        {/* Each message block */}
        {messages.map((msg, i) => (
          <div key={i} className="group mt-3 flex items-start gap-3 px-3">
            <div className="shrink-0">
              <img
                src={logo}
                alt=""
                className="h-[30px] w-[30px] rounded-full object-cover"
              />
            </div>
            <div className="grow">
              <div className="mt-1 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h1 className="font-semibold">Client Name</h1>
                  <p className="text-xs text-black/50">
                    {msg.msgDate}, {msg.msgTime}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-black/50 opacity-0 group-hover:opacity-100">
                  <button type="button">
                    <BsFillReplyFill className="text-xl" />
                  </button>
                  {visibility[msg.messageId] && (
                    <button type="button">
                      <FaTrashAlt />
                    </button>
                  )}
                </div>
              </div>
              {/* Here is the message text to preview */}
              {msg.messageText && (
                <div className="mt-1 w-11/12">
                  <p>{msg.messageText}</p>
                </div>
              )}
              {/* Here is the contact form message to preview */}
              {msg.contactForm && (
                <div className="mt-1">
                  <h1 className="font-semibold">Contact Form</h1>
                  <p className="my-1">
                    <span className="font-semibold">Name: </span> Client Name
                  </p>
                  <p className="my-1">
                    <span className="font-semibold">Email: </span>{" "}
                    info@industryname.com
                  </p>
                  <p className="my-1">
                    <span className="font-semibold">Website/Facebook: </span>{" "}
                    www.website.com
                  </p>
                  <p className="my-1">
                    <span className="font-semibold">Example design:</span>
                  </p>
                  {/* {msg.attachment && msg.attachment.length > 0 && ( */}
                  <div className="relative mt-2">
                    {/* {msg.attachment.length > 3 && ( */}
                    <Link className="mb-2 inline-block text-sm font-medium text-primary">
                      Download All
                    </Link>
                    {/* )} */}
                    <div className="grid grid-cols-3 gap-3">
                      {/* {msg.attachment.map((att, i) => ( */}
                      {[1, 2, 3].map((i) => (
                        <div key={i}>
                          <img
                            src={thumbnailDemo}
                            alt=""
                            className="h-[180px] w-full object-cover"
                          />
                          <Link className="mt-2 flex items-center justify-center text-xs">
                            <BiDownload className="shrink-0 text-lg text-primary" />
                            <p
                              className="mx-2 line-clamp-1 font-medium"
                              // title={att.name}
                            >
                              Image name 00089.JPG
                            </p>
                            <span className="shrink-0 text-black/50">
                              (598.75 kb)
                            </span>
                          </Link>
                        </div>
                      ))}
                      {/* ))} */}
                    </div>
                    {/* {msg.attachment?.length >= 6 &&
                        (!expand ? (
                          <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-white pb-8 pt-40">
                            <button
                              className="rounded-full border bg-white"
                              onClick={() => setExpand(!expand)}
                            >
                              <img
                                src={DownArrow}
                                alt=""
                                className="h-[50px] w-[50px]"
                              />
                            </button>
                          </div>
                        ) : (
                          <div className="relative z-10 flex justify-center bg-gradient-to-t from-white pb-8 pt-5">
                            <button
                              className="rounded-full border bg-white"
                              onClick={() => setExpand(!expand)}
                            >
                              <img
                                src={UpArrow}
                                alt=""
                                className="h-[50px] w-[50px]"
                              />
                            </button>
                          </div>
                        ))} */}
                  </div>
                  <p className="mt-5">
                    <span className="font-semibold">Message: </span> Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Necessitatibus
                    eveniet dolor provident consectetur iure ipsum officia qui
                    eligendi suscipit! Deserunt quas sed inventore eaque omnis.
                  </p>
                </div>
              )}
              {/* Here is the offer template to preview */}
              {msg.customOffer && (
                <div className="mt-1">
                  <p>Custom Offer</p>
                  <div className="border bg-lightskyblue">
                    <div className="flex items-center justify-between gap-3 bg-primary/20 p-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={msg.customOffer.thumbnail}
                          className="h-[60px] w-[80px] object-cover"
                          alt=""
                        />
                        <h1 className="text-2xl font-semibold">
                          {msg.customOffer.title}
                        </h1>
                      </div>
                      <span className="shrink-0 px-3 text-3xl font-semibold text-primary">
                        ${msg.customOffer.price}
                      </span>
                    </div>
                    <div className="p-3">
                      <p className="mb-5 mt-2">{msg.customOffer.desc}</p>
                      <div className="flex items-center gap-2 font-medium">
                        <FaCheckCircle className="text-primary" />
                        <span>
                          {msg.customOffer.deliveryCount +
                            " " +
                            msg.customOffer.deliveryWay}{" "}
                          delivery
                        </span>
                      </div>
                      <div className="mt-4">
                        {isAdmin ? (
                          <button
                            type="button"
                            className="block w-full bg-primary p-2 text-center font-semibold text-white"
                          >
                            Withdraw Offer
                          </button>
                        ) : (
                          <div className="flex gap-3">
                            <button
                              type="button"
                              className="block w-1/2 bg-primary p-2 text-center font-semibold text-white"
                            >
                              Accept
                            </button>
                            <button
                              type="button"
                              className="block w-1/2 bg-gray-400 p-2 text-center font-semibold text-white"
                            >
                              Decline
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Here is Image Upload Preview part */}
              {msg.attachment && msg.attachment.length > 0 && (
                <div className="relative mt-2">
                  {msg.attachment.length > 3 && (
                    <Link className="mb-2 inline-block text-sm font-medium text-primary">
                      Download All
                    </Link>
                  )}
                  <div className="grid grid-cols-3 gap-3">
                    {msg.attachment.map((att, i) => (
                      <div key={i}>
                        <img
                          src={att.url}
                          alt=""
                          className="h-[180px] w-full object-cover"
                        />
                        <Link className="mt-2 flex items-center justify-center text-xs">
                          <BiDownload className="shrink-0 text-lg text-primary" />
                          <p
                            className="mx-2 line-clamp-1 font-medium"
                            title={att.name}
                          >
                            {att.name}
                          </p>
                          <span className="shrink-0 text-black/50">
                            ({att.size})
                          </span>
                        </Link>
                      </div>
                    ))}
                  </div>
                  {msg.attachment?.length >= 6 &&
                    (!expand ? (
                      <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center bg-gradient-to-t from-white pb-8 pt-40">
                        <button
                          className="rounded-full border bg-white"
                          onClick={() => setExpand(!expand)}
                        >
                          <img
                            src={DownArrow}
                            alt=""
                            className="h-[50px] w-[50px]"
                          />
                        </button>
                      </div>
                    ) : (
                      <div className="relative z-10 flex justify-center bg-gradient-to-t from-white pb-8 pt-5">
                        <button
                          className="rounded-full border bg-white"
                          onClick={() => setExpand(!expand)}
                        >
                          <img
                            src={UpArrow}
                            alt=""
                            className="h-[50px] w-[50px]"
                          />
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={endOfMessagesRef} />
      </div>
      {/* Text Field Part */}
      <div className={`${quickResponse ? "h-[280px]" : "h-[180px]"} px-3`}>
        <div className="rounded-t-md border border-b border-slate-300">
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
              {quickMsgs.map((msg, i) => (
                <div
                  key={i}
                  className="relative flex items-center gap-2 border border-gray-400 px-2 py-1 text-xs hover:bg-primary/10"
                >
                  <button
                    type="button"
                    value={msg.text}
                    onClick={handleChangeQuickMsg}
                  >
                    {msg.title}
                  </button>
                  <button type="button" onClick={() => handleQuickMsgs(msg.id)}>
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
                <button type="button" onClick={() => setOpenAddMsgModal(true)}>
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
            <div className="flex items-center gap-3 pl-3">
              <EmojiPicker onEmojiSelect={handleEmojiSelect} />
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
                  className="bg-lightskyblue px-2 py-1 text-sm font-medium"
                  onClick={() => setOpenOfferModal(true)}
                >
                  Create an Offer
                </button>
              )}
              {selectedImages?.length > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  {selectedImages?.length} file selected{" "}
                  <button onClick={handleResetImages}>
                    <IoMdClose className="text-lg" />
                  </button>
                </div>
              )}
            </div>
            <button
              type="button"
              className="flex h-full w-[120px] items-center justify-center bg-primary font-semibold text-white"
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
          onMsgSubmit={handleUpdateQuickMsg}
          value={openEditMsgModal}
        />
      )}
      {openAddMsgModal && (
        <AddQuickMsgModal
          handleClose={setOpenAddMsgModal}
          onMsgSubmit={handleAddQuickMsg}
        />
      )}
      {openOfferModal && (
        <CreateOfferModal
          handleClose={setOpenOfferModal}
          onOfferSubmit={setMessages}
          values={messages}
        />
      )}
    </div>
  );
};

export default ChatBox;
