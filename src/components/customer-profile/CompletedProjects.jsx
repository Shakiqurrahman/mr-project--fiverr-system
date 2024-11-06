import React from "react";
import { useFetchCompletedProjectsQuery } from "../../Redux/api/orderApiSlice";
import { getStatusText } from "./StatusText";

const CompletedProjects = () => {
  const {
    data: completedProjects,
    isLoading,
    error,
  } = useFetchCompletedProjectsQuery({
    status: "COMPLETE_PROJECT",
  });
  console.log("data", completedProjects);

  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      {completedProjects?.length > 0 ? (
        completedProjects?.map((project) => {
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
                  <h3 className="mb-1 text-sm sm:text-base">
                    {project?.projectName}
                  </h3>
                  <p className="text-lg font-semibold sm:text-xl">
                    ${project?.totalPrice}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex justify-between">
                <p>{project?.time}</p>
                <p className="font-semibold">
                  {getStatusText(project?.projectStatus)}
                </p>
              </div>
            </div>
          );
        })
      ) : (
        <h2 className="text-nowrap text-center text-lg min-[850px]:translate-x-1/2">
          You haven&apos;t completed any projects yet!
        </h2>
      )}
    </div>
  );
};

export default CompletedProjects;
