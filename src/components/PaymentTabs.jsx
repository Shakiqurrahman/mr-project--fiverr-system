import React from "react";
import { FaCheck } from "react-icons/fa";
import payoneer from "../assets/svg/Payoneer.svg";
import stripe from "../assets/svg/stripe.svg";
import wise from "../assets/svg/wise.svg";

const PaymentTabs = ({ handleTabClick, activeTab }) => {
  return (
    <div className="mb-6 border">
      <h2 className="bg-lightskyblue py-5 text-center text-xl font-bold">
        Select Payment Method
      </h2>
      <div className="flex flex-col items-center justify-between border-t sm:flex-row">
        <button
          className={`relative flex h-20 w-full cursor-pointer items-center justify-center border object-cover p-5 font-semibold ${activeTab === "Stripe" ? "border-primary duration-300" : "select-none border-transparent border-t-slate-200 outline-none sm:border-l-slate-200"}`}
          onClick={() => handleTabClick("Stripe")}
        >
          {activeTab === "Stripe" && <span className="absolute -top-2.5 -right-2.5 bg-primary text-white rounded-full p-1 z-10">
            <FaCheck />
          </span>}
          <img src={stripe} alt="Stripe Logo" className="mx-auto h-12 w-28" />
        </button>

        {/* <button
          className={`relative border cursor-pointer p-5 font-semibold w-full h-20 object-cover flex justify-center items-center ${activeTab === "Paypal" ? "border-primary duration-300" : " border-transparent border-t-slate-200 sm:border-l-slate-200  outline-none select-none"}`}
          onClick={() => handleTabClick("Paypal")}
        >
        {activeTab === "Paypal" && <span className="absolute -top-2.5 -right-2.5 bg-primary text-white rounded-full p-1 z-10">
            <FaCheck />
          </span>}
          <img src={paypal} alt="Paypal Logo" className="w-20 h-8 mx-auto"/>
        </button> */}

        <button
          className={`relative flex h-20 w-full cursor-pointer items-center justify-center border object-cover p-5 font-semibold ${activeTab === "Payoneer" ? "border-primary duration-300" : "select-none border-transparent border-t-slate-200 outline-none sm:border-l-slate-200"}`}
          onClick={() => handleTabClick("Payoneer")}
        >
          {activeTab === "Payoneer" && <span className="absolute -top-2.5 -right-2.5 bg-primary text-white rounded-full p-1 z-10">
            <FaCheck />
          </span>}
          <img src={payoneer} alt="" className="mx-auto h-8 w-24" />
        </button>

        <button
          className={`relative flex h-20 w-full cursor-pointer items-center justify-center border object-cover p-5 font-semibold ${activeTab === "Wise" ? "border-primary duration-300" : "select-none border-transparent border-t-slate-200 outline-none sm:border-l-slate-200"}`}
          onClick={() => handleTabClick("Wise")}
        >
          {activeTab === "Wise" && <span className="absolute -top-2.5 -right-2.5 bg-primary text-white rounded-full p-1 z-10">
            <FaCheck />
          </span>}
          <img src={wise} alt="" className="mx-auto h-8 w-14" />
        </button>
      </div>
    </div>
  );
};

export default PaymentTabs;
