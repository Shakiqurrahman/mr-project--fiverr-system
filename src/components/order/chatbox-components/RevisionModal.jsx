import React, { useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdClose } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";
import {
  useAcceptRevisionMutation,
  useSendAOrderMessageMutation,
} from "../../../Redux/api/orderApiSlice";
import { setMessages, setReplyTo } from "../../../Redux/features/orderSlice";

const RevisionModal = ({ handleClose, onOfferSubmit, messageObj, images }) => {
  const [sendAOrderMessage] = useSendAOrderMessageMutation();
  const [acceptRevision] = useAcceptRevisionMutation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);
  const { projectDetails, replyTo } = useSelector((state) => state?.order);

  // Checking Admin
  const isAdmin = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(user?.role);

  const formRef = useRef(null);
  const imgRef = useRef(null);

  const [form, setForm] = useState({
    text: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const imageFiles = useMemo(
    () => images?.filter((file) => file?.format?.startsWith("image/")),
    [images],
  );
  const [selectedPosition, setSelectedPosition] = useState(0);

  const handlePrev = (e) => {
    e.preventDefault();
    if (selectedPosition > 0) {
      setSelectedPosition((prev) => prev - 1);
    }
  };
  const handleNext = (e) => {
    e.preventDefault();
    if (imageFiles?.length - 1 > selectedPosition) {
      setSelectedPosition((prev) => prev + 1);
    }
  };

  // Setup sending message time and date
  const dates = new Date();
  const timeAndDate = dates.getTime();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.text) {
      const submitForm = {
        messageText: "",
        senderUserName: user?.userName,
        userImage: user?.image,
        attachment: [],
        additionalOffer: null,
        extendDeliveryTime: null,
        deliverProject: null,
        cancelProject: null,
        revisionProject: form,
        imageComments: [],
        timeAndDate,
        replyTo,
        projectNumber: projectDetails?.projectNumber,
        uniqueId: shortid(),
      };

      if (isAdmin) {
        onOfferSubmit?.emit("order:admin-message", {
          userId: projectDetails?.userId,
          ...submitForm,
        });
      } else {
        onOfferSubmit?.emit("order:user-message", {
          ...submitForm,
        });
      }

      dispatch(
        setMessages({
          ...submitForm,
          recipientId: isAdmin ? projectDetails?.userId : "",
        }),
      );
      dispatch(setReplyTo(null));

      try {
        const res = await sendAOrderMessage({
          recipientId: isAdmin ? projectDetails?.userId : null,
          ...submitForm,
        }).unwrap();

        if (messageObj?.uniqueId) {
          const { id, ...updatedMessage } = messageObj;
          const data = {
            projectNumber: projectDetails?.projectNumber,
            uniqueId: messageObj?.uniqueId,
            updatedMessage,
          };
          const res = await acceptRevision(data).unwrap();
        }

        setForm({
          text: "",
        });
        // setReplyTo(null);
      } catch (error) {
        toast.error("Something went wrong!");
      }

      handleClose(false);
    } else {
      toast.error("Please Provide a Reason!!!");
    }
  };
  // useOutsideClick(formRef, () => handleClose(false));
  return (
    <div className="fixed left-0 top-0 z-[999] flex h-screen w-full flex-wrap items-center justify-between gap-5 bg-black/30 p-5 backdrop-blur-sm md:flex-nowrap md:justify-center">
      <button
        className="absolute right-5 top-7 z-[99999] flex size-8 items-center justify-center rounded-full bg-gray-200 text-2xl text-black"
        onClick={() => handleClose(null)}
      >
        <MdClose />
      </button>
      <div className="relative flex h-[60%] w-full shrink-0 items-center md:h-full md:w-[70%]">
        <img
          src={imageFiles[selectedPosition]?.url}
          alt=""
          className="mx-auto max-h-full w-full object-contain object-center"
          ref={imgRef}
        />
        <div className="absolute left-0 top-1/2 flex w-full items-center justify-between px-5">
          <button
            className={`flex size-8 shrink-0 items-center justify-center rounded-full ${selectedPosition === 0 ? "bg-gray-200/20" : "bg-gray-200"} text-2xl text-black sm:size-10`}
            onClick={handlePrev}
          >
            <IoIosArrowBack />
          </button>
          <button
            className={`flex size-8 shrink-0 items-center justify-center rounded-full ${selectedPosition === imageFiles?.length - 1 ? "bg-gray-200/20" : "bg-gray-200"} text-2xl text-black sm:size-10`}
            onClick={handleNext}
          >
            <IoIosArrowForward />
          </button>
        </div>
      </div>
      <form
        className="h-[40%] w-full shrink-0 border border-gray-200 bg-white shadow-btn-shadow md:h-full md:w-[30%]"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <h1 className="bg-lightskyblue px-4 py-2 text-lg font-semibold">
          Revision Request
        </h1>
        <div className="h-[calc(100%_-_116px)] p-4 pb-0">
          <textarea
            className="h-full w-full resize-none border bg-transparent px-4 py-3 outline-none"
            placeholder="Explain here what you need to change..."
            name="text"
            value={form.text}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="flex flex-wrap items-center gap-5 p-4 sm:gap-10">
          <button
            type="submit"
            className="mx-auto bg-primary px-8 py-2 font-semibold text-white sm:me-0 sm:ms-auto"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default RevisionModal;
