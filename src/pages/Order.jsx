import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
import { PiWarningCircleFill } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLazyFetchSingleUserByIdQuery } from "../Redux/api/allUserApiSlice";
import { useLazyGetAllMessagesQuery } from "../Redux/api/inboxApiSlice";
import { useRequirementByProjectNumberQuery } from "../Redux/api/orderApiSlice";
import { setChatData, setConversationUser } from "../Redux/features/chatSlice";
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

import TipImage from "../assets/images/Tip.webp";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectNumber } = useParams();

  const { data: projectDetails } = useRequirementByProjectNumberQuery({
    projectNumber,
  });

  const [fetchUserById, { data: clientDetails }] =
    useLazyFetchSingleUserByIdQuery();

  const { user } = useSelector((state) => state.user);

  // Checking Admin
  const isAdmin = ["ADMIN", "SUPER_ADMIN", "SUB_ADMIN"].includes(user?.role);

  // All States Here
  const tabButtons = ["ACTIVITY", "REQUIREMENTS", "DETAILS"];
  const [selectedTabButton, setSelectedTabButton] = useState("ACTIVITY");
  const [openSidePanel, setOpenSidePanel] = useState(false);

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

  const clientReview = projectDetails?.review?.find(
    (r) => r.senderType === "CLIENT",
  );
  const adminReview = projectDetails?.review?.find(
    (r) => r.senderType === "OWNER",
  );

  // after clicking on the message button
  const [triggerGetAllMessages, { data: getAllMessages }] =
    useLazyGetAllMessagesQuery();

  useEffect(() => {
    if (getAllMessages) {
      dispatch(setChatData(getAllMessages));
      navigate("/inbox");
    }
  }, [dispatch, getAllMessages, navigate]);

  const handleMessageButton = (id) => {
    dispatch(setConversationUser(id));
    triggerGetAllMessages({
      receiverId: id,
    });
  };

  return (
    projectDetails && (
      <div className="max-width my-10">
        {projectDetails?.projectStatus === "Completed" && (
          <h1 className="mx-auto mb-10 flex w-full items-center justify-center gap-3 rounded-[30px] bg-revision px-5 py-2 text-xl font-semibold text-white sm:w-1/2 md:text-3xl">
            <Check className="size-6 !fill-white md:size-10" /> Project
            Completed{" "}
          </h1>
        )}
        {projectDetails?.projectStatus === "Canceled" && (
          <h1 className="mx-auto mb-10 flex w-full items-center justify-center gap-3 rounded-[30px] bg-canceled px-5 py-2 text-xl font-semibold text-white sm:w-1/2 md:text-3xl">
            <MdOutlineDoNotDisturbAlt className="size-6 !text-white md:size-10" />
            Project Canceled{" "}
          </h1>
        )}
        <div className="relative flex flex-wrap gap-5 sm:flex-nowrap">
          <div className="mb-5 w-full shrink pt-3 lg:w-[calc(100%_-_320px)]">
            <div className="flex items-center justify-between gap-2">
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
                className="block w-full border border-gray-300 bg-white p-3 font-medium sm:hidden"
              >
                {tabButtons.map((btn, i) => (
                  <option key={i} value={btn}>
                    {btn}{" "}
                  </option>
                ))}
              </select>
              <button
                className="block lg:hidden"
                onClick={() => setOpenSidePanel(true)}
              >
                <GiHamburgerMenu className="text-xl" />
              </button>
            </div>
            <Divider className="my-5 h-px w-full !bg-black" />
            <RenderTabComponent />
            {selectedTabButton === "ACTIVITY" &&
              projectDetails?.projectStatus === "Completed" && (
                <div className="w-full">
                  {clientReview && isAdmin && (
                    <OrderReview reviewDetails={clientReview} />
                  )}
                  {adminReview && user?.role === "USER" && (
                    <OrderReview reviewDetails={adminReview} />
                  )}
                  {parseInt(projectDetails?.projectTips?.amount) > 0 &&
                    isAdmin && (
                      <div className="mt-5 text-center">
                        <img
                          src={TipImage}
                          alt="Project Tip Congrats Image"
                          className="mx-auto block w-[150px]"
                        />
                        <p className="text-lg">
                          You&apos;ve just recieved a tip of
                        </p>
                        <h3 className="text-[30px] font-semibold">
                          $
                          {Number(projectDetails?.projectTips?.amount)?.toFixed(
                            2,
                          )}
                        </h3>
                      </div>
                    )}
                  {projectDetails?.review?.length === 0 &&
                  user?.role === "USER" ? (
                    <OrderReviewForm />
                  ) : projectDetails?.review?.length === 1 && isAdmin ? (
                    <OrderReviewForm />
                  ) : null}
                  {user?.role === "USER" && !projectDetails?.projectTips && (
                    <OrderTipsForm />
                  )}
                  {user?.role === "USER" ? (
                    <p className="mt-5 text-center text-lg font-semibold">
                      Your project is complete. If you need to contact the
                      seller,{" "}
                      <Link to={"/inbox"} className="text-primary underline">
                        Go to Inbox
                      </Link>
                    </p>
                  ) : (
                    <p className="mt-5 text-center text-lg font-semibold">
                      Your project is complete. If you need to contact the
                      buyer,{" "}
                      <button
                        type="button"
                        onClick={() => handleMessageButton(clientDetails?.id)}
                        className="text-primary underline"
                      >
                        Go to Inbox
                      </button>
                    </p>
                  )}
                </div>
              )}
          </div>
          <div
            className={`${openSidePanel ? "absolute right-0 top-0 !block" : ""} hidden w-[300px] shrink-0 bg-white lg:block`}
          >
            <button
              className="absolute right-4 top-6 z-[11] block lg:hidden"
              onClick={() => setOpenSidePanel(false)}
            >
              <IoClose className="text-2xl" />
            </button>
            <OrderSidePanel />
          </div>
        </div>
      </div>
    )
  );
};

export default Order;
