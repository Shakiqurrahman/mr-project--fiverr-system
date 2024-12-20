import React, { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineNotifications } from "react-icons/md";
import { useDispatch } from "react-redux";
import useOutsideClick from "../../hooks/useOutsideClick";
import GetNotificationTitle from "./GetNotificationTitle";

const NotificationModal = ({ close }) => {
  const dispatch = useDispatch();
  const notificalModal = useRef(null);
  const unReadNotifications = 0;

  // Note: client told me to make temporary blank
  // const notifications = [
  //   {
  //     id: 1,
  //     userName: "shake75",
  //     avatar: "",
  //     date: "15d",
  //     orderedImage: "",
  //     isOnline: true,
  //     type: "order",
  //   },
  //   {
  //     id: 2,
  //     userName: "shakil",
  //     avatar: "",
  //     date: "1h",
  //     orderedImage:
  //       "https://media.vanityfair.com/photos/5f5245d91e10df7a77868af6/master/pass/avatar-the-last-airbender.jpg",
  //     isOnline: false,
  //     type: "instructions",
  //   },
  //   {
  //     id: 3,
  //     userName: "shakil",
  //     avatar:
  //       "https://media.gq.com/photos/627d37fbbad17dc46fce8158/4:3/w_2507,h_1880,c_limit/MCDAVAT_FE021.jpg",
  //     date: "15min",
  //     orderedImage:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_gaxAkYYDw8UfNleSC2Viswv3xSmOa4bIAQ&s",
  //     isOnline: false,
  //     type: "review",
  //     rating: 5,
  //   },
  //   {
  //     id: 4,
  //     userName: "Soumik",
  //     avatar:
  //       "https://media.gq.com/photos/627d37fbbad17dc46fce8158/4:3/w_2507,h_1880,c_limit/MCDAVAT_FE021.jpg",
  //     message: "Red is the logos Yellow is the verbiage",
  //     date: "15min",
  //     type: "orderMessage",
  //     orderedImage:
  //       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_gaxAkYYDw8UfNleSC2Viswv3xSmOa4bIAQ&s",
  //     isOnline: false,
  //   },
  // ];

  const notifications = [];
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
          {notifications?.map((notification) => {
            const letterLogo = notification?.userName
              ?.trim()
              ?.charAt(0)
              ?.toUpperCase();

            const notificationTitle = GetNotificationTitle({
              type: notification?.type,
              userName: notification?.userName,
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
                    <span
                      className={`absolute bottom-0 right-1 size-3 rounded-full border border-white ${notification?.isOnline ? "bg-primary" : "bg-gray-400"}`}
                    ></span>
                  </div>

                  {/* msg  */}
                  <div className="flex flex-1 flex-col gap-2">
                    <div>{notificationTitle}</div>
                    <p className="text-sm text-gray-600">
                      {notification?.date}
                    </p>
                  </div>
                </div>
                {notification?.orderedImage && (
                  <img
                    className="size-10 flex-grow-0 rounded-lg object-cover"
                    src={notification?.orderedImage}
                    alt="ordered image"
                  />
                )}
              </div>
            );
          })}
          {notifications?.length === 0 && (
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
