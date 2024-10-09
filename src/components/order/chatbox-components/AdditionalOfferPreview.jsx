import { useSelector } from "react-redux";

const AdditionalOfferPreview = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div className="mt-3">
      <p>Additional Offer</p>
      <div className="border bg-lightskyblue">
        <div className="flex items-center border-b bg-[#CCE5FB] p-4 text-lg font-semibold">
          <div className="w-4/6">Item</div>
          <div className="w-1/6 text-center">Duration</div>
          <div className="w-1/6 text-end">Price</div>
        </div>
        <div className="p-4">
          <div className="flex items-center border-b pb-4">
            <div className="w-4/6">
              Pressure Washing Double Sided Door Hanger Design
            </div>
            <div className="w-1/6 text-center">0 Days</div>
            <div className="w-1/6 text-end font-semibold">$20</div>
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="grow">Subtotal</div>
            <div className="shrink-0 font-semibold">$20</div>
          </div>
          <div className="flex items-center justify-between border-b pb-4">
            <div className="grow">Fee</div>
            <div className="shrink-0 font-semibold">$00</div>
          </div>
          <div className="flex items-center justify-between py-4">
            <div className="grow font-semibold">Total</div>
            <div className="shrink-0 font-semibold">$20</div>
          </div>
          <div className="flex items-center justify-center gap-5">
            {user?.role === "USER" ? (
              <>
                <button
                  type="button"
                  className="bg-primary px-10 py-2 font-semibold text-white"
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="bg-gray-400 px-10 py-2 font-semibold text-white"
                >
                  Decline
                </button>
              </>
            ) : (
              <button
                type="button"
                className="bg-primary px-10 py-2 font-semibold text-white"
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
