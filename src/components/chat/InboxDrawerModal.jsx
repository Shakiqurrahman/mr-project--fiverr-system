import { useEffect, useRef } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import { formatTimeAgo } from "../../libs/timeFormatter";
import {
  useGetAvailableChatUsersQuery,
  useLazyGetAllMessagesQuery,
} from "../../Redux/api/inboxApiSlice";
import {
  setChatData,
  setConversationUser,
} from "../../Redux/features/chatSlice";

const InboxDrawerModal = ({ close }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: availableUsers } = useGetAvailableChatUsersQuery();
  const { user } = useSelector((state) => state.user);
  const wrapperRef = useRef(null);

  // after clicking on the message button
  const [triggerGetAllMessages, { data: getAllMessages }] =
    useLazyGetAllMessagesQuery({
      // pollingInterval: 500,
    });

  useEffect(() => {
    if (getAllMessages) {
      dispatch(setChatData(getAllMessages));
      navigate("/inbox");
      close(false);
    }
  }, [dispatch, getAllMessages, navigate, close]);

  const handleMessageButton = (e, id) => {
    e.preventDefault();
    dispatch(setConversationUser(id));
    triggerGetAllMessages({
      receiverId: id,
    });
  };

  const totalUnseenMessage = availableUsers?.reduce(
    (prev, curr) => prev + curr?.lastmessageinfo?.totalUnseenMessage,
    0,
  );
  useOutsideClick(wrapperRef, () => close(false));
  return (
    <div
      className="absolute right-0 top-10 w-[400px] translate-x-full rounded-md bg-white text-black shadow-lg lg:translate-x-0"
      ref={wrapperRef}
    >
      <div className="flex items-center justify-between gap-3 border-b p-4 font-semibold">
        <h1 className="flex items-center gap-2">
          <FaRegEnvelope className="text-lg" />
          Inbox
          <span>({totalUnseenMessage || 0})</span>
        </h1>
        <Link
          className="text-primary"
          to={"/inbox"}
          onClick={() => close(false)}
        >
          See All In Inbox
        </Link>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {availableUsers?.map((msg, index) => (
          <Link
            key={index}
            onClick={(e) => handleMessageButton(e, msg?.id)}
            className="flex items-start gap-3 border-b px-4 pb-2 pt-4 text-[#3b3b3b]"
          >
            <div className="relative size-14 shrink-0 rounded-full">
              {msg?.image ? (
                <img
                  src={msg?.image}
                  className="size-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-2xl font-bold text-[#3b3b3b]/50">
                  {msg?.userName?.charAt(0).toUpperCase()}
                </div>
              )}
              <div
                className={`absolute bottom-0 right-0 size-4 rounded-full border-[3px] border-white bg-gray-400`}
              ></div>
            </div>
            <div>
              <h1 className="font-bold">{msg?.userName}</h1>
              <p className="line-clamp-2 font-medium">
                {user?.userName === msg?.userName && "Me: "}{" "}
                {msg?.lastmessageinfo?.customOffer
                  ? `${msg?.userName} just sent you a new Custom Offer.`
                  : msg?.lastmessageinfo?.attachments?.length > 0 &&
                      !msg?.lastmessageinfo?.messageText
                    ? `${msg?.userName} just sent you some attachments.`
                    : msg?.lastmessageinfo?.messageText}
              </p>
              <span className="mt-3 block text-xs font-semibold text-[#3b3b3b]/50">
                {formatTimeAgo(msg?.lastmessageinfo?.createdAt)}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InboxDrawerModal;
