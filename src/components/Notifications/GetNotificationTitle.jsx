import React from "react";

const GetNotificationTitle = ({ type, userName }) => {
  const notificationTemplates = {
    order: (
      <div className="ml-4 flex-1">
        <p className="text-sm font-medium sm:text-base">
          {`You have a new `}
          <span className="font-bold">{type}</span>
          {` from `}
          <span className="font-bold">{userName}</span>
          {`. Get Started.`}
        </p>
      </div>
    ),
    review: (
      <div className="ml-4 flex-1">
        <p className="text-sm font-medium sm:text-base">
          {`You have a new `}
          <span className="font-bold">{type}</span>
          {` from `}
          <span className="font-bold">{userName}</span>
          {`. Get Started.`}
        </p>
      </div>
    ),
    rating: (
      <div className="ml-4 flex-1">
        <p className="text-sm font-medium sm:text-base">
          {`You have a new `}
          <span className="font-bold">{type}</span>
          {` from `}
          <span className="font-bold">{userName}</span>
          {`. Get Started.`}
        </p>
      </div>
    ),
    revision: (
      <div className="ml-4 flex-1">
        <p className="text-sm font-medium sm:text-base">
          {`You have a new `}
          <span className="font-bold">{type}</span>
          {` from `}
          <span className="font-bold">{userName}</span>
          {`. Get Started.`}
        </p>
      </div>
    ),
    reminder: (
      <div className="ml-4 flex-1">
        <p className="text-sm font-medium sm:text-base">
          {`You have a new `}
          <span className="font-bold">{type}</span>
          {` from `}
          <span className="font-bold">{userName}</span>
          {`. Get Started.`}
        </p>
      </div>
    ),
    orderMessage : (
      <div className="ml-4 flex-1">
        <p className="text-sm font-medium sm:text-base">
          {`You have a new `}
          <span className="font-bold">{type}</span>
          {` from `}
          <span className="font-bold">{userName}</span>
          {`. Get Started.`}
        </p>
      </div>
    ),
    projectStart : (
      <div className="ml-4 flex-1">
        <p className="text-sm font-medium sm:text-base">
          {`You have a new `}
          <span className="font-bold">{type}</span>
          {` from `}
          <span className="font-bold">{userName}</span>
          {`. Get Started.`}
        </p>
      </div>
    ),
    instructions : (
      <div className="ml-4 flex-1">
        <p className="text-sm font-medium sm:text-base">
          {`You have a new `}
          <span className="font-bold">{type}</span>
          {` from `}
          <span className="font-bold">{userName}</span>
          {`. Get Started.`}
        </p>
      </div>
    ),
  };

  return notificationTemplates[type] || <p>General Notification</p>;
};

export default GetNotificationTitle;
