import React from "react";

const GetNotificationTitle = ({
  type,
  userName,
  message,
  rating,
  commentQuantity,
  days,
  hours,
}) => {
  const notificationTemplates = {
    Order: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          {`You have a new `}
          <span className="font-bold">{type}</span>
          {` from `}
          <span className="font-bold">{userName}</span>
          {` and are awaiting buyer requirements.`}
        </p>
      </div>
    ),
    Review: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">{userName}</span>
          {` left a ${rating} star `}
          <span className="font-bold">{type}.</span>
        </p>
      </div>
    ),
    Revision: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">{userName}: requested </span>a change to
          your order. Review the feedback.
        </p>
      </div>
    ),
    Reminder: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">Reminder: </span>
          the delivery is due in less than 12 hours
          <span className="font-bold"> Deliver Now</span>
        </p>
      </div>
    ),
    OrderMessage: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">{userName}: </span>
          {message}.
        </p>
      </div>
    ),
    OrderStart: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          {`Your order has started! The designer is now working on your order.`}
        </p>
      </div>
    ),
    Instructions: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          {`You have a new `}
          <span className="font-bold">order</span>
          {` and instructions from `}
          <span className="font-bold">{userName}</span>
          {`. Get Started.`}
        </p>
      </div>
    ),
    Comment: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">{userName}: </span>
          {`left you ${commentQuantity} comment`}
        </p>
      </div>
    ),

    OrderExtendUser: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">Update: </span>
          {`${userName} extended their delivery period by ${days ? `${days} days` : `${hours} hours`} `}
        </p>
      </div>
    ),
  };

  return notificationTemplates[type] || "";
};

export default GetNotificationTitle;
