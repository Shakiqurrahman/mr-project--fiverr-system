import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {
  useAcceptExtendDeliveryMutation,
  useUpdateAOrderMessageMutation,
} from "../../../Redux/api/orderApiSlice";
import { STRIPE_PUBLIC_KEY, configApi } from "../../../libs/configApi";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const ExtendingDeliveryPreview = ({ messageObj, value }) => {
  const { user } = useSelector((state) => state?.user);
  const { projectDetails } = useSelector((state) => state.order);

  const [acceptExtend] = useAcceptExtendDeliveryMutation();

  const [isLoading, setIsLoading] = useState(false);

  // Checking Admin
  const isAdmin = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(user?.role);

  const [updateAOrderMessage] = useUpdateAOrderMessageMutation();
  const handleAccept = async (e) => {
    e.preventDefault();
    if (messageObj?.uniqueId) {
      const data = {
        orderMessageId: messageObj?.uniqueId,
        approvedByAdmin: isAdmin ? true : false,
        orderId: projectDetails?.id,
      };
      try {
        const res = await acceptExtend(data).unwrap();
      } catch (error) {
        toast.error("Something went wrong!!!");
      }
    }
  };
  const handleAcceptWithPayment = async (e) => {
    e.preventDefault();
    if (messageObj?.uniqueId) {
      setIsLoading(true);
      const { id, ...updateMessage } = messageObj;
      const data = {
        totalAmount: value?.amount,
        paymentType: "ExtendDelivery",
        updatedMessage: updateMessage,
        duration: value?.days,
        orderId: projectDetails?.id,
        requestedByClient: false,
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
      setIsLoading(false);
    }
  };
  const handleReject = async (e) => {
    e.preventDefault();
    if (messageObj?.commonKey) {
      const data = {
        ...messageObj,
        extendDeliveryTime: {
          ...messageObj?.extendDeliveryTime,
          isRejected: true,
        },
      };
      try {
        const res = await updateAOrderMessage(data).unwrap();
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
  };
  return (
    <div className="mt-5 border bg-lightskyblue">
      <div className="flex items-center border-b bg-[#CCE5FB] p-4 text-lg font-semibold">
        <div className={`${value?.amount ? "w-4/6" : "w-5/6"}`}>
          Extended Delivery Date
        </div>
        <div className="w-1/6 text-center">Duration</div>
        {value?.amount && <div className="w-1/6 text-end">Price</div>}
      </div>
      <div className="p-4 py-6">
        <div className="mb-6 flex items-center">
          <div className={`${value?.amount ? "w-4/6" : "w-5/6"} pr-4`}>
            {value?.explainWhyExtend}
          </div>

          <div className="w-1/6 text-center">
            {parseInt(value?.days) > 1
              ? value?.days + " Days"
              : value?.days + " Day"}
          </div>
          {value?.amount && (
            <div className="w-1/6 text-end font-semibold">${value?.amount}</div>
          )}
        </div>

        {!value?.isAccepted &&
          !value?.isRejected &&
          value?.isSubmittedByAdmin &&
          user?.role === "USER" &&
          projectDetails?.projectStatus !== "Completed" &&
          projectDetails?.projectStatus !== "Canceled" && (
            <div className="flex justify-center gap-8 border-t pt-6">
              <button
                type="submit"
                onClick={
                  value?.extendType === "requestByClient"
                    ? handleAcceptWithPayment
                    : handleAccept
                }
                disabled={isLoading}
                className="w-[150px] bg-primary px-5 py-2 text-lg font-semibold text-white outline-none duration-300 hover:bg-primary/80 disabled:bg-primary/50"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={handleReject}
                className="w-[150px] bg-gray-500 px-5 py-2 text-lg font-semibold text-white outline-none duration-300 hover:bg-gray-500/80"
              >
                Decline
              </button>
            </div>
          )}
        {!value?.isAccepted &&
          !value?.isRejected &&
          !value?.isSubmittedByAdmin &&
          isAdmin &&
          projectDetails?.projectStatus !== "Completed" &&
          projectDetails?.projectStatus !== "Canceled" && (
            <div className="flex justify-center gap-8 border-t pt-6">
              <button
                type="submit"
                onClick={handleAccept}
                disabled={isLoading}
                className="w-[150px] bg-primary px-5 py-2 text-lg font-semibold text-white outline-none duration-300 hover:bg-primary/80 disabled:bg-primary/50"
              >
                Accept
              </button>
              <button
                type="button"
                onClick={handleReject}
                className="w-[150px] bg-gray-500 px-5 py-2 text-lg font-semibold text-white outline-none duration-300 hover:bg-gray-500/80"
              >
                Decline
              </button>
            </div>
          )}
        {value?.isAccepted && (
          <p className="text-center">Extend Delivery Request Accepted</p>
        )}
        {value?.isRejected && (
          <p className="text-center">Extend Delivery Request Rejected</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(ExtendingDeliveryPreview);
