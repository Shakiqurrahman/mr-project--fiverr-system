import { motion } from "framer-motion";
import { FaSkype, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";
import { PiDotsSixBold } from "react-icons/pi";
import { RiPlayReverseLargeFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import gmailIcon from "../assets/images/icons/Gmail.png";
import messengerLogo from "../assets/images/icons/messenger.png";

function SocialMediaLinks() {
  return (
    <motion.div
      className="fixed bottom-5 right-5 z-[99999] flex gap-3 rounded-lg bg-lightskyblue shadow-xl"
      drag
    >
      <div className="p-2">
        <h3 className="">You can only send text messages</h3>
        <div className="mt-2 flex items-center justify-center gap-2">
          <Link className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[3px] border-solid border-purple-500 sm:h-[40px] sm:w-[40px]">
            <img
              className="object-contain"
              src={messengerLogo}
              alt="messenger"
            />
          </Link>
          <Link className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[3px] border-solid border-green-500 sm:h-[40px] sm:w-[40px]">
            <FaWhatsapp className="text-green-500 sm:text-2xl" />
          </Link>
          <Link className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[3px] border-solid border-blue-500 sm:h-[40px] sm:w-[40px]">
            <FaSkype className="text-blue-500 sm:text-2xl" />
          </Link>
          <Link className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[3px] border-solid border-red-500 sm:h-[40px] sm:w-[40px]">
            <img
              className="h-[16px] w-[16px] object-contain sm:h-[24px] sm:w-[24px]"
              src={gmailIcon}
              alt="gmail"
            />
          </Link>
          <Link className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[3px] border-solid border-blue-500 sm:h-[40px] sm:w-[40px]">
            <FaTelegramPlane className="text-blue-500 sm:text-2xl" />
          </Link>
        </div>
      </div>
      <div className="flex cursor-pointer flex-col items-center justify-center rounded-lg bg-primary text-white">
        <RiPlayReverseLargeFill className="text-3xl" />
        <PiDotsSixBold className="text-[40px]" />
      </div>
    </motion.div>
  );
}

export default SocialMediaLinks;
