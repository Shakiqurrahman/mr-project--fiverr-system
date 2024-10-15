import { useState } from "react";
import { PiWarningCircleFill } from "react-icons/pi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Check from "../assets/svg/Check";
import Divider from "../components/Divider";
import OrderChatBox from "../components/order/OrderChatBox";
import OrderDetails from "../components/order/OrderDetails";
import OrderRequirements from "../components/order/OrderRequirements";
import OrderReview from "../components/order/OrderReview";
import OrderReviewForm from "../components/order/OrderReviewForm";
import OrderSidePanel from "../components/order/OrderSidePanel";
import OrderTipsForm from "../components/order/OrderTipsForm";

const Order = () => {
  const { user } = useSelector((state) => state.user);

  const tabButtons = ["ACTIVITY", "REQUIREMENTS", "DETAILS"];

  const [selectedTabButton, setSelectedTabButton] = useState("ACTIVITY");

  const RenderTabComponent = () => {
    switch (selectedTabButton) {
      case "ACTIVITY":
        return <OrderChatBox />;
      case "REQUIREMENTS":
        return <OrderRequirements />;
      case "DETAILS":
        return <OrderDetails />;
      default:
        break;
    }
  };

  return (
    <div className="max-width my-10">
      <h1 className="mx-auto mb-10 flex w-full items-center justify-center gap-3 rounded-[30px] bg-revision px-5 py-2 text-xl font-semibold text-white sm:w-1/2 md:text-3xl">
        <Check className="size-6 !fill-white md:size-10" /> Project Completed{" "}
      </h1>
      <div className="flex flex-wrap gap-5 sm:flex-nowrap">
        <div className="mb-5 max-h-[2000px] min-h-screen w-[calc(100%_-_370px)] shrink">
          <div className="hidden items-center gap-10 sm:flex">
            {tabButtons.map((btn, i) => (
              <button
                key={i}
                type="button"
                className={`relative font-semibold ${selectedTabButton === btn ? "text-primary underline" : ""}`}
                value={btn}
                onClick={() => setSelectedTabButton(btn)}
              >
                {btn}
                {btn === "REQUIREMENTS" && (
                  <div className="absolute -right-3 -top-2">
                    <PiWarningCircleFill className="text-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>
          <select
            value={selectedTabButton}
            onChange={(e) => setSelectedTabButton(e.target.value)}
            className="block w-full border border-gray-300 p-3 font-medium sm:hidden"
          >
            {tabButtons.map((btn, i) => (
              <option key={i} value={btn}>
                {btn}{" "}
              </option>
            ))}
          </select>
          <Divider className="my-5 h-px w-full !bg-black" />
          <RenderTabComponent />
        </div>
        <div className="w-full shrink-0 sm:w-[350px]">
          <OrderSidePanel />
        </div>
      </div>
      {selectedTabButton === "ACTIVITY" && (
        <div className="w-[calc(100%_-_370px)]">
          <OrderReview />
          <OrderReviewForm />
          <OrderTipsForm />
          {user?.role === "USER" ? (
            <p className="mt-5 text-center text-lg font-semibold">
              Your project is complete. If you need to contact the seller,{" "}
              <Link to={"/inbox"} className="text-primary underline">
                Go to Inbox
              </Link>
            </p>
          ) : (
            <p className="mt-5 text-center text-lg font-semibold">
              Your project is complete. If you need to contact the buyer,{" "}
              <Link to={"/inbox"} className="text-primary underline">
                Go to Inbox
              </Link>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Order;
