import { FaCheckCircle } from "react-icons/fa";
import Check from "../assets/svg/Check";
function OfferProject() {
  // Dummy Content (Note: It's Recommended to use Database Structure same as this dummy fields object property names)
  const fields = [
    {
      categoryName: "doorHanger",
      categoryLabel: "Door Hanger",
      subCategory1Name: "single",
      subCategory1Label: "Single side",
      subCategory2Name: "double",
      subCategory2Label: "Double side",
    },
    {
      categoryName: "flyer",
      categoryLabel: "Flyer",
      subCategory1Name: "single",
      subCategory1Label: "Single side",
      subCategory2Name: "double",
      subCategory2Label: "Double side",
    },
    {
      categoryName: "postcard",
      categoryLabel: "Post Card",
      subCategory1Name: "single",
      subCategory1Label: "Single side",
      subCategory2Name: "double",
      subCategory2Label: "Double side",
    },
    {
      categoryName: "rackCard",
      categoryLabel: "Rack Card",
      subCategory1Name: "single",
      subCategory1Label: "Single side",
      subCategory2Name: "double",
      subCategory2Label: "Double side",
    },
  ];
  return (
    <div className="max-width">
      <h1 className="text-lg sm:text-2xl font-semibold text-center my-10">
        Please select each step below carefully
      </h1>

      {/* Project Form Section */}
      <form className="bg-lightskyblue border border-solid max-w-[800px] mx-auto">
        <h1 className="p-4 text-center text-white bg-primary text-lg sm:text-xl">
          You are starting a project
        </h1>
        <div className="p-3">
          <p className="text-xs sm:text-sm font-medium my-4">
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
                className="h-[30px] sm:h-[40px] w-[30px] sm:w-[40px] bg-white flex items-center justify-center cursor-pointer border border-solid border-primary *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100"
              >
                <Check className="h-[14px] sm:h-[18px]" />
              </label>
            </div>
            <div className="flex-grow">
              <div className="bg-white font-semibold h-[30px] sm:h-[40px] border border-solid flex items-center px-3 text-xs sm:text-base">
                Business Card
              </div>
              <div className="flex items-center gap-x-3 sm:gap-x-10 mt-5">
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
                    className="h-[16px] sm:h-[20px] w-[16px] sm:w-[20px] bg-white flex items-center justify-center cursor-pointer border border-solid border-primary *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100"
                  >
                    <Check className="h-[8px] sm:h-[10px]" />
                  </label>
                  <p className="text-xs sm:text-sm font-medium">Single side</p>
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
                    className="h-[16px] sm:h-[20px] w-[16px] sm:w-[20px] bg-white flex items-center justify-center cursor-pointer border border-solid border-primary *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100"
                  >
                    <Check className="h-[8px] sm:h-[10px]" />
                  </label>
                  <p className="text-xs sm:text-sm font-medium">Double side</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm font-medium mt-8 mb-4">
            Choose the 3 designs you need and Choose the required options for
            the designs
          </p>

          {/* Selectable Fields */}
          {fields.map((item) => (
            <div className="flex items-start gap-3 mb-8" key={Math.random()}>
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
                  className="h-[30px] sm:h-[40px] w-[30px] sm:w-[40px] bg-white flex items-center justify-center cursor-pointer border border-solid border-primary *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100"
                >
                  <Check className="h-[14px] sm:h-[18px]" />
                </label>
              </div>
              <div className="flex-grow">
                <div className="bg-white font-semibold h-[30px] sm:h-[40px] border border-solid flex items-center px-3 text-xs sm:text-base">
                  {item.categoryLabel}
                </div>
                <div className="flex items-center gap-x-10 mt-5">
                  <div className="flex items-center gap-x-3">
                    <input
                      type="radio"
                      name={item.categoryName}
                      id={item.categoryName + item.subCategory1Name}
                      className="is-checked peer"
                      hidden
                    />
                    <label
                      htmlFor={item.categoryName + item.subCategory1Name}
                      className="h-[16px] sm:h-[20px] w-[16px] sm:w-[20px] bg-white flex items-center justify-center cursor-pointer border border-solid border-primary *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100"
                    >
                      <Check className="h-[8px] sm:h-[10px]" />
                    </label>
                    <p className="text-xs sm:text-sm font-medium">
                      {item.subCategory1Label}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-3">
                    <input
                      type="radio"
                      name={item.categoryName}
                      id={item.categoryName + item.subCategory2Name}
                      className="is-checked peer"
                      hidden
                    />
                    <label
                      htmlFor={item.categoryName + item.subCategory2Name}
                      className="h-[16px] sm:h-[20px] w-[16px] sm:w-[20px] bg-white flex items-center justify-center cursor-pointer border border-solid border-primary *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100"
                    >
                      <Check className="h-[8px] sm:h-[10px]" />
                    </label>
                    <p className="text-xs sm:text-sm font-medium">
                      {item.subCategory2Label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Extra Delivery Field */}
          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
            <div className="w-full sm:w-1/2 bg-white border border-solid p-2 text-xs sm:text-sm font-medium">
              5 Days Delivery
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-x-2 text-xs sm:text-sm font-medium">
                <input
                  type="checkbox"
                  name="extraDelivery"
                  id="extraDelivery"
                  className="is-checked peer"
                  hidden
                />
                <label
                  htmlFor="extraDelivery"
                  className="h-[16px] sm:h-[20px] w-[16px] sm:w-[20px] bg-white flex items-center justify-center cursor-pointer border border-solid border-primary *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100"
                >
                  <Check className="h-[8px] sm:h-[10px]" />
                </label>
                Extra Fast 2-days delivery
              </div>
              <span className="font-bold text-primary mr-3 leading-none">
                $15
              </span>
            </div>
          </div>

          {/* Bullet Point and Total Price Section */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3 items-stretch my-8">
            <ul className="w-full sm:w-1/2 h-auto flex flex-col justify-center *:flex *:items-center *:gap-3 text-sm font-medium *:my-1">
              <li>
                <FaCheckCircle className="text-primary" /> Unlimited Revisions
              </li>
              <li>
                <FaCheckCircle className="text-primary" /> PSD Source File
              </li>
              <li>
                <FaCheckCircle className="text-primary" /> Print Ready PDF or
                JPEG File
              </li>
            </ul>
            <div className="flex-grow p-5 flex items-center justify-center bg-white border border-solid">
              <div className="text-center">
                <h1 className="font-semibold">Total</h1>
                <span className="font-bold text-primary text-xl">$120 USD</span>
              </div>
            </div>
          </div>

          {/* Form Submit Button */}
          <button className="block w-full p-2 text-white bg-primary">
            Continue (120$)
          </button>

          {/* Tips message Section */}
          <p className="text-xs sm:text-sm text-center mb-2 my-8">
            Go to the payment option by clicking &quot;Continue&quot;
          </p>
        </div>
      </form>
    </div>
  );
}

export default OfferProject;
