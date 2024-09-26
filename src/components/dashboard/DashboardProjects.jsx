import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears,
  isPast,
  parseISO,
} from "date-fns";
import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ComputerIcon from "../../assets/svg/ComputerIcon";
import { getStatusText } from "../customer-profile/StatusText";
import AddDesignerModal from "./AddDesignerModal";

const DashboardProjects = () => {
  const projectType = [
    {
      id: 1,
      name: "Active Projects",
      quantity: 12,
      totalPrice: 290,
    },
    {
      id: 2,
      name: "Revision",
      quantity: 7,
      totalPrice: 290,
    },
    {
      id: 3,
      name: "Ongoing",
      quantity: 3,
      totalPrice: 290,
    },
    {
      id: 4,
      name: "Waiting",
      quantity: 5,
      totalPrice: 290,
    },
    {
      id: 5,
      name: "Delivered",
      quantity: 3,
      totalPrice: 290,
    },
    {
      id: 6,
      name: "Completed",
      quantity: 1,
      totalPrice: 290,
    },
    {
      id: 7,
      name: "Canceled",
      quantity: 2,
      totalPrice: 290,
    },
  ];

  const [addDesignerModal, setAddDesignerModal] = useState(false);
  console.log(addDesignerModal);

  const [selectedProjectType, setSelectedProjectType] = useState(
    projectType[0]?.name || "",
  );

  const [activeProjectList, setActiveProjectList] = useState([
    {
      id: 1,
      status: "Ongoing",
      price: 30,
      deadline: "2024-09-26T18:11:59Z",
      image: {
        url: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
        name: "Door Hanger Design",
      },
      client: {
        id: 1,
        isOnline: true,
        name: "Shakiqur Rahman",
        userName: "shake75",
        avatar: "",
      },
    },
    {
      id: 2,
      status: "Revision",
      price: 30,
      deadline: "2024-06-30T14:10:59Z",
      image: {
        url: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
        name: "Flyer Design",
      },
      client: {
        id: 2,
        isOnline: false,
        name: "Shake Xpress",
        userName: "shakeXpress",
        avatar:
          "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      },
    },
    {
      id: 3,
      status: "Revision",
      price: 30,
      deadline: "2024-09-25T02:51:59Z",
      image: {
        url: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
        name: "Flyer Design",
      },
      client: {
        id: 2,
        isOnline: false,
        name: "Shake Xpress",
        userName: "shake75",
        avatar: "",
      },
    },
    {
      id: 4,
      status: "Ongoing",
      price: 30,
      deadline: "2024-09-26T02:51:59Z",
      image: {
        url: "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
        name: "Flyer Design",
      },
      client: {
        id: 4,
        isOnline: true,
        name: "Shake Xpress",
        userName: "shake75",
        avatar: "",
      },
    },
  ]);

  const handleProjectTypeChange = (e) => {
    setSelectedProjectType(e.target.value);
  };

  const filteredSelectedProject = projectType.find(
    (type) => type?.name.toLowerCase() === selectedProjectType.toLowerCase(),
  );

  // Function to get time status
  const getTimeStatus = (deadline) => {
    const now = new Date();
    const eventDate = parseISO(deadline); // Convert string to date

    if (isPast(eventDate)) {
      // time is late
      const yearsLate = differenceInYears(now, eventDate);
      const monthsLate = differenceInMonths(now, eventDate) % 12;
      const daysLate = differenceInDays(now, eventDate) % 30;
      const hoursLate = differenceInHours(now, eventDate) % 24;
      const minutesLate = differenceInMinutes(now, eventDate) % 60;

      let overdueText = "";

      if (yearsLate >= 1) {
        overdueText = `${yearsLate} year${yearsLate > 1 ? "s" : ""} late`;
      } else if (monthsLate >= 1) {
        overdueText = `${monthsLate} month${monthsLate > 1 ? "s" : ""} late`;
      } else if (daysLate >= 1) {
        overdueText = `${daysLate} day${daysLate > 1 ? "s" : ""}`;
      } else if (hoursLate >= 1) {
        overdueText = `${hoursLate}h ${minutesLate}min late`;
      } else {
        overdueText = `${minutesLate}min late`;
      }

      return {
        time: overdueText,
        color: "black", // Default color for overdue events
      };
    } else {
      // time is remaining
      const timeRemaining = eventDate - now;

      const totalHours = Math.floor(timeRemaining / (1000 * 60 * 60)); // Total hours remaining
      const days = Math.floor(totalHours / 24); // Calculate remaining days
      const hours = totalHours % 24; // Remaining hours
      const minutes = Math.floor(
        (timeRemaining % (1000 * 60 * 60)) / (1000 * 60),
      ); // Remaining minutes

      let displayTime;
      if (days > 0) {
        displayTime = `${days}d - ${hours}h`;
      } else {
        displayTime = `${hours}h - ${minutes} min`;
      }

      // Set color based on remaining time
      const color = totalHours < 12 ? "red" : "black"; // Red if less than 12 hours

      return {
        time: displayTime,
        color: color,
      };
    }
  };

  const handleDesignerModal = (e) => {
    console.log(e)
  }

  return (
    <>
      <div className="mb-6 flex flex-col items-center justify-between gap-2 border p-4 sm:flex-row md:flex-wrap">
        <h1 className="text-nowrap text-lg font-bold text-primary sm:text-xl">
          {filteredSelectedProject?.name} - {filteredSelectedProject?.quantity}{" "}
          ($
          {filteredSelectedProject?.totalPrice})
        </h1>
        <select
          className="border p-1 px-2 font-semibold outline-none"
          name="projectType"
          id="projectType"
          onChange={handleProjectTypeChange}
        >
          {projectType.map((type, idx) => (
            <option key={idx} value={type?.name}>
              {type?.name} ({type?.quantity})
            </option>
          ))}
        </select>
      </div>
      <div className="dashboard-overflow-x">
        {activeProjectList.map((project, idx) => {
          const { time, color } = getTimeStatus(project?.deadline);
          const letterLogo =
            !project.client.avatar &&
            project?.client?.userName.trim().charAt(0).toUpperCase();
          return (
            <Fragment key={idx}>
              <div className="mb-6 flex min-w-[700px] items-center justify-between gap-4 border bg-lightskyblue p-4 last:mb-0">
                <div className="flex w-full items-center">
                  <img
                    src={project?.image?.url}
                    alt={project?.image?.name}
                    className="h-[74px] w-[100px] flex-shrink-0 border object-cover"
                  />
                  <Link
                    to={`/${project?.client?.userName}`}
                    className="group ml-4 flex items-center gap-2"
                  >
                    <div className="relative flex-shrink-0">
                      {project.client.avatar ? (
                        <img
                          src={project?.client?.avatar}
                          alt={project?.client?.name}
                          className="size-10 rounded-full border object-cover"
                        />
                      ) : (
                        <div className="flex size-10 items-center justify-center rounded-full border bg-gray-200 object-cover text-2xl font-bold text-[#3b3b3b]/50">
                          {letterLogo}
                        </div>
                      )}
                      <span
                        className={`absolute bottom-0 right-1 size-2 rounded-full border border-white ${project?.client?.isOnline ? "bg-primary" : "bg-gray-400"}`}
                      ></span>
                    </div>
                    <h2
                      title={project?.client?.userName}
                      className="max-w-[160px] truncate text-sm font-semibold duration-300 group-hover:underline"
                    >
                      {project?.client?.userName}
                    </h2>
                  </Link>
                </div>
                <div className="flex w-full items-center gap-6 lg:gap-10">
                  <div className="w-[20%] text-center text-sm">
                    <p className="font-medium text-gray-500">Price</p>
                    <p className="font-bold">${project.price}</p>
                  </div>
                  <div className="w-[50%] text-center text-sm">
                    <p className="font-medium text-gray-500">Time</p>
                    <p
                      className={`font-bold ${color === "red" ? "text-red-500" : "text-black"}`}
                    >
                      {time}
                    </p>
                  </div>
                  <div className="w-[30%] text-center text-sm">
                    <p className="font-medium text-gray-500">Status</p>
                    <p className="font-bold">
                      {getStatusText(project?.status)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6 lg:gap-8">
                  <button
                    type="button"
                    className="text-sm font-semibold text-primary"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddDesignerModal(true)}
                  >
                    <ComputerIcon className="size-7 flex-shrink-0 cursor-pointer fill-black duration-200 hover:fill-primary" />
                  </button>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
      {addDesignerModal && (
        <AddDesignerModal
          handleClose={setAddDesignerModal}
          onMsgSubmit={handleDesignerModal}
        />
      )}
    </>
  );
};

export default DashboardProjects;
