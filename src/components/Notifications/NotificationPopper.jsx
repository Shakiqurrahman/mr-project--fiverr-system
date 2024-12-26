import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { configApi } from "../../libs/configApi";
import { connectSocket } from "../../libs/socketService";
import { setOnlineUsers } from "../../Redux/features/userSlice";
import GetNotificationTitle from "./GetNotificationTitle";

const NotificationPopper = ({
  logo,
  type,
  userName,
  onClose,
  notification,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const dispatch = useDispatch();

  const { onlineUsers, token } = useSelector((state) => state.user);
  const socket = connectSocket(`${configApi.socket}`, token);

  // const [notification, setNotification] = useState(null);

  const letterLogo = notification?.senderUserName
    ?.trim()
    .charAt(0)
    .toUpperCase();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isHovered) {
        setIsVisible(false);
        setTimeout(onClose, 300);
      }
    }, 3000); // Auto close after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose, isHovered]);

  // Handle mouse enter and leave
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  // Listen to new notifications from the server
  const notificationTitle = GetNotificationTitle({
    type: notification?.type,
    message: notification?.message,
    rating: notification?.rating,
    commentQuantity: notification?.commentQuantity,
    userName: notification?.senderUserName,
    hours: notification?.hours,
    days: notification?.days,
  });

  // all avaliable users
  useEffect(() => {
    socket?.emit("view-online-users");
    socket?.on("online-users", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });
  }, [socket, dispatch]);

  const isUserOnline = (userId) => {
    return onlineUsers.some((onlineUser) => onlineUser.userId === userId);
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-[999] flex max-w-80 items-center rounded-lg bg-white p-4 shadow-xl sm:max-w-[400px] ${
        isVisible ? "slide-in-out" : "slide-out"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative mx-auto flex size-10 items-center justify-center rounded-full border border-gray-300 bg-[#ffefef]/30 sm:size-14">
        {notification?.avatar ? (
          <img
            className="h-full w-full rounded-full object-cover"
            src={notification?.avatar}
            alt="Sender Logo"
          />
        ) : (
          <div className="text-3xl font-bold text-[#7c7c7c]/50 sm:text-4xl">
            {letterLogo}
          </div>
        )}
        {notification?.userId && (
          <span
            className={`absolute bottom-0 right-1 size-3 rounded-full border border-white ${isUserOnline(notification?.userId) ? "bg-primary" : "bg-gray-400"}`}
          ></span>
        )}
      </div>
      <div className="ml-4 flex-1">{notificationTitle}</div>
      <button
        className="ml-4 text-gray-600 hover:text-gray-800"
        onClick={handleMouseLeave}
      >
        <IoCloseSharp className="text-2xl" />
      </button>
    </div>
  );
};

export default NotificationPopper;
