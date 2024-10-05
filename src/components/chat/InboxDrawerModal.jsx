import { useRef, useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import thumbnail from "../../assets/images/MR Logo White.png";
import useOutsideClick from "../../hooks/useOutsideClick";

const InboxDrawerModal = ({ close }) => {
  const { user } = useSelector((state) => state.user);
  const wrapperRef = useRef(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      userImage: "",
      senderUserName: "atdservices23",
      messageText: "Double side door hanger $20= Print ready JPEG or PDF file.",
      customOffer: null,
      attachment: [],
      createdAt: "2024-09-26T18:11:59Z",
    },
    {
      id: 2,
      userImage: "",
      senderUserName: "jhallett",
      messageText: "",
      customOffer: true,
      attachment: [],
      createdAt: "2024-09-26T18:11:59Z",
    },
    {
      id: 3,
      userImage: "",
      senderUserName: "yaro_b",
      messageText: "Final file",
      customOffer: null,
      attachment: ["yes", "yes"],
      createdAt: "2024-09-26T18:11:59Z",
    },
    {
      id: 4,
      userImage: thumbnail,
      senderUserName: "milkesolomon",
      messageText: "Please let me know, Did you like my designs?",
      customOffer: null,
      attachment: [],
      createdAt: "2024-09-26T18:11:59Z",
    },
    {
      id: 5,
      userImage: "",
      senderUserName: "planetfreestyle",
      messageText: "Yes. I can design your given information.",
      customOffer: null,
      attachment: [],
      createdAt: "2024-09-26T18:11:59Z",
    },
    {
      id: 6,
      userImage: "",
      senderUserName: "atdservices23",
      messageText: "",
      customOffer: null,
      attachment: ["Yes", "Yes"],
      createdAt: "2024-09-26T18:11:59Z",
    },
  ]);
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
          <span>(0)</span>
        </h1>
        <Link className="text-primary" to={"/inbox"}>
          See All In Inbox
        </Link>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {messages?.map((msg) => (
          <Link
            key={msg?.id}
            className="flex items-start gap-3 border-b px-4 pb-2 pt-4 text-[#3b3b3b]"
          >
            <div className="relative size-14 shrink-0 rounded-full">
              {msg?.userImage ? (
                <img
                  src={msg?.userImage}
                  className="w-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-2xl font-bold text-[#3b3b3b]/50">
                  {msg?.senderUserName.charAt(0).toUpperCase()}
                </div>
              )}
              <div
                className={`absolute bottom-0 right-0 size-4 rounded-full border-[3px] border-white bg-gray-400`}
              ></div>
            </div>
            <div>
              <h1 className="font-bold">{msg?.senderUserName}</h1>
              <p className="line-clamp-2 font-medium">
                {user?.userName === msg?.senderUserName && "Me: "}{" "}
                {msg?.customOffer
                  ? `${msg?.senderUserName} just sent you a new Custom Offer.`
                  : msg?.attachment?.length > 0 && !msg?.messageText
                    ? `${msg?.senderUserName} just sent you some attachments.`
                    : msg?.messageText}
              </p>
              <span className="mt-3 block text-xs font-semibold text-[#3b3b3b]/50">
                2d
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InboxDrawerModal;
