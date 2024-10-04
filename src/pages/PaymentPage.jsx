import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import NotificationPopper from "../components/Notifications/NotificationPopper";
import PaymentTabs from "../components/PaymentTabs";
import { ToggleSwitch } from "../libs/ToggleSwitch";
import { loadStripe } from "@stripe/stripe-js";
import { configApi, STRIPE_PUBLIC_KEY } from "../libs/configApi";
import axios from "axios";

const PaymentPage = () => {
const { state } = useLocation();
  const [activeTab, setActiveTab] = useState(null);
  const [fastDelivery, setFastDelivery] = useState(
    state?.isFastDelivery || false,
  );
  
  const [designs, setDesigns] = useState(state || []);
  const [designsList, setDesignsList] = useState(state?.designs || []);

  // Function to handle tab click
  const handleTabClick = (tab) => {
    if (activeTab === tab) {
      // If the clicked tab is already active, deselect it
      setActiveTab(null);
    } else {
      setActiveTab(tab);
    }
  };

  const totalAmount = fastDelivery
    ? parseInt(designs.subTotal) + parseInt(designs.fastDeliveryAmount)
    : parseInt(designs.subTotal) || 0;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const items = [
    { name: 'Design 1', price: 2000, quantity: 1, image: 'image-url-1' },
  ];


  const handlePayment = async() => {
    try {
      const response = await axios.post(`${configApi.api}api/checkout-session`, { items });
      const sessionId = response.data.id;

      // Redirect to Stripe Checkout
      const stripe = window.Stripe(STRIPE_PUBLIC_KEY); // Replace with your publishable key
      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Error redirecting to checkout:', error);
    }
  }

  return (
    <section className="max-width my-10">
      <h1 className="mb-4 text-center text-lg font-semibold sm:mb-10 sm:text-[28px]">
      Review and Complete Your Payment
      </h1>
      <div className="mx-auto max-w-[800px]">
        <div className="mb-6 border bg-sky-200/60 p-4 px-2 sm:p-6">
          <div className="flex flex-col items-center justify-between gap-2 sm:flex-row">
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <img
                className="w-32"
                src={designs?.image?.url}
                alt={designs?.image?.name}
              />
              <h2 className="text-xl font-semibold">{designs?.title}</h2>
            </div>
            {designs.selectedQuantity && (
              <p>Quantity-{designs?.selectedQuantity} </p>
            )}
            {state?.from === "offerProject" && (
              <h3 className="text-3xl font-bold">${totalAmount}</h3>
            )}
            {state?.from === "multipleProject" && (
              <h3 className="text-3xl font-bold">${designs?.totalAmount}</h3>
            )}
          </div>
          {state?.from !== "multipleProject" && (
            <div className="mt-6 flex flex-col items-center justify-between gap-2 sm:flex-row">
              {state?.from !== "offerProject" && <p>{designs?.subCategory}</p>}
              <div className="flex items-center gap-3">
                <ToggleSwitch
                  isChecked={fastDelivery}
                  onToggle={() => setFastDelivery(!fastDelivery)}
                />
                <p className="text-sm">
                  Extra-fast {designs?.fastDeliveryDuration}-day delivery
                  <span className="text-lg font-semibold text-primary">
                    {" "}
                    ${designs?.fastDeliveryAmount}
                  </span>
                </p>
              </div>
              {state?.from !== "offerProject" && (
                <h3 className="text-3xl font-bold">${totalAmount}</h3>
              )}
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <PaymentTabs handleTabClick={handleTabClick} activeTab={activeTab} />
        <div className="border bg-lightskyblue p-4 sm:p-6">
          <form onSubmit={handleSubmit} className="mt-4 space-y-8">
            {/* payment details  */}
            <div className="flex flex-col items-center gap-8 border bg-white p-4 sm:flex-row sm:gap-16 sm:p-6">
              <ul className="w-full space-y-3 [&>li:last-child]:border-t">
                {!designs.designs && (
                  <li className="flex justify-between gap-2 px-2">
                    <p>{designs?.title}</p>
                    <span className="font-bold">${designs?.subTotal}</span>
                  </li>
                )}
                {state.from === "offerProject" && (
                  <li className="flex justify-between gap-2 px-2">
                    <p>{designs?.freeDesign?.designName}</p>
                    <span className="font-bold">Free</span>
                  </li>
                )}
                {state.from === "offerProject" &&
                  designs.designs.map((design, idx) => (
                    <li key={idx} className="flex justify-between gap-2 px-2">
                      <p>{design.categoryLabel}</p>
                      <span className="font-bold">x 1</span>
                    </li>
                  ))}
                {state.from === "multipleProject" &&
                  designs.designs.map((design, idx) => (
                    <div
                      className="border-b py-2 last-of-type:border-none last-of-type:py-0"
                      key={idx}
                    >
                      <li key={idx} className="flex justify-between gap-2 px-2">
                        <p>{design.title}</p>
                        <div className="flex items-center gap-2 font-bold">
                          <span className="text-sm font-normal">
                            {design?.quantity} x
                          </span>{" "}
                          ${design?.subCategory?.subAmount}
                        </div>
                      </li>
                      {design?.isFastDelivery && (
                        <li className="flex justify-between gap-2 px-2">
                          <p>
                            Extra-fast {design?.fastDeliveryDays}-day delivery
                          </p>
                          <span className="font-bold">
                            ${design?.fastDeliveryPrice}
                          </span>
                        </li>
                      )}
                    </div>
                  ))}
                {fastDelivery && (
                  <li className="flex justify-between gap-2 px-2">
                    <p>
                      Extra-fast {designs?.fastDeliveryDuration}-day delivery
                    </p>
                    <span className="font-bold">
                      ${designs?.fastDeliveryAmount}
                    </span>
                  </li>
                )}
                <li className="flex justify-between gap-2 px-2 pt-4">
                  <p className="text-lg font-semibold">Total</p>{" "}
                  <span className="text-lg font-bold">
                    ${totalAmount || designs?.totalAmount}
                  </span>
                </li>
              </ul>
              <div className="w-full">
                <p className="mb-4 text-center">Single Payment</p>
                <button
                  type="submit"
                  onClick={handlePayment}
                  disabled={!activeTab}
                  className="w-full rounded-2xl bg-primary py-4 text-xl font-semibold text-white transition-colors duration-300 disabled:bg-primary/50 disabled:cursor-not-allowed"
                >
                  Pay Now
                </button>
              </div>
            </div>
            <p className="!mt-6 text-center text-base font-medium">
              Go to the Project Requirement option by clicking on &quot;Pay Now&quot;
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
