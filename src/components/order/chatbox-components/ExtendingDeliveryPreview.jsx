import React from "react";
import toast from "react-hot-toast";
import { useUpdateAOrderMessageMutation } from "../../../Redux/api/orderApiSlice";

const ExtendingDeliveryPreview = ({ messageObj, value }) => {
  const [updateAOrderMessage] = useUpdateAOrderMessageMutation();
  const handleAccept = (e) => {
    e.preventDefault();
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

        {!value?.isAccepted && !value?.isRejected && (
          <div className="flex justify-center gap-8 border-t pt-6">
            <button
              type="submit"
              onClick={handleAccept}
              className="w-[150px] bg-primary px-5 py-2 text-lg font-semibold text-white outline-none duration-300 hover:bg-primary/80"
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
