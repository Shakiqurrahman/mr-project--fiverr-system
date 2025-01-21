import React, { Fragment, useEffect, useState } from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const OrderDetails = () => {
  const { projectDetails, clientDetails } = useSelector((state) => state.order);

  // all states here
  const [items, setItems] = useState([]);
  const [startTime, setStartTime] = useState("Not determined");
  const [deliveryTime, setDeliveryTime] = useState("Not determined");

  // all side effects here
  useEffect(() => {
    if (projectDetails) {
      if (projectDetails?.isRequirementsFullFilled) {
        const start = new Date(projectDetails?.startDate).toLocaleDateString(
          [],
          {
            month: "short",
            day: "numeric",
          },
        );
        const starttime = new Date(
          projectDetails?.startDate,
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        const end = new Date(projectDetails?.deliveryDate).toLocaleDateString(
          [],
          {
            month: "short",
            day: "numeric",
          },
        );
        const endtime = new Date(
          projectDetails?.deliveryDate,
        ).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        });
        setStartTime(start + ", " + starttime);
        setDeliveryTime(end + ", " + endtime);
      }
    }
  }, [projectDetails]);

  useEffect(() => {
    if (projectDetails) {
      setItems(projectDetails?.items);
    }
  }, [projectDetails]);

  const totalQuantity = items?.reduce(
    (accumulator, item) =>
      accumulator + parseInt(item?.selectedQuantity || item?.quantity),
    0,
  );
  const totalDuration = items?.reduce((accumulator, item) => {
    let duration = item?.isFastDelivery
      ? parseInt(item?.fastDeliveryDuration || item?.fastDeliveryDays)
      : parseInt(
          item?.deliveryDuration ||
            item?.regularDeliveryDays ||
            item?.durationHours,
        );
    return accumulator + duration;
  }, 0);
  const totalAmount = items?.reduce((accumulator, item) => {
    let price = parseInt(item?.subCategory?.subAmount || item?.subTotal);
    if (item.isFastDelivery) {
      price += parseInt(item?.fastDeliveryAmount || item?.fastDeliveryPrice);
    }
    return accumulator + price;
  }, 0);

  return (
    <>
      <h1 className="mb-5 text-xl font-bold text-primary">PROJECT DETAILS</h1>
      <p className="mb-2">
        Project started by{" "}
        <Link to={`/${clientDetails?.userName}`} className="font-semibold">
          {clientDetails?.userName}
        </Link>
      </p>
      <p className="mb-2">
        The project has started {startTime} - The project will be completed{" "}
        {deliveryTime}
      </p>
      <p className="mb-2">
        Project number{" "}
        <span className="font-semibold">#{projectDetails?.projectNumber}</span>
      </p>
      <div className="overflow-x-auto">
        <div className="flex min-w-[600px] flex-col border border-gray-300">
          <div className="flex items-center font-semibold">
            <div className="w-3/6 shrink-0 border-b p-3">Item</div>
            <div className="w-1/6 shrink-0 border-b border-l border-gray-300 p-3 text-center">
              Qty
            </div>
            <div className="w-1/6 shrink-0 border-b border-l border-gray-300 p-3 text-center">
              Dur
            </div>
            <div className="w-1/6 shrink-0 border-b border-l border-gray-300 p-3 text-center">
              Price
            </div>
          </div>
          {projectDetails?.from !== "offerProject" &&
            items?.map((item, index) => (
              <Fragment key={index}>
                <div className="flex">
                  <div className="w-3/6 shrink-0 border-b p-3">
                    {item?.designTitle && item?.designId && (
                      <Link
                        to={`/design/${item?.designId}`}
                        className="font-semibold text-primary underline"
                      >
                        {item?.designTitle}
                      </Link>
                    )}
                    <h1 className="text-lg font-medium">
                      {item?.category?.categoryName ||
                        item?.categoryName ||
                        (projectDetails?.from === "customOffer" && item?.title)}
                    </h1>
                    <p className="text-black/80">
                      {item?.subCategory?.subTitle ||
                        item?.subCategory ||
                        (projectDetails?.from === "customOffer" && item?.desc)}
                    </p>
                  </div>
                  <div className="w-1/6 shrink-0 border-b border-l border-gray-300 p-3 text-center font-medium">
                    {item?.selectedQuantity || item?.quantity}
                  </div>
                  <div className="w-1/6 shrink-0 border-b border-l border-gray-300 p-3 text-center font-medium">
                    {item?.isFastDelivery
                      ? item?.fastDeliveryDuration ||
                        item?.fastDeliveryDays ||
                        item?.durationHours
                      : item?.deliveryDuration ||
                        item?.regularDeliveryDays ||
                        item?.durationHours}{" "}
                    {!item?.isFastDelivery &&
                      (parseInt(item?.deliveryDuration) > 1 ||
                        parseInt(item?.regularDeliveryDays) > 1) &&
                      "Days"}
                    {!item?.isFastDelivery &&
                      (parseInt(item?.deliveryDuration) === 1 ||
                        parseInt(item?.regularDeliveryDays) === 1) &&
                      "Day"}
                    {item?.isFastDelivery &&
                      (parseInt(item?.fastDeliveryDuration) > 1 ||
                        parseInt(item?.fastDeliveryDays) > 1) &&
                      "Days"}
                    {item?.isFastDelivery &&
                      (parseInt(item?.fastDeliveryDuration) === 1 ||
                        parseInt(item?.fastDeliveryDays) === 1) &&
                      "Day"}
                    {item?.deliveryWay === "hours" &&
                      parseInt(item?.durationHours) > 1 &&
                      "hours"}
                    {item?.deliveryWay === "hours" &&
                      parseInt(item?.durationHours) === 1 &&
                      "hour"}
                  </div>
                  <div className="w-1/6 shrink-0 border-b border-l border-gray-300 p-3 text-center font-medium">
                    ${item?.subCategory?.subAmount || item?.subTotal}
                  </div>
                </div>
                {item?.isFastDelivery && (
                  <div className="flex items-center border-b border-gray-300">
                    <div className="w-5/6 shrink-0 p-3">
                      Extra-fast{" "}
                      {item?.fastDeliveryDuration || item?.fastDeliveryDays}-day
                      delivery
                    </div>
                    <div className="w-1/6 shrink-0 p-3 text-center font-medium">
                      ${item?.fastDeliveryAmount || item?.fastDeliveryPrice}
                    </div>
                  </div>
                )}
                {item?.bulletPoint?.length > 0 && (
                  <ul className="border-b border-gray-300 px-3 py-4">
                    {item?.bulletPoint?.map((bullet, index) => (
                      <li key={index} className="my-1 flex items-center gap-2">
                        <FaCircleCheck className="text-primary" /> {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </Fragment>
            ))}
          {projectDetails?.from === "offerProject" &&
            items[0]?.freeDesign?.freeSubDesign && (
              <div className="flex">
                <div className="w-3/6 shrink-0 border-b p-3">
                  <h1 className="text-base font-semibold text-primary">
                    Free Design
                  </h1>
                  <h1 className="text-lg font-medium">
                    {items[0]?.freeDesign?.designName}
                  </h1>
                  {items[0]?.freeDesign?.freeSubDesign?.isSelected && (
                    <p className="text-black/80">
                      {items[0]?.freeDesign?.freeSubDesign?.subDesignName}
                    </p>
                  )}
                </div>
                <div className="w-1/6 shrink-0 border-b border-l border-gray-300 p-3 text-center font-medium">
                  1
                </div>
                <div className="w-1/6 shrink-0 border-b border-l border-gray-300 p-3 text-center font-medium">
                  -
                </div>
                <div className="w-1/6 shrink-0 border-b border-l border-gray-300 p-3 text-center font-medium">
                  -
                </div>
              </div>
            )}
          {projectDetails?.from === "offerProject" &&
            items[0]?.designs?.map((item, index) => (
              <Fragment key={index}>
                <div className="flex">
                  <div className="w-3/6 shrink-0 border-b p-3">
                    <h1 className="text-lg font-medium">
                      {item?.categoryLabel}
                    </h1>
                    <p className="text-black/80">
                      {item?.subCategory?.subCategoryLabel}
                    </p>
                  </div>
                  <div className="w-1/6 shrink-0 border-b border-l border-gray-300 p-3 text-center font-medium">
                    1
                  </div>
                  <div className="w-1/6 shrink-0 border-b border-l border-gray-300 p-3 text-center font-medium">
                    -
                  </div>
                  <div className="w-1/6 shrink-0 border-b border-l border-gray-300 p-3 text-center font-medium">
                    -
                  </div>
                </div>
              </Fragment>
            ))}
          {projectDetails?.from === "offerProject" &&
            items[0]?.isFastDelivery &&
            items[0]?.isFastDelivery && (
              <div className="flex items-center border-b border-gray-300">
                <div className="w-5/6 shrink-0 p-3">
                  Extra-fast{" "}
                  {items[0]?.fastDeliveryDuration || items[0]?.fastDeliveryDays}
                  -day delivery
                </div>
                <div className="w-1/6 shrink-0 p-3 text-center font-medium">
                  ${items[0]?.fastDeliveryAmount || items[0]?.fastDeliveryPrice}
                </div>
              </div>
            )}
          {projectDetails?.from === "offerProject" &&
            items[0]?.bulletPoint?.length > 0 && (
              <ul className="border-b border-gray-300 px-3 py-4">
                {items[0]?.bulletPoint?.map((bullet, index) => (
                  <li key={index} className="my-1 flex items-center gap-2">
                    <FaCircleCheck className="text-primary" /> {bullet}
                  </li>
                ))}
              </ul>
            )}
          <div className="flex items-center font-semibold">
            <div className="w-3/6 shrink-0 p-3">Total</div>
            <div className="w-1/6 shrink-0 border-l border-gray-300 p-3 text-center">
              {projectDetails?.from === "offerProject" &&
              items[0]?.freeDesign?.freeSubDesign
                ? items[0]?.designs?.length + 1
                : projectDetails?.from === "offerProject" &&
                    !items[0]?.freeDesign?.freeSubDesign
                  ? items[0]?.designs?.length
                  : totalQuantity}
            </div>
            <div className="w-1/6 shrink-0 border-l border-gray-300 p-3 text-center">
              {totalDuration}{" "}
              {items[0]?.deliveryWay === "hours" &&
                parseInt(items[0]?.durationHours) > 1 &&
                "hours"}
              {items[0]?.deliveryWay === "hours" &&
                parseInt(items[0]?.durationHours) === 1 &&
                "hour"}
              {items[0]?.deliveryWay !== "hours" &&
                (parseInt(items[0]?.deliveryDuration) > 1 ||
                  parseInt(items[0]?.regularDeliveryDays) > 1) &&
                "Days"}
              {items[0]?.deliveryWay !== "hours" &&
                (parseInt(items[0]?.deliveryDuration) === 1 ||
                  parseInt(items[0]?.regularDeliveryDays) === 1) &&
                "Day"}
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

export default React.memo(OrderDetails);
