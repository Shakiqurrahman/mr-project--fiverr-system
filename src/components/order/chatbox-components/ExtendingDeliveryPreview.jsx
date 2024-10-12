import React from "react";

const ExtendingDeliveryPreview = () => {
  const isAdmin = true;
  return (
    <div className="border bg-lightskyblue">
      <div className="flex items-center border-b bg-[#CCE5FB] p-4 text-lg font-semibold">
        <div className="w-4/6">Extended Delivery Date</div>
        <div className="w-1/6 text-center">Duration</div>
        <div className="w-1/6 text-end">Price</div>
      </div>
      <div className="p-4 py-6">
        <div className="flex items-center mb-6">
          <div className="w-4/6 pr-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis
            qui quas animi accusantium laudantium, nulla adipisci error eos
            quasi incidunt natus iste aperiam, sapiente totam recusandae, autem
            veritatis excepturi assumenda?
          </div>

          {/*TODO: more than 1 will add s - day's && if it is 1 it will day */}
          <div className="w-1/6 text-center">1 Day</div>
          <div className="w-1/6 text-end font-semibold">$5</div>
        </div>

        <div className="pt-6 border-t flex justify-center gap-8">
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
