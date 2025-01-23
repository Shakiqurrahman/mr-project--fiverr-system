import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineNotifications } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useGetNotificationCountQuery,
  useGetNotificationQuery,
  useNotificationMakeSeenMutation,
} from "../../Redux/api/apiSlice";
import { setOnlineUsers } from "../../Redux/features/userSlice";
import { setNotificationBubble } from "../../Redux/features/utilSlice";
import useOutsideClick from "../../hooks/useOutsideClick";
import { configApi } from "../../libs/configApi";
import { connectSocket } from "../../libs/socketService";
import { formatTimeAgo } from "../../libs/timeFormatter";
import GetNotificationTitle from "./GetNotificationTitle";

const NotificationModal = ({ close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notificalModal = useRef(null);

  const { onlineUsers, token, user } = useSelector((state) => state.user);
  const { data: notificationData, isLoading } = useGetNotificationQuery(null, {
    skip: !user,
  });

  const socket = connectSocket(`${configApi.socket}`, token);
  // all avaliable users
  useEffect(() => {
    socket?.emit("view-online-users");
    socket?.on("online-users", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });
  }, [socket, dispatch]);

  const isUserOnline = (userId) => {
    return onlineUsers?.some((onlineUser) => onlineUser.userId === userId);
  };

  useOutsideClick(notificalModal, () => dispatch(close(false)));

  const { data: notificationBubbleCount } = useGetNotificationCountQuery(null, {
    skip: !user,
  });
  // update the notification seen status
  const [makeSeenNotifications] = useNotificationMakeSeenMutation();

  const updateNotificationById = async (id) => {
    try {
      await makeSeenNotifications(id).unwrap();
    } catch (error) {}
  };
  return (
    <div
      className="static w-full max-w-[400px] overflow-hidden rounded-md bg-white shadow-lg sm:absolute sm:top-10 md:right-0 md:w-[450px]"
      ref={notificalModal}
    >
      <div>
        <h2 className="flex items-center justify-between gap-2 border-b p-4 text-base font-semibold text-black md:justify-start">
          <MdOutlineNotifications className="text-2xl" /> Notifications (
          {notificationBubbleCount ?? 0})
          <button
            className="block md:hidden"
            type="button"
            onClick={() => dispatch(close(false))}
          >
            <IoClose className="text-2xl" />
          </button>
        </h2>

        {/* List of unread notifications */}
        <div className="max-h-[400px] overflow-y-auto">
          {isLoading ? (
            <p className="p-4 text-center text-black">Loading...</p>
          ) : (
            notificationData?.map((notification) => {
              const letterLogo = notification?.payload?.senderUserName
                ?.trim()
                ?.charAt(0)
                ?.toUpperCase();

              const notificationTitle = GetNotificationTitle({
                type: notification?.payload?.type,
                userName: notification?.payload?.senderUserName,
                message: notification?.message,
                rating: notification?.payload?.rating,
                commentQuantity: notification?.payload?.commentQuantity,
                hours: notification?.payload?.hours,
                days: notification?.payload?.days,
              });

              let isSeen;
              if (user?.role === "USER") {
                isSeen = notification?.isClientSeen;
              } else {
                isSeen = notification?.isAdminSeen?.includes(user?.id);
              }

              // for navigate to the destination of notification
              const handleClick = (id) => {
                if (!isSeen) {
                  updateNotificationById(id); // make the notification status seen
                }
                if (notification?.payload?.type === "OrderMessage") {
                  navigate(`/order/${notification?.payload?.projectNumber}`);
                  dispatch(close(false));
                } else if (notification?.payload?.type === "Message") {
                  navigate(`/inbox`);
                  dispatch(close(false));
                } else if (notification?.payload?.projectNumber) {
                  navigate(`/order/${notification?.payload?.projectNumber}`);
                  dispatch(close(false));
                }
                dispatch(setNotificationBubble(0));
              };
              return (
                <div
                  key={notification?.id}
                  onClick={() => handleClick(notification?.id)}
                  className={`flex cursor-pointer items-center justify-between gap-4 border-b ${isSeen ? "bg-white" : "bg-lightcream/50"} p-4 last:border-b-0`}
                >
                  <div className="flex items-center gap-2">
                    {/* avatar  */}
                    <div className="relative mx-auto flex size-10 items-center justify-center rounded-full border border-gray-300 bg-[#ffefef]/30 sm:size-14">
                      {notification?.payload?.avatar ? (
                        <img
                          className="h-full w-full rounded-full object-cover"
                          src={notification?.payload?.avatar}
                          alt="Sender Logo"
                        />
                      ) : (
                        <div className="select-none text-3xl font-bold text-[#7c7c7c]/50 sm:text-4xl">
                          {letterLogo}
                        </div>
                      )}
                      <span
                        className={`absolute bottom-0 right-1 size-3 rounded-full border border-white ${isUserOnline(notification?.payload?.userId) ? "bg-primary" : "bg-gray-400"}`}
                      ></span>
                    </div>

                    {/* msg  */}
                    <div className="flex flex-1 flex-col gap-2">
                      <div>{notificationTitle}</div>
                      {notification?.payload?.createdAt && (
                        <p className="text-sm text-gray-600">
                          {formatTimeAgo(notification?.payload?.createdAt)}
                        </p>
                      )}
                    </div>
                  </div>
                  {notification?.payload?.thumbnailUrl && (
                    <div className="w-12 flex-shrink-0">
                      <img
                        className="w-full rounded-lg object-cover"
                        src={notification?.payload?.thumbnailUrl}
                        alt="ordered image"
                      />
                    </div>
                  )}
                </div>
              );
            })
          )}
          {notificationData?.length === 0 && (
            <p className="py-3 text-center text-black">
              No notifications found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
