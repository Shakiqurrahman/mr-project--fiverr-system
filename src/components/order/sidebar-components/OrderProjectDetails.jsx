import { useEffect, useState } from "react";
import projectThumbnail from "../../../assets/images/project-thumbnail.jpg";

const OrderProjectDetails = () => {
  const [projectStatus, setProjectStatus] = useState({
    status: "",
    colorClass: "",
  });
  const status = "Ongoing";
  useEffect(() => {
    switch (status) {
      case "Revision":
        setProjectStatus({
          status: "Revision",
          colorClass: "text-revision",
        });
        break;
      case "Ongoing":
        setProjectStatus({
          status: "Ongoing",
          colorClass: "text-ongoing",
        });
        break;
      case "Waiting":
        setProjectStatus({
          status: "Waiting",
          colorClass: "text-waiting",
        });
        break;
      case "Delivered":
        setProjectStatus({
          status: "Delivered",
          colorClass: "text-delivered",
        });
        break;
      case "Completed":
        setProjectStatus({
          status: "Completed",
          colorClass: "text-primary",
        });
        break;
      case "Canceled":
        setProjectStatus({
          status: "Canceled",
          colorClass: "text-canceled",
        });
        break;
      case "Dispute":
        setProjectStatus({
          status: "Dispute",
          colorClass: "text-dispute",
        });
        break;
      default:
        break;
    }
  }, []);
  return (
    <div className="bg-lightskyblue p-3">
      <h1 className="text-xl font-semibold">Project Details</h1>
      <div className="my-5 flex items-start gap-3 rounded-lg border bg-white p-3">
        <img src={projectThumbnail} alt="" className="w-[100px]" />
        <div>
          <h1 className="text-lg">Door Hanger Design</h1>
          <span className={`font-bold ${projectStatus?.colorClass}`}>
            {projectStatus?.status}
          </span>
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
