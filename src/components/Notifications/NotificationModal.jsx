import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineNotifications } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetNotificationQuery,
  useNotificationMakeSeenMutation,
} from "../../Redux/api/apiSlice";
import { setOnlineUsers } from "../../Redux/features/userSlice";
import useOutsideClick from "../../hooks/useOutsideClick";
import { configApi } from "../../libs/configApi";
import { connectSocket } from "../../libs/socketService";
import { formatTimeAgo } from "../../libs/timeFormatter";
import GetNotificationTitle from "./GetNotificationTitle";

const NotificationModal = ({ close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const notificalModal = useRef(null);

  const { data: notificationData } = useGetNotificationQuery();
  const { onlineUsers, token } = useSelector((state) => state.user);

  const socket = connectSocket(`${configApi.socket}`, token);
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

  useOutsideClick(notificalModal, () => dispatch(close(false)));

  // update the notification seen status
  const [makeSeenNotifications] = useNotificationMakeSeenMutation();

  useEffect(() => {
    const updateNotifications = async () => {
      try {
        await makeSeenNotifications().unwrap();
      } catch (error) {}
    };

    updateNotifications();
  }, [makeSeenNotifications]);
  return (
    <div
      className="static w-full max-w-[400px] rounded-md bg-white shadow-lg sm:absolute sm:top-10 md:right-0 md:w-[450px]"
      ref={notificalModal}
    >
      <div>
        <h2 className="flex items-center justify-between gap-2 border-b p-4 text-base font-semibold text-black md:justify-start">
          <MdOutlineNotifications className="text-2xl" /> Notifications (
          {notificationData?.length ?? 0})
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
          {notificationData
            ?.map((notification) => {
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

              // for navigate to the destination of notification
              const handleClick = () => {
                if (notification?.payload?.type === "OrderMessage") {
                  navigate(`/order/${notification?.payload?.projectNumber}`);
                  dispatch(close(false));
                } else if (notification?.payload?.type === "Message") {
                  navigate(`/inbox`);
                  dispatch(close(false));
                }
              };
              return (
                <div
                  key={notification?.id}
                  onClick={handleClick}
                  className="flex items-center justify-between gap-4 border-b p-4 last:border-b-0"
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
                        <div className="text-3xl font-bold text-[#7c7c7c]/50 sm:text-4xl">
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
                    <Link
                      className="w-24 flex-grow-0"
                      to={`/order/${notification?.payload?.projectNumber}`}
                      onClick={() => dispatch(close(false))}
                    >
                      <img
                        className="w-full rounded-lg object-cover"
                        src={notification?.payload?.thumbnailUrl}
                        alt="ordered image"
                      />
                    </Link>
                  )}
                </div>
              );
            })
            .reverse()}
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
