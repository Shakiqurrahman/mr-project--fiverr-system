import OrderChatBox from "../components/order/OrderChatBox";
import OrderSidePanel from "../components/order/OrderSidePanel";

const Order = () => {
  return (
    <div className="max-width mt-10">
      <div className="flex items-start gap-4">
        <div className="grow bg-primary">
          <OrderChatBox />
        </div>
        <div className="w-full shrink-0 sm:max-w-[350px]">
          <OrderSidePanel />
        </div>
      </div>
    </div>
  );
};

export default Order;
