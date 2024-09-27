import React, { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";

const NotificationPopper = ({ logo, type, userName, onClose, isOnline }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const letterLogo = userName?.trim().charAt(0).toUpperCase();

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

  return (
    <div
      className={`fixed bottom-4 right-4 z-[999] flex max-w-80 items-center rounded-lg bg-white p-4 shadow-xl sm:max-w-[400px] ${
        isVisible ? "slide-in-out" : "slide-out"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative mx-auto flex size-10 items-center justify-center rounded-full border border-gray-300 bg-[#ffefef]/30 sm:size-14">
        {logo ? (
          <img
            className="h-full w-full rounded-full object-cover"
            src={logo}
            alt="Sender Logo"
          />
        ) : (
          <div className="text-3xl font-bold text-[#7c7c7c]/50 sm:text-4xl">
            {letterLogo}
          </div>
        )}
        <span
          className={`absolute bottom-0 right-1 size-3 rounded-full border border-white ${isOnline ? "bg-primary" : "bg-gray-400"}`}
        ></span>
      </div>
      <div className="ml-4 flex-1">
        <p className="text-sm font-medium sm:text-base">
          {`You have a new `}
          <span className="font-bold">{type}</span>
          {` from `}
          <span className="font-bold">{userName}</span>
          {`. Get Started.`}
        </p>
      </div>
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
