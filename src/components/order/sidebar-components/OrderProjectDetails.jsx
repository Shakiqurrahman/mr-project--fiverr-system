import { useEffect, useState } from "react";
import projectThumbnail from "../../../assets/images/project-thumbnail.jpg";
import { getStatusText } from "../../customer-profile/StatusText";

const OrderProjectDetails = () => {
  const status = "Ongoing";
  return (
    <div className="bg-lightskyblue p-3">
      <h1 className="text-xl font-semibold">Project Details</h1>
      <div className="my-5 flex items-start gap-3 rounded-lg border bg-white p-3">
        <img src={projectThumbnail} alt="" className="w-[100px]" />
        <div>
          <h1 className="text-lg">Door Hanger Design</h1>
          <p className="font-bold">{getStatusText(status)}</p>
        </div>
      </div>
      <ul>
        <li className="my-2 flex items-center justify-between gap-3 text-lg">
          Project by <b className="text-base">clientusername</b>
        </li>
        <li className="my-2 flex items-center justify-between gap-3 text-lg">
          Quantity <b className="text-base">1</b>
        </li>
        <li className="my-2 flex items-center justify-between gap-3 text-lg">
          Duration <b className="text-base">2 Days</b>
        </li>
        <li className="my-2 flex items-center justify-between gap-3 text-lg">
          Project started <b className="text-base">Jun 17, 8:19 AM</b>
        </li>
        <li className="my-2 flex items-center justify-between gap-3 text-lg">
          Project delivery <b className="text-base">Jun 19, 8:19 AM</b>
        </li>
        <li className="my-2 flex items-center justify-between gap-3 text-lg">
          Total price <b className="text-base">$40</b>
        </li>
        <li className="my-2 flex items-center justify-between gap-3 text-lg">
          Project number <b className="text-base">#MR1N5ZPN</b>
        </li>
      </ul>
    </div>
  );
};

export default OrderProjectDetails;
