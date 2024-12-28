import React from "react";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useSelector } from "react-redux";

const TrackProject = () => {
  const { projectDetails } = useSelector((state) => state.order);
  const trackingOptions = [
    {
      id: 1,
      name: "Project placed",
    },
    {
      id: 2,
      name: "Requirements submitted",
    },
    {
      id: 3,
      name: "Project running",
    },
    {
      id: 4,
      name: "Review Delivery",
    },
    {
      id: 5,
      name: "Complete project",
    },
  ];

  const statusMapping = {
    PROJECT_PLACED: "Project placed",
    REQUIREMENTS_SUBMITTED: "Requirements submitted",
    PROJECT_RUNNING: "Project running",
    REVIEW_DELIVERY: "Review Delivery",
    COMPLETE_PROJECT: "Complete project",
  };

  const currentStatusIndex = trackingOptions.findIndex(
    (option) =>
      option.name === statusMapping[projectDetails?.trackProjectStatus],
  );

  return (
    <div className="bg-lightskyblue p-3">
      <h1 className="text-xl font-semibold">Track Project</h1>
      <div className="my-5 space-y-6">
        {trackingOptions?.map((option, idx) => {
          const status =
            idx <= currentStatusIndex
              ? "Completed"
              : idx === currentStatusIndex + 1
                ? "Ongoing"
                : "Waiting";
          return (
            <div key={idx} className="flex items-center gap-4">
              {status === "Waiting" ? (
                <span className="relative flex size-7 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-400 bg-transparent p-1 text-base text-white">
                  {idx !== 0 && (
                    <div className="absolute bottom-full left-1/2 h-[26px] w-[2px] -translate-x-1/2 bg-gray-400"></div>
                  )}
                </span>
              ) : (
                <span
                  className={`relative flex size-7 flex-shrink-0 items-center justify-center rounded-full ${
                    status === "Completed"
                      ? "bg-primary"
                      : projectDetails?.projectStatus === "Canceled"
                        ? "bg-red-600"
                        : "bg-primary"
                  } p-1 text-base text-white`}
                >
                  {status === "Completed" ? (
                    <FaCheck />
                  ) : projectDetails?.projectStatus === "Canceled" ? (
                    <ImCross className="text-sm" />
                  ) : null}
                  {idx !== 0 && (
                    <div className="absolute bottom-full left-1/2 h-[26px] w-[2px] -translate-x-1/2 bg-primary"></div>
                  )}
                </span>
              )}
              {status === "Ongoing" &&
              projectDetails?.projectStatus === "Canceled" ? (
                <p className="text-base font-medium">Project Canceled</p>
              ) : (
                <p className="text-base font-medium">{option?.name}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(TrackProject);
