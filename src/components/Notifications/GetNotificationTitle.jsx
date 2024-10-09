import React from "react";

const GetNotificationTitle = ({
  type,
  userName,
  message,
  rating,
  commentQuantity,
}) => {
  const notificationTemplates = {
    order: (
      <div className="flex-1">
        <p className="text-sm font-medium sm:text-base text-gray-900 line-clamp-3">
          {`You have a new `}
          <span className="font-bold">{type}</span>
          {` from `}
          <span className="font-bold">{userName}</span>
          {` and are awaiting buyer requirements.`}
        </p>
      </div>
    ),
    review: (
      <div className="flex-1">
        <p className="text-sm font-medium sm:text-base text-gray-900 line-clamp-3">
          <span className="font-bold">{userName}</span>
          {` left a ${rating} star `}
          <span className="font-bold">{type}.</span>
        </p>
      </div>
    ),
    revision: (
      <div className="flex-1">
        <p className="text-sm font-medium sm:text-base text-gray-900 line-clamp-3">
          <span className="font-bold">{userName}: requested </span>a change to
          your order. Review the feedback.
        </p>
      </div>
    ),
    reminder: (
      <div className="flex-1">
        <p className="text-sm font-medium sm:text-base text-gray-900 line-clamp-3">
          <span className="font-bold">Reminder: </span>
          the delivery is due in less than 12 hours
          <span className="font-bold"> Deliver Now</span>
        </p>
      </div>
    ),
    orderMessage: (
      <div className="flex-1">
        <p className="text-sm font-medium sm:text-base text-gray-900 line-clamp-3">
          <span className="font-bold">{userName}: </span>
          {message}.
        </p>
      </div>
    ),
    orderStart: (
      <div className="flex-1">
        <p className="text-sm font-medium sm:text-base text-gray-900 line-clamp-3">
          {`Your order has started! The designer is now working on your order.`}
        </p>
      </div>
    ),
    instructions: (
      <div className="flex-1">
        <p className="text-sm font-medium sm:text-base text-gray-900 line-clamp-3">
          {`You have a new `}
          <span className="font-bold">order</span>
          {` and instructions from `}
          <span className="font-bold">{userName}</span>
          {`. Get Started.`}
        </p>
      </div>
    ),
    comment: (
      <div className="flex-1">
        <p className="text-sm font-medium sm:text-base text-gray-900 line-clamp-3">
          <span className="font-bold">{userName}: </span>
          {`left you ${commentQuantity} comment`}
        </p>
      </div>
    ),
  };

  return notificationTemplates[type] || "";
};

export default GetNotificationTitle;
