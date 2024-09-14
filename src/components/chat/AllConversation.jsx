import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuClock3 } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import logo from "../../assets/images/MR Logo White.png";
import repeatIcon from "../../assets/svg/Repeat icon.svg";
import { formatTimeAgo } from "../../libs/timeFormatter";

const AllConversation = () => {
  const [selectedOption, setSelectedOption] = useState("AllConversations");
  const [openSearch, setOpenSearch] = useState(false);

  const handleCancelSearch = () => {
    setOpenSearch(false);
    // TODO : handle the search text clearing
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };
  console.log(selectedOption);

  const [chatList, setChatList] = useState([
    {
      id: 1,
      name: "John Doe",
      lastMessage: "Hi there!",
      lastMessageTime: new Date(Date.now() - 48920000005), //1 year ago
      unreadMessages: 2,
      starred: false,
      isOnline: true,
      isRepeatedClient: true,
      isNewClient: true,
      archived: false,
      customOffer: false,
    },
    {
      id: 2,
      name: "Shakespeare",
      lastMessage: "Hi there!",
      lastMessageTime: new Date(Date.now() - 3600000), // 1 hour ago
      unreadMessages: 2,
      starred: true,
      archived: false,
      customOffer: true,
    },
    {
      id: 3,
      name: "Mark Zuckerburg",
      lastMessage: "Hi there!",
      lastMessageTime: new Date(Date.now() - 60000), // 1 minute ago
      unreadMessages: 2,
      starred: true,
      archived: false,
      customOffer: true,
    },
    {
      id: 4,
      name: "Donald Trump",
      lastMessage: "Hi there!",
      lastMessageTime: new Date(Date.now()), // just now
      unreadMessages: 2,
      starred: true,
      archived: false,
      isOnline: true,
      customOffer: true,
    },
    {
      id: 5,
      name: "Puthin",
      lastMessage: "Hi there!",
      lastMessageTime: new Date(Date.now() - 1209600000), // 14 days ago
      unreadMessages: 2,
      starred: true,
      archived: false,
      customOffer: true,
    },
    {
      id: 6,
      name: "Mudi",
      lastMessage: "Hi there!",
      lastMessageTime: new Date(Date.now() - 1209600000), // 14 days ago
      unreadMessages: 2,
      starred: true,
      isRepeatedClient: true,
      archived: false,
      customOffer: true,
    },
    {
      id: 7,
      name: "Sheikh Hasina",
      lastMessage: "Hi there!",
      lastMessageTime: new Date(Date.now() - 1209600000), // 14 days ago
      unreadMessages: 2,
      starred: true,
      isOnline: true,
      archived: false,
      customOffer: true,
    },
    {
      id: 8,
      name: "John Doe",
      lastMessage: "Hi there!",
      lastMessageTime: new Date(Date.now() - 1209600000), // 14 days ago
      unreadMessages: 2,
      starred: true,
      isOnline: true,
      archived: false,
      isNewClient: true,
      customOffer: true,
    },
    {
      id: 9,
      name: "John Doe",
      lastMessage: "Hi there!",
      lastMessageTime: new Date(Date.now() - 1209600000), // 14 days ago
      unreadMessages: 2,
      starred: true,
      archived: false,
      customOffer: true,
    },
    {
      id: 10,
      name: "John Doe",
      lastMessage: "Hi there!",
      lastMessageTime: new Date(Date.now() - 1209600000), // 14 days ago
      unreadMessages: 2,
      starred: true,
      archived: false,
      customOffer: true,
    },
    {
      id: 11,
      name: "John Doe",
      lastMessage: "Hi there!",
      lastMessageTime: new Date(Date.now() - 1209600000), // 14 days ago
      unreadMessages: 2,
      starred: true,
      archived: false,
      customOffer: true,
    },
    {
      id: 12,
      name: "John Doe",
      lastMessage: "Hi there!",
      lastMessageTime: new Date(Date.now() - 1209600000), // 14 days ago
      unreadMessages: 2,
      starred: true,
      archived: false,
      customOffer: true,
    },
  ]);

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
          className={`border border-gray-300 p-2 font-medium outline-none ${openSearch && "hidden"}`}
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value="AllConversations">All Conversations</option>
          <option value="unread">Unread</option>
          <option value="starred">Starred</option>
          <option value="blockList">Block List</option>
          <option value="archived">Archived</option>
          <option value="customOffers">Custom Offers</option>
        </select>
      </div>
      <div className="chat-scrollbar flex-1 overflow-y-auto">
        {chatList.map((chat) => (
          <div
            key={chat.id}
            className="flex cursor-pointer items-center justify-between border-b p-4 hover:bg-lightcream/50"
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <img className="size-8 object-cover" src={logo} alt="logo" />
                {chat?.isRepeatedClient && (
                  <img
                    className={`absolute -top-1 left-1 size-2.5`}
                    src={repeatIcon}
                    alt="repeat icon"
                  />
                )}
                <span
                  className={`absolute bottom-0 right-0 size-2 rounded-full border border-white ${chat?.isOnline ? "bg-primary" : "bg-gray-400"}`}
                ></span>
              </div>
              <div>
                <p className="flex items-center gap-2 font-semibold">
                  {chat.name} <span className="text-secondary">{chat?.isNewClient && <LuClock3 />}</span>
                </p>
                <p className="text-sm">{chat.lastMessage}</p>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              {formatTimeAgo(chat.lastMessageTime)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllConversation;
