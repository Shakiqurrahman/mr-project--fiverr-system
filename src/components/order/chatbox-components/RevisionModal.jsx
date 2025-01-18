import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";
import {
  useAcceptRevisionMutation,
  useSendAOrderMessageMutation,
} from "../../../Redux/api/orderApiSlice";
import { setMessages, setReplyTo } from "../../../Redux/features/orderSlice";
import useOutsideClick from "../../../hooks/useOutsideClick";

const RevisionModal = ({ handleClose, onOfferSubmit, messageObj }) => {
  const [sendAOrderMessage] = useSendAOrderMessageMutation();
  const [acceptRevision] = useAcceptRevisionMutation();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state?.user);
  const { projectDetails, replyTo } = useSelector((state) => state?.order);

  // Checking Admin
  const isAdmin = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(user?.role);

  const formRef = useRef(null);

  const [form, setForm] = useState({
    text: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
  useOutsideClick(formRef, () => handleClose(false));
  return (
    <div className="fixed left-0 top-0 z-[999] flex h-screen w-full items-center justify-center bg-black/50 p-5 backdrop-blur-sm">
      <form
        className="w-full max-w-[800px] border border-gray-200 bg-white shadow-btn-shadow"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        <h1 className="bg-lightskyblue px-4 py-2 text-lg font-semibold">
          Revision Request
        </h1>
        <div className="p-4 pb-0">
          <textarea
            className="h-[150px] w-full resize-none border bg-transparent px-4 py-3 outline-none"
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
