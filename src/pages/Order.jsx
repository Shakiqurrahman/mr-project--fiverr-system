import { useEffect, useState } from "react";
import { PiWarningCircleFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLazyFetchSingleUserByIdQuery } from "../Redux/api/allUserApiSlice";
import { useRequirementByProjectNumberQuery } from "../Redux/api/orderApiSlice";
import {
  setClientDetails,
  setProjectDetails,
} from "../Redux/features/orderSlice";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectNumber } = useParams();

  const { data: projectDetails } = useRequirementByProjectNumberQuery({
    projectNumber,
  });

  console.log(projectNumber, projectDetails);
  const [fetchUserById, { data: clientDetails }] =
    useLazyFetchSingleUserByIdQuery();

  console.log(projectDetails, clientDetails);
  const { user } = useSelector((state) => state.user);

  // Checking Admin
  const isAdmin = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(user?.role);

  // All States Here
  const tabButtons = ["ACTIVITY", "REQUIREMENTS", "DETAILS"];
  const [selectedTabButton, setSelectedTabButton] = useState("ACTIVITY");

  // All Side Effects here

  useEffect(() => {
    if (projectDetails) {
      fetchUserById({
        userId: projectDetails?.userId,
      });
    }
  }, [fetchUserById, projectDetails]);

  useEffect(() => {
    if (projectDetails) {
      if (
        !isAdmin &&
        user?.id !== projectDetails?.userId &&
        projectDetails?.paymentStatus !== "COMPLETED"
      ) {
        navigate("/");
      }
    }
  }, [projectDetails, isAdmin, user, navigate]);

  useEffect(() => {
    if (projectDetails) {
      dispatch(setProjectDetails(projectDetails));
    }
  }, [projectDetails, dispatch]);

  useEffect(() => {
    if (clientDetails) {
      dispatch(setClientDetails(clientDetails));
    }
  }, [clientDetails, dispatch]);

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
      {projectDetails?.projectStatus === "Completed" && (
        <h1 className="mx-auto mb-10 flex w-full items-center justify-center gap-3 rounded-[30px] bg-revision px-5 py-2 text-xl font-semibold text-white sm:w-1/2 md:text-3xl">
          <Check className="size-6 !fill-white md:size-10" /> Project Completed{" "}
        </h1>
      )}
      <div className="flex flex-wrap gap-5 sm:flex-nowrap">
        <div className="mb-5 w-[calc(100%_-_320px)] shrink">
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
                {btn === "REQUIREMENTS" &&
                  !projectDetails?.isRequirementsFullFilled && (
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
        <div className="w-full shrink-0 sm:w-[300px]">
          <OrderSidePanel />
        </div>
      </div>
      {selectedTabButton === "ACTIVITY" && (
        <div className="w-[calc(100%_-_320px)]">
          <OrderReview />
          <OrderReviewForm />
          <OrderTipsForm />
          {user?.role === "USER" &&
          projectDetails?.projectStatus === "Completed" ? (
            <p className="mt-5 text-center text-lg font-semibold">
              Your project is complete. If you need to contact the seller,{" "}
              <Link to={"/inbox"} className="text-primary underline">
                Go to Inbox
              </Link>
            </p>
          ) : (
            projectDetails?.projectStatus === "Completed" && (
              <p className="mt-5 text-center text-lg font-semibold">
                Your project is complete. If you need to contact the buyer,{" "}
                <Link to={"/inbox"} className="text-primary underline">
                  Go to Inbox
                </Link>
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default Order;
