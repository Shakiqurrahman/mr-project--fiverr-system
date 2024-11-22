import React from "react";
import { useSelector } from "react-redux";
import OrderRequirementsDetails from "./requirement-components/OrderRequirementsDetails";
import OrderRequirementsForm from "./requirement-components/OrderRequirementsForm";

const OrderRequirements = () => {
  const { projectDetails } = useSelector((state) => state.order);
  return (
    <div>
      {projectDetails?.isRequirementsFullFilled ? (
        <OrderRequirementsDetails projectDetails={projectDetails} />
      ) : (
        <OrderRequirementsForm projectDetails={projectDetails} />
      )}
    </div>
  );
};

export default React.memo(OrderRequirements);
