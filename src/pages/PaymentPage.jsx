import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Cards from "../assets/images/card.png";
import Check from "../assets/svg/Check";
import PaymentTabs from "../components/PaymentTabs";
import { ToggleSwitch } from "../libs/ToggleSwitch";

const PaymentPage = () => {
  const { state } = useLocation();
  console.log(state);
  const [activeTab, setActiveTab] = useState(null);
  const [fastDelivery, setFastDelivery] = useState(
    state?.isFastDelivery || false,
  );
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Card 1",
      cardNumber: "4532 1234 5678 9012",
      expirationDate: "12/24",
      cvv: "123",
    },
  ]);
  // for saving card details
  const [isSavingCard, setIsSavingCard] = useState(false);
  const [designs, setDesigns] = useState(state || []);
  const [designsList, setDesignsList] = useState(state?.designs || []);
  console.log("des", designsList);

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

  return (
    <section className="max-width my-10">
      <h1 className="mb-4 text-center text-lg font-semibold sm:mb-10 sm:text-[28px]">
        Add your card details carefully
      </h1>
      <div className="mx-auto max-w-[800px]">
        <div className="mb-8 border bg-sky-200/60 p-4 px-2 sm:p-6">
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
          </div>
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
        </div>

        {/* Tab Navigation */}
        <PaymentTabs handleTabClick={handleTabClick} activeTab={activeTab} />
        <div className="mx-auto mb-4 flex w-4/5 items-center justify-center gap-4 text-lg font-medium">
          <span className="h-[1px] w-full flex-1 bg-slate-200"></span> or{" "}
          <span className="h-[1px] w-full flex-1 bg-slate-200"></span>
        </div>
        {/* card header  */}
        <div className="border bg-lightskyblue p-4 sm:p-6">
          <div className="mb-4 flex flex-wrap items-center gap-2 sm:gap-4">
            <h2 className="text-xl font-semibold">Card Payment</h2>
            <img src={Cards} className="h-[40px]" alt="" />
          </div>
          <p>
            Your credit card information ia secure, and your card is not charged
            until after you've confirmed your order. Adding a new card?
          </p>

          {/* card form  */}
          <form className="mt-10 space-y-8">
            <div>
              <p className="mb-1 ml-2">Card Details</p>
              <select
                className="w-full border p-4 font-medium outline-none"
                name="card-details"
                id="card-details"
              >
                <option value="Add New Card">Add New Card</option>
                {cards.map((card) => (
                  <option key={card?.id} value={card.title}>
                    {card.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="mb-1 ml-2">Name on Card</p>
              <input
                type="text"
                className="w-full border p-4 text-base outline-none"
                placeholder="Name on Card"
              />
            </div>
            <div>
              <p className="mb-1 ml-2">Card Number</p>
              <input
                type="number"
                className="w-full border p-4 text-base outline-none"
                placeholder="Card Number"
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-3/5">
                <p className="mb-1 ml-2">Expiry Date</p>
                <input
                  type="text"
                  className="w-full border p-4 text-base outline-none"
                  placeholder="MM/YY"
                />
              </div>
              <div className="w-2/5">
                <p className="mb-1 ml-2">CVV</p>
                <input
                  type="number"
                  className="w-full border p-4 text-base outline-none"
                  placeholder="CVV"
                />
              </div>
            </div>

            {/* checkbox for saving card details  */}
            <div className="flex items-center gap-x-2 text-sm font-medium sm:text-base">
              <input
                type="checkbox"
                name="extraDelivery"
                id="extraDelivery"
                className={"is-checked peer"}
                onChange={() => setIsSavingCard(!isSavingCard)}
                checked={isSavingCard}
                hidden
              />
              <label
                htmlFor="extraDelivery"
                className="flex h-[16px] w-[16px] cursor-pointer items-center justify-center border border-solid border-primary bg-white *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100 sm:h-[20px] sm:w-[20px]"
              >
                <Check className="h-[8px] sm:h-[10px]" />
              </label>
              Save this card information
            </div>

            {/* payment details  */}
            <div className="flex flex-col items-center gap-8 border bg-white p-4 sm:flex-row sm:gap-16 sm:p-6">
              <ul className="w-full space-y-3 [&>li:last-child]:border-t">
                {!designs.designs && (
                  <li className="flex justify-between gap-2 px-2">
                    <p>{designs?.title}</p>
                    <span className="font-bold">${designs?.subTotal}</span>
                  </li>
                )}
                {state.from === "offerProject" && 
                  <li className="flex justify-between gap-2 px-2">
                    <p>{designs?.freeDesign?.designName}</p>
                    <span className="font-bold">Free</span>
                  </li>
                }
                {state.from === "offerProject" && designs.designs.map((design, idx) => (
                  <li key={idx} className="flex justify-between gap-2 px-2">
                    <p>{design.categoryLabel}</p>
                    <span className="font-bold">x 1</span>
                  </li>
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
                  <p className="font-semibold">Total</p>{" "}
                  <span className="font-bold">${totalAmount}</span>
                </li>
              </ul>
              <div className="w-full">
                <p className="mb-4 text-center">Single Payment</p>
                <button
                  type="submit"
                  className="w-full rounded-2xl bg-primary py-4 text-xl font-semibold text-white transition-colors duration-300"
                >
                  Pay Now
                </button>
              </div>
            </div>
            <p className="!mt-6 text-center text-base font-medium">
              Payments are processed securely by Stripe.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default PaymentPage;
