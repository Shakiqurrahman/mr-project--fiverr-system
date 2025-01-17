import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetNotificationCountQuery } from "../Redux/api/apiSlice";
import { setNotificationBubble } from "../Redux/features/utilSlice";
import NotificationPopper from "../components/Notifications/NotificationPopper";
import { configApi } from "./configApi";
import { connectSocket } from "./socketService";

const NotificationWrapper = ({ children }) => {
  const dispatch = useDispatch();
  const [path, setPath] = useState(window.location.pathname);

  const { conversationUser } = useSelector((state) => state.chat);
  const { user } = useSelector((state) => state.user);
  const token = Cookies.get("authToken");
  const socket = connectSocket(`${configApi.socket}`, token);

  const isAdmin = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(user?.role);

  const [notification, setNotification] = useState(null);
  const [showNotification, setShowNotification] = useState(false);

  let projectNumber;
  if (path.startsWith("/order/")) {
    projectNumber = path.split("/order/")[1];
  }

  const { data: notificationBubbleCount } = useGetNotificationCountQuery(null, {
    skip: !user,
    pollingInterval: 30000, //30 sec
  });

  useEffect(() => {
    const handlePathChange = () => setPath(window.location.pathname);

    // Override pushState and replaceState
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function (...args) {
      originalPushState.apply(history, args);
      window.dispatchEvent(new Event("locationchange"));
    };

    history.replaceState = function (...args) {
      originalReplaceState.apply(history, args);
      window.dispatchEvent(new Event("locationchange"));
    };

    // Listen for custom events
    window.addEventListener("locationchange", handlePathChange);
    window.addEventListener("popstate", handlePathChange); // Back/forward buttons

    return () => {
      window.removeEventListener("locationchange", handlePathChange);
      window.removeEventListener("popstate", handlePathChange);

      // Restore original methods to avoid side effects
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  // Listen to new notifications from the server
  useEffect(() => {
    socket?.on("get:notification", (notification) => {
      if (user.role === "USER") {
        if (path && path === "/inbox" && notification?.type === "Message") {
          setNotification(null);
          setShowNotification(false);
        } else if (
          projectNumber &&
          projectNumber === notification?.projectNumber &&
          notification?.type === "OrderMessage"
        ) {
          setNotification(null);
          setShowNotification(false);
        } else {
          setNotification(notification);
          setShowNotification(true);
          dispatch(
            setNotificationBubble(
              notificationBubbleCount ? notificationBubbleCount : 1,
            ),
          ); // for showing the bubble if any notification arrise
        }
      } else if (isAdmin) {
        if (
          conversationUser &&
          notification?.senderId === conversationUser &&
          notification?.type === "Message"
        ) {
          setNotification(null);
          setShowNotification(false);
        } else if (
          projectNumber &&
          projectNumber === notification?.projectNumber &&
          notification?.type === "OrderMessage"
        ) {
          setNotification(null);
          setShowNotification(false);
        } else {
          setNotification(notification);
          setShowNotification(true);
          dispatch(setNotificationBubble(1)); // for showing the bubble if any notification arrise
        }
      }
    });
  }, [
    socket,
    conversationUser,
    notification,
    dispatch,
    path,
    projectNumber,
    user?.role,
    isAdmin,
  ]);

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
