import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import shortid from "shortid";
import { useSendAOrderMessageMutation } from "../../../Redux/api/orderApiSlice";
import { setMessages, setReplyTo } from "../../../Redux/features/orderSlice";
import useOutsideClick from "../../../hooks/useOutsideClick";
import { STRIPE_PUBLIC_KEY, configApi } from "../../../libs/configApi";
import { connectSocket } from "../../../libs/socketService";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const ExtendDeliveryModal = ({ handleClose }) => {
  const [sendAOrderMessage] = useSendAOrderMessageMutation();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.user);
  const { projectDetails, replyTo } = useSelector((state) => state.order);
  const modalRef = useRef(null);
  const [extendType, setExtendType] = useState("requestByClient");
  const [form, setForm] = useState({
    days: 1,
    explainWhyExtend: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  // Socket Connection
  const socket = connectSocket(`${configApi.socket}`, token);

  const isAdmin = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(user?.role);

  const amount = form.days > 0 ? parseInt(form.days) * 5 : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleExtendType = (e) => {
    setExtendType(e.target.id);
  };

  // Setup sending message time and date
  const dates = new Date();
  const timeAndDate = dates.getTime();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form?.explainWhyExtend) {
      setIsLoading(true);
      const data =
        extendType === "requestByMe"
          ? {
              ...form,
              extendType,
              isAccepted: false,
              isRejected: false,
              isSubmittedByAdmin: isAdmin ? true : false,
            }
          : {
              ...form,
              extendType,
              amount,
              isAccepted: false,
              isRejected: false,
              isSubmittedByAdmin: isAdmin ? true : false,
            };

      const submitForm = {
        messageText: "",
        senderUserName: user?.userName,
        userImage: user?.image,
        attachment: [],
        additionalOffer: null,
        extendDeliveryTime: data,
        deliverProject: null,
        cancelProject: null,
        imageComments: [],
        timeAndDate,
        replyTo,
        projectNumber: projectDetails?.projectNumber,
        uniqueId: shortid(),
      };

      if (isAdmin) {
        socket?.emit("order:admin-message", {
          userId: projectDetails?.userId,
          ...submitForm,
        });
      } else {
        socket?.emit("order:user-message", {
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
      // onNoteSubmit(form);

      try {
        const res = await sendAOrderMessage({
          recipientId: isAdmin ? projectDetails?.userId : null,
          ...submitForm,
        }).unwrap();
      } catch (error) {
        toast.error("Something went wrong!");
      }
      if (!isAdmin) {
        const data = {
          totalAmount: amount,
          paymentType: "ExtendDelivery",
          updatedMessage: submitForm,
          duration: form.days,
          orderId: projectDetails?.id,
          requestedByClient: true,
          userId: user?.id,
          projectNumber: projectDetails?.projectNumber,
        };
        try {
          const response = await axios.post(
            `${configApi.api}payment/extendad-delivery`,
            {
              data,
            },
          );

          const sessionId = response?.data?.data?.id;
          // Redirect to Stripe Checkout
          const stripe = await stripePromise;
          await stripe.redirectToCheckout({ sessionId });
        } catch (error) {
          toast.error("Something went wrong!");
        }
      }
      handleClose(false);
      setIsLoading(false);
    } else {
      toast.error("Please provide a reason!!!");
    }
  };

  useOutsideClick(modalRef, () => handleClose(false));
  return (
    <div className="fixed left-0 top-0 z-[999] flex h-screen w-full items-center justify-center bg-black/20 p-4 backdrop-blur-sm">
      <div ref={modalRef} className="w-full max-w-[650px] rounded-md">
        <div className="flex items-center justify-between bg-lightskyblue px-6 py-4">
          <h1 className="text-lg font-semibold">Extend delivery date</h1>
          <IoCloseSharp
            onClick={() => handleClose(false)}
            className="cursor-pointer text-[27px] text-gray-500"
          />
        </div>
        <form onSubmit={handleSubmit} className="bg-white px-6 py-6">
          <textarea
            className="block min-h-[140px] w-full resize-none border px-3 py-2 text-sm outline-none"
            placeholder="Explain why you need more time..."
            name="explainWhyExtend"
            value={form.explainWhyExtend}
            onChange={handleChange}
          ></textarea>

          {isAdmin && (
            <div className="mt-4 flex justify-center gap-8">
              <div className="flex items-center gap-2">
                <input
                  className="size-4"
                  type="radio"
                  name="extendType"
                  onChange={handleExtendType}
                  id="requestByClient"
                  checked={extendType === "requestByClient"}
                />
                <label htmlFor="requestByClient">Requested by client</label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  className="size-4"
                  type="radio"
                  name="extendType"
                  onChange={handleExtendType}
                  id="requestByMe"
                  checked={extendType === "requestByMe"}
                />
                <label htmlFor="requestByMe">Request by me</label>
              </div>
            </div>
          )}

          <div className="mt-10 flex flex-col items-center justify-between gap-6 sm:flex-row sm:gap-2">
            <div className="flex flex-wrap items-center gap-4 sm:gap-8">
              <p className="flex items-center gap-4">
                Days{" "}
                <input
                  type="number"
                  name="days"
                  min="0"
                  value={form.days}
                  onChange={handleChange}
                  className="w-20 border py-2 text-center text-lg font-semibold outline-none"
                ></input>
              </p>
              {extendType === "requestByClient" && (
                <p className="flex items-center gap-4">
                  Amount{" "}
                  <span className="w-20 overflow-hidden border py-2 text-center text-lg font-semibold">
                    ${amount}
                  </span>
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={form.days <= 0 || isLoading}
              className="rounded bg-primary px-5 py-2 text-base font-semibold text-white outline-none duration-300 hover:bg-primary/80 disabled:bg-primary/60"
            >
              Confirm Extend
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default React.memo(ExtendDeliveryModal);
