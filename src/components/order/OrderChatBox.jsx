import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsFillReplyFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowUp, IoIosAttach } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteQuickResMsgMutation,
  useFetchQuickResMsgQuery,
} from "../../Redux/api/inboxApiSlice";
import logo from "../../assets/images/MR Logo Icon.png";
import { useLocalStorageObject } from "../../hooks/useLocalStorageObject";
import useOutsideClick from "../../hooks/useOutsideClick";
import { configApi } from "../../libs/configApi";
import formatFileSize from "../../libs/formatFileSize";
import { connectSocket } from "../../libs/socketService";
import Divider from "../Divider";
import AddQuickMsgModal from "../chat/AddQuickMsgModal";
import EditQuickMsgModal from "../chat/EditQuickMsgModal";
import EmojiPicker from "../chat/EmojiPicker";

import axios from "axios";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import shortid from "shortid";
import {
  useDeleteAOrderMessageMutation,
  useLazyGetOrderUserMessagesQuery,
  useSendAOrderMessageMutation,
  useUpdateOrderMessageSeenMutation,
} from "../../Redux/api/orderApiSlice";
import {
  rollbackMessages,
  setMessages,
  setReplyTo,
  updateMessagesByUser,
} from "../../Redux/features/orderSlice";
import { TimeZoneConverter } from "../../libs/TimeZoneConverter";
import { timeAgoTracker } from "../../libs/timeAgoTracker";
import CircleProgressBar from "../CircleProgressBar";
import FilePreview from "../FilePreview";
import GenerateName from "../GenerateName";
import AdditionalOfferModal from "./chatbox-components/AdditionalOfferModal";
import AdditionalOfferPreview from "./chatbox-components/AdditionalOfferPreview";
import AttachmentsPreview from "./chatbox-components/AttachmentsPreview";
import CancellingProjectPreview from "./chatbox-components/CancellingProjectPreview";
import CommentsPreview from "./chatbox-components/CommentsPreview";
import ExtendingDeliveryPreview from "./chatbox-components/ExtendingDeliveryPreview";
import OrderDeliveryPreview from "./chatbox-components/OrderDeliveryPreview";

const OrderChatBox = () => {
  const dispatch = useDispatch();
  // Redux query imports here
  const [getAllUserMessages, { data: allUserMessages }] =
    useLazyGetOrderUserMessagesQuery();
  const { data: quickMsgs } = useFetchQuickResMsgQuery();
  const [deleteQuickResMsg] = useDeleteQuickResMsgMutation();
  const [sendAOrderMessage] = useSendAOrderMessageMutation();
  const [deleteAOrderMessage] = useDeleteAOrderMessageMutation();

  const [updateMessageSeen] = useUpdateOrderMessageSeenMutation();

  const { user, token, onlineUsers } = useSelector((state) => state.user);
  const { projectDetails, clientDetails, messages, replyTo } = useSelector(
    (state) => state.order,
  );

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
  const prevMessagesRef = useRef([]);
  const endOfMessagesRef = useRef(null);

  // all states defination here
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [textValue, setTextValue] = useState("");
  const [qucikMsgBtnController, setQucikMsgBtnController] = useState(null);
  const [openEditMsgModal, setOpenEditMsgModal] = useState(null);
  const [openAddMsgModal, setOpenAddMsgModal] = useState(false);
  const [openOfferModal, setOpenOfferModal] = useState(false);
  const [uploadFilesLength, setUploadFilesLength] = useState(0);
  const [uploadTempFilesLength, setUploadTempFilesLength] = useState(0);
  const [visibility, setVisibility] = useState({});
  const [clientTimeAndDate, setClientTimeAndDate] = useState(null);

  // all side effect calls here
  useEffect(() => {
    if (projectDetails) {
      const updateClientTime = () => {
        const dateTime = TimeZoneConverter(projectDetails?.orderFrom);
        setClientTimeAndDate(dateTime);
      };

      // Update the time immediately when the component mounts
      updateClientTime();

      // Set an interval to update the time every 1 minute (60000ms)
      const intervalId = setInterval(updateClientTime, 60000);

      // Clean up the interval when the component unmounts
      return () => clearInterval(intervalId);
    }
  }, []);

  // Socket connection reader
  useEffect(() => {
    // Listen for incoming messages

    socket?.on("order:message", (msg) => {
      // if (!isAdmin) {
      dispatch(setMessages(msg));
      // }
      // let filter = msg.userId === conversationUser && msg;
      // if (isAdmin && filter) {
      //   setMessages((prev) => [...prev, filter]);
      // }
    });

    // Listen for typing status from the server
    // socket.on("displayTyping", (data) => {
    //   if (isAdmin && data.userId === conversationUser) {
    //     dispatch(setTypingStatus(`Typing...`));
    //   }
    //   if (!isAdmin && data.userId === user?.id) {
    //     console.log("i am typinh");

    //     dispatch(setTypingStatus(`Typing...`));
    //   }
    //   console.log(data);
    // });

    // Listen for stop typing
    // socket.on("hideTyping", () => {
    //   dispatch(setTypingStatus(""));
    // });

    // Cleanup on component unmount
    return () => {
      socket?.off("order:message");
    };
  }, [socket, dispatch]);
  // }, [conversationUser, isAdmin, socket, messages, dispatch, user]);
  // get all messages of user from db
  useEffect(() => {
    if (projectDetails) {
      getAllUserMessages({
        userId: user?.id,
        projectNumber: projectDetails?.projectNumber,
      });
    }
  }, [projectDetails, getAllUserMessages]);

  // useEffect(() => {
  //   if ((allUserMessages || messages) && projectDetails) {
  //     updateMessageSeen(projectDetails?.projectNumber);
  //   }
  // }, [allUserMessages, messages, projectDetails, updateMessageSeen]);

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

  useEffect(() => {
    if (allUserMessages) {
      dispatch(updateMessagesByUser(allUserMessages));
    }
  }, [allUserMessages, dispatch]);

  useEffect(() => {
    if (uploadTempFilesLength === uploadFilesLength) {
      setUploadFilesLength(0);
    }
  }, [uploadTempFilesLength]);

  // useEffect(() => {
  //   // Only run the effect if the messages array has actually changed
  //   if (prevMessagesRef.current.length !== messages?.length) {
  //     console.log("Scroll"); // Log when scroll happens
  //     prevMessagesRef.current = messages; // Update the previous messages ref
  //     endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" }); // Scroll to the end of messages
  //   }
  // }, [messages]); // Dependency on the messages array

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
  const getImagesWithDimensions = async (files) => {
    const handleImageLoad = async (file, index, i) => {
      setUploadTempFilesLength(i + 1);
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
        toast.error("Failed to upload image");
      }
    };

    // Process files one by one in sequence
    for (let i = 0; i < files.length; i++) {
      const index = selectedImages?.length + i;
      await handleImageLoad(files[i], index, i); // Wait for each file to finish uploading before starting the next
    }
  };

  const handleChangeSelectedImage = (event) => {
    const files = Array.from(event.target.files);
    getImagesWithDimensions(files);
    setUploadFilesLength(files?.length);
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

  // Setup sending message time and date
  const dates = new Date();
  const timeAndDate = dates.getTime();

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

  // handler for Submitting/Send a Message
  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    if (textValue || selectedImages.length > 0) {
      const attachments = selectedImages?.map((img) => ({
        imageId: shortid.generate(),
        name: img.name,
        size: img.size,
        url: img.url,
        format: img.format,
        comments: [],
      }));

      const submitForm = {
        messageText: textValue,
        senderUserName: user?.userName,
        userImage: user?.image,
        attachment: attachments || [],
        additionalOffer: null,
        extendDeliveryTime: null,
        deliverProject: null,
        cancelProject: null,
        imageComments: [],
        timeAndDate,
        replyTo,
        projectNumber: projectDetails?.projectNumber,
        uniqueId: shortid(),
      };

      if (isAdmin) {
        socket?.emit("order:admin-message", {
          userId: projectDetails?.userId,
          ...submitForm,
        });
      } else {
        socket?.emit("order:user-message", {
          ...submitForm,
        });
      }

      // Optimistically add the message to local state (before API response)
      dispatch(
        setMessages({
          ...submitForm,
          recipientId: isAdmin ? projectDetails?.userId : "",
        }),
      );

      // Clear input fields and images on success
      setTextValue("");
      setSelectedImages([]);
      dispatch(setReplyTo(null));
      fileInputRef.current.value = null;

      try {
        const res = await sendAOrderMessage({
          recipientId: isAdmin ? projectDetails?.userId : null,
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
        // setMessages((prev) =>
        //   prev.filter((msg) => msg?.messageText !== submitForm?.messageText),
        // );
        dispatch(rollbackMessages(submitForm?.messageText));
        toast.error("Failed to upload image");
      }
    }
  };

  // handle delete a order message
  const handleDeleteAMessage = async (e, uniqueId, projectNumber) => {
    e.preventDefault();
    try {
      const res = await deleteAOrderMessage({
        uniqueId,
        projectNumber,
      }).unwrap();

      // socket.emit("delete-message", { messageId, userId: user?.id });
      toast.success("Message deleted successfully");
    } catch {
      toast.error("Failed to delete message");
    }
  };

  // handle reply text
  const handleReplyTo = (e, msg) => {
    e.preventDefault();
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
    dispatch(setReplyTo(replyObj));
  };

  // generate replied to function
  const generateRepliedTo = (msg) => {
    const {
      msgSenderUserRole,
      replySenderUserName,
      msgSenderUserName,
      replySenderUserRole,
    } = msg?.replyTo;

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

  return (
    <>
      <div className="flex max-h-[2000px] min-h-[800px] w-full flex-col rounded-lg shadow-btn-shadow">
        {/* Conversation Field */}
        <div className={`h-auto overflow-y-auto p-2 sm:p-5`}>
          {/* All message Container */}
          {messages
            ?.filter((m) => m?.projectNumber === projectDetails?.projectNumber)
            ?.map((msg, index) => (
              <div key={index}>
                {/* Final Delivery or First Delivery Attempt Text */}
                {msg?.deliverProject && (
                  <div className="mt-10 text-center">
                    {(projectDetails?.deliveryAttempt === 0 ||
                      msg?.deliverProject?.firstAttempt) && (
                      <>
                        <h1 className="text-xl font-semibold text-primary">
                          FIRST DELIVERY
                        </h1>
                        <p className="mx-auto mb-10 mt-2 w-3/4 text-sm sm:text-base">
                          Within next 48 hours you have to choose Revision or
                          Accept. If you don&apos;t choose any, then after 48
                          hours this project will be completed automatically.
                        </p>
                      </>
                    )}
                    {projectDetails?.deliveryAttempt > 0 &&
                      !msg?.deliverProject?.firstAttempt && (
                        <>
                          <h1 className="text-xl font-semibold text-primary">
                            FINAL DELIVERY
                          </h1>
                          <p className="mx-auto mb-10 mt-2 w-3/4 text-sm sm:text-base">
                            If you don&apos;t accept this delivery, this project
                            will automatically completed within the next 48
                            hours.
                          </p>
                        </>
                      )}
                  </div>
                )}
                {/* A conversation message Ui */}
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
                    {msg?.userImage && msg?.isFromAdmin === "USER" ? (
                      <img
                        src={msg?.userImage}
                        alt=""
                        className="size-full rounded-full object-cover"
                      />
                    ) : user?.role === "USER" &&
                      msg?.senderUserName === user?.userName &&
                      !msg?.userImage ? (
                      <div className="text-xl font-bold text-[#7c7c7c]/50">
                        {msg?.senderUserName?.charAt(0)?.toUpperCase()}
                      </div>
                    ) : user?.role === "USER" && msg?.isFromAdmin !== "USER" ? (
                      <img
                        src={logo}
                        alt=""
                        className="size-full rounded-full object-cover"
                      />
                    ) : user?.role !== "USER" &&
                      msg?.isFromAdmin !== "USER" &&
                      msg?.userImage ? (
                      <img
                        src={msg?.userImage}
                        alt=""
                        className="size-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="text-xl font-bold text-[#7c7c7c]/50">
                        {msg?.senderUserName?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="max-w-[calc(100%_-_42px)] grow">
                    <div className="mt-1 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <h1 className="text-sm font-semibold sm:text-base">
                          {msg?.senderUserName === user?.userName
                            ? "Me"
                            : msg?.senderUserName !== user?.userName &&
                                user?.role === "USER"
                              ? "Mahfujurrahm535"
                              : msg?.senderUserName}
                        </h1>
                        <p className="text-[10px] text-black/50 sm:text-xs">
                          {renderMessageDate(parseInt(msg?.timeAndDate))},{" "}
                          {renderMessageTime(parseInt(msg?.timeAndDate))}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-black/50 opacity-0 group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={(e) => handleReplyTo(e, msg)}
                        >
                          <BsFillReplyFill className="text-xl" />
                        </button>
                        {visibility[msg?.id] && msg?.senderId === user?.id && (
                          <button
                            type="button"
                            onClick={(e) =>
                              handleDeleteAMessage(
                                e,
                                msg?.uniqueId,
                                msg?.projectNumber,
                              )
                            }
                          >
                            <FaTrashAlt />
                          </button>
                        )}
                      </div>
                    </div>
                    {/* Here is the message text to preview */}
                    {msg?.messageText && (
                      <div className="mt-1 w-11/12">
                        <p className="text-sm sm:text-base">
                          {msg?.messageText}
                        </p>
                      </div>
                    )}
                    {msg?.imageComments?.length > 0 && (
                      <CommentsPreview commentedImages={msg?.imageComments} />
                    )}
                    {msg?.attachment?.length > 0 && (
                      <AttachmentsPreview files={msg?.attachment || []} />
                    )}
                    {msg?.additionalOffer && (
                      <AdditionalOfferPreview
                        messageObj={msg}
                        value={msg?.additionalOffer || {}}
                      />
                    )}
                    {msg?.deliverProject && (
                      <OrderDeliveryPreview
                        messageObj={msg}
                        data={msg?.deliverProject || {}}
                      />
                    )}
                    {msg?.extendDeliveryTime && (
                      <ExtendingDeliveryPreview
                        messageObj={msg}
                        value={msg?.extendDeliveryTime || {}}
                      />
                    )}
                    {msg?.cancelProject && (
                      <div className="mt-8">
                        <CancellingProjectPreview
                          messageObj={msg}
                          value={msg?.cancelProject || {}}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          <div ref={endOfMessagesRef} />
        </div>
        {/* Text Field Part */}
        {projectDetails?.projectStatus !== "Completed" &&
          projectDetails?.projectStatus !== "Canceled" && (
            <div className={`mt-auto px-3`}>
              <div className="rounded-t-md border border-b border-slate-300">
                {selectedImages?.length > 0 && (
                  <>
                    {uploadFilesLength > 0 && (
                      <p className="p-3 pb-0 text-xs">
                        Uploaded {uploadTempFilesLength}/{uploadFilesLength}
                      </p>
                    )}
                    <div className="preview-scroll-overflow-x flex gap-2 border-b p-[10px]">
                      {selectedImages?.map((image, index) => (
                        <div key={index} className="w-[120px]">
                          <div className="group relative">
                            {image?.url ? (
                              <FilePreview file={image} />
                            ) : (
                              <div className="flex h-[80px] w-full items-center justify-center bg-lightcream">
                                <CircleProgressBar
                                  precentage={image?.progress}
                                  circleWidth={50}
                                />
                              </div>
                            )}
                            {(isAdmin ||
                              image?.url ||
                              image?.progress === 100) && (
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
                            className="text-xs font-medium"
                            title={image?.name}
                          >
                            <GenerateName name={image?.name} />
                          </h1>
                          <span className="text-xs">
                            ({formatFileSize(image?.size)})
                          </span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                <div
                  className={`${quickResponse ? "h-[140px]" : "h-auto"} border-b border-slate-300 p-2`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap">
                    <div className="flex items-center gap-3 font-semibold">
                      Quick Response{" "}
                      <button
                        type="button"
                        className="bg-transparent"
                        onClick={() =>
                          updateItem("quickResponse", !quickResponse)
                        }
                      >
                        {quickResponse ? (
                          <IoIosArrowDown className="text-xl text-primary" />
                        ) : (
                          <IoIosArrowUp className="text-xl text-primary" />
                        )}
                      </button>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-medium">
                      {clientTimeAndDate && user?.role !== "USER" && (
                        <>
                          <p>
                            Local time: {clientTimeAndDate?.time},{" "}
                            {clientTimeAndDate?.date}
                          </p>
                          <Divider className="h-4 w-px !bg-black" />
                        </>
                      )}
                      {user?.role === "USER" && (
                        <>
                          <p>
                            Local time:{" "}
                            {renderMessageTime(parseInt(new Date().getTime()))},{" "}
                            {renderMessageDate(parseInt(new Date().getTime()))}
                          </p>
                          <Divider className="h-4 w-px !bg-black" />
                        </>
                      )}
                      <div>
                        {user?.role === "USER" && (
                          <p>{!isAdminOnline ? "Offline" : "Online"}</p>
                        )}
                        {isAdmin && (
                          <p>
                            {projectDetails?.user?.lastSeen
                              ? `Last seen: ${timeAgoTracker(projectDetails?.user?.lastSeen)}`
                              : "Online"}
                          </p>
                        )}
                      </div>
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
                          value={msg?.description}
                          onClick={handleChangeQuickMsg}
                        >
                          {msg?.title}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickMsgs(msg?.id)}
                        >
                          <IoIosArrowDown className="text-base text-gray-400" />
                        </button>
                        {qucikMsgBtnController === msg?.id && (
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
                              onClick={() => handleDeleteQuickMsg(msg?.id)}
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
                        replyTo?.replySenderUserName ===
                          replyTo?.msgSenderUserName
                          ? "You"
                          : replyTo?.replySenderUserName !==
                                replyTo?.msgSenderUserName &&
                              user?.role !== "USER"
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
                      onClick={() => dispatch(setReplyTo(null))}
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
                    disabled={isImageUploading}
                    type="button"
                    className="flex h-full w-[100px] items-center justify-center bg-primary text-sm font-semibold text-white disabled:bg-primary/50 sm:w-[120px] sm:text-base"
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
        {openAddMsgModal && (
          <AddQuickMsgModal handleClose={setOpenAddMsgModal} />
        )}
        {openOfferModal && (
          <AdditionalOfferModal
            handleClose={setOpenOfferModal}
            onOfferSubmit={socket}
          />
        )}
      </div>
      {projectDetails?.projectStatus !== "Completed" &&
        projectDetails?.projectStatus !== "Canceled" && (
          <p className="my-5 text-center">
            View conversation with{" "}
            {isAdmin ? (
              <Link to={`/inbox`} className="font-semibold text-primary">
                {clientDetails?.userName}
              </Link>
            ) : (
              <Link to={`/inbox`} className="font-semibold text-primary">
                mahfujurrahm535
              </Link>
            )}{" "}
            in your inbox
          </p>
        )}
    </>
  );
};

export default React.memo(OrderChatBox);
