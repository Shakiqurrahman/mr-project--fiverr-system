import { FaCheckCircle } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Check from "../assets/svg/Check";
function OfferProject() {
  const location = useLocation();
  const { state } = location;
  console.log(state);

  // const fields = [
  //   {
  //     categoryName: "doorHanger",
  //     categoryLabel: "Door Hanger",
  //     subCategory1Name: "single",
  //     subCategory1Label: "Single side",
  //     subCategory2Name: "double",
  //     subCategory2Label: "Double side",
  //   }
  // ];
  return (
    <div className="max-width">
      <h1 className="my-10 text-center text-lg font-semibold sm:text-2xl">
        Please select each step below carefully
      </h1>

      {/* Project Form Section */}
      <form className="mx-auto max-w-[800px] border border-solid bg-lightskyblue">
        <h1 className="bg-primary p-4 text-center text-lg text-white sm:text-xl">
          You are starting a project
        </h1>
        <div className="p-3">
          <p className="my-4 text-xs font-medium sm:text-sm">
            Choose the required option for your design
          </p>

          {/* Already Selected Field */}
          <div className="flex items-start gap-3">
            <div className="">
              <input
                type="checkbox"
                name="businessCard"
                id="businessCard"
                className="is-checked peer"
                checked
                readOnly
                hidden
              />
              <label
                htmlFor="businessCard"
                className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center border border-solid border-primary bg-white *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100 sm:h-[40px] sm:w-[40px]"
              >
                <Check className="h-[14px] sm:h-[18px]" />
              </label>
            </div>
            <div className="flex-grow">
              <div className="flex h-[30px] items-center border border-solid bg-white px-3 text-xs font-semibold sm:h-[40px] sm:text-base">
                Business Card
              </div>
              <div className="mt-5 flex items-center gap-x-3 sm:gap-x-10">
                <div className="flex items-center gap-x-3">
                  <input
                    type="radio"
                    name="businessCard"
                    id="businessCardSingle"
                    className="is-checked peer"
                    hidden
                  />
                  <label
                    htmlFor="businessCardSingle"
                    className="flex h-[16px] w-[16px] cursor-pointer items-center justify-center border border-solid border-primary bg-white *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100 sm:h-[20px] sm:w-[20px]"
                  >
                    <Check className="h-[8px] sm:h-[10px]" />
                  </label>
                  <p className="text-xs font-medium sm:text-sm">Single side</p>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    type="radio"
                    name="businessCard"
                    id="businessCardDouble"
                    className="is-checked peer"
                    hidden
                  />
                  <label
                    htmlFor="businessCardDouble"
                    className="flex h-[16px] w-[16px] cursor-pointer items-center justify-center border border-solid border-primary bg-white *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100 sm:h-[20px] sm:w-[20px]"
                  >
                    <Check className="h-[8px] sm:h-[10px]" />
                  </label>
                  <p className="text-xs font-medium sm:text-sm">Double side</p>
                </div>
              </div>
            </div>
          </div>

          <p className="mb-4 mt-8 text-xs font-medium sm:text-sm">
            Choose the 3 designs you need and Choose the required options for
            the designs
          </p>

          {/* Selectable Fields */}
          {state?.designs?.map((item) => (
            <div className="mb-8 flex items-start gap-3" key={Math.random()}>
              <div className="">
                <input
                  type="checkbox"
                  name={item.categoryName}
                  id={item.categoryName}
                  className="is-checked peer"
                  hidden
                />
                <label
                  htmlFor={item.categoryName}
                  className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center border border-solid border-primary bg-white *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100 sm:h-[40px] sm:w-[40px]"
                >
                  <Check className="h-[14px] sm:h-[18px]" />
                </label>
              </div>
              <div className="flex-grow">
                <div className="flex h-[30px] items-center border border-solid bg-white px-3 text-xs font-semibold sm:h-[40px] sm:text-base">
                  {item.categoryLabel}
                </div>
                <div className="mt-5 flex items-center gap-x-3 sm:gap-x-10">
                  {item?.subCategories.map((i, idx) => (
                    <div key={idx} className="flex items-center gap-x-3">
                      <input
                        type="radio"
                        name={item.categoryName}
                        id={item.categoryName + i.subCategoryName}
                        className="is-checked peer"
                        hidden
                      />
                      <label
                        htmlFor={item.categoryName + i.subCategoryName}
                        className="flex h-[16px] w-[16px] cursor-pointer items-center justify-center border border-solid border-primary bg-white *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100 sm:h-[20px] sm:w-[20px]"
                      >
                        <Check className="h-[8px] sm:h-[10px]" />
                      </label>
                      <p className="text-xs font-medium sm:text-sm">
                        {i.subCategoryLabel}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Extra Delivery Field */}
          <div className="flex flex-wrap items-center justify-between gap-3 sm:flex-nowrap">
            <div className="w-full border border-solid bg-white p-2 text-xs font-medium sm:w-1/2 sm:text-sm">
              {state?.delivery} Days Delivery
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-x-2 text-xs font-medium sm:text-sm">
                <input
                  type="checkbox"
                  name="extraDelivery"
                  id="extraDelivery"
                  className="is-checked peer"
                  hidden
                />
                <label
                  htmlFor="extraDelivery"
                  className="flex h-[16px] w-[16px] cursor-pointer items-center justify-center border border-solid border-primary bg-white *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100 sm:h-[20px] sm:w-[20px]"
                >
                  <Check className="h-[8px] sm:h-[10px]" />
                </label>
                Extra Fast {state?.extraFastDelivery}-days delivery
              </div>
              <span className="mr-3 font-bold leading-none text-primary">
                ${state?.extraFastDeliveryAmount}
              </span>
            </div>
          </div>

          {/* Bullet Point and Total Price Section */}
          <div className="my-8 flex flex-wrap items-stretch gap-3 sm:flex-nowrap">
            <ul className="flex h-auto w-full flex-col justify-center text-sm font-medium *:my-1 *:flex *:items-center *:gap-3 sm:w-1/2">
              {state?.bullPoints?.map((i, idx) => (
                <li key={idx}>
                  <FaCheckCircle className="text-primary" /> {i}
                </li>
              ))}
            </ul>
            <div className="flex flex-grow items-center justify-center border border-solid bg-white p-5">
              <div className="text-center">
                <h1 className="font-semibold">Total</h1>
                <span className="text-xl font-bold text-primary">
                  ${state?.offerAmount} USD
                </span>
              </div>
            </div>
          </div>

          {/* Form Submit Button */}
          <button className="block w-full bg-primary p-2 text-white">
            Continue ({state?.offerAmount}$)
          </button>

          {/* Tips message Section */}
          <p className="my-8 mb-2 text-center text-xs sm:text-sm">
            Go to the payment option by clicking &quot;Continue&quot;
          </p>
        </div>
      </form>
    </div>
  );
}

export default OfferProject;
