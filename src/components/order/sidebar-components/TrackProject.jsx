import React from "react";
import { FaCheck } from "react-icons/fa";

const TrackProject = () => {
  const trackingOptions = [
    {
      id: 1,
      name: "Project placed",
      status: "Completed",
    },
    {
      id: 2,
      name: "Requirements submitted",
      status: "Completed",
    },
    {
      id: 3,
      name: "Project running",
      status: "Ongoing",
    },
    {
      id: 4,
      name: "Review Delivery",
      status: "Waiting",
    },
    {
      id: 5,
      name: "Complete project",
      status: "Waiting",
    },
  ];
  return (
    <div className="bg-lightskyblue p-3">
      <h1 className="text-xl font-semibold">Track Project</h1>
      <div className="my-5 space-y-6">
        {trackingOptions.map((option, idx) => {
          return (
            <div key={idx} className="flex items-center gap-4">
              {option?.status === "Waiting" ? (
                <span className="relative flex size-7 flex-shrink-0 items-center justify-center rounded-full border-2 border-gray-400 bg-transparent p-1 text-base text-white">
                  {idx !== 0 && (
                    <div className="absolute bottom-full left-1/2 h-[26px] w-[2px] -translate-x-1/2 bg-gray-400"></div>
                  )}
                </span>
              ) : (
                <span className="relative flex size-7 flex-shrink-0 items-center justify-center rounded-full bg-primary p-1 text-base text-white">
                  {option?.status === "Completed" && <FaCheck />}
                  {idx !== 0 && (
                    <div className="absolute bottom-full left-1/2 h-[26px] w-[2px] -translate-x-1/2 bg-primary"></div>
                  )}
                </span>
              )}
              <p className="text-xl">{option?.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrackProject;
