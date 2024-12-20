import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { STRIPE_PUBLIC_KEY, configApi } from "../libs/configApi";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

let initialValue = 1000;

export default function Tips() {
  const { state } = useLocation();

  const { user } = useSelector((state) => state?.user);

  const [amount, setAmount] = useState("");
  const [tip, setTip] = useState(0);
  const [tip2, setTip2] = useState(0);
  const [clickBtn, setClickBtn] = useState("");
  const [custom, setCustom] = useState(0);

  const handleClickBtn = (e) => {
    setClickBtn(e.target.name);
    setAmount(e.target.value);
    setCustom("");
  };

  const handleChange = (e) => {
    setCustom(e.target.value);
    setAmount(e.target.value);
  };

  const projectDetails = state?.projectDetails;
  const clientDetails = state?.clientDetails;

  const handleDonation = () => {
    if (initialValue <= 100) {
      setTip(5);
      setTip2(10);
    } else if (initialValue <= 300) {
      setTip(7);
      setTip2(15);
    } else if (initialValue <= 500) {
      setTip(10);
      setTip2(20);
    } else if (initialValue <= 750) {
      setTip(15);
      setTip2(25);
    } else if (initialValue <= 1000) {
      setTip(20);
      setTip2(35);
    } else {
      setTip(30);
      setTip2(50);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (amount > 0 && projectDetails?.projectNumber) {
      const data = {
        userId: user?.id,
        orderId: projectDetails?.id,
        paymentType: "TipsOffer",
        totalAmount: amount,
        projectNumber: projectDetails?.projectNumber,
      };

      try {
        const response = await axios.post(`${configApi.api}payment/tip`, {
          data,
        });

        const sessionId = response?.data?.data?.id;
        // Redirect to Stripe Checkout
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId });
      } catch (error) {
        toast.error("Something went wrong!");
      }
    } else {
      toast.error("Atleast Send a small amount!");
    }
  };

  useEffect(() => {
    handleDonation();
  }, []);

  const convertHoursToDays = (hours) => {
    if (hours < 24) {
      return `${hours} Hours`;
    } else {
      const days = Math.floor(hours / 24); // Calculate full days
      const remainingHours = hours % 24; // Remaining hours after full days

      if (remainingHours === 0) {
        return `${days} Day${days === 1 ? "" : "s"}`;
      } else {
        return `${days} Day${days === 1 ? "" : "s"} ${remainingHours} Hour${remainingHours === 1 ? "" : "s"}`;
      }
    }
  };

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-10">
      <div>
        <h3 className="mt-5 text-center text-2xl font-semibold text-black md:text-start">
          Thanks for your review!
        </h3>
        <p className="text-center md:text-start">
          Show your appreciation to your designer by giving a tip.
        </p>

        <div className="flex flex-col items-center justify-center md:justify-normal">
          <div className="mt-10 flex w-[350px] border border-solid border-gray-400 text-center font-semibold text-black sm:w-[400px] lg:w-[480px]">
            <button
              name="clicked"
              value={tip}
              className={`text-md border-r border-solid border-gray-400 p-4 px-6 lg:px-10 ${
                clickBtn === "clicked" ? "bg-primary text-white" : ""
              }`}
              onClick={handleClickBtn}
            >
              ${tip}
            </button>
            <button
              name="NotClicked"
              value={tip2}
              className={`text-md border-r border-solid border-gray-400 p-4 px-6 lg:px-10 ${
                clickBtn === "NotClicked" ? "bg-primary text-white" : ""
              }`}
              onClick={handleClickBtn}
            >
              ${tip2}
            </button>
            <div className="flex items-center justify-between gap-3 px-6 lg:flex-grow">
              <label className="font-regular sm:text- text-sm">
                Custom Tip
              </label>
              <div className="flex w-[100px] items-center border-2">
                <span className="px-3 py-1">$</span>
                <input
                  type="number"
                  name="custom"
                  value={custom}
                  onChange={handleChange}
                  onFocus={(e) => setClickBtn(e.target.name)}
                  className="block w-full flex-grow outline-none"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 flex items-center justify-center gap-5 py-2 lg:justify-end">
            <Link
              to={`/order/${projectDetails?.projectNumber}`}
              className="decoration-solid hover:text-red-500 hover:underline"
            >
              No Thanks
            </Link>
            <button
              className="w-[200px] rounded-[5px] bg-primary py-1 font-semibold text-white hover:bg-blue-400"
              onClick={handleSubmit}
            >
              Send Tip
            </button>
          </div>
        </div>
      </div>
      <div className="flex max-w-[300px] flex-col items-center justify-center">
        <div className="mt-5 bg-lightskyblue p-3">
          <h4 className="my-2 text-xl font-semibold text-black">
            Project Details
          </h4>
          <div className="flex gap-2 bg-white px-2">
            <img
              src={projectDetails?.projectImage}
              alt=""
              className="mt-1 h-[60px] w-auto"
            />
            <div className="p-1">
              <p className="w-[90%] leading-[15px]">
                {projectDetails?.projectName}
              </p>
              <p className="mt-2 font-semibold text-primary">
                {projectDetails?.projectStatus}
              </p>
            </div>
          </div>
          <div>
            <div className="mt-5 flex justify-between">
              <p>Project by</p>
              <span className="font-semibold">{clientDetails?.userName}</span>
            </div>
            <div className="mt-2 flex justify-between">
              <p>Quantity</p>
              <span className="font-semibold">
                {projectDetails?.totalQuantity}
              </span>
            </div>
            <div className="mt-2 flex justify-between">
              <p>Duration</p>
              <span className="font-semibold">
                {projectDetails?.duration &&
                  `${projectDetails?.duration} ${
                    parseInt(projectDetails?.duration) > 1 ? "Days" : "Day"
                  }`}
                {projectDetails?.durationHours &&
                  `${convertHoursToDays(parseInt(projectDetails?.durationHours))}`}
              </span>
            </div>
            <div className="mt-2 flex justify-between">
              <p>Total price</p>
              <span className="font-semibold">
                ${projectDetails?.totalPrice}
              </span>
            </div>
            <div className="my-3 mt-2 flex justify-between">
              <p>Project number</p>
              <span className="font-semibold">
                #{projectDetails?.projectNumber}
              </span>
            </div>
          </div>
        </div>
        <Link
          to={`/order/${projectDetails?.projectNumber}`}
          className="mt-6 text-center font-semibold text-[#000]"
        >
          Back to the project page
        </Link>
      </div>
    </div>
  );
}
