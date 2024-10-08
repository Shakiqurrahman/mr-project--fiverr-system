import OrderRequirementsDetails from "./requirement-components/OrderRequirementsDetails";
import OrderRequirementsForm from "./requirement-components/OrderRequirementsForm";

const OrderRequirements = () => {
  const isRequirementsDone = false;
  return (
    <div>
      {isRequirementsDone ? (
        <OrderRequirementsDetails />
      ) : (
        <OrderRequirementsForm />
      )}
    </div>
  );
};

export default OrderRequirements;
