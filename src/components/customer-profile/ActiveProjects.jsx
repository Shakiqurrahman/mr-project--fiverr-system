import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInMonths,
  differenceInYears,
  isPast,
  parseISO,
} from "date-fns";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { getStatusText } from "./StatusText";

const ActiveProjects = ({ activeProjects, isActiveProjectsLoading }) => {
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

  return (
    <div className="mb-16 mt-8 grid gap-4 min-[850px]:grid-cols-2">
      {isActiveProjectsLoading ? (
        <div className="flex justify-center text-primary">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
        </div>
      ) : activeProjects?.length > 0 ? (
        activeProjects?.map((project) => {
          const { time, color } = getTimeStatus(project?.deliveryDate);
          return (
            <div
              className="rounded-lg border border-gray-300 p-2 shadow-sm lg:p-4"
              key={project?.id}
            >
              <div className="flex items-center gap-3">
                <img
                  className="w-28 lg:w-36"
                  src={project?.projectImage}
                  alt={project?.projectName}
                />
                <div>
                  <h3 className="mb-1 text-sm capitalize sm:text-base">
                    {project?.projectName}
                  </h3>
                  <p className="text-lg font-semibold sm:text-xl">
                    ${project?.totalPrice}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex justify-between">
                <p
                  className={`${color === "red" ? "text-red-500" : "text-black"}`}
                >
                  {time}
                </p>
                <p className="font-semibold">
                  {getStatusText(project?.projectStatus)}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <h2 className="text-nowrap text-center text-lg min-[850px]:translate-x-1/2">
          You haven't started any projects yet!
        </h2>
      )}
    </div>
  );
};

export default ActiveProjects;
