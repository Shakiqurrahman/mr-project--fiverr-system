import { Fragment } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const OrderDetails = () => {
  const items = [
    {
      id: 1,
      categoryName: "Door Hanger Design",
      subCategoryName: "Double sided design",
      quantity: 1,
      duration: 1,
      price: 40,
      fastDeliveryPrice: 10,
      fastDeliveryDays: 1,
      isFastDelivery: true,
      bulletPoints: [
        "Unlimited Revisions",
        "PSD Source File",
        "Print Ready PDF or JPEG File",
      ],
      title: "",
    },
    {
      id: 2,
      categoryName: "Flyer Design",
      subCategoryName: "Double sided design",
      quantity: 1,
      duration: 2,
      price: 50,
      fastDeliveryPrice: 10,
      fastDeliveryDays: 1,
      isFastDelivery: false,
      bulletPoints: [
        "Unlimited Revisions",
        "PSD Source File",
        "Print Ready PDF or JPEG File",
      ],
      title: "Design Name",
      designId: "MR1DN",
    },
  ];

  const totalQuantity = items?.reduce(
    (accumulator, item) => accumulator + parseInt(item?.quantity),
    0,
  );
  const totalDuration = items?.reduce((accumulator, item) => {
    let duration = item?.isFastDelivery
      ? parseInt(item?.fastDeliveryDays)
      : parseInt(item?.duration);
    return accumulator + duration;
  }, 0);
  const totalAmount = items?.reduce((accumulator, item) => {
    let price = parseInt(item?.price);
    if (item.isFastDelivery) {
      price += parseInt(item.fastDeliveryPrice);
    }
    return accumulator + price;
  }, 0);

  return (
    <>
      <h1 className="mb-5 text-xl font-bold text-primary">PROJECT DETAILS</h1>
      <p className="mb-2">
        Project started by <span className="font-semibold">clientusername</span>
      </p>
      <p className="mb-2">
        The project has started Oct 25, 2023, 8:45 PM - The project will be
        completed Oct 27, 2023, 8:45 PM
      </p>
      <p className="mb-2">
        Project number <span className="font-semibold">#MRA2EPN</span>
      </p>
      <div className="overflow-x-auto">
        <div className="flex min-w-[600px] flex-col border border-gray-300">
          <div className="flex items-center font-semibold">
            <div className="w-3/6 shrink-0 border-b p-3">Item</div>
            <div className="w-1/6 shrink-0 border-b border-l border-gray-300 p-3 text-center">
              QTY
            </div>
            <div className="w-1/6 shrink-0 border-b border-l border-gray-300 p-3 text-center">
              DUR
            </div>
            <div className="w-1/6 shrink-0 border-b border-l border-gray-300 p-3 text-center">
              Price
            </div>
          </div>
          {items?.map((item, index) => (
            <Fragment key={index}>
              <div className="flex">
                <div className="w-3/6 shrink-0 border-b p-3">
                  {item?.title && item?.designId && (
                    <Link
                      to={`/design/${item?.designId}`}
                      className="font-semibold text-primary underline"
                    >
                      {item?.title}
                    </Link>
                  )}
                  <h1 className="text-lg font-medium">{item?.categoryName}</h1>
                  <p className="text-black/80">{item?.subCategoryName}</p>
                </div>
                <div className="w-1/6 shrink-0 border-b border-l border-gray-300 p-3 text-center font-medium">
                  {item?.quantity}
                </div>
                <div className="w-1/6 shrink-0 border-b border-l border-gray-300 p-3 text-center font-medium">
                  {item?.duration}
                </div>
                <div className="w-1/6 shrink-0 border-b border-l border-gray-300 p-3 text-center font-medium">
                  {item?.price}
                </div>
              </div>
              {item?.isFastDelivery && (
                <div className="flex items-center border-b border-gray-300">
                  <div className="w-5/6 shrink-0 p-3">
                    Extra-fast {item?.fastDeliveryDays}-day delivery
                  </div>
                  <div className="w-1/6 shrink-0 p-3 text-center font-medium">
                    ${item?.fastDeliveryPrice}
                  </div>
                </div>
              )}
              {item?.bulletPoints?.length > 0 && (
                <ul className="border-b border-gray-300 px-3 py-4">
                  {item?.bulletPoints?.map((bullet, index) => (
                    <li key={index} className="my-1 flex items-center gap-2">
                      <FaCircleCheck className="text-primary" /> {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </Fragment>
          ))}
          <div className="flex items-center font-semibold">
            <div className="w-3/6 shrink-0 p-3">Total</div>
            <div className="w-1/6 shrink-0 border-l border-gray-300 p-3 text-center">
              {totalQuantity}
            </div>
            <div className="w-1/6 shrink-0 border-l border-gray-300 p-3 text-center">
              {totalDuration} days
            </div>
            <div className="w-1/6 shrink-0 border-l border-gray-300 p-3 text-center">
              ${totalAmount}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
