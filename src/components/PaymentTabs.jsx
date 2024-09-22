import React from "react";
import stripe from "../assets/svg/stripe.svg"
import paypal from "../assets/svg/paypal.svg"
import payoneer from "../assets/svg/payoneer.svg"
import wise from "../assets/svg/wise.svg"

const PaymentTabs = ({ handleTabClick, activeTab }) => {
  return (
    <div className="border mb-4">
    <h2 className="text-center text-xl font-bold py-5 bg-lightskyblue">Payment Method</h2>
      <div className="flex flex-col sm:flex-row items-center justify-between border-t">
        <button
          className={`border cursor-pointer p-5 font-semibold w-full h-20 object-cover flex justify-center items-center ${activeTab === "Stripe" ? "border-primary duration-300" : " border-transparent border-t-slate-200 sm:border-l-slate-200"}`}
          onClick={() => handleTabClick("Stripe")}
        >
          <img src={stripe} alt="Stripe Logo" className="w-28 h-12 mx-auto"/>
        </button>
        <button
          className={`border cursor-pointer p-5 font-semibold w-full h-20 object-cover flex justify-center items-center ${activeTab === "Paypal" ? "border-primary duration-300" : " border-transparent border-t-slate-200 sm:border-l-slate-200"}`}
          onClick={() => handleTabClick("Paypal")}
        >
          <img src={paypal} alt="Paypal Logo" className="w-20 h-8 mx-auto"/>
        </button>
        <button
          className={`border cursor-pointer p-5 font-semibold w-full h-20 object-cover flex justify-center items-center ${activeTab === "Payoneer" ? "border-primary duration-300" : " border-transparent border-t-slate-200 sm:border-l-slate-200"}`}
          onClick={() => handleTabClick("Payoneer")}
        >
          <img src={payoneer} alt="" className="w-24 h-8 mx-auto"/>
        </button>
        <button
          className={`border cursor-pointer p-5 font-semibold w-full h-20 object-cover flex justify-center items-center ${activeTab === "Wise" ? "border-primary duration-300" : " border-transparent border-t-slate-200 sm:border-l-slate-200"}`}
          onClick={() => handleTabClick("Wise")}
        >
          <img src={wise} alt="" className="w-14 h-8 mx-auto"/>
        </button>
      </div>
    </div>
  );
};

export default PaymentTabs;
