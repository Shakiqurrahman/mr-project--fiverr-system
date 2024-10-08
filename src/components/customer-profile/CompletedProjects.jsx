import React, { useState } from "react";
import designImg from "../../assets/images/project-thumbnail.jpg";
import { getStatusText } from "./StatusText";

const CompletedProjects = () => {
  const [completedProjects] = useState([
    {
      id: 1,
      title: "Flyer Design",
      img: designImg,
      price: 30,
      time: "May 15, 2024",
      status: "Completed",
    },
    {
      id: 2,
      title: "Door Hanger Design",
      img: designImg,
      price: 40,
      time: "May 9, 2024",
      status: "Completed",
    },
  ]);

  return (
    <div className="mt-8 grid grid-cols-2 gap-4">
      {completedProjects.length > 0 ? (
        completedProjects.map((project) => {
          return (
            <div
              className="rounded-lg border border-gray-300 p-2 shadow-sm lg:p-4"
              key={project.id}
            >
              <div className="flex items-center gap-3">
                <img
                  className="w-28 lg:w-36"
                  src={project.img}
                  alt={project.title}
                />
                <div>
                  <h3 className="mb-1 text-sm sm:text-base">{project.title}</h3>
                  <p className="text-lg font-semibold sm:text-xl">
                    ${project.price}
                  </p>
                </div>
              </div>
              <div className="mt-2 flex justify-between">
                <p>{project.time}</p>
                <p className="font-semibold">{getStatusText(project.status)}</p>
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
