import React from "react";
import toast from "react-hot-toast";
import { useUpdateAOrderMessageMutation } from "../../../Redux/api/orderApiSlice";

const CancellingProjectPreview = ({ messageObj, value }) => {
  const [updateAOrderMessage] = useUpdateAOrderMessageMutation();
  const handleAccept = (e) => {
    e.preventDefault();
  };
  const handleReject = async (e) => {
    e.preventDefault();
    if (messageObj?.commonKey) {
      const data = {
        ...messageObj,
        cancelProject: {
          ...messageObj?.cancelProject,
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
    <div className="border bg-lightskyblue">
      <h1 className="border-b bg-[#CCE5FB] p-4 text-center text-sm font-semibold sm:text-xl">
        Cancellation Project
      </h1>
      <div className="p-2 text-center sm:p-4">
        <p className="mb-1 text-sm font-semibold sm:text-lg">
          Reason For Cancelling Project
        </p>
        <p className="text-sm sm:text-base">{value?.explainWhyCancel}</p>
      </div>
      {!value?.isAccepted && !value?.isRejected && (
        <div className="flex flex-wrap justify-center gap-2 border-t pb-6 pt-6 sm:flex-nowrap sm:gap-8">
          <button
            type="submit"
            onClick={handleAccept}
            className="w-[150px] bg-primary px-5 py-2 text-sm font-semibold text-white outline-none duration-300 hover:bg-primary/80 sm:text-lg"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={handleReject}
            className="w-[150px] bg-gray-500 px-5 py-2 text-sm font-semibold text-white outline-none duration-300 hover:bg-gray-500/80 sm:text-lg"
          >
            Decline
          </button>
        </div>
      )}
      {value?.isAccepted && (
        <p className="mb-5 text-center">Cancel Request Accepted</p>
      )}
      {value?.isRejected && (
        <p className="mb-5 text-center">Cancel Request Rejected</p>
      )}
    </div>
  );
};

export default React.memo(CancellingProjectPreview);
