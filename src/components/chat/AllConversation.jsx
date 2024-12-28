import React, { useEffect, useMemo, useState } from "react";
import { IoIosStar } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAvailableChatUsersQuery,
  useLazyGetAllMessagesQuery,
} from "../../Redux/api/inboxApiSlice";
import {
  setChatData,
  setConversationUser,
} from "../../Redux/features/chatSlice";
import repeatIcon from "../../assets/svg/Repeat icon.svg";
import { configApi } from "../../libs/configApi";
import { connectSocket } from "../../libs/socketService";
import { formatTimeAgo } from "../../libs/timeFormatter";

const AllConversation = ({ closeToggle }) => {
  const slug = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { onlineUsers, token, user } = useSelector((state) => state.user);

  const { conversationUser } = useSelector((state) => state.chat);

  const socket = connectSocket(`${configApi.socket}`, token);

  const [selectedOption, setSelectedOption] = useState("AllConversations");
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [chatList, setChatList] = useState([]);

  const { data: availableUsers } = useGetAvailableChatUsersQuery(user.id, {
    pollingInterval: 60000,
  });

  // getAllMessages
  const [triggerGetAllMessages, { data: getAllMessages }] =
    useLazyGetAllMessagesQuery();

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    if (getAllMessages) {
      dispatch(setChatData(getAllMessages));
    }
  }, [dispatch, getAllMessages]);

  useEffect(() => {
    if (availableUsers) {
      setChatList(availableUsers);
    }
  }, [availableUsers]);

  useEffect(() => {
    const handleSeenBy = (msg) => {
      // console.log("updated message", msg);
      setChatList((prev) =>
        prev.map((chat) => {
          if (chat.id === msg?.senderId) {
            // const isSeenByCurrentUser = msg?.seenBy?.includes(user.id);
            const isSeenByAdmin = msg?.isAdminSeen;
            return {
              ...chat,
              lastmessageinfo: {
                ...chat?.lastmessageinfo,
                totalUnseenMessage: isSeenByAdmin && 0,
              },
            };
          }
          return chat;
        }),
      );
    };

    const handleNewChatMessage = (msg) => {
      const shouldUpdate = !msg?.isAdminSeen; // Only update if the message is unseen
      if (!shouldUpdate) return; // Skip state update if conditions are not met

      setChatList((prev) =>
        prev.map((chat) => {
          if (chat.id === msg.userId) {
            // const isSeenByCurrentUser = msg?.seenBy?.includes(user.id);
            const isSeenByAdmin = msg?.isAdminSeen;
            const seenedUser = conversationUser === msg.userId;

            return {
              ...chat,
              lastmessageinfo: {
                ...chat.lastmessageinfo,
                messageText: msg.messageText,
                createdAt: msg.createdAt,
                senderUserName: msg.senderUserName,
                totalUnseenMessage: seenedUser
                  ? 0
                  : isSeenByAdmin
                    ? 0
                    : chat.lastmessageinfo.totalUnseenMessage + 1,
              },
            };
          }
          return chat;
        }),
      );
    };

    socket?.on("getSeenBy", handleSeenBy);
    socket?.on("newChatMessage", handleNewChatMessage);

    // Cleanup on component unmount
    return () => {
      socket?.off("getSeenBy", handleSeenBy);
      socket?.off("newChatMessage", handleNewChatMessage);
    };
  }, [socket, user.id, conversationUser]);

  // Filter chat list based on selected option
  const filteredChatList = useMemo(() => {
    let filteredChats = chatList;

    switch (selectedOption) {
      case "unread":
        filteredChats = filteredChats?.filter(
          (chat) => chat?.lastmessageinfo?.totalUnseenMessage > 0,
        );
        break;
      case "starred":
        filteredChats = filteredChats?.filter((chat) => chat.isBookMarked);
        break;
      case "blockList":
        filteredChats = filteredChats?.filter((chat) => chat.isBlocked);
        break;
      case "archived":
        filteredChats = filteredChats?.filter((chat) => chat.isArchived);
        break;
      case "customOffers":
        filteredChats = filteredChats?.filter((chat) => chat.customOffer);
        break;
      case "AllConversations":
        filteredChats = filteredChats?.filter(
          (chat) => !chat.isArchived && !chat.isBlocked,
        );
        break;
      default:
        filteredChats = filteredChats?.filter(
          (chat) => !chat.isArchived && !chat.isBlocked,
        );
        break;
    }

    // Apply search filter if search is active
    if (searchQuery.trim() !== "") {
      filteredChats = filteredChats.filter((chat) =>
        chat?.userName?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Sort by lastmessageinfo.createdAt in descending order
    return filteredChats?.sort((a, b) => {
      const dateA = new Date(a?.lastmessageinfo?.createdAt).getTime();
      const dateB = new Date(b?.lastmessageinfo?.createdAt).getTime();
      return dateB - dateA; // Latest messages first
    });
  }, [chatList, selectedOption, searchQuery]);

  // const filteredChatList = getFilteredChatList();
  const handleCancelSearch = () => {
    setOpenSearch(false);
    setSearchQuery("");
  };

  const handleChatOpen = (id, userName) => {
    // if (!slug?.userName) navigate(`${userName}`);
    dispatch(setConversationUser(id));
    triggerGetAllMessages({
      receiverId: id,
    });
    closeToggle(false);
  };

  useEffect(() => {
    // Cleanup function to reset conversationUser
    return () => {
      dispatch(setConversationUser(""));
    };
  }, [dispatch]);

  const archivedCount = chatList.reduce(
    (count, chat) => count + (chat.isArchived ? 1 : 0),
    0,
  );

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-[70px] items-center justify-between bg-primary/20 px-4">
        {!openSearch && (
          <IoSearchOutline
            className="cursor-pointer text-2xl"
            onClick={() => setOpenSearch(true)}
          />
        )}
        {openSearch && (
          <div className="flex w-full items-stretch border border-gray-300 outline-none">
            <input
              type="text"
              className="w-full p-2 text-sm font-medium outline-none"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="border-l bg-white px-1"
              onClick={handleCancelSearch}
            >
              <RxCross2 className="text-2xl text-gray-700" />
            </button>
          </div>
        )}
        <select
          name="conversationList"
          id="conversationList"
          className={`border border-gray-300 bg-white p-2 font-medium outline-none ${openSearch && "hidden"}`}
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="AllConversations">All Conversations</option>
          <option value="unread">Unread</option>
          <option value="starred">Starred</option>
          <option value="blockList">Block List</option>
          <option value="archived">
            Archived {archivedCount > 0 && `- ${archivedCount}`}
          </option>
          <option value="customOffers">Custom Offers</option>
        </select>
      </div>

      <div className="chat-scrollbar flex-1 overflow-y-auto">
        {filteredChatList?.length > 0 ? (
          filteredChatList?.map((chat) => {
            const isOnline = onlineUsers?.some(
              (user) => user?.userId === chat?.id,
            );

            const {
              senderUserName,
              messageText,
              customOffer,
              attachment,
              totalUnseenMessage,
              createdAt,
            } = chat?.lastmessageinfo || {};
            const sameUser = senderUserName === user?.userName;
            return (
              <div
                key={chat?.id}
                className={`flex cursor-pointer items-center justify-between gap-2 border-b p-4 hover:bg-lightcream/50 ${chat?.id === conversationUser && "bg-lightcream/50"}`}
                onClick={() => handleChatOpen(chat?.id, chat?.userName)}
              >
                <div className="flex flex-shrink-0 items-center gap-4">
                  <div className="relative">
                    {chat?.image ? (
                      <img
                        className="size-8 rounded-full object-cover"
                        src={chat?.image}
                        alt="logo"
                      />
                    ) : (
                      <div className="flex size-8 items-center justify-center rounded-full bg-[#ffefef]/80 object-cover text-xl font-bold text-[#3b3b3b]/50">
                        {chat?.userName?.trim()?.charAt(0)?.toUpperCase()}
                      </div>
                    )}
                    {chat?.status === "Repeated Client" && (
                      <img
                        className={`absolute -top-1 left-1 size-3`}
                        src={repeatIcon}
                        alt="repeat icon"
                      />
                    )}
                    <span
                      className={`absolute bottom-0 right-0 size-2 rounded-full border border-white ${isOnline ? "bg-primary" : "bg-gray-400"}`}
                    ></span>
                  </div>
                  <div>
                    <p className="flex items-center gap-2 font-semibold">
                      {chat?.userName}{" "}
                      <span className="text-secondary">
                        {chat?.isNewMessage && <LuClock3 />}
                      </span>
                    </p>
                    <p
                      title={
                        customOffer
                          ? "You just sent a new Custom Offer"
                          : attachment
                            ? `Attachment!`
                            : messageText
                      }
                      className={`${totalUnseenMessage > 0 && "font-bold"} max-w-[180px] truncate text-[12px] sm:max-w-[250px] md:max-w-[80px] lg:max-w-[150px]`}
                    >
                      {/* -----for user name printing in user last message----- */}
                      {senderUserName
                        ? `${sameUser ? "Me" : senderUserName} :
                       ${customOffer ? "You just sent a new Custom Offer" : attachment ? `Attachment...` : messageText}`
                        : messageText}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end gap-1">
                    <p className="text-[12px] text-gray-500">
                      {createdAt && formatTimeAgo(createdAt)}
                    </p>
                    {/* REVIEW:-------------total unseen message count---------------  */}
                    {/* {totalUnseenMessage > 0 && (
                      <span className="size-6 rounded-full bg-primary text-center text-[10px] leading-[24px] text-white">
                        {totalUnseenMessage}
                      </span>
                    )} */}
                  </div>
                  {chat?.isBookMarked && (
                    <IoIosStar className="text-lg text-primary" />
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-4 text-center text-gray-500">No chats found</div>
        )}
      </div>
    </div>
  );
};

export default AllConversation;
