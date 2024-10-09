import { useState } from "react";
import Divider from "../components/Divider";
import OrderChatBox from "../components/order/OrderChatBox";
import OrderDetails from "../components/order/OrderDetails";
import OrderRequirements from "../components/order/OrderRequirements";
import OrderSidePanel from "../components/order/OrderSidePanel";

const Order = () => {
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
      <div className="flex flex-wrap gap-5 sm:flex-nowrap">
        <div className="max-h-[2000px] min-h-screen w-full grow sm:w-auto">
          <div className="hidden items-center gap-10 sm:flex">
            {tabButtons.map((btn, i) => (
              <button
                key={i}
                type="button"
                className={`font-semibold ${selectedTabButton === btn ? "text-primary underline" : ""}`}
                value={btn}
                onClick={() => setSelectedTabButton(btn)}
              >
                {btn}
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
                {btn}
              </option>
            ))}
          </select>
          <Divider className="my-5 h-px w-full !bg-black" />
          <RenderTabComponent />
        </div>
        <div className="w-full shrink-0 sm:max-w-[350px]">
          <OrderSidePanel />
        </div>
      </div>
    </div>
  );
};

export default Order;
