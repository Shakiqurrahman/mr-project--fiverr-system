import { useState } from "react";
import { useSelector } from "react-redux";
import CancelProjectModal from "./sidebar-components/CancelProjectModal";
import DeliveryTimer from "./sidebar-components/DeliveryTimer";
import OrderProjectDetails from "./sidebar-components/OrderProjectDetails";
import PrivateNote from "./sidebar-components/PrivateNote";
import TrackProject from "./sidebar-components/TrackProject";

const OrderSidePanel = () => {
  const { user } = useSelector((state) => state.user);
  const { projectDetails } = useSelector((state) => state.order);

  // Checking Admin
  const isAdmin = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(user?.role);

  // Set delivery time in milliseconds
  // const deliveryDate = new Date("2024-10-09T14:09:25").getTime() - Date.now(); // YYYY-MM-DDTHH:MM:SS

  const [openCancelModal, setOpenCancelModal] = useState(false);
  return (
    <div>
      {/* Delivery Timer */}
      {projectDetails?.isRequirementsFullFilled && (
        <div className="mb-5 shadow-btn-shadow">
          <DeliveryTimer />
        </div>
      )}

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
      {isAdmin && (
        <div>
          <button
            onClick={() => setOpenCancelModal(true)}
            className="w-full bg-lightskyblue py-3 text-center font-semibold text-black shadow-btn-shadow duration-300 hover:bg-revision/70 hover:text-white"
          >
            Cancel Project
          </button>
        </div>
      )}
      {openCancelModal && (
        <CancelProjectModal handleClose={setOpenCancelModal} />
      )}
    </div>
  );
};

export default OrderSidePanel;
