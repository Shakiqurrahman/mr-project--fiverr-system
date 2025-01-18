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
import { Link } from "react-router-dom";
import { getStatusText } from "./StatusText";
import { getTimeStatus } from "../../libs/getTimeStatus";

const ActiveProjects = ({ activeProjects, isActiveProjectsLoading }) => {
  return (
    <div className="mb-16 mt-8 grid gap-4 min-[850px]:grid-cols-2">
      {isActiveProjectsLoading ? (
        <div className="flex justify-center text-primary">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl" />
        </div>
      ) : activeProjects?.length > 0 ? (
        activeProjects?.map((project) => {
          let timeStatus;
          if (project?.deliveryDate) {
            timeStatus = getTimeStatus(project?.deliveryDate || "");
          }
          const { time, color } = timeStatus || "";
          return (
            <Link
              to={`/order/${project?.projectNumber}`}
              className="block rounded-lg border border-gray-300 p-2 shadow-sm lg:p-4"
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
                  {time || <span className="text-sm">Not Determined</span>}
                </p>
                <p className="font-semibold">
                  {getStatusText(project?.projectStatus)}
                </p>
              </div>
            </Link>
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
