import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import logo from "../../assets/images/MR Logo White.png";
import { formatTimeAgo } from "../../libs/timeFormatter";

const AllConversation = () => {
  const [selectedOption, setSelectedOption] = useState("AllConversations");
  const [openSearch, setOpenSearch] = useState(false);

  const handleCancelSearch = () => {
    setOpenSearch(false);
    // TODO : handle the search text clearing
  }

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
      archived: false,
      customOffer: false,
    },
    {
      id: 2,
      name: "John Doe",
      lastMessage: "Hi there!",
      lastMessageTime: new Date(Date.now() - 3600000), // 1 hour ago
      unreadMessages: 2,
      starred: true,
      archived: false,
      customOffer: true,
    },
    {
      id: 3,
      name: "John Doe",
      lastMessage: "Hi there!",
      lastMessageTime: new Date(Date.now() - 60000), // 1 minute ago
      unreadMessages: 2,
      starred: true,
      archived: false,
      customOffer: true,
    },
    {
      id: 4,
      name: "John Doe",
      lastMessage: "Hi there!",
      lastMessageTime: new Date(Date.now()), // just now
      unreadMessages: 2,
      starred: true,
      archived: false,
      customOffer: true,
    },
    {
      id: 5,
      name: "John Doe",
      lastMessage: "Hi there!",
      lastMessageTime: new Date(Date.now() - 1209600000), // 14 days ago
      unreadMessages: 2,
      starred: true,
      archived: false,
      customOffer: true,
    },
    {
      id: 6,
      name: "John Doe",
      lastMessage: "Hi there!",
      lastMessageTime: new Date(Date.now() - 1209600000), // 14 days ago
      unreadMessages: 2,
      starred: true,
      archived: false,
      customOffer: true,
    },
    {
      id: 7,
      name: "John Doe",
      lastMessage: "Hi there!",
      lastMessageTime: new Date(Date.now() - 1209600000), // 14 days ago
      unreadMessages: 2,
      starred: true,
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
      archived: false,
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
    <div className="flex h-[100%] flex-col">
      <div className="flex h-[70px] items-center justify-between bg-primary/20 px-4">
        {!openSearch && (
          <IoSearchOutline
            className="text-2xl"
            onClick={() => setOpenSearch(true)}
          />
        )}
        {openSearch && (
          <div className="flex w-full items-stretch border border-gray-300  outline-none">
            <input
              type="text"
              className="w-full p-2 font-medium text-sm outline-none"
              placeholder="Search..."
            />
            <button className="bg-white border-l px-1" onClick={handleCancelSearch}>
              <RxCross2 className="text-2xl text-gray-700"/>
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
              <img className="size-8" src={logo} alt="logo" />
              <div>
                <p className="font-semibold">{chat.name}</p>
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
