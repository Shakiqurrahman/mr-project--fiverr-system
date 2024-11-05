import React from "react";

const ExtendingDeliveryPreview = ({ value }) => {
  const isAdmin = true;
  return (
    <div className="border bg-lightskyblue">
      <div className="flex items-center border-b bg-[#CCE5FB] p-4 text-lg font-semibold">
        <div className="w-4/6">Extended Delivery Date</div>
        <div className="w-1/6 text-center">Duration</div>
        <div className="w-1/6 text-end">Price</div>
      </div>
      <div className="p-4 py-6">
        <div className="mb-6 flex items-center">
          <div className="w-4/6 pr-4">{value?.explainWhyExtend}</div>

          {/*TODO: more than 1 will add s - day's && if it is 1 it will day */}
          <div className="w-1/6 text-center">
            {parseInt(value?.days) > 1
              ? value?.days + " Days"
              : value?.days + " Day"}
          </div>
          <div className="w-1/6 text-end font-semibold">${value?.amount}</div>
        </div>

        <div className="flex justify-center gap-8 border-t pt-6">
          <button
            type="submit"
            className="w-[150px] bg-primary px-5 py-2 text-lg font-semibold text-white outline-none duration-300 hover:bg-primary/80"
          >
            Accept
          </button>
          <button
            type="button"
            // onClick={handleClose}
            className="w-[150px] bg-gray-500 px-5 py-2 text-lg font-semibold text-white outline-none duration-300 hover:bg-gray-500/80"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExtendingDeliveryPreview;
