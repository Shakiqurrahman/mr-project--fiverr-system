import { motion } from "framer-motion";
import { useState } from "react";
import { FaSkype, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { PiDotsSixBold } from "react-icons/pi";
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import gmailIcon from "../assets/images/icons/Gmail.png";
import messengerLogo from "../assets/images/icons/messenger.png";

function SocialMediaLinks() {
  const [expend, setExpend] = useState(true);
  return (
    <motion.div
      drag
      dragMomentum={false}
      className="fixed bottom-5 right-5 z-[99999] flex h-[70px] items-stretch overflow-clip rounded-lg bg-lightskyblue shadow-xl sm:bottom-[100px] sm:h-auto"
    >
      <div
        className={`${expend ? "visible w-[220px] translate-x-0 p-2 opacity-100 sm:w-[300px]" : "invisible w-0 translate-x-full p-0 opacity-0"}`}
      >
        <h3
          className={`text-center text-xs sm:text-base ${expend ? "visible block" : "invisible hidden"}`}
        >
          You can only send text messages
        </h3>
        <div
          className={`mt-2 items-center justify-center gap-2 ${expend ? "flex" : "hidden"}`}
        >
          <Link className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[3px] border-solid border-purple-500 sm:h-[35px] sm:w-[35px]">
            <img
              className="object-contain"
              src={messengerLogo}
              alt="messenger"
            />
          </Link>
          <Link className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[3px] border-solid border-green-500 sm:h-[35px] sm:w-[35px]">
            <FaWhatsapp className="text-green-500 sm:text-xl" />
          </Link>
          <Link className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[3px] border-solid border-blue-500 sm:h-[35px] sm:w-[35px]">
            <FaSkype className="text-blue-500 sm:text-xl" />
          </Link>
          <Link className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[3px] border-solid border-red-500 sm:h-[35px] sm:w-[35px]">
            <img
              className="h-[14px] w-[14px] object-contain sm:h-[20px] sm:w-[20px]"
              src={gmailIcon}
              alt="gmail"
            />
          </Link>
          <Link className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[3px] border-solid border-blue-500 sm:h-[35px] sm:w-[35px]">
            <FaTelegramPlane className="text-blue-500 sm:text-xl" />
          </Link>
        </div>
      </div>
      <div className="relative z-[10] flex cursor-pointer flex-col items-center justify-center rounded-lg bg-primary p-2 text-white">
        <button onClick={() => setExpend(!expend)}>
          <RiPlayReverseLargeFill className="text-xl sm:text-3xl" />
        </button>
        <PiDotsSixBold className="text-2xl sm:text-[40px]" />
      </div>
    </motion.div>
  );
}

export default SocialMediaLinks;
