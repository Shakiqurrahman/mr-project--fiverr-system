import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NotificationPopper from "../components/Notifications/NotificationPopper";
import { configApi } from "./configApi";
import { connectSocket } from "./socketService";

const NotificationWrapper = ({ children }) => {
  const { conversationUser } = useSelector((state) => state.chat);
  const token = Cookies.get("authToken");
  const socket = connectSocket(`${configApi.socket}`, token);

  const [notification, setNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  //   useEffect(() => {
  //     if (conversationUser) {

  //     }
  //   }, [notification, conversationUser]);

  // Listen to new notifications from the server
  useEffect(() => {
    socket?.on("get:notification", (notification) => {
      console.log("notification", notification);
      if (
        conversationUser &&
        notification?.senderId === conversationUser &&
        notification?.type === "Message"
      ) {
        setNotification(null);
        setShowNotification(false);
      } else if (
        conversationUser &&
        notification?.senderId !== conversationUser &&
        notification?.type === "Message"
      ) {
        setNotification(notification);
        setShowNotification(true);
      } else {
        setNotification(notification);
        setShowNotification(true);
      }
    });
  }, [socket, conversationUser, notification]);

  return (
    <>
      {children}
      {showNotification && (
        <NotificationPopper
          onClose={() => setShowNotification(false)}
          notification={notification}
        />
      )}
    </>
  );
};

export default NotificationWrapper;
