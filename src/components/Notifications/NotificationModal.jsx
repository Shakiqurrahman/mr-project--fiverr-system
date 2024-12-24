import React, { useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineNotifications } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import { configApi } from "../../libs/configApi";
import { connectSocket } from "../../libs/socketService";
import { formatTimeAgo } from "../../libs/timeFormatter";
import { useGetNotificationQuery } from "../../Redux/api/apiSlice";
import { setOnlineUsers } from "../../Redux/features/userSlice";
import GetNotificationTitle from "./GetNotificationTitle";

const NotificationModal = ({ close }) => {
  const dispatch = useDispatch();
  const notificalModal = useRef(null);
  const unReadNotifications = 0;

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
  return (
    <div
      className="static max-w-[400px] rounded-md bg-white shadow-lg sm:absolute sm:right-0 sm:top-10 md:w-[450px]"
      ref={notificalModal}
    >
      <div>
        <h2 className="flex items-center justify-between gap-2 border-b p-4 text-base font-semibold text-black sm:justify-start">
          <MdOutlineNotifications className="text-2xl" /> Notifications (
          {unReadNotifications})
          <button
            className="block sm:hidden"
            type="button"
            onClick={() => dispatch(close(false))}
          >
            <IoClose className="text-2xl" />
          </button>
        </h2>

        {/* List of unread notifications */}
        <div className="max-h-[400px] overflow-y-auto">
          {notificationData?.map((notification) => {
            const letterLogo = notification?.payload?.userName
              ?.trim()
              ?.charAt(0)
              ?.toUpperCase();

            const notificationTitle = GetNotificationTitle({
              type: notification?.payload?.type,
              userName: notification?.payload?.userName,
              message: notification?.message,
              rating: notification?.rating,
              commentQuantity: notification?.commentQuantity,
            });
            return (
              <div
                key={notification?.id}
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
                  <img
                    className="size-10 flex-grow-0 rounded-lg object-cover"
                    src={notification?.payload?.thumbnailUrl}
                    alt="ordered image"
                  />
                )}
              </div>
            );
          })}
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
