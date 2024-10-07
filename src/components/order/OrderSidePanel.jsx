import DeliveryTimer from "./sidebar-components/DeliveryTimer";
import OrderProjectDetails from "./sidebar-components/OrderProjectDetails";
import TrackProject from "./sidebar-components/TrackProject";

const OrderSidePanel = () => {
  // Set delivery time in milliseconds
  const deliveryDate = new Date("2024-10-09T14:09:25").getTime() - Date.now(); // YYYY-MM-DDTHH:MM:SS
  return (
    <div>
      {/* Delivery Timer */}
      <div className="mb-5">
        <DeliveryTimer deliveryTime={deliveryDate} />
      </div>

      {/* Project Details */}
      <div className="mb-5">
        <OrderProjectDetails />
      </div>

      {/* Track Project */}
      <TrackProject />
    </div>
  );
};

export default OrderSidePanel;
