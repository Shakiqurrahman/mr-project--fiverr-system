import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears,
  isPast,
  parseISO,
} from "date-fns";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ComputerIcon from "../../assets/svg/ComputerIcon";
import { configApi } from "../../libs/configApi";
import { connectSocket } from "../../libs/socketService";
import {
  useAllProjectStatusQuery,
  useLazyGetAllProjectsQuery,
} from "../../Redux/api/dashboardApiSlice";
import { setDashboardProjects } from "../../Redux/features/dashboardSlice";
import { setOnlineUsers } from "../../Redux/features/userSlice";
import { getStatusText } from "../customer-profile/StatusText";
import AddDesignerModal from "./AddDesignerModal";

const DashboardProjects = () => {
  const dispatch = useDispatch();
  const { onlineUsers, token } = useSelector((state) => state.user);
  const {
    searchText,
    dashboardProjects: projectsData,
    searchFor,
  } = useSelector((state) => state.dashboard);

  const { data: projectType, isLoading: isStatusLoading } =
    useAllProjectStatusQuery();

  const [getAllProjects, { data: projects, isLoading }] =
    useLazyGetAllProjectsQuery();

  const [addDesignerModal, setAddDesignerModal] = useState(false);

  const [selectedProjectType, setSelectedProjectType] = useState("");
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [designerValue, setDesignerValue] = useState(null);

  useEffect(() => {
    if (projectType) {
      setSelectedProjectType(projectType[0]?.name);
    }
  }, [projectType]);

  const handleProjectTypeChange = (e) => {
    setSelectedProjectType(e.target.value);
  };

  const filteredSelectedProject = projectType?.find(
    (type) => type?.name?.toLowerCase() === selectedProjectType?.toLowerCase(),
  );

  useEffect(() => {
    if (selectedProjectType) {
      getAllProjects({ status: selectedProjectType?.split(" ")[0] });
    }
  }, [selectedProjectType, getAllProjects]);

  useEffect(() => {
    if (projects && !searchText) {
      dispatch(setDashboardProjects(projects));
    }
  }, [projects, searchText]);

  const socket = connectSocket(`${configApi.socket}`, token);
  // all avaliable users
  useEffect(() => {
    socket?.emit("view-online-users");
    socket?.on("online-users", (onlineUsers) => {
      dispatch(setOnlineUsers(onlineUsers));
    });
  }, [socket, dispatch]);

  const isUserOnline = (userId) => {
    return onlineUsers.some((onlineUser) => onlineUser.userId === userId);
  };

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
        overdueText = `${daysLate} day${daysLate > 1 ? "s" : ""} late`;
      } else if (hoursLate >= 1) {
        overdueText = `${hoursLate}h ${minutesLate}min late`;
      } else {
        overdueText = `${minutesLate}min late`;
      }

      return {
        time: overdueText,
        color: "red",
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

      const color = totalHours < 12 ? "red" : "black"; // Red if less than 12 hours

      return {
        time: displayTime,
        color: color,
      };
    }
  };

  return (
    <>
      {searchFor && searchText ? (
        <div className="mb-6 border p-4 sm:flex-row md:flex-wrap">
          <h1 className="text-nowrap text-lg font-bold text-primary sm:text-xl">
            {` Searched for "${searchText}" projects`}
          </h1>
        </div>
      ) : (
        <div className="mb-6 flex flex-col items-center justify-between gap-2 border p-4 sm:flex-row md:flex-wrap">
          <h1 className="text-nowrap text-lg font-bold text-primary sm:text-xl">
            {filteredSelectedProject?.name} -{" "}
            {filteredSelectedProject?.quantity} ($
            {filteredSelectedProject?.totalPrice})
          </h1>
          <select
            className="border bg-white p-1 px-2 font-semibold outline-none"
            name="projectType"
            id="projectType"
            onChange={handleProjectTypeChange}
            disabled={isStatusLoading}
          >
            {projectType?.map((type, idx) => (
              <option key={idx} value={type?.name}>
                {type?.name} ({type?.quantity})
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="dashboard-overflow-x">
        {isLoading ? (
          <div className="max-width flex h-[200px] items-center justify-center text-primary">
            <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
          </div>
        ) : projectsData?.length > 0 ? (
          projectsData?.map((project, idx) => {
            let timeStatus;
            if (project?.deliveryDate) {
              timeStatus = getTimeStatus(project?.deliveryDate || "");
            }
            const { time, color } = timeStatus || "";
            const letterLogo =
              (!project?.user?.image &&
                project?.user?.userName?.trim()?.charAt(0)?.toUpperCase()) ||
              "";
            return (
              <Fragment key={idx}>
                <div className="mb-6 flex min-w-[700px] items-center justify-between gap-4 border bg-lightskyblue p-4 last:mb-0">
                  <div className="flex w-full items-center">
                    <img
                      src={project?.projectImage}
                      alt={project?.projectName}
                      className="h-[74px] w-[100px] flex-shrink-0 border bg-[#ffefef]/80 object-cover"
                    />
                    <Link
                      to={`/${project?.user?.userName}`}
                      className="group ml-4 flex items-center gap-2"
                    >
                      <div className="relative flex-shrink-0">
                        {project?.user?.image ? (
                          <img
                            src={project?.user?.image}
                            alt={project?.user?.name}
                            className="size-10 rounded-full border bg-gray-200 object-cover"
                          />
                        ) : (
                          <div className="flex size-10 items-center justify-center rounded-full border bg-gray-200 object-cover text-2xl font-bold text-[#3b3b3b]/50">
                            {letterLogo}
                          </div>
                        )}
                        <span
                          className={`absolute bottom-0 right-1 size-2 rounded-full border border-white ${isUserOnline(project?.user?.id) ? "bg-primary" : "bg-gray-400"}`}
                        ></span>
                      </div>
                      <h2
                        title={project?.user?.userName}
                        className="max-w-[160px] truncate text-sm font-semibold duration-300 group-hover:underline"
                      >
                        {project?.user?.userName}
                      </h2>
                    </Link>
                  </div>
                  <div className="flex w-full items-center gap-6 lg:gap-10">
                    <div className="w-[20%] text-center text-sm">
                      <p className="font-medium text-gray-500">Price</p>
                      <p className="font-bold">${project?.totalPrice}</p>
                    </div>
                    <div className="w-[50%] text-center text-sm">
                      <p className="font-medium text-gray-500">
                        {project?.finishedDate ? "Date" : "Time"}
                      </p>
                      <p
                        className={`font-bold ${color === "red" ? "text-red-500" : "text-black"}`}
                      >
                        {project?.finishedDate
                          ? new Date(project?.finishedDate)?.toLocaleDateString()
                          : time || "Not Determined"}
                      </p>
                    </div>
                    <div className="w-[30%] text-center text-sm">
                      <p className="font-medium text-gray-500">Status</p>
                      <p className="font-bold">
                        {getStatusText(project?.projectStatus)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 lg:gap-8">
                    <Link
                      to={`/order/${project?.projectNumber}`}
                      className="text-sm font-semibold text-primary"
                    >
                      View
                    </Link>
                    <button
                      title={project?.designerName}
                      type="button"
                      onClick={() => {
                        setSelectedOrderId(project?.id);
                        setDesignerValue(project?.designerName);
                        setAddDesignerModal(true);
                      }}
                    >
                      <ComputerIcon
                        className={`${project?.designerName && "fill-primary"} size-7 flex-shrink-0 cursor-pointer fill-black duration-200 hover:fill-primary`}
                      />
                    </button>
                  </div>
                </div>
              </Fragment>
            );
          })
        ) : (
          <p className="text-center">No projects Found!</p>
        )}
      </div>
      {addDesignerModal && (
        <AddDesignerModal
          orderId={selectedOrderId}
          value={designerValue}
          handleClose={setAddDesignerModal}
        />
      )}
    </>
  );
};

export default DashboardProjects;
