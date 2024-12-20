import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { STRIPE_PUBLIC_KEY, configApi } from "../../libs/configApi";
import Divider from "../Divider";

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

let initialValue = 1000;

const OrderTipsForm = () => {
  const [amount, setAmount] = useState("");
  const [tip, setTip] = useState(0);
  const [tip2, setTip2] = useState(0);
  const [clickBtn, setClickBtn] = useState("");
  const [custom, setCustom] = useState(0);

  const { user } = useSelector((state) => state?.user);
  const { projectDetails } = useSelector((state) => state?.order);

  const handleClickBtn = (e) => {
    setClickBtn(e.target.name);
    setAmount(e.target.value);
    setCustom("");
  };

  const handleChange = (e) => {
    setCustom(e.target.value);
    setAmount(e.target.value);
  };

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
  return (
    <div className="mx-auto mt-5 w-full sm:max-w-[80%]">
      <h1 className="text-center text-2xl font-semibold text-primary">
        LEAVE A TIP
      </h1>
      <Divider className="mt-5 h-px w-full !bg-black/20" />
      <div className="flex flex-col items-center justify-center md:justify-normal">
        <div className="mt-10 flex w-full border border-solid border-gray-400 text-center font-semibold text-black">
          <button
            name="clicked"
            value={tip}
            className={`w-1/4 border-r border-solid border-gray-400 p-4 px-6 text-sm sm:text-lg lg:px-10 ${
              clickBtn === "clicked" ? "bg-primary text-white" : ""
            }`}
            onClick={handleClickBtn}
          >
            ${tip}
          </button>
          <button
            name="NotClicked"
            value={tip2}
            className={`w-1/4 border-r border-solid border-gray-400 p-4 px-6 text-sm sm:text-lg lg:px-10 ${
              clickBtn === "NotClicked" ? "bg-primary text-white" : ""
            }`}
            onClick={handleClickBtn}
          >
            ${tip2}
          </button>
          <div className="flex w-2/4 items-center justify-between gap-3 px-2 sm:px-6">
            <label className="font-regular text-xs sm:text-lg">
              Custom Tip
            </label>
            <div className="flex w-auto items-center border-2 sm:w-[100px]">
              <span className="px-3 py-1">$</span>
              <input
                type="number"
                className="block w-full flex-grow outline-none"
                name="custom"
                value={custom}
                onChange={handleChange}
                onFocus={(e) => setClickBtn(e.target.name)}
              />
            </div>
          </div>
        </div>
        <div className="mt-5 text-center">
          <button
            className="rounded-md bg-primary px-10 py-2 text-lg font-semibold text-white"
            onClick={handleSubmit}
          >
            Send Tip
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderTipsForm;
