import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaSkype, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { PiDotsSixBold } from "react-icons/pi";
import { RiPlayLargeFill, RiPlayReverseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import gmailIcon from "../assets/images/icons/Gmail.png";
import messengerLogo from "../assets/images/icons/messenger.png";

function SocialMediaLinks() {
  // Retrieve the value from localStorage or default to true if not present
  const initialExpend =
    JSON.parse(localStorage.getItem("social-links")) ?? true;
  const [expend, setExpend] = useState(initialExpend);

  // Update localStorage whenever `expend` changes
  useEffect(() => {
    localStorage.setItem("social-links", JSON.stringify(expend));
  }, [expend]);

  // Toggle the state
  const handleExpend = () => {
    setExpend((prevExpend) => !prevExpend);
  };

  return (
    <motion.div
      drag
      dragMomentum={false}
      className="fixed bottom-[100px] right-5 z-[99999] flex h-[70px] items-stretch overflow-clip rounded-lg bg-lightskyblue shadow-xl"
    >
      <div
        className={`${expend ? "visible w-[220px] translate-x-0 p-2 opacity-100" : "invisible w-0 translate-x-full p-0 opacity-0"}`}
      >
        <h3
          className={`text-center text-xs ${expend ? "visible block" : "invisible hidden"}`}
        >
          You can only send text messages
        </h3>
        <div
          className={`mt-2 items-center justify-center gap-2 ${expend ? "flex" : "hidden"}`}
        >
          <Link className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[3px] border-solid border-purple-500">
            <img
              className="object-contain"
              src={messengerLogo}
              alt="messenger"
            />
          </Link>
          <Link className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[3px] border-solid border-green-500">
            <FaWhatsapp className="text-green-500" />
          </Link>
          <Link className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[3px] border-solid border-blue-500">
            <FaSkype className="text-blue-500" />
          </Link>
          <Link className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[3px] border-solid border-red-500">
            <img
              className="h-[14px] w-[14px] object-contain"
              src={gmailIcon}
              alt="gmail"
            />
          </Link>
          <Link className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[3px] border-solid border-blue-500">
            <FaTelegramPlane className="text-blue-500" />
          </Link>
        </div>
      </div>
      <div className="relative z-[10] flex cursor-pointer flex-col items-center justify-center rounded-lg bg-primary p-2 text-white">
        <button onClick={handleExpend}>
          {expend ? (
            <RiPlayLargeFill className="text-xl" />
          ) : (
            <RiPlayReverseLargeFill className="text-xl" />
          )}
        </button>
        <PiDotsSixBold className="text-2xl" />
      </div>
    </motion.div>
  );
}

export default SocialMediaLinks;
