import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getStatusText } from "../../customer-profile/StatusText";

const OrderProjectDetails = () => {
  const { projectDetails, clientDetails } = useSelector((state) => state.order);

  // all states here
  const [status, setStatus] = useState("");
  const [startTime, setStartTime] = useState("Not determined");
  const [deliveryTime, setDeliveryTime] = useState("Not determined");

  // all side effects here
  useEffect(() => {
    if (projectDetails) {
      setStatus(projectDetails?.projectStatus);
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

  const convertHoursToDays = (hours) => {
    if (hours < 24) {
      return `${hours} Hours`;
    } else {
      const days = Math.floor(hours / 24); // Calculate full days
      const remainingHours = hours % 24; // Remaining hours after full days

      if (remainingHours === 0) {
        return `${days} Day${days === 1 ? "" : "s"}`;
      } else {
        return `${days} Day${days === 1 ? "" : "s"} ${remainingHours} Hour${remainingHours === 1 ? "" : "s"}`;
      }
    }
  };
  return (
    <div className="bg-lightskyblue p-3">
      <h1 className="text-xl font-semibold">Project Details</h1>
      <div className="my-5 flex items-start gap-3 rounded-lg border bg-white p-3">
        <img src={projectDetails?.projectImage} alt="" className="w-[100px]" />
        <div>
          <h1 className="text-base">{projectDetails?.projectName}</h1>
          <p className="font-bold">{getStatusText(status)}</p>
        </div>
      </div>
      <ul>
        <li className="my-2 flex items-center justify-between gap-3 text-base">
          Project by <b className="text-base">{clientDetails?.userName}</b>
        </li>
        <li className="my-2 flex items-center justify-between gap-3 text-base">
          Quantity <b className="text-base">{projectDetails?.totalQuantity}</b>
        </li>
        <li className="my-2 flex items-center justify-between gap-3 text-base">
          Duration{" "}
          <b className="text-base">
            {projectDetails?.duration &&
              `${projectDetails?.duration} ${
                parseInt(projectDetails?.duration) > 1 ? "Days" : "Day"
              }`}
            {projectDetails?.durationHours &&
              `${convertHoursToDays(parseInt(projectDetails?.durationHours))}`}
          </b>
        </li>
        <li className="my-2 flex items-center justify-between gap-3 text-base">
          Project started <b className="text-sm">{startTime}</b>
        </li>
        <li className="my-2 flex items-center justify-between gap-3 text-base">
          Project delivery <b className="text-sm">{deliveryTime}</b>
        </li>
        <li className="my-2 flex items-center justify-between gap-3 text-base">
          Total price <b className="text-base">${projectDetails?.totalPrice}</b>
        </li>
        <li className="my-2 flex items-center justify-between gap-3 text-base">
          Project number{" "}
          <b className="text-base">#{projectDetails?.projectNumber}</b>
        </li>
      </ul>
    </div>
  );
};

export default React.memo(OrderProjectDetails);
