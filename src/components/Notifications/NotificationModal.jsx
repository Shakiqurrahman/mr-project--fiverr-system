import React, { useRef } from "react";
import { IoClose } from "react-icons/io5";
import { MdOutlineNotifications } from "react-icons/md";
import useOutsideClick from "../../hooks/useOutsideClick";

const NotificationModal = ({ close }) => {
  const notificalModal = useRef(null);
  const unReadNotifications = 15;

  const notifications = [
    {
      id: 1,
      userName: "shake75",
      avatar: "",
      title: "You have a new order from shake75",
      date: "15d",
      orderedImage: "",
      isOnline: true,
      type: "order",
    },
    {
      id: 2,
      userName: "shakil",
      avatar: "",
      title: "You have a new order from shakil",
      date: "1h",
      orderedImage:
        "https://media.vanityfair.com/photos/5f5245d91e10df7a77868af6/master/pass/avatar-the-last-airbender.jpg",
      isOnline: false,
      type: "order",
    },
    {
      id: 3,
      userName: "shakil",
      avatar:
        "https://media.gq.com/photos/627d37fbbad17dc46fce8158/4:3/w_2507,h_1880,c_limit/MCDAVAT_FE021.jpg",
      title: "Shakespeare: Red is the logos Yellow is the verbiage.",
      date: "15min",
      orderedImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_gaxAkYYDw8UfNleSC2Viswv3xSmOa4bIAQ&s",
      isOnline: false,
      type: "review",
    },
    {
      id: 4,
      userName: "Soumik",
      avatar:
        "https://media.gq.com/photos/627d37fbbad17dc46fce8158/4:3/w_2507,h_1880,c_limit/MCDAVAT_FE021.jpg",
      title: "Shakespeare: Red is the logos Yellow is the verbiage.",
      date: "15min",
      type: "rating",
      orderedImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_gaxAkYYDw8UfNleSC2Viswv3xSmOa4bIAQ&s",
      isOnline: false,
    },
  ];

  const letterLogo = notifications?.userName?.trim().charAt(0).toUpperCase();

  useOutsideClick(notificalModal, () => close(false));
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
            onClick={() => close(false)}
          >
            <IoClose className="text-2xl" />
          </button>
        </h2>

        {/* List of unread notifications */}
        <div className="max-h-[400px] overflow-y-auto">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="flex items-center gap-4 border-b p-4 last:border-b-0"
            >
              <div className="flex items-center gap-2">
                {/* avatar  */}
                <div className="relative mx-auto flex size-10 items-center justify-center rounded-full border border-gray-300 bg-[#ffefef]/30 sm:size-14">
                  {notification.avatar ? (
                    <img
                      className="h-full w-full rounded-full object-cover"
                      src={notification.avatar}
                      alt="Sender Logo"
                    />
                  ) : (
                    <div className="text-3xl font-bold text-[#7c7c7c]/50 sm:text-4xl">
                      {letterLogo}
                    </div>
                  )}
                  <span
                    className={`absolute bottom-0 right-1 size-3 rounded-full border border-white ${notification.isOnline ? "bg-primary" : "bg-gray-400"}`}
                  ></span>
                </div>

                {/* msg  */}
                <div className="flex flex-1 flex-col gap-2">
                  <p className="line-clamp-3 text-base font-medium text-gray-900">
                    {notification?.title}
                  </p>
                  <p className="text-sm text-gray-600">{notification?.date}</p>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
