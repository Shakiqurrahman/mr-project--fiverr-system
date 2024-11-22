import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";
import { useUpdateAOrderMessageMutation } from "../../../Redux/api/orderApiSlice";
import { STRIPE_PUBLIC_KEY, configApi } from "../../../libs/configApi";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const AdditionalOfferPreview = ({ value, messageObj }) => {
  const [updateAOrderMessage] = useUpdateAOrderMessageMutation();
  const { user } = useSelector((state) => state.user);

  const handleAcceptOffer = async (e) => {
    e.preventDefault();
    if (messageObj?.commonKey) {
      const updatedMessage = {
        ...messageObj,
        additionalOffer: {
          ...messageObj?.additionalOffer,
          isAccepted: true,
        },
      };
      const data = {
        amount: value?.price,
        paymentType: "Additional Offer",
        projectNumber: messageObj?.projectNumber,
        duration: value?.duration,
        updatedMessage,
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
        console.error("Error redirecting to checkout:", error);
      }
    }
  };
  const handleRejectOffer = async (e) => {
    e.preventDefault();
    if (messageObj?.commonKey) {
      const data = {
        ...messageObj,
        additionalOffer: {
          ...messageObj?.additionalOffer,
          isRejected: true,
        },
      };
      try {
        const res = await updateAOrderMessage(data).unwrap();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleWithdrawOffer = async (e) => {
    e.preventDefault();
    if (messageObj?.commonKey) {
      const data = {
        ...messageObj,
        additionalOffer: {
          ...messageObj?.additionalOffer,
          isWithdrawn: true,
        },
      };
      try {
        const res = await updateAOrderMessage(data).unwrap();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
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
          {!value?.isAccepted && !value?.isRejected && !value?.isWithdrawn && (
            <div className="flex items-center justify-center gap-5">
              {user?.role === "USER" ? (
                <>
                  <button
                    type="button"
                    onClick={handleAcceptOffer}
                    className="bg-primary px-10 py-2 text-sm font-semibold text-white sm:text-base"
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    onClick={handleRejectOffer}
                    className="bg-gray-400 px-10 py-2 text-sm font-semibold text-white sm:text-base"
                  >
                    Decline
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleWithdrawOffer}
                  className="bg-primary px-10 py-2 text-sm font-semibold text-white sm:text-base"
                >
                  Withdraw Offer
                </button>
              )}
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

export default AdditionalOfferPreview;
