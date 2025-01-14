import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationPopper from "../components/Notifications/NotificationPopper";
import { setNotificationBubble } from "../Redux/features/utilSlice";
import { configApi } from "./configApi";
import { connectSocket } from "./socketService";

const NotificationWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const path = window.location.pathname;
  const { conversationUser } = useSelector((state) => state.chat);
  const token = Cookies.get("authToken");
  const socket = connectSocket(`${configApi.socket}`, token);

  const [notification, setNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  let projectNumber;
  if (path.startsWith("/order/")) {
    projectNumber = path.split("/order/")[1];
  }

  // Listen to new notifications from the server
  useEffect(() => {
    socket?.on("get:notification", (notification) => {
      console.log("🚀 notification:", notification)
      if (
        conversationUser &&
        notification?.senderId === conversationUser &&
        notification?.type === "Message"
      ) {
        setNotification(null);
        setShowNotification(false);
      }
      if (
        projectNumber &&
        projectNumber === notification?.projectNumber &&
        notification?.type === "OrderMessage"
      ) {
        setNotification(null);
        setShowNotification(false);
        dispatch(setNotificationBubble(1)); // for showing the bubble if any notification arrise
      }
      //   else if (
      //     conversationUser &&
      //     notification?.senderId !== conversationUser &&
      //     notification?.type === "Message"
      //   ) {
      //     setNotification(notification);
      //     setShowNotification(true);
      //   }
      else {
        setNotification(notification);
        setShowNotification(true);
        dispatch(setNotificationBubble(1)); // for showing the bubble if any notification arrise
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
