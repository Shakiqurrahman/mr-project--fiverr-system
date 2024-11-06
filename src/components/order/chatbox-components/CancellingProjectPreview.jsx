import React from "react";

const CancellingProjectPreview = ({ value }) => {
  return (
    <div className="border bg-lightskyblue">
      <h1 className="border-b bg-[#CCE5FB] p-4 text-center text-xl font-semibold">
        Cancellation Project
      </h1>
      <div className="p-4 text-center">
        <p className="mb-1 text-lg font-semibold">
          Reason For Cancelling Project
        </p>
        <p>{value?.explainWhyCancel}</p>
      </div>
      <div className="flex justify-center gap-8 border-t pb-6 pt-6">
        <button
          type="submit"
          className="w-[150px] bg-primary px-5 py-2 text-lg font-semibold text-white outline-none duration-300 hover:bg-primary/80"
        >
          Accept
        </button>
        <button
          type="button"
          className="w-[150px] bg-gray-500 px-5 py-2 text-lg font-semibold text-white outline-none duration-300 hover:bg-gray-500/80"
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default CancellingProjectPreview;
