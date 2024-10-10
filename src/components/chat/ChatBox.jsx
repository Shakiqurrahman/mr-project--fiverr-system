import { useEffect, useRef, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { BsFillReplyFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosAttach } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import adminLogo from "../../assets/images/MR Logo Icon.png";
import DownArrow from "../../assets/images/icons/Down Arrow.svg";
import UpArrow from "../../assets/images/icons/Upper Arrow.svg";
import { useLocalStorageObject } from "../../hooks/useLocalStorageObject";
import useOutsideClick from "../../hooks/useOutsideClick";
import formatFileSize from "../../libs/formatFileSize";
import { connectSocket } from "../../libs/socketService";
import Divider from "../Divider";
import AddQuickMsgModal from "./AddQuickMsgModal";
import CreateOfferModal from "./CreateOfferModal";
import EditQuickMsgModal from "./EditQuickMsgModal";
import EmojiPicker from "./EmojiPicker";

import toast from "react-hot-toast";
import { RxHamburgerMenu } from "react-icons/rx";
import { useFetchAllUsersQuery } from "../../Redux/api/allUserApiSlice";
import {
  useDeleteQuickResMsgMutation,
  useFetchQuickResMsgQuery,
  useGetAvailableChatUsersQuery,
  useLazyGetAllMessagesQuery,
  useSendAMessageMutation,
} from "../../Redux/api/inboxApiSlice";
import { setChatData } from "../../Redux/features/chatSlice";
import { setTypingStatus } from "../../Redux/features/userSlice";
import { configApi } from "../../libs/configApi";
import { timeAgoTracker } from "../../libs/timeAgoTracker";
import useLocalDateTime from "../../hooks/useLocalDateTime";

const ChatBox = ({ openToggle }) => {
  const dispatch = useDispatch();
  const [sendAMessage] = useSendAMessageMutation();

  // getAllMessages
  const [triggerGetAllMessages, { data: getAllMessagesForUser }] =
    useLazyGetAllMessagesQuery();
  const { data: availableUsers } = useGetAvailableChatUsersQuery();

  //Set the conversation user id
  const { conversationUser, chatData } = useSelector((state) => state.chat);
  const [expand, setExpand] = useState(false);
  const [expandDot, setExpandDot] = useState(false);
  const endOfMessagesRef = useRef(null);
  const dotMenuRef = useRef(null);
  const [{ quickResponse }, updateItem] = useLocalStorageObject("utils", {
    quickResponse: false,
  });
  const { user, token, onlineUsers, typingStatus } = useSelector(
    (state) => state.user,
  );
  const socket = connectSocket(`${configApi.socket}`, token);
  const { data: quickMsgs } = useFetchQuickResMsgQuery();
  const [deleteQuickResMsg] = useDeleteQuickResMsgMutation();

  const isAdmin = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(user?.role);

  const menuRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [qucikMsgBtnController, setQucikMsgBtnController] = useState(null);
  const [openAddMsgModal, setOpenAddMsgModal] = useState(false);
  const [openEditMsgModal, setOpenEditMsgModal] = useState(null);
  const [openOfferModal, setOpenOfferModal] = useState(false);

  // messages state
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  // const [typingStatus, setTypingStatus] = useState("");

  // recipient User
  const { data: usersData } = useFetchAllUsersQuery(null, {
    pollingInterval: 60000,
  });
  const {
    userName: recipientUserName,
    lastSeen,
    id: recipientUserId,
  } = usersData?.find((user) => user?.id === conversationUser) || "";

  useEffect(() => {
    if (user.role === "USER") {
      triggerGetAllMessages({
        receiverId: "66fba5d5dca406c532a6b338",
      });
    }
  }, [user, triggerGetAllMessages]);

  useEffect(() => {
    if (getAllMessagesForUser && user.role === "USER") {
      dispatch(setChatData(getAllMessagesForUser));
      setMessages(getAllMessagesForUser);
    } else if (chatData) {
      setMessages(chatData);
    }
  }, [dispatch, getAllMessagesForUser, user, chatData]);

  const [visibility, setVisibility] = useState({});

  // Socket connection reader
  useEffect(() => {
    // Listen for incoming messages
    socket?.on("message", (msg) => {
      if (!isAdmin) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }

      console.log("message", msg, conversationUser);
      let filter = msg.userId === conversationUser && msg;
      if (isAdmin && filter) {
        setMessages((prev) => [...prev, filter]);
      }
    });

    // Listen for typing status from the server
    socket.on("displayTyping", (data) => {
      if (isAdmin && data.userId === conversationUser) {
        dispatch(setTypingStatus(`Typing...`));
      }
      if (!isAdmin && data.userId === user?.id) {
        console.log("i am typinh");

        dispatch(setTypingStatus(`Typing...`));
      }
      console.log(data);
    });

    // Listen for stop typing
    socket.on("hideTyping", () => {
      dispatch(setTypingStatus(""));
    });

    // Cleanup on component unmount
    return () => {
      socket?.off("message");
    };
  }, [conversationUser, isAdmin, socket, messages, dispatch]);

  // console.log(typingStatus);

  useEffect(() => {
    // Inital Scroll to last message
    endOfMessagesRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    const checkVisibility = () => {
      const newVisibility = {};
      const currentTime = new Date();

      messages?.forEach((message) => {
        const messageDate = new Date(parseInt(message?.timeAndDate));
        const fiveMinutesLater = new Date(
          messageDate.getTime() + 5 * 60 * 1000,
        );        
        newVisibility[message?.id] = currentTime < fiveMinutesLater;
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

  // Quick Messages Handlers
  const handleQuickMsgs = (id) => {
    setQucikMsgBtnController(qucikMsgBtnController === id ? null : id);
  };

  const handleDeleteQuickMsg = async (id) => {
    try {
      await deleteQuickResMsg(id).unwrap();
      toast.success("Quick Message deleted successfully");
    } catch (err) {
      toast.error("Failed to delete message");
    }
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

  // const handleTextChange = (e) => {
  //   setTextValue(e.target.value);
  // };

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

  // click outside the box it will be toggled
  useOutsideClick(menuRef, () => setQucikMsgBtnController(null));
  useOutsideClick(dotMenuRef, () => setExpandDot(false));


  const dates = new Date();
  const timeAndDate = dates.getTime();

  // handler for Submitting/Send a Message
  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    if (textValue || selectedImages.length > 0) {
      const response = async () => {
        const attachments = selectedImages?.map((img) => ({
          name: img.file.name,
          size: img.file.size,
          url: img.url,
        }));
        const submitForm = {
          messageText: textValue,
          senderUserName: user?.userName,
          userImage: user?.image,
          attachment: attachments || [],
          customOffer: null,
          timeAndDate,
        };
        if (isAdmin) {
          socket?.emit("admin-message", {
            userId: conversationUser,
            ...submitForm,
          });
          const res = await sendAMessage({
            recipientId: conversationUser,
            ...submitForm,
          }).unwrap();
          ///////// i dunno it's optimized or not................................
          setMessages((prev) => [...prev, res?.data]);
        } else {
          socket?.emit("user-message", {
            userId: user?.id,
            ...submitForm,
          });
          const res = await sendAMessage({
            recipientId: "66fba5d5dca406c532a6b338",
            ...submitForm,
          }).unwrap();
        }
        return { result: "Success" };
      };
      const result = await response();
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

  // Handle user typing
  const handleTyping = (e) => {
    setTextValue(e.target.value);
    if (!isTyping) {
      setIsTyping(true);
      socket.emit("typing", { userId: user?.id }); // Send typing event
    }

    // Clear previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Stop typing after 3 seconds of inactivity
    setTypingTimeout(
      setTimeout(() => {
        setIsTyping(false);
        socket.emit("stopTyping", {
          userId: user?.id,
        }); // Send stop typing event
      }, 3000),
    );
  };

  const totalOrderHasDone =
    availableUsers.find((user) => user.id === conversationUser)?.totalOrder ||
    0;

    const { localDate, localTime } = useLocalDateTime();

  const renderMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const renderMessageDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const [isAdminOnline, setIsAdminOnline] = useState(false);
  useEffect(() => {
    if (onlineUsers && onlineUsers.length > 0) {
      const adminOnline = onlineUsers.some(
        (onlineUser) => onlineUser?.role !== "USER",
      );
      setIsAdminOnline(adminOnline);
    } else {
      setIsAdminOnline(false);
    }
  }, [onlineUsers]);

  const isUserOnline = (userId) => {
    return onlineUsers.some((onlineUser) => onlineUser?.userId === userId);
  };

  return (
    <div className="h-full">
      {/* Header Part */}
      <div className="flex h-[70px] items-center justify-between rounded-tl-lg rounded-tr-lg bg-[#efefef] p-4 md:rounded-tl-none">
        <div className="">
          <h1 className="text-base font-semibold sm:text-lg">
            {isAdmin ? recipientUserName : "Mahfujurrahm535"}
          </h1>
          <div className="flex flex-col items-start text-xs sm:flex-row sm:items-center sm:gap-3 lg:text-sm">
            {typingStatus ? (
              typingStatus
            ) : (
              <p>
                {lastSeen
                  ? `Last seen: ${timeAgoTracker(lastSeen)}`
                  : isAdminOnline
                    ? "Online"
                    : "Offline"}
              </p>
            )}
            <Divider
              className={"hidden h-[15px] w-[2px] !bg-black/50 sm:block"}
            />
            <p className="hidden sm:block">
              Local time: {localTime}, {localDate}
            </p>
          </div>
        </div>
        {isAdmin && (
          <div className="flex items-center justify-end gap-1 sm:gap-3">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-slate-300 text-xs font-semibold">
              {totalOrderHasDone}
            </div>
            <div className="relative" onClick={() => setExpandDot(!expandDot)}>
              <BsThreeDotsVertical className="text-2xl" />
              {expandDot && (
                <div
                  className="absolute right-0 top-full z-10 rounded-lg border border-solid bg-white py-2 text-center *:block *:p-[5px_15px]"
                  ref={dotMenuRef}
                >
                  <button
                    type="button"
                    className="w-full text-xs hover:bg-gray-200"
                    // onClick={() => setOpenEditMsgModal(msg)}
                  >
                    Read/Unread
                  </button>
                  <button
                    type="button"
                    // onClick={() => handleDeleteQuickMsg(msg.id)}
                    className="w-full text-xs hover:bg-gray-200"
                  >
                    Star/Starred
                  </button>
                  <button
                    type="button"
                    className="w-full text-xs hover:bg-gray-200"
                    // onClick={() => setOpenEditMsgModal(msg)}
                  >
                    Block/Unblock
                  </button>
                  <button
                    type="button"
                    // onClick={() => handleDeleteQuickMsg(msg.id)}
                    className="w-full text-xs hover:bg-gray-200"
                  >
                    Archive/Archived
                  </button>
                  <button
                    type="button"
                    // onClick={() => console.log("deleted")}
                    className="w-full text-xs hover:bg-gray-200"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            <button
              type="button"
              className="block md:hidden"
              onClick={() => openToggle(true)}
            >
              <RxHamburgerMenu className="text-2xl" />
            </button>
          </div>
        )}
      </div>
      {/* Conversation Field */}
      <div
        className={`${quickResponse && selectedImages?.length > 0 ? "h-[calc(100%_-_491px)]" : quickResponse ? "h-[calc(100%_-_350px)]" : selectedImages?.length > 0 ? "h-[calc(100%_-_391px)]" : "h-[calc(100%_-_250px)]"} overflow-y-auto p-2 sm:p-5`}
      >
        {/* All message Container */}
        {/* Each message block */}

        <div>
          {messages?.map((msg, i) => {
            const letterLogo = msg?.senderUserName?.charAt(0).toUpperCase();
            const sameUser = user?.userName === msg?.senderUserName;
            return (
              <div key={i} className="group mt-3 flex items-start gap-3 px-3">
                <div className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-[#ffefef]">
                  {msg?.userImage ? (
                    <img
                      src={isAdmin || sameUser ? msg?.userImage : adminLogo}
                      alt=""
                      className="size-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="text-xl font-bold text-[#7c7c7c]/50">
                      {isAdmin ? letterLogo : "M"}
                    </div>
                  )}
                </div>
                <div className="grow">
                  <div className="mt-1 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <h1 className="text-sm font-semibold sm:text-base">
                        {isAdmin
                          ? sameUser
                            ? "Me"
                            : msg?.senderUserName
                          : sameUser
                            ? "Me"
                            : "mahfujurrahm535"}
                      </h1>
                      <p className="text-[10px] text-black/50 sm:text-xs">
                        {renderMessageDate(parseInt(msg?.timeAndDate))},{" "}
                        {renderMessageTime(parseInt(msg?.timeAndDate))}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-black/50 opacity-0 group-hover:opacity-100">
                      <button type="button">
                        <BsFillReplyFill className="text-xl" />
                      </button>
                      {visibility[msg?.id] && (
                        <button type="button">
                          <FaTrashAlt />
                        </button>
                      )}
                    </div>
                  </div>
                  {/* Here is the message text to preview */}
                  {msg?.messageText && (
                    <div className="mt-1 w-11/12">
                      <p className="text-sm sm:text-base">{msg?.messageText}</p>
                    </div>
                  )}
                  {/* Here is the contact form message to preview */}
                  {msg?.contactForm && (
                    <div className="mt-1">
                      <h1 className="font-semibold">Contact Form</h1>
                      <p className="my-1">
                        <span className="font-semibold">Name: </span>{" "}
                        {msg.contactForm.name}
                      </p>
                      <p className="my-1">
                        <span className="font-semibold">Email: </span>{" "}
                        {msg.contactForm.email}
                      </p>
                      <p className="my-1">
                        <span className="font-semibold">
                          Website/Facebook:{" "}
                        </span>{" "}
                        {msg.contactForm.website}
                      </p>
                      <p className="my-1">
                        <span className="font-semibold">Example design:</span>
                      </p>
                      {msg.attachment && msg.attachment.length > 0 && (
                        <div className="relative mt-2">
                          {msg?.contactForm?.exampleDesign?.length > 3 && (
                            <Link className="mb-2 inline-block text-sm font-medium text-primary">
                              Download All
                            </Link>
                          )}
                          <div className="grid grid-cols-3 gap-3">
                            {msg?.contactForm?.exampleDesign?.map((att, i) => (
                              <div key={i}>
                                <img
                                  src={att?.url}
                                  alt=""
                                  className="h-[180px] w-full object-cover"
                                />
                                <Link className="mt-2 flex items-center justify-center text-xs">
                                  <BiDownload className="shrink-0 text-lg text-primary" />
                                  <p
                                    className="mx-2 line-clamp-1 font-medium"
                                    title={att?.name}
                                  >
                                    {att?.name}
                                  </p>
                                  <span className="shrink-0 text-black/50">
                                    ({formatFileSize(att?.size)})
                                  </span>
                                </Link>
                              </div>
                            ))}
                          </div>
                          {msg?.contactForm?.exampleDesign?.length >= 6 &&
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

                      <p className="mt-5">
                        <span className="font-semibold">Message: </span>{" "}
                        {msg.contactForm.messageText}
                      </p>
                    </div>
                  )}
                  {/* Here is the offer template to preview */}
                  {msg?.customOffer && (
                    <div className="mt-1">
                      <p>Custom Offer</p>
                      <div className="border bg-lightskyblue">
                        <div className="flex items-center justify-between gap-3 bg-primary/20 p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={msg?.customOffer.thumbnail}
                              className="h-[60px] w-[80px] object-cover"
                              alt=""
                            />
                            <h1 className="text-2xl font-semibold">
                              {msg?.customOffer.title}
                            </h1>
                          </div>
                          <span className="shrink-0 px-3 text-3xl font-semibold text-primary">
                            ${msg.customOffer.price}
                          </span>
                        </div>
                        <div className="p-3">
                          <p className="mb-5 mt-2">{msg?.customOffer?.desc}</p>
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
                  {msg?.attachment && msg?.attachment?.length > 0 && (
                    <div className="relative mt-2">
                      {msg?.attachment.length > 3 && (
                        <Link
                          onClick={() => handleDownloadAll(msg.attachment)}
                          className="mb-2 inline-block text-sm font-medium text-primary"
                        >
                          Download All
                        </Link>
                      )}
                      <div className="grid grid-cols-3 gap-3">
                        {msg?.attachment.map((att, i) => (
                          <div key={i}>
                            <img
                              src={att.url}
                              alt=""
                              className="h-[180px] w-full object-cover"
                            />
                            {console.log(att)}
                            <a
                              href={att.url}
                              download={att.name}
                              className="mt-2 flex items-center justify-center text-xs"
                            >
                              <BiDownload className="shrink-0 text-lg text-primary" />
                              <p
                                className="mx-2 line-clamp-1 font-medium"
                                title={att.name}
                              >
                                {att.name}
                              </p>
                              <span className="shrink-0 text-black/50">
                                ({formatFileSize(att.size)})
                              </span>
                            </a>
                          </div>
                        ))}
                      </div>
                      {msg?.attachment?.length >= 6 &&
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
            );
          })}
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
            onChange={handleTyping}
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
      {openAddMsgModal && <AddQuickMsgModal handleClose={setOpenAddMsgModal} />}
      {openOfferModal && (
        <CreateOfferModal
          handleClose={setOpenOfferModal}
          onOfferSubmit={socket}
          values={messages}
        />
      )}
    </div>
  );
};

export default ChatBox;
