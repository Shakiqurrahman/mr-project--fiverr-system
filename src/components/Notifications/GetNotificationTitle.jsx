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
          <span className="font-bold">project</span>
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
    Message: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">{userName}:</span>
          {message}.
        </p>
      </div>
    ),
    Revision: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">{userName}: requested </span>a change to
          your project. Review the feedback.
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
          {`Your project has started! The designer is now working on your project.`}
        </p>
      </div>
    ),
    Instructions: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          {`You have a new `}
          <span className="font-bold">project</span>
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
    OrderExtendAdmin: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">Update: </span>
          {`You extended your project's delivery period by ${days ? `${days} days` : `${hours} hours`} `}
        </p>
      </div>
    ),
    OrderExtend: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">{userName} </span>
          {` Sent project extended request`}
        </p>
      </div>
    ),
    OrderExtendWithdraw: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">{userName} </span>
          {` Project extended request withdrawn`}
        </p>
      </div>
    ),
    OrderExtendReject: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">{userName} </span>
          {` Project extended request rejected`}
        </p>
      </div>
    ),

    CancelAccept: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">{userName} </span>
          {`has been canceled his project.`}
        </p>
      </div>
    ),

    CancelAcceptUser: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">Your project has been canceled. </span>
          Your payment will be refunded within 24 to 48 hours.
        </p>
      </div>
    ),

    FileDelivered: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">Your files are ready! </span>
          You can now access and download them.
        </p>
      </div>
    ),

    CompleteOrder: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">{userName}</span>
          {` marked his project as complete`}
        </p>
      </div>
    ),

    CompleteOrderUser: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          {`You marked your project as complete`}
        </p>
      </div>
    ),

    AutoCompleteOrder: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">{userName}'s </span>
          {`project was automatically marked as complete`}
        </p>
      </div>
    ),

    AutoCompleteOrderUser: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          {`Your project was automatically marked as complete`}
        </p>
      </div>
    ),

    AdditionalOfferAccept: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">{userName}: </span>
          {`has accepted the offer`}
        </p>
      </div>
    ),

    AdditionalOffer: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">mahfujurrahm535 </span>
          {`has sent you an additional offer.`}
        </p>
      </div>
    ),

    OfferReject: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">{userName} </span>
          {`has rejected your offer.`}
        </p>
      </div>
    ),
    AdditionalOfferWithdraw: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">mahfujurrahm535</span>
          {` withdrawn the additional offer`}
        </p>
      </div>
    ),

    CancelOffer: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">mahfujurrahm535 </span>
          {`has sent you an cancel request.`}
        </p>
      </div>
    ),
    CancelOfferWithdraw: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">mahfujurrahm535</span>
          {` withdrawn the cancel request`}
        </p>
      </div>
    ),
    CancelOfferReject: (
      <div className="flex-1">
        <p className="line-clamp-3 text-sm font-medium text-gray-900 sm:text-base">
          <span className="font-bold">{userName} </span>
          {`has rejected your cancel request .`}
        </p>
      </div>
    ),

  };

  return notificationTemplates[type] || "";
};

export default GetNotificationTitle;
