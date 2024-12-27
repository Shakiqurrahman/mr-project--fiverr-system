import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useUpdateAOrderMessageMutation } from "../../../Redux/api/orderApiSlice";
import { STRIPE_PUBLIC_KEY, configApi } from "../../../libs/configApi";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const AdditionalOfferPreview = ({ value, messageObj }) => {
  const [updateAOrderMessage] = useUpdateAOrderMessageMutation();
  const { user } = useSelector((state) => state.user);
  const { projectDetails } = useSelector((state) => state.order);

  const [isLoading, setIsLoading] = useState(false);

  const isAdmin = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(user?.role);

  const handleAcceptOffer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (messageObj?.uniqueId) {
      const updatedMessage = {
        ...messageObj,
        additionalOffer: {
          ...messageObj?.additionalOffer,
          isAccepted: true,
        },
      };
      const data = {
        totalAmount: value?.price,
        paymentType: "AdditionalOffer",
        projectNumber: messageObj?.projectNumber,
        duration: value?.duration,
        updatedMessage,
        userId: user?.id,
        orderId: projectDetails?.id,
      };
      try {
        const response = await axios.post(
          `${configApi.api}payment/additional`,
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
    setIsLoading(false);
  };
  const handleRejectOffer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (messageObj?.uniqueId) {
      const data = {
        ...messageObj,
        additionalOffer: {
          ...messageObj?.additionalOffer,
          isRejected: true,
        },
      };
      try {
        const res = await updateAOrderMessage(data).unwrap();
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
    setIsLoading(false);
  };
  const handleWithdrawOffer = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (messageObj?.uniqueId) {
      const data = {
        ...messageObj,
        additionalOffer: {
          ...messageObj?.additionalOffer,
          isWithdrawn: true,
        },
      };
      try {
        const res = await updateAOrderMessage(data).unwrap();
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
    setIsLoading(false);
  };
  return (
    <div className="mt-3">
      <p>Additional Offer</p>
      <div className="border bg-lightskyblue">
        <div className="flex items-center border-b bg-[#CCE5FB] p-4 text-sm font-semibold sm:text-lg">
          <div className="w-3/6 sm:w-4/6">Item</div>
          <div className="w-[25%] text-center sm:w-1/6">Duration</div>
          <div className="w-[25%] text-end sm:w-1/6">Price</div>
        </div>
        <div className="p-4">
          <div className="flex items-center border-b pb-4 text-sm sm:text-base">
            <div className="w-3/6 sm:w-4/6">{value?.text}</div>
            <div className="w-[25%] text-center sm:w-1/6">
              {parseInt(value?.duration) > 1
                ? value?.duration + " Days"
                : value?.duration + " Day"}
            </div>
            <div className="w-[25%] text-end font-semibold sm:w-1/6">
              ${value?.price}
            </div>
          </div>
          <div className="flex items-center justify-between py-4 text-sm sm:text-base">
            <div className="grow">Subtotal</div>
            <div className="shrink-0 font-semibold">${value?.price}</div>
          </div>
          <div className="flex items-center justify-between border-b pb-4 text-sm sm:text-base">
            <div className="grow">Fee</div>
            <div className="shrink-0 font-semibold">$00</div>
          </div>
          <div className="flex items-center justify-between py-4 text-sm sm:text-base">
            <div className="grow font-semibold">Total</div>
            <div className="shrink-0 font-semibold">${value?.price}</div>
          </div>
          {!isAdmin &&
            !value?.isAccepted &&
            !value?.isRejected &&
            !value?.isWithdrawn &&
            projectDetails?.projectStatus !== "Completed" &&
            projectDetails?.projectStatus !== "Canceled" && (
              <div className="flex flex-wrap items-center justify-center gap-2 sm:flex-nowrap sm:gap-5">
                <button
                  type="button"
                  onClick={handleAcceptOffer}
                  disabled={isLoading}
                  className="w-full bg-primary px-10 py-2 text-sm font-semibold text-white disabled:bg-primary/50 sm:w-auto sm:text-base"
                >
                  Accept
                </button>
                <button
                  type="button"
                  onClick={handleRejectOffer}
                  disabled={isLoading}
                  className="w-full bg-gray-400 px-10 py-2 text-sm font-semibold text-white disabled:bg-gray-400/50 sm:w-auto sm:text-base"
                >
                  Decline
                </button>
              </div>
            )}
          {isAdmin &&
            !value?.isAccepted &&
            !value?.isRejected &&
            !value?.isWithdrawn &&
            projectDetails?.projectStatus !== "Completed" &&
            projectDetails?.projectStatus !== "Canceled" && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={handleWithdrawOffer}
                  disabled={isLoading}
                  className="bg-primary px-10 py-2 text-sm font-semibold text-white disabled:bg-primary/50 sm:text-base"
                >
                  Withdraw Offer
                </button>
              </div>
            )}

          {value?.isWithdrawn && <p className="text-center">Offer Withdrawn</p>}
          {value?.isAccepted && <p className="text-center">Offer Accepted</p>}
          {value?.isRejected && <p className="text-center">Offer Rejected</p>}
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdditionalOfferPreview);
