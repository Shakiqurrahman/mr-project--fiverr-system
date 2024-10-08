import DeliveryTimer from "./sidebar-components/DeliveryTimer";
import OrderProjectDetails from "./sidebar-components/OrderProjectDetails";
import PrivateNote from "./sidebar-components/PrivateNote";
import TrackProject from "./sidebar-components/TrackProject";

const OrderSidePanel = () => {
  // Set delivery time in milliseconds
  const deliveryDate = new Date("2024-10-09T14:09:25").getTime() - Date.now(); // YYYY-MM-DDTHH:MM:SS
  return (
    <div>
      {/* Delivery Timer */}
      <div className="mb-5 shadow-btn-shadow">
        <DeliveryTimer deliveryTime={deliveryDate} />
      </div>

      {/* Project Details */}
      <div className="mb-5 shadow-btn-shadow">
        <OrderProjectDetails />
      </div>

      {/* Track Project */}
      <div className="mb-5 shadow-btn-shadow">
        <TrackProject />
      </div>

      {/* Private Note */}
      <div className="mb-5 shadow-btn-shadow">
        <PrivateNote />
      </div>

      {/* cancel project button  */}
      <div>
        <button className="w-full bg-revision py-3 text-center font-semibold text-white shadow-btn-shadow duration-300 hover:bg-revision/70">
          Cancel Project
        </button>
      </div>
    </div>
  );
};

export default OrderSidePanel;
