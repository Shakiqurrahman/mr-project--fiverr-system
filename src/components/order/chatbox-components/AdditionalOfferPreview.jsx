import { useSelector } from "react-redux";

const AdditionalOfferPreview = ({ value }) => {
  const { user } = useSelector((state) => state.user);
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
          <div className="flex items-center justify-center gap-5">
            {user?.role === "USER" ? (
              <>
                <button
                  type="button"
                  className="bg-primary px-10 py-2 text-sm font-semibold text-white sm:text-base"
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="bg-gray-400 px-10 py-2 text-sm font-semibold text-white sm:text-base"
                >
                  Decline
                </button>
              </>
            ) : (
              <button
                type="button"
                className="bg-primary px-10 py-2 text-sm font-semibold text-white sm:text-base"
              >
                Withdraw Offer
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdditionalOfferPreview;
