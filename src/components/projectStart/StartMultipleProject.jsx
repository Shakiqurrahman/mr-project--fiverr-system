import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import thumbnailDemo from "../../assets/images/project-thumbnail.jpg";
import Check from "../../assets/svg/Check";

const StartMultipleProject = () => {
  const [choosenItems, setChoosenItems] = useState([
    {
      id: 1,
      thumbnail: thumbnailDemo,
      categoryImage: thumbnailDemo,
      designTitle: "Awesome Door Hangle Design",
      price: 40,
      category: "Door Hanger Design",
      subCategory: "Double sided design",
      deliveryDays: 2,
      extraDelivery: 1,
      extraDeliveryPrice: 10,
      fastDeliveryChecked: false,
      bulletPoints: [
        "Unlimited Revisions",
        "PSD Source File",
        "Print Ready PDF or JPEG File",
      ],
    },
  ]);
  const quantities = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  return (
    <div className="mx-auto max-w-[800px] border bg-lightskyblue">
      <h1 className="bg-primary p-4 text-center text-xl font-semibold text-white">
        You are starting a project
      </h1>
      <div className="px-3">
        <p className="my-3 text-center text-sm sm:text-base">
          Each section of each design should be carefully checked and saved
          below
        </p>
        <div className="flex gap-3 overflow-x-auto">
          {choosenItems.map((i) => (
            <button className="border" key={i.id}>
              <img src={i.thumbnail} alt="" className="w-[80px] sm:w-[100px]" />
            </button>
          ))}
        </div>
        {choosenItems.map((item) => (
          <div key={item.id}>
            <label className="mt-3 block px-3 font-medium">Design Title</label>
            <p className="border bg-white p-3 text-sm sm:text-base">
              <span className="line-clamp-1">{item.designTitle}</span>
            </p>
            <label className="mt-3 block px-3 font-medium">Category</label>
            <div className="flex gap-3 border bg-white p-3">
              <img
                src={item.categoryImage}
                alt=""
                className="h-[80px] w-[100px]"
              />
              <h1 className="text-base font-semibold sm:text-lg">
                {item.category}
              </h1>
            </div>
            <label className="mt-5 block px-3 font-medium">Subcategory</label>
            <p className="line-clamp-1 border bg-white p-3 text-sm sm:text-base">
              {item.subCategory}
            </p>
            <div className="my-5 flex flex-wrap items-center gap-3 sm:flex-nowrap">
              <div className="w-full border bg-white p-3 text-sm sm:text-base">
                {item.deliveryDays} Days Delivery
              </div>
              <div className="flex w-full items-center gap-3 sm:justify-end">
                <div className="flex items-center gap-x-2 text-sm font-medium sm:text-base">
                  <input
                    type="checkbox"
                    name="extraDelivery"
                    id="extraDelivery"
                    className="is-checked peer"
                    // onChange={handleFastDeliveryToggle}
                    // checked={isFastDelivery}
                    hidden
                  />
                  <label
                    htmlFor="extraDelivery"
                    className="flex h-[16px] w-[16px] cursor-pointer items-center justify-center border border-solid border-primary bg-white *:opacity-0 peer-[.is-checked]:peer-checked:*:opacity-100 sm:h-[20px] sm:w-[20px]"
                  >
                    <Check className="h-[8px] sm:h-[10px]" />
                  </label>
                  Extra Fast {item.extraDelivery}-day delivery
                </div>
                <span className="mr-3 font-bold leading-none text-primary">
                  ${item.extraDeliveryPrice}
                </span>
              </div>
            </div>
            <div className="flex flex-wrap items-start gap-3 sm:flex-nowrap">
              <div className="w-full">
                {item.bulletPoints.map((v, i) => (
                  <p key={i} className="my-2 flex items-center gap-2">
                    <FaCheckCircle className="shrink-0 text-primary" /> {v}
                  </p>
                ))}
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <span className="font-medium">Quantity</span>
                  <select
                    className="w-[150px] border bg-white p-3 font-semibold outline-none sm:w-[100px]"
                    name="quantity"
                    value={selectedQuantity}
                    onChange={(e) => setSelectedQuantity(e.target.value)}
                  >
                    {quantities.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-5 border bg-white p-3 text-center text-lg text-primary sm:text-2xl">
                  Total -{" "}
                  <span className="font-semibold">${item.price} USD</span>
                </div>
              </div>
            </div>
            <button className="my-5 block w-full bg-revision p-3 text-center font-semibold text-white">
              Save
            </button>
            <p className="my-5 text-center text-sm sm:text-base">
              5 Days Delivery
            </p>
            <button className="my-5 block w-full bg-primary p-3 text-center font-semibold text-white">
              Continue ($130)
            </button>
          </div>
        ))}
      </div>
      <p className="my-8 text-center text-sm sm:text-base">
        Go to the payment option by clicking &quot;Continue&quot;
      </p>
    </div>
  );
};

export default StartMultipleProject;
