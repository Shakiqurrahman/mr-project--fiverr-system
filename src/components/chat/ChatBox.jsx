import { Fragment, useEffect, useRef, useState } from "react";
import { BiDownload } from "react-icons/bi";
import { BsFillReplyFill, BsThreeDotsVertical } from "react-icons/bs";
import { FaCheckCircle, FaTrashAlt } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosAttach } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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

import axios from "axios";
import toast from "react-hot-toast";
import { RxHamburgerMenu } from "react-icons/rx";
import { useFetchAllUsersQuery } from "../../Redux/api/allUserApiSlice";
import {
  useArchiveAUserConversationMutation,
  useBlockAUserConversationMutation,
  useBookmarkAUserConversationMutation,
  useDeleteAConversationMutation,
  useDeleteAMessageMutation,
  useDeleteQuickResMsgMutation,
  useFetchQuickResMsgQuery,
  useGetAdminAllMessagesQuery,
  useGetAvailableChatUsersQuery,
  useSendAMessageMutation,
  useUpdateUnseenMessageMutation,
} from "../../Redux/api/inboxApiSlice";
import {
  setChatData,
  setConversationUser,
} from "../../Redux/features/chatSlice";
import { setPreviewImage } from "../../Redux/features/previewImageSlice";
import { setTypingStatus } from "../../Redux/features/userSlice";
import useLocalDateTime from "../../hooks/useLocalDateTime";
import { TimeZoneConverter } from "../../libs/TimeZoneConverter";
import { configApi } from "../../libs/configApi";
import { timeAgoTracker } from "../../libs/timeAgoTracker";
import CircleProgressBar from "../CircleProgressBar";
import FilePreview from "../FilePreview";
import GenerateName from "../GenerateName";
import PreviewChatFiles from "../PreviewChatFiles";

const ChatBox = ({ openToggle }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sendAMessage] = useSendAMessageMutation();
  const [deleteAMessage] = useDeleteAMessageMutation();

  // getAllMessages for users
  const { data: getAllMessagesForUser } = useGetAdminAllMessagesQuery();
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

  const [unseenMessageHandler] = useUpdateUnseenMessageMutation();

  const { user, token, onlineUsers, typingStatus } = useSelector(
    (state) => state.user,
  );
  const socket = connectSocket(`${configApi.socket}`, token);
  const { data: quickMsgs } = useFetchQuickResMsgQuery();
  const [deleteQuickResMsg] = useDeleteQuickResMsgMutation();
  const [deleteAConversation] = useDeleteAConversationMutation();
  const [blockingAUserConversation] = useBlockAUserConversationMutation();
  const [archiveUserConversation] = useArchiveAUserConversationMutation();
  const [bookmarkUserConversation] = useBookmarkAUserConversationMutation();

  const isAdmin = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(user?.role);

  const menuRef = useRef(null);
  const fileInputRef = useRef(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadedFilesLength, setUploadedFilesLength] = useState(0);
  const [qucikMsgBtnController, setQucikMsgBtnController] = useState(null);
  const [openAddMsgModal, setOpenAddMsgModal] = useState(false);
  const [openEditMsgModal, setOpenEditMsgModal] = useState(null);
  const [openOfferModal, setOpenOfferModal] = useState(false);

  // messages state
  const [messages, setMessages] = useState([]);
  const [clientTimeAndDate, setClientTimeAndDate] = useState(null);
  const [replyTo, setReplyTo] = useState(null);
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
    country: userCountry,
  } = usersData?.find((user) => user?.id === conversationUser) || "";

  const { isBookMarked, isBlocked, isArchived } =
    availableUsers?.find((user) => user?.id === conversationUser) || "";

  useEffect(() => {
    if (userCountry) {
      const updateClientTime = () => {
        const dateTime = TimeZoneConverter(userCountry);
        setClientTimeAndDate(dateTime);
      };

      // Update the time immediately when the component mounts
      updateClientTime();

      // Set an interval to update the time every 1 minute (60000ms)
      const intervalId = setInterval(updateClientTime, 60000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, [usersData, userCountry]);

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
      let filter = msg.userId === conversationUser && msg;
      if (isAdmin && filter) {
        setMessages((prev) => [...prev, filter]);
      }
    });

    socket?.on("delete-message", (msg) => {
      if (!isAdmin) {
        setMessages((prevMessages) =>
          prevMessages.filter((m) => m.commonKey !== msg.commonKey),
        );
      }

      console.log("deltedMsg from admin", msg);
      let filter = msg.userId === conversationUser && msg;
      if (isAdmin && filter) {
        // setMessages((prev) => [...prev, filter]);
        console.log("deltedMsg from admin", msg);
      }
    });

    socket.on("admin-notification", (msg) => {
      console.log("admin-notification", msg);
      if (
        isAdmin &&
        msg?.userId !== user.id &&
        msg?.userId === conversationUser
      ) {
        setMessages((prevMessages) => [...prevMessages, msg]);
      }
    });

    // Listen for typing status from the server
    socket.on("displayTyping", (data) => {
      if (isAdmin && data.userId === conversationUser) {
        dispatch(setTypingStatus(`Typing...`));
      }
      if (!isAdmin && data.userId === user?.id) {
        // dispatch(setTypingStatus(`Typing...`));
      }
      // console.log(data);
    });

    // Listen for stop typing
    socket.on("hideTyping", () => {
      dispatch(setTypingStatus(""));
    });

    // Cleanup on component unmount
    return () => {
      socket?.off("message");
      socket?.off("displayTyping");
      socket?.off("hideTyping");
      socket?.off("admin-notification");
    };
  }, [conversationUser, isAdmin, socket, messages, user]);

  // console.log(typingStatus);

  useEffect(() => {
    // Inital Scroll to last message
    endOfMessagesRef.current?.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (selectedImages?.length === uploadedFilesLength) {
      setUploadedFilesLength(0);
    }
  }, [selectedImages?.length]);

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

  // replyText handler
  const addReplyText = (msg) => {
    const replyText =
      msg?.attachment?.length > 0
        ? "Attachments..."
        : msg?.additionalOffer
          ? "Additional Offer..."
          : msg?.extendDeliveryTime
            ? "Extend Delivery Time..."
            : msg?.deliverProject
              ? "Deliver Project..."
              : msg?.cancelProject
                ? "Cancel Request..."
                : msg?.imageComments?.length > 0
                  ? "Image Comments..."
                  : msg?.messageText;

    const replySenderUserName = user?.userName;
    const replySenderUserRole = user?.role;
    const msgSenderUserName = msg?.senderUserName;
    const msgSenderUserRole = msg?.isFromAdmin;
    const replyObj = {
      replySenderUserName,
      replySenderUserRole,
      msgSenderUserName,
      msgSenderUserRole,
      replyText,
    };
    setReplyTo(replyObj);
  };

  // generate replied to function
  const generateRepliedTo = (msg) => {
    const {
      msgSenderUserRole,
      replySenderUserName,
      msgSenderUserName,
      replySenderUserRole,
    } = msg?.replyTo;

    console.log(msg?.replyTo, "replyto");

    if (
      msgSenderUserName !== replySenderUserName &&
      user?.role === msgSenderUserRole
    ) {
      return "You"; // User is seeing their own message
    }

    if (msgSenderUserName !== replySenderUserName && user?.role === "USER") {
      return "Mahfujurrahm535"; // User is seeing their own message
    }
    if (
      msgSenderUserName === replySenderUserName &&
      user?.userName === msgSenderUserName
    ) {
      return "You"; // User is seeing their own message
    }

    if (
      msgSenderUserName === replySenderUserName &&
      user?.userName !== msgSenderUserName &&
      user?.role !== "USER"
    ) {
      return msgSenderUserName; // User is seeing their own message
    }
    if (
      msgSenderUserName === replySenderUserName &&
      user?.userName !== msgSenderUserName &&
      user?.role === "USER"
    ) {
      return "Mahfujurrahm535"; // User is seeing their own message
    }
    if (
      msgSenderUserName !== replySenderUserName &&
      msgSenderUserRole === "USER" &&
      user?.role !== "USER"
    ) {
      return msgSenderUserName; // User is seeing their own message
    }
  };

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

  const getImagesWithDimensions = async (files) => {
    const handleImageLoad = async (file, index) => {
      const formData = new FormData();
      // formData.append("image", file);
      formData.append("files", file);

      // const uploadUrl = `${configApi.api}upload-image`;
      const uploadUrl = `${configApi.api}upload-attachment`;

      const uploadData = {
        name: file.name,
        size: file.size,
        progress: 0,
        url: null,
        type: file.type,
        format: null,
      };

      setSelectedImages((prev) => [...prev, uploadData]); // Add the new upload

      try {
        const response = await axios.post(uploadUrl, formData, {
          onUploadProgress: (data) => {
            const percentage = Math.round((data.loaded / data.total) * 100);
            setSelectedImages((prev) => {
              const newImages = [...prev];
              newImages[index].progress = percentage; // Update progress
              return newImages;
            });
          },
        });

        // Update image data upon successful upload
        const imageUrl = response.data.data.file.url.replaceAll(
          "-watermark-resized",
          "",
        );
        const fileFormat = response.data.data.file.fileType;
        setSelectedImages((prev) => {
          const newImages = [...prev];
          newImages[index] = {
            ...newImages[index],
            url: imageUrl,
            progress: 100,
            format: fileFormat,
          }; // Set URL and progress to 100%
          return newImages;
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    // Process files one by one in sequence
    for (let i = 0; i < files.length; i++) {
      const index = selectedImages?.length + i;
      await handleImageLoad(files[i], index); // Wait for each file to finish uploading before starting the next
    }
  };

  const handleChangeSelectedImage = (event) => {
    const files = Array.from(event.target.files);
    getImagesWithDimensions(files);
    setUploadedFilesLength(files?.length);
  };

  const handleImageRemove = (index) => {
    setSelectedImages((prevImages) => {
      const newImages = prevImages.filter((_, i) => i !== index);
      return newImages;
    });

    // Reset the file input to allow re-uploading the same file
    fileInputRef.current.value = null;
  };

  const handlePreviewImage = (e, url) => {
    e.preventDefault();
    dispatch(setPreviewImage(url));
  };

  // Custom Offer handler
  const handleCustomOffer = (e, offerObj) => {
    e.preventDefault();
    const data = {
      title: offerObj?.title,
      selectedQuantity: 1,
      subTotal: parseInt(offerObj?.price),
      requirements: offerObj?.requirements,
      image: {
        url: offerObj?.thumbnail,
      },
      from: "customOffer",
      deliveryDuration:
        offerObj?.deliveryWay !== "hours"
          ? parseInt(offerObj?.deliveryCount)
          : null,
      desc: offerObj?.desc,
      isFastDelivery: false,
      projectImage: offerObj?.thumbnail,
      projectType: "CUSTOM",
      deliveryWay: offerObj?.deliveryWay,
      durationHours:
        offerObj?.deliveryWay === "hours"
          ? parseInt(offerObj?.deliveryCount)
          : null,
    };
    navigate("/payment", { state: data });
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
      const attachments = selectedImages?.map((img) => ({
        name: img.name,
        size: img.size,
        url: img.url,
        format: img.format,
      }));

      const submitForm = {
        messageText: textValue,
        senderUserName: user?.userName,
        userImage: user?.image,
        attachment: attachments || [],
        customOffer: null,
        timeAndDate,
        replyTo,
      };

      if (isAdmin) {
        socket?.emit("admin-message", {
          userId: conversationUser,
          ...submitForm,
        });
      } else {
        socket?.emit("user-message", {
          userId: user?.id,
          ...submitForm,
        });
      }

      // Optimistically add the message to local state (before API response)
      setMessages((prev) => [
        ...prev,
        {
          ...submitForm,
          recipientId: isAdmin ? conversationUser : "",
        },
      ]);

      // Clear input fields and images on success
      setTextValue("");
      setSelectedImages([]);
      setReplyTo(null);
      fileInputRef.current.value = null;

      try {
        const res = await sendAMessage({
          recipientId: isAdmin ? conversationUser : null,
          ...submitForm,
        }).unwrap();

        // setMessages((prev) => prev.map((msg) =>
        //   msg?.messageText === submitForm?.messageText ? res?.data : msg
        // ));

        // Reset the file input value
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        // Rollback the optimistic update on failure
        setMessages((prev) =>
          prev.filter((msg) => msg?.messageText !== submitForm?.messageText),
        );
        console.error("Failed to send message:", error);
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

  // for deleting a single message
  const handleDeleteAMessage = async (commonKey) => {
    try {
      const res = await deleteAMessage(commonKey).unwrap();
      console.log(res);

      socket.emit("delete-message", {
        commonKey,
        userId: user?.id,
        recipientId: recipientUserId,
      });
      toast.success("Message deleted successfully");
    } catch {
      toast.error("Failed to delete message");
    }
  };

  // for deleting a conversation
  const deleteConversation = async () => {
    try {
      await deleteAConversation(conversationUser).unwrap();
      toast.success("Conversation deleted successfully");
    } catch {
      toast.error("Failed to delete conversation");
    }
  };

  // for blocking a user conversation
  const blockAUserConversation = async () => {
    try {
      await blockingAUserConversation(conversationUser).unwrap();
      isBlocked
        ? toast.success("User unblocked successfully")
        : toast.success("User blocked successfully");
    } catch {
      toast.error("Failed to block User");
    }
  };

  // for add a user conversation into archive
  const archiveAUserConversation = async () => {
    try {
      await archiveUserConversation(conversationUser).unwrap();
      isArchived
        ? toast.success("User removed from archive successfully")
        : toast.success("User added into archive successfully");
    } catch {
      toast.error("Failed to add User into archive");
    }
  };

  // for bookmark a user conversation
  const bookmarkAUserConversation = async () => {
    try {
      await bookmarkUserConversation(conversationUser).unwrap();
      isBookMarked
        ? toast.success("User removed from bookmark successfully")
        : toast.success("User bookmarked successfully");
    } catch {
      toast.error("Failed to bookmark User");
    }
  };

  const totalOrderHasDone =
    availableUsers?.find((user) => user.id === conversationUser)?.totalOrder ||
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

  // message unseen to seen
  useEffect(() => {
    if (conversationUser || messages) {
      unseenMessageHandler({
        userId: conversationUser,
      });
    }
  }, [conversationUser, messages]);

  console.log(messages);

  return (
    <div className="flex h-full flex-col">
      {/* Header Part */}
      <div className="flex h-[70px] items-center justify-between rounded-tl-lg rounded-tr-lg bg-[#efefef] p-4 md:rounded-tl-none">
        <div className="">
          <h1 className="text-base font-semibold sm:text-lg">
            {isAdmin ? recipientUserName : "Mahfujurrahm535"}
          </h1>
          <div className="flex flex-col items-start text-xs sm:flex-row sm:items-center sm:gap-3 lg:text-sm">
            {user.role === "USER" &&
              (typingStatus ? (
                typingStatus
              ) : (
                <p>{!isAdminOnline ? "Offline" : "Online"}</p>
              ))}
            {isAdmin &&
              (typingStatus ? (
                typingStatus
              ) : (
                <p>
                  {lastSeen
                    ? `Last seen: ${timeAgoTracker(lastSeen)}`
                    : "Online"}
                </p>
              ))}
            {user?.role === "USER" ? (
              <>
                <Divider
                  className={"hidden h-[15px] w-[2px] !bg-black/50 sm:block"}
                />
                <p className="sm:block">
                  Local time: {localTime}
                  <span className="hidden sm:inline">, {localDate}</span>
                </p>
              </>
            ) : (
              <>
                {clientTimeAndDate && (
                  <>
                    <Divider
                      className={
                        "hidden h-[15px] w-[2px] !bg-black/50 sm:block"
                      }
                    />
                    <p className="sm:block">
                      Local time: {clientTimeAndDate?.time}
                      <span className="hidden sm:inline">
                        , {clientTimeAndDate?.date}
                      </span>
                    </p>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        {isAdmin && (
          <div className="flex items-center justify-end gap-1 sm:gap-3">
            <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-slate-300 text-xs font-semibold">
              {totalOrderHasDone}
            </div>
            <div className="relative" onClick={() => setExpandDot(!expandDot)}>
              <BsThreeDotsVertical className="cursor-pointer text-2xl" />
              {expandDot && (
                <div
                  className="absolute right-0 top-full z-10 rounded-lg border border-solid bg-white py-2 text-center *:block *:p-[5px_15px]"
                  ref={dotMenuRef}
                >
                  <button
                    type="button"
                    className="w-full text-xs hover:bg-gray-200"
                    onClick={() => dispatch(setConversationUser(null))}
                  >
                    Unread
                  </button>
                  <button
                    type="button"
                    onClick={bookmarkAUserConversation}
                    className="w-full text-xs hover:bg-gray-200"
                  >
                    {isBookMarked ? "Starred" : "Star"}
                  </button>
                  <button
                    type="button"
                    className="w-full text-xs hover:bg-gray-200"
                    onClick={blockAUserConversation}
                  >
                    {isBlocked ? "Unblock" : "Block"}
                  </button>
                  <button
                    type="button"
                    onClick={archiveAUserConversation}
                    className="w-full text-xs hover:bg-gray-200"
                  >
                    {isArchived ? "Archived" : "Archive"}
                  </button>
                  <button
                    type="button"
                    onClick={deleteConversation}
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
      <div className={`h-auto overflow-y-auto p-2 sm:p-5`}>
        {/* All message Container */}
        {/* Each message block */}

        <div>
          {messages?.map((msg, i) => {
            const letterLogo = msg?.senderUserName?.charAt(0).toUpperCase();
            const sameUser = user?.userName === msg?.senderUserName;
            return (
              <Fragment key={i}>
                {msg?.replyTo && (
                  <div className="mt-2 border-s-2 border-primary bg-gray-50 px-3 py-1">
                    <h1 className="text-xs font-semibold text-primary">
                      {generateRepliedTo(msg)}
                    </h1>
                    <p className="text-sm">{msg?.replyTo?.replyText}</p>
                  </div>
                )}
                <div className="group mt-3 flex items-start gap-3 px-3">
                  <div className="flex size-[30px] shrink-0 items-center justify-center rounded-full bg-[#ffefef]">
                    {isAdmin &&
                      (msg?.userImage ? (
                        <img
                          src={isAdmin || sameUser ? msg?.userImage : adminLogo}
                          alt=""
                          className="size-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="text-xl font-bold text-[#7c7c7c]/50">
                          {isAdmin ? letterLogo : "M"}
                        </div>
                      ))}
                    {!isAdmin && !sameUser && (
                      <img
                        src={sameUser ? msg?.userImage : adminLogo}
                        alt=""
                        className="size-full rounded-full object-cover"
                      />
                    )}
                    {!isAdmin &&
                      sameUser &&
                      (msg?.userImage ? (
                        <img
                          src={isAdmin || sameUser ? msg?.userImage : adminLogo}
                          alt=""
                          className="size-full rounded-full object-cover"
                        />
                      ) : (
                        <div className="text-xl font-bold text-[#7c7c7c]/50">
                          {isAdmin ? letterLogo : "M"}
                        </div>
                      ))}
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
                      {!user?.block_for_chat && (
                        <div className="flex items-center gap-3 text-black/50 opacity-0 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => addReplyText(msg)}
                          >
                            <BsFillReplyFill className="text-xl" />
                          </button>
                          {visibility[msg?.id] &&
                            msg?.senderId === user?.id && (
                              <button
                                type="button"
                                onClick={() =>
                                  handleDeleteAMessage(msg?.commonkey)
                                }
                              >
                                <FaTrashAlt />
                              </button>
                            )}
                        </div>
                      )}
                    </div>
                    {/* Here is the message text to preview */}
                    {msg?.messageText && (
                      <div className="mt-1 w-11/12">
                        <p className="text-sm sm:text-base">
                          {msg?.messageText}
                        </p>
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
                        {msg?.contactForm?.exampleDesign?.length > 0 && (
                          <p className="my-1">
                            <span className="font-semibold">
                              Example design:
                            </span>
                          </p>
                        )}
                        {msg?.contactForm &&
                          msg?.contactForm?.exampleDesign?.length > 0 && (
                            <div className="relative mt-2">
                              {msg?.contactForm?.exampleDesign?.length > 3 && (
                                <Link className="mb-2 inline-block text-sm font-medium text-primary">
                                  Download All
                                </Link>
                              )}
                              <div className="grid grid-cols-3 gap-3">
                                {msg?.contactForm?.exampleDesign?.map(
                                  (att, i) => (
                                    <div key={i}>
                                      {/* <img
                                      src={att?.url}
                                      alt=""
                                      className="h-[180px] w-full cursor-pointer object-cover"
                                      onClick={(e) =>
                                        handlePreviewImage(e, att?.url)
                                      }
                                    /> */}
                                      <PreviewChatFiles
                                        file={att}
                                        handlePreviewImage={handlePreviewImage}
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
                                  ),
                                )}
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
                                className="w-[40px] cursor-pointer object-cover sm:w-[80px]"
                                alt=""
                                onClick={(e) =>
                                  handlePreviewImage(
                                    e,
                                    msg?.customOffer?.thumbnail,
                                  )
                                }
                              />
                              <h1 className="text-sm font-semibold sm:text-2xl">
                                {msg?.customOffer.title}
                              </h1>
                            </div>
                            <span className="shrink-0 text-base font-semibold text-primary sm:px-3 sm:text-3xl">
                              ${msg.customOffer.price}
                            </span>
                          </div>
                          <div className="p-3 text-sm sm:text-base">
                            <p className="mb-5 mt-2">
                              {msg?.customOffer?.desc}
                            </p>
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
                                  className="block w-full bg-primary p-2 text-center text-sm font-semibold text-white sm:text-base"
                                >
                                  Withdraw Offer
                                </button>
                              ) : (
                                <div className="flex flex-wrap gap-3 sm:flex-nowrap">
                                  <button
                                    type="button"
                                    className="block w-full bg-primary p-2 text-center text-sm font-semibold text-white sm:w-1/2 sm:text-base"
                                    onClick={(e) =>
                                      handleCustomOffer(e, msg?.customOffer)
                                    }
                                  >
                                    Accept
                                  </button>
                                  <button
                                    type="button"
                                    className="block w-full bg-gray-400 p-2 text-center text-sm font-semibold text-white sm:w-1/2 sm:text-base"
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
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                          {msg?.attachment.map((att, i) => (
                            <div key={i}>
                              <PreviewChatFiles
                                file={att}
                                handlePreviewImage={handlePreviewImage}
                              />
                              <a
                                href={att.url}
                                download={att.name}
                                className="mt-2 flex items-center justify-center text-xs"
                              >
                                <BiDownload className="shrink-0 grow text-lg text-primary" />
                                <div
                                  className="mx-[2px] max-w-[30%] shrink font-medium md:mx-2 md:max-w-[50%]"
                                  title={att.name}
                                >
                                  <GenerateName name={att.name} />
                                </div>
                                <span className="shrink-0 grow text-black/50">
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
              </Fragment>
            );
          })}
        </div>

        <div ref={endOfMessagesRef} />
      </div>
      {/* Text Field Part */}
      {!user?.block_for_chat && (
        <div className={`mt-auto px-3`}>
          <div className="rounded-t-md border border-b border-slate-300">
            {selectedImages?.length > 0 && (
              <>
                {selectedImages?.length !== uploadedFilesLength &&
                  uploadedFilesLength > 0 && (
                    <p className="p-3 pb-0 text-xs">
                      Uploaded {selectedImages?.length}/{uploadedFilesLength}
                    </p>
                  )}
                <div className="preview-scroll-overflow-x flex gap-2 border-b p-[10px]">
                  {selectedImages?.map((image, index) => (
                    <div key={index} className="w-[100px]">
                      <div className="group relative">
                        {image.url ? (
                          <FilePreview file={image} />
                        ) : (
                          <div className="flex h-[80px] items-center justify-center bg-lightcream">
                            <CircleProgressBar
                              precentage={image.progress}
                              circleWidth={50}
                            />
                          </div>
                        )}
                        {(image?.url || image?.progress === 100) && (
                          <button
                            type="button"
                            className="absolute right-1 top-1 rounded-full bg-black bg-opacity-50 p-1 text-white"
                            onClick={() => handleImageRemove(index)}
                          >
                            <RiDeleteBin6Line size={20} />
                          </button>
                        )}
                      </div>
                      <h1
                        className="truncate text-xs font-medium"
                        title={image.name}
                      >
                        <GenerateName name={image.name} />
                      </h1>
                      <span className="text-xs">
                        ({formatFileSize(image.size)})
                      </span>
                    </div>
                  ))}
                </div>
              </>
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
            {replyTo && (
              <div className="flex h-[50px] w-full items-center gap-2 border-b border-s-2 border-s-primary bg-gray-50 px-3 text-xs">
                <div>
                  <h1 className="font-semibold">
                    {(replyTo?.replySenderUserRole === "USER" ||
                      replyTo?.replySenderUserRole !== "USER") &&
                    replyTo?.replySenderUserName === replyTo?.msgSenderUserName
                      ? "You"
                      : replyTo?.replySenderUserName !==
                            replyTo?.msgSenderUserName && user?.role !== "USER"
                        ? replyTo?.msgSenderUserName
                        : replyTo?.replySenderUserName !==
                              replyTo?.msgSenderUserName &&
                            user?.role === "USER"
                          ? "Mahfujurrahm535"
                          : ""}
                  </h1>
                  <p className="line-clamp-1">{replyTo.replyText}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setReplyTo(null)}
                  className="ms-auto"
                >
                  <IoClose className="text-lg" />
                </button>
              </div>
            )}
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
      )}
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
          reply={replyTo}
          setReplyTo={setReplyTo}
        />
      )}
    </div>
  );
};

export default ChatBox;
